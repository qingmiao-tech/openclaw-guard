/**
 * Web UI - 单文件 HTML 仪表盘
 * 导出 getHtmlPage() 返回完整 HTML 字符串
 */

export function getHtmlPage(): string {
  const css = `
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f172a;--card:#1e293b;--border:#334155;--text:#e2e8f0;--dim:#94a3b8;--green:#22c55e;--yellow:#eab308;--red:#ef4444;--blue:#3b82f6;--purple:#a855f7;--orange:#f97316}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.header{background:linear-gradient(135deg,#1e293b,#0f172a);border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;gap:1rem}
.header h1{font-size:1.25rem;font-weight:600}
.header .badge{background:var(--blue);color:#fff;font-size:.7rem;padding:2px 8px;border-radius:9999px}
.tabs{display:flex;gap:0;border-bottom:1px solid var(--border);padding:0 2rem;background:var(--card);flex-wrap:wrap}
.tab{padding:.75rem 1.25rem;cursor:pointer;color:var(--dim);border-bottom:2px solid transparent;transition:all .2s;font-size:.9rem;white-space:nowrap}
.tab:hover{color:var(--text)}
.tab.active{color:var(--blue);border-bottom-color:var(--blue)}
.content{max-width:1100px;margin:0 auto;padding:1.5rem 2rem}
.card{background:var(--card);border:1px solid var(--border);border-radius:.5rem;padding:1.25rem;margin-bottom:1rem}
.card h3{font-size:1rem;margin-bottom:.75rem;color:var(--text)}
.info-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.75rem}
.info-item{background:var(--bg);padding:.75rem;border-radius:.375rem}
.info-item .label{font-size:.75rem;color:var(--dim);margin-bottom:.25rem}
.info-item .value{font-size:.9rem;word-break:break-all}
.audit-item{display:flex;align-items:flex-start;gap:.75rem;padding:.6rem 0;border-bottom:1px solid var(--border)}
.audit-item:last-child{border-bottom:none}
.status-dot{width:10px;height:10px;border-radius:50%;margin-top:5px;flex-shrink:0}
.status-dot.pass{background:var(--green)}.status-dot.warn{background:var(--yellow)}.status-dot.fail{background:var(--red)}
.audit-detail{flex:1}
.audit-detail .name{font-size:.9rem;font-weight:500}
.audit-detail .msg{font-size:.8rem;color:var(--dim);margin-top:2px}
.audit-detail .fix{font-size:.75rem;color:var(--yellow);margin-top:4px;font-family:monospace}
.summary-bar{display:flex;gap:1.5rem;margin-bottom:1rem}
.summary-item{display:flex;align-items:center;gap:.4rem;font-size:.85rem}
.profile-card{background:var(--bg);border:1px solid var(--border);border-radius:.375rem;padding:1rem;margin-bottom:.75rem;display:flex;justify-content:space-between;align-items:center}
.profile-info .pname{font-weight:600;font-size:.9rem}
.profile-info .pdesc{font-size:.8rem;color:var(--dim);margin-top:2px}
.profile-info .prisk{font-size:.75rem;margin-top:4px}
.btn{padding:.4rem 1rem;border-radius:.375rem;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;font-size:.8rem;transition:all .2s}
.btn:hover{border-color:var(--blue);color:var(--blue)}
.btn.primary{background:var(--blue);border-color:var(--blue);color:#fff}
.btn.primary:hover{opacity:.85}
.btn.success{background:var(--green);border-color:var(--green);color:#fff}
.btn.success:hover{opacity:.85}
.btn.warning{background:var(--orange);border-color:var(--orange);color:#fff}
.btn.warning:hover{opacity:.85}
.btn.danger{background:var(--red);border-color:var(--red);color:#fff}
.btn.danger:hover{opacity:.85}
.btn:disabled{opacity:.5;cursor:not-allowed}
.step-card{background:var(--bg);border:1px solid var(--border);border-radius:.375rem;padding:1rem;margin-bottom:.75rem}
.step-card .stitle{font-weight:600;font-size:.9rem;margin-bottom:.25rem}
.step-card .sdesc{font-size:.8rem;color:var(--dim);margin-bottom:.5rem}
.step-card .optional-tag{font-size:.7rem;background:var(--purple);color:#fff;padding:1px 6px;border-radius:4px;margin-left:.5rem}
.step-card pre{background:var(--card);padding:.5rem;border-radius:.25rem;font-size:.8rem;overflow-x:auto;line-height:1.6;white-space:pre-wrap}
.platform-select{display:flex;gap:.5rem;margin-bottom:1rem}
.platform-select .btn.selected{background:var(--blue);border-color:var(--blue);color:#fff}
.loading{text-align:center;padding:2rem;color:var(--dim)}
.error-msg{text-align:center;padding:2rem;color:var(--red)}
.toast{position:fixed;bottom:2rem;right:2rem;background:var(--green);color:#fff;padding:.75rem 1.25rem;border-radius:.5rem;font-size:.85rem;opacity:0;transition:opacity .3s;pointer-events:none;z-index:100}
.toast.show{opacity:1}
.toast.error{background:var(--red)}
.hidden{display:none}
.oc-banner{padding:1.25rem;border-radius:.5rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.oc-banner.not-installed{background:linear-gradient(135deg,#7f1d1d,#991b1b);border:1px solid #dc2626}
.oc-banner.installed{background:linear-gradient(135deg,#14532d,#166534);border:1px solid #22c55e}
.oc-banner.update-available{background:linear-gradient(135deg,#78350f,#92400e);border:1px solid #f59e0b}
.oc-banner .oc-info{flex:1}
.oc-banner .oc-title{font-size:1.1rem;font-weight:600;margin-bottom:.25rem}
.oc-banner .oc-desc{font-size:.85rem;opacity:.85}
.oc-banner .oc-actions{display:flex;gap:.5rem;flex-shrink:0}
.oc-detail-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem;margin-top:1rem}
.spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;margin-right:.4rem;vertical-align:middle}
@keyframes spin{to{transform:rotate(360deg)}}
.log-box{background:var(--bg);border:1px solid var(--border);border-radius:.375rem;padding:.75rem;margin-top:.75rem;font-family:monospace;font-size:.8rem;max-height:200px;overflow-y:auto;white-space:pre-wrap;color:var(--dim)}
.form-group{margin-bottom:1rem}
.form-group label{display:block;font-size:.8rem;color:var(--dim);margin-bottom:.35rem}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:.5rem .75rem;background:var(--bg);border:1px solid var(--border);border-radius:.375rem;color:var(--text);font-size:.85rem;outline:none;transition:border-color .2s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--blue)}
.form-group select{cursor:pointer}
.form-group textarea{resize:vertical;min-height:60px;font-family:monospace}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
.form-check{display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem}
.form-check input[type=checkbox]{width:16px;height:16px;accent-color:var(--blue);cursor:pointer}
.form-check label{font-size:.85rem;color:var(--text);cursor:pointer}
.toggle{position:relative;display:inline-block;width:40px;height:22px}
.toggle input{opacity:0;width:0;height:0}
.toggle .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:var(--border);border-radius:22px;transition:.3s}
.toggle .slider:before{content:"";position:absolute;height:16px;width:16px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s}
.toggle input:checked+.slider{background:var(--green)}
.toggle input:checked+.slider:before{transform:translateX(18px)}
.channel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1rem}
.channel-card{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1rem;transition:border-color .2s;cursor:pointer}
.channel-card:hover{border-color:var(--blue)}
.channel-card.expanded{border-color:var(--blue);cursor:default}
.channel-header{display:flex;align-items:center;gap:.75rem}
.channel-icon{font-size:1.5rem}
.channel-meta{flex:1}
.channel-meta .ch-name{font-weight:600;font-size:.9rem}
.channel-meta .ch-status{font-size:.75rem;margin-top:2px}
.channel-config{margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)}
.channel-actions{display:flex;gap:.5rem;margin-top:1rem}
.provider-card{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1rem;margin-bottom:1rem}
.provider-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem}
.provider-header .p-name{font-weight:600;font-size:.95rem}
.provider-header .p-url{font-size:.75rem;color:var(--dim);margin-top:2px}
.model-list{display:flex;flex-wrap:wrap;gap:.5rem}
.model-tag{background:var(--card);border:1px solid var(--border);border-radius:.375rem;padding:.3rem .6rem;font-size:.8rem;display:flex;align-items:center;gap:.4rem}
.model-tag.is-primary{border-color:var(--green);background:rgba(34,197,94,.1)}
.model-tag .set-primary{cursor:pointer;color:var(--dim);font-size:.7rem;transition:color .2s}
.model-tag .set-primary:hover{color:var(--blue)}
.preset-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.75rem;margin-top:1rem}
.preset-card{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1rem;cursor:pointer;transition:border-color .2s}
.preset-card:hover{border-color:var(--blue)}
.preset-card .preset-icon{font-size:1.25rem;margin-bottom:.25rem}
.preset-card .preset-name{font-weight:600;font-size:.9rem}
.preset-card .preset-type{font-size:.75rem;color:var(--dim);margin-top:2px}
.log-viewer{background:#0a0e1a;border:1px solid var(--border);border-radius:.5rem;padding:1rem;font-family:"Fira Code","Cascadia Code",Consolas,monospace;font-size:.8rem;color:#a0aec0;min-height:400px;max-height:600px;overflow-y:auto;white-space:pre-wrap;line-height:1.6}
.log-toolbar{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap}
.log-toolbar select{padding:.35rem .5rem;background:var(--bg);border:1px solid var(--border);border-radius:.375rem;color:var(--text);font-size:.8rem}
.dash-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem;margin-bottom:1rem}
.dash-card{background:var(--card);border:1px solid var(--border);border-radius:.5rem;padding:1.25rem}
.dash-card .dash-label{font-size:.75rem;color:var(--dim);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.5px}
.dash-card .dash-value{font-size:1.5rem;font-weight:700}
.dash-card .dash-sub{font-size:.8rem;color:var(--dim);margin-top:.25rem}
.dash-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem}
.token-display{display:flex;align-items:center;gap:.5rem;background:var(--bg);padding:.5rem .75rem;border-radius:.375rem;border:1px solid var(--border);font-family:monospace;font-size:.85rem;cursor:pointer;transition:border-color .2s}
.token-display:hover{border-color:var(--blue)}
.section-title{font-size:.85rem;color:var(--dim);text-transform:uppercase;letter-spacing:.5px;margin-bottom:.75rem;margin-top:1.25rem}
.add-provider-form{background:var(--bg);border:1px solid var(--border);border-radius:.5rem;padding:1.25rem;margin-top:1rem}
`;

  const js = [
    'var API = "";',
    'var currentPlatform = "";',
    'var ocStatus = null;',
    'var logAutoRefresh = null;',
    'var logLines = 100;',
    '',
    'document.querySelectorAll(".tab").forEach(function(t) {',
    '  t.addEventListener("click", function() {',
    '    document.querySelectorAll(".tab").forEach(function(x) { x.classList.remove("active"); });',
    '    t.classList.add("active");',
    '    document.querySelectorAll("[id^=panel-]").forEach(function(p) { p.classList.add("hidden"); });',
    '    document.getElementById("panel-" + t.dataset.tab).classList.remove("hidden");',
    '    var tab = t.dataset.tab;',
    '    if (tab === "logs") loadLogs();',
    '    if (tab === "feishu") loadFeishu();',
    '    if (tab === "channels") loadChannels();',
    '    if (tab === "ai") loadAI();',
    '  });',
    '});',
    '',
    'function toast(msg, isError) {',
    '  var el = document.getElementById("toast");',
    '  el.textContent = msg;',
    '  el.className = "toast show" + (isError ? " error" : "");',
    '  setTimeout(function() { el.className = "toast"; }, 3000);',
    '}',
    '',
    'function esc(s) {',
    '  if (s == null) return "-";',
    '  var d = document.createElement("div");',
    '  d.textContent = String(s);',
    '  return d.innerHTML;',
    '}',
    '',
    'function infoItem(label, value) {',
    '  return \'<div class="info-item"><div class="label">\' + esc(label) + \'</div><div class="value">\' + esc(value) + \'</div></div>\';',
    '}',
    '',
    // === Dashboard tab ===
    'function loadDashboard() {',
    '  var panel = document.getElementById("panel-dashboard");',
    '  panel.innerHTML = \'<div class="loading">加载中...</div>\';',
    '  Promise.all([',
    '    fetch(API + "/api/service/status").then(function(r) { return r.json(); }),',
    '    fetch(API + "/api/info").then(function(r) { return r.json(); }),',
    '    fetch(API + "/api/gateway/token").then(function(r) { return r.json(); }),',
    '    fetch(API + "/api/gateway/dashboard").then(function(r) { return r.json(); })',
    '  ]).then(function(results) {',
    '    var svc = results[0];',
    '    var info = results[1];',
    '    var gw = results[2];',
    '    var dash = results[3];',
    '    currentPlatform = info.platform;',
    '    var oc = info.openclaw || {};',
    '    var running = svc.running;',
    '    var statusColor = running ? "var(--green)" : "var(--red)";',
    '    var statusText = running ? "运行中" : "已停止";',
    '',
    '    var html = \'<div class="dash-grid">\';',
    '    html += \'<div class="dash-card"><div class="dash-label">服务状态</div>\'',
    '      + \'<div class="dash-value" style="color:\' + statusColor + \'">\' + statusText + \'</div>\'',
    '      + \'<div class="dash-sub">\' + (running ? "PID: " + svc.pid + " · 端口: " + svc.port : "服务未启动") + \'</div></div>\';',
    '    html += \'<div class="dash-card"><div class="dash-label">平台</div>\'',
    '      + \'<div class="dash-value">\' + esc(info.platform) + \'</div>\'',
    '      + \'<div class="dash-sub">\' + esc(info.arch) + \' · \' + esc(info.user) + \'</div></div>\';',
    '    html += \'<div class="dash-card"><div class="dash-label">Node.js</div>\'',
    '      + \'<div class="dash-value">\' + esc(info.nodeVersion) + \'</div>\'',
    '      + \'<div class="dash-sub">OpenClaw: \' + (oc.installed ? esc(oc.version || "已安装") : "未安装") + \'</div></div>\';',
    '    html += \'<div class="dash-card"><div class="dash-label">OpenClaw 目录</div>\'',
    '      + \'<div class="dash-value" style="font-size:.85rem;word-break:break-all">\' + esc(info.openclawDir) + \'</div></div>\';',
    '    html += \'</div>\';',
    '',
    '    // 快捷操作',
    '    html += \'<div class="card"><h3>快捷操作</h3><div class="dash-actions">\'',
    '      + \'<button class="btn success" id="btn-svc-start" onclick="svcAction(\\x27start\\x27)" \' + (running ? "disabled" : "") + \'>▶ 启动</button>\'',
    '      + \'<button class="btn danger" id="btn-svc-stop" onclick="svcAction(\\x27stop\\x27)" \' + (!running ? "disabled" : "") + \'>⏹ 停止</button>\'',
    '      + \'<button class="btn warning" id="btn-svc-restart" onclick="svcAction(\\x27restart\\x27)">🔄 重启</button>\'',
    '      + \'</div></div>\';',
    '',
    '    // Gateway Token',
    '    html += \'<div class="card"><h3>Gateway Token</h3>\'',
    '      + \'<div class="token-display" onclick="copyToken(this)" title="点击复制">\'',
    '      + \'<span>🔑</span><span id="gw-token">\' + esc(gw.token ? gw.token.slice(0, 8) + "..." + gw.token.slice(-4) : "-") + \'</span>\'',
    '      + \'<span style="color:var(--dim);font-size:.75rem">点击复制</span>\'',
    '      + \'</div>\'',
    '      + \'<input type="hidden" id="gw-token-full" value="\' + esc(gw.token || "") + \'">\'',
    '      + \'</div>\';',
    '',
    '    // Dashboard URL',
    '    if (dash.url) {',
    '      html += \'<div class="card"><h3>Dashboard</h3>\'',
    '        + \'<a href="\' + esc(dash.url) + \'" target="_blank" style="color:var(--blue);font-size:.9rem">\' + esc(dash.url) + \' ↗</a>\'',
    '        + \'</div>\';',
    '    }',
    '',
    '    panel.innerHTML = html;',
    '  }).catch(function(e) {',
    '    panel.innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    'var svcActionLabels = { start: "▶ 启动", stop: "⏹ 停止", restart: "🔄 重启" };',
    'var svcActionLoading = { start: "启动中...", stop: "停止中...", restart: "重启中..." };',
    '',
    'function svcAction(action) {',
    '  var btn = document.getElementById("btn-svc-" + action);',
    '  var allBtns = ["start","stop","restart"].map(function(a) { return document.getElementById("btn-svc-" + a); });',
    '  // 禁用所有按钮，当前按钮显示 spinner',
    '  allBtns.forEach(function(b) { if (b) b.disabled = true; });',
    '  if (btn) btn.innerHTML = \'<span class="spinner"></span>\' + svcActionLoading[action];',
    '  fetch(API + "/api/service/" + action, { method: "POST" })',
    '    .then(function(r) { return r.json(); })',
    '    .then(function(d) {',
    '      toast(d.success ? "✅ " + d.message : "❌ " + d.message, !d.success);',
    '      // 局部刷新状态，不重建整个面板',
    '      refreshDashboardStatus();',
    '    }).catch(function(e) {',
    '      toast("请求失败: " + e.message, true);',
    '      // 恢复按钮',
    '      allBtns.forEach(function(b, i) { if (b) { b.disabled = false; b.innerHTML = svcActionLabels[["start","stop","restart"][i]]; } });',
    '    });',
    '}',
    '',
    'function refreshDashboardStatus() {',
    '  fetch(API + "/api/service/status").then(function(r) { return r.json(); }).then(function(svc) {',
    '    var running = svc.running;',
    '    var statusColor = running ? "var(--green)" : "var(--red)";',
    '    var statusText = running ? "运行中" : "已停止";',
    '    // 更新状态卡片（第一个 dash-card）',
    '    var cards = document.querySelectorAll(".dash-card");',
    '    if (cards.length > 0) {',
    '      var card = cards[0];',
    '      var valEl = card.querySelector(".dash-value");',
    '      var subEl = card.querySelector(".dash-sub");',
    '      if (valEl) { valEl.style.color = statusColor; valEl.textContent = statusText; }',
    '      if (subEl) { subEl.textContent = running ? "PID: " + svc.pid + " · 端口: " + svc.port : "服务未启动"; }',
    '    }',
    '    // 更新按钮状态',
    '    var btnStart = document.getElementById("btn-svc-start");',
    '    var btnStop = document.getElementById("btn-svc-stop");',
    '    var btnRestart = document.getElementById("btn-svc-restart");',
    '    if (btnStart) { btnStart.disabled = running; btnStart.innerHTML = svcActionLabels.start; }',
    '    if (btnStop) { btnStop.disabled = !running; btnStop.innerHTML = svcActionLabels.stop; }',
    '    if (btnRestart) { btnRestart.disabled = false; btnRestart.innerHTML = svcActionLabels.restart; }',
    '  }).catch(function() {',
    '    // 回退：恢复按钮文字',
    '    ["start","stop","restart"].forEach(function(a) {',
    '      var b = document.getElementById("btn-svc-" + a);',
    '      if (b) { b.disabled = false; b.innerHTML = svcActionLabels[a]; }',
    '    });',
    '  });',
    '}',
    '',
    'function copyToken(el) {',
    '  var full = document.getElementById("gw-token-full").value;',
    '  if (!full) return;',
    '  navigator.clipboard.writeText(full).then(function() { toast("✅ Token 已复制"); }).catch(function() {',
    '    var ta = document.createElement("textarea"); ta.value = full; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); toast("✅ Token 已复制");',
    '  });',
    '}',
    '',
    // === OpenClaw tab ===
    'function loadOpenClaw() {',
    '  return fetch(API + "/api/openclaw/status").then(function(r) { return r.json(); }).then(function(d) {',
    '    ocStatus = d;',
    '    renderOpenClaw(d);',
    '  }).catch(function(e) {',
    '    document.getElementById("panel-openclaw").innerHTML = \'<div class="error-msg">检测失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    'function renderOpenClaw(d) {',
    '  var bannerClass, title, desc;',
    '  if (!d.installed) {',
    '    bannerClass = "not-installed";',
    '    title = "❌ OpenClaw 未安装";',
    '    desc = "当前系统未检测到 OpenClaw，点击下方按钮一键安装";',
    '  } else if (d.updateAvailable) {',
    '    bannerClass = "update-available";',
    '    title = "🔄 有新版本可用";',
    '    desc = "当前版本: " + d.version + " → 最新版本: " + d.latestVersion;',
    '  } else {',
    '    bannerClass = "installed";',
    '    title = "✅ OpenClaw 已安装";',
    '    desc = "版本: " + (d.version || "未知") + (d.latestVersion ? " (最新: " + d.latestVersion + ")" : "");',
    '  }',
    '',
    '  var html = \'<div class="oc-banner \' + bannerClass + \'">\'',
    '    + \'<div class="oc-info"><div class="oc-title">\' + title + \'</div>\'',
    '    + \'<div class="oc-desc">\' + esc(desc) + \'</div></div>\'',
    '    + \'<div class="oc-actions">\';',
    '',
    '  if (!d.installed) {',
    '    html += \'<button class="btn success" id="btn-install" onclick="doInstall()">🚀 一键安装</button>\';',
    '  } else {',
    '    html += \'<button class="btn warning" id="btn-update" onclick="doUpdate()">📦 更新到最新版</button>\';',
    '    html += \'<button class="btn" onclick="doRefresh()">🔄 刷新状态</button>\';',
    '  }',
    '  html += \'</div></div>\';',
    '',
    '  // 详情卡片',
    '  html += \'<div class="card"><h3>环境详情</h3><div class="oc-detail-grid">\'',
    '    + infoItem("安装状态", d.installed ? "已安装 ✅" : "未安装 ❌")',
    '    + infoItem("当前版本", d.version || "-")',
    '    + infoItem("最新版本", d.latestVersion || "查询中...")',
    '    + infoItem("可执行路径", d.binPath || "-")',
    '    + infoItem("Node.js", d.nodeVersion)',
    '    + infoItem("npm", d.npmVersion || "-")',
    '    + \'</div></div>\';',
    '',
    '  // 安装说明',
    '  html += \'<div class="card"><h3>手动安装命令</h3>\'',
    '    + \'<pre>npm install -g openclaw@latest\\nopenclaw onboard --install-daemon</pre>\'',
    '    + \'<div style="font-size:.8rem;color:#94a3b8;margin-top:.5rem">需要 Node.js v22+，安装后运行 onboard 完成初始化配置</div>\'',
    '    + \'</div>\';',
    '',
    '  // 操作日志区域',
    '  html += \'<div id="install-log-area"></div>\';',
    '',
    '  document.getElementById("panel-openclaw").innerHTML = html;',
    '}',
    '',
    'function doInstall() {',
    '  var btn = document.getElementById("btn-install");',
    '  if (btn) { btn.disabled = true; btn.innerHTML = \'<span class="spinner"></span>安装中...\'; }',
    '  showLog("正在执行: npm install -g openclaw@latest ...");',
    '  fetch(API + "/api/openclaw/install", { method: "POST" })',
    '    .then(function(r) { return r.json(); })',
    '    .then(function(d) {',
    '      appendLog(d.output || "");',
    '      if (d.success) {',
    '        appendLog("\\n" + d.message);',
    '        toast("✅ " + d.message);',
    '        setTimeout(function() { loadOpenClaw(); }, 1000);',
    '      } else {',
    '        appendLog("\\n❌ " + d.message);',
    '        toast("❌ " + d.message, true);',
    '        if (btn) { btn.disabled = false; btn.innerHTML = "🚀 一键安装"; }',
    '      }',
    '    }).catch(function(e) {',
    '      appendLog("\\n请求失败: " + e.message);',
    '      toast("请求失败", true);',
    '      if (btn) { btn.disabled = false; btn.innerHTML = "🚀 一键安装"; }',
    '    });',
    '}',
    '',
    'function doUpdate() {',
    '  var btn = document.getElementById("btn-update");',
    '  if (btn) { btn.disabled = true; btn.innerHTML = \'<span class="spinner"></span>更新中...\'; }',
    '  showLog("正在执行: npm install -g openclaw@latest ...");',
    '  fetch(API + "/api/openclaw/update", { method: "POST" })',
    '    .then(function(r) { return r.json(); })',
    '    .then(function(d) {',
    '      appendLog(d.output || "");',
    '      if (d.success) {',
    '        appendLog("\\n" + d.message);',
    '        toast("✅ " + d.message);',
    '        setTimeout(function() { loadOpenClaw(); }, 1000);',
    '      } else {',
    '        appendLog("\\n❌ " + d.message);',
    '        toast("❌ " + d.message, true);',
    '        if (btn) { btn.disabled = false; btn.innerHTML = "📦 更新到最新版"; }',
    '      }',
    '    }).catch(function(e) {',
    '      appendLog("\\n请求失败: " + e.message);',
    '      toast("请求失败", true);',
    '      if (btn) { btn.disabled = false; btn.innerHTML = "📦 更新到最新版"; }',
    '    });',
    '}',
    '',
    'function doRefresh() {',
    '  document.getElementById("panel-openclaw").innerHTML = \'<div class="loading">检测中...</div>\';',
    '  loadOpenClaw();',
    '}',
    '',
    'function showLog(msg) {',
    '  var area = document.getElementById("install-log-area");',
    '  if (area) area.innerHTML = \'<div class="card"><h3>执行日志</h3><div class="log-box" id="log-content">\' + esc(msg) + \'</div></div>\';',
    '}',
    '',
    'function appendLog(msg) {',
    '  var el = document.getElementById("log-content");',
    '  if (el) { el.textContent += msg; el.scrollTop = el.scrollHeight; }',
    '}',
    '',
    // === Info tab ===
    'function loadInfo() {',
    '  return fetch(API + "/api/info").then(function(r) { return r.json(); }).then(function(d) {',
    '    currentPlatform = d.platform;',
    '    var oc = d.openclaw || {};',
    '    var ocBadge = oc.installed',
    '      ? \'<span style="color:#22c55e">✅ \' + esc(oc.version || "已安装") + \'</span>\'',
    '      : \'<span style="color:#ef4444">❌ 未安装</span>\';',
    '    document.getElementById("panel-info").innerHTML = \'<div class="card"><h3>环境概览</h3><div class="info-grid">\'',
    '      + infoItem("平台", d.platform) + infoItem("用户", d.user) + infoItem("Home 目录", d.home)',
    '      + infoItem("OpenClaw 目录", d.openclawDir) + infoItem("Node.js", d.nodeVersion) + infoItem("架构", d.arch)',
    '      + \'</div></div>\'',
    '      + \'<div class="card"><h3>OpenClaw 状态</h3><div style="font-size:.9rem">\' + ocBadge',
    '      + (oc.updateAvailable ? \' <span style="color:#f59e0b">（有更新: \' + esc(oc.latestVersion) + \'）</span>\' : "")',
    '      + (!oc.installed ? \'  <button class="btn primary" style="margin-left:.75rem;font-size:.75rem" onclick="document.querySelectorAll(\\x27.tab\\x27)[2].click()">前往安装 \\u2192</button>\' : "")',
    '      + \'</div></div>\';',
    '  }).catch(function(e) {',
    '    document.getElementById("panel-info").innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    // === Audit tab ===
    'function loadAudit() {',
    '  return fetch(API + "/api/audit").then(function(r) { return r.json(); }).then(function(d) {',
    '    var html = \'<div class="card"><h3>审计结果</h3><div class="summary-bar">\'',
    '      + \'<div class="summary-item"><span class="status-dot pass"></span> 通过 \' + d.summary.pass + \'</div>\'',
    '      + \'<div class="summary-item"><span class="status-dot warn"></span> 警告 \' + d.summary.warn + \'</div>\'',
    '      + \'<div class="summary-item"><span class="status-dot fail"></span> 失败 \' + d.summary.fail + \'</div>\'',
    '      + \'</div>\';',
    '    d.results.forEach(function(r) {',
    '      html += \'<div class="audit-item"><div class="status-dot \' + r.status + \'"></div><div class="audit-detail">\'',
    '        + \'<div class="name">[\' + esc(r.category) + \'] \' + esc(r.item) + \'</div>\'',
    '        + \'<div class="msg">\' + esc(r.message) + \'</div>\'',
    '        + (r.fix ? \'<div class="fix">修复: \' + esc(r.fix) + \'</div>\' : \'\')',
    '        + \'</div></div>\';',
    '    });',
    '    html += \'</div>\';',
    '    document.getElementById("panel-audit").innerHTML = html;',
    '  }).catch(function(e) {',
    '    document.getElementById("panel-audit").innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    // === Profiles tab ===
    'function loadProfiles() {',
    '  return fetch(API + "/api/profiles").then(function(r) { return r.json(); }).then(function(profiles) {',
    '    var html = \'<div class="card"><h3>安全 Profile</h3>\';',
    '    profiles.forEach(function(p) {',
    '      html += \'<div class="profile-card"><div class="profile-info">\'',
    '        + \'<div class="pname">\' + esc(p.name) + \'</div>\'',
    '        + \'<div class="pdesc">\' + esc(p.description) + \'</div>\'',
    '        + \'<div class="prisk">\' + esc(p.riskLevel) + \'</div>\'',
    '        + \'</div><button class="btn primary" onclick="applyProfile(\\x27\' + p.key + \'\\x27)">应用</button></div>\';',
    '    });',
    '    html += \'</div>\';',
    '    document.getElementById("panel-profiles").innerHTML = html;',
    '  }).catch(function(e) {',
    '    document.getElementById("panel-profiles").innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    'function applyProfile(key) {',
    '  fetch(API + "/api/profiles/apply", {',
    '    method: "POST", headers: {"Content-Type":"application/json"},',
    '    body: JSON.stringify({ profile: key })',
    '  }).then(function(r) { return r.json(); }).then(function(d) {',
    '    toast(d.success ? "✅ " + d.message : "❌ " + d.message, !d.success);',
    '  });',
    '}',
    '',
    // === Harden tab ===
    'function loadHarden(platform) {',
    '  platform = platform || currentPlatform || "linux";',
    '  fetch(API + "/api/harden/steps?platform=" + platform).then(function(r) { return r.json(); }).then(function(d) {',
    '    var platforms = ["windows","macos","linux"];',
    '    var html = \'<div class="card"><h3>加固步骤</h3><div class="platform-select">\';',
    '    platforms.forEach(function(pl) {',
    '      html += \'<button class="btn\' + (pl === d.platform ? " selected" : "") + \'" onclick="loadHarden(\\x27\' + pl + \'\\x27)">\' + pl + \'</button>\';',
    '    });',
    '    html += \'<button class="btn" style="margin-left:auto" onclick="downloadScript(\\x27\' + d.platform + \'\\x27)">📥 下载脚本</button></div>\';',
    '    d.steps.forEach(function(s) {',
    '      html += \'<div class="step-card"><div class="stitle">\' + esc(s.title)',
    '        + (s.optional ? \'<span class="optional-tag">可选</span>\' : "") + \'</div>\'',
    '        + \'<div class="sdesc">\' + esc(s.description) + \'</div>\'',
    '        + \'<pre>\' + s.commands.map(function(c) { return esc(c); }).join("\\n") + \'</pre></div>\';',
    '    });',
    '    html += \'</div>\';',
    '    document.getElementById("panel-harden").innerHTML = html;',
    '  }).catch(function(e) {',
    '    document.getElementById("panel-harden").innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    'function downloadScript(platform) {',
    '  window.open(API + "/api/harden/script?platform=" + platform);',
    '}',
    '',
    // === Feishu tab ===
    'function loadFeishu() {',
    '  var panel = document.getElementById("panel-feishu");',
    '  panel.innerHTML = \'<div class="loading">加载中...</div>\';',
    '  Promise.all([',
    '    fetch(API + "/api/feishu/config").then(function(r) { return r.json(); }),',
    '    fetch(API + "/api/feishu/plugin").then(function(r) { return r.json(); })',
    '  ]).then(function(results) {',
    '    var cfg = results[0];',
    '    var plugin = results[1];',
    '    var html = "";',
    '',
    '    // 插件状态',
    '    html += \'<div class="card"><h3>飞书插件状态</h3>\'',
    '      + (plugin.installed',
    '        ? \'<span style="color:var(--green)">✅ 已安装\' + (plugin.version ? " (v" + esc(plugin.version) + ")" : "") + \'</span>\'',
    '        : \'<span style="color:var(--red)">❌ 未安装</span>\')',
    '      + \'</div>\';',
    '',
    '    // 基础配置表单',
    '    html += \'<div class="card"><h3>应用配置</h3>\'',
    '      + \'<div class="form-row"><div class="form-group"><label>App ID</label>\'',
    '      + \'<input id="fs-appId" value="\' + esc(cfg.appId || "") + \'"></div>\'',
    '      + \'<div class="form-group"><label>App Secret</label>\'',
    '      + \'<input id="fs-appSecret" type="password" value="\' + esc(cfg.appSecret || "") + \'"></div></div>\'',
    '      + \'<div class="form-row"><div class="form-group"><label>Encrypt Key</label>\'',
    '      + \'<input id="fs-encryptKey" type="password" value="\' + esc(cfg.encryptKey || "") + \'"></div>\'',
    '      + \'<div class="form-group"><label>Verification Token</label>\'',
    '      + \'<input id="fs-verificationToken" value="\' + esc(cfg.verificationToken || "") + \'"></div></div>\'',
    '      + \'<div class="form-row"><div class="form-group"><label>域名类型</label>\'',
    '      + \'<select id="fs-domain"><option value="feishu"\' + (cfg.domain === "feishu" ? " selected" : "") + \'>飞书 (feishu)</option>\'',
    '      + \'<option value="lark"\' + (cfg.domain === "lark" ? " selected" : "") + \'>Lark (lark)</option></select></div>\'',
    '      + \'<div class="form-group"><label>连接模式</label>\'',
    '      + \'<select id="fs-connectionMode"><option value="webhook"\' + (cfg.connectionMode === "webhook" ? " selected" : "") + \'>Webhook</option>\'',
    '      + \'<option value="websocket"\' + (cfg.connectionMode === "websocket" ? " selected" : "") + \'>WebSocket</option></select></div></div>\'',
    '      + \'</div>\';',
    '',
    '    // Webhook 配置',
    '    html += \'<div class="card"><h3>Webhook 配置</h3>\'',
    '      + \'<div class="form-row-3"><div class="form-group"><label>Webhook Path</label>\'',
    '      + \'<input id="fs-webhookPath" value="\' + esc(cfg.webhookPath || "") + \'" placeholder="/webhook/feishu"></div>\'',
    '      + \'<div class="form-group"><label>Webhook Host</label>\'',
    '      + \'<input id="fs-webhookHost" value="\' + esc(cfg.webhookHost || "") + \'" placeholder="0.0.0.0"></div>\'',
    '      + \'<div class="form-group"><label>Webhook Port</label>\'',
    '      + \'<input id="fs-webhookPort" type="number" value="\' + esc(cfg.webhookPort || "") + \'" placeholder="3000"></div></div>\'',
    '      + \'</div>\';',
    '',
    '    // 策略配置',
    '    html += \'<div class="card"><h3>消息策略</h3>\'',
    '      + \'<div class="form-row-3"><div class="form-group"><label>私聊策略 (dmPolicy)</label>\'',
    '      + \'<select id="fs-dmPolicy"><option value="allow"\' + (cfg.dmPolicy === "allow" ? " selected" : "") + \'>允许 (allow)</option>\'',
    '      + \'<option value="deny"\' + (cfg.dmPolicy === "deny" ? " selected" : "") + \'>拒绝 (deny)</option>\'',
    '      + \'<option value="whitelist"\' + (cfg.dmPolicy === "whitelist" ? " selected" : "") + \'>白名单 (whitelist)</option></select></div>\'',
    '      + \'<div class="form-group"><label>群聊策略 (groupPolicy)</label>\'',
    '      + \'<select id="fs-groupPolicy"><option value="allow"\' + (cfg.groupPolicy === "allow" ? " selected" : "") + \'>允许 (allow)</option>\'',
    '      + \'<option value="deny"\' + (cfg.groupPolicy === "deny" ? " selected" : "") + \'>拒绝 (deny)</option>\'',
    '      + \'<option value="whitelist"\' + (cfg.groupPolicy === "whitelist" ? " selected" : "") + \'>白名单 (whitelist)</option></select></div>\'',
    '      + \'<div style="display:flex;align-items:flex-end;padding-bottom:.35rem"><div class="form-check">\'',
    '      + \'<input type="checkbox" id="fs-requireMention"\' + (cfg.requireMention ? " checked" : "") + \'>\'',
    '      + \'<label for="fs-requireMention">群聊需要 @机器人</label></div></div></div>\'',
    '      + \'</div>\';',
    '',
    '    // 高级配置',
    '    html += \'<div class="card"><h3>高级配置</h3>\'',
    '      + \'<div class="form-row-3"><div style="display:flex;align-items:center;gap:1rem;padding-top:.5rem">\'',
    '      + \'<div class="form-check"><input type="checkbox" id="fs-streaming"\' + (cfg.streaming ? " checked" : "") + \'>\'',
    '      + \'<label for="fs-streaming">流式输出</label></div></div>\'',
    '      + \'<div class="form-group"><label>渲染模式</label>\'',
    '      + \'<select id="fs-renderMode"><option value="markdown"\' + (cfg.renderMode === "markdown" ? " selected" : "") + \'>Markdown</option>\'',
    '      + \'<option value="raw"\' + (cfg.renderMode === "raw" ? " selected" : "") + \'>Raw</option></select></div>\'',
    '      + \'<div class="form-group"><label>Whisper 模型</label>\'',
    '      + \'<input id="fs-whisperModel" value="\' + esc(cfg.whisperModel || "") + \'" placeholder="whisper-1"></div></div>\'',
    '      + \'<div style="margin-top:1rem"><button class="btn primary" onclick="saveFeishu()">💾 保存飞书配置</button></div>\'',
    '      + \'</div>\';',
    '',
    '    panel.innerHTML = html;',
    '  }).catch(function(e) {',
    '    panel.innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    'function saveFeishu() {',
    '  var data = {',
    '    appId: document.getElementById("fs-appId").value,',
    '    appSecret: document.getElementById("fs-appSecret").value,',
    '    encryptKey: document.getElementById("fs-encryptKey").value,',
    '    verificationToken: document.getElementById("fs-verificationToken").value,',
    '    domain: document.getElementById("fs-domain").value,',
    '    connectionMode: document.getElementById("fs-connectionMode").value,',
    '    webhookPath: document.getElementById("fs-webhookPath").value,',
    '    webhookHost: document.getElementById("fs-webhookHost").value,',
    '    webhookPort: document.getElementById("fs-webhookPort").value,',
    '    dmPolicy: document.getElementById("fs-dmPolicy").value,',
    '    groupPolicy: document.getElementById("fs-groupPolicy").value,',
    '    requireMention: document.getElementById("fs-requireMention").checked,',
    '    streaming: document.getElementById("fs-streaming").checked,',
    '    renderMode: document.getElementById("fs-renderMode").value,',
    '    whisperModel: document.getElementById("fs-whisperModel").value',
    '  };',
    '  fetch(API + "/api/feishu/config", {',
    '    method: "POST", headers: {"Content-Type":"application/json"},',
    '    body: JSON.stringify(data)',
    '  }).then(function(r) { return r.json(); }).then(function(d) {',
    '    toast(d.success ? "✅ 飞书配置已保存" : "❌ " + d.message, !d.success);',
    '  }).catch(function(e) { toast("保存失败: " + e.message, true); });',
    '}',
    '',
    // === Channels tab ===
    'var expandedChannel = null;',
    '',
    'function loadChannels() {',
    '  var panel = document.getElementById("panel-channels");',
    '  panel.innerHTML = \'<div class="loading">加载中...</div>\';',
    '  fetch(API + "/api/channels").then(function(r) { return r.json(); }).then(function(channels) {',
    '    var html = \'<div class="card"><h3>渠道列表</h3>\'',
    '      + \'<div style="font-size:.8rem;color:var(--dim);margin-bottom:1rem">点击渠道卡片展开配置</div>\'',
    '      + \'<div class="channel-grid">\';',
    '    channels.forEach(function(ch) {',
    '      var isExpanded = expandedChannel === ch.id;',
    '      var statusColor = ch.enabled ? "var(--green)" : "var(--dim)";',
    '      var statusText = ch.enabled ? "已启用" : "未启用";',
    '      if (ch.configured) statusText += " · 已配置";',
    '      html += \'<div class="channel-card\' + (isExpanded ? " expanded" : "") + \'" id="ch-\' + ch.id + \'">\';',
    '      html += \'<div class="channel-header" onclick="toggleChannel(\\x27\' + ch.id + \'\\x27)">\'',
    '        + \'<div class="channel-icon">\' + (ch.icon || "📱") + \'</div>\'',
    '        + \'<div class="channel-meta"><div class="ch-name">\' + esc(ch.name) + \'</div>\'',
    '        + \'<div class="ch-status" style="color:\' + statusColor + \'">\' + statusText + \'</div></div>\'',
    '        + \'<label class="toggle" onclick="event.stopPropagation()">\'',
    '        + \'<input type="checkbox"\' + (ch.enabled ? " checked" : "") + \' onchange="toggleChannelEnabled(\\x27\' + ch.id + \'\\x27, this.checked)">\'',
    '        + \'<span class="slider"></span></label></div>\';',
    '',
    '      if (isExpanded) {',
    '        html += \'<div class="channel-config">\';',
    '        var cfg = ch.config || {};',
    '        var keys = Object.keys(cfg);',
    '        if (keys.length === 0) {',
    '          html += \'<div style="font-size:.85rem;color:var(--dim)">暂无配置项</div>\';',
    '        } else {',
    '          keys.forEach(function(k) {',
    '            html += \'<div class="form-group"><label>\' + esc(k) + \'</label>\'',
    '              + \'<input class="ch-cfg-input" data-channel="\' + ch.id + \'" data-key="\' + esc(k) + \'" value="\' + esc(cfg[k] || "") + \'"></div>\';',
    '          });',
    '        }',
    '        html += \'<div class="channel-actions">\'',
    '          + \'<button class="btn primary" onclick="saveChannelConfig(\\x27\' + ch.id + \'\\x27)">💾 保存</button>\'',
    '          + \'<button class="btn danger" onclick="clearChannelConfig(\\x27\' + ch.id + \'\\x27)">🗑 清除配置</button>\'',
    '          + \'</div></div>\';',
    '      }',
    '      html += \'</div>\';',
    '    });',
    '    html += \'</div></div>\';',
    '    panel.innerHTML = html;',
    '  }).catch(function(e) {',
    '    panel.innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    'function toggleChannel(id) {',
    '  expandedChannel = expandedChannel === id ? null : id;',
    '  loadChannels();',
    '}',
    '',
    'function toggleChannelEnabled(id, enabled) {',
    '  fetch(API + "/api/channels/" + id, {',
    '    method: "POST", headers: {"Content-Type":"application/json"},',
    '    body: JSON.stringify({ enabled: enabled })',
    '  }).then(function(r) { return r.json(); }).then(function(d) {',
    '    toast(d.success ? "✅ 渠道状态已更新" : "❌ " + d.message, !d.success);',
    '    loadChannels();',
    '  }).catch(function(e) { toast("操作失败: " + e.message, true); });',
    '}',
    '',
    'function saveChannelConfig(id) {',
    '  var inputs = document.querySelectorAll(".ch-cfg-input[data-channel=\'" + id + "\']");',
    '  var cfg = {};',
    '  inputs.forEach(function(inp) { cfg[inp.dataset.key] = inp.value; });',
    '  fetch(API + "/api/channels/" + id, {',
    '    method: "POST", headers: {"Content-Type":"application/json"},',
    '    body: JSON.stringify(cfg)',
    '  }).then(function(r) { return r.json(); }).then(function(d) {',
    '    toast(d.success ? "✅ 渠道配置已保存" : "❌ " + d.message, !d.success);',
    '  }).catch(function(e) { toast("保存失败: " + e.message, true); });',
    '}',
    '',
    'function clearChannelConfig(id) {',
    '  if (!confirm("确定要清除该渠道的配置吗？")) return;',
    '  fetch(API + "/api/channels/" + id, { method: "DELETE" })',
    '    .then(function(r) { return r.json(); }).then(function(d) {',
    '      toast(d.success ? "✅ 配置已清除" : "❌ " + d.message, !d.success);',
    '      loadChannels();',
    '    }).catch(function(e) { toast("操作失败: " + e.message, true); });',
    '}',
    '',
    // === AI Config tab ===
    'var showAddProvider = false;',
    'var selectedPreset = null;',
    '',
    'function loadAI() {',
    '  var panel = document.getElementById("panel-ai");',
    '  panel.innerHTML = \'<div class="loading">加载中...</div>\';',
    '  fetch(API + "/api/ai/config").then(function(r) { return r.json(); }).then(function(d) {',
    '    var html = "";',
    '',
    '    // 主模型',
    '    html += \'<div class="card"><h3>当前主模型</h3>\'',
    '      + \'<div style="font-size:1.1rem;font-weight:600;color:\' + (d.primaryModel ? "var(--green)" : "var(--dim)") + \'">\' + esc(d.primaryModel || "未设置") + \'</div>\'',
    '      + \'</div>\';',
    '',
    '    // 已配置的 Provider',
    '    html += \'<div class="card"><h3>已配置的 Provider</h3>\';',
    '    if (d.providers.length === 0) {',
    '      html += \'<div style="color:var(--dim);font-size:.85rem">暂无已配置的 Provider，点击下方按钮添加</div>\';',
    '    } else {',
    '      d.providers.forEach(function(p) {',
    '        html += \'<div class="provider-card"><div class="provider-header"><div>\'',
    '          + \'<div class="p-name">\' + esc(p.name) + \'</div>\'',
    '          + \'<div class="p-url">\' + esc(p.baseUrl) + (p.hasApiKey ? " · 🔑 " + esc(p.apiKeyMasked) : " · 无 API Key") + \'</div>\'',
    '          + \'</div><button class="btn danger" onclick="deleteAIProvider(\\x27\' + esc(p.name) + \'\\x27)" style="font-size:.75rem">🗑 删除</button></div>\'',
    '          + \'<div class="model-list">\';',
    '        p.models.forEach(function(m) {',
    '          html += \'<div class="model-tag\' + (m.isPrimary ? " is-primary" : "") + \'">\'',
    '            + \'<span>\' + esc(m.name || m.id) + \'</span>\'',
    '            + (m.isPrimary ? \'<span style="color:var(--green);font-size:.7rem">★ 主模型</span>\' : \'<span class="set-primary" onclick="setAIPrimary(\\x27\' + esc(m.fullId) + \'\\x27)">设为主模型</span>\')',
    '            + \'</div>\';',
    '        });',
    '        html += \'</div></div>\';',
    '      });',
    '    }',
    '    html += \'<div style="margin-top:1rem"><button class="btn primary" onclick="toggleAddProvider()">➕ 添加 Provider</button></div>\'',
    '      + \'</div>\';',
    '',
    '    // 添加 Provider 区域',
    '    html += \'<div id="add-provider-area"></div>\';',
    '',
    '    panel.innerHTML = html;',
    '    if (showAddProvider) loadPresets();',
    '  }).catch(function(e) {',
    '    panel.innerHTML = \'<div class="error-msg">加载失败: \' + esc(e.message) + \'</div>\';',
    '  });',
    '}',
    '',
    'function toggleAddProvider() {',
    '  showAddProvider = !showAddProvider;',
    '  if (showAddProvider) { loadPresets(); } else { document.getElementById("add-provider-area").innerHTML = ""; }',
    '}',
    '',
    'function loadPresets() {',
    '  fetch(API + "/api/ai/providers").then(function(r) { return r.json(); }).then(function(presets) {',
    '    var area = document.getElementById("add-provider-area");',
    '    if (!area) return;',
    '    if (selectedPreset) { renderPresetForm(selectedPreset, presets); return; }',
    '    var html = \'<div class="card"><h3>选择 Provider</h3>\'',
    '      + \'<div style="font-size:.8rem;color:var(--dim);margin-bottom:.75rem">选择一个预设 Provider 进行配置</div>\'',
    '      + \'<div class="preset-grid">\';',
    '    presets.forEach(function(p) {',
    '      html += \'<div class="preset-card" onclick="selectPreset(\\x27\' + esc(p.id) + \'\\x27)">\'',
    '        + \'<div class="preset-icon">\' + (p.icon || "🤖") + \'</div>\'',
    '        + \'<div class="preset-name">\' + esc(p.name) + \'</div>\'',
    '        + \'<div class="preset-type">\' + esc(p.apiType) + (p.requiresApiKey ? " · 需要 API Key" : " · 无需 Key") + \'</div>\'',
    '        + \'</div>\';',
    '    });',
    '    html += \'</div><div style="margin-top:1rem"><button class="btn" onclick="toggleAddProvider()">取消</button></div></div>\';',
    '    area.innerHTML = html;',
    '  }).catch(function(e) { toast("加载预设失败: " + e.message, true); });',
    '}',
    '',
    'function selectPreset(id) {',
    '  selectedPreset = id;',
    '  fetch(API + "/api/ai/providers").then(function(r) { return r.json(); }).then(function(presets) {',
    '    renderPresetForm(id, presets);',
    '  });',
    '}',
    '',
    'function renderPresetForm(id, presets) {',
    '  var preset = presets.find(function(p) { return p.id === id; });',
    '  if (!preset) return;',
    '  var area = document.getElementById("add-provider-area");',
    '  if (!area) return;',
    '  var html = \'<div class="add-provider-form"><h3>\' + (preset.icon || "🤖") + " " + esc(preset.name) + \'</h3>\'',
    '    + \'<div class="form-row"><div class="form-group"><label>Provider 名称</label>\'',
    '    + \'<input id="ap-name" value="\' + esc(preset.id) + \'"></div>\'',
    '    + \'<div class="form-group"><label>Base URL</label>\'',
    '    + \'<input id="ap-baseUrl" value="\' + esc(preset.defaultBaseUrl) + \'"></div></div>\';',
    '  if (preset.requiresApiKey) {',
    '    html += \'<div class="form-group"><label>API Key</label>\'',
    '      + \'<input id="ap-apiKey" type="password" placeholder="输入 API Key"></div>\';',
    '  }',
    '  html += \'<input type="hidden" id="ap-apiType" value="\' + esc(preset.apiType) + \'">\';',
    '  html += \'<div class="section-title">选择模型</div>\';',
    '  preset.suggestedModels.forEach(function(m) {',
    '    html += \'<div class="form-check"><input type="checkbox" id="ap-model-\' + esc(m.id) + \'" value="\' + esc(m.id) + \'" data-name="\' + esc(m.name) + \'"\' + (m.recommended ? " checked" : "") + \'>\'',
    '      + \'<label for="ap-model-\' + esc(m.id) + \'">\' + esc(m.name) + (m.description ? " - " + esc(m.description) : "") + \'</label></div>\';',
    '  });',
    '  html += \'<div style="margin-top:1rem;display:flex;gap:.5rem">\'',
    '    + \'<button class="btn primary" onclick="saveNewProvider()">💾 保存</button>\'',
    '    + \'<button class="btn" onclick="selectedPreset=null;loadPresets()">返回</button>\'',
    '    + \'<button class="btn" onclick="selectedPreset=null;showAddProvider=false;document.getElementById(\\x27add-provider-area\\x27).innerHTML=\\x27\\x27">取消</button>\'',
    '    + \'</div></div>\';',
    '  area.innerHTML = html;',
    '}',
    '',
    'function saveNewProvider() {',
    '  var name = document.getElementById("ap-name").value.trim();',
    '  var baseUrl = document.getElementById("ap-baseUrl").value.trim();',
    '  var apiType = document.getElementById("ap-apiType").value;',
    '  var apiKeyEl = document.getElementById("ap-apiKey");',
    '  var apiKey = apiKeyEl ? apiKeyEl.value.trim() : "";',
    '  if (!name || !baseUrl) { toast("请填写名称和 Base URL", true); return; }',
    '  var models = [];',
    '  document.querySelectorAll("[id^=ap-model-]:checked").forEach(function(cb) {',
    '    models.push({ id: cb.value, name: cb.dataset.name || cb.value });',
    '  });',
    '  if (models.length === 0) { toast("请至少选择一个模型", true); return; }',
    '  var data = { name: name, baseUrl: baseUrl, apiType: apiType, models: models };',
    '  if (apiKey) data.apiKey = apiKey;',
    '  fetch(API + "/api/ai/provider", {',
    '    method: "POST", headers: {"Content-Type":"application/json"},',
    '    body: JSON.stringify(data)',
    '  }).then(function(r) { return r.json(); }).then(function(d) {',
    '    if (d.success) {',
    '      toast("✅ " + d.message);',
    '      showAddProvider = false;',
    '      selectedPreset = null;',
    '      loadAI();',
    '    } else { toast("❌ " + d.message, true); }',
    '  }).catch(function(e) { toast("保存失败: " + e.message, true); });',
    '}',
    '',
    'function deleteAIProvider(name) {',
    '  if (!confirm("确定要删除 Provider: " + name + " 吗？")) return;',
    '  fetch(API + "/api/ai/provider/" + encodeURIComponent(name), { method: "DELETE" })',
    '    .then(function(r) { return r.json(); }).then(function(d) {',
    '      toast(d.success ? "✅ " + d.message : "❌ " + d.message, !d.success);',
    '      loadAI();',
    '    }).catch(function(e) { toast("删除失败: " + e.message, true); });',
    '}',
    '',
    'function setAIPrimary(modelId) {',
    '  fetch(API + "/api/ai/primary", {',
    '    method: "POST", headers: {"Content-Type":"application/json"},',
    '    body: JSON.stringify({ modelId: modelId })',
    '  }).then(function(r) { return r.json(); }).then(function(d) {',
    '    toast(d.success ? "✅ " + d.message : "❌ " + d.message, !d.success);',
    '    loadAI();',
    '  }).catch(function(e) { toast("设置失败: " + e.message, true); });',
    '}',
    '',
    // === Logs tab ===
    'function loadLogs() {',
    '  var viewer = document.getElementById("log-viewer-content");',
    '  if (!viewer) return;',
    '  fetch(API + "/api/service/logs?lines=" + logLines).then(function(r) { return r.json(); }).then(function(d) {',
    '    var logs = d.logs || [];',
    '    viewer.textContent = logs.length > 0 ? logs.join("\\n") : "暂无日志";',
    '    viewer.scrollTop = viewer.scrollHeight;',
    '  }).catch(function(e) {',
    '    viewer.textContent = "加载失败: " + e.message;',
    '  });',
    '}',
    '',
    'function toggleLogAutoRefresh() {',
    '  var cb = document.getElementById("log-auto-refresh");',
    '  if (cb.checked) {',
    '    logAutoRefresh = setInterval(loadLogs, 3000);',
    '    toast("自动刷新已开启 (3秒)");',
    '  } else {',
    '    if (logAutoRefresh) { clearInterval(logAutoRefresh); logAutoRefresh = null; }',
    '    toast("自动刷新已关闭");',
    '  }',
    '}',
    '',
    'function setLogLines(val) {',
    '  logLines = parseInt(val, 10) || 100;',
    '  loadLogs();',
    '}',
    '',
    '// 初始化',
    'loadDashboard();',
    'Promise.all([loadInfo(), loadOpenClaw(), loadAudit(), loadProfiles()]).then(function() { loadHarden(); }).catch(function(e) { console.error("Init error:", e); });',
  ].join('\n');

  return '<!DOCTYPE html>\n'
    + '<html lang="zh-CN">\n<head>\n'
    + '<meta charset="UTF-8">\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    + '<title>OpenClaw Guard - 安全管理面板</title>\n'
    + '<style>' + css + '</style>\n'
    + '</head>\n<body>\n'
    + '<div class="header">\n'
    + '  <span style="font-size:1.5rem">🛡️</span>\n'
    + '  <h1>OpenClaw Guard</h1>\n'
    + '  <span class="badge">v2.0.0</span>\n'
    + '</div>\n'
    + '<div class="tabs">\n'
    + '  <div class="tab active" data-tab="dashboard">📊 仪表盘</div>\n'
    + '  <div class="tab" data-tab="info">系统信息</div>\n'
    + '  <div class="tab" data-tab="openclaw">OpenClaw</div>\n'
    + '  <div class="tab" data-tab="feishu">🐦 飞书配置</div>\n'
    + '  <div class="tab" data-tab="channels">📱 渠道管理</div>\n'
    + '  <div class="tab" data-tab="ai">🤖 AI 配置</div>\n'
    + '  <div class="tab" data-tab="audit">安全审计</div>\n'
    + '  <div class="tab" data-tab="profiles">权限配置</div>\n'
    + '  <div class="tab" data-tab="harden">系统加固</div>\n'
    + '  <div class="tab" data-tab="logs">📋 日志</div>\n'
    + '</div>\n'
    + '<div class="content">\n'
    + '  <div id="panel-dashboard"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-info" class="hidden"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-openclaw" class="hidden"><div class="loading">检测中...</div></div>\n'
    + '  <div id="panel-feishu" class="hidden"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-channels" class="hidden"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-ai" class="hidden"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-audit" class="hidden"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-profiles" class="hidden"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-harden" class="hidden"><div class="loading">加载中...</div></div>\n'
    + '  <div id="panel-logs" class="hidden">\n'
    + '    <div class="card">\n'
    + '      <h3>服务日志</h3>\n'
    + '      <div class="log-toolbar">\n'
    + '        <button class="btn primary" onclick="loadLogs()">🔄 刷新</button>\n'
    + '        <label style="display:flex;align-items:center;gap:.4rem;font-size:.85rem">\n'
    + '          <input type="checkbox" id="log-auto-refresh" onchange="toggleLogAutoRefresh()"> 自动刷新\n'
    + '        </label>\n'
    + '        <select onchange="setLogLines(this.value)">\n'
    + '          <option value="50">50 行</option>\n'
    + '          <option value="100" selected>100 行</option>\n'
    + '          <option value="200">200 行</option>\n'
    + '          <option value="500">500 行</option>\n'
    + '        </select>\n'
    + '      </div>\n'
    + '      <div class="log-viewer" id="log-viewer-content">点击刷新加载日志...</div>\n'
    + '    </div>\n'
    + '  </div>\n'
    + '</div>\n'
    + '<div class="toast" id="toast"></div>\n'
    + '<script>\n' + js + '\n</script>\n'
    + '</body>\n</html>';
}
