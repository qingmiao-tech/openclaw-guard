import { GUARD_VERSION } from './app-meta.js';

export function getNextWorkbenchPage(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="guard-version" content="${GUARD_VERSION}">
  <title>OpenClaw Guard Next</title>
  <link rel="stylesheet" href="/ui/guard-ui.next.css">
</head>
<body>
  <div id="guard-next-app">
    <div style="padding:24px;font-family:'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;color:#dceaf8;background:#08111f;min-height:100vh;">
      <div style="max-width:960px;margin:0 auto;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8bb7d9;">OpenClaw Guard Next</p>
        <h1 style="margin:0 0 12px;font-size:32px;">Loading modular console…</h1>
        <p style="margin:0;line-height:1.7;color:#9cb4ca;">If this screen stays here, build the new web shell with <code>npm run build:web</code> in the package root.</p>
      </div>
    </div>
  </div>
  <script type="module" src="/ui/guard-ui.next.js"></script>
</body>
</html>`;
}
