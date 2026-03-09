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
		langButton.onclick = function () {
			switchLang();
		};
	}

	// Decode and display email to prevent scraper harvesting
	const emailContainer = document.getElementById("contact-email-container");
	if (emailContainer && emailContainer.dataset.email) {
		const email = atob(emailContainer.dataset.email);
		emailContainer.textContent = email;
		emailContainer.style.cursor = "pointer";

		emailContainer.addEventListener("click", () => {
			navigator.clipboard.writeText(email).then(() => {
				const originalText = emailContainer.textContent;
				const copiedText = getTranslations()["email-copied"] || "Copied!";
				emailContainer.textContent = copiedText;
				setTimeout(() => {
					emailContainer.textContent = originalText;
				}, 2000);
			});
		});
	}
});
