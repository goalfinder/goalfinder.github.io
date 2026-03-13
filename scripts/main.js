import { loadLang, setCurrentLang, getCurrentLang } from "./i18n.js";

const TRANSITION_DURATION = 950;
const COOLDOWN = 300;
const THEME_STORAGE_KEY = "theme";

let langButton;
let themeButton;
let titleMorphLock = false;
let scroll_block = false;

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

	initSharedTitle();
	initAboutImageStack();

	initPresentationScroll();
});

function initSharedTitle() {
	const heroTitle = document.getElementById("title");
	const aboutTitle = document.getElementById("about-shared-title");
	if (!heroTitle || !aboutTitle) return;
	aboutTitle.textContent = heroTitle.textContent.trim();
}

function initAboutImageStack() {
	const stackButton = document.getElementById("about-image-stack");
	const prevButton = document.getElementById("stack-prev");
	const nextButton = document.getElementById("stack-next");
	const images = Array.from(document.querySelectorAll("[data-stack-image]"));
	if (!stackButton || images.length < 3) return;

	let active = 0;

	function render() {
		const len = images.length;
		images.forEach((img, idx) => {
			img.classList.remove("is-active", "is-next", "is-next-2");
			const rel = (idx - active + len) % len;
			if (rel === 0) img.classList.add("is-active");
			if (rel === 1) img.classList.add("is-next");
			if (rel === 2) img.classList.add("is-next-2");
		});
	}

	function move(step) {
		const len = images.length;
		active = (active + step + len) % len;
		render();
	}

	stackButton.addEventListener("click", () => move(1));
	if (prevButton) prevButton.addEventListener("click", () => move(-1));
	if (nextButton) nextButton.addEventListener("click", () => move(1));

	render();
}

function createTitleMorph(fromHeroToAbout = true) {
	if (titleMorphLock) return;

	const heroTitle = document.getElementById("title");
	const aboutTitle = document.getElementById("about-shared-title");
	if (!heroTitle || !aboutTitle) return;

	const source = fromHeroToAbout ? heroTitle : aboutTitle;
	const target = fromHeroToAbout ? aboutTitle : heroTitle;
	const sourceRect = source.getBoundingClientRect();
	if (!sourceRect.width) return;

	titleMorphLock = true;
	scroll_block = true;

	const clone = source.cloneNode(true);
	clone.removeAttribute("id");
	clone.classList.add("morph-title-clone");
	clone.style.left = `${sourceRect.left}px`;
	clone.style.top = `${sourceRect.top}px`;
	clone.style.whiteSpace = "nowrap";

	const sourceStyle = getComputedStyle(source);
	const targetStyle = getComputedStyle(target);
	const sourceFontSize = parseFloat(sourceStyle.fontSize) || 0;
	const targetFontSize = parseFloat(targetStyle.fontSize) || sourceFontSize;
	const sourceLetterSpacing = parseFloat(sourceStyle.letterSpacing) || 0;
	const targetLetterSpacing = parseFloat(targetStyle.letterSpacing) || 0;

	clone.style.fontSize = `${sourceFontSize}px`;
	clone.style.letterSpacing = `${sourceLetterSpacing}px`;
	document.body.appendChild(clone);

	source.classList.add("morph-hidden");
	target.classList.add("morph-hidden");
	clone.style.transform = "translate(0px, 0px)";

	let cleanedUp = false;

	function update(easedProgress) {
		const targetRect = target.getBoundingClientRect();
		if (!targetRect.width || !targetRect.height) return;

		const dx = (targetRect.left - sourceRect.left) * easedProgress;
		const dy = (targetRect.top - sourceRect.top) * easedProgress;
		const fontSize = sourceFontSize + (targetFontSize - sourceFontSize) * easedProgress;
		const letterSpacing = sourceLetterSpacing + (targetLetterSpacing - sourceLetterSpacing) * easedProgress;

		clone.style.transform = `translate(${dx}px, ${dy}px)`;
		clone.style.fontSize = `${fontSize}px`;
		clone.style.letterSpacing = `${letterSpacing}px`;
	}

	function cleanup() {
		if (!cleanedUp) {
			cleanedUp = true;
			clone.remove();
			source.classList.remove("morph-hidden");
			target.classList.remove("morph-hidden");
			titleMorphLock = false;
			scroll_block = false;
		}
	}

	return {
		update,
		finish: () => {
			update(1);
			cleanup();
		},
		cancel: cleanup,
	};
}

function createSubtitleFade(fromHeroToAbout = true) {
	const subtitle = document.getElementById("subTitle");
	if (!subtitle) return null;

	const currentOpacity = parseFloat(getComputedStyle(subtitle).opacity);
	const fromOpacity = Number.isFinite(currentOpacity) ? currentOpacity : fromHeroToAbout ? 1 : 0;
	const toOpacity = fromHeroToAbout ? 0 : 1;

	function update(easedProgress) {
		const nextOpacity = fromOpacity + (toOpacity - fromOpacity) * easedProgress;
		subtitle.style.opacity = `${nextOpacity}`;
	}

	return {
		update,
		finish: () => update(1),
		cancel: () => {
			subtitle.style.opacity = `${fromOpacity}`;
		},
	};
}

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

	function scrollToPanel(index, callbacks = {}) {
		const { onProgress, onDone } = callbacks;
		const panels = getPanels();
		if (index < 0 || index >= panels.length || isAnimating) return false;

		const target = panels[index].offsetTop;
		const start = container.scrollTop;
		const distance = target - start;
		if (Math.abs(distance) < 2) {
			if (onProgress) onProgress(1, 1);
			if (onDone) onDone();
			return false;
		}

		isAnimating = true;
		let startTime = null;

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / TRANSITION_DURATION, 1);
			const easedProgress = easeInOutCubic(progress);
			container.scrollTop = start + distance * easedProgress;
			if (onProgress) onProgress(progress, easedProgress);
			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				container.scrollTop = target;
				isAnimating = false;
				if (onDone) onDone();
			}
		}

		requestAnimationFrame(step);
		return true;
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
		if (isAnimating || cooldownTimer || scroll_block) return;
		const currentIndex = closestPanelIndex();
		const targetIndex = currentIndex + direction;

		cooldownTimer = true;

		const shouldMorph = (currentIndex === 0 && targetIndex === 1) || (currentIndex === 1 && targetIndex === 0);
		const morph = shouldMorph ? createTitleMorph(currentIndex === 0) : null;
		const subtitleFade = shouldMorph ? createSubtitleFade(currentIndex === 0) : null;

		const started = scrollToPanel(targetIndex, {
			onProgress: (_progress, easedProgress) => {
				if (morph) morph.update(easedProgress);
				if (subtitleFade) subtitleFade.update(easedProgress);
			},
			onDone: () => {
				if (morph) morph.finish();
				if (subtitleFade) subtitleFade.finish();
				setTimeout(() => {
					cooldownTimer = null;
				}, COOLDOWN);
			},
		});

		if (!started) {
			if (morph) morph.cancel();
			if (subtitleFade) subtitleFade.cancel();
			cooldownTimer = null;
		}
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
