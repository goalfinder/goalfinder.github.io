/**
 * Blog System - Handles loading, displaying, searching, and filtering blog posts
 * Uses MarkdownConverter to render markdown content to HTML
 */

import MarkdownConverter from '../markdown-converter/markdown-converter.js';

// Initialize markdown converter (no navigation structure needed for blog)
const markdownConverter = new MarkdownConverter([], []);

// Global state
let allPosts = [];
let filteredPosts = [];
let currentPostId = null;

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
 * Parse date string in DD.MM.YYYY format to Date object
 * @param {string} dateStr - Date string in DD.MM.YYYY format
 * @returns {Date} - Parsed date object
 */
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Format date for display
 * @param {string} dateStr - Date string in DD.MM.YYYY format
 * @returns {string} - Formatted date string
 */
function formatDate(dateStr) {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('en-US', {
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
        // Load the posts manifest
        const manifestResponse = await fetch('./content/posts.json');
        if (!manifestResponse.ok) {
            throw new Error('Failed to load posts manifest');
        }
        const manifest = await manifestResponse.json();

        // Load each post's metadata
        const postPromises = manifest.posts.map(async (postRef) => {
            const postPath = `./content/${postRef.folder}/${postRef.id}.json`;
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
                basePath: `./content/${postRef.folder}/`
            };
        });

        const posts = await Promise.all(postPromises);
        allPosts = posts.filter(post => post !== null);
        
        // Sort by date (newest first) by default
        sortPosts('newest');
        
    } catch (error) {
        console.error('Error loading posts:', error);
        postsListEl.innerHTML = '<p class="error-message">Failed to load blog posts. Please try again later.</p>';
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
            filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
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
            const titleMatch = post.title.toLowerCase().includes(searchTerm);
            const descMatch = post['short-desc'].toLowerCase().includes(searchTerm);
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
        
        return `
            <article class="post-card" data-post-id="${post.id}">
                ${thumbnailPath ? `
                    <div class="post-thumbnail">
                        <img src="${thumbnailPath}" alt="${post.title}" loading="lazy">
                    </div>
                ` : `
                    <div class="post-thumbnail post-thumbnail-placeholder">
                        <span>📝</span>
                    </div>
                `}
                <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-date">${formatDate(post.date)}</p>
                    <p class="post-description">${post['short-desc']}</p>
                    <button class="read-more-btn" onclick="window.blogApp.viewPost('${post.id}')">Read More</button>
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
        // Load the markdown content
        const contentPath = `${post.basePath}${post['content-path'].replace('./', '')}`;
        const markdown = await markdownConverter.loadMarkdown(contentPath);
        
        if (!markdown) {
            postContentEl.innerHTML = '<p class="error-message">Failed to load post content.</p>';
        } else {
            // Convert markdown to HTML
            const html = markdownConverter.convert(markdown, contentPath);
            
            postContentEl.innerHTML = `
                <header class="post-header">
                    <h1 class="post-full-title">${post.title}</h1>
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
        postContentEl.innerHTML = '<p class="error-message">Failed to load post content.</p>';
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

// Initialize
async function init() {
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
    refresh: init
};

// Start the app
init();
