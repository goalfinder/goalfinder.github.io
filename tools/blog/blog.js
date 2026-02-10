/**
 * Blog System - Handles loading, displaying, searching, and filtering blog posts
 * Uses MarkdownConverter to render markdown content to HTML
 * Integrates with i18n.js for translations
 */

import MarkdownConverter from '../markdown-converter/markdown-converter.js';
import { loadLang, getCurrentLang, setCurrentLang, getTranslations } from '../../scripts/i18n.js';

// Get the base URL for the site (set by Jekyll or defaults to empty)
function getBaseUrl() {
    return window.siteBaseUrl || "";
}

// Initialize markdown converter (no navigation structure needed for blog)
const markdownConverter = new MarkdownConverter([], []);

// Global state
let allPosts = [];
let filteredPosts = [];
let currentPostId = null;
let currentLang = getCurrentLang();

// DOM Elements
const postsListEl = document.getElementById('posts-list');
const postViewEl = document.getElementById('post-view');
const postContentEl = document.getElementById('post-content');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const sortSelect = document.getElementById('sort-select');
const backButton = document.getElementById('back-button');
const noResultsEl = document.getElementById('no-results');
const blogControls = document.querySelector('.blog-controls');

/**
 * Get localized value from post data
 * @param {Object} post - Post data object
 * @param {string} key - Base key name (e.g., 'title', 'short-desc')
 * @returns {string} - Localized value
 */
function getLocalizedValue(post, key) {
    const langKey = `${key}-${currentLang}`;
    return post[langKey] || post[key] || '';
}

/**
 * Get translation from i18n
 * @param {string} key - Translation key
 * @returns {string} - Translated string
 */
function t(key) {
    const translations = getTranslations();
    return translations[key] || key;
}

/**
 * Parse date string in DD.MM.YYYY format to Date object
 * @param {string} dateStr - Date string in DD.MM.YYYY format
 * @returns {Date} - Parsed date object
 */
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Format date for display based on current language
 * @param {string} dateStr - Date string in DD.MM.YYYY format
 * @returns {string} - Formatted date string
 */
function formatDate(dateStr) {
    const date = parseDate(dateStr);
    const locale = currentLang === 'de' ? 'de-DE' : 'en-US';
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Load all blog posts from the content directory
 * @returns {Promise<void>}
 */
async function loadAllPosts() {
    try {
        const baseUrl = getBaseUrl();
        // Load the posts manifest
        const manifestResponse = await fetch(`${baseUrl}/tools/blog/content/posts.json`);
        if (!manifestResponse.ok) {
            throw new Error('Failed to load posts manifest');
        }
        const manifest = await manifestResponse.json();

        // Load each post's metadata
        const postPromises = manifest.posts.map(async (postRef) => {
            const postPath = `${baseUrl}/tools/blog/content/${postRef.folder}/${postRef.id}.json`;
            const response = await fetch(postPath);
            if (!response.ok) {
                console.error(`Failed to load post: ${postRef.id}`);
                return null;
            }
            const postData = await response.json();
            return {
                ...postData,
                id: postRef.id,
                folder: postRef.folder,
                basePath: `${baseUrl}/tools/blog/content/${postRef.folder}/`
            };
        });

        const posts = await Promise.all(postPromises);
        allPosts = posts.filter(post => post !== null);
        
        // Sort by date (newest first) by default
        sortPosts('newest');
        
    } catch (error) {
        console.error('Error loading posts:', error);
        postsListEl.innerHTML = `<p class="error-message">${t('blog-load-error')}</p>`;
    }
}

/**
 * Sort posts based on selected criteria
 * @param {string} sortBy - Sort criteria (newest, oldest, title-asc, title-desc)
 */
function sortPosts(sortBy) {
    filteredPosts = [...(filteredPosts.length > 0 || searchInput.value ? filteredPosts : allPosts)];
    
    if (filteredPosts.length === 0 && !searchInput.value) {
        filteredPosts = [...allPosts];
    }

    switch (sortBy) {
        case 'newest':
            filteredPosts.sort((a, b) => parseDate(b.date) - parseDate(a.date));
            break;
        case 'oldest':
            filteredPosts.sort((a, b) => parseDate(a.date) - parseDate(b.date));
            break;
        case 'title-asc':
            filteredPosts.sort((a, b) => getLocalizedValue(a, 'title').localeCompare(getLocalizedValue(b, 'title')));
            break;
        case 'title-desc':
            filteredPosts.sort((a, b) => getLocalizedValue(b, 'title').localeCompare(getLocalizedValue(a, 'title')));
            break;
    }

    renderPostsList();
}

/**
 * Filter posts based on search query
 * @param {string} query - Search query
 */
function filterPosts(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredPosts = [...allPosts];
    } else {
        filteredPosts = allPosts.filter(post => {
            const title = getLocalizedValue(post, 'title').toLowerCase();
            const desc = getLocalizedValue(post, 'short-desc').toLowerCase();
            const titleMatch = title.includes(searchTerm);
            const descMatch = desc.includes(searchTerm);
            const dateMatch = post.date.includes(searchTerm);
            return titleMatch || descMatch || dateMatch;
        });
    }

    // Apply current sort
    sortPosts(sortSelect.value);
}

/**
 * Render the posts list
 */
function renderPostsList() {
    if (filteredPosts.length === 0) {
        postsListEl.innerHTML = '';
        noResultsEl.classList.remove('hidden');
        return;
    }

    noResultsEl.classList.add('hidden');
    
    postsListEl.innerHTML = filteredPosts.map(post => {
        const thumbnailPath = post['thumbnail-path'] 
            ? `${post.basePath}${post['thumbnail-path'].replace('./', '')}`
            : '';
        const title = getLocalizedValue(post, 'title');
        const shortDesc = getLocalizedValue(post, 'short-desc');
        
        return `
            <article class="post-card" data-post-id="${post.id}">
                ${thumbnailPath ? `
                    <div class="post-thumbnail">
                        <img src="${thumbnailPath}" alt="${title}" loading="lazy">
                    </div>
                ` : `
                    <div class="post-thumbnail post-thumbnail-placeholder">
                        <span>📝</span>
                    </div>
                `}
                <div class="post-info">
                    <h2 class="post-title">${title}</h2>
                    <p class="post-date">${formatDate(post.date)}</p>
                    <p class="post-description">${shortDesc}</p>
                    <button class="read-more-btn" onclick="window.blogApp.viewPost('${post.id}')">${t('blog-read-more')}</button>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Load and display a single post
 * @param {string} postId - The post ID to display
 */
async function viewPost(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (!post) {
        console.error(`Post not found: ${postId}`);
        return;
    }

    currentPostId = postId;

    try {
        // Load the markdown content for the current language
        const contentPathValue = getLocalizedValue(post, 'content-path');
        const contentPath = `${post.basePath}${contentPathValue.replace('./', '')}`;
        const markdown = await markdownConverter.loadMarkdown(contentPath);
        const title = getLocalizedValue(post, 'title');
        
        if (!markdown) {
            postContentEl.innerHTML = `<p class="error-message">${t('blog-load-error')}</p>`;
        } else {
            // Convert markdown to HTML
            const html = markdownConverter.convert(markdown, contentPath);
            
            postContentEl.innerHTML = `
                <header class="post-header">
                    <h1 class="post-full-title">${title}</h1>
                    <p class="post-full-date">${formatDate(post.date)}</p>
                </header>
                <div class="post-body markdown-content">
                    ${html}
                </div>
            `;
        }

        // Update URL hash for direct linking
        window.location.hash = postId;

        // Show post view, hide list
        postsListEl.classList.add('hidden');
        blogControls.classList.add('hidden');
        noResultsEl.classList.add('hidden');
        postViewEl.classList.remove('hidden');

    } catch (error) {
        console.error('Error loading post:', error);
        postContentEl.innerHTML = `<p class="error-message">${t('blog-load-error')}</p>`;
    }
}

/**
 * Go back to the posts list
 */
function showPostsList() {
    currentPostId = null;
    window.location.hash = '';
    
    postViewEl.classList.add('hidden');
    postsListEl.classList.remove('hidden');
    blogControls.classList.remove('hidden');
    
    if (filteredPosts.length === 0 && searchInput.value) {
        noResultsEl.classList.remove('hidden');
    }
}

/**
 * Handle URL hash changes for direct linking
 */
function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash && allPosts.find(p => p.id === hash)) {
        viewPost(hash);
    } else if (!hash && currentPostId) {
        showPostsList();
    }
}

/**
 * Copy code block content to clipboard
 * Required by markdown-converter for code block copy functionality
 * @param {HTMLElement} button - The copy button element
 */
function copyCodeBlock(button) {
    const codeBlock = button.closest('.markdown-formatted-code');
    const codeIndex = codeBlock?.dataset?.codeIndex;
    
    if (codeIndex !== undefined && markdownConverter.codeBlocks[codeIndex]) {
        navigator.clipboard.writeText(markdownConverter.codeBlocks[codeIndex])
            .then(() => {
                const originalText = button.querySelector('.code-copy-text').textContent;
                button.querySelector('.code-copy-text').textContent = 'Copied!';
                setTimeout(() => {
                    button.querySelector('.code-copy-text').textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    }
}

/**
 * Toggle sources expansion
 * Required by markdown-converter for sources functionality
 * @param {string} id - The sources element ID
 */
function toggleSources(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.toggle('expanded');
    }
}

// Make functions globally available
window.copyCodeBlock = copyCodeBlock;
window.toggleSources = toggleSources;

// Event Listeners
searchInput.addEventListener('input', (e) => {
    filterPosts(e.target.value);
    searchClear.style.display = e.target.value ? 'block' : 'none';
});

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    filterPosts('');
});

sortSelect.addEventListener('change', (e) => {
    sortPosts(e.target.value);
});

backButton.addEventListener('click', showPostsList);

window.addEventListener('hashchange', handleHashChange);

/**
 * Handle language change and re-render content
 */
function onLanguageChange() {
    currentLang = getCurrentLang();
    
    // Re-render the posts list with new language
    if (currentPostId) {
        viewPost(currentPostId);
    } else {
        renderPostsList();
    }
}

/**
 * Switch between languages
 */
function switchLang() {
    const newLang = currentLang === 'de' ? 'en' : 'de';
    setCurrentLang(newLang);
    loadLang(newLang, onLanguageChange);
    
    // Update the language button text
    const langButton = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-toggle-text');
    if (langText) {
        langText.textContent = newLang.toUpperCase();
    }
}

// Initialize
async function init() {
    // Load translations first
    await new Promise((resolve) => {
        loadLang(currentLang, () => {
            resolve();
        });
    });
    
    // Set up language toggle button if exists
    const langButton = document.getElementById('lang-toggle');
    if (langButton) {
        langButton.addEventListener('click', switchLang);
    }
    
    await loadAllPosts();
    
    // Check for direct link on load
    const hash = window.location.hash.slice(1);
    if (hash) {
        // Wait a moment for posts to be loaded, then try to view
        setTimeout(() => {
            if (allPosts.find(p => p.id === hash)) {
                viewPost(hash);
            }
        }, 100);
    }
}

// Export for external access
window.blogApp = {
    viewPost,
    showPostsList,
    refresh: init,
    switchLang: switchLang
};

// Start the app
init();
