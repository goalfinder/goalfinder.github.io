import { initMarkdownDocumentation } from "../tools/markdown-documentation/markdown-documentation.js";

document.addEventListener("DOMContentLoaded", async () => {
	await initMarkdownDocumentation({
		contentStructurePath: "../content/user-content-structure.json",
		defaultPagePath: "../content/user/introduction.md",
		lightIconPath: "../assets/img/svg/light.svg",
		copyIconPath: "../assets/img/svg/copy.svg",
	});
});
