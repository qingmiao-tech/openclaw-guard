export function getIntegratedGuardPage(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenClaw Guard</title>
  <link rel="stylesheet" href="/ui/guard-ui.css">
</head>
<body>
  <div id="guard-app"></div>
  <script>
    window.__OPENCLAW_GUARD_UI__ = {
      compatUrl: '/compat',
      legacyUrl: '/legacy',
      workbenchUrl: '/workbench'
    };
  </script>
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
  <title>OpenClaw Guard 兼容页</title>
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
      <h1>兼容说明</h1>
      <p>默认入口已经收口到统一的 Guard 主面板。这里保留为兼容说明页，避免旧链接失效。</p>
      <ul>
        <li>主入口：<code>/</code></li>
        <li>旧版别名：<code>/legacy</code></li>
        <li>实验入口：<code>/workbench</code></li>
      </ul>
      <div class="actions">
        <a class="primary" href="/">打开主面板</a>
        <a href="/legacy">打开旧版别名</a>
        <a href="/workbench">打开实验入口</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}
