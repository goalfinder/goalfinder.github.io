import { initMarkdownDocumentation } from "../tools/markdown-documentation/markdown-documentation.js";
import { loadLang, getCurrentLang, getTranslations } from "./i18n.js";
import { runTests } from "../tools/content-browser/content-checker.js";

/** Default page language */
document.addEventListener("DOMContentLoaded", async () => {
	// Load language first before initializing markdown documentation
	await loadLang(getCurrentLang());

	// Now initialize markdown documentation with translations already loaded
	await initMarkdownDocumentation({
		doc: "technical",
		defaultPagePath: "../content/user/introduction.md",
		lightIconPath: "../assets/img/svg/light.svg",
		copyIconPath: "../assets/img/svg/copy.svg",
	});

	// Update translations in markdown documentation after initialization
	if (window.updateMarkdownDocumentationTranslations) {
		window.updateMarkdownDocumentationTranslations(getTranslations());
	}

	runTests("../content/content-structures/technical-content-structure-en.json", "../content/content-structures/technical-content-structure-de.json");
});
