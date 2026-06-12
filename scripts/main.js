import { loadLang, setCurrentLang, getCurrentLang } from "./i18n.js";

const TRANSITION_DURATION = 950;
const COOLDOWN = 300;
const THEME_STORAGE_KEY = "theme";

let langButton;
let themeButton;
let titleMorphLock = false;
let scroll_block = false;
let touchOnlyMode = false;
let alternateScrollEnabled = true;

function setTouchOnlyMode(enabled) {
	if (touchOnlyMode === enabled) return;
	touchOnlyMode = enabled;
	alternateScrollEnabled = !enabled;
	document.documentElement.classList.toggle("touch-only", enabled);
}

function isTouchOnlyDevice() {
	const hasTouchPoints = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
	const hasFinePointer = window.matchMedia && window.matchMedia("(any-pointer: fine)").matches;
	return hasTouchPoints && !hasFinePointer;
}

function switchLang() {
	setCurrentLang(getCurrentLang() == "de" ? "en" : "de");
	loadLang(getCurrentLang());
	if (langButton) langButton.innerHTML = getCurrentLang() == "de" ? "EN" : "DE";
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
	if (langButton) langButton.innerHTML = getCurrentLang() == "de" ? "EN" : "DE";

	themeButton = document.getElementById("theme-button");
	if (themeButton) themeButton.onclick = switchTheme;
	updateThemeButtonLabel();

	initSharedTitle();
	initHeroSplit();
	initAboutImageStack();
	initMissionCards();
	initDocContribCards();
	initTestimonialAwards();
	initCreditsAccordion();
	initContactSection();

	const touchOnly = isTouchOnlyDevice();
	setTouchOnlyMode(touchOnly);
	initPresentationScroll();
});

function initSharedTitle() {
	const heroTitle = document.getElementById("title");
	const aboutTitle = document.getElementById("about-shared-title");
	if (!heroTitle || !aboutTitle) return;
	aboutTitle.textContent = heroTitle.textContent.trim();
}

function initHeroSplit() {
	const hero = document.querySelector("[data-hero]");
	if (!hero) return;
	const slices = Array.from(hero.querySelectorAll("[data-hero-slice]"));
	if (!slices.length) return;

	const scrollRoot = document.querySelector("main") || document.documentElement;
	const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const setVisible = (visible) => {
		slices.forEach((slice) => slice.classList.toggle("is-visible", visible));
	};

	if (prefersReducedMotion || !("IntersectionObserver" in window)) {
		setVisible(true);
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			const visible = entries.some((entry) => entry.isIntersecting);
			setVisible(visible);
		},
		{ root: scrollRoot, threshold: 0.1 }
	);

	observer.observe(hero);
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

function resolveTextColor(style) {
	const textFill = style.getPropertyValue("-webkit-text-fill-color").trim();
	const color = style.color;
	const hasTextFill = textFill !== "";

	if (hasTextFill && textFill !== "transparent" && textFill !== "rgba(0, 0, 0, 0)") return textFill;
	if (!hasTextFill && color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)") return color;

	const backgroundColor = style.backgroundColor;
	if (backgroundColor && backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") {
		return backgroundColor;
	}
	return color || backgroundColor;
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

	const subtitleFade = createSubtitleFade(fromHeroToAbout);
	const sourceCenterX = sourceRect.left + sourceRect.width / 2;
	const sourceCenterY = sourceRect.top + sourceRect.height / 2;

	titleMorphLock = true;
	scroll_block = true;

	const clone = source.cloneNode(true);
	clone.removeAttribute("id");
	clone.classList.add("morph-title-clone");
	clone.style.left = `${sourceCenterX}px`;
	clone.style.top = `${sourceCenterY}px`;
	clone.style.whiteSpace = "nowrap";

	const sourceStyle = getComputedStyle(source);
	const targetStyle = getComputedStyle(target);
	const sourceColor = resolveTextColor(sourceStyle);
	const targetColor = resolveTextColor(targetStyle);
	const sourceFilter = sourceStyle.filter || "none";
	const targetFilter = targetStyle.filter || "none";
	const sourceFontSize = parseFloat(sourceStyle.fontSize) || 0;
	const targetFontSize = parseFloat(targetStyle.fontSize) || sourceFontSize;
	const sourceLetterSpacing = parseFloat(sourceStyle.letterSpacing) || 0;
	const targetLetterSpacing = parseFloat(targetStyle.letterSpacing) || 0;

	clone.style.fontSize = `${sourceFontSize}px`;
	clone.style.letterSpacing = `${sourceLetterSpacing}px`;
	clone.style.backgroundColor = sourceColor;
	clone.style.color = sourceColor;
	clone.style.setProperty("-webkit-text-fill-color", sourceColor);
	clone.style.filter = sourceFilter;
	clone.style.transitionProperty = "color, background-color, filter, -webkit-text-fill-color";
	clone.style.transitionDuration = `${TRANSITION_DURATION}ms`;
	clone.style.transitionTimingFunction = "ease-in-out";
	document.body.appendChild(clone);

	source.classList.add("morph-hidden");
	target.classList.add("morph-hidden");
	clone.style.transform = "translate(0px, 0px) translate(-50%, -50%)";

	requestAnimationFrame(() => {
		if (!clone.isConnected) return;
		clone.style.backgroundColor = targetColor;
		clone.style.color = targetColor;
		clone.style.setProperty("-webkit-text-fill-color", targetColor);
		clone.style.filter = targetFilter;
	});

	let cleanedUp = false;

	function update(easedProgress) {
		const targetRect = target.getBoundingClientRect();
		if (!targetRect.width || !targetRect.height) return;

		const targetCenterX = targetRect.left + targetRect.width / 2;
		const targetCenterY = targetRect.top + targetRect.height / 2;

		const dx = (targetCenterX - sourceCenterX) * easedProgress;
		const dy = (targetCenterY - sourceCenterY) * easedProgress;
		const fontSize = sourceFontSize + (targetFontSize - sourceFontSize) * easedProgress;
		const letterSpacing = sourceLetterSpacing + (targetLetterSpacing - sourceLetterSpacing) * easedProgress;

		clone.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
		clone.style.fontSize = `${fontSize}px`;
		clone.style.letterSpacing = `${letterSpacing}px`;

		if (subtitleFade) subtitleFade.update(easedProgress);
	}

	function cleanup() {
		if (!cleanedUp) {
			cleanedUp = true;
			source.classList.remove("morph-hidden");
			target.classList.remove("morph-hidden");
			requestAnimationFrame(() => {
				if (clone.isConnected) clone.remove();
				titleMorphLock = false;
				scroll_block = false;
			});
		}
	}

	return {
		update,
		finish: () => {
			update(1);
			if (subtitleFade) subtitleFade.finish();
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
	const fadeOutGain = 50; // very fast fade-out to avoid overlap
	const fadeInDelay = 0.85; // wait until title is nearly settled before fading back
	const fadeInSpan = 1 - fadeInDelay;

	function update(easedProgress) {
		let shaped = easedProgress;
		if (fromHeroToAbout) {
			shaped = Math.min(1, easedProgress * fadeOutGain);
		} else {
			shaped = Math.min(1, Math.max(0, (easedProgress - fadeInDelay) / fadeInSpan));
		}
		const nextOpacity = fromOpacity + (toOpacity - fromOpacity) * shaped;
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
	if (getPanels().length <= 1) return;
	let isAnimating = false;
	let cooldownTimer = null;
	let touchStartY = 0;
	let wheelGestureLocked = false;
	let wheelLockTimer = null;
	let wheelAccumulationTimer = null;
	let wheelAccumulatedDelta = 0;
	let wheelDirection = 0;

	const WHEEL_TRIGGER_DELTA = 45;
	const WHEEL_IDLE_RESET_MS = 220;
	const WHEEL_GESTURE_LOCK_MS = TRANSITION_DURATION + COOLDOWN;

	function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}

	function normalizeWheelDelta(event) {
		if (event.deltaMode === 1) return event.deltaY * 16;
		if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
		return event.deltaY;
	}

	function resetWheelAccumulation() {
		wheelAccumulatedDelta = 0;
		wheelDirection = 0;
	}

	function scheduleWheelAccumulationReset() {
		if (wheelAccumulationTimer) window.clearTimeout(wheelAccumulationTimer);
		wheelAccumulationTimer = window.setTimeout(() => {
			resetWheelAccumulation();
			wheelAccumulationTimer = null;
		}, WHEEL_IDLE_RESET_MS);
	}

	function lockWheelGesture() {
		wheelGestureLocked = true;
		resetWheelAccumulation();
		if (wheelLockTimer) window.clearTimeout(wheelLockTimer);
		wheelLockTimer = window.setTimeout(() => {
			wheelGestureLocked = false;
			wheelLockTimer = null;
		}, WHEEL_GESTURE_LOCK_MS);
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

	function updateHeroState() {
		const isHero = closestPanelIndex() === 0;
		document.documentElement.classList.toggle("hero-active", isHero);
	}

	function tryAdvance(direction) {
		if (isAnimating || cooldownTimer || scroll_block) return false;
		const currentIndex = closestPanelIndex();
		const targetIndex = currentIndex + direction;

		cooldownTimer = true;

		const shouldMorph = (currentIndex === 0 && targetIndex === 1) || (currentIndex === 1 && targetIndex === 0);
		const morph = shouldMorph ? createTitleMorph(currentIndex === 0) : null;

		const started = scrollToPanel(targetIndex, {
			onProgress: (_progress, easedProgress) => {
				if (morph) morph.update(easedProgress);
			},
			onDone: () => {
				if (morph) morph.finish();
				setTimeout(() => {
					cooldownTimer = null;
				}, COOLDOWN);
			},
		});

		if (!started) {
			if (morph) morph.cancel();
			cooldownTimer = null;
			return false;
		}

		return true;
	}

	container.addEventListener(
		"wheel",
		(e) => {
			setTouchOnlyMode(false);
			if (!alternateScrollEnabled) return;
			e.preventDefault();

			const delta = normalizeWheelDelta(e);
			if (!Number.isFinite(delta) || delta === 0) return;
			if (wheelGestureLocked) return;

			scheduleWheelAccumulationReset();

			const direction = delta > 0 ? 1 : -1;
			if (wheelDirection !== 0 && wheelDirection !== direction) {
				wheelAccumulatedDelta = 0;
			}

			wheelDirection = direction;
			wheelAccumulatedDelta += delta;
			if (Math.abs(wheelAccumulatedDelta) < WHEEL_TRIGGER_DELTA) return;

			const started = tryAdvance(direction);
			if (started) {
				lockWheelGesture();
			} else {
				resetWheelAccumulation();
			}
		},
		{ passive: false }
	);

	container.addEventListener(
		"scroll",
		() => {
			updateHeroState();
		},
		{ passive: true }
	);

	updateHeroState();

	container.addEventListener(
		"touchstart",
		(e) => {
			setTouchOnlyMode(true);
			if (!alternateScrollEnabled) return;
			touchStartY = e.touches[0].clientY;
		},
		{ passive: true }
	);

	container.addEventListener(
		"touchend",
		(e) => {
			if (!alternateScrollEnabled) return;
			const diff = touchStartY - e.changedTouches[0].clientY;
			if (Math.abs(diff) > 30) tryAdvance(diff > 0 ? 1 : -1);
		},
		{ passive: true }
	);

	document.addEventListener("keydown", (e) => {
		if (!alternateScrollEnabled) return;
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

const REVEAL_STAGGER_MS = 100;
const REVEAL_POINT_RATIO = 0.42;
const REVEAL_SETTLE_MS = 320;

function getActivePanel(scrollRoot) {
	const panels = Array.from(document.querySelectorAll(".panel"));
	if (!panels.length || !scrollRoot) return null;

	const scrollTop = scrollRoot.scrollTop;
	let closestPanel = panels[0];
	let minDist = Infinity;

	panels.forEach((panel) => {
		const dist = Math.abs(panel.offsetTop - scrollTop);
		if (dist < minDist) {
			minDist = dist;
			closestPanel = panel;
		}
	});

	return closestPanel;
}

function initStaggeredScrollReveal({ section, items, scrollRoot, staggerMs = REVEAL_STAGGER_MS, indexCssVar = "--reveal-index", revealPointRatio = REVEAL_POINT_RATIO, revealSettleMs = REVEAL_SETTLE_MS }) {
	if (!section || !items.length || !scrollRoot) return;

	const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	items.forEach((item, idx) => {
		item.style.setProperty(indexCssVar, idx.toString());
	});

	const revealTimers = [];
	let revealFrame = null;
	let revealSettleTimer = null;
	let revealedOnCurrentEntry = false;
	let wasActive = false;

	const isSectionActive = () => getActivePanel(scrollRoot) === section;

	const clearRevealTimers = () => {
		if (revealFrame !== null) {
			window.cancelAnimationFrame(revealFrame);
			revealFrame = null;
		}
		while (revealTimers.length) {
			window.clearTimeout(revealTimers.pop());
		}
	};

	const cancelRevealSettle = () => {
		if (revealSettleTimer !== null) {
			window.clearTimeout(revealSettleTimer);
			revealSettleTimer = null;
		}
	};

	const hasReachedRevealPoint = () => {
		const sectionRect = section.getBoundingClientRect();
		const rootTop = scrollRoot === document.documentElement ? 0 : scrollRoot.getBoundingClientRect().top;
		const rootHeight = scrollRoot === document.documentElement ? window.innerHeight : scrollRoot.clientHeight;
		const revealLine = rootTop + rootHeight * revealPointRatio;
		return sectionRect.top <= revealLine && sectionRect.bottom > rootTop + rootHeight * 0.12;
	};

	const hideItems = () => {
		cancelRevealSettle();
		clearRevealTimers();
		items.forEach((item) => item.classList.remove("is-visible"));
	};

	const revealInstant = () => {
		cancelRevealSettle();
		clearRevealTimers();
		items.forEach((item) => item.classList.add("is-visible"));
	};

	const reveal = () => {
		cancelRevealSettle();
		clearRevealTimers();
		items.forEach((item) => item.classList.remove("is-visible"));
		items[0].getBoundingClientRect();

		revealFrame = window.requestAnimationFrame(() => {
			revealFrame = null;

			items.forEach((item, idx) => {
				if (prefersReducedMotion) {
					item.classList.add("is-visible");
					return;
				}

				const timer = window.setTimeout(() => item.classList.add("is-visible"), idx * staggerMs);
				revealTimers.push(timer);
			});
		});
	};

	const scheduleRevealIfReady = () => {
		if (!isSectionActive() || revealedOnCurrentEntry || revealSettleTimer !== null) return;
		if (!hasReachedRevealPoint()) return;

		revealSettleTimer = window.setTimeout(() => {
			revealSettleTimer = null;
			if (!isSectionActive() || revealedOnCurrentEntry || !hasReachedRevealPoint()) return;
			reveal();
			revealedOnCurrentEntry = true;
		}, revealSettleMs);
	};

	const handleScroll = () => {
		const active = isSectionActive();

		if (!active) {
			if (wasActive) {
				revealedOnCurrentEntry = false;
				hideItems();
			}
			wasActive = false;
			return;
		}

		wasActive = true;
		scheduleRevealIfReady();
	};

	if (prefersReducedMotion) {
		revealInstant();
		return;
	}

	scrollRoot.addEventListener("scroll", handleScroll, { passive: true });
	window.requestAnimationFrame(() => handleScroll());
}

function initTestimonialAwards() {
	const testimonialSection = document.getElementById("testimonial");
	const awardsSection = document.getElementById("awards");
	const awardCards = Array.from(document.querySelectorAll("[data-award-card]"));
	const scrollRoot = document.querySelector("main");
	if ((!testimonialSection && !awardsSection) || !scrollRoot) return;

	if (testimonialSection) {
		const testimonialItems = Array.from(testimonialSection.querySelectorAll("[data-scroll-reveal]"));
		initStaggeredScrollReveal({
			section: testimonialSection,
			items: testimonialItems,
			scrollRoot,
		});
	}

	if (awardsSection && awardCards.length) {
		initStaggeredScrollReveal({
			section: awardsSection,
			items: awardCards,
			scrollRoot,
			indexCssVar: "--award-card-index",
		});
	}
}

function initCreditsAccordion() {
	const categories = Array.from(document.querySelectorAll(".credits-category"));
	if (!categories.length) return;

	const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion) return;

	const DURATION = 280;
	const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

	categories.forEach((category) => {
		const summary = category.querySelector("summary");
		const content = category.querySelector(".credits-category-content");
		if (!summary || !content || typeof category.animate !== "function") return;

		let animation = null;
		let isClosing = false;
		let isExpanding = false;

		const cleanupAnimationState = () => {
			category.classList.remove("is-animating");
			category.style.height = "";
			animation = null;
			isClosing = false;
			isExpanding = false;
		};

		const expand = () => {
			isExpanding = true;

			const startHeight = `${category.offsetHeight}px`;
			const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;

			if (animation) animation.cancel();
			category.classList.add("is-animating");
			animation = category.animate(
				{
					height: [startHeight, endHeight],
					opacity: [0.98, 1],
				},
				{ duration: DURATION, easing: EASING }
			);

			animation.onfinish = () => {
				cleanupAnimationState();
			};

			animation.oncancel = () => {
				cleanupAnimationState();
			};
		};

		const open = () => {
			category.style.height = `${category.offsetHeight}px`;
			category.open = true;

			window.requestAnimationFrame(() => {
				expand();
			});
		};

		const close = () => {
			isClosing = true;

			const startHeight = `${category.offsetHeight}px`;
			const endHeight = `${summary.offsetHeight}px`;

			if (animation) animation.cancel();
			category.classList.add("is-animating");
			animation = category.animate(
				{
					height: [startHeight, endHeight],
					opacity: [1, 0.98],
				},
				{ duration: DURATION, easing: EASING }
			);

			animation.onfinish = () => {
				category.open = false;
				cleanupAnimationState();
			};

			animation.oncancel = () => {
				cleanupAnimationState();
			};
		};

		summary.addEventListener("click", (event) => {
			event.preventDefault();

			if (isClosing || !category.open) {
				open();
			} else if (isExpanding || category.open) {
				close();
			}
		});
	});
}

function initMissionCards() {
	const section = document.getElementById("missions");
	const container = document.getElementById("missions-container");
	const cards = Array.from(document.querySelectorAll("[data-mission-card]"));
	const icons = cards.map((card) => card.querySelector(".mission-card-icon")).filter(Boolean);
	const scrollRoot = document.querySelector("main");
	if (!section || !container || !cards.length || !scrollRoot) return;

	let resizeFrame = null;
	const updateMissionLayoutState = () => {
		if (!cards.length) return;

		const isMobileViewport = window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
		if (!isMobileViewport) {
			container.classList.remove("hide-mission-icons");
			return;
		}

		const firstCardTop = cards[0].offsetTop;
		const cardsWrapped = cards.some((card) => Math.abs(card.offsetTop - firstCardTop) > 1);

		let iconsWrapped = false;
		if (icons.length > 1) {
			const firstIconTop = icons[0].getBoundingClientRect().top;
			iconsWrapped = icons.some((icon) => Math.abs(icon.getBoundingClientRect().top - firstIconTop) > 1);
		}

		container.classList.toggle("hide-mission-icons", cardsWrapped || iconsWrapped);
	};

	const scheduleLayoutUpdate = () => {
		if (resizeFrame !== null) return;
		resizeFrame = window.requestAnimationFrame(() => {
			resizeFrame = null;
			updateMissionLayoutState();
		});
	};

	if ("ResizeObserver" in window) {
		const resizeObserver = new ResizeObserver(scheduleLayoutUpdate);
		resizeObserver.observe(container);
		cards.forEach((card) => resizeObserver.observe(card));
	} else {
		window.addEventListener("resize", scheduleLayoutUpdate);
	}

	window.addEventListener("load", scheduleLayoutUpdate, { once: true });
	scheduleLayoutUpdate();

	initStaggeredScrollReveal({
		section,
		items: cards,
		scrollRoot,
		indexCssVar: "--card-index",
	});
}

function initContactSection() {
	const emailBtn = document.querySelector("[data-email-base64]");
	const emailTextSpan = emailBtn ? emailBtn.querySelector("[data-email-text]") : null;
	const copiedTextSpan = emailBtn ? emailBtn.querySelector(".email-copied-text") : null;

	// Decode and display email from base64
	if (emailBtn && emailTextSpan) {
		const encoded = emailBtn.dataset.emailBase64;
		try {
			const decoded = atob(encoded);
			emailTextSpan.textContent = decoded;
		} catch (e) {
			console.error("Failed to decode email base64", e);
		}
	}

	// Copy to clipboard on click
	if (emailBtn && emailTextSpan && copiedTextSpan) {
		let copyTimer = null;
		emailBtn.addEventListener("click", () => {
			if (copyTimer) return;

			const encoded = emailBtn.dataset.emailBase64;
			const email = atob(encoded);

			navigator.clipboard.writeText(email).catch(() => {
				// Fallback for older browsers
				const textarea = document.createElement("textarea");
				textarea.value = email;
				textarea.style.position = "fixed";
				textarea.style.opacity = "0";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			});

			emailTextSpan.classList.add("email-text-fade-out");
			copiedTextSpan.classList.add("is-visible");

			copyTimer = setTimeout(() => {
				copiedTextSpan.classList.remove("is-visible");
				emailTextSpan.classList.remove("email-text-fade-out");
				copyTimer = null;
			}, 2000);
		});
	}

	const contactSection = document.getElementById("contact");
	const scrollRoot = document.querySelector("main");
	if (contactSection && scrollRoot) {
		const contactItems = Array.from(contactSection.querySelectorAll("[data-scroll-reveal]"));
		initStaggeredScrollReveal({
			section: contactSection,
			items: contactItems,
			scrollRoot,
		});
	}
}

function initDocContribCards() {
	const section = document.getElementById("doc-contrib");
	const items = section ? Array.from(section.querySelectorAll("[data-scroll-reveal]")) : [];
	const scrollRoot = document.querySelector("main");
	if (!section || !items.length || !scrollRoot) return;

	initStaggeredScrollReveal({
		section,
		items,
		scrollRoot,
	});
}
