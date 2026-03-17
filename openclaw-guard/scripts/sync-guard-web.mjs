import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(packageRoot, 'apps', 'guard-web', 'dist');
const targetDir = path.join(packageRoot, 'web');
const fixedAssets = [
  { source: 'guard-ui.next', target: 'guard-ui.next.js' },
  { source: 'guard-ui.next.css', target: 'guard-ui.next.css' },
];

if (!fs.existsSync(sourceDir)) {
  throw new Error(`guard-web dist directory not found: ${sourceDir}`);
}

fs.mkdirSync(targetDir, { recursive: true });

for (const asset of fixedAssets) {
  const sourcePath = path.join(sourceDir, asset.source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Expected guard-web asset was not generated: ${sourcePath}`);
  }
  const targetPath = path.join(targetDir, asset.target);
  fs.copyFileSync(sourcePath, targetPath);
}

console.log('[guard-web] Synced modular shell assets into web/.');
