import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(packageRoot, 'web');
const desktopRoot = path.join(packageRoot, 'apps', 'guard-desktop', 'web');
const desktopUiDir = path.join(desktopRoot, 'ui');

const assets = [
  'guard-ui.next.js',
  'guard-ui.next.css',
];

fs.mkdirSync(desktopUiDir, { recursive: true });

for (const asset of assets) {
  const sourcePath = path.join(sourceDir, asset);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing Guard web asset: ${sourcePath}`);
  }
  fs.copyFileSync(sourcePath, path.join(desktopUiDir, asset));
}

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenClaw Guard Desktop</title>
  <link rel="stylesheet" href="./ui/guard-ui.next.css">
</head>
<body>
  <div id="guard-next-app"></div>
  <script>
    window.__OPENCLAW_GUARD_RUNTIME__ = {
      mode: 'desktop',
      defaultApiBaseUrl: 'http://127.0.0.1:18088',
      docsUrl: 'https://qingmiao-tech.github.io/openclaw-guard/getting-started',
    };
  </script>
  <script type="module" src="./ui/guard-ui.next.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(desktopRoot, 'index.html'), html, 'utf-8');

console.log('[guard-desktop] Prepared desktop shell assets.');
