import { initMarkdownDocumentation } from "../tools/markdown-documentation/markdown-documentation.js";
import { loadLang, getTranslations } from "./i18n.js";

/** Default page language */
const defaultLang = "de";
let currentLang;

document.addEventListener("DOMContentLoaded", async () => {
	// Load language first before initializing markdown documentation
	currentLang = defaultLang;
	await loadLang(currentLang);

	// Now initialize markdown documentation with translations already loaded
	await initMarkdownDocumentation({
		contentStructurePath: "../content/user-content-structure.json",
		defaultPagePath: "../content/user/introduction.md",
		lightIconPath: "../assets/img/svg/light.svg",
		copyIconPath: "../assets/img/svg/copy.svg",
	});

	// Update translations in markdown documentation after initialization
	if (window.updateMarkdownDocumentationTranslations) {
		window.updateMarkdownDocumentationTranslations(getTranslations());
	}
});
