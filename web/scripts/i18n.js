const defaultLang = "de";

let translations = [];
let currentLang = "en";

async function loadLang(lang) {
    try {
        const response = await fetch(`../locales/${lang}.json`);
        translations = await response.json();
        currentLang = lang;
        translatePage();
    } catch (err) {
        console.err("Failed to load language:", lang, err);
    }
}

function t(key) {
    return translations[key] || key;
}

function translatePage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = t(key);
    });   
}