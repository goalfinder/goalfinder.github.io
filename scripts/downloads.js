import { loadLang, setCurrentLang, getCurrentLang, getTranslations } from "./i18n.js";

let langButton;
let darkModeButton;
let versionsData = null;

/** Get the base URL for the site */
function getBaseUrl() {
	return window.siteBaseUrl || "";
}

/**
 * Fetches version data from the JSON file
 */
async function fetchVersions() {
	try {
		const response = await fetch(`${getBaseUrl()}/content/downloads/versions.json`);
		versionsData = await response.json();
		renderVersions();
	} catch (err) {
		console.error("Failed to load versions data:", err);
	}
}

/**
 * Renders all version sections based on fetched data
 */
function renderVersions() {
	if (!versionsData) return;

	const lang = getCurrentLang();
	const t = getTranslations();

	renderRecommendedVersion(lang, t);
	renderLatestVersion(lang, t);
	renderChangelog(lang, t);
	renderPreviousVersions(lang, t);
}

/**
 * Renders the recommended version card
 */
function renderRecommendedVersion(lang, t) {
	const recommended = versionsData.recommended;
	const container = document.getElementById("dl-recommended-container");
	if (!container || !recommended) return;

	container.innerHTML = `
		<a href="${recommended.downloadUrl}" class="dl-latest-card dl-recommended-card">
			<div class="dl-latest-info">
				<span class="dl-version-badge dl-recommended-badge">${t["dl-recommended-badge"] || "Recommended"}</span>
				<h3 class="dl-latest-name">GoalFinder ${recommended.version}</h3>
				<div class="dl-latest-meta">
					<span class="dl-meta-item">
						<strong>${t["dl-date-label"] || "Date:"}</strong> ${recommended.date}
					</span>
					<span class="dl-meta-item">
						<strong>${t["dl-size-label"] || "Size:"}</strong> ${recommended.size}
					</span>
				</div>
			</div>
			<div class="dl-latest-action">
				<span class="dl-download-btn">${t["dl-download-btn"] || "Download"}</span>
			</div>
		</a>
	`;
}

/**
 * Renders the latest version card
 */
function renderLatestVersion(lang, t) {
	const latest = versionsData.latest;
	const container = document.getElementById("dl-latest-container");
	if (!container || !latest) return;

	container.innerHTML = `
		<a href="${latest.downloadUrl}" class="dl-latest-card">
			<div class="dl-latest-info">
				<span class="dl-version-badge">${t["dl-latest-badge"] || "Latest"}</span>
				<h3 class="dl-latest-name">GoalFinder ${latest.version}</h3>
				<div class="dl-latest-meta">
					<span class="dl-meta-item">
						<strong>${t["dl-date-label"] || "Date:"}</strong> ${latest.date}
					</span>
					<span class="dl-meta-item">
						<strong>${t["dl-size-label"] || "Size:"}</strong> ${latest.size}
					</span>
				</div>
			</div>
			<div class="dl-latest-action">
				<span class="dl-download-btn">${t["dl-download-btn"] || "Download"}</span>
			</div>
		</a>
	`;
}

/**
 * Renders the changelog section for the latest version
 * Dynamically supports any number of categories with any number of items
 */
function renderChangelog(lang, t) {
	const changelog = versionsData.latest?.changelog?.[lang];
	const container = document.getElementById("dl-changelog-container");
	if (!container || !changelog) return;

	const titleKey = `dl-changelog-title-${versionsData.latest.version}`;
	const title = t[titleKey] || t["dl-changelog-title"] || `What's New in ${versionsData.latest.version}`;

	// Generate columns dynamically from all categories in the changelog
	const columns = Object.entries(changelog)
		.map(([categoryKey, items]) => {
			// Look for translation, fallback to capitalized category key
			const categoryTitle = t[`dl-changelog-${categoryKey}`] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
			return `
				<div class="dl-changelog-column">
					<h3>${categoryTitle}</h3>
					<ul>
						${items.map((item) => `<li>${item}</li>`).join("")}
					</ul>
				</div>
			`;
		})
		.join("");

	container.innerHTML = `
		<h2>${title.replace("{version}", versionsData.latest.version)}</h2>
		<div class="dl-changelog-content">
			${columns}
		</div>
	`;
}

/**
 * Renders the previous versions list
 */
function renderPreviousVersions(lang, t) {
	const previous = versionsData.previous;
	const container = document.getElementById("dl-versions-container");
	if (!container || !previous) return;

	container.innerHTML = previous
		.map((version) => {
			const date = typeof version.date === "object" ? version.date[lang] : version.date;

			return `
			<a href="${version.downloadUrl}" class="dl-version-item">
				<div class="dl-version-info">
					<h4 class="dl-version-name">GoalFinder ${version.version}</h4>
					<div class="dl-version-meta">
						<span class="dl-meta-item">
							<strong>${t["dl-date-label"] || "Date:"}</strong> ${date}
						</span>
						<span class="dl-meta-item">
							<strong>${t["dl-size-label"] || "Size:"}</strong> ${version.size}
						</span>
					</div>
				</div>
				<span class="dl-item-action">${t["dl-download-btn"] || "Download"}</span>
			</a>
		`;
		})
		.join("");
}

function switchLang() {
	setCurrentLang(getCurrentLang() === "de" ? "en" : "de");
	loadLang(getCurrentLang(), () => {
		// Re-render versions after language change
		renderVersions();
	});
	if (langButton) {
		langButton.querySelector(".icon").textContent = getCurrentLang().toUpperCase();
	}
}

function toggleDarkMode() {
	const html = document.documentElement;
	html.classList.toggle("dark-mode");

	const icon = darkModeButton.querySelector(".icon");
	const label = darkModeButton.querySelector(".icon-text");
	const baseUrl = getBaseUrl();

	if (html.classList.contains("dark-mode")) {
		icon.src = baseUrl + "/assets/img/svg/light.svg";
		label.textContent = "Light Mode";
		localStorage.setItem("theme", "dark");
	} else {
		icon.src = baseUrl + "/assets/img/svg/dark.svg";
		label.textContent = "Dark Mode";
		localStorage.setItem("theme", "light");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Load translations, then fetch and render versions
	loadLang(getCurrentLang(), () => {
		fetchVersions();
	});

	langButton = document.getElementById("dl-lang-toggle");
	if (langButton) {
		langButton.onclick = switchLang;
	}

	darkModeButton = document.getElementById("dl-dark-toggle");
	if (darkModeButton) {
		darkModeButton.onclick = toggleDarkMode;

		// Update icon if dark mode was loaded from localStorage
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			const icon = darkModeButton.querySelector(".icon");
			const label = darkModeButton.querySelector(".icon-text");
			const baseUrl = getBaseUrl();
			icon.src = baseUrl + "/assets/img/svg/light.svg";
			label.textContent = "Light Mode";
		}
	}
});
