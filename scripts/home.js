import { loadLang, setCurrentLang, getCurrentLang, getTranslations } from "./i18n.js";

/** Default page language */
let langButton;

function switchLang() {
    setCurrentLang(getCurrentLang() == "de" ? "en" : "de");
    loadLang(getCurrentLang());
    
    if (langButton) {
        langButton.innerHTML = getCurrentLang().toUpperCase();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadLang(getCurrentLang());

    // Get language switch button
    langButton = document.getElementById("lang-button");
    if (langButton) {
        langButton.onclick = function() {switchLang()};
    }
}); 