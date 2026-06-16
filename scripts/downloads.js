import { loadLang, setCurrentLang, getCurrentLang, getTranslations } from "./i18n.js";

let langButton;
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

	renderLatestVersion(lang, t);
	renderChangelog(lang, t);
	renderPreviousVersions(lang, t);

	// Remove no-transition class to enable interactive transitions after render
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			document.body.classList.remove("no-transition");
		});
	});
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
				<h3 class="dl-latest-name">GoalFinder ${latest.version}</h3>
				<span class="dl-meta-item">
					<strong>${t["dl-date-label"] || "Date:"}</strong> ${latest.date}
				</span>
				<span class="dl-meta-item">
					<strong>${t["dl-size-label"] || "Size:"}</strong> ${latest.size}
				</span>
			</div>
			<span class="dl-download-btn">${t["dl-download-btn"] || "Download"}</span>
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
	if (container && changelog) {
		const titleKey = `dl-changelog-title-${versionsData.latest.version}`;
		const title = t[titleKey] || t["dl-changelog-title"] || `What's New in ${versionsData.latest.version}`;
		
		// Generate columns dynamically from all non-empty categories in the changelog
		const columns = Object.entries(changelog)
		.filter(([_, items]) => Array.isArray(items) && items.length > 0)
		.map(([categoryKey, items]) => {
			// Look for translation (supporting keys with or without hyphens), fallback to capitalized formatted category key
			const lookupKey = `dl-changelog-${categoryKey.replace(/-/g, "")}`;
			const categoryTitle = t[lookupKey] || t[`dl-changelog-${categoryKey}`] || categoryKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
			console.log(items);
			return `
			<div class="dl-changelog-column">
			<h3>${categoryTitle}</h3>
			<ul>
			${items.map((item) => `<li class="dl-changelog-item">${item}</li>`).join("")}
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
			const isRecommended = version.recommended === true;
			const recommendedBadge = isRecommended
				? `<span class="dl-version-badge dl-recommended-badge">${t["dl-recommended-badge"] || "Recommended"}</span>`
				: "";

			return `
			<a href="${version.downloadUrl}" class="dl-version-item">
				<div class="dl-version-info">
					<h4 class="dl-version-name">
						GoalFinder ${version.version}
						${recommendedBadge}
					</h4>
					<div class="dl-version-meta">
						<span class="dl-meta-item">
							<strong>${t["dl-date-label"] || "Date:"}</strong> ${date}
						</span>
						<span class="dl-meta-item">
							<strong>${t["dl-size-label"] || "Size:"}</strong> ${version.size}
						</span>
					</div>
				</div>
			</a>
		`;
		})
		.join("");
}

function switchLang() {
	setCurrentLang(getCurrentLang() === "de" ? "en" : "de");
	loadLang(getCurrentLang(), () => {
		renderVersions();
	});
	if (langButton) {
		langButton.querySelector(".icon").textContent = getCurrentLang() === "de" ? "EN" : "DE";
	}
}

function updateLogo(isDark, baseUrl) {
	const logoImg = document.querySelector(".dl-header-logo img");
	if (!logoImg) return;

	// Crossfade: fade out, swap src, fade back in
	logoImg.style.opacity = "0";
	setTimeout(() => {
		logoImg.src = baseUrl + (isDark ? "/assets/img/logos/goalfinder/logo-shadow.png" : "/assets/img/logos/goalfinder/logo-black-shadow.png");
		// Let the browser load the new image then fade back in
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				logoImg.style.opacity = "1";
			});
		});
	}, 150);
}

function toggleDarkMode() {
	const html = document.documentElement;
	html.classList.toggle("dark-mode");

	const icon = document.getElementById("mode-switch-icon");
	const baseUrl = getBaseUrl();
	const isDark = html.classList.contains("dark-mode");

	icon.src = baseUrl + (isDark ? "/assets/img/svg/light.svg" : "/assets/img/svg/dark.svg");
	localStorage.setItem("theme", isDark ? "dark" : "light");

	updateLogo(isDark, baseUrl);
}

document.addEventListener("DOMContentLoaded", () => {
	// Load translations, then fetch and render versions
	loadLang(getCurrentLang(), () => {
		fetchVersions();
	});

	langButton = document.getElementById("dl-lang-toggle");
	if (langButton) {
		langButton.textContent = getCurrentLang() === "de" ? "EN" : "DE";
		langButton.onclick = switchLang;
	}

	const modeIcon = document.getElementById("mode-switch-icon");
	if (modeIcon) {
		modeIcon.onclick = toggleDarkMode;
		modeIcon.style.cursor = "pointer";

		// Update icon and logo if dark mode was loaded from localStorage
		const savedTheme = localStorage.getItem("theme");
		const baseUrl = getBaseUrl();
		const isDark = savedTheme === "dark";
		if (isDark) {
			modeIcon.src = baseUrl + "/assets/img/svg/light.svg";
		}
		// Set logo immediately without animation on initial load
		const logoImg = document.querySelector(".dl-header-logo img");
		if (logoImg) {
			logoImg.style.transition = "none";
			logoImg.src = baseUrl + (isDark ? "/assets/img/logos/goalfinder/logo-shadow.png" : "/assets/img/logos/goalfinder/logo-black-shadow.png");
			// Re-enable transition after a frame
			requestAnimationFrame(() => {
				logoImg.style.transition = "";
			});
		}
	}
});