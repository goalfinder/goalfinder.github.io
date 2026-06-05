#!/usr/bin/env node

/**
 * Prefer to use bundle exec jekyll build for local testing
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
  if (!['.html', '.css', '.js'].includes(ext)) {
    return content;
  }

  let processed = content;
  
  processed = processed.replace(/^---[\s\S]*?---\n*/m, '');
  
  processed = processed.replace(/\{\{\s*site\.baseurl[^}]*\}\}/g, '');
  
  processed = processed.replace(/\{\{\s*page\.description\s*\}\}/g, 'GoalFinder Documentation');
  processed = processed.replace(/\{\{\s*page\.title\s*\}\}/g, 'Documentation');
  processed = processed.replace(/\{\{\s*page\.\w+\s*\}\}/g, '');
  
  return processed;
}

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  
  if (req.url === '/') {
    res.writeHead(302, { 'Location': '/user' });
    res.end();
    return;
  }

  let filePath = path.join(ROOT_DIR, req.url);
  
  filePath = filePath.split('?')[0];
  
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  function tryReadFile(filepath, isRetry = false) {
    fs.readFile(filepath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          if (!ext && !isRetry) {
            const pagesPath = path.join(ROOT_DIR, 'pages', path.basename(filepath) + '.html');
            tryReadFile(pagesPath, true);
          } else if (!ext && isRetry) {
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
        const fileExt = path.extname(filepath).toLowerCase();
        const finalContentType = MIME_TYPES[fileExt] || 'application/octet-stream';
        
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
  console.log(`\n Local development server running!`);
  console.log(`\n http://localhost:${PORT}`);
  console.log(`\n Serving files from: ${ROOT_DIR}`);
  console.log(`\n This server processes Jekyll variables for local development`);
  console.log(`   Your GitHub Pages deployment will remain unaffected\n`);
  console.log(`Press Ctrl+C to stop the server\n`);
});
