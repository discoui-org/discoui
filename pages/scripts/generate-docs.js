import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../../docs');
const OUTPUT_DIR = path.resolve(__dirname, '../dist/docs');
const TEMPLATE_PATH = path.resolve(__dirname, '../docs/template.html');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function extractTitle(mdContent, fileName) {
  const match = mdContent.match(/^#\s+(.+)$/m);
  let title = match ? match[1] : fileName.replace('.md', '').toUpperCase();
  title = title.replace(/\s*\(.*?\)\s*/g, '').replace(/`/g, '').trim();
  title = title.replace(/^Disco\s*/i, '').trim();
  return title;
}

console.log('--- DiscoUI Dynamic Docs Generator ---');

const allDocs = [];

// 1. Collect all docs
walkDir(DOCS_DIR, (filePath) => {
  if (path.extname(filePath) !== '.md') return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(DOCS_DIR, filePath);
  const title = extractTitle(content, path.basename(filePath));
  
  allDocs.push({
    title,
    relativePath,
    category: relativePath.includes('/') ? relativePath.split('/')[0] : 'Getting Started'
  });
});

const categories = {};
allDocs.forEach(doc => {
  if (!categories[doc.category]) categories[doc.category] = [];
  categories[doc.category].push(doc);
});

// 2. Generate Pages
allDocs.forEach(doc => {
  const targetPath = path.join(OUTPUT_DIR, doc.relativePath.replace('.md', '.html'));
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  // Calculate relative base path from current file to /docs/ root
  const depth = doc.relativePath.split('/').length - 1;
  const relBase = depth === 0 ? './' : '../'.repeat(depth);
  const rootBase = depth === 0 ? '../' : '../'.repeat(depth + 1);

  // Generate Sidebar specifically for this page's depth
  let sidebarHtml = `<div class="sidebar-header"><a href="${rootBase}index.html" class="sidebar-brand">DiscoUI</a></div>`;
  Object.keys(categories).sort().forEach(cat => {
    const docs = categories[cat].sort((a, b) => a.title.localeCompare(b.title));
    const isComponents = cat.toLowerCase() === 'components';
    const displayTitle = cat.toUpperCase();
    
    // Relative URL for the link from THIS page
    const getRelUrl = (targetRelPath) => {
       // Target is in /docs/
       // Current is in /docs/[doc.relativePath]
       return relBase + targetRelPath.replace('.md', '.html');
    };

    if (isComponents && docs.length > 5) {
      sidebarHtml += `
        <details class="nav-group-details" open>
          <summary class="nav-group-title">${displayTitle} (${docs.length})</summary>
          <div class="nav-group-content">
            ${docs.map(d => {
              const active = d.relativePath === doc.relativePath ? 'active' : '';
              return `<a href="${getRelUrl(d.relativePath)}" class="nav-link ${active}">${d.title}</a>`;
            }).join('')}
          </div>
        </details>`;
    } else {
      sidebarHtml += `<div class="nav-group-title">${displayTitle}</div>`;
      docs.forEach(d => {
        const active = d.relativePath === doc.relativePath ? 'active' : '';
        sidebarHtml += `<a href="${getRelUrl(d.relativePath)}" class="nav-link ${active}">${d.title}</a>`;
      });
    }
  });

  const mdContent = fs.readFileSync(path.join(DOCS_DIR, doc.relativePath), 'utf-8');
  let htmlContent = marked.parse(mdContent);
  
  // Fix asset paths: convert ../assets/ or assets/ to relative assets path
  // Assets are in /assets/ (at root)
  // Current file is in /docs/subdir/file.html
  // So assets path is rootBase + assets/
  htmlContent = htmlContent.replace(/src="(\.\.\/)*assets\//g, `src="${rootBase}assets/`);
  
  // Fix internal links: convert .md to .html
  htmlContent = htmlContent.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');
  
  const finalHtml = template
    .replace('{{TITLE}}', doc.title)
    .replace('{{SIDEBAR}}', sidebarHtml)
    .replace('{{CONTENT}}', htmlContent)
    .replace('href="/"', `href="${rootBase}index.html"`) // Fix Close Docs link
    .replace('href="../src/style.css"', `href="${rootBase}src/style.css"`); // Fallback if still there

  fs.writeFileSync(targetPath, finalHtml);
  console.log(`Generated: ${doc.relativePath} -> ${doc.title}`);
});

console.log('Docs generation complete! ✨');
