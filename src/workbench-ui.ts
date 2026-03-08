export function getWorkbenchPage(): string {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OpenClaw Guard Workbench</title>
  <style>
    :root {
      --bg: #f3f5ef;
      --panel: #fbfbf7;
      --panel-2: #ffffff;
      --line: #d8dccf;
      --text: #1e2a1f;
      --muted: #5e6c60;
      --accent: #1f6f52;
      --accent-2: #dbe9df;
      --danger: #b03a2e;
      --warning: #b27a10;
      --shadow: 0 18px 50px rgba(31, 54, 39, 0.08);
      --radius: 18px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top right, rgba(164, 200, 170, 0.25), transparent 28%),
        linear-gradient(180deg, #f8faf4 0%, var(--bg) 100%);
      min-height: 100vh;
    }
    .layout {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      min-height: 100vh;
    }
    aside {
      padding: 24px;
      border-right: 1px solid rgba(0, 0, 0, 0.05);
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: auto;
    }
    .brand {
      padding: 18px;
      border-radius: var(--radius);
      background: linear-gradient(135deg, #173b2e, #245743);
      color: #f6f8f2;
      box-shadow: var(--shadow);
      margin-bottom: 18px;
    }
    .brand h1 { margin: 0; font-size: 24px; }
    .brand p { margin: 8px 0 0; color: rgba(255,255,255,0.82); line-height: 1.5; }
    .nav-group { display: grid; gap: 8px; }
    .tab-btn {
      border: 0;
      text-align: left;
      padding: 12px 14px;
      border-radius: 14px;
      background: transparent;
      color: var(--muted);
      cursor: pointer;
      font-size: 14px;
      transition: 0.2s ease;
    }
    .tab-btn:hover, .tab-btn.active {
      background: var(--accent-2);
      color: var(--accent);
      font-weight: 600;
    }
    main {
      padding: 28px;
      overflow: auto;
    }
    .page-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 22px;
    }
    .page-head h2 { margin: 0; font-size: 28px; }
    .page-head p { margin: 6px 0 0; color: var(--muted); }
    .actions { display: flex; gap: 10px; flex-wrap: wrap; }
    button, input, select, textarea {
      font: inherit;
      border-radius: 12px;
      border: 1px solid var(--line);
    }
    button {
      padding: 10px 14px;
      cursor: pointer;
      background: var(--panel-2);
      color: var(--text);
    }
    button.primary {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
    button.warn {
      border-color: rgba(178, 122, 16, 0.45);
      color: var(--warning);
      background: #fff9ec;
    }
    button.danger {
      border-color: rgba(176, 58, 46, 0.35);
      color: var(--danger);
      background: #fff1ef;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 18px;
    }
    .card {
      background: rgba(255,255,255,0.84);
      border: 1px solid rgba(0,0,0,0.04);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 18px;
    }
    .card h3 { margin: 0 0 12px; font-size: 18px; }
    .metric { font-size: 28px; font-weight: 700; margin: 8px 0; }
    .muted { color: var(--muted); }
    .hidden { display: none; }
    .stack { display: grid; gap: 12px; }
    .list {
      display: grid;
      gap: 10px;
    }
    .list-item {
      padding: 12px 14px;
      border-radius: 14px;
      background: var(--panel-2);
      border: 1px solid rgba(0,0,0,0.05);
    }
    .row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 999px;
      background: #eef5f0;
      color: var(--accent);
    }
    .pill.warn { background: #fff3db; color: var(--warning); }
    .pill.danger { background: #fde7e3; color: var(--danger); }
    input, select, textarea {
      width: 100%;
      padding: 10px 12px;
      background: rgba(255,255,255,0.92);
    }
    textarea {
      min-height: 280px;
      resize: vertical;
      font-family: Consolas, "Courier New", monospace;
      font-size: 13px;
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: Consolas, "Courier New", monospace;
      font-size: 13px;
      line-height: 1.6;
    }
    .two-col {
      display: grid;
      grid-template-columns: minmax(260px, 360px) minmax(0, 1fr);
      gap: 16px;
    }
    .status-bar {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: #eef5f0;
      color: var(--accent);
      font-size: 13px;
    }
    .status-bar.error { background: #fde7e3; color: var(--danger); }
    .toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
    .toolbar > * { flex: 1 1 180px; }
    @media (max-width: 960px) {
      .layout { grid-template-columns: 1fr; }
      aside { position: static; height: auto; }
      main { padding: 18px; }
      .two-col { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="layout">
    <aside>
      <div class="brand">
        <h1>OpenClaw Guard</h1>
        <p>Native Guard workbench. Keep the lightweight Guard architecture and gradually replace the external tenacitOS sidecar.</p>
      </div>
      <div class="nav-group" id="nav"></div>
    </aside>
    <main>
      <div class="page-head">
        <div>
          <h2 id="page-title">Overview</h2>
          <p id="page-desc">Inspect system health, agents, sessions, Git sync, and daily operations from one place.</p>
        </div>
        <div class="actions">
          <button onclick="window.location.reload()">Refresh Workbench</button>
          <button onclick="window.location.href='/compat'">Open Compatibility Page</button>
        </div>
      </div>
      <div id="panels"></div>
    </main>
  </div>
  <script>
    const TABS = [
      ['overview', 'Overview', 'System and runtime summary'],
      ['notifications', 'Notifications', 'Notification center and unread handling'],
      ['agents', 'Agents', 'Roles, workspaces, and document status'],
      ['sessions', 'Sessions', 'Current runtime session list'],
      ['activity', 'Activity', 'Recent activity timeline'],
      ['files', 'Files', 'Managed workspace file browser and editor'],
      ['memory', 'Memory', 'SOUL / USER / AGENTS / MEMORY and memory folders'],
      ['search', 'Search', 'Cross-workspace full text search'],
      ['costs', 'Costs', 'Token usage and estimated cost'],
      ['cron', 'Cron', 'Scheduled jobs and manual actions'],
      ['git-sync', 'Git Sync', 'Private repo validation, commit, and push'],
      ['ai', 'AI', 'Model and fallback status'],
      ['channels', 'Channels', 'Channel configuration summary'],
      ['audit', 'Audit', 'Security audit results'],
      ['harden', 'Harden', 'Hardening steps preview']
    ];

    const state = {
      activeTab: 'overview',
      currentFilePath: '',
      currentDirPath: '',
      currentParentPath: '',
      currentFileTruncated: false,
      fileContent: '',
    };

    function esc(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function navInit() {
      const nav = document.getElementById('nav');
      nav.innerHTML = TABS.map(([id, label]) => '<button class="tab-btn' + (id === state.activeTab ? ' active' : '') + '" data-tab="' + id + '">' + label + '</button>').join('');
      nav.querySelectorAll('[data-tab]').forEach((button) => {
        button.addEventListener('click', () => switchTab(button.getAttribute('data-tab')));
      });
    }

    function panelShell(id) {
      return '<section class="panel' + (state.activeTab === id ? '' : ' hidden') + '" id="panel-' + id + '"><div class="card"><div class="muted">Loading...</div></div></section>';
    }

    function renderPanels() {
      document.getElementById('panels').innerHTML = TABS.map(([id]) => panelShell(id)).join('');
    }

    function setHead(tabId) {
      const tab = TABS.find((item) => item[0] === tabId) || TABS[0];
      document.getElementById('page-title').textContent = tab[1];
      document.getElementById('page-desc').textContent = tab[2];
    }

    async function apiGet(url) {
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || ('HTTP ' + response.status));
      }
      return await response.json();
    }

    async function apiPost(url, payload) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload || {}),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || ('HTTP ' + response.status));
      }
      return data;
    }

    function renderStatus(message, isError) {
      return '<div class="status-bar' + (isError ? ' error' : '') + '">' + esc(message) + '</div>';
    }

    function formatDate(value) {
      if (!value) return '-';
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
    }

    function severityClass(value) {
      if (value === 'error' || value === 'critical') return 'danger';
      if (value === 'warning') return 'warn';
      return '';
    }

    function parentDir(filePath) {
      return String(filePath || '').replace(/[\\/][^\\/]+$/, '');
    }

    function renderOverview(data) {
      const panel = document.getElementById('panel-overview');
      const runtimeAlerts = data.runtime?.alerts || [];
      const runtimeWarnings = data.runtime?.warnings || [];
      panel.innerHTML = \`
        <div class="grid">
          <div class="card"><h3>System</h3><div class="metric">\${data.platform}</div><div class="muted">User \${esc(data.user)} - CPU \${data.cpu.cores} cores</div></div>
          <div class="card"><h3>Gateway</h3><div class="metric">\${data.gateway.running ? "Running" : "Stopped"}</div><div class="muted">Port \${data.gateway.port}\${data.gateway.pid ? " - PID " + data.gateway.pid : ""}</div></div>
          <div class="card"><h3>Agents</h3><div class="metric">\${data.agents.total}</div><div class="muted">Default \${esc(data.agents.defaultAgentId || "-")}</div></div>
          <div class="card"><h3>Sessions</h3><div class="metric">\${data.sessions.active}</div><div class="muted">Total \${data.sessions.total}</div></div>
          <div class="card"><h3>Notifications</h3><div class="metric">\${data.notifications.unread}</div><div class="muted">Unread items</div></div>
          <div class="card"><h3>Runtime Alerts</h3><div class="metric">\${runtimeAlerts.length}</div><div class="muted">Gateway / Security / Runtime</div></div>
        </div>
        <div class="grid">
          <div class="card"><h3>Runtime Summary</h3><pre>\${esc(JSON.stringify(data.runtime?.summary || {}, null, 2))}</pre></div>
          <div class="card"><h3>Gateway Runtime</h3><pre>\${esc(JSON.stringify(data.runtime?.gateway || {}, null, 2))}</pre></div>
          <div class="card"><h3>Security Audit</h3><pre>\${esc(JSON.stringify(data.runtime?.securityAudit || {}, null, 2))}</pre></div>
          <div class="card"><h3>Disk / Memory</h3><pre>\${esc(JSON.stringify({ disk: data.disk, memory: data.memory }, null, 2))}</pre></div>
        </div>
        \${data.runtime?.gateway?.error ? "<div class=\"card\">" + renderStatus("Gateway error: " + data.runtime.gateway.error, true) + "</div>" : ""}
        \${runtimeAlerts.length ? "<div class=\"card\"><h3>Runtime Alerts</h3><div class=\"list\">" + runtimeAlerts.map(item => "<div class=\"list-item\"><div class=\"row\"><strong>" + esc(item.code) + "</strong><span class=\"pill " + severityClass(item.level) + \"\">" + esc(item.level) + "</span></div><div>" + esc(item.message) + "</div></div>").join("") + "</div></div>" : ""}
        \${runtimeWarnings.length ? "<div class=\"card\"><h3>Runtime Warnings</h3><div class=\"list\">" + runtimeWarnings.map(item => "<div class=\"list-item\"><div>" + esc(item) + "</div></div>").join("") + "</div></div>" : ""}
        <div class="card"><div class="row"><h3>Recent Notifications</h3><button onclick="switchTab('notifications')">Open Notification Center</button></div><div class="list">\${(data.notifications.latest || []).map(item => "<div class=\"list-item\"><div class=\"row\"><strong>" + esc(item.title) + "</strong><span class=\"pill " + severityClass(item.severity) + \"\">" + esc(item.severity) + "</span></div><div class=\"muted\">" + esc(item.message) + "</div><div class=\"muted\">" + esc(formatDate(item.createdAt)) + "</div></div>").join("") || "<div class=\"muted\">No notifications</div>"}</div></div>\`;
      }
    function renderNotifications(data) {
      const panel = document.getElementById('panel-notifications');
      panel.innerHTML = '<div class="card"><div class="row"><h3>Notification Center</h3><button onclick="loadTab(\'notifications\')">Refresh</button></div><div class="list">' + (data.items || []).map((item) => '<div class="list-item"><div class="row"><strong>' + esc(item.title) + '</strong><span class="pill ' + severityClass(item.severity) + '">' + esc(item.severity) + '</span><span class="pill">' + esc(item.type) + '</span></div><div>' + esc(item.message) + '</div><div class="muted">' + esc(formatDate(item.createdAt)) + ' - ' + esc(item.source) + '</div><div class="row"><button onclick="toggleNotification(' + JSON.stringify(item.id) + ', ' + (!item.read) + ')">' + (item.read ? 'Mark unread' : 'Mark read') + '</button></div></div>').join('') + ((data.items || []).length ? '' : '<div class="muted">No notifications</div>') + '</div><div id="notification-status"></div></div>';
    }

    async function toggleNotification(id, read) {
      try {
        await apiPost('/api/notifications/read', { id, read });
        await loadTab('notifications');
        const node = document.getElementById('notification-status');
        if (node) node.innerHTML = renderStatus(read ? 'Marked as read.' : 'Marked as unread.', false);
      } catch (error) {
        const node = document.getElementById('notification-status');
        if (node) node.innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    function renderAgents(data) {
      const panel = document.getElementById('panel-agents');
      panel.innerHTML = '<div class="list">' + data.agents.map((agent) => {
        const docs = [];
        if (agent.docStatus.soul) docs.push('SOUL');
        if (agent.docStatus.user) docs.push('USER');
        if (agent.docStatus.agents) docs.push('AGENTS');
        if (agent.docStatus.memory) docs.push('MEMORY');
        return '<div class="list-item"><div class="row"><strong>' + esc(agent.name) + '</strong><span class="pill">' + esc(agent.id) + '</span>' + (agent.isDefault ? '<span class="pill">Default</span>' : '') + '</div><div class="muted">Model: ' + esc(agent.modelId || '-') + '</div><div class="muted">Workspace: ' + esc(agent.workspace) + '</div><div class="muted">Docs: ' + esc(docs.join(' / ') || 'Not found') + '</div></div>';
      }).join('') + '</div>';
    }

    function renderSessions(data) {
      const panel = document.getElementById('panel-sessions');
      panel.innerHTML = '<div class="list">' + (data.snapshot.sessions || []).map((session) => '<div class="list-item"><div class="row"><strong>' + esc(session.id) + '</strong><span class="pill">' + esc(session.agentId) + '</span><span class="pill">' + esc(session.status) + '</span></div><div class="muted">Model: ' + esc(session.modelId) + ' - Channel: ' + esc(session.channel) + '</div><pre>' + esc(JSON.stringify(session.usage, null, 2)) + '</pre></div>').join('') + ((data.snapshot.sessions || []).length ? '' : '<div class="muted">No active sessions</div>') + '</div>';
    }

    function renderActivity(data) {
      const panel = document.getElementById('panel-activity');
      panel.innerHTML = '<div class="list">' + (data.events || []).map((event) => '<div class="list-item"><div class="row"><strong>' + esc(event.title) + '</strong><span class="pill">' + esc(event.type) + '</span></div><div class="muted">' + esc(event.createdAt) + '</div><div>' + esc(event.description) + '</div></div>').join('') + ((data.events || []).length ? '' : '<div class="muted">No activity yet</div>') + '</div>';
    }

    function renderMemory(data) {
      const panel = document.getElementById('panel-memory');
      panel.innerHTML = '<div class="list">' + (data.files || []).map((file) => '<div class="list-item"><div class="row"><strong>' + esc(file.relativePath) + '</strong><span class="pill">' + esc(file.agentId) + '</span><span class="pill">' + esc(file.type) + '</span></div><div class="muted">' + esc(file.path) + '</div></div>').join('') + ((data.files || []).length ? '' : '<div class="muted">No memory files found</div>') + '</div>';
    }

    function renderCosts(data) {
      const panel = document.getElementById('panel-costs');
      panel.innerHTML = \`
        <div class="grid">
          <div class="card"><h3>Total Cost</h3><div class="metric">\${Number(data.totalEstimatedCost || 0).toFixed(6)}</div><div class="muted">Estimated in USD</div></div>
          <div class="card"><h3>Total Tokens</h3><div class="metric">\${data.totalTokens || 0}</div><div class="muted">Aggregated from runtime snapshots</div></div>
        </div>
        <div class="two-col">
          <div class="card"><h3>By Model</h3><div class="list">\${(data.byModel || []).map(item => "<div class=\"list-item\"><strong>" + esc(item.id) + "</strong><div class=\"muted\">cost=" + Number(item.estimatedCost || 0).toFixed(6) + " - tokens=" + (item.totalTokens || 0) + "</div></div>").join("") || "<div class=\"muted\">No data</div>"}</div></div>
          <div class="card"><h3>By Agent</h3><div class="list">\${(data.byAgent || []).map(item => "<div class=\"list-item\"><strong>" + esc(item.id) + "</strong><div class=\"muted\">cost=" + Number(item.estimatedCost || 0).toFixed(6) + " - tokens=" + (item.totalTokens || 0) + "</div></div>").join("") || "<div class=\"muted\">No data</div>"}</div></div>
        </div>\`;
    }

    async function loadFiles(pathValue) {
      const data = await apiGet('/api/files' + (pathValue ? ('?path=' + encodeURIComponent(pathValue)) : ''));
      state.currentDirPath = data.currentPath || '';
      state.currentParentPath = data.parentPath || '';
      const panel = document.getElementById('panel-files');
      panel.innerHTML = \`
        <div class="two-col">
          <div class="card">
            <div class="toolbar">
              <select id="file-root-select">\${(data.roots || []).map(root => '<option value="' + esc(root.path) + '"' + (root.path === data.currentPath ? ' selected' : '') + '>' + esc(root.label) + '</option>').join('')}</select>
              <button onclick="loadFiles(document.getElementById('file-root-select').value)">Open Directory</button>
              <button onclick="goParentDir()" \${data.parentPath ? "" : "disabled"}>Parent</button>
              <button onclick="loadFiles(state.currentDirPath || "")">Refresh Directory</button>
            </div>
            <div class="toolbar">
              <input id="file-create-name" placeholder="New file or folder name, for example draft.md">
              <select id="file-create-kind"><option value="file">File</option><option value="directory">Directory</option></select>
              <button onclick="createEntry()">Create</button>
            </div>
            <div class="muted">Current directory: \${esc(data.currentPath || '-')}</div>
            <div class="list">\${(data.entries || []).map(entry => "<div class=\"list-item\"><div class=\"row\"><strong>" + esc(entry.name) + "</strong>" + (entry.isDirectory ? "<span class=\"pill\">Directory</span>" : "<span class=\"pill\">File</span>") + "</div><div class=\"muted\">" + esc(entry.relativePath) + " - " + esc(formatDate(entry.modifiedAt)) + "</div><div class=\"row\"><button onclick=\"" + (entry.isDirectory ? ("loadFiles(" + JSON.stringify(entry.path) + ")") : ("openFile(" + JSON.stringify(entry.path) + ")")) + \"\">" + (entry.isDirectory ? "Enter" : "Open") + "</button></div></div>").join("") || "<div class=\"muted\">This directory is empty</div>"}</div>
            <div id="file-dir-status"></div>
          </div>
          <div class="card">
            <h3>File Content</h3>
            <div class="muted" id="file-current-path">\${esc(state.currentFilePath || "Select a file from the left panel")}</div>
            <textarea id="file-editor">\${esc(state.fileContent || '')}</textarea>
            <div class="toolbar">
              <button class="primary" onclick="saveFile()">Save File</button>
              <button onclick="reloadCurrentFile()">Reload</button>
              <button onclick="clearFileEditor()">Clear</button>
            </div>
            <div id="file-status">\${state.currentFilePath ? renderStatus(state.currentFileTruncated ? "This file is truncated for preview, saving is disabled." : "File loaded.", state.currentFileTruncated) : ""}</div>
          </div>
        </div>\`;
    }

    function goParentDir() {
      if (state.currentParentPath) {
        loadFiles(state.currentParentPath);
      }
    }

    function clearFileEditor() {
      state.currentFilePath = '';
      state.fileContent = '';
      state.currentFileTruncated = false;
      const pathNode = document.getElementById('file-current-path');
      const editorNode = document.getElementById('file-editor');
      const statusNode = document.getElementById('file-status');
      if (pathNode) pathNode.textContent = 'Select a file from the left panel';
      if (editorNode) editorNode.value = '';
      if (statusNode) statusNode.innerHTML = '';
    }

    async function createEntry() {
      const statusNode = document.getElementById('file-dir-status');
      const name = document.getElementById('file-create-name').value.trim();
      const kind = document.getElementById('file-create-kind').value;
      if (!name) {
        statusNode.innerHTML = renderStatus('Please enter a name.', true);
        return;
      }
      try {
        const data = await apiPost('/api/files/create', {
          parentPath: state.currentDirPath,
          name,
          kind,
        });
        document.getElementById('file-create-name').value = '';
        statusNode.innerHTML = renderStatus(data.message || 'Created successfully.', false);
        await loadFiles(state.currentDirPath || '');
        if (kind === 'file' && data.path) {
          await openFile(data.path);
        }
      } catch (error) {
        statusNode.innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    async function openFile(filePath) {
      const data = await apiGet('/api/files/content?path=' + encodeURIComponent(filePath));
      state.currentFilePath = data.path;
      state.fileContent = data.content || '';
      state.currentFileTruncated = data.truncated === true;
      document.getElementById('file-current-path').textContent = data.path;
      document.getElementById('file-editor').value = data.content || '';
      document.getElementById('file-status').innerHTML = renderStatus((data.truncated ? 'Preview is truncated, saving is disabled.' : 'File loaded.'), data.truncated);
    }

    async function reloadCurrentFile() {
      if (!state.currentFilePath) {
        const node = document.getElementById('file-status');
        if (node) node.innerHTML = renderStatus('Please select a file first.', true);
        return;
      }
      await openFile(state.currentFilePath);
    }

    async function saveFile() {
      if (!state.currentFilePath) {
        document.getElementById('file-status').innerHTML = renderStatus('Please select a file first.', true);
        return;
      }
      if (state.currentFileTruncated) {
        document.getElementById('file-status').innerHTML = renderStatus('This preview is truncated. Saving is blocked to avoid overwriting the full file.', true);
        return;
      }
      try {
        const content = document.getElementById('file-editor').value;
        const data = await apiPost('/api/files/content', { path: state.currentFilePath, content });
        document.getElementById('file-status').innerHTML = renderStatus(data.message || 'Saved.', false);
      } catch (error) {
        document.getElementById('file-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    function renderSearch() {
      const panel = document.getElementById('panel-search');
      panel.innerHTML = \`
        <div class="card">
          <div class="toolbar">
            <input id="search-input" placeholder="Enter a keyword, for example failover / SOUL / claude">
            <button class="primary" onclick="runSearch()">Search</button>
          </div>
          <div id="search-results" class="list"></div>
        </div>\`;
    }

    async function runSearch() {
      const query = document.getElementById('search-input').value.trim();
      const container = document.getElementById('search-results');
      if (!query) {
        container.innerHTML = '<div class="muted">Please enter a keyword</div>';
        return;
      }
      const data = await apiGet('/api/search?q=' + encodeURIComponent(query));
      container.innerHTML = (data.results || []).map(hit => '<div class="list-item"><div class="row"><strong>' + esc(hit.relativePath) + '</strong><span class="pill">L' + hit.line + '</span></div><div class="muted">' + esc(hit.path) + '</div><div>' + esc(hit.preview) + '</div><div class="row"><button onclick="openSearchResult(' + JSON.stringify(hit.path) + ')">Open File</button></div></div>').join('') || '<div class="muted">No results</div>';
    }

    async function openSearchResult(filePath) {
      await switchTab('files');
      await loadFiles(parentDir(filePath));
      await openFile(filePath);
    }

    function renderCron(data) {
      const panel = document.getElementById('panel-cron');
      const status = data.status || {};
      const warnings = data.warnings || [];
      panel.innerHTML = '<div class="grid">'
        + '<div class="card"><h3>Scheduler</h3><div class="metric">' + (status.enabled === true ? 'Enabled' : status.enabled === false ? 'Disabled' : 'Unknown') + '</div><div class="muted">Next wake: ' + esc(formatDate(status.schedulerNextWakeAt)) + '</div></div>'
        + '<div class="card"><h3>Jobs</h3><div class="metric">' + ((data.jobs || []).length) + '</div><div class="muted">Jobs visible in the current workbench</div></div>'
        + '<div class="card"><h3>Store Path</h3><pre>' + esc(status.storePath || '-') + '</pre></div>'
        + '<div class="card"><h3>Refresh</h3><button class="primary" onclick="loadTab(\'cron\')">Reload Cron Data</button></div>'
        + '</div>'
        + (warnings.length ? '<div class="card"><h3>Cron warnings</h3><div class="list">' + warnings.map(item => '<div class="list-item"><div>' + esc(item) + '</div></div>').join('') + '</div></div>' : '')
        + '<div class="list">' + (data.jobs || []).map(job => '<div class="list-item"><div class="row"><strong>' + esc(job.name || job.id) + '</strong><span class="pill">' + esc(job.agentId) + '</span><span class="pill' + (job.enabled ? '' : ' warn') + '">' + (job.enabled ? 'Enabled' : 'Disabled') + '</span><span class="pill">' + esc(job.status) + '</span></div><div class="muted">' + esc(job.schedule) + '</div><div class="muted">' + esc(job.prompt) + '</div><div class="muted">last=' + esc(formatDate(job.lastRunAt)) + ' - next=' + esc(formatDate(job.nextRunAt)) + '</div><div class="row"><button onclick="cronAction(\'run\', ' + JSON.stringify(job.id) + ')">Run Now</button><button onclick="cronAction(\'' + (job.enabled ? 'disable' : 'enable') + '\', ' + JSON.stringify(job.id) + ')">' + (job.enabled ? 'Disable' : 'Enable') + '</button><button class="danger" onclick="cronAction(\'remove\', ' + JSON.stringify(job.id) + ')">Remove</button></div></div>').join('') + ((data.jobs || []).length ? '' : '<div class="muted">No scheduled jobs</div>') + '</div><div id="cron-status"></div>';
    }

    async function cronAction(action, jobId) {
      try {
        const data = await apiPost('/api/cron-ui/' + action, { jobId });
        await loadTab('cron');
        document.getElementById('cron-status').innerHTML = renderStatus(data.message || 'Action completed.', false);
      } catch (error) {
        document.getElementById('cron-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    function renderGitSync(data) {
      const panel = document.getElementById('panel-git-sync');
      panel.innerHTML = \`
        <div class="grid">
          <div class="card"><h3>Repository</h3><div class="metric">\${data.repoInitialized ? "Initialized" : "Not initialized"}</div><div class="muted">\${esc(data.repoPath)}</div></div>
          <div class="card"><h3>Remote</h3><div class="metric">\${esc(data.provider || "-")}</div><div class="muted">\${esc(data.remoteUrl || "Not connected")}</div></div>
          <div class="card"><h3>Private Repo</h3><div class="metric">\${data.repoPrivate === true ? "Confirmed" : data.repoPrivate === false ? "Public / blocked" : "Unchecked"}</div><div class="muted">Guard only syncs to private repositories</div></div>
          <div class="card"><h3>Local Changes</h3><div class="metric">\${data.changedFiles.length}</div><div class="muted">\${data.hasChanges ? "Pending files detected" : "No local changes"}</div></div>
        </div>
        <div class="two-col">
          <div class="card stack">
            <h3>Initialize and Connect</h3>
            <button class="primary" onclick="gitAction('init')">Initialize Git Repository</button>
            <select id="git-provider"><option value="github">GitHub</option><option value="gitee">Gitee</option></select>
            <input id="git-remote-url" placeholder="https://github.com/owner/repo.git or https://gitee.com/owner/repo.git" value="\${esc(data.remoteUrl || "")}">
            <button onclick="gitConnect()">Connect Remote Repository</button>
            <button onclick="gitAction('check-private')">Check Private</button>
          </div>
          <div class="card stack">
            <h3>HTTPS Token</h3>
            <input id="git-token" placeholder="Enter HTTPS token">
            <input id="git-username" placeholder="Gitee usually needs a username, GitHub can stay empty">
            <button onclick="gitSaveToken()">Save Token</button>
            <input id="git-commit-message" placeholder="Optional: custom Chinese commit message">
            <button class="primary" onclick="gitAction('commit', { message: document.getElementById('git-commit-message').value })">Commit</button>
            <button class="primary" onclick="gitAction('push')">Push</button>
            <button class="primary" onclick="gitAction('sync', { message: document.getElementById('git-commit-message').value })">Commit and Push</button>
          </div>
        </div>
        <div class="two-col">
          <div class="card stack">
            <h3>Browser OAuth</h3>
            <input id="git-oauth-client-id" placeholder="OAuth Client ID">
            <input id="git-oauth-client-secret" type="password" placeholder="OAuth Client Secret">
            <input id="git-oauth-scope" placeholder="Scope (optional, default will be used if empty)">
            <input id="git-oauth-port" placeholder="Callback port (optional, auto assign when empty)">
            <button onclick="gitOAuthLogin()">Start Browser OAuth</button>
          </div>
          <div class="card stack">
            <h3>Pre-flight Checks</h3>
            <div class="list">\${(data.reasons || []).map(item => "<div class=\"list-item\"><div>" + esc(item) + "</div></div>").join("") || "<div class=\"muted\">Ready to sync</div>"}</div>
          </div>
        </div>
        <div class="card"><h3>Current Status</h3><pre>\${esc(JSON.stringify(data, null, 2))}</pre></div>
        <div id="git-status"></div>\`;
      const providerSelect = document.getElementById('git-provider');
      if (data.provider) providerSelect.value = data.provider;
    }

    async function gitAction(action, payload) {
      try {
        const data = await apiPost('/api/git-sync/' + action, payload || {});
        await loadTab('git-sync');
        document.getElementById('git-status').innerHTML = renderStatus(data.message || 'Action completed.', false);
      } catch (error) {
        document.getElementById('git-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    async function gitConnect() {
      try {
        const data = await apiPost('/api/git-sync/connect', {
          provider: document.getElementById('git-provider').value,
          remoteUrl: document.getElementById('git-remote-url').value,
        });
        await loadTab('git-sync');
        document.getElementById('git-status').innerHTML = renderStatus(data.message || 'Connected.', false);
      } catch (error) {
        document.getElementById('git-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    async function gitSaveToken() {
      try {
        const data = await apiPost('/api/git-sync/auth/token', {
          provider: document.getElementById('git-provider').value,
          token: document.getElementById('git-token').value,
          username: document.getElementById('git-username').value,
        });
        document.getElementById('git-token').value = '';
        await loadTab('git-sync');
        document.getElementById('git-status').innerHTML = renderStatus(data.message || 'Token saved.', false);
      } catch (error) {
        document.getElementById('git-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    async function gitOAuthLogin() {
      try {
        const portRaw = document.getElementById('git-oauth-port').value.trim();
        const data = await apiPost('/api/git-sync/auth/oauth', {
          provider: document.getElementById('git-provider').value,
          clientId: document.getElementById('git-oauth-client-id').value,
          clientSecret: document.getElementById('git-oauth-client-secret').value,
          scope: document.getElementById('git-oauth-scope').value,
          redirectPort: portRaw ? Number(portRaw) : undefined,
          openBrowser: true,
        });
        await loadTab('git-sync');
        document.getElementById('git-status').innerHTML = renderStatus(data.message || 'OAuth flow started. Finish login in your browser.', false);
      } catch (error) {
        document.getElementById('git-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    function renderSimpleJsonTab(tabId, title, data) {
      const panel = document.getElementById('panel-' + tabId);
      panel.innerHTML = '<div class="card"><h3>' + esc(title) + '</h3><pre>' + esc(JSON.stringify(data, null, 2)) + '</pre></div>';
    }

    async function loadTab(tabId) {
      try {
        switch (tabId) {
          case 'overview': return renderOverview(await apiGet('/api/dashboard/overview'));
          case 'notifications': return renderNotifications(await apiGet('/api/notifications?limit=200'));
          case 'agents': return renderAgents(await apiGet('/api/agents'));
          case 'sessions': return renderSessions(await apiGet('/api/sessions'));
          case 'activity': return renderActivity(await apiGet('/api/activity'));
          case 'files': return loadFiles(state.currentDirPath || '');
          case 'memory': return renderMemory(await apiGet('/api/memory'));
          case 'search': return renderSearch();
          case 'costs': return renderCosts(await apiGet('/api/costs'));
          case 'cron': return renderCron(await apiGet('/api/cron-ui'));
          case 'git-sync': return renderGitSync(await apiGet('/api/git-sync/status'));
          case 'ai': return renderSimpleJsonTab('ai', 'AI Config', await apiGet('/api/ai/config'));
          case 'channels': return renderSimpleJsonTab('channels', 'Channel Config', await apiGet('/api/channels'));
          case 'audit': return renderSimpleJsonTab('audit', 'Audit Results', await apiGet('/api/audit'));
          case 'harden': return renderSimpleJsonTab('harden', 'Hardening Steps', await apiGet('/api/harden/steps'));
        }
      } catch (error) {
        const panel = document.getElementById('panel-' + tabId);
        panel.innerHTML = '<div class="card">' + renderStatus(error.message || String(error), true) + '</div>';
      }
    }

    async function switchTab(tabId) {
      state.activeTab = tabId;
      navInit();
      setHead(tabId);
      document.querySelectorAll('.panel').forEach((panel) => panel.classList.add('hidden'));
      document.getElementById('panel-' + tabId).classList.remove('hidden');
      await loadTab(tabId);
    }

    navInit();
    renderPanels();
    switchTab(state.activeTab);
  </script>
</body>
</html>`;
}



















