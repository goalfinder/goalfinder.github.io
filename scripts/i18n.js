/** Current translation data */
let translations = [];
/** Current language */
let currentLang = "en";

/** 
 * Loads the specified language and applies it
 * @param {string} lang The language to load
 */
export async function loadLang(lang) {
    try {
        const response = await fetch(`../locales/${lang}.json`);
        translations = await response.json();
        currentLang = lang;
        translatePage();
    } catch (err) {
        console.error("Failed to load language:", lang, err);
    }
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
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = t(key);    
    });   
}