import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../../docs');
const OUTPUT_DIR = path.resolve(__dirname, '../docs');
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
  
  // Clean up: remove parentheses and their content, remove backticks
  title = title.replace(/\s*\(.*?\)\s*/g, '').replace(/`/g, '').trim();
  
  // Consistency: Remove "Disco" prefix if it exists at the start
  title = title.replace(/^Disco\s*/i, '').trim();
  
  return title;
}

console.log('--- DiscoUI Dynamic Docs Generator ---');

const allDocs = [];

// 1. First Pass: Collect all docs and their titles
walkDir(DOCS_DIR, (filePath) => {
  if (path.extname(filePath) !== '.md') return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(DOCS_DIR, filePath);
  const title = extractTitle(content, path.basename(filePath));
  
  allDocs.push({
    title,
    relativePath,
    targetUrl: `/docs/${relativePath.replace('.md', '.html')}`,
    category: relativePath.includes('/') ? relativePath.split('/')[0] : 'Getting Started'
  });
});

// 2. Generate Sidebar HTML
const categories = {};
allDocs.forEach(doc => {
  if (!categories[doc.category]) categories[doc.category] = [];
  categories[doc.category].push(doc);
});

let sidebarHtml = `<div class="sidebar-header"><a href="/" class="sidebar-brand">DiscoUI</a></div>`;
Object.keys(categories).sort().forEach(cat => {
  const docs = categories[cat].sort((a, b) => a.title.localeCompare(b.title));
  const isComponents = cat.toLowerCase() === 'components';
  const displayTitle = cat.toUpperCase();
  
  if (isComponents && docs.length > 5) {
    sidebarHtml += `
      <details class="nav-group-details" ${isComponents ? 'open' : ''}>
        <summary class="nav-group-title">${displayTitle} (${docs.length})</summary>
        <div class="nav-group-content">
          ${docs.map(doc => `<a href="${doc.targetUrl}" class="nav-link">{{ACTIVE_${doc.relativePath}}}${doc.title}</a>`).join('')}
        </div>
      </details>`;
  } else {
    sidebarHtml += `<div class="nav-group-title">${displayTitle}</div>`;
    docs.forEach(doc => {
      sidebarHtml += `<a href="${doc.targetUrl}" class="nav-link">{{ACTIVE_${doc.relativePath}}}${doc.title}</a>`;
    });
  }
});

// 3. Second Pass: Generate Pages
allDocs.forEach(doc => {
  const filePath = path.join(DOCS_DIR, doc.relativePath);
  const targetPath = path.join(OUTPUT_DIR, doc.relativePath.replace('.md', '.html'));
  const targetDir = path.dirname(targetPath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const mdContent = fs.readFileSync(filePath, 'utf-8');
  let htmlContent = marked.parse(mdContent);
  
  // Fix asset paths: convert ../../assets/ or ../assets/ to /assets/
  htmlContent = htmlContent.replace(/src="(\.\.\/)+assets\//g, 'src="/assets/');
  
  // Inject sidebar and set active class
  let pageSidebar = sidebarHtml.replace(`{{ACTIVE_${doc.relativePath}}}`, '');
  // Clear other active markers
  pageSidebar = pageSidebar.replace(/\{\{ACTIVE_.*?\}\}/g, '');
  
  // Add active class to current link (simple string replace for the href)
  const activeLink = `href="${doc.targetUrl}" class="nav-link"`;
  pageSidebar = pageSidebar.replace(activeLink, `href="${doc.targetUrl}" class="nav-link active"`);

  const finalHtml = template
    .replace('{{TITLE}}', doc.title)
    .replace('{{SIDEBAR}}', pageSidebar)
    .replace('{{CONTENT}}', htmlContent);

  fs.writeFileSync(targetPath, finalHtml);
  console.log(`Generated: ${doc.relativePath} -> ${doc.title}`);
});

console.log('Docs generation complete! ✨');
