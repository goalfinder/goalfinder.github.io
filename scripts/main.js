import { loadLang, setCurrentLang, getCurrentLang } from "./i18n.js";

const TRANSITION_DURATION = 750;
const COOLDOWN = 500;
const THEME_STORAGE_KEY = "theme";

let langButton;
let themeButton;

function switchLang() {
	setCurrentLang(getCurrentLang() == "de" ? "en" : "de");
	loadLang(getCurrentLang());
	if (langButton) langButton.innerHTML = getCurrentLang().toUpperCase();
}

function getCurrentTheme() {
	return document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
}

function updateThemeButtonLabel() {
	if (!themeButton) return;
	const currentTheme = getCurrentTheme();
	themeButton.innerHTML = currentTheme === "dark" ? "LIGHT" : "DARK";
}

function setTheme(theme, save = true) {
	const isDark = theme === "dark";
	document.documentElement.classList.toggle("dark-mode", isDark);
	if (save) {
		localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
	}
	updateThemeButtonLabel();
}

function switchTheme() {
	setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
}

function applySavedTheme() {
	const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
	if (savedTheme === "dark" || savedTheme === "light") {
		setTheme(savedTheme, false);
		return;
	}

	const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	setTheme(systemPrefersDark ? "dark" : "light", false);
}

document.addEventListener("DOMContentLoaded", () => {
	applySavedTheme();

	loadLang(getCurrentLang(), () => {
		typewriterSubtitle();
	});

	langButton = document.getElementById("lang-button");
	if (langButton) langButton.onclick = switchLang;
	if (langButton) langButton.innerHTML = getCurrentLang().toUpperCase();

	themeButton = document.getElementById("theme-button");
	if (themeButton) themeButton.onclick = switchTheme;
	updateThemeButtonLabel();

	initPresentationScroll();
});

function typewriterSubtitle() {
	const el = document.getElementById("subTitle");
	if (!el) return;

	const fullText = el.textContent;
	el.textContent = "";
	el.classList.add("typewriter-active");

	const CHAR_DELAY_BASE = 30; // ms — baseline speed
	const CHAR_DELAY_JITTER = 45; // ms — max random extra per character
	const PAUSE_CHANCE = 0.12; // probability of a brief mid-word pause
	const PAUSE_EXTRA = 100; // ms — extra pause when it hits
	const CURSOR_LINGER = 1000; // ms — how long the cursor stays after finishing typing1
	let index = 0;

	function typeNext() {
		if (index < fullText.length) {
			el.textContent += fullText[index++];
			const jitter = Math.random() * CHAR_DELAY_JITTER;
			const pause = Math.random() < PAUSE_CHANCE ? PAUSE_EXTRA : 0;
			setTimeout(typeNext, CHAR_DELAY_BASE + jitter + pause);
		} else {
			setTimeout(() => {
				el.classList.remove("typewriter-active");
			}, CURSOR_LINGER);
		}
	}

	typeNext();
}

function initPresentationScroll() {
	const container = document.querySelector("main");
	if (!container) return;

	const getPanels = () => Array.from(document.querySelectorAll(".panel"));
	let isAnimating = false;
	let cooldownTimer = null;
	let touchStartY = 0;

	function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}

	function scrollToPanel(index) {
		const panels = getPanels();
		if (index < 0 || index >= panels.length || isAnimating) return;

		const target = panels[index].offsetTop;
		const start = container.scrollTop;
		const distance = target - start;
		if (Math.abs(distance) < 2) return;

		isAnimating = true;
		let startTime = null;

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / TRANSITION_DURATION, 1);
			container.scrollTop = start + distance * easeInOutCubic(progress);
			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				container.scrollTop = target;
				isAnimating = false;
			}
		}

		requestAnimationFrame(step);
	}

	function closestPanelIndex() {
		const panels = getPanels();
		const scrollTop = container.scrollTop;
		let closest = 0;
		let minDist = Infinity;
		panels.forEach((panel, i) => {
			const dist = Math.abs(panel.offsetTop - scrollTop);
			if (dist < minDist) {
				minDist = dist;
				closest = i;
			}
		});
		return closest;
	}

	function tryAdvance(direction) {
		if (isAnimating || cooldownTimer) return;
		scrollToPanel(closestPanelIndex() + direction);
		cooldownTimer = setTimeout(() => {
			cooldownTimer = null;
		}, COOLDOWN);
	}

	container.addEventListener(
		"wheel",
		(e) => {
			e.preventDefault();
			tryAdvance(e.deltaY > 0 ? 1 : -1);
		},
		{ passive: false }
	);

	container.addEventListener(
		"touchstart",
		(e) => {
			touchStartY = e.touches[0].clientY;
		},
		{ passive: true }
	);

	container.addEventListener(
		"touchend",
		(e) => {
			const diff = touchStartY - e.changedTouches[0].clientY;
			if (Math.abs(diff) > 30) tryAdvance(diff > 0 ? 1 : -1);
		},
		{ passive: true }
	);

	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowDown" || e.key === "PageDown") {
			e.preventDefault();
			tryAdvance(1);
		}
		if (e.key === "ArrowUp" || e.key === "PageUp") {
			e.preventDefault();
			tryAdvance(-1);
		}
	});
}
