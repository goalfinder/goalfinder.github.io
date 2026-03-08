import { getCurrentLang } from "../../scripts/i18n.js";
// Class to manage the content structure and its rendering
class ContentBrowser {
	contentStructure; // Contains the hierarchical structure of topics and categories
	contentBasePath; // Contains the base path to the content
	defaultPage; // Contains the default page to load

	// Section support
	sections; // Array of section objects (big categories)
	activeSectionUid; // UID of the currently active section
	defaultSectionUid; // UID of the default section from config

	// Constructor initializes an empty content structure
	constructor() {
		this.contentStructure = [];
		this.contentBasePath = "";
		this.defaultPage = "";
		this.sections = [];
		this.activeSectionUid = "";
		this.defaultSectionUid = "";
	}

	/**
	 * Gets the localized name for an item
	 * @param {Object} item - The item to get the name for
	 * @returns {string} - The localized name
	 */
	getItemName(item) {
		// Support both old format (name property) and new format (de/en properties)
		if (item.name) {
			return item.name;
		}
		return getCurrentLang() === "de" ? item.de : item.en;
	}

	/**
	 * Gets the full path for an item
	 * @param {Object} item - The item to get the path for
	 * @returns {string} - The full path including base path and language
	 */
	getItemPath(item) {
		if (!item.path) return "";
		// If path already starts with .. or /, it's a full path (old format)
		if (item.path.startsWith("..") || item.path.startsWith("/")) {
			return item.path;
		}
		// New format: combine base path + language + item path
		return `${this.contentBasePath}${getCurrentLang()}/${item.path}`;
	}

	/**
	 * Gets the default page path
	 * @returns {string} - The full path to the default page
	 */
	getDefaultPagePath() {
		if (!this.defaultPage) return "";
		// If defaultPage already has full path (old format)
		if (this.defaultPage.startsWith("..") || this.defaultPage.startsWith("/")) {
			return this.defaultPage;
		}
		// New format: combine base path + language + default page
		return `${this.contentBasePath}${getCurrentLang()}/${this.defaultPage}`;
	}

	/**
	 * Fetches the content structure from a JSON file at the given path
	 * @param {string} path - Path to the JSON file containing the content structure
	 */
	async fetchStructure(path) {
		const res = await fetch(path);
		if (!res.ok) {
			console.error(`Failed to fetch content structure (${res.status}): ${res.statusText} for ${path}`);
			return null;
		}

		const contentType = res.headers.get("content-type") || "";
		if (!contentType.includes("application/json")) {
			const text = await res.text();
			console.error(`Expected JSON but got '${contentType}' from ${path}. Response starts with: ${text.slice(0, 200)}`);
			return null;
		}

		let rawStructure;
		try {
			rawStructure = await res.json(); // Parse the content structure
		} catch (err) {
			console.error(`Failed to parse JSON from ${path}:`, err);
			return null;
		}

		// Extract config, sections, and regular items
		this.sections = [];
		this.defaultSectionUid = "";

		const remaining = rawStructure.filter((item) => {
			if (item.type === "config") {
				this.contentBasePath = item["content-base-path"] || "";
				this.defaultPage = item["default-page"] || "";
				this.defaultSectionUid = item["default-section"] || "";
				return false;
			}
			if (item.type === "section") {
				this.sections.push(item);
				return false;
			}
			return true;
		});

		if (this.sections.length > 0) {
			this.setActiveSection(this.defaultSectionUid || this.sections[0].uid);
		} else {
			this.contentStructure = remaining;
		}
	}

	/**
	 * Generates HTML for the topics and categories based on the content structure
	 * @param {Array} structure - Optional parameter to provide a custom structure; defaults to the main content structure
	 * @returns {string} - HTML string representing the topics and categories
	 */
	generateTopicsHTML(structure = this.contentStructure) {
		let html = "";

		// Recursive function to traverse the content structure and generate HTML
		const traverse = (items, parentIsCategoryButton = false) => {
			items.forEach((item) => {
				if (item.type === "page") {
					// Generate HTML for individual pages
					// Add special class only if direct parent is a category button (has path)
					const currentItemName = this.getItemName(item);
					const itemPath = this.getItemPath(item);
					const categoryClass = parentIsCategoryButton ? "topic-under-category" : "";
					html += `<p class="topic-unselected topic-button ${categoryClass}" id="topic-button-${currentItemName}" data-path="${itemPath}">${currentItemName}</p>`;
				} else if (item.type === "category") {
					// Check if this category is a category button (has path property)
					const isCategoryButton = !!item.path;
					const currentItemName = this.getItemName(item);

					// Generate HTML for categories that are not collapsed
					if (item.path) {
						const categoryPath = this.getItemPath(item);
						html += `<p class="topic-category-button-collapsed topic-category-button" id="topic-category-topic-${currentItemName}" data-path="${categoryPath}">${currentItemName}</p>`;
					} else if (!item.collapsed) {
						html += `<p class="topic-category" id="topic-category-${currentItemName}">${currentItemName}</p>`;
					}

					// Recursively generate HTML for child items
					// Pass true only if THIS category is a category button
					if (item.children && !item.collapsed) {
						traverse(item.children, isCategoryButton);
					}
				}
			});
		};

		traverse(structure); // Start traversal from the root structure
		return html;
	}

	/**
	 * Toggles the visibility of a category (collapsed/expanded) and updates the container
	 * @param {Object} item - The category item to toggle
	 * @param {HTMLElement} container - The HTML container to update with the new structure
	 */
	changeCategoryVisibility(item, container) {
		if (item.type === "category") {
			item.collapsed = !item.collapsed; // Toggle the collapsed state
		}

		if (container) {
			// Regenerate and update the HTML in the container
			container.innerHTML = this.generateTopicsHTML();
		}
	}

	/**
	 * Returns the generated HTML for the current content structure
	 * @returns {string} - HTML string representing the topics and categories
	 */
	async getStructure() {
		return this.generateTopicsHTML();
	}

	/**
	 * Flattens the hierarchical content structure into a flat array of items with their paths
	 * @param {Array} structure - Optional parameter to provide a custom structure; defaults to the main content structure
	 * @returns {Array} - Flat array of items with their full resolved paths
	 */
	flattenStructure(structure = this.contentStructure) {
		const flatStructure = [];

		// Recursive function to traverse the structure and flatten it
		const traverse = (items, parentPath = "") => {
			items.forEach((item) => {
				const currentPath = parentPath ? `${parentPath}/${this.getItemName(item)}` : this.getItemName(item);

				if (item.path) {
					flatStructure.push(this.getItemPath(item));
				}

				if (item.type === "category" && item.children) {
					// Recursively traverse categories
					traverse(item.children, currentPath);
				}
			});
		};

		traverse(structure); // Start traversal from the root structure
		return flatStructure;
	}

	/**
	 * Sets the active section by UID, updating contentStructure and contentBasePath
	 * @param {string} uid - The UID of the section to activate
	 * @returns {boolean} - True if section was found and activated
	 */
	setActiveSection(uid) {
		const section = this.sections.find((s) => s.uid === uid);
		if (!section) return false;

		this.activeSectionUid = uid;
		this.contentStructure = section.children || [];
		this.contentBasePath = section["content-base-path"] || "";
		this.defaultPage = section["default-page"] || "";
		return true;
	}

	/**
	 * Returns whether the content structure uses sections
	 * @returns {boolean}
	 */
	hasSections() {
		return this.sections.length > 0;
	}

	/**
	 * Returns all sections
	 * @returns {Array} - Array of section objects
	 */
	getSections() {
		return this.sections;
	}

	/**
	 * Returns the currently active section object
	 * @returns {Object|null}
	 */
	getActiveSection() {
		return this.sections.find((s) => s.uid === this.activeSectionUid) || null;
	}

	/**
	 * Gets the full path for an item within a specific section
	 * @param {Object} item - The item to get the path for
	 * @param {string} sectionUid - The UID of the section
	 * @returns {string} - The full resolved path
	 */
	getItemPathInSection(item, sectionUid) {
		const section = this.sections.find((s) => s.uid === sectionUid);
		if (!section) return this.getItemPath(item);
		if (!item.path) return "";
		if (item.path.startsWith("..") || item.path.startsWith("/")) {
			return item.path;
		}
		return `${section["content-base-path"]}${getCurrentLang()}/${item.path}`;
	}

	/**
	 * Finds an item by its UID across all sections
	 * @param {string} uid - The UID to search for
	 * @returns {Object|null} - Object with { item, section } or null
	 */
	findItemByUid(uid) {
		for (const section of this.sections) {
			if (section.uid === uid) return { item: section, section };
			const found = this._searchByUid(section.children, uid);
			if (found) return { item: found, section };
		}
		return null;
	}

	/**
	 * Recursively searches for an item by UID
	 * @param {Array} items - Items to search through
	 * @param {string} uid - The UID to find
	 * @returns {Object|null}
	 */
	_searchByUid(items, uid) {
		if (!items) return null;
		for (const item of items) {
			if (item.uid === uid) return item;
			if (item.children) {
				const found = this._searchByUid(item.children, uid);
				if (found) return found;
			}
		}
		return null;
	}

	/**
	 * Flattens all sections into a single array with section context
	 * @returns {Array} - Array of { path, item, sectionUid } objects
	 */
	flattenAllSections() {
		const result = [];
		for (const section of this.sections) {
			const basePath = section["content-base-path"] || "";
			const traverse = (items) => {
				items.forEach((item) => {
					if (item.path) {
						result.push({
							path: `${basePath}${getCurrentLang()}/${item.path}`,
							item,
							sectionUid: section.uid,
						});
					}
					if (item.children) traverse(item.children);
				});
			};
			if (section.children) traverse(section.children);
		}
		return result;
	}
}

export default ContentBrowser;
