import { GUARD_VERSION } from './app-meta.js';

export function getIntegratedGuardPage(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="guard-version" content="${GUARD_VERSION}">
  <title>OpenClaw Guard</title>
  <link rel="stylesheet" href="/ui/guard-ui.css">
</head>
<body>
  <div id="guard-app"></div>
  <script src="/ui/guard-ui.js"></script>
</body>
</html>`;
}

export function getCompatibilityPage(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenClaw Guard 路由迁移说明</title>
  <style>
    body { font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; }
    .wrap { max-width: 900px; margin: 0 auto; padding: 48px 20px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 18px; padding: 28px; }
    h1 { margin: 0 0 12px; font-size: 32px; }
    p, li { color: #cbd5e1; line-height: 1.8; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
    a { display: inline-flex; align-items: center; justify-content: center; padding: 12px 18px; border-radius: 12px; text-decoration: none; border: 1px solid #475569; color: #e2e8f0; }
    a.primary { background: #2563eb; border-color: #2563eb; }
    code { background: #0f172a; padding: 2px 8px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>旧链接已迁移到默认工作台</h1>
      <p>OpenClaw Guard 现在默认使用同一套 next 工作台界面。这个页面只保留给旧书签和旧路由做迁移提示，不再作为常规使用入口。</p>
      <ul>
        <li>默认入口：<code>/</code></li>
        <li>兼容别名：<code>/workbench</code></li>
        <li>开发直达：<code>/next</code></li>
        <li>回退入口：<code>/legacy</code></li>
      </ul>
      <p>如果你是从旧链接跳转过来的，直接进入 <code>/</code> 即可；日常不需要再区分“兼容页”和“旧版页”。</p>
      <div class="actions">
        <a class="primary" href="/">打开默认入口</a>
        <a href="/workbench">打开兼容别名</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}
