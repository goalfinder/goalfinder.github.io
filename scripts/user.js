import { initMarkdownDocumentation } from "../tools/markdown-documentation/markdown-documentation.js";
import { loadLang, getCurrentLang, getTranslations } from "./i18n.js";
import { runTests } from "../tools/content-browser/content-checker.js";

/** Get the base URL for the site (set by Jekyll or defaults to empty) */
function getBaseUrl() {
	return window.siteBaseUrl || "";
}

/** Default page language */
document.addEventListener("DOMContentLoaded", async () => {
	const baseUrl = getBaseUrl();

	// Load language first before initializing markdown documentation
	await loadLang(getCurrentLang());

	// Now initialize markdown documentation with translations already loaded
	await initMarkdownDocumentation({
		doc: "user",
		defaultPagePath: `${baseUrl}/content/user/introduction.md`,
		lightIconPath: `${baseUrl}/assets/img/svg/light.svg`,
		copyIconPath: `${baseUrl}/assets/img/svg/copy.svg`,
	});

	// Update translations in markdown documentation after initialization
	if (window.updateMarkdownDocumentationTranslations) {
		window.updateMarkdownDocumentationTranslations(getTranslations());
	}

	// Run test suite
	runTests(`${baseUrl}/content/content-structures/user-content-structure-en.json`, `${baseUrl}/content/content-structures/user-content-structure-de.json`);
});
