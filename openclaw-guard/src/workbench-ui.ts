export function getWorkbenchPage(): string {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OpenClaw Guard 工作台</title>
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
        <p>原生工作台 MVP。保留 Guard 的轻量风格，逐步替代 tenacitOS 外挂模式。</p>
      </div>
      <div class="nav-group" id="nav"></div>
    </aside>
    <main>
      <div class="page-head">
        <div>
          <h2 id="page-title">概览</h2>
          <p id="page-desc">查看系统、Agent、会话、Git 同步与日常运维状态。</p>
        </div>
        <div class="actions">
          <button onclick="window.location.reload()">刷新工作台</button>
          <button onclick="window.location.href='/'">打开旧版面板</button>
        </div>
      </div>
      <div id="panels"></div>
    </main>
  </div>
  <script>
    const TABS = [
      ['overview', '概览', '系统与运行总览'],
      ['agents', 'Agent', '角色、工作区与文档状态'],
      ['sessions', '会话', '当前运行态会话列表'],
      ['activity', '活动', '最近活动时间线'],
      ['files', '文件', '受控工作区文件浏览与编辑'],
      ['memory', '记忆', 'SOUL / USER / AGENTS / MEMORY 与 memory 目录'],
      ['search', '搜索', '跨工作区全文搜索'],
      ['costs', '成本', '会话 token 与成本估算'],
      ['cron', 'Cron', '定时任务列表与手动动作'],
      ['git-sync', 'Git 同步', '私有仓校验、提交与推送'],
      ['ai', 'AI', '模型与回退链现状'],
      ['channels', '渠道', '渠道配置概览'],
      ['audit', '审计', '安全审计结果'],
      ['harden', '加固', '加固步骤预览']
    ];

    const state = {
      activeTab: 'overview',
      currentFilePath: '',
      currentDirPath: '',
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
      return '<section class="panel' + (state.activeTab === id ? '' : ' hidden') + '" id="panel-' + id + '"><div class="card"><div class="muted">加载中...</div></div></section>';
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

    function renderOverview(data) {
      const panel = document.getElementById('panel-overview');
      panel.innerHTML = \`
        <div class="grid">
          <div class="card"><h3>系统</h3><div class="metric">\${data.platform}</div><div class="muted">用户 \${esc(data.user)} · CPU \${data.cpu.cores} 核</div></div>
          <div class="card"><h3>Gateway</h3><div class="metric">\${data.gateway.running ? '运行中' : '未运行'}</div><div class="muted">端口 \${data.gateway.port}\${data.gateway.pid ? ' · PID ' + data.gateway.pid : ''}</div></div>
          <div class="card"><h3>Agent</h3><div class="metric">\${data.agents.total}</div><div class="muted">默认 \${esc(data.agents.defaultAgentId || '-')}</div></div>
          <div class="card"><h3>会话</h3><div class="metric">\${data.sessions.active}</div><div class="muted">总数 \${data.sessions.total}</div></div>
        </div>
        <div class="grid">
          <div class="card"><h3>内存</h3><pre>\${esc(JSON.stringify(data.memory, null, 2))}</pre></div>
          <div class="card"><h3>磁盘</h3><pre>\${esc(JSON.stringify(data.disk, null, 2))}</pre></div>
          <div class="card"><h3>OpenClaw</h3><pre>\${esc(JSON.stringify(data.openclaw, null, 2))}</pre></div>
          <div class="card"><h3>通知</h3><div class="metric">\${data.notifications.unread}</div><div class="muted">未读通知</div></div>
        </div>
        <div class="card"><h3>最近通知</h3><div class="list">\${(data.notifications.latest || []).map(item => '<div class="list-item"><div class="row"><strong>' + esc(item.title) + '</strong><span class="pill">' + esc(item.severity) + '</span></div><div class="muted">' + esc(item.message) + '</div></div>').join('') || '<div class="muted">暂无通知</div>'}</div></div>\`;
      }

    function renderAgents(data) {
      const panel = document.getElementById('panel-agents');
      panel.innerHTML = '<div class="list">' + data.agents.map((agent) => {
        const docs = [];
        if (agent.docStatus.soul) docs.push('SOUL');
        if (agent.docStatus.user) docs.push('USER');
        if (agent.docStatus.agents) docs.push('AGENTS');
        if (agent.docStatus.memory) docs.push('MEMORY');
        return '<div class="list-item"><div class="row"><strong>' + esc(agent.name) + '</strong><span class="pill">' + esc(agent.id) + '</span>' + (agent.isDefault ? '<span class="pill">默认</span>' : '') + '</div><div class="muted">模型：' + esc(agent.modelId || '-') + '</div><div class="muted">工作区：' + esc(agent.workspace) + '</div><div class="muted">文档：' + esc(docs.join(' / ') || '未发现') + '</div></div>';
      }).join('') + '</div>';
    }

    function renderSessions(data) {
      const panel = document.getElementById('panel-sessions');
      panel.innerHTML = '<div class="list">' + (data.snapshot.sessions || []).map((session) => '<div class="list-item"><div class="row"><strong>' + esc(session.id) + '</strong><span class="pill">' + esc(session.agentId) + '</span><span class="pill">' + esc(session.status) + '</span></div><div class="muted">模型：' + esc(session.modelId) + ' · 渠道：' + esc(session.channel) + '</div><pre>' + esc(JSON.stringify(session.usage, null, 2)) + '</pre></div>').join('') + ((data.snapshot.sessions || []).length ? '' : '<div class="muted">当前没有活跃会话</div>') + '</div>';
    }

    function renderActivity(data) {
      const panel = document.getElementById('panel-activity');
      panel.innerHTML = '<div class="list">' + (data.events || []).map((event) => '<div class="list-item"><div class="row"><strong>' + esc(event.title) + '</strong><span class="pill">' + esc(event.type) + '</span></div><div class="muted">' + esc(event.createdAt) + '</div><div>' + esc(event.description) + '</div></div>').join('') + ((data.events || []).length ? '' : '<div class="muted">暂无活动记录</div>') + '</div>';
    }

    function renderMemory(data) {
      const panel = document.getElementById('panel-memory');
      panel.innerHTML = '<div class="list">' + (data.files || []).map((file) => '<div class="list-item"><div class="row"><strong>' + esc(file.relativePath) + '</strong><span class="pill">' + esc(file.agentId) + '</span><span class="pill">' + esc(file.type) + '</span></div><div class="muted">' + esc(file.path) + '</div></div>').join('') + ((data.files || []).length ? '' : '<div class="muted">暂无记忆类文件</div>') + '</div>';
    }

    function renderCosts(data) {
      const panel = document.getElementById('panel-costs');
      panel.innerHTML = \`
        <div class="grid">
          <div class="card"><h3>总成本</h3><div class="metric">\${Number(data.totalEstimatedCost || 0).toFixed(6)}</div><div class="muted">估算单位：USD</div></div>
          <div class="card"><h3>总 Tokens</h3><div class="metric">\${data.totalTokens || 0}</div><div class="muted">按运行态快照统计</div></div>
        </div>
        <div class="two-col">
          <div class="card"><h3>按模型</h3><div class="list">\${(data.byModel || []).map(item => '<div class="list-item"><strong>' + esc(item.id) + '</strong><div class="muted">cost=' + Number(item.estimatedCost || 0).toFixed(6) + ' · tokens=' + (item.totalTokens || 0) + '</div></div>').join('') || '<div class="muted">暂无数据</div>'}</div></div>
          <div class="card"><h3>按 Agent</h3><div class="list">\${(data.byAgent || []).map(item => '<div class="list-item"><strong>' + esc(item.id) + '</strong><div class="muted">cost=' + Number(item.estimatedCost || 0).toFixed(6) + ' · tokens=' + (item.totalTokens || 0) + '</div></div>').join('') || '<div class="muted">暂无数据</div>'}</div></div>
        </div>\`;
    }

    async function loadFiles(pathValue) {
      const data = await apiGet('/api/files' + (pathValue ? ('?path=' + encodeURIComponent(pathValue)) : ''));
      state.currentDirPath = data.currentPath || '';
      const panel = document.getElementById('panel-files');
      panel.innerHTML = \`
        <div class="two-col">
          <div class="card">
            <div class="toolbar">
              <select id="file-root-select">\${(data.roots || []).map(root => '<option value="' + esc(root.path) + '"' + (root.path === data.currentPath ? ' selected' : '') + '>' + esc(root.label) + '</option>').join('')}</select>
              <button onclick="loadFiles(document.getElementById('file-root-select').value)">打开目录</button>
            </div>
            <div class="list">\${(data.entries || []).map(entry => '<div class="list-item"><div class="row"><strong>' + esc(entry.name) + '</strong>' + (entry.isDirectory ? '<span class="pill">目录</span>' : '<span class="pill">文件</span>') + '</div><div class="row"><button onclick="' + (entry.isDirectory ? ('loadFiles(' + JSON.stringify(entry.path) + ')') : ('openFile(' + JSON.stringify(entry.path) + ')')) + '">' + (entry.isDirectory ? '进入' : '预览') + '</button></div></div>').join('') || '<div class="muted">目录为空</div>'}</div>
          </div>
          <div class="card">
            <h3>文件内容</h3>
            <div class="muted" id="file-current-path">\${esc(state.currentFilePath || '请从左侧选择文件')}</div>
            <textarea id="file-editor">\${esc(state.fileContent || '')}</textarea>
            <div class="toolbar">
              <button class="primary" onclick="saveFile()">保存文件</button>
              <button onclick="if(state.currentFilePath){ openFile(state.currentFilePath); }">重新加载</button>
            </div>
            <div id="file-status"></div>
          </div>
        </div>\`;
    }

    async function openFile(filePath) {
      const data = await apiGet('/api/files/content?path=' + encodeURIComponent(filePath));
      state.currentFilePath = data.path;
      state.fileContent = data.content || '';
      document.getElementById('file-current-path').textContent = data.path;
      document.getElementById('file-editor').value = data.content || '';
      document.getElementById('file-status').innerHTML = renderStatus((data.truncated ? '文件较大，已截断预览。' : '已加载文件。'), false);
    }

    async function saveFile() {
      if (!state.currentFilePath) {
        document.getElementById('file-status').innerHTML = renderStatus('请先选择文件。', true);
        return;
      }
      try {
        const content = document.getElementById('file-editor').value;
        const data = await apiPost('/api/files/content', { path: state.currentFilePath, content });
        document.getElementById('file-status').innerHTML = renderStatus(data.message || '已保存。', false);
      } catch (error) {
        document.getElementById('file-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    function renderSearch() {
      const panel = document.getElementById('panel-search');
      panel.innerHTML = \`
        <div class="card">
          <div class="toolbar">
            <input id="search-input" placeholder="输入关键字，例如 failover / SOUL / claude">
            <button class="primary" onclick="runSearch()">搜索</button>
          </div>
          <div id="search-results" class="list"></div>
        </div>\`;
    }

    async function runSearch() {
      const query = document.getElementById('search-input').value.trim();
      const container = document.getElementById('search-results');
      if (!query) {
        container.innerHTML = '<div class="muted">请输入关键字</div>';
        return;
      }
      const data = await apiGet('/api/search?q=' + encodeURIComponent(query));
      container.innerHTML = (data.results || []).map(hit => '<div class="list-item"><div class="row"><strong>' + esc(hit.relativePath) + '</strong><span class="pill">L' + hit.line + '</span></div><div class="muted">' + esc(hit.path) + '</div><div>' + esc(hit.preview) + '</div></div>').join('') || '<div class="muted">未找到结果</div>';
    }

    function renderCron(data) {
      const panel = document.getElementById('panel-cron');
      panel.innerHTML = '<div class="list">' + (data.jobs || []).map(job => '<div class="list-item"><div class="row"><strong>' + esc(job.id) + '</strong><span class="pill">' + esc(job.agentId) + '</span><span class="pill' + (job.enabled ? '' : ' warn') + '">' + (job.enabled ? '启用' : '停用') + '</span></div><div class="muted">' + esc(job.schedule) + '</div><div class="muted">' + esc(job.prompt) + '</div><div class="row"><button onclick="cronAction(\'run\', ' + JSON.stringify(job.id) + ')">手动触发</button><button onclick="cronAction(\'' + (job.enabled ? 'disable' : 'enable') + '\', ' + JSON.stringify(job.id) + ')">' + (job.enabled ? '停用' : '启用') + '</button><button class="danger" onclick="cronAction(\'remove\', ' + JSON.stringify(job.id) + ')">删除</button></div></div>').join('') + ((data.jobs || []).length ? '' : '<div class="muted">暂无定时任务</div>') + '</div><div id="cron-status"></div>';
    }

    async function cronAction(action, jobId) {
      try {
        const data = await apiPost('/api/cron-ui/' + action, { jobId });
        document.getElementById('cron-status').innerHTML = renderStatus(data.message || '操作成功', false);
        await loadTab('cron');
      } catch (error) {
        document.getElementById('cron-status').innerHTML = renderStatus(error.message || String(error), true);
      }
    }

    function renderGitSync(data) {
      const panel = document.getElementById('panel-git-sync');
      panel.innerHTML = \`
        <div class="grid">
          <div class="card"><h3>仓库</h3><div class="metric">\${data.repoInitialized ? '已初始化' : '未初始化'}</div><div class="muted">\${esc(data.repoPath)}</div></div>
          <div class="card"><h3>远程</h3><div class="metric">\${esc(data.provider || '-')}</div><div class="muted">\${esc(data.remoteUrl || '未绑定')}</div></div>
          <div class="card"><h3>私有仓</h3><div class="metric">\${data.repoPrivate === true ? '已确认' : data.repoPrivate === false ? '非私有' : '未校验'}</div><div class="muted">Guard 仅允许同步到 private 仓库</div></div>
          <div class="card"><h3>本地变更</h3><div class="metric">\${data.changedFiles.length}</div><div class="muted">\${data.hasChanges ? '检测到待同步文件' : '当前无变更'}</div></div>
        </div>
        <div class="two-col">
          <div class="card stack">
            <h3>初始化与连接</h3>
            <button class="primary" onclick="gitAction('init')">初始化 Git 仓库</button>
            <input id="git-remote-url" placeholder="https://github.com/owner/repo.git 或 https://gitee.com/owner/repo.git" value="\${esc(data.remoteUrl || '')}">
            <select id="git-provider"><option value="github">GitHub</option><option value="gitee">Gitee</option></select>
            <button onclick="gitConnect()">绑定远程仓库</button>
            <button onclick="gitAction('check-private')">校验 private</button>
          </div>
          <div class="card stack">
            <h3>认证与同步</h3>
            <input id="git-token" placeholder="输入 HTTPS Token">
            <input id="git-username" placeholder="Gitee 建议填写用户名，GitHub 可留空">
            <button onclick="gitSaveToken()">保存 Token</button>
            <button class="primary" onclick="gitAction('commit')">一键提交</button>
            <button class="primary" onclick="gitAction('push')">一键推送</button>
            <button class="primary" onclick="gitAction('sync')">提交并推送</button>
          </div>
        </div>
        <div class="card"><h3>当前状态</h3><pre>\${esc(JSON.stringify(data, null, 2))}</pre></div>
        <div id="git-status"></div>\`;
      const providerSelect = document.getElementById('git-provider');
      if (data.provider) providerSelect.value = data.provider;
    }

    async function gitAction(action) {
      try {
        const data = await apiPost('/api/git-sync/' + action, {});
        document.getElementById('git-status').innerHTML = renderStatus(data.message || '操作成功', false);
        await loadTab('git-sync');
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
        document.getElementById('git-status').innerHTML = renderStatus(data.message || '连接成功', false);
        await loadTab('git-sync');
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
        document.getElementById('git-status').innerHTML = renderStatus(data.message || '已保存 Token', false);
        document.getElementById('git-token').value = '';
        await loadTab('git-sync');
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
          case 'agents': return renderAgents(await apiGet('/api/agents'));
          case 'sessions': return renderSessions(await apiGet('/api/sessions'));
          case 'activity': return renderActivity(await apiGet('/api/activity'));
          case 'files': return loadFiles(state.currentDirPath || '');
          case 'memory': return renderMemory(await apiGet('/api/memory'));
          case 'search': return renderSearch();
          case 'costs': return renderCosts(await apiGet('/api/costs'));
          case 'cron': return renderCron(await apiGet('/api/cron-ui'));
          case 'git-sync': return renderGitSync(await apiGet('/api/git-sync/status'));
          case 'ai': return renderSimpleJsonTab('ai', 'AI 配置', await apiGet('/api/ai/config'));
          case 'channels': return renderSimpleJsonTab('channels', '渠道配置', await apiGet('/api/channels'));
          case 'audit': return renderSimpleJsonTab('audit', '审计结果', await apiGet('/api/audit'));
          case 'harden': return renderSimpleJsonTab('harden', '加固步骤', await apiGet('/api/harden/steps'));
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

