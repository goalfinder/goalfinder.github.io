const SNAP_DELAY = 400;
import { loadLang, setCurrentLang, getCurrentLang } from "./i18n.js";

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
		langButton.onclick = function () {
			switchLang();
		};
	}

	// Smooth scrolling
	const main = document.querySelector("main");
	const panels = Array.from(document.querySelectorAll(".panel"));
	let isSnapping = false;
	let lastSnapTime = 0;

	main.addEventListener(
		"wheel",
		(e) => {
			const now = Date.now();
			if (isSnapping || now - lastSnapTime < SNAP_DELAY) return;

			const delta = e.deltaY;
			if (Math.abs(delta) < 10) return;

			const scrollTop = main.scrollTop;
			let target;

			// Use consistent offset logic for both directions
			if (delta > 0) {
				// Find the next panel below, but allow a small margin for smoothness
				target = panels.find((panel) => panel.offsetTop > scrollTop + main.clientHeight * 0.1) || panels[panels.length - 1];
			} else {
				// Find the previous panel above, with similar margin
				target = [...panels].reverse().find((panel) => panel.offsetTop < scrollTop - main.clientHeight * 0.1) || panels[0];
			}

			if (!target) return;

			isSnapping = true;
			lastSnapTime = now;

			target.scrollIntoView({ behavior: "smooth" });

			setTimeout(() => {
				isSnapping = false;
			}, SNAP_DELAY);

			e.preventDefault();
		},
		{ passive: false }
	);
});
