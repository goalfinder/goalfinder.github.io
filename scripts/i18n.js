/** Current translation data */
let translations = [];
/** The default page language */
const defaultLang = "de";
/** Current language */
let currentLang = defaultLang;

/**
 * Loads the specified language and applies it
 * @param {string} lang The language to load
 * @param {Function} onComplete - Optional callback when translation is complete
 */
export async function loadLang(lang, onComplete = null) {
	try {
		const response = await fetch(`../locales/${lang}.json`);
		translations = await response.json();
		flattenStructure();
		currentLang = lang;
		translatePage();
		if (onComplete) {
			onComplete(translations);
		}
	} catch (err) {
		console.error("Failed to load language:", lang, err);
	}
}

/**
 * Get the current translations object
 * @returns {Object} Current translations object
 */
export function getTranslations() {
	return translations;
}

/**
 * Get the current language
 * @returns {string} Current language code
 */
export function getCurrentLang() {
	return currentLang;
}

/**
 * Set the current language
 * @param {string} lang The lang to set the current language to
 */
export function setCurrentLang(lang) {
	currentLang = lang;
}

/**
 * Used to flatten the translation file
 */
function flattenStructure() {
	let flatTranslations = {};

	function recurse(node) {
		if (Array.isArray(node)) {
			node.forEach((child) => recurse(child));
		} else if (node && typeof node === "object") {
			Object.entries(node).forEach(([k, v]) => {
				if (v && typeof v === "object") {
					recurse(v);
				} else {
					flatTranslations[k] = v;
				}
			});
		}
	}

	recurse(translations);
	translations = flatTranslations;
}

/**
 * Translates a key
 * @param {} key Key to translate
 * @returns Translated key
 */
function t(key) {
	return translations[key] || key;
}

/**
 * Translates all keys in a page
 */
function translatePage() {
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const key = el.getAttribute("data-i18n");
		el.textContent = t(key);
	});
}
