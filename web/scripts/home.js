import { loadLang } from './i18n.js';

/** Default page language */
const defaultLang = "de";
let langButton;
let currentLang;

function switchLang() {
    currentLang = currentLang === "de" ? "en" : "de";
    loadLang(currentLang)
    
    if (langButton) {
        langButton.innerHTML = currentLang.toUpperCase();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Load the default language
    currentLang = defaultLang;
    loadLang(currentLang);

    // Get language switch button
    langButton = document.getElementById("lang-button");
    if (langButton) {
        langButton.onclick = function() {switchLang()};
    }
}); 