(function () {
  const app = document.getElementById('guard-app');
  if (!app) return;

  const shellConfig = window.__OPENCLAW_GUARD_UI__ || {};
  const STORAGE_LANG = 'openclaw-guard.lang';
  const STORAGE_TAB = 'openclaw-guard.active-tab';

  const I18N = {
    zh: {
      appTitle: 'OpenClaw Guard 原生工作台',
      appSubtitle: '把安全、渠道、AI、工作台、Git 同步和兼容层收口到同一套可维护面板里。',
      refresh: '刷新当前页',
      stopWeb: '一键停后台服务',
      compat: '兼容说明',
      legacy: '旧版别名',
      loading: '正在加载…',
      loadFailed: '加载失败',
      noData: '暂无数据',
      save: '保存',
      cancel: '取消',
      createFile: '新建文件',
      createDir: '新建目录',
      reload: '重新加载',
      stop: '停止',
      start: '启动',
      restart: '重启',
      open: '打开',
      run: '执行',
      remove: '删除',
      enable: '启用',
      disable: '停用',
      markRead: '标为已读',
      markUnread: '标为未读',
      readAll: '全部已读',
      unreadAll: '全部未读',
      clearRead: '清空已读',
      clearAll: '清空全部',
      search: '搜索',
      tabs: {
        overview: '概览',
        system: '系统',
        openclaw: 'OpenClaw',
        feishu: '飞书',
        channels: '渠道',
        ai: 'AI',
        notifications: '通知',
        agents: 'Agent',
        sessions: '会话',
        activity: '活动',
        files: '文件',
        memory: '记忆',
        search: '搜索',
        costs: '成本',
        cron: 'Cron',
        'git-sync': 'Git 同步',
        mission: '兼容层',
        audit: '审计',
        profiles: '预设',
        harden: '加固',
        logs: '日志'
      },
      desc: {
        overview: '统一总览当前机器、Gateway、Agent、通知和运行风险。',
        system: '查看当前系统信息、Gateway 服务状态，以及 Guard Web 后台进程控制。',
        openclaw: '检查 OpenClaw 安装状态、版本、升级信息和 Dashboard 入口。',
        feishu: '维护飞书核心配置，确认插件是否安装、配置是否完整。',
        channels: '查看当前渠道开关、配置摘要和敏感字段挂载情况。',
        ai: '查看 Provider、主模型和 fallback 链，直接调整核心模型配置。',
        notifications: '集中查看 Guard 产生的通知，支持批量已读和清理。',
        agents: '查看 Agent 工作区、模型、SOUL/USER/AGENTS/MEMORY 文档准备情况。',
        sessions: '查看运行态会话、Token 使用量和成本快照。',
        activity: '追踪最近的运行活动、会话变化和告警。',
        files: '在受控范围内浏览和编辑工作区文件。',
        memory: '聚焦 SOUL.md、USER.md、AGENTS.md、MEMORY.md 和 memory/*.md。',
        search: '在 Guard 管理的工作区内做全文搜索。',
        costs: '按模型、Agent、会话查看成本估算。',
        cron: '查看、启停、手动触发和删除 Cron 任务。',
        'git-sync': '管理 .openclaw 私有仓同步、Token 与 OAuth 授权。',
        mission: '保留 mission 兼容层入口，逐步迁移但先不粗暴下线。',
        audit: '统一查看安全审计结果和风险分类。',
        profiles: '应用 Guard 的安全 Profile 预设。',
        harden: '生成对应平台的加固步骤和脚本。',
        logs: '查看 Gateway 与 mission 的日志输出。'
      }
    },
    en: {
      appTitle: 'OpenClaw Guard Native Workbench',
      appSubtitle: 'One maintainable shell for security, channels, AI, workbench flows, Git sync, and the legacy compatibility layer.',
      refresh: 'Refresh',
      stopWeb: 'Stop Background Web',
      compat: 'Compatibility',
      legacy: 'Legacy Alias',
      loading: 'Loading…',
      loadFailed: 'Load failed',
      noData: 'No data',
      save: 'Save',
      cancel: 'Cancel',
      createFile: 'New File',
      createDir: 'New Folder',
      reload: 'Reload',
      stop: 'Stop',
      start: 'Start',
      restart: 'Restart',
      open: 'Open',
      run: 'Run',
      remove: 'Remove',
      enable: 'Enable',
      disable: 'Disable',
      markRead: 'Mark read',
      markUnread: 'Mark unread',
      readAll: 'Read all',
      unreadAll: 'Unread all',
      clearRead: 'Clear read',
      clearAll: 'Clear all',
      search: 'Search',
      tabs: {
        overview: 'Overview',
        system: 'System',
        openclaw: 'OpenClaw',
        feishu: 'Feishu',
        channels: 'Channels',
        ai: 'AI',
        notifications: 'Notifications',
        agents: 'Agents',
        sessions: 'Sessions',
        activity: 'Activity',
        files: 'Files',
        memory: 'Memory',
        search: 'Search',
        costs: 'Costs',
        cron: 'Cron',
        'git-sync': 'Git Sync',
        mission: 'Compat',
        audit: 'Audit',
        profiles: 'Profiles',
        harden: 'Hardening',
        logs: 'Logs'
      },
      desc: {
        overview: 'Unified view of the machine, Gateway, agents, notifications, and runtime risk.',
        system: 'Host details, Gateway controls, and Guard Web background process status.',
        openclaw: 'Installation, version, update information, and Dashboard entry.',
        feishu: 'Maintain core Feishu config and verify plugin readiness.',
        channels: 'Review channel enablement, summaries, and secrets footprint.',
        ai: 'Review providers, primary model, and fallback chain, then adjust the core routing.',
        notifications: 'All Guard notifications in one place with batch actions.',
        agents: 'Agent workspaces, models, and SOUL/USER/AGENTS/MEMORY readiness.',
        sessions: 'Runtime sessions, token usage, and cost snapshots.',
        activity: 'Recent timeline of session changes and runtime warnings.',
        files: 'Browse and edit files within Guard managed paths only.',
        memory: 'Focus on SOUL.md, USER.md, AGENTS.md, MEMORY.md and memory/*.md.',
        search: 'Full text search across Guard managed workspaces.',
        costs: 'Estimated cost breakdown by model, agent, and session.',
        cron: 'Inspect, enable, disable, trigger, and delete cron jobs.',
        'git-sync': 'Manage .openclaw private repo sync, token auth, and OAuth.',
        mission: 'Keep the mission compatibility layer available while migration continues.',
        audit: 'Grouped security audit results and risk categories.',
        profiles: 'Apply Guard security profiles.',
        harden: 'Generate platform-specific hardening steps and scripts.',
        logs: 'Inspect Gateway and mission logs.'
      }
    }
  };

  const TAB_ORDER = [
    'overview', 'system', 'openclaw', 'feishu', 'channels', 'ai', 'notifications',
    'agents', 'sessions', 'activity', 'files', 'memory', 'search', 'costs',
    'cron', 'git-sync', 'mission', 'audit', 'profiles', 'harden', 'logs'
  ];

  const state = {
    lang: localStorage.getItem(STORAGE_LANG) || 'zh',
    activeTab: null,
    filesPath: '',
    currentFile: null,
    fileOriginal: '',
    memoryFile: null,
    memoryOriginal: '',
    searchQuery: '',
    searchResults: [],
    notificationFilter: 'all',
    hardenPlatform: null,
    logsTarget: 'service',
    currentViewData: null,
  };

  function t(key) {
    const parts = key.split('.');
    let value = I18N[state.lang] || I18N.zh;
    for (const part of parts) {
      value = value?.[part];
    }
    return value || key;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function prettyJson(value) {
    return escapeHtml(JSON.stringify(value ?? {}, null, 2));
  }

  function formatBytes(bytes) {
    const input = Number(bytes);
    if (!Number.isFinite(input) || input <= 0) return '-';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let current = input;
    let index = 0;
    while (current >= 1024 && index < units.length - 1) {
      current /= 1024;
      index += 1;
    }
    return `${current.toFixed(current >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
  }

  function formatNumber(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return '-';
    return new Intl.NumberFormat(state.lang === 'zh' ? 'zh-CN' : 'en-US').format(num);
  }

  function formatCost(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return '-';
    return `$${num.toFixed(num >= 1 ? 4 : 6)}`;
  }

  function formatDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString(state.lang === 'zh' ? 'zh-CN' : 'en-US');
  }

  function formatRelative(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const diff = Date.now() - date.getTime();
    const abs = Math.abs(diff);
    if (abs < 60_000) return state.lang === 'zh' ? '刚刚' : 'just now';
    if (abs < 3_600_000) return `${Math.round(abs / 60_000)} ${state.lang === 'zh' ? '分钟前' : 'min ago'}`;
    if (abs < 86_400_000) return `${Math.round(abs / 3_600_000)} ${state.lang === 'zh' ? '小时前' : 'h ago'}`;
    return `${Math.round(abs / 86_400_000)} ${state.lang === 'zh' ? '天前' : 'd ago'}`;
  }

  async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
    const raw = await response.text();
    let data = raw;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = raw;
    }
    if (!response.ok) {
      const message = typeof data === 'string'
        ? data
        : data?.message || data?.error || `HTTP ${response.status}`;
      throw new Error(message);
    }
    return data;
  }

  async function postJson(url, body) {
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(body || {}),
    });
  }

  function showToast(message, type = 'success') {
    const toast = document.getElementById('guard-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast show${type === 'error' ? ' error' : ''}`;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.className = 'toast';
    }, 2600);
  }

  function setActiveTab(tabId, updateHash = true) {
    state.activeTab = TAB_ORDER.includes(tabId) ? tabId : 'overview';
    localStorage.setItem(STORAGE_TAB, state.activeTab);
    if (updateHash) {
      history.replaceState(null, '', `#${state.activeTab}`);
    }
    renderShell();
    loadActiveTab();
  }

  function metricCard(title, value, detail, pillClass = '') {
    return `<div class="card"><div class="row" style="justify-content:space-between"><h3>${escapeHtml(title)}</h3>${pillClass ? `<span class="pill ${pillClass}">${escapeHtml(detail || '')}</span>` : ''}</div><div class="metric">${escapeHtml(value)}</div>${pillClass ? '' : `<p>${escapeHtml(detail || '')}</p>`}</div>`;
  }

  function keyValueGrid(items) {
    return `<div class="stack">${items.map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.label)}</strong><span class="muted">${escapeHtml(item.value)}</span></div>${item.help ? `<div class="muted small">${escapeHtml(item.help)}</div>` : ''}</div>`).join('')}</div>`;
  }

  function emptyState(message) {
    return `<div class="empty">${escapeHtml(message || t('noData'))}</div>`;
  }

  function setPanel(title, description, bodyHtml, actionsHtml = '') {
    const panel = document.getElementById('guard-panel');
    if (!panel) return;
    panel.innerHTML = `
      <section class="panel-head">
        <div>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)}</p>
        </div>
        ${actionsHtml ? `<div class="toolbar tight">${actionsHtml}</div>` : ''}
      </section>
      <section class="panel-body">${bodyHtml}</section>
    `;
  }

  function renderShell() {
    const active = state.activeTab || 'overview';
    app.innerHTML = `
      <div class="guard-shell">
        <header class="guard-header">
          <div class="guard-header-top">
            <div class="guard-brand">
              <div class="guard-badge">OC</div>
              <div class="guard-title">
                <h1>${escapeHtml(t('appTitle'))}</h1>
                <p>${escapeHtml(t('appSubtitle'))}</p>
              </div>
            </div>
            <div class="guard-actions">
              <div class="lang-switch">
                <button type="button" data-lang="zh" class="${state.lang === 'zh' ? 'active' : ''}">中文</button>
                <button type="button" data-lang="en" class="${state.lang === 'en' ? 'active' : ''}">EN</button>
              </div>
              <button class="action-btn" type="button" data-global-action="refresh">${escapeHtml(t('refresh'))}</button>
              <button class="action-btn danger" type="button" data-global-action="stop-web">${escapeHtml(t('stopWeb'))}</button>
              <a class="action-btn" href="${shellConfig.compatUrl || '/compat'}">${escapeHtml(t('compat'))}</a>
              <a class="action-btn" href="${shellConfig.legacyUrl || '/legacy'}">${escapeHtml(t('legacy'))}</a>
            </div>
          </div>
          <nav class="guard-tabs" id="guard-nav">
            ${TAB_ORDER.map((tabId) => `<button type="button" class="guard-tab ${tabId === active ? 'active' : ''}" data-tab="${tabId}">${escapeHtml(t(`tabs.${tabId}`))}</button>`).join('')}
          </nav>
        </header>
        <main class="guard-main">
          <div id="guard-panel"><div class="empty">${escapeHtml(t('loading'))}</div></div>
        </main>
        <div id="guard-toast" class="toast"></div>
      </div>
    `;

    app.querySelectorAll('[data-tab]').forEach((button) => {
      button.addEventListener('click', () => setActiveTab(button.getAttribute('data-tab')));
    });
    app.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => {
        state.lang = button.getAttribute('data-lang') || 'zh';
        localStorage.setItem(STORAGE_LANG, state.lang);
        renderShell();
        loadActiveTab();
      });
    });
    app.querySelector('[data-global-action="refresh"]')?.addEventListener('click', () => loadActiveTab(true));
    app.querySelector('[data-global-action="stop-web"]')?.addEventListener('click', async () => {
      if (!confirm(state.lang === 'zh' ? '确认停止当前 Guard Web 服务？' : 'Stop the current Guard Web service?')) return;
      try {
        const result = await postJson('/api/web-background/stop', {});
        showToast(result.message || (state.lang === 'zh' ? '停止命令已发送。' : 'Stop command sent.'));
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
  }
  async function loadOverview() {
    const [overview, webStatus] = await Promise.all([
      apiRequest('/api/dashboard/overview'),
      apiRequest('/api/web-background/status'),
    ]);

    const alerts = overview.runtime?.alerts || [];
    const latestNotifications = overview.notifications?.latest || [];
    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? 'Gateway' : 'Gateway', overview.gateway?.running ? 'RUNNING' : 'STOPPED', `port ${overview.gateway?.port || '-'}`, overview.gateway?.running ? 'success' : 'danger')}
        ${metricCard(state.lang === 'zh' ? 'Guard Web' : 'Guard Web', webStatus.running ? 'RUNNING' : 'STOPPED', webStatus.running ? `PID ${webStatus.pid}` : (state.lang === 'zh' ? '未检测到后台进程' : 'No managed background process'), webStatus.running ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? 'Agent' : 'Agents', formatNumber(overview.agents?.total || 0), `${overview.agents?.workspacesReady || 0} ${state.lang === 'zh' ? '个工作区就绪' : 'workspaces ready'}`)}
        ${metricCard(state.lang === 'zh' ? '会话' : 'Sessions', `${formatNumber(overview.sessions?.active || 0)} / ${formatNumber(overview.sessions?.total || 0)}`, state.lang === 'zh' ? '活跃 / 总数' : 'active / total')}
        ${metricCard(state.lang === 'zh' ? '通知' : 'Notifications', formatNumber(overview.notifications?.unread || 0), state.lang === 'zh' ? '未读通知' : 'unread')}
        ${metricCard(state.lang === 'zh' ? '记忆文件' : 'Memory Files', formatNumber(overview.memoryFiles || 0), overview.openclawDir || '-')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '系统资源' : 'System Resources'}</h3>
          ${keyValueGrid([
            { label: state.lang === 'zh' ? 'CPU' : 'CPU', value: `${formatNumber(overview.cpu?.cores || 0)} cores`, help: overview.cpu?.model || '-' },
            { label: state.lang === 'zh' ? '内存' : 'Memory', value: `${formatBytes(overview.memory?.usedBytes || 0)} / ${formatBytes(overview.memory?.totalBytes || 0)}`, help: state.lang === 'zh' ? '已用 / 总量' : 'used / total' },
            { label: state.lang === 'zh' ? '磁盘' : 'Disk', value: `${formatBytes(overview.disk?.freeBytes || 0)} / ${formatBytes(overview.disk?.totalBytes || 0)}`, help: overview.disk?.mountPath || '-' },
            { label: state.lang === 'zh' ? '平台' : 'Platform', value: overview.platform || '-', help: `${overview.user || '-'} @ ${overview.homeDir || '-'}` },
          ])}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '运行态风险' : 'Runtime Alerts'}</h3>
          ${alerts.length ? `<div class="list">${alerts.map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.code)}</strong><span class="pill ${item.level === 'critical' || item.level === 'error' ? 'danger' : item.level === 'warning' ? 'warn' : ''}">${escapeHtml(item.level)}</span></div><div>${escapeHtml(item.message)}</div></div>`).join('')}</div>` : emptyState(state.lang === 'zh' ? '当前没有新的运行态告警。' : 'No runtime alerts right now.')}
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '最新通知' : 'Latest Notifications'}</h3>
          ${latestNotifications.length ? `<div class="list">${latestNotifications.map((item) => `<div class="list-item ${item.read ? '' : 'unread'}"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.title)}</strong><span class="muted">${escapeHtml(formatRelative(item.createdAt))}</span></div><div>${escapeHtml(item.message)}</div></div>`).join('')}</div>` : emptyState(state.lang === 'zh' ? '暂无通知。' : 'No notifications yet.')}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '快速入口' : 'Quick Links'}</h3>
          <div class="quick-links">
            <a href="#system">${state.lang === 'zh' ? '系统与服务' : 'System & Service'}</a>
            <a href="#files">${state.lang === 'zh' ? '文件工作台' : 'File Workbench'}</a>
            <a href="#git-sync">${state.lang === 'zh' ? 'Git 同步' : 'Git Sync'}</a>
            <a href="#audit">${state.lang === 'zh' ? '安全审计' : 'Security Audit'}</a>
          </div>
          <div class="status ${webStatus.running ? '' : 'warn'}" style="margin-top:14px;">${escapeHtml(webStatus.running ? (state.lang === 'zh' ? `当前 Guard Web 正在运行，PID ${webStatus.pid}` : `Guard Web is running with PID ${webStatus.pid}`) : (state.lang === 'zh' ? '当前未检测到 Guard Web 后台进程。' : 'No Guard Web background process detected.'))}</div>
        </div>
      </div>
    `;

    setPanel(t('tabs.overview'), t('desc.overview'), body, `
      <button class="action-btn" type="button" data-overview-action="gateway-restart">${escapeHtml(t('restart'))} Gateway</button>
      <button class="action-btn" type="button" data-overview-action="open-dashboard">Dashboard</button>
    `);

    document.querySelector('[data-overview-action="gateway-restart"]')?.addEventListener('click', async () => {
      try {
        const result = await postJson('/api/service/restart', {});
        showToast(result.message || 'OK');
        loadOverview();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
    document.querySelector('[data-overview-action="open-dashboard"]')?.addEventListener('click', async () => {
      try {
        const result = await apiRequest('/api/gateway/dashboard');
        if (result.url) window.open(result.url, '_blank');
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
  }

  async function loadSystem() {
    const [info, service, webStatus] = await Promise.all([
      apiRequest('/api/info'),
      apiRequest('/api/service/status'),
      apiRequest('/api/web-background/status'),
    ]);

    const body = `
      <div class="grid">
        ${metricCard('Gateway', service.running ? 'RUNNING' : 'STOPPED', `PID ${service.pid || '-'}`, service.running ? 'success' : 'danger')}
        ${metricCard('Guard Web', webStatus.running ? 'RUNNING' : 'STOPPED', webStatus.running ? `PID ${webStatus.pid}` : '-', webStatus.running ? 'success' : 'warn')}
        ${metricCard('Node.js', info.nodeVersion || '-', info.arch || '-')}
        ${metricCard('OpenClaw', info.openclaw?.installed ? 'INSTALLED' : 'MISSING', info.openclaw?.version || '-')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '系统信息' : 'System Info'}</h3>
          ${keyValueGrid([
            { label: state.lang === 'zh' ? '平台' : 'Platform', value: info.platform || '-' },
            { label: state.lang === 'zh' ? '用户' : 'User', value: info.user || '-' },
            { label: 'Home', value: info.home || '-' },
            { label: 'OpenClaw Dir', value: info.openclawDir || '-' },
          ])}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '后台服务控制' : 'Background Service Controls'}</h3>
          <div class="toolbar">
            <button class="action-btn primary" type="button" data-service-action="start">${escapeHtml(t('start'))} Gateway</button>
            <button class="action-btn" type="button" data-service-action="restart">${escapeHtml(t('restart'))} Gateway</button>
            <button class="action-btn danger" type="button" data-service-action="stop">${escapeHtml(t('stop'))} Gateway</button>
            <button class="action-btn danger" type="button" data-service-action="stop-web">${escapeHtml(t('stopWeb'))}</button>
          </div>
          <pre style="margin-top:14px;">${prettyJson({ gateway: service, web: webStatus })}</pre>
        </div>
      </div>
    `;

    setPanel(t('tabs.system'), t('desc.system'), body);
    document.querySelectorAll('[data-service-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-service-action');
        try {
          if (action === 'stop-web') {
            const result = await postJson('/api/web-background/stop', {});
            showToast(result.message || 'OK');
          } else {
            const result = await postJson(`/api/service/${action}`, {});
            showToast(result.message || 'OK');
          }
          loadSystem();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadOpenClawTab() {
    const [status, dashboard, token] = await Promise.all([
      apiRequest('/api/openclaw/status'),
      apiRequest('/api/gateway/dashboard').catch(() => ({})),
      apiRequest('/api/gateway/token').catch(() => ({})),
    ]);

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '安装状态' : 'Install State', status.installed ? 'INSTALLED' : 'MISSING', status.version || '-')}
        ${metricCard(state.lang === 'zh' ? '最新版本' : 'Latest Version', status.latestVersion || '-', status.installKind || '-')}
        ${metricCard(state.lang === 'zh' ? '安装路径' : 'Binary Path', status.binPath || '-', '')}
        ${metricCard('Dashboard', dashboard.url ? 'READY' : 'UNAVAILABLE', dashboard.url || '-')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '升级与安装' : 'Install & Update'}</h3>
          <div class="toolbar tight">
            <button class="action-btn primary" type="button" data-openclaw-action="install">${state.lang === 'zh' ? '安装 / 修复' : 'Install / Repair'}</button>
            <button class="action-btn" type="button" data-openclaw-action="update">${state.lang === 'zh' ? '检查更新' : 'Update'}</button>
            <button class="action-btn" type="button" data-openclaw-action="dashboard">${state.lang === 'zh' ? '打开 Dashboard' : 'Open Dashboard'}</button>
          </div>
          <div class="status" style="margin-top:14px;">${escapeHtml(token.token ? `${state.lang === 'zh' ? '当前 Gateway Token 已就绪：' : 'Gateway token ready:'} ${token.token}` : (state.lang === 'zh' ? '未拿到 Gateway token。' : 'Gateway token unavailable.'))}</div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '原始状态' : 'Raw Status'}</h3>
          <pre>${prettyJson(status)}</pre>
        </div>
      </div>
    `;

    setPanel(t('tabs.openclaw'), t('desc.openclaw'), body);
    document.querySelectorAll('[data-openclaw-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-openclaw-action');
        try {
          if (action === 'dashboard') {
            if (dashboard.url) window.open(dashboard.url, '_blank');
            return;
          }
          const result = await postJson(`/api/openclaw/${action}`, {});
          showToast(result.message || 'OK');
          loadOpenClawTab();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadFeishu() {
    const [config, plugin] = await Promise.all([
      apiRequest('/api/feishu/config'),
      apiRequest('/api/feishu/plugin'),
    ]);

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '插件' : 'Plugin', plugin.installed ? 'READY' : 'MISSING', plugin.version || (state.lang === 'zh' ? '已检测到配置' : 'configured'), plugin.installed ? 'success' : 'warn')}
        ${metricCard('Domain', config.domain || 'feishu', config.connectionMode || '-')}
        ${metricCard(state.lang === 'zh' ? '群策略' : 'Group Policy', config.groupPolicy || '-', config.dmPolicy || '-')}
        ${metricCard(state.lang === 'zh' ? '流式输出' : 'Streaming', config.streaming ? 'ON' : 'OFF', config.renderMode || '-')}
      </div>
      <div class="card">
        <h3>${state.lang === 'zh' ? '飞书配置' : 'Feishu Config'}</h3>
        <div class="form-grid" id="feishu-form">
          <div class="field"><label>appId</label><input name="appId" value="${escapeHtml(config.appId || '')}"></div>
          <div class="field"><label>appSecret</label><input name="appSecret" value="${escapeHtml(config.appSecret || '')}"></div>
          <div class="field"><label>encryptKey</label><input name="encryptKey" value="${escapeHtml(config.encryptKey || '')}"></div>
          <div class="field"><label>verificationToken</label><input name="verificationToken" value="${escapeHtml(config.verificationToken || '')}"></div>
          <div class="field"><label>domain</label><input name="domain" value="${escapeHtml(config.domain || 'feishu')}"></div>
          <div class="field"><label>connectionMode</label><input name="connectionMode" value="${escapeHtml(config.connectionMode || 'websocket')}"></div>
          <div class="field"><label>webhookHost</label><input name="webhookHost" value="${escapeHtml(config.webhookHost || '')}"></div>
          <div class="field"><label>webhookPort</label><input name="webhookPort" value="${escapeHtml(config.webhookPort || '')}"></div>
          <div class="field"><label>dmPolicy</label><input name="dmPolicy" value="${escapeHtml(config.dmPolicy || '')}"></div>
          <div class="field"><label>groupPolicy</label><input name="groupPolicy" value="${escapeHtml(config.groupPolicy || '')}"></div>
          <div class="field"><label>renderMode</label><input name="renderMode" value="${escapeHtml(config.renderMode || '')}"></div>
          <div class="field"><label>whisperModel</label><input name="whisperModel" value="${escapeHtml(config.whisperModel || '')}"></div>
        </div>
        <div class="row" style="margin-top:14px; gap:18px;">
          <label><input type="checkbox" id="feishu-require-mention" ${config.requireMention ? 'checked' : ''}> requireMention</label>
          <label><input type="checkbox" id="feishu-streaming" ${config.streaming ? 'checked' : ''}> streaming</label>
        </div>
        <div class="toolbar tight" style="margin-top:14px;">
          <button class="action-btn primary" type="button" data-feishu-action="save">${escapeHtml(t('save'))}</button>
          <button class="action-btn" type="button" data-feishu-action="reload">${escapeHtml(t('reload'))}</button>
        </div>
      </div>
    `;

    setPanel(t('tabs.feishu'), t('desc.feishu'), body);
    document.querySelector('[data-feishu-action="reload"]')?.addEventListener('click', () => loadFeishu());
    document.querySelector('[data-feishu-action="save"]')?.addEventListener('click', async () => {
      const form = document.getElementById('feishu-form');
      const payload = {};
      form.querySelectorAll('input').forEach((input) => {
        if (input.name) payload[input.name] = input.value.trim();
      });
      payload.requireMention = document.getElementById('feishu-require-mention').checked;
      payload.streaming = document.getElementById('feishu-streaming').checked;
      try {
        const result = await postJson('/api/feishu/config', payload);
        showToast(result.message || 'OK');
        loadFeishu();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
  }

  async function loadChannels() {
    const channels = await apiRequest('/api/channels');
    const body = channels.length ? `<div class="grid">${channels.map((channel) => `
      <div class="card">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <div>
            <h3>${escapeHtml(channel.icon || '')} ${escapeHtml(channel.name || channel.id)}</h3>
            <p>${escapeHtml(channel.id)}</p>
          </div>
          <span class="pill ${channel.enabled ? 'success' : 'warn'}">${channel.enabled ? 'enabled' : 'disabled'}</span>
        </div>
        <pre>${prettyJson(channel.config || {})}</pre>
      </div>
    `).join('')}</div>` : emptyState(state.lang === 'zh' ? '当前没有渠道配置。' : 'No channel configuration.');
    setPanel(t('tabs.channels'), t('desc.channels'), body);
  }

  async function loadAI() {
    const [config, providers] = await Promise.all([
      apiRequest('/api/ai/config'),
      apiRequest('/api/ai/providers'),
    ]);

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '主模型' : 'Primary Model', config.primaryModel || '-', `${config.providers?.length || 0} providers`)}
        ${metricCard(state.lang === 'zh' ? 'Fallback 数量' : 'Fallback Count', formatNumber((config.fallbackModels || []).length), (config.fallbackModels || []).join(', ') || '-')}
        ${metricCard(state.lang === 'zh' ? '可用模型' : 'Available Models', formatNumber((config.availableModels || []).length), '-')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '主模型与 Fallback' : 'Primary & Fallbacks'}</h3>
          <div class="field"><label>${state.lang === 'zh' ? '主模型 ID' : 'Primary model ID'}</label><input id="ai-primary-input" value="${escapeHtml(config.primaryModel || '')}" placeholder="openai-codex/gpt-5.3-codex"></div>
          <div class="field"><label>Fallbacks</label><textarea id="ai-fallback-input">${escapeHtml((config.fallbackModels || []).join('\n'))}</textarea></div>
          <div class="toolbar tight">
            <button class="action-btn primary" type="button" data-ai-action="save-primary">${escapeHtml(t('save'))} Primary</button>
            <button class="action-btn" type="button" data-ai-action="save-fallbacks">${escapeHtml(t('save'))} Fallbacks</button>
          </div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? 'Provider 摘要' : 'Provider Summary'}</h3>
          <div class="list">${(config.providers || []).map((provider) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(provider.name)}</strong><span class="pill ${provider.hasApiKey ? 'success' : 'warn'}">${provider.hasApiKey ? 'apiKey' : 'no key'}</span></div><div class="muted">${escapeHtml(provider.baseUrl || '-')}</div><div class="tag-list">${provider.models.map((model) => `<span class="chip ${model.isPrimary || model.isFallback ? 'active' : ''}">${escapeHtml(model.fullId)}</span>`).join('')}</div></div>`).join('') || emptyState(state.lang === 'zh' ? '暂无 Provider。' : 'No providers yet.')}</div>
          <pre>${prettyJson(providers.presets || [])}</pre>
        </div>
      </div>
    `;

    setPanel(t('tabs.ai'), t('desc.ai'), body);
    document.querySelector('[data-ai-action="save-primary"]')?.addEventListener('click', async () => {
      try {
        const result = await postJson('/api/ai/primary', { modelId: document.getElementById('ai-primary-input').value.trim() });
        showToast(result.message || 'OK');
        loadAI();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
    document.querySelector('[data-ai-action="save-fallbacks"]')?.addEventListener('click', async () => {
      const modelIds = document.getElementById('ai-fallback-input').value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
      try {
        const result = await postJson('/api/ai/fallbacks', { modelIds });
        showToast(result.message || 'OK');
        loadAI();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
  }

  async function loadNotifications() {
    const summary = await apiRequest('/api/notifications?limit=200');
    const items = summary.items || [];
    const filtered = items.filter((item) => {
      if (state.notificationFilter === 'unread') return !item.read;
      if (state.notificationFilter === 'error') return item.severity === 'error' || item.severity === 'warning';
      return true;
    });

    const body = `
      <div class="toolbar tight">
        <button class="chip ${state.notificationFilter === 'all' ? 'active' : ''}" data-notify-filter="all">All (${summary.total || 0})</button>
        <button class="chip ${state.notificationFilter === 'unread' ? 'active' : ''}" data-notify-filter="unread">Unread (${summary.unread || 0})</button>
        <button class="chip ${state.notificationFilter === 'error' ? 'active' : ''}" data-notify-filter="error">Warnings</button>
      </div>
      <div class="toolbar tight">
        <button class="action-btn" data-notify-bulk="read-all">${escapeHtml(t('readAll'))}</button>
        <button class="action-btn" data-notify-bulk="unread-all">${escapeHtml(t('unreadAll'))}</button>
        <button class="action-btn" data-notify-bulk="clear-read">${escapeHtml(t('clearRead'))}</button>
        <button class="action-btn danger" data-notify-bulk="clear-all">${escapeHtml(t('clearAll'))}</button>
      </div>
      <div class="list">${filtered.length ? filtered.map((item) => `<div class="list-item ${item.read ? '' : 'unread'}"><div class="row" style="justify-content:space-between"><div><strong>${escapeHtml(item.title)}</strong><div class="muted small">${escapeHtml(item.type)} · ${escapeHtml(formatDate(item.createdAt))}</div></div><span class="pill ${item.severity === 'success' ? 'success' : item.severity === 'warning' ? 'warn' : item.severity === 'error' ? 'danger' : ''}">${escapeHtml(item.severity)}</span></div><p>${escapeHtml(item.message)}</p><div class="toolbar tight"><button class="action-btn" data-notify-item="${escapeHtml(item.id)}" data-next-read="${item.read ? 'false' : 'true'}">${escapeHtml(item.read ? t('markUnread') : t('markRead'))}</button></div></div>`).join('') : emptyState(state.lang === 'zh' ? '没有符合筛选条件的通知。' : 'No notifications for this filter.')}</div>
    `;

    setPanel(t('tabs.notifications'), t('desc.notifications'), body);
    document.querySelectorAll('[data-notify-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.notificationFilter = button.getAttribute('data-notify-filter') || 'all';
        loadNotifications();
      });
    });
    document.querySelectorAll('[data-notify-bulk]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          const result = await postJson('/api/notifications/bulk', { action: button.getAttribute('data-notify-bulk') });
          showToast(result.message || 'OK');
          loadNotifications();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
    document.querySelectorAll('[data-notify-item]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          await postJson('/api/notifications/read', { id: button.getAttribute('data-notify-item'), read: button.getAttribute('data-next-read') === 'true' });
          loadNotifications();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadAgents() {
    const data = await apiRequest('/api/agents');
    const agents = data.agents || [];
    const body = agents.length ? `<div class="grid">${agents.map((agent) => `<div class="card"><div class="row" style="justify-content:space-between"><h3>${escapeHtml(agent.name)}</h3><span class="pill ${agent.isDefault ? 'success' : ''}">${agent.isDefault ? 'default' : agent.id}</span></div><div class="muted">${escapeHtml(agent.resolvedWorkspace || agent.workspace || '-')}</div><div class="tag-list" style="margin-top:12px;"><span class="chip ${agent.docStatus?.soul ? 'active' : ''}">SOUL</span><span class="chip ${agent.docStatus?.user ? 'active' : ''}">USER</span><span class="chip ${agent.docStatus?.agents ? 'active' : ''}">AGENTS</span><span class="chip ${agent.docStatus?.memory ? 'active' : ''}">MEMORY</span></div><pre>${prettyJson(agent)}</pre></div>`).join('')}</div>` : emptyState(state.lang === 'zh' ? '当前没有 Agent。' : 'No agents configured.');
    setPanel(t('tabs.agents'), t('desc.agents'), body);
  }

  async function loadSessions() {
    const data = await apiRequest('/api/sessions');
    const sessions = data.snapshot?.sessions || [];
    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '会话总数' : 'Sessions', formatNumber(sessions.length), data.snapshot?.summary?.defaultModel || '-')}
        ${metricCard(state.lang === 'zh' ? '总 Tokens' : 'Total Tokens', formatNumber(data.costSummary?.totalTokens || 0), '')}
        ${metricCard(state.lang === 'zh' ? '总成本' : 'Total Cost', formatCost(data.costSummary?.totalEstimatedCost || 0), '')}
      </div>
      <div class="list">${sessions.length ? sessions.map((session) => `<div class="list-item"><div class="row" style="justify-content:space-between"><div><strong>${escapeHtml(session.id)}</strong><div class="muted small">${escapeHtml(session.agentId)} · ${escapeHtml(session.modelId)}</div></div><span class="pill ${session.status === 'active' ? 'success' : ''}">${escapeHtml(session.status)}</span></div><div class="row"><span class="chip">in ${formatNumber(session.usage?.inputTokens || 0)}</span><span class="chip">out ${formatNumber(session.usage?.outputTokens || 0)}</span><span class="chip">cache ${formatNumber((session.usage?.cacheReadTokens || 0) + (session.usage?.cacheWriteTokens || 0))}</span><span class="chip active">${formatNumber(session.usage?.totalTokens || 0)}</span></div><div class="muted small">${escapeHtml(formatDate(session.updatedAt || session.startedAt))}</div></div>`).join('') : emptyState(state.lang === 'zh' ? '当前没有运行态会话。' : 'No runtime sessions.')}</div>
    `;
    setPanel(t('tabs.sessions'), t('desc.sessions'), body);
  }

  async function loadActivity() {
    const data = await apiRequest('/api/activity?limit=80');
    const events = data.events || [];
    const body = events.length ? `<div class="list">${events.map((event) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(event.title)}</strong><span class="pill ${event.type === 'runtime-warning' ? 'warn' : ''}">${escapeHtml(event.type)}</span></div><div>${escapeHtml(event.description)}</div><div class="muted small">${escapeHtml(formatDate(event.createdAt))}</div></div>`).join('')}</div>` : emptyState(state.lang === 'zh' ? '暂无活动记录。' : 'No activity yet.');
    setPanel(t('tabs.activity'), t('desc.activity'), body);
  }
  async function openManagedFile(targetPath, mode) {
    const data = await apiRequest(`/api/files/content?path=${encodeURIComponent(targetPath)}`);
    if (mode === 'memory') {
      state.memoryFile = data;
      state.memoryOriginal = data.content || '';
    } else {
      state.currentFile = data;
      state.fileOriginal = data.content || '';
    }
  }

  function hasDirtyEditor(mode) {
    const element = document.getElementById(mode === 'memory' ? 'memory-editor' : 'file-editor');
    const original = mode === 'memory' ? state.memoryOriginal : state.fileOriginal;
    return !!element && element.value !== original;
  }

  async function loadFiles() {
    const queryPath = state.filesPath ? `?path=${encodeURIComponent(state.filesPath)}` : '';
    const data = await apiRequest(`/api/files${queryPath}`);
    state.filesPath = data.currentPath || state.filesPath;

    const rootButtons = (data.roots || []).map((root) => `<button type="button" class="chip ${state.filesPath === root.path ? 'active' : ''}" data-root-path="${escapeHtml(root.path)}">${escapeHtml(root.label)}</button>`).join('');
    const entriesHtml = (data.entries || []).length
      ? data.entries.map((entry) => `<button type="button" class="${state.currentFile?.path === entry.path ? 'active' : ''}" data-file-entry="${escapeHtml(entry.path)}" data-entry-type="${entry.isDirectory ? 'dir' : 'file'}"><strong>${escapeHtml(entry.isDirectory ? `📁 ${entry.name}` : entry.name)}</strong><div class="muted small">${escapeHtml(entry.relativePath || entry.path)}</div></button>`).join('')
      : emptyState(state.lang === 'zh' ? '当前目录为空。' : 'Folder is empty.');

    const editor = state.currentFile
      ? `
        <div class="card">
          <div class="panel-head" style="margin-bottom:12px;">
            <div>
              <h3>${escapeHtml(state.currentFile.relativePath || state.currentFile.path)}</h3>
              <p>${escapeHtml(state.currentFile.path)}</p>
            </div>
            <div class="toolbar tight">
              <button class="action-btn" type="button" data-file-action="reload-current">${escapeHtml(t('reload'))}</button>
              <button class="action-btn primary" type="button" data-file-action="save-current">${escapeHtml(t('save'))}</button>
            </div>
          </div>
          <textarea id="file-editor">${escapeHtml(state.currentFile.content || '')}</textarea>
          ${state.currentFile.truncated ? `<div class="status warn" style="margin-top:12px;">${state.lang === 'zh' ? '文件较大，当前为截断预览。保存前请确认内容完整。' : 'Large file preview was truncated. Verify content before saving.'}</div>` : ''}
        </div>
      `
      : `<div class="card">${emptyState(state.lang === 'zh' ? '从左侧选择一个文件开始编辑。' : 'Select a file from the left panel to start editing.')}</div>`;

    const body = `
      <div class="toolbar">
        ${rootButtons}
        <button class="action-btn" type="button" data-file-action="go-up" ${data.parentPath ? '' : 'disabled'}>↑</button>
        <button class="action-btn" type="button" data-file-action="reload-list">${escapeHtml(t('reload'))}</button>
        <button class="action-btn" type="button" data-file-action="new-file">${escapeHtml(t('createFile'))}</button>
        <button class="action-btn" type="button" data-file-action="new-dir">${escapeHtml(t('createDir'))}</button>
      </div>
      <div class="two-col">
        <div class="card"><div class="split-list">${entriesHtml}</div></div>
        ${editor}
      </div>
    `;

    setPanel(t('tabs.files'), t('desc.files'), body);

    document.querySelectorAll('[data-root-path]').forEach((button) => {
      button.addEventListener('click', () => {
        if (hasDirtyEditor('file') && !confirm(state.lang === 'zh' ? '当前编辑器有未保存修改，确认切换？' : 'Unsaved changes detected. Continue?')) return;
        state.filesPath = button.getAttribute('data-root-path') || '';
        state.currentFile = null;
        loadFiles();
      });
    });

    document.querySelectorAll('[data-file-entry]').forEach((button) => {
      button.addEventListener('click', async () => {
        if (hasDirtyEditor('file') && !confirm(state.lang === 'zh' ? '当前编辑器有未保存修改，确认切换？' : 'Unsaved changes detected. Continue?')) return;
        const targetPath = button.getAttribute('data-file-entry');
        const type = button.getAttribute('data-entry-type');
        if (type === 'dir') {
          state.filesPath = targetPath || state.filesPath;
          state.currentFile = null;
          loadFiles();
          return;
        }
        try {
          await openManagedFile(targetPath, 'file');
          loadFiles();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });

    document.querySelectorAll('[data-file-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-file-action');
        try {
          if (action === 'go-up' && data.parentPath) {
            state.filesPath = data.parentPath;
            state.currentFile = null;
            loadFiles();
            return;
          }
          if (action === 'reload-list') {
            loadFiles();
            return;
          }
          if (action === 'reload-current' && state.currentFile?.path) {
            await openManagedFile(state.currentFile.path, 'file');
            loadFiles();
            return;
          }
          if (action === 'save-current' && state.currentFile?.path) {
            const content = document.getElementById('file-editor').value;
            const result = await postJson('/api/files/content', { path: state.currentFile.path, content });
            state.fileOriginal = content;
            showToast(result.message || 'OK');
            return;
          }
          if (action === 'new-file' || action === 'new-dir') {
            const name = prompt(action === 'new-file' ? (state.lang === 'zh' ? '请输入新文件名' : 'New file name') : (state.lang === 'zh' ? '请输入新目录名' : 'New folder name'));
            if (!name) return;
            const result = await postJson('/api/files/create', {
              parentPath: state.filesPath,
              name,
              kind: action === 'new-dir' ? 'directory' : 'file',
            });
            showToast(result.message || 'OK');
            loadFiles();
          }
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadMemory() {
    const data = await apiRequest('/api/memory');
    const files = data.files || [];
    const listHtml = files.length ? files.map((file) => `<button type="button" class="${state.memoryFile?.path === file.path ? 'active' : ''}" data-memory-file="${escapeHtml(file.path)}"><strong>${escapeHtml(file.type)}</strong><div class="muted small">${escapeHtml(file.agentId)} · ${escapeHtml(file.relativePath || file.path)}</div></button>`).join('') : emptyState(state.lang === 'zh' ? '暂无记忆文件。' : 'No memory files yet.');
    const editor = state.memoryFile ? `
      <div class="card">
        <div class="panel-head" style="margin-bottom:12px;">
          <div>
            <h3>${escapeHtml(state.memoryFile.relativePath || state.memoryFile.path)}</h3>
            <p>${escapeHtml(state.memoryFile.path)}</p>
          </div>
          <div class="toolbar tight">
            <button class="action-btn" data-memory-action="reload">${escapeHtml(t('reload'))}</button>
            <button class="action-btn primary" data-memory-action="save">${escapeHtml(t('save'))}</button>
          </div>
        </div>
        <textarea id="memory-editor">${escapeHtml(state.memoryFile.content || '')}</textarea>
      </div>
    ` : `<div class="card">${emptyState(state.lang === 'zh' ? '从左侧选择一个记忆文件。' : 'Select a memory file from the left panel.')}</div>`;

    setPanel(t('tabs.memory'), t('desc.memory'), `<div class="two-col"><div class="card"><div class="split-list">${listHtml}</div></div>${editor}</div>`);

    document.querySelectorAll('[data-memory-file]').forEach((button) => {
      button.addEventListener('click', async () => {
        if (hasDirtyEditor('memory') && !confirm(state.lang === 'zh' ? '当前记忆编辑器有未保存修改，确认切换？' : 'Unsaved memory changes detected. Continue?')) return;
        try {
          await openManagedFile(button.getAttribute('data-memory-file'), 'memory');
          loadMemory();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
    document.querySelector('[data-memory-action="reload"]')?.addEventListener('click', async () => {
      if (!state.memoryFile?.path) return;
      await openManagedFile(state.memoryFile.path, 'memory');
      loadMemory();
    });
    document.querySelector('[data-memory-action="save"]')?.addEventListener('click', async () => {
      if (!state.memoryFile?.path) return;
      try {
        const content = document.getElementById('memory-editor').value;
        const result = await postJson('/api/files/content', { path: state.memoryFile.path, content });
        state.memoryOriginal = content;
        showToast(result.message || 'OK');
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
  }

  async function loadSearch() {
    const body = `
      <div class="card">
        <div class="toolbar tight">
          <input id="search-query" value="${escapeHtml(state.searchQuery || '')}" placeholder="SOUL.md / qwen / fallback / cron">
          <button class="action-btn primary" data-search-action="run">${escapeHtml(t('search'))}</button>
        </div>
      </div>
      <div class="list">${state.searchResults.length ? state.searchResults.map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.relativePath || item.path)}</strong><span class="muted">L${escapeHtml(item.line)}</span></div><div>${escapeHtml(item.preview)}</div><div class="toolbar tight" style="margin-top:12px;"><button class="action-btn" data-search-open="${escapeHtml(item.path)}">${state.lang === 'zh' ? '在文件页打开' : 'Open in Files'}</button></div></div>`).join('') : emptyState(state.lang === 'zh' ? '输入关键词开始搜索。' : 'Enter a query to search.')}</div>
    `;
    setPanel(t('tabs.search'), t('desc.search'), body);

    document.querySelector('[data-search-action="run"]')?.addEventListener('click', async () => {
      state.searchQuery = document.getElementById('search-query').value.trim();
      if (!state.searchQuery) {
        state.searchResults = [];
        loadSearch();
        return;
      }
      try {
        const result = await apiRequest(`/api/search?q=${encodeURIComponent(state.searchQuery)}&limit=100`);
        state.searchResults = result.results || [];
        loadSearch();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
    document.querySelectorAll('[data-search-open]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          await openManagedFile(button.getAttribute('data-search-open'), 'file');
          state.filesPath = state.currentFile?.path ? state.currentFile.path.split(/[/\\]/).slice(0, -1).join('\\') : state.filesPath;
          setActiveTab('files');
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadCosts() {
    const summary = await apiRequest('/api/costs');
    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '总成本' : 'Total Cost', formatCost(summary.totalEstimatedCost || 0), summary.pricingUnit || '-')}
        ${metricCard(state.lang === 'zh' ? '总 Tokens' : 'Total Tokens', formatNumber(summary.totalTokens || 0), '')}
        ${metricCard(state.lang === 'zh' ? '会话数' : 'Sessions', formatNumber((summary.sessions || []).length), '')}
      </div>
      <div class="grid">
        <div class="card"><h3>${state.lang === 'zh' ? '按模型' : 'By Model'}</h3><div class="list">${(summary.byModel || []).map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.id)}</strong><span>${formatCost(item.estimatedCost)}</span></div><div class="muted">${formatNumber(item.totalTokens)} tokens</div></div>`).join('') || emptyState()}</div></div>
        <div class="card"><h3>${state.lang === 'zh' ? '按 Agent' : 'By Agent'}</h3><div class="list">${(summary.byAgent || []).map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.id)}</strong><span>${formatCost(item.estimatedCost)}</span></div><div class="muted">${formatNumber(item.totalTokens)} tokens</div></div>`).join('') || emptyState()}</div></div>
      </div>
    `;
    setPanel(t('tabs.costs'), t('desc.costs'), body);
  }

  async function loadCron() {
    const data = await apiRequest('/api/cron-ui');
    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '任务数' : 'Jobs', formatNumber((data.jobs || []).length), '')}
        ${metricCard(state.lang === 'zh' ? '调度器' : 'Scheduler', data.status?.enabled === null ? '-' : (data.status.enabled ? 'ON' : 'OFF'), data.status?.storePath || '-')}
        ${metricCard(state.lang === 'zh' ? '下一次唤醒' : 'Next Wake', formatDate(data.status?.schedulerNextWakeAt), '')}
      </div>
      ${(data.warnings || []).length ? `<div class="status warn">${escapeHtml(data.warnings.join('\n'))}</div>` : ''}
      <div class="list">${(data.jobs || []).length ? data.jobs.map((job) => `<div class="list-item"><div class="row" style="justify-content:space-between"><div><strong>${escapeHtml(job.name || job.id)}</strong><div class="muted small">${escapeHtml(job.agentId)} · ${escapeHtml(job.schedule)}</div></div><span class="pill ${job.enabled ? 'success' : 'warn'}">${job.enabled ? 'enabled' : 'disabled'}</span></div><div>${escapeHtml(job.prompt)}</div><div class="toolbar tight" style="margin-top:12px;"><button class="action-btn" data-cron-action="run" data-job-id="${escapeHtml(job.id)}">${escapeHtml(t('run'))}</button><button class="action-btn" data-cron-action="${job.enabled ? 'disable' : 'enable'}" data-job-id="${escapeHtml(job.id)}">${escapeHtml(job.enabled ? t('disable') : t('enable'))}</button><button class="action-btn danger" data-cron-action="remove" data-job-id="${escapeHtml(job.id)}">${escapeHtml(t('remove'))}</button></div></div>`).join('') : emptyState(state.lang === 'zh' ? '当前没有 Cron 任务。' : 'No cron jobs.')}</div>
    `;
    setPanel(t('tabs.cron'), t('desc.cron'), body);
    document.querySelectorAll('[data-cron-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-cron-action');
        const jobId = button.getAttribute('data-job-id');
        try {
          const result = await postJson(`/api/cron-ui/${action}`, { jobId });
          showToast(result.message || 'OK');
          loadCron();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadGitSync() {
    const status = await apiRequest('/api/git-sync/status');
    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '仓库状态' : 'Repo', status.repoInitialized ? 'READY' : 'MISSING', status.repoPath || '-')}
        ${metricCard(state.lang === 'zh' ? '远程仓库' : 'Remote', status.remoteUrl || '-', status.provider || '-')}
        ${metricCard(state.lang === 'zh' ? '认证' : 'Auth', status.authConfigured ? (status.authMode || 'configured') : 'missing', status.repoPrivate === true ? 'private' : (status.repoPrivate === false ? 'public' : 'unchecked'), status.repoPrivate === true ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '本地变更' : 'Changes', formatNumber((status.changedFiles || []).length), status.currentBranch || '-')}
      </div>
      ${status.reasons?.length ? `<div class="status warn">${escapeHtml(status.reasons.join('； '))}</div>` : ''}
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '初始化与远程绑定' : 'Init & Remote'}</h3>
          <div class="toolbar"><button class="action-btn" data-git-action="init">git init</button></div>
          <div class="form-grid" id="git-connect-form" style="margin-top:12px;">
            <div class="field"><label>provider</label><select name="provider"><option value="github">GitHub</option><option value="gitee">Gitee</option></select></div>
            <div class="field"><label>remoteName</label><input name="remoteName" value="${escapeHtml(status.remoteName || 'origin')}"></div>
            <div class="field" style="grid-column:1 / -1;"><label>remoteUrl</label><input name="remoteUrl" value="${escapeHtml(status.remoteUrl || '')}" placeholder="https://github.com/owner/repo.git"></div>
          </div>
          <div class="toolbar tight" style="margin-top:12px;"><button class="action-btn primary" data-git-action="connect">connect</button><button class="action-btn" data-git-action="check">check-private</button></div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? 'HTTPS Token' : 'HTTPS Token'}</h3>
          <div class="form-grid" id="git-token-form">
            <div class="field"><label>provider</label><select name="provider"><option value="github">GitHub</option><option value="gitee">Gitee</option></select></div>
            <div class="field"><label>username</label><input name="username" value="${escapeHtml(status.state?.username || '')}"></div>
            <div class="field" style="grid-column:1 / -1;"><label>token</label><input name="token" value="" placeholder="ghp_xxx / gitee token"></div>
          </div>
          <div class="toolbar tight" style="margin-top:12px;"><button class="action-btn primary" data-git-action="token">save token</button></div>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>OAuth</h3>
          <div class="form-grid" id="git-oauth-form">
            <div class="field"><label>provider</label><select name="provider"><option value="github">GitHub</option><option value="gitee">Gitee</option></select></div>
            <div class="field"><label>redirectPort</label><input name="redirectPort" value="43189"></div>
            <div class="field"><label>scope</label><input name="scope" value="repo read:user"></div>
            <div class="field"><label>clientId</label><input name="clientId" value=""></div>
            <div class="field" style="grid-column:1 / -1;"><label>clientSecret</label><input name="clientSecret" value=""></div>
          </div>
          <div class="toolbar tight" style="margin-top:12px;"><button class="action-btn" data-git-action="oauth">start oauth</button></div>
          <pre style="margin-top:12px;">${prettyJson(status.oauth || {})}</pre>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '提交与推送' : 'Commit & Push'}</h3>
          <div class="toolbar tight">
            <button class="action-btn" data-git-action="commit">commit</button>
            <button class="action-btn" data-git-action="push">push</button>
            <button class="action-btn primary" data-git-action="sync">sync</button>
          </div>
          <div class="list" style="margin-top:12px;">${(status.changedFiles || []).length ? status.changedFiles.map((file) => `<div class="list-item">${escapeHtml(file)}</div>`).join('') : emptyState(state.lang === 'zh' ? '当前没有待同步变更。' : 'No local changes to sync.')}</div>
        </div>
      </div>
    `;
    setPanel(t('tabs.git-sync'), t('desc.git-sync'), body);

    document.querySelectorAll('[data-git-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-git-action');
        try {
          if (action === 'init' || action === 'check' || action === 'push') {
            const result = await postJson(`/api/git-sync/${action === 'check' ? 'check-private' : action}`, {});
            showToast(result.message || 'OK');
            loadGitSync();
            return;
          }
          if (action === 'connect') {
            const form = document.getElementById('git-connect-form');
            const payload = {};
            form.querySelectorAll('input,select').forEach((input) => {
              payload[input.name] = input.value.trim();
            });
            const result = await postJson('/api/git-sync/connect', payload);
            showToast(result.message || 'OK');
            loadGitSync();
            return;
          }
          if (action === 'token') {
            const form = document.getElementById('git-token-form');
            const payload = {};
            form.querySelectorAll('input,select').forEach((input) => {
              payload[input.name] = input.value.trim();
            });
            const result = await postJson('/api/git-sync/auth/token', payload);
            showToast(result.message || 'OK');
            loadGitSync();
            return;
          }
          if (action === 'oauth') {
            const form = document.getElementById('git-oauth-form');
            const payload = {};
            form.querySelectorAll('input,select').forEach((input) => {
              payload[input.name] = input.value.trim();
            });
            payload.redirectPort = Number(payload.redirectPort || 43189);
            const result = await postJson('/api/git-sync/auth/oauth', payload);
            showToast(result.message || 'OK');
            if (result.output) window.open(result.output, '_blank');
            loadGitSync();
            return;
          }
          if (action === 'commit' || action === 'sync') {
            const message = prompt(state.lang === 'zh' ? '请输入提交说明（可留空使用默认中文说明）' : 'Commit message (leave empty for default message)') || '';
            const result = await postJson(`/api/git-sync/${action}`, { message });
            showToast(result.message || 'OK');
            loadGitSync();
            return;
          }
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }
  async function loadMission() {
    const [status, health, logs] = await Promise.all([
      apiRequest('/api/mission/status').catch((error) => ({ error: error.message })),
      apiRequest('/api/mission/health').catch((error) => ({ error: error.message })),
      apiRequest('/api/mission/logs?lines=120').catch(() => ({ logs: [] })),
    ]);

    const body = `
      <div class="status warn">${state.lang === 'zh' ? '这里是兼容层，不再作为默认入口；保留它只是为了迁移期平滑过渡。' : 'This is now a compatibility layer, kept only as a safe migration bridge.'}</div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '兼容层动作' : 'Compatibility Actions'}</h3>
          <div class="toolbar tight">
            <button class="action-btn" data-mission-action="install">install</button>
            <button class="action-btn" data-mission-action="sync">sync</button>
            <button class="action-btn" data-mission-action="bootstrap">bootstrap</button>
            <button class="action-btn primary" data-mission-action="start">start</button>
            <button class="action-btn danger" data-mission-action="stop">stop</button>
            <button class="action-btn" data-mission-action="restart">restart</button>
          </div>
          <pre style="margin-top:12px;">${prettyJson(status)}</pre>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '健康检查' : 'Health'}</h3>
          <pre>${prettyJson(health)}</pre>
        </div>
      </div>
      <div class="card"><h3>Mission Logs</h3><pre>${escapeHtml((logs.logs || []).join('\n'))}</pre></div>
    `;
    setPanel(t('tabs.mission'), t('desc.mission'), body);
    document.querySelectorAll('[data-mission-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          const result = await postJson(`/api/mission/${button.getAttribute('data-mission-action')}`, {});
          showToast(result.message || 'OK');
          loadMission();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadAudit() {
    const data = await apiRequest('/api/audit');
    const groups = {};
    (data.results || []).forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    const body = `
      <div class="grid">
        ${metricCard('PASS', formatNumber(data.summary?.pass || 0), '', 'success')}
        ${metricCard('WARN', formatNumber(data.summary?.warn || 0), '', 'warn')}
        ${metricCard('FAIL', formatNumber(data.summary?.fail || 0), '', 'danger')}
      </div>
      <div class="stack">${Object.entries(groups).map(([category, items]) => `<div class="card"><h3>${escapeHtml(category)}</h3><div class="list">${items.map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.item)}</strong><span class="pill ${item.status === 'pass' ? 'success' : item.status === 'warn' ? 'warn' : 'danger'}">${escapeHtml(item.status)}</span></div><div>${escapeHtml(item.message)}</div>${item.fix ? `<div class="muted small">Fix: ${escapeHtml(item.fix)}</div>` : ''}</div>`).join('')}</div></div>`).join('')}</div>
    `;
    setPanel(t('tabs.audit'), t('desc.audit'), body);
  }

  async function loadProfiles() {
    const profiles = await apiRequest('/api/profiles');
    const body = profiles.length ? `<div class="grid">${profiles.map((profile) => `<div class="card"><div class="row" style="justify-content:space-between"><h3>${escapeHtml(profile.name)}</h3><span class="pill">${escapeHtml(profile.riskLevel || profile.key)}</span></div><p>${escapeHtml(profile.description || '')}</p><div class="list">${(profile.recommendations || []).map((item) => `<div class="list-item">${escapeHtml(item)}</div>`).join('')}</div><div class="toolbar tight" style="margin-top:12px;"><button class="action-btn primary" data-profile-key="${escapeHtml(profile.key)}">apply</button></div></div>`).join('')}</div>` : emptyState();
    setPanel(t('tabs.profiles'), t('desc.profiles'), body);
    document.querySelectorAll('[data-profile-key]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          const result = await postJson('/api/profiles/apply', { profile: button.getAttribute('data-profile-key') });
          showToast(result.message || 'OK');
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  async function loadHarden() {
    if (!state.hardenPlatform) {
      state.hardenPlatform = navigator.platform.toLowerCase().includes('win') ? 'windows' : navigator.platform.toLowerCase().includes('mac') ? 'macos' : 'linux';
    }
    const data = await apiRequest(`/api/harden/steps?platform=${encodeURIComponent(state.hardenPlatform)}`);
    const body = `
      <div class="toolbar tight">
        <button class="chip ${state.hardenPlatform === 'windows' ? 'active' : ''}" data-harden-platform="windows">Windows</button>
        <button class="chip ${state.hardenPlatform === 'macos' ? 'active' : ''}" data-harden-platform="macos">macOS</button>
        <button class="chip ${state.hardenPlatform === 'linux' ? 'active' : ''}" data-harden-platform="linux">Linux</button>
        <a class="action-btn primary" href="/api/harden/script?platform=${encodeURIComponent(state.hardenPlatform)}">${state.lang === 'zh' ? '下载脚本' : 'Download Script'}</a>
      </div>
      <div class="list">${(data.steps || []).map((step) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(step.title || step.id)}</strong><span class="pill">${escapeHtml(step.category || step.risk || 'step')}</span></div><div>${escapeHtml(step.description || '')}</div><pre>${escapeHtml((step.commands || []).join('\n'))}</pre></div>`).join('') || emptyState()}</div>
    `;
    setPanel(t('tabs.harden'), t('desc.harden'), body);
    document.querySelectorAll('[data-harden-platform]').forEach((button) => {
      button.addEventListener('click', () => {
        state.hardenPlatform = button.getAttribute('data-harden-platform');
        loadHarden();
      });
    });
  }

  async function loadLogs() {
    const [serviceLogs, missionLogs] = await Promise.all([
      apiRequest('/api/service/logs?lines=200').catch(() => ({ logs: [] })),
      apiRequest('/api/mission/logs?lines=200').catch(() => ({ logs: [] })),
    ]);
    const activeLogs = state.logsTarget === 'mission' ? missionLogs.logs || [] : serviceLogs.logs || [];
    const body = `
      <div class="toolbar tight">
        <button class="chip ${state.logsTarget === 'service' ? 'active' : ''}" data-logs-target="service">Gateway</button>
        <button class="chip ${state.logsTarget === 'mission' ? 'active' : ''}" data-logs-target="mission">Mission</button>
        <button class="action-btn" data-logs-action="reload">${escapeHtml(t('reload'))}</button>
      </div>
      <div class="card"><pre>${escapeHtml(activeLogs.join('\n'))}</pre></div>
    `;
    setPanel(t('tabs.logs'), t('desc.logs'), body);
    document.querySelectorAll('[data-logs-target]').forEach((button) => {
      button.addEventListener('click', () => {
        state.logsTarget = button.getAttribute('data-logs-target') || 'service';
        loadLogs();
      });
    });
    document.querySelector('[data-logs-action="reload"]')?.addEventListener('click', () => loadLogs());
  }

  async function loadActiveTab() {
    const active = state.activeTab || 'overview';
    const panel = document.getElementById('guard-panel');
    if (panel) panel.innerHTML = `<div class="empty">${escapeHtml(t('loading'))}</div>`;
    try {
      if (active === 'overview') return await loadOverview();
      if (active === 'system') return await loadSystem();
      if (active === 'openclaw') return await loadOpenClawTab();
      if (active === 'feishu') return await loadFeishu();
      if (active === 'channels') return await loadChannels();
      if (active === 'ai') return await loadAI();
      if (active === 'notifications') return await loadNotifications();
      if (active === 'agents') return await loadAgents();
      if (active === 'sessions') return await loadSessions();
      if (active === 'activity') return await loadActivity();
      if (active === 'files') return await loadFiles();
      if (active === 'memory') return await loadMemory();
      if (active === 'search') return await loadSearch();
      if (active === 'costs') return await loadCosts();
      if (active === 'cron') return await loadCron();
      if (active === 'git-sync') return await loadGitSync();
      if (active === 'mission') return await loadMission();
      if (active === 'audit') return await loadAudit();
      if (active === 'profiles') return await loadProfiles();
      if (active === 'harden') return await loadHarden();
      if (active === 'logs') return await loadLogs();
      return await loadOverview();
    } catch (error) {
      setPanel(t(`tabs.${active}`), t(`desc.${active}`), `<div class="status error">${escapeHtml(error.message || String(error))}</div><pre>${escapeHtml(error.stack || '')}</pre>`);
    }
  }

  const initialHash = (location.hash || '').replace(/^#/, '');
  state.activeTab = TAB_ORDER.includes(initialHash) ? initialHash : (localStorage.getItem(STORAGE_TAB) || 'overview');
  if (!TAB_ORDER.includes(state.activeTab)) state.activeTab = 'overview';
  renderShell();
  loadActiveTab();
  window.addEventListener('hashchange', () => {
    const next = (location.hash || '').replace(/^#/, '');
    if (TAB_ORDER.includes(next) && next !== state.activeTab) {
      setActiveTab(next, false);
    }
  });
})();
