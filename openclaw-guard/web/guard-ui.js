(function () {
  const app = document.getElementById('guard-app');
  if (!app) return;

  const shellConfig = window.__OPENCLAW_GUARD_UI__ || {};
  const STORAGE_LANG = 'openclaw-guard.lang';
  const STORAGE_TAB = 'openclaw-guard.active-tab';

  const I18N = {
    zh: {
      appTitle: '虾护卫',
      appSubtitle: '自带“防弹衣”与“复活甲”。内置多档安全预设，精准隔离越权风险；结合 Git 深度同步，让你的虾进可自由折腾，退可一键重生。',
      refresh: '刷新当前页',
      stopWeb: '一键停后台服务',
      openCompat: '\u6253\u5f00\u517c\u5bb9\u9875',
      openLegacy: '\u6253\u5f00\u65e7\u7248\u9875',
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
      openCompat: 'Open Compat Page',
      openLegacy: 'Open Legacy Page',
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
    aiSelectedProvider: '__new__',
    channelSelectedId: 'feishu',
    gitSyncDraftMessage: '',
    gitSyncPollTimer: null,
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

  const FIELD_LABELS = {
    appId: 'App ID',
    appSecret: 'App Secret',
    encryptKey: 'Encrypt Key',
    verificationToken: 'Verification Token',
    connectionMode: 'Connection Mode',
    webhookPath: 'Webhook Path',
    webhookHost: 'Webhook Host',
    webhookPort: 'Webhook Port',
    dmPolicy: 'DM Policy',
    groupPolicy: 'Group Policy',
    requireMention: 'Require Mention',
    streaming: 'Streaming',
    renderMode: 'Render Mode',
    whisperModel: 'Whisper Model',
    botToken: 'Bot Token',
    appToken: 'App Token',
    baseUrl: 'Base URL',
    apiType: 'API Type',
    apiKey: 'API Key',
    clientId: 'Client ID',
    clientSecret: 'Client Secret',
    remoteUrl: 'Remote URL',
    remoteName: 'Remote Name',
    redirectPort: 'Redirect Port',
  };

  const CHANNEL_SELECT_OPTIONS = {
    connectionMode: ['websocket', 'webhook'],
    dmPolicy: ['open', 'allowlist', 'closed'],
    groupPolicy: ['open', 'allowlist', 'closed'],
    renderMode: ['auto', 'rich', 'compact'],
  };

  const AI_API_TYPE_OPTIONS = ['openai-completions', 'anthropic-messages', 'openai-responses'];

  function humanizeFieldLabel(key) {
    const label = FIELD_LABELS[key] || key.replace(/^env:/, 'ENV ').replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  function isSensitiveField(key) {
    return /token|secret|password|apiKey|encryptKey|verificationToken|botToken|appToken/i.test(key);
  }

  function parseBooleanValue(value) {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
    }
    return Boolean(value);
  }

  function parseOptionalNumber(value) {
    if (value === '' || value === null || value === undefined) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  function renderFormField({ name, label, value = '', type = 'text', placeholder = '', options = [], help = '', fullWidth = false, checked = false }) {
    const widthClass = fullWidth ? ' field-span' : '';
    if (type === 'checkbox') {
      return `
        <div class="field${widthClass}">
          <label>${escapeHtml(label)}</label>
          <label class="checkbox-field">
            <input type="checkbox" name="${escapeHtml(name)}" ${checked ? 'checked' : ''}>
            <span>${escapeHtml(help || label)}</span>
          </label>
        </div>
      `;
    }
    if (type === 'select') {
      return `
        <div class="field${widthClass}">
          <label>${escapeHtml(label)}</label>
          <select name="${escapeHtml(name)}">
            ${options.map((option) => `<option value="${escapeHtml(option)}" ${String(value) === String(option) ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}
          </select>
          ${help ? `<div class="muted small">${escapeHtml(help)}</div>` : ''}
        </div>
      `;
    }
    if (type === 'textarea') {
      return `
        <div class="field${widthClass}">
          <label>${escapeHtml(label)}</label>
          <textarea name="${escapeHtml(name)}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value)}</textarea>
          ${help ? `<div class="muted small">${escapeHtml(help)}</div>` : ''}
        </div>
      `;
    }
    return `
      <div class="field${widthClass}">
        <label>${escapeHtml(label)}</label>
        <input type="${escapeHtml(type)}" name="${escapeHtml(name)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}">
        ${help ? `<div class="muted small">${escapeHtml(help)}</div>` : ''}
      </div>
    `;
  }

  function clearGitSyncPollTimer() {
    if (state.gitSyncPollTimer) {
      clearTimeout(state.gitSyncPollTimer);
      state.gitSyncPollTimer = null;
    }
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
          <div class="guard-header-inner">
            <div class="guard-header-top">
              <div class="guard-brand">
                <div class="guard-badge">
                  <img class="guard-badge-logo" src="/ui/logo.png" alt="OpenClaw Guard logo" />
                </div>
                <div class="guard-title">
                  <h1>${escapeHtml(t('appTitle'))}</h1>
                  <p>${escapeHtml(t('appSubtitle'))}</p>
                </div>
              </div>
              <div class="guard-actions">
                <div class="lang-switch">
                  <button type="button" data-lang="zh" class="${state.lang === 'zh' ? 'active' : ''}">\u4e2d\u6587</button>
                  <button type="button" data-lang="en" class="${state.lang === 'en' ? 'active' : ''}">EN</button>
                </div>
                <button class="action-btn" type="button" data-global-action="refresh">${escapeHtml(t('refresh'))}</button>
                <button class="action-btn" type="button" data-global-action="compat">${escapeHtml(t('openCompat'))}</button>
                <button class="action-btn" type="button" data-global-action="legacy">${escapeHtml(t('openLegacy'))}</button>
                <button class="action-btn danger" type="button" data-global-action="stop-web">${escapeHtml(t('stopWeb'))}</button>
              </div>
            </div>
            <div class="guard-tabs-wrap">
              <nav class="guard-tabs" id="guard-nav">
                ${TAB_ORDER.map((tabId) => `<button type="button" class="guard-tab ${tabId === active ? 'active' : ''}" data-tab="${tabId}">${escapeHtml(t(`tabs.${tabId}`))}</button>`).join('')}
              </nav>
            </div>
          </div>
        </header>
        <main class="guard-main">
          <div class="guard-main-inner">
            <div id="guard-panel"><div class="empty">${escapeHtml(t('loading'))}</div></div>
          </div>
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
    app.querySelector('[data-global-action="compat"]')?.addEventListener('click', () => {
      window.location.href = shellConfig.compatUrl || '/compat';
    });
    app.querySelector('[data-global-action="legacy"]')?.addEventListener('click', () => {
      window.location.href = shellConfig.legacyUrl || '/legacy';
    });
    app.querySelector('[data-global-action="stop-web"]')?.addEventListener('click', async () => {
      if (!confirm(state.lang === 'zh' ? '\u786e\u8ba4\u505c\u6b62\u5f53\u524d Guard Web \u670d\u52a1\uff1f' : 'Stop the current Guard Web service?')) return;
      try {
        const result = await postJson('/api/web-background/stop', {});
        showToast(result.message || (state.lang === 'zh' ? '\u505c\u6b62\u547d\u4ee4\u5df2\u53d1\u9001\u3002' : 'Stop command sent.'));
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

    const webCommandPort = webStatus.port || 18088;
    const startCommand = `cmd /c start "" /b node dist/index.js web --port ${webCommandPort}`;
    const statusCommand = 'npm run web:bg:status';
    const stopCommand = 'npm run web:bg:stop';

    const body = `
      <div class="grid">
        ${metricCard('Gateway', service.running ? 'RUNNING' : 'STOPPED', `PID ${service.pid || '-'}`, service.running ? 'success' : 'danger')}
        ${metricCard('Guard Web', webStatus.running ? 'RUNNING' : 'STOPPED', webStatus.running ? `PID ${webStatus.pid}` : '-', webStatus.running ? 'success' : 'warn')}
        ${metricCard('Node.js', info.nodeVersion || '-', info.arch || '-')}
        ${metricCard('OpenClaw', info.openclaw?.installed ? 'INSTALLED' : 'MISSING', info.openclaw?.version || '-')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '\u7cfb\u7edf\u4fe1\u606f' : 'System Info'}</h3>
          ${keyValueGrid([
            { label: state.lang === 'zh' ? '\u5e73\u53f0' : 'Platform', value: info.platform || '-' },
            { label: state.lang === 'zh' ? '\u7528\u6237' : 'User', value: info.user || '-' },
            { label: 'Home', value: info.home || '-' },
            { label: 'OpenClaw Dir', value: info.openclawDir || '-' },
          ])}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '\u540e\u53f0\u670d\u52a1\u63a7\u5236' : 'Background Service Controls'}</h3>
          <div class="toolbar">
            <button class="action-btn primary" type="button" data-service-action="start">${escapeHtml(t('start'))} Gateway</button>
            <button class="action-btn" type="button" data-service-action="restart">${escapeHtml(t('restart'))} Gateway</button>
            <button class="action-btn danger" type="button" data-service-action="stop">${escapeHtml(t('stop'))} Gateway</button>
            <button class="action-btn danger" type="button" data-service-action="stop-web">${escapeHtml(t('stopWeb'))}</button>
          </div>
          <div class="grid" style="margin-top:14px;">
            <div class="list-item">
              <div class="row" style="justify-content:space-between;">
                <strong>${state.lang === 'zh' ? '\u0057\u0065\u0062 \u8fdb\u7a0b\u6765\u6e90' : 'Guard Web Source'}</strong>
                <span class="pill ${webStatus.managed ? 'success' : 'warn'}">${escapeHtml(webStatus.source || '-')}</span>
              </div>
              <div class="muted small" style="margin-top:8px;">
                ${escapeHtml(webStatus.managed
                  ? (state.lang === 'zh' ? '\u5f53\u524d\u5b9e\u4f8b\u7531 Guard \u8bb0\u5f55\u4e3a\u53d7\u6258\u7ba1\u540e\u53f0\u8fdb\u7a0b\u3002' : 'This instance is tracked as a managed background process.')
                  : (state.lang === 'zh' ? '\u5f53\u524d\u5b9e\u4f8b\u662f\u901a\u8fc7\u7aef\u53e3\u626b\u63cf\u8bc6\u522b\u51fa\u6765\u7684\uff0c\u8bf4\u660e\u5b83\u4e0d\u662f\u7531 web:bg \u811a\u672c\u6258\u7ba1\u542f\u52a8\u3002' : 'This instance was detected via port scan, which means it was not started by the web:bg manager.'))}
              </div>
            </div>
            <div class="list-item">
              <div class="row" style="justify-content:space-between;">
                <strong>${state.lang === 'zh' ? '\u8fd0\u884c\u8bb0\u5f55\u6587\u4ef6' : 'Runtime Record File'}</strong>
                <span class="chip">${escapeHtml(webStatus.port || '-')}</span>
              </div>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(webStatus.pidFile || '-')}</div>
            </div>
          </div>
          <div class="sub-card" style="margin-top:14px;">
            <h3 style="margin-bottom:10px;">${state.lang === 'zh' ? '\u624b\u52a8\u547d\u4ee4\u53c2\u8003' : 'Manual Commands'}</h3>
            <div class="command-list">
              <code>${escapeHtml(statusCommand)}</code>
              <code>${escapeHtml(stopCommand)}</code>
              <code>${escapeHtml(startCommand)}</code>
            </div>
            <div class="muted small" style="margin-top:10px;">
              ${escapeHtml(state.lang === 'zh'
                ? '\u5f53\u540e\u53f0\u6258\u7ba1\u72b6\u6001\u548c\u5b9e\u9645\u7aef\u53e3\u4e0d\u4e00\u81f4\u65f6\uff0c\u5148\u770b status\uff0c\u518d\u51b3\u5b9a\u662f\u7528 stop \u505c\u6258\u7ba1\u5b9e\u4f8b\uff0c\u8fd8\u662f\u76f4\u63a5\u7ed3\u675f\u5f53\u524d\u7aef\u53e3\u4e0a\u7684\u65e7\u8fdb\u7a0b\u3002'
                : 'If the tracked background state and the actual listening port drift apart, check status first, then decide whether to use stop for the managed instance or terminate the stale port owner directly.')}
            </div>
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
    const [channels, channelDefs] = await Promise.all([
      apiRequest('/api/channels'),
      apiRequest('/api/channels/meta').catch(() => []),
    ]);

    const defs = Array.isArray(channelDefs) && channelDefs.length
      ? channelDefs
      : (channels || []).map((channel) => ({
          id: channel.id,
          name: channel.name,
          icon: channel.icon,
          fields: Object.keys(channel.config || {}).filter((key) => !key.startsWith('env:')),
          envFields: Object.keys(channel.config || {})
            .filter((key) => key.startsWith('env:'))
            .map((key) => key.slice(4)),
        }));
    const channelMap = Object.fromEntries((channels || []).map((channel) => [channel.id, channel]));
    const defMap = Object.fromEntries((defs || []).map((def) => [def.id, def]));

    if (!state.channelSelectedId || !defMap[state.channelSelectedId]) {
      state.channelSelectedId = defs[0]?.id || channels[0]?.id || 'feishu';
    }

    const selectedDef = defMap[state.channelSelectedId] || defs[0] || {
      id: 'feishu',
      name: 'Feishu / Lark',
      icon: '🪁',
      fields: [],
      envFields: [],
    };
    const selected = channelMap[selectedDef.id] || {
      id: selectedDef.id,
      name: selectedDef.name,
      icon: selectedDef.icon,
      enabled: false,
      configured: false,
      config: {},
    };
    const envKeys = Object.keys(selected.config || {}).filter((key) => key.startsWith('env:'));
    const configKeys = Object.keys(selected.config || {}).filter((key) => !key.startsWith('env:'));

    function renderChannelField(fieldName, fieldValue, kind = 'config') {
      const value = fieldValue ?? '';
      const label = kind === 'env'
        ? `${humanizeFieldLabel(fieldName)} (${fieldName})`
        : humanizeFieldLabel(fieldName);
      if (fieldName === 'enabled') {
        return renderFormField({
          name: fieldName,
          label,
          type: 'checkbox',
          checked: parseBooleanValue(value),
          help: state.lang === 'zh' ? '关闭后会保留配置，但运行态不会启用该渠道。' : 'Keep config but disable this channel at runtime.',
          fullWidth: true,
        });
      }
      if (['requireMention', 'streaming'].includes(fieldName)) {
        return renderFormField({
          name: fieldName,
          label,
          type: 'checkbox',
          checked: parseBooleanValue(value),
          help: state.lang === 'zh' ? '勾选即启用。' : 'Checked means enabled.',
        });
      }
      if (CHANNEL_SELECT_OPTIONS[fieldName]) {
        return renderFormField({
          name: fieldName,
          label,
          type: 'select',
          value: value || CHANNEL_SELECT_OPTIONS[fieldName][0],
          options: CHANNEL_SELECT_OPTIONS[fieldName],
        });
      }
      const isNumber = /port/i.test(fieldName);
      const inputType = kind === 'env' || isSensitiveField(fieldName)
        ? 'password'
        : isNumber
          ? 'number'
          : 'text';
      return renderFormField({
        name: kind === 'env' ? `env:${fieldName}` : fieldName,
        label,
        type: inputType,
        value,
        placeholder: kind === 'env'
          ? (state.lang === 'zh' ? '留空将清除该环境变量' : 'Leave blank to clear this env var')
          : '',
        help: kind === 'env'
          ? (state.lang === 'zh' ? '优先写入 .env / 环境变量。' : 'Stored via env file / environment variable.')
          : '',
      });
    }

    const editorFields = [
      renderChannelField('enabled', selected.enabled),
      ...selectedDef.fields.map((fieldName) => renderChannelField(fieldName, selected.config?.[fieldName])),
      ...selectedDef.envFields.map((fieldName) => renderChannelField(fieldName, selected.config?.[`env:${fieldName}`], 'env')),
    ].join('');

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '渠道总数' : 'Channels', formatNumber(defs.length), state.lang === 'zh' ? '当前可管理的消息入口' : 'configured channel surfaces')}
        ${metricCard(state.lang === 'zh' ? '已启用' : 'Enabled', formatNumber((channels || []).filter((item) => item.enabled).length), state.lang === 'zh' ? '运行态会接收消息' : 'receives traffic now')}
        ${metricCard(state.lang === 'zh' ? '已配置' : 'Configured', formatNumber((channels || []).filter((item) => item.configured).length), state.lang === 'zh' ? '已填入配置或 env' : 'config or env present')}
        ${metricCard(state.lang === 'zh' ? '当前选中' : 'Selected', selected.name || selected.id, selected.enabled ? (state.lang === 'zh' ? '已启用' : 'enabled') : (state.lang === 'zh' ? '停用中' : 'disabled'), selected.enabled ? 'success' : 'warn')}
      </div>
      <div class="two-col">
        <div class="card">
          <h3>${state.lang === 'zh' ? '渠道目录' : 'Channel Catalog'}</h3>
          <div class="split-list">
            ${defs.map((def) => {
              const info = channelMap[def.id] || { enabled: false, configured: false };
              return `
                <button type="button" class="${state.channelSelectedId === def.id ? 'active' : ''}" data-channel-select="${escapeHtml(def.id)}">
                  <strong>${escapeHtml(`${def.icon || ''} ${def.name || def.id}`.trim())}</strong>
                  <div class="row" style="margin-top:8px;">
                    <span class="pill ${info.enabled ? 'success' : 'warn'}">${escapeHtml(info.enabled ? (state.lang === 'zh' ? '已启用' : 'Enabled') : (state.lang === 'zh' ? '停用' : 'Disabled'))}</span>
                    <span class="pill ${info.configured ? 'success' : 'warn'}">${escapeHtml(info.configured ? (state.lang === 'zh' ? '已配置' : 'Configured') : (state.lang === 'zh' ? '未配置' : 'Empty'))}</span>
                  </div>
                </button>
              `;
            }).join('') || emptyState(state.lang === 'zh' ? '暂无渠道定义。' : 'No channel definitions.')}
          </div>
        </div>
        <div class="stack">
          <div class="card">
            <div class="row" style="justify-content:space-between; align-items:flex-start;">
              <div>
                <h3>${escapeHtml(selected.name || selected.id)}</h3>
                <p>${escapeHtml(selected.id)}</p>
              </div>
              <div class="tag-list">
                <span class="pill ${selected.enabled ? 'success' : 'warn'}">${escapeHtml(selected.enabled ? (state.lang === 'zh' ? '运行中' : 'enabled') : (state.lang === 'zh' ? '已停用' : 'disabled'))}</span>
                <span class="pill ${selected.configured ? 'success' : 'warn'}">${escapeHtml(selected.configured ? (state.lang === 'zh' ? '配置已落地' : 'configured') : (state.lang === 'zh' ? '尚未配置' : 'empty'))}</span>
              </div>
            </div>
            <div class="status ${selected.enabled ? '' : 'warn'}" style="margin-bottom:14px;">
              ${escapeHtml(selected.enabled
                ? (state.lang === 'zh' ? '保存后会直接更新当前渠道配置。' : 'Saving here updates the live channel config directly.')
                : (state.lang === 'zh' ? '当前处于停用状态，可以先补齐配置，再启用。' : 'This channel is disabled. Fill the form first, then enable it.'))}
            </div>
            <div class="form-grid" id="channel-config-form">
              ${editorFields || emptyState(state.lang === 'zh' ? '该渠道暂无可编辑字段。' : 'No editable fields for this channel.')}
            </div>
            <div class="toolbar tight" style="margin-top:14px;">
              <button class="action-btn primary" type="button" data-channel-action="save">${escapeHtml(t('save'))}</button>
              <button class="action-btn" type="button" data-channel-action="reload">${escapeHtml(t('reload'))}</button>
              <button class="action-btn danger" type="button" data-channel-action="clear">${state.lang === 'zh' ? '清空配置' : 'Clear Config'}</button>
            </div>
          </div>
          <div class="card">
            <h3>${state.lang === 'zh' ? '配置摘要' : 'Config Summary'}</h3>
            <div class="grid">
              ${metricCard(state.lang === 'zh' ? '普通字段' : 'Config Fields', formatNumber(configKeys.length), configKeys.join(', ') || '-')}
              ${metricCard(state.lang === 'zh' ? 'Env 字段' : 'Env Fields', formatNumber(envKeys.length), envKeys.join(', ') || '-')}
            </div>
            <pre style="margin-top:14px;">${prettyJson(selected.config || {})}</pre>
          </div>
        </div>
      </div>
    `;

    setPanel(t('tabs.channels'), t('desc.channels'), body);

    document.querySelectorAll('[data-channel-select]').forEach((button) => {
      button.addEventListener('click', () => {
        state.channelSelectedId = button.getAttribute('data-channel-select') || selected.id;
        loadChannels();
      });
    });

    document.querySelector('[data-channel-action="reload"]')?.addEventListener('click', () => loadChannels());
    document.querySelector('[data-channel-action="save"]')?.addEventListener('click', async () => {
      const payload = {};
      document.querySelectorAll('#channel-config-form [name]').forEach((element) => {
        if (element.type === 'checkbox') {
          payload[element.name] = element.checked;
          return;
        }
        if (element.type === 'number') {
          payload[element.name] = element.value.trim() ? Number(element.value) : '';
          return;
        }
        payload[element.name] = element.value.trim();
      });

      try {
        const result = await postJson(`/api/channels/${encodeURIComponent(selected.id)}`, payload);
        showToast(result.message || 'OK');
        loadChannels();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
    document.querySelector('[data-channel-action="clear"]')?.addEventListener('click', async () => {
      if (!confirm(state.lang === 'zh' ? `确认清空 ${selected.name || selected.id} 的配置？` : `Clear ${selected.name || selected.id} configuration?`)) return;
      try {
        const result = await apiRequest(`/api/channels/${encodeURIComponent(selected.id)}`, { method: 'DELETE' });
        showToast(result.message || 'OK');
        loadChannels();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
  }

  async function loadAI() {
    const [config, providerResponse] = await Promise.all([
      apiRequest('/api/ai/config'),
      apiRequest('/api/ai/providers'),
    ]);

    const configuredProviders = Array.isArray(config.providers) ? config.providers : [];
    const configuredProviderMap = Object.fromEntries(configuredProviders.map((provider) => [provider.name, provider]));
    const customProviders = Array.isArray(providerResponse.custom) ? providerResponse.custom : [];
    const customProviderMap = Object.fromEntries(customProviders.map((provider) => [provider.name, provider]));
    const presetProviders = Array.isArray(providerResponse.presets) ? providerResponse.presets : [];
    const presetProviderMap = Object.fromEntries(presetProviders.map((provider) => [provider.id, provider]));

    const pickerOptions = [
      { value: '__new__', label: state.lang === 'zh' ? '新建空白 Provider' : 'Create Blank Provider', kind: 'new' },
      ...configuredProviders.map((provider) => ({
        value: provider.name,
        label: `${provider.name} · ${state.lang === 'zh' ? '已配置' : 'configured'}`,
        kind: 'custom',
      })),
      ...presetProviders
        .filter((preset) => !configuredProviderMap[preset.id])
        .map((preset) => ({
          value: preset.id,
          label: `${preset.id} · ${state.lang === 'zh' ? '预设' : 'preset'}`,
          kind: 'preset',
        })),
    ];

    if (!pickerOptions.some((option) => option.value === state.aiSelectedProvider)) {
      state.aiSelectedProvider = pickerOptions[1]?.value || '__new__';
    }

    function formatProviderModels(models, defaultApiType) {
      return (models || []).map((model) => [
        model.id || '',
        model.name || model.id || '',
        model.contextWindow || '',
        model.maxTokens || '',
        model.api || defaultApiType || '',
      ].join('|')).join('\n');
    }

    function parseProviderModels(textValue, defaultApiType) {
      return String(textValue || '')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [id, name, contextWindow, maxTokens, api] = line.split('|').map((part) => part.trim());
          return {
            id,
            name: name || id,
            contextWindow: parseOptionalNumber(contextWindow),
            maxTokens: parseOptionalNumber(maxTokens),
            api: api || defaultApiType || undefined,
          };
        })
        .filter((model) => model.id);
    }

    function buildProviderDraft(selectionKey) {
      if (!selectionKey || selectionKey === '__new__') {
        return {
          kind: 'new',
          title: state.lang === 'zh' ? '新建 Provider' : 'Create Provider',
          canDelete: false,
          name: '',
          baseUrl: '',
          apiType: 'openai-completions',
          apiKey: '',
          apiKeyHelp: state.lang === 'zh' ? '保存后写入 openclaw.json。' : 'Saved to openclaw.json.',
          modelsText: '',
        };
      }
      if (customProviderMap[selectionKey]) {
        const raw = customProviderMap[selectionKey];
        const overview = configuredProviderMap[selectionKey] || {};
        return {
          kind: 'custom',
          title: state.lang === 'zh' ? '编辑已配置 Provider' : 'Edit Configured Provider',
          canDelete: true,
          name: selectionKey,
          baseUrl: raw.baseUrl || '',
          apiType: raw.apiType || raw.api || raw.models?.[0]?.api || 'openai-completions',
          apiKey: '',
          apiKeyHelp: overview.apiKeyMasked
            ? (state.lang === 'zh' ? `留空会保留现有密钥：${overview.apiKeyMasked}` : `Leave blank to keep existing key: ${overview.apiKeyMasked}`)
            : (state.lang === 'zh' ? '填写后会覆盖当前密钥。' : 'Filled value will replace the current key.'),
          modelsText: formatProviderModels(raw.models || [], raw.apiType || raw.api),
        };
      }
      const preset = presetProviderMap[selectionKey];
      if (preset) {
        return {
          kind: 'preset',
          title: state.lang === 'zh' ? '从预设带入 Provider' : 'Bootstrap Provider From Preset',
          canDelete: false,
          name: preset.id,
          baseUrl: preset.defaultBaseUrl || '',
          apiType: preset.apiType || 'openai-completions',
          apiKey: '',
          apiKeyHelp: preset.requiresApiKey
            ? (state.lang === 'zh' ? '保存前请填写 API Key。' : 'Fill in the API key before saving.')
            : (state.lang === 'zh' ? '该 Provider 通常不需要 API Key。' : 'This provider usually does not require an API key.'),
          modelsText: formatProviderModels(
            (preset.suggestedModels || []).map((model) => ({ id: model.id, name: model.name, api: preset.apiType })),
            preset.apiType,
          ),
        };
      }
      return {
        kind: 'new',
        title: state.lang === 'zh' ? '新建 Provider' : 'Create Provider',
        canDelete: false,
        name: '',
        baseUrl: '',
        apiType: 'openai-completions',
        apiKey: '',
        apiKeyHelp: state.lang === 'zh' ? '保存后写入 openclaw.json。' : 'Saved to openclaw.json.',
        modelsText: '',
      };
    }

    const providerDraft = buildProviderDraft(state.aiSelectedProvider);
    const providerSummaryHtml = configuredProviders.length
      ? configuredProviders.map((provider) => {
          const keyBadge = provider.hasApiKey
            ? `<span class="pill success">${escapeHtml(state.lang === 'zh' ? '已配置密钥' : 'key ready')}</span>`
            : `<span class="pill warn">${escapeHtml(state.lang === 'zh' ? '缺少密钥' : 'missing key')}</span>`;
          const apiBadge = provider.apiType ? `<span class="chip">${escapeHtml(provider.apiType)}</span>` : '';
          return `
            <div class="list-item">
              <div class="row" style="justify-content:space-between; align-items:flex-start;">
                <div>
                  <strong>${escapeHtml(provider.name)}</strong>
                  <div class="muted small">${escapeHtml(provider.baseUrl || '-')}</div>
                </div>
                <div class="tag-list">${keyBadge}${apiBadge}</div>
              </div>
              <div class="toolbar tight" style="margin-top:12px;">
                <button class="action-btn" type="button" data-ai-select-provider="${escapeHtml(provider.name)}">${state.lang === 'zh' ? '编辑这个 Provider' : 'Edit Provider'}</button>
              </div>
            </div>
          `;
        }).join('')
      : emptyState(state.lang === 'zh' ? '还没有 Provider，先从右侧创建一个。' : 'No provider yet. Create one from the editor.');

    const pickerOptionsHtml = pickerOptions.map((option) => `
      <button type="button" class="${state.aiSelectedProvider === option.value ? 'active' : ''}" data-ai-picker-select="${escapeHtml(option.value)}">
        <strong>${escapeHtml(option.label)}</strong>
        <div class="muted small">${escapeHtml(option.kind === 'custom'
          ? (state.lang === 'zh' ? '已写入配置' : 'already configured')
          : option.kind === 'preset'
            ? (state.lang === 'zh' ? '官方预设' : 'preset template')
            : (state.lang === 'zh' ? '空白模板' : 'blank template'))}</div>
      </button>
    `).join('');

    const quickActionsHtml = configuredProviders.length
      ? configuredProviders.map((provider) => {
          const modelsHtml = (provider.models || []).map((model) => {
            const badges = [
              model.isPrimary ? `<span class="pill success">${escapeHtml(state.lang === 'zh' ? '主模型' : 'primary')}</span>` : '',
              model.isFallback ? `<span class="pill warn">fallback</span>` : '',
              model.contextWindow ? `<span class="chip">ctx ${escapeHtml(formatNumber(model.contextWindow))}</span>` : '',
              model.maxTokens ? `<span class="chip">max ${escapeHtml(formatNumber(model.maxTokens))}</span>` : '',
            ].join('');
            const fallbackButton = model.isFallback
              ? `<button class="action-btn danger" type="button" data-ai-model-action="remove-fallback" data-model-id="${escapeHtml(model.fullId)}">${state.lang === 'zh' ? '移出 Fallback' : 'Remove Fallback'}</button>`
              : `<button class="action-btn" type="button" data-ai-model-action="add-fallback" data-model-id="${escapeHtml(model.fullId)}">${state.lang === 'zh' ? '加入 Fallback' : 'Add Fallback'}</button>`;
            return `
              <div class="sub-card">
                <div class="row" style="justify-content:space-between; align-items:flex-start;">
                  <div>
                    <strong>${escapeHtml(model.name || model.id)}</strong>
                    <div class="muted small">${escapeHtml(model.fullId)}</div>
                  </div>
                  <div class="tag-list">${badges}</div>
                </div>
                <div class="toolbar tight" style="margin-top:12px;">
                  <button class="action-btn" type="button" data-ai-model-action="primary" data-model-id="${escapeHtml(model.fullId)}">${state.lang === 'zh' ? '设为主模型' : 'Set Primary'}</button>
                  ${fallbackButton}
                </div>
              </div>
            `;
          }).join('');
          return `
            <div class="list-item">
              <div class="row" style="justify-content:space-between; align-items:flex-start;">
                <div>
                  <strong>${escapeHtml(provider.name)}</strong>
                  <div class="muted small">${escapeHtml(provider.baseUrl || '-')}</div>
                </div>
                <button class="action-btn" type="button" data-ai-select-provider="${escapeHtml(provider.name)}">${state.lang === 'zh' ? '编辑 Provider' : 'Edit Provider'}</button>
              </div>
              <div class="stack" style="margin-top:12px;">${modelsHtml}</div>
            </div>
          `;
        }).join('')
      : emptyState(state.lang === 'zh' ? '先创建 Provider，模型快捷操作才会出现。' : 'Create a provider first to unlock model quick actions.');

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '主模型' : 'Primary Model', config.primaryModel || '-', `${configuredProviders.length} ${state.lang === 'zh' ? '个 Provider' : 'providers'}`)}
        ${metricCard(state.lang === 'zh' ? 'Fallback 数量' : 'Fallback Count', formatNumber((config.fallbackModels || []).length), (config.fallbackModels || []).join(', ') || '-')}
        ${metricCard(state.lang === 'zh' ? '可选模型' : 'Available Models', formatNumber((config.availableModels || []).length), state.lang === 'zh' ? '允许直接用于主模型 / 回退链' : 'usable in primary / fallback routing')}
        ${metricCard(state.lang === 'zh' ? '已配置 Provider' : 'Configured Providers', formatNumber(configuredProviders.length), configuredProviders.map((item) => item.name).join(', ') || '-')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '主模型与回退链' : 'Primary Model & Fallback Chain'}</h3>
          ${renderFormField({
            name: 'primaryModel',
            label: state.lang === 'zh' ? '主模型 ID' : 'Primary Model ID',
            value: config.primaryModel || '',
            placeholder: 'openai-codex/gpt-5.3-codex',
            help: state.lang === 'zh' ? '可直接填完整 model id，也可通过下方快捷按钮写入。' : 'Use a full model id or fill it from the quick actions below.',
          })}
          ${renderFormField({
            name: 'fallbackModels',
            label: 'Fallbacks',
            type: 'textarea',
            value: (config.fallbackModels || []).join('\n'),
            placeholder: 'provider/model-a\nprovider/model-b',
            help: state.lang === 'zh' ? '一行一个模型，顺序即回退顺序。' : 'One model per line, in failover order.',
            fullWidth: true,
          })}
          <div class="toolbar tight" style="margin-top:14px;">
            <button class="action-btn primary" type="button" data-ai-action="save-routing">${state.lang === 'zh' ? '保存主模型与回退链' : 'Save Routing'}</button>
            <button class="action-btn" type="button" data-ai-action="clear-fallbacks">${state.lang === 'zh' ? '清空 Fallbacks' : 'Clear Fallbacks'}</button>
          </div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? 'Provider 速览' : 'Provider Snapshot'}</h3>
          <div class="list">${providerSummaryHtml}</div>
        </div>
      </div>
      <div class="two-col">
        <div class="card">
          <h3>${state.lang === 'zh' ? 'Provider 目录' : 'Provider Catalog'}</h3>
          <div class="split-list">${pickerOptionsHtml}</div>
        </div>
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div>
              <h3>${escapeHtml(providerDraft.title)}</h3>
              <p>${escapeHtml(providerDraft.kind === 'preset'
                ? (state.lang === 'zh' ? '先带入推荐参数，再补充 API Key 和模型细节。' : 'Start from preset defaults, then refine API key and models.')
                : providerDraft.kind === 'custom'
                  ? (state.lang === 'zh' ? '保存时会覆盖这个 Provider 的当前配置。' : 'Saving here replaces the current provider config.')
                  : (state.lang === 'zh' ? '用于新增一个可直接接入 OpenClaw 的 Provider。' : 'Create a new provider that OpenClaw can use immediately.'))}</p>
            </div>
            <div class="tag-list">
              <span class="pill ${providerDraft.kind === 'custom' ? 'success' : providerDraft.kind === 'preset' ? 'warn' : ''}">${escapeHtml(providerDraft.kind)}</span>
            </div>
          </div>
          <div class="toolbar tight" style="margin-bottom:12px;">
            <select id="ai-provider-picker">
              ${pickerOptions.map((option) => `<option value="${escapeHtml(option.value)}" ${option.value === state.aiSelectedProvider ? 'selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
            </select>
            <button class="action-btn" type="button" data-ai-action="load-selected-provider">${state.lang === 'zh' ? '载入到编辑器' : 'Load Into Editor'}</button>
            <button class="action-btn" type="button" data-ai-action="new-provider">${state.lang === 'zh' ? '新建空白' : 'Blank Provider'}</button>
          </div>
          <div class="form-grid" id="ai-provider-form">
            ${renderFormField({ name: 'name', label: state.lang === 'zh' ? 'Provider 名称' : 'Provider Name', value: providerDraft.name, placeholder: 'openai-codex / qwen / wenwen' })}
            ${renderFormField({ name: 'baseUrl', label: 'Base URL', value: providerDraft.baseUrl, placeholder: 'https://api.example.com/v1' })}
            ${renderFormField({ name: 'apiType', label: 'API Type', type: 'select', value: providerDraft.apiType, options: AI_API_TYPE_OPTIONS })}
            ${renderFormField({ name: 'apiKey', label: 'API Key', type: 'password', value: providerDraft.apiKey, placeholder: providerDraft.kind === 'custom' ? (state.lang === 'zh' ? '留空保留现有值' : 'Leave blank to keep existing key') : 'sk-xxx', help: providerDraft.apiKeyHelp, fullWidth: true })}
          </div>
          ${renderFormField({
            name: 'modelsText',
            label: state.lang === 'zh' ? '模型清单' : 'Model Rows',
            type: 'textarea',
            value: providerDraft.modelsText,
            placeholder: 'gpt-5.3-codex|GPT-5.3 Codex|128000|8192|openai-completions',
            help: state.lang === 'zh' ? '一行一个模型，格式：id|展示名|contextWindow|maxTokens|api。后两列可留空。' : 'One model per line: id|display name|contextWindow|maxTokens|api. The last two columns are optional.',
            fullWidth: true,
          })}
          <div class="toolbar tight" style="margin-top:14px;">
            <button class="action-btn primary" type="button" data-ai-action="save-provider">${state.lang === 'zh' ? '保存 Provider' : 'Save Provider'}</button>
            <button class="action-btn danger" type="button" data-ai-action="delete-provider" ${providerDraft.canDelete ? '' : 'disabled'}>${state.lang === 'zh' ? '删除 Provider' : 'Delete Provider'}</button>
          </div>
        </div>
      </div>
      <div class="card">
        <h3>${state.lang === 'zh' ? '模型快捷操作' : 'Model Quick Actions'}</h3>
        <div class="list">${quickActionsHtml}</div>
      </div>
    `;

    setPanel(t('tabs.ai'), t('desc.ai'), body);

    document.querySelectorAll('[data-ai-picker-select], [data-ai-select-provider]').forEach((button) => {
      button.addEventListener('click', () => {
        state.aiSelectedProvider = button.getAttribute('data-ai-picker-select') || button.getAttribute('data-ai-select-provider') || '__new__';
        loadAI();
      });
    });

    document.querySelector('[data-ai-action="load-selected-provider"]')?.addEventListener('click', () => {
      state.aiSelectedProvider = document.getElementById('ai-provider-picker')?.value || '__new__';
      loadAI();
    });

    document.querySelector('[data-ai-action="new-provider"]')?.addEventListener('click', () => {
      state.aiSelectedProvider = '__new__';
      loadAI();
    });

    document.querySelector('[data-ai-action="save-routing"]')?.addEventListener('click', async () => {
      const primaryInput = document.querySelector('[name="primaryModel"]');
      const fallbackInput = document.querySelector('[name="fallbackModels"]');
      const primaryModel = primaryInput ? primaryInput.value.trim() : '';
      const fallbackModels = fallbackInput
        ? fallbackInput.value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean)
        : [];
      try {
        const primaryResult = await postJson('/api/ai/primary', { modelId: primaryModel });
        const fallbackResult = await postJson('/api/ai/fallbacks', { modelIds: fallbackModels });
        showToast(fallbackResult.message || primaryResult.message || 'OK');
        loadAI();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });

    document.querySelector('[data-ai-action="clear-fallbacks"]')?.addEventListener('click', async () => {
      try {
        const result = await postJson('/api/ai/fallbacks', { modelIds: [] });
        showToast(result.message || 'OK');
        loadAI();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });

    document.querySelector('[data-ai-action="save-provider"]')?.addEventListener('click', async () => {
      const form = document.getElementById('ai-provider-form');
      const payload = {};
      form?.querySelectorAll('[name]').forEach((element) => {
        payload[element.name] = element.value.trim();
      });
      payload.models = parseProviderModels(document.querySelector('[name="modelsText"]')?.value || '', payload.apiType);

      if (!payload.name) {
        showToast(state.lang === 'zh' ? '请先填写 Provider 名称。' : 'Provider name is required.', 'error');
        return;
      }
      if (!payload.baseUrl) {
        showToast(state.lang === 'zh' ? '请先填写 Base URL。' : 'Base URL is required.', 'error');
        return;
      }
      if (!payload.models.length) {
        showToast(state.lang === 'zh' ? '请至少填写一个模型。' : 'At least one model is required.', 'error');
        return;
      }

      try {
        const result = await postJson('/api/ai/provider', payload);
        state.aiSelectedProvider = payload.name;
        showToast(result.message || 'OK');
        loadAI();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });

    document.querySelector('[data-ai-action="delete-provider"]')?.addEventListener('click', async () => {
      if (!providerDraft.canDelete) return;
      if (!confirm(state.lang === 'zh' ? `确认删除 Provider ${providerDraft.name}？` : `Delete provider ${providerDraft.name}?`)) return;
      try {
        const result = await apiRequest(`/api/ai/provider/${encodeURIComponent(providerDraft.name)}`, { method: 'DELETE' });
        state.aiSelectedProvider = '__new__';
        showToast(result.message || 'OK');
        loadAI();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });

    document.querySelectorAll('[data-ai-model-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-ai-model-action');
        const modelId = button.getAttribute('data-model-id') || '';
        try {
          if (action === 'primary') {
            const result = await postJson('/api/ai/primary', { modelId });
            showToast(result.message || 'OK');
            loadAI();
            return;
          }
          const nextFallbacks = new Set(config.fallbackModels || []);
          if (action === 'add-fallback') nextFallbacks.add(modelId);
          if (action === 'remove-fallback') nextFallbacks.delete(modelId);
          const result = await postJson('/api/ai/fallbacks', { modelIds: Array.from(nextFallbacks) });
          showToast(result.message || 'OK');
          loadAI();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
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

﻿  async function loadGitSync() {
    clearGitSyncPollTimer();
    const status = await apiRequest('/api/git-sync/status');
    const oauth = status.oauth || {};

    if (!state.gitSyncDraftMessage) {
      state.gitSyncDraftMessage = '';
    }

    const stages = [
      {
        label: state.lang === 'zh' ? '仓库初始化' : 'Repository',
        ok: !!status.repoInitialized,
        detail: status.repoInitialized ? (status.repoPath || '-') : (state.lang === 'zh' ? '尚未 git init' : 'git init required'),
      },
      {
        label: state.lang === 'zh' ? '远程绑定' : 'Remote',
        ok: !!status.remoteUrl,
        detail: status.remoteUrl || (state.lang === 'zh' ? '未绑定远程仓库' : 'No remote connected'),
      },
      {
        label: state.lang === 'zh' ? '认证配置' : 'Authentication',
        ok: !!status.authConfigured,
        detail: status.authConfigured ? (status.authMode || 'token') : (state.lang === 'zh' ? '尚未配置 Token / OAuth' : 'Token or OAuth required'),
      },
      {
        label: state.lang === 'zh' ? '私有仓校验' : 'Private Check',
        ok: status.repoPrivate === true,
        detail: status.repoPrivate === true
          ? (state.lang === 'zh' ? '已确认 private' : 'private confirmed')
          : status.repoPrivate === false
            ? (state.lang === 'zh' ? '检测到 public 仓库' : 'public repo detected')
            : (state.lang === 'zh' ? '尚未检查' : 'not checked yet'),
      },
      {
        label: state.lang === 'zh' ? '同步就绪' : 'Ready To Sync',
        ok: !!status.canSync,
        detail: status.canSync
          ? (state.lang === 'zh' ? '可以直接提交并推送' : 'ready for commit and push')
          : (state.lang === 'zh' ? '仍有阻断项' : 'blocked by pending issues'),
      },
    ];

    const oauthStatusClass = oauth.phase === 'error'
      ? 'error'
      : oauth.phase === 'success'
        ? ''
        : oauth.phase === 'authorizing'
          ? 'warn'
          : '';
    const oauthStatusMessage = oauth.phase === 'authorizing'
      ? (state.lang === 'zh' ? '授权进行中，请在浏览器完成登录，然后此页面会自动刷新状态。' : 'Authorization in progress. Finish the browser login and this page will refresh automatically.')
      : oauth.phase === 'success'
        ? (oauth.message || (state.lang === 'zh' ? 'OAuth 已完成。' : 'OAuth completed.'))
        : oauth.phase === 'error'
          ? (oauth.error || oauth.message || (state.lang === 'zh' ? 'OAuth 失败。' : 'OAuth failed.'))
          : (state.lang === 'zh' ? '如需浏览器授权，可在这里配置 Client ID / Secret。' : 'Configure Client ID / Secret here if you prefer browser OAuth.');
    const blockingReasonsHtml = status.reasons?.length
      ? status.reasons.map((reason) => `<div class="list-item"><div>${escapeHtml(reason)}</div></div>`).join('')
      : `<div class="status">${escapeHtml(state.lang === 'zh' ? '当前没有阻断项，可以继续执行同步。' : 'No blockers detected. You can continue with sync.')}</div>`;
    const stageHtml = stages.map((stage) => `
      <div class="list-item">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <strong>${escapeHtml(stage.label)}</strong>
          <span class="pill ${stage.ok ? 'success' : 'warn'}">${escapeHtml(stage.ok ? (state.lang === 'zh' ? '已完成' : 'ready') : (state.lang === 'zh' ? '待处理' : 'pending'))}</span>
        </div>
        <div class="muted small">${escapeHtml(stage.detail)}</div>
      </div>
    `).join('');
    const changedFilesHtml = (status.changedFiles || []).length
      ? status.changedFiles.map((file) => `
          <div class="list-item">
            <div class="row" style="justify-content:space-between;">
              <strong>${escapeHtml(file)}</strong>
              <span class="muted small">${escapeHtml(status.currentBranch || '-')}</span>
            </div>
          </div>
        `).join('')
      : emptyState(state.lang === 'zh' ? '当前没有待同步变更。' : 'No local changes to sync.');

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '仓库状态' : 'Repository', status.repoInitialized ? 'READY' : 'MISSING', status.repoPath || '-', status.repoInitialized ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '远程仓库' : 'Remote', status.remoteUrl || '-', status.provider || '-', status.remoteUrl ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '认证' : 'Auth', status.authConfigured ? (status.authMode || 'configured') : 'missing', status.authConfigured ? (state.lang === 'zh' ? '认证已配置' : 'credentials ready') : (state.lang === 'zh' ? '尚未配置' : 'not configured'), status.authConfigured ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '本地变更' : 'Changes', formatNumber((status.changedFiles || []).length), status.currentBranch || '-', (status.changedFiles || []).length > 0 ? 'warn' : 'success')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '同步准备度' : 'Sync Readiness'}</h3>
          <div class="list">${stageHtml}</div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '当前阻断项' : 'Blocking Reasons'}</h3>
          ${blockingReasonsHtml}
          <div class="stack" style="margin-top:14px;">
            <div class="list-item"><strong>${state.lang === 'zh' ? '最近校验' : 'Last Check'}</strong><div class="muted small">${escapeHtml(formatDate(status.state?.lastCheckedAt))}</div></div>
            <div class="list-item"><strong>${state.lang === 'zh' ? '最近提交' : 'Last Commit'}</strong><div class="muted small">${escapeHtml(formatDate(status.state?.lastCommitAt))}</div></div>
            <div class="list-item"><strong>${state.lang === 'zh' ? '最近推送' : 'Last Push'}</strong><div class="muted small">${escapeHtml(formatDate(status.state?.lastSyncAt))}</div></div>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '初始化与远程绑定' : 'Init & Remote Bind'}</h3>
          <div class="toolbar tight" style="margin-bottom:12px;">
            <button class="action-btn" type="button" data-git-action="init">git init</button>
            <button class="action-btn" type="button" data-git-action="check">${state.lang === 'zh' ? '检查 private' : 'Check Private'}</button>
            <button class="action-btn" type="button" data-git-action="refresh-status">${escapeHtml(t('reload'))}</button>
          </div>
          <div class="form-grid" id="git-connect-form">
            ${renderFormField({ name: 'provider', label: 'Provider', type: 'select', value: status.provider || status.state?.provider || 'github', options: ['github', 'gitee'] })}
            ${renderFormField({ name: 'remoteName', label: 'Remote Name', value: status.remoteName || 'origin' })}
            ${renderFormField({ name: 'remoteUrl', label: 'Remote URL', value: status.remoteUrl || '', placeholder: 'https://github.com/owner/private-repo.git', fullWidth: true, help: state.lang === 'zh' ? '只支持 GitHub / Gitee，且后续会强制校验 private。' : 'GitHub / Gitee only. Guard will block public repositories.' })}
          </div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn primary" type="button" data-git-action="connect">${state.lang === 'zh' ? '绑定远程仓库' : 'Connect Remote'}</button>
          </div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? 'HTTPS Token 认证' : 'HTTPS Token Auth'}</h3>
          <div class="form-grid" id="git-token-form">
            ${renderFormField({ name: 'provider', label: 'Provider', type: 'select', value: status.provider || status.state?.provider || 'github', options: ['github', 'gitee'] })}
            ${renderFormField({ name: 'username', label: state.lang === 'zh' ? '用户名 / 账号' : 'Username', value: status.state?.username || '', placeholder: 'optional-user' })}
            ${renderFormField({ name: 'token', label: 'Token', type: 'password', value: '', placeholder: 'ghp_xxx / gitee token', fullWidth: true, help: state.lang === 'zh' ? '这里不会回显已保存的 Token；需要更新时请重新粘贴。' : 'Saved token is never echoed here; paste again to update it.' })}
          </div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn primary" type="button" data-git-action="token">${state.lang === 'zh' ? '保存 Token' : 'Save Token'}</button>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>OAuth</h3>
          <div class="status ${oauthStatusClass}">${escapeHtml(oauthStatusMessage)}</div>
          <div class="form-grid" id="git-oauth-form" style="margin-top:14px;">
            ${renderFormField({ name: 'provider', label: 'Provider', type: 'select', value: oauth.provider || status.provider || status.state?.provider || 'github', options: ['github', 'gitee'] })}
            ${renderFormField({ name: 'redirectPort', label: 'Redirect Port', value: '43189', type: 'number' })}
            ${renderFormField({ name: 'scope', label: 'Scope', value: 'repo read:user' })}
            ${renderFormField({ name: 'clientId', label: 'Client ID', value: '' })}
            ${renderFormField({ name: 'clientSecret', label: 'Client Secret', type: 'password', value: '', fullWidth: true })}
          </div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn" type="button" data-git-action="oauth">${state.lang === 'zh' ? '启动 OAuth' : 'Start OAuth'}</button>
            <button class="action-btn" type="button" data-git-action="copy-oauth" ${oauth.authorizeUrl ? '' : 'disabled'}>${state.lang === 'zh' ? '复制授权地址' : 'Copy Auth URL'}</button>
          </div>
          <pre style="margin-top:12px;">${prettyJson(oauth)}</pre>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '提交与推送' : 'Commit & Push'}</h3>
          ${renderFormField({
            name: 'gitCommitMessage',
            label: state.lang === 'zh' ? '提交说明' : 'Commit Message',
            value: state.gitSyncDraftMessage,
            placeholder: state.lang === 'zh' ? '留空则使用默认中文提交说明' : 'Leave blank to use the default Chinese commit message',
            help: state.lang === 'zh' ? '建议写成中文变更摘要，例如：同步 .openclaw 配置与记忆。' : 'A short Chinese summary is recommended for consistency.',
            fullWidth: true,
          })}
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn" type="button" data-git-action="commit">commit</button>
            <button class="action-btn" type="button" data-git-action="push">push</button>
            <button class="action-btn primary" type="button" data-git-action="sync">sync</button>
          </div>
          <div class="list" style="margin-top:12px;">${changedFilesHtml}</div>
        </div>
      </div>
    `;

    setPanel(t('tabs.git-sync'), t('desc.git-sync'), body);

    document.querySelectorAll('[data-git-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-git-action');
        try {
          if (action === 'refresh-status') {
            loadGitSync();
            return;
          }
          if (action === 'init' || action === 'check' || action === 'push') {
            const result = await postJson(`/api/git-sync/${action === 'check' ? 'check-private' : action}`, {});
            showToast(result.message || 'OK');
            loadGitSync();
            return;
          }
          if (action === 'connect') {
            const form = document.getElementById('git-connect-form');
            const payload = {};
            form?.querySelectorAll('[name]').forEach((element) => {
              payload[element.name] = element.value.trim();
            });
            if (!payload.remoteUrl) {
              showToast(state.lang === 'zh' ? '请先填写远程仓库地址。' : 'Remote URL is required.', 'error');
              return;
            }
            const result = await postJson('/api/git-sync/connect', payload);
            showToast(result.message || 'OK');
            loadGitSync();
            return;
          }
          if (action === 'token') {
            const form = document.getElementById('git-token-form');
            const payload = {};
            form?.querySelectorAll('[name]').forEach((element) => {
              payload[element.name] = element.value.trim();
            });
            if (!payload.token) {
              showToast(state.lang === 'zh' ? '请先粘贴 Token。' : 'Token is required.', 'error');
              return;
            }
            const result = await postJson('/api/git-sync/auth/token', payload);
            showToast(result.message || 'OK');
            loadGitSync();
            return;
          }
          if (action === 'oauth') {
            const form = document.getElementById('git-oauth-form');
            const payload = {};
            form?.querySelectorAll('[name]').forEach((element) => {
              payload[element.name] = element.value.trim();
            });
            payload.redirectPort = Number(payload.redirectPort || 43189);
            if (!payload.clientId || !payload.clientSecret) {
              showToast(state.lang === 'zh' ? '请先填写 Client ID 和 Client Secret。' : 'Client ID and Client Secret are required.', 'error');
              return;
            }
            const result = await postJson('/api/git-sync/auth/oauth', payload);
            showToast(result.message || 'OK');
            if (result.output) {
              try {
                window.open(result.output, '_blank');
              } catch {
                // noop
              }
            }
            loadGitSync();
            return;
          }
          if (action === 'copy-oauth') {
            if (!oauth.authorizeUrl) {
              showToast(state.lang === 'zh' ? '当前没有可复制的授权地址。' : 'No authorization URL available.', 'error');
              return;
            }
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(oauth.authorizeUrl);
              showToast(state.lang === 'zh' ? '授权地址已复制。' : 'Authorization URL copied.');
            } else {
              window.prompt(state.lang === 'zh' ? '请手动复制下面的授权地址' : 'Copy the authorization URL below', oauth.authorizeUrl);
            }
            return;
          }
          if (action === 'commit' || action === 'sync') {
            const message = document.querySelector('[name="gitCommitMessage"]')?.value.trim() || '';
            state.gitSyncDraftMessage = message;
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

    document.querySelector('[name="gitCommitMessage"]')?.addEventListener('input', (event) => {
      state.gitSyncDraftMessage = event.target.value;
    });

    if (oauth.phase === 'authorizing' && state.activeTab === 'git-sync') {
      state.gitSyncPollTimer = setTimeout(() => {
        if (state.activeTab === 'git-sync') {
          loadGitSync();
        }
      }, 3000);
    }
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
    if (active !== 'git-sync') clearGitSyncPollTimer();
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

