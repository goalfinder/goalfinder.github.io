/** Current translation data */
let translations = [];
/** The default page language */
const defaultLang = "en"
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
