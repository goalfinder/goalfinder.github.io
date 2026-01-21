import { getCurrentLang } from "../../scripts/i18n.js";
// Class to manage the content structure and its rendering
class ContentBrowser {
	contentStructure; // Contains the hierarchical structure of topics and categories
	contentBasePath; // Contains the base path to the content
	defaultPage; // Contains the default page to load

	// Constructor initializes an empty content structure
	constructor() {
		this.contentStructure = [];
		this.contentBasePath = "";
		this.defaultPage = "";
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

		// Extract config item if present and filter it out of the structure
		this.contentStructure = rawStructure.filter((item) => {
			if (item.type === "config") {
				this.contentBasePath = item["content-base-path"] || "";
				this.defaultPage = item["default-page"] || "";
				return false; // Remove config from content structure
			}
			return true;
		});

		console.log(this.contentStructure);
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
						html += `<p class="topic-category-button-collapsed topic-category-button" id="topic-category-topic-${currentItemName}">${currentItemName}</p>`;
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
}

export default ContentBrowser;
