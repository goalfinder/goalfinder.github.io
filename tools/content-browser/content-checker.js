/**
 * Runs a test to check for mismatches or structure changes between two different content structures
 * @param {string} structure1 The path to the first content structure
 * @param {string} structure2 The path to the second content structure
 */
export async function runTests(structure1, structure2) {
	const response1 = await fetch(structure1);
	const response2 = await fetch(structure2);

	if (!response1.ok || !response2.ok) {
		console.error(`Content structure tests failed to read file(s):\n ${!response1.ok ? response1.status : ""}\n ${!response2.ok ? response2.status : ""}`);
	} else {
		let json1, json2;
		try {
			json1 = await response1.json();
			json2 = await response2.json();
		} catch (e) {
			console.error("Failed to parse content structure JSON:", e);
			return;
		}

		// Determine expected language for each structure from the filename
		const lang1 = getLanguageFromPath(structure1);
		const lang2 = getLanguageFromPath(structure2);

		// Validate that every node `path` in each structure contains the language subdirectory
		if (lang1) {
			const check1 = validatePathsLanguage(json1, lang1);
			if (!check1.valid) {
				console.error(`Language path mismatch in ${structure1} at ${check1.path}: ${check1.reason}`);
				return;
			}
		}
		if (lang2) {
			const check2 = validatePathsLanguage(json2, lang2);
			if (!check2.valid) {
				console.error(`Language path mismatch in ${structure2} at ${check2.path}: ${check2.reason}`);
				return;
			}
		}

		// Compare structure shapes (ignore names and paths)
		const result = compareStructures(json1, json2);
		if (!result.equal) {
			console.error(`Structure mismatch at ${result.path}: ${result.reason}`);
		}
	}
}

/**
 * Compares two content structures for identical shape while ignoring name/path values.
 * Accepts arrays (top-level) or single node objects.
 * Returns { equal: boolean, path: string, reason?: string }
 */
function compareStructures(a, b) {
	return compareNodes(a, b, "root");
}

function compareNodes(a, b, path) {
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) {
			return { equal: false, path, reason: `array length ${a.length} !== ${b.length}` };
		}
		for (let i = 0; i < a.length; i++) {
			const res = compareNodes(a[i], b[i], `${path}[${i}]`);
			if (!res.equal) return res;
		}
		return { equal: true, path };
	}

	if (Array.isArray(a) !== Array.isArray(b)) {
		return { equal: false, path, reason: `type mismatch array vs non-array` };
	}

	const isObjA = a && typeof a === "object";
	const isObjB = b && typeof b === "object";
	if (!isObjA && !isObjB) {
		return { equal: true, path };
	}

	if (isObjA !== isObjB) {
		return { equal: false, path, reason: `one node is object and the other is not` };
	}

	const childrenA = Array.isArray(a.children) ? a.children : [];
	const childrenB = Array.isArray(b.children) ? b.children : [];

	if (childrenA.length !== childrenB.length) {
		return { equal: false, path, reason: `children length ${childrenA.length} !== ${childrenB.length}` };
	}

	for (let i = 0; i < childrenA.length; i++) {
		const res = compareNodes(childrenA[i], childrenB[i], `${path}.children[${i}]`);
		if (!res.equal) return res;
	}

	return { equal: true, path };
}

/**
 * Extract two-letter language code from a structure filename or path.
 * Tries common patterns like "-en.json", "_en.json" or a "/en/" segment.
 * Returns the lowercase language code or null if none found.
 */
function getLanguageFromPath(filePath) {
	if (!filePath || typeof filePath !== "string") return null;
	// Try filename suffix like -en.json or _en.json
	const m1 = filePath.match(/[-_](?<lang>[a-z]{2})\.json$/i);
	if (m1 && m1.groups && m1.groups.lang) return m1.groups.lang.toLowerCase();
	// Try any /en/ segment
	const m2 = filePath.match(/\/(?<lang>[a-z]{2})\//i);
	if (m2 && m2.groups && m2.groups.lang) return m2.groups.lang.toLowerCase();
	return null;
}

/**
 * Walks a content-structure (array or node) and ensures every node.path contains the language segment.
 * Returns { valid: boolean, path: string, reason?: string }
 */
function validatePathsLanguage(root, lang) {
	const segRegex = new RegExp(`(^|/)${lang}(/|$)`, "i");

	function walk(node, curPath) {
		if (Array.isArray(node)) {
			for (let i = 0; i < node.length; i++) {
				const res = walk(node[i], `${curPath}[${i}]`);
				if (!res.valid) return res;
			}
			return { valid: true, path: curPath };
		}

		if (!node || typeof node !== "object") {
			return { valid: true, path: curPath };
		}

		if (typeof node.path === "string") {
			if (!segRegex.test(node.path)) {
				return { valid: false, path: curPath, reason: `path \"${node.path}\" does not contain language segment \"${lang}\"` };
			}
		}

		const children = Array.isArray(node.children) ? node.children : [];
		for (let i = 0; i < children.length; i++) {
			const res = walk(children[i], `${curPath}.children[${i}]`);
			if (!res.valid) return res;
		}
		return { valid: true, path: curPath };
	}

	return walk(root, "root");
}
