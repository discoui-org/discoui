import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../../docs');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

console.log('--- Cleaning up Image Styles in MD files ---');

walkDir(DOCS_DIR, (filePath) => {
  if (path.extname(filePath) !== '.md') return;

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace "width: 100%;" inside style attribute
  const newContent = content.replace(/style="([^"]*?)width:\s*100%;?\s*([^"]*?)"/g, 'style="$1$2"');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${path.relative(DOCS_DIR, filePath)}`);
  }
});

console.log('Finished cleaning image styles! ✨');
