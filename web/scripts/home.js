import { loadLang } from './i18n.js';

/** Default page language */
const defaultLang = "en";

document.addEventListener("DOMContentLoaded", () => {
    // Load the default language
    loadLang(defaultLang);
}); 