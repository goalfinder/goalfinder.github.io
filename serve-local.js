#!/usr/bin/env node

/**
 * Simple local development server for Jekyll sites
 * Serves files and replaces Jekyll variables with empty strings for local development
 * This allows you to test the site locally without breaking GitHub Pages deployment
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.md': 'text/markdown',
};

function processJekyllVariables(content, ext) {
  // Only process HTML, CSS, and JS files
  if (!['.html', '.css', '.js'].includes(ext)) {
    return content;
  }

  let processed = content;
  
  // Replace Jekyll front matter
  processed = processed.replace(/^---[\s\S]*?---\n*/m, '');
  
  // Replace all {{ site.baseurl }} variations (with filters, defaults, etc) with empty string
  processed = processed.replace(/\{\{\s*site\.baseurl[^}]*\}\}/g, '');
  
  // Replace {{ page.* }} variables with empty or default values
  processed = processed.replace(/\{\{\s*page\.description\s*\}\}/g, 'GoalFinder Documentation');
  processed = processed.replace(/\{\{\s*page\.title\s*\}\}/g, 'Documentation');
  processed = processed.replace(/\{\{\s*page\.\w+\s*\}\}/g, '');
  
  return processed;
}

const server = http.createServer((req, res) => {
  // Log requests for debugging
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  
  // Handle root redirect to /user
  if (req.url === '/') {
    res.writeHead(302, { 'Location': '/user' });
    res.end();
    return;
  }

  let filePath = path.join(ROOT_DIR, req.url);
  
  // Remove query string
  filePath = filePath.split('?')[0];
  
  // Security check - prevent directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Try to read the file
  function tryReadFile(filepath, isRetry = false) {
    fs.readFile(filepath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // If no extension, try multiple locations
          if (!ext && !isRetry) {
            // Try /pages/{name}.html first
            const pagesPath = path.join(ROOT_DIR, 'pages', path.basename(filepath) + '.html');
            tryReadFile(pagesPath, true);
          } else if (!ext && isRetry) {
            // Try adding .html extension
            tryReadFile(filepath + '.html', true);
          } else {
            res.writeHead(404);
            res.end('Not Found: ' + req.url);
          }
        } else {
          res.writeHead(500);
          res.end('Server Error');
        }
      } else {
        // Determine content type from file extension
        const fileExt = path.extname(filepath).toLowerCase();
        const finalContentType = MIME_TYPES[fileExt] || 'application/octet-stream';
        
        // Process Jekyll variables for text files
        if (['.html', '.css', '.js'].includes(fileExt)) {
          const processed = processJekyllVariables(content.toString(), fileExt);
          res.writeHead(200, { 'Content-Type': finalContentType });
          res.end(processed);
        } else {
          res.writeHead(200, { 'Content-Type': finalContentType });
          res.end(content);
        }
      }
    });
  }

  tryReadFile(filePath);
});

server.listen(PORT, () => {
  console.log(`\n🚀 Local development server running!`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`\n📂 Serving files from: ${ROOT_DIR}`);
  console.log(`\n💡 This server processes Jekyll variables for local development`);
  console.log(`   Your GitHub Pages deployment will remain unaffected\n`);
  console.log(`Press Ctrl+C to stop the server\n`);
});
