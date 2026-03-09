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
        audit: '统一查看安全审计结果和风险分类。',
        profiles: '应用 Guard 的安全 Profile 预设。',
        harden: '生成对应平台的加固步骤和脚本。',
        logs: '查看 Gateway 日志输出。'
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
        audit: 'Grouped security audit results and risk categories.',
        profiles: 'Apply Guard security profiles.',
        harden: 'Generate platform-specific hardening steps and scripts.',
        logs: 'Inspect Gateway logs.'
      }
    }
  };

  const TAB_ORDER = [
    'overview', 'system', 'openclaw', 'feishu', 'channels', 'ai', 'notifications',
    'agents', 'sessions', 'activity', 'files', 'memory', 'search', 'costs',
    'cron', 'git-sync', 'audit', 'profiles', 'harden', 'logs'
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
    notificationSource: 'all',
    notificationSearchQuery: '',
    hardenPlatform: null,
    logsTarget: 'service',
    currentViewData: null,
    aiSelectedProvider: '__new__',
    channelSelectedId: 'feishu',
    cronFilter: 'all',
    cronSearchQuery: '',
    cronLastAction: null,
    cronEditorMode: 'create',
    cronEditingJobId: null,
    cronDraft: null,
    gitSyncDraftMessage: '',
    gitSyncIgnoreMode: 'smart',
    gitSyncLastAction: null,
    gitSyncPollTimer: null,
    pendingPanelFocus: null,
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

  function queuePanelFocus(tabId, selector) {
    state.pendingPanelFocus = {
      tabId,
      selector,
      at: Date.now(),
    };
  }

  function applyPendingPanelFocus(tabId) {
    const pending = state.pendingPanelFocus;
    if (!pending || pending.tabId !== tabId) return;
    state.pendingPanelFocus = null;
    setTimeout(() => {
      const target = document.querySelector(pending.selector);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('panel-highlight');
      setTimeout(() => target.classList.remove('panel-highlight'), 1800);
    }, 80);
  }

  function metricCard(title, value, detail, pillClass = '') {
    return `<div class="card"><div class="row" style="justify-content:space-between"><h3>${escapeHtml(title)}</h3>${pillClass ? `<span class="pill ${pillClass}">${escapeHtml(detail || '')}</span>` : ''}</div><div class="metric">${escapeHtml(value)}</div>${pillClass ? '' : `<p>${escapeHtml(detail || '')}</p>`}</div>`;
  }

  function normalizeRepoPath(value) {
    return String(value || '')
      .trim()
      .replace(/\\/g, '/')
      .replace(/^\.\//, '')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '');
  }

  function uniqueItems(values) {
    return Array.from(new Set((values || []).filter(Boolean)));
  }

  function buildGitIgnoreTemplate(paths) {
    const normalizedPaths = uniqueItems((paths || []).map((item) => normalizeRepoPath(item)).filter(Boolean));
    const lines = [
      '# Nested Git repositories managed outside the root .openclaw sync',
    ];
    normalizedPaths.forEach((item) => lines.push(`${item}/`));
    if (normalizedPaths.some((item) => /^workspace-[^/]+$/i.test(item))) {
      lines.push('');
      lines.push('# Optional wildcard for workspace-level child repositories');
      lines.push('workspace-*/');
    }
    if (normalizedPaths.some((item) => /^extensions\/[^/]+$/i.test(item))) {
      lines.push('');
      lines.push('# Optional wildcard for extension repositories');
      lines.push('extensions/*/');
    }
    if (normalizedPaths.some((item) => /^skills\/[^/]+$/i.test(item))) {
      lines.push('');
      lines.push('# Optional wildcard for skill repositories');
      lines.push('skills/*/');
    }
    return lines.join('\n').trim();
  }

  function buildEmbeddedRepoGuide(paths) {
    const normalizedPaths = uniqueItems((paths || []).map((item) => normalizeRepoPath(item)).filter(Boolean));
    const pathList = normalizedPaths.length ? normalizedPaths.map((item) => `- ${item}/`).join('\n') : '- (none)';
    const ignoreTemplate = buildGitIgnoreTemplate(normalizedPaths);
    return [
      state.lang === 'zh' ? 'OpenClaw Guard 嵌套仓库处理建议' : 'OpenClaw Guard Embedded Repository Guide',
      '',
      state.lang === 'zh' ? '当前检测到的嵌套仓库：' : 'Detected embedded repositories:',
      pathList,
      '',
      state.lang === 'zh' ? '方案 1：继续把子目录当成独立仓库维护' : 'Option 1: Keep the child directory as an independent repository',
      state.lang === 'zh' ? '把这些路径加入外层 .gitignore，避免 Git Sync 反复把它们当成未同步改动。' : 'Add these paths to the root .gitignore so Git Sync stops surfacing them as pending changes.',
      '',
      ignoreTemplate,
      '',
      state.lang === 'zh' ? '方案 2：需要并入主仓' : 'Option 2: Flatten into the root repository',
      state.lang === 'zh' ? '删除子目录里的 .git 后，再回到外层仓库重新 add / commit。' : 'Remove the child .git directory first, then add and commit from the root repository.',
      '',
      state.lang === 'zh' ? '方案 3：继续单独同步' : 'Option 3: Sync separately',
      state.lang === 'zh' ? '保留子仓库不动，但请在对应子目录里单独执行它自己的 Git 提交与推送。' : 'Leave the child repository intact and commit/push from inside that child directory.',
    ].join('\n');
  }

  function keyValueGrid(items) {
    return `<div class="stack">${items.map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.label)}</strong><span class="muted">${escapeHtml(item.value)}</span></div>${item.help ? `<div class="muted small">${escapeHtml(item.help)}</div>` : ''}</div>`).join('')}</div>`;
  }

  function emptyState(message) {
    return `<div class="empty">${escapeHtml(message || t('noData'))}</div>`;
  }

  async function copyTextValue(text, options = {}) {
    const value = text === null || text === undefined ? '' : String(text);
    if (!value.trim()) {
      showToast(options.emptyMessage || (state.lang === 'zh' ? '当前没有可复制的内容。' : 'Nothing to copy.'), 'error');
      return false;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        showToast(options.successMessage || (state.lang === 'zh' ? '内容已复制到剪贴板。' : 'Copied to clipboard.'));
        return true;
      }
    } catch {
      // Fallback to prompt below.
    }

    window.prompt(options.promptLabel || (state.lang === 'zh' ? '请手动复制以下内容' : 'Copy the value below'), value);
    return true;
  }

  function matchesTextQuery(fields, query) {
    const normalized = String(query || '').trim().toLowerCase();
    if (!normalized) return true;
    const haystack = fields
      .map((item) => (item === null || item === undefined ? '' : String(item)))
      .join(' ')
      .toLowerCase();
    return normalized.split(/\s+/).every((keyword) => haystack.includes(keyword));
  }

  function renderActionFeedback(title, entry, emptyMessage = '') {
    if (!entry) {
      return emptyMessage ? `<div class="status">${escapeHtml(emptyMessage)}</div>` : '';
    }

    const detailText = entry.detail
      ? (typeof entry.detail === 'string' ? entry.detail : JSON.stringify(entry.detail, null, 2))
      : '';
    const statusClass = entry.type === 'error' ? 'error' : entry.type === 'warn' ? 'warn' : '';
    const statusLabel = entry.type === 'error'
      ? (state.lang === 'zh' ? '失败' : 'Failed')
      : entry.type === 'warn'
        ? (state.lang === 'zh' ? '警告' : 'Warning')
        : (state.lang === 'zh' ? '成功' : 'Success');

    return `
      <div class="card">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <h3>${escapeHtml(title)}</h3>
          <span class="pill ${statusClass || 'success'}">${escapeHtml(statusLabel)}</span>
        </div>
        <div>${escapeHtml(entry.message || '-')}</div>
        <div class="muted small" style="margin-top:8px;">${escapeHtml(formatDate(entry.at))}</div>
        ${detailText ? `<pre style="margin-top:12px;">${escapeHtml(detailText)}</pre>` : ''}
      </div>
    `;
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

  function getDefaultCronDraft() {
    return {
      name: '',
      description: '',
      agentId: '',
      prompt: '',
      scheduleMode: 'cron',
      scheduleValue: '0 9 * * *',
      enabled: true,
      timezone: '',
      model: '',
      thinking: '',
      session: 'main',
      wake: 'now',
      timeoutMs: '',
      timeoutSeconds: '30',
      stagger: '',
      announce: false,
      bestEffortDeliver: false,
      deleteAfterRun: false,
    };
  }

  function formatDurationInput(ms) {
    const value = Number(ms);
    if (!Number.isFinite(value) || value <= 0) return '';
    if (value % 86_400_000 === 0) return `${value / 86_400_000}d`;
    if (value % 3_600_000 === 0) return `${value / 3_600_000}h`;
    if (value % 60_000 === 0) return `${value / 60_000}m`;
    if (value % 1000 === 0) return `${value / 1000}s`;
    return String(value);
  }

  function buildCronDraftFromJob(job) {
    const raw = job?.raw || {};
    const payload = raw.payload || {};
    const schedule = raw.schedule || {};
    const draft = getDefaultCronDraft();

    if (schedule && typeof schedule === 'object') {
      if (schedule.kind === 'every') {
        draft.scheduleMode = 'every';
        draft.scheduleValue = formatDurationInput(schedule.everyMs) || '';
      } else if (schedule.kind === 'at') {
        draft.scheduleMode = 'at';
        draft.scheduleValue = schedule.at || '';
      } else if (schedule.kind === 'cron') {
        draft.scheduleMode = 'cron';
        draft.scheduleValue = schedule.expr || '';
      }
      draft.stagger = formatDurationInput(schedule.staggerMs) || '';
    }

    if (!draft.scheduleValue && typeof job?.schedule === 'string') {
      if (job.schedule.startsWith('cron ')) {
        draft.scheduleMode = 'cron';
        draft.scheduleValue = job.schedule.slice(5).trim();
      } else if (job.schedule.startsWith('every ')) {
        draft.scheduleMode = 'every';
        draft.scheduleValue = job.schedule.slice(6).trim();
      } else if (job.schedule.startsWith('at ')) {
        draft.scheduleMode = 'at';
        draft.scheduleValue = job.schedule.slice(3).trim();
      } else {
        draft.scheduleValue = job.schedule.trim();
      }
    }

    draft.name = raw.name || job?.name || '';
    draft.description = raw.description || '';
    draft.agentId = raw.agentId || job?.agentId || '';
    draft.prompt = payload.message || payload.text || raw.message || job?.prompt || '';
    draft.enabled = job?.enabled !== false;
    draft.timezone = raw.tz || '';
    draft.model = raw.model || payload.model || '';
    draft.thinking = raw.thinking || payload.thinking || '';
    draft.session = raw.session || payload.session || draft.session;
    draft.wake = raw.wake || draft.wake;
    draft.timeoutMs = raw.timeout ? String(raw.timeout) : '';
    draft.timeoutSeconds = raw.timeoutSeconds ? String(raw.timeoutSeconds) : draft.timeoutSeconds;
    draft.announce = raw.announce === true || raw.deliver === true;
    draft.bestEffortDeliver = raw.bestEffortDeliver === true;
    draft.deleteAfterRun = raw.deleteAfterRun === true;

    return draft;
  }

  function syncCronDraftFromForm() {
    const form = document.getElementById('cron-editor-form');
    if (!form) return state.cronDraft || getDefaultCronDraft();
    const next = getDefaultCronDraft();
    form.querySelectorAll('[name]').forEach((element) => {
      if (element.type === 'checkbox') {
        next[element.name] = !!element.checked;
      } else {
        next[element.name] = element.value;
      }
    });
    state.cronDraft = next;
    return next;
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

    const currentPid = Number(info.pid || 0);
    const isCurrentInstance = !!(webStatus.running && webStatus.pid && currentPid && webStatus.pid === currentPid);
    const isCurrentManaged = isCurrentInstance && webStatus.managed;
    const isOtherProcess = !!(webStatus.running && webStatus.pid && !isCurrentInstance);

    let webPrimaryLabel = state.lang === 'zh' ? '后台启动 Guard Web' : 'Start Guard Web in Background';
    let webPrimaryHint = state.lang === 'zh'
      ? '当前端口没有 Guard Web 监听时，会以 detached 模式直接在后台拉起。'
      : 'When no Guard Web process is listening on this port, Guard will start one in detached mode.';
    let webPrimaryDisabled = false;

    if (isCurrentManaged) {
      webPrimaryLabel = state.lang === 'zh' ? '当前实例已托管' : 'Current Instance Managed';
      webPrimaryHint = state.lang === 'zh'
        ? '当前页面就是 Guard 托管实例，不需要重复纳入。'
        : 'This page is already backed by a managed Guard instance.';
      webPrimaryDisabled = true;
    } else if (isCurrentInstance) {
      webPrimaryLabel = state.lang === 'zh' ? '纳入后台托管' : 'Adopt Current Instance';
      webPrimaryHint = state.lang === 'zh'
        ? '当前页面已经在运行，但不是由 web:bg 管理。点击后会把当前实例写入 Guard 的后台运行记录。'
        : 'This page is already running, but it is not tracked by web:bg yet. Guard will adopt it into managed background state.';
    } else if (isOtherProcess) {
      webPrimaryLabel = state.lang === 'zh' ? '已有其他 Guard Web 实例' : 'Another Guard Web Is Running';
      webPrimaryHint = state.lang === 'zh'
        ? `端口 ${webStatus.port} 已被 PID ${webStatus.pid} 占用。请先停掉这个实例，再决定是否后台启动。`
        : `Port ${webStatus.port} is already occupied by PID ${webStatus.pid}. Stop it before starting another background instance.`;
      webPrimaryDisabled = true;
    }

    const body = `
      <div class="grid">
        ${metricCard('Gateway', service.running ? 'RUNNING' : 'STOPPED', `PID ${service.pid || '-'}`, service.running ? 'success' : 'danger')}
        ${metricCard('Guard Web', webStatus.running ? 'RUNNING' : 'STOPPED', webStatus.running ? `PID ${webStatus.pid || '-'}` : '-', webStatus.running ? 'success' : 'warn')}
        ${metricCard('Node.js', info.nodeVersion || '-', info.arch || '-')}
        ${metricCard('OpenClaw', info.openclaw?.installed ? 'INSTALLED' : 'MISSING', info.openclaw?.version || '-', info.openclaw?.installed ? 'success' : 'warn')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '系统信息' : 'System Info'}</h3>
          ${keyValueGrid([
            { label: state.lang === 'zh' ? '平台' : 'Platform', value: info.platform || '-' },
            { label: state.lang === 'zh' ? '用户' : 'User', value: info.user || '-' },
            { label: 'Home', value: info.home || '-' },
            { label: 'OpenClaw Dir', value: info.openclawDir || '-' },
            { label: state.lang === 'zh' ? '当前页面 PID' : 'Current Page PID', value: info.pid || '-' },
            { label: state.lang === 'zh' ? '当前监听端口' : 'Current Listen Port', value: webStatus.port || '-' },
          ])}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '后台服务控制' : 'Background Service Controls'}</h3>
          <div class="toolbar">
            <button class="action-btn primary" type="button" data-service-action="start">${escapeHtml(t('start'))} Gateway</button>
            <button class="action-btn" type="button" data-service-action="restart">${escapeHtml(t('restart'))} Gateway</button>
            <button class="action-btn danger" type="button" data-service-action="stop">${escapeHtml(t('stop'))} Gateway</button>
            <button class="action-btn ${webPrimaryDisabled ? '' : 'primary'}" type="button" data-service-action="start-web" ${webPrimaryDisabled ? 'disabled' : ''}>${escapeHtml(webPrimaryLabel)}</button>
            <button class="action-btn danger" type="button" data-service-action="stop-web" ${webStatus.running ? '' : 'disabled'}>${escapeHtml(t('stopWeb'))}</button>
          </div>
          <div class="status ${webPrimaryDisabled && !isCurrentManaged ? 'warn' : ''}" style="margin-top:14px;">${escapeHtml(webPrimaryHint)}</div>
          <div class="grid" style="margin-top:14px;">
            <div class="list-item">
              <div class="row" style="justify-content:space-between;">
                <strong>${state.lang === 'zh' ? '检测结果' : 'Detection Result'}</strong>
                <span class="pill ${webStatus.running ? 'success' : 'warn'}">${escapeHtml(webStatus.running ? (state.lang === 'zh' ? '运行中' : 'running') : (state.lang === 'zh' ? '未运行' : 'stopped'))}</span>
              </div>
              <div class="muted small" style="margin-top:8px;">
                ${escapeHtml(webStatus.running
                  ? (state.lang === 'zh' ? `当前检测到 PID ${webStatus.pid || '-'} 正在监听端口 ${webStatus.port}。` : `PID ${webStatus.pid || '-'} is listening on port ${webStatus.port}.`)
                  : (state.lang === 'zh' ? '当前端口没有 Guard Web 进程在监听。' : 'No Guard Web process is listening on this port right now.'))}
              </div>
            </div>
            <div class="list-item">
              <div class="row" style="justify-content:space-between;">
                <strong>${state.lang === 'zh' ? '托管来源' : 'Tracking Source'}</strong>
                <span class="pill ${webStatus.managed ? 'success' : 'warn'}">${escapeHtml(webStatus.source || '-')}</span>
              </div>
              <div class="muted small" style="margin-top:8px;">
                ${escapeHtml(webStatus.managed
                  ? (state.lang === 'zh' ? '该实例已经被 Guard 写入后台运行记录。' : 'This instance is already tracked by Guard background runtime records.')
                  : (state.lang === 'zh' ? '当前只是通过端口扫描识别到进程，尚未进入 Guard 托管。' : 'This instance is currently detected by port scan only and is not under Guard management yet.'))}
              </div>
            </div>
            <div class="list-item">
              <div class="row" style="justify-content:space-between;">
                <strong>${state.lang === 'zh' ? '运行记录文件' : 'Runtime Record File'}</strong>
                <span class="chip">${escapeHtml(webStatus.port || '-')}</span>
              </div>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(webStatus.pidFile || '-')}</div>
            </div>
          </div>
          <div class="sub-card" style="margin-top:14px;">
            <h3 style="margin-bottom:10px;">${state.lang === 'zh' ? '手动命令参考' : 'Manual Commands'}</h3>
            <div class="command-list">
              <code>npm run web:bg:start</code>
              <code>npm run web:bg:status</code>
              <code>npm run web:bg:stop</code>
            </div>
            <div class="muted small" style="margin-top:10px;">
              ${escapeHtml(state.lang === 'zh'
                ? '推荐优先用上面三个命令排查后台托管状态。如果页面本身已经打开，优先点击“纳入后台托管”，不要重复拉起第二个同端口实例。'
                : 'Prefer the three commands above to inspect background runtime state. If this page is already open, adopt the current instance before trying to start a second process on the same port.')}
            </div>
          </div>
          <pre style="margin-top:14px;">${prettyJson({ info, gateway: service, web: webStatus })}</pre>
        </div>
      </div>
    `;

    setPanel(t('tabs.system'), t('desc.system'), body);
    document.querySelectorAll('[data-service-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-service-action');
        try {
          let result;
          if (action === 'start-web') {
            result = await postJson('/api/web-background/start', {});
          } else if (action === 'stop-web') {
            result = await postJson('/api/web-background/stop', {});
          } else {
            result = await postJson(`/api/service/${action}`, {});
          }
          const ok = result?.success !== false;
          showToast(result?.message || 'OK', ok ? 'success' : 'error');
          await loadSystem();
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
    const warningCount = items.filter((item) => item.severity === 'warning' || item.severity === 'error').length;
    const successCount = items.filter((item) => item.severity === 'success').length;
    const sources = Array.from(new Set(items.map((item) => item.source).filter(Boolean))).sort();
    const filtered = items.filter((item) => {
      if (state.notificationFilter === 'unread' && item.read) return false;
      if (state.notificationFilter === 'warning' && item.severity !== 'warning' && item.severity !== 'error') return false;
      if (state.notificationFilter === 'success' && item.severity !== 'success') return false;
      if (state.notificationSource !== 'all' && item.source !== state.notificationSource) return false;
      return matchesTextQuery([
        item.title,
        item.message,
        item.type,
        item.source,
        item.severity,
        item.meta ? JSON.stringify(item.meta) : '',
      ], state.notificationSearchQuery);
    });
    const getNotificationJumpTarget = (item) => {
      const meta = item?.meta || {};
      if (item?.source === 'git-sync' && (
        Array.isArray(meta.embeddedRepos) ||
        item?.title === 'Embedded Git repositories detected' ||
        item?.title === '.gitignore updated for embedded repositories'
      )) {
        return {
          tabId: 'git-sync',
          selector: '#gitignore-preview-card',
          label: state.lang === 'zh' ? '打开 Git Sync' : 'Open Git Sync',
        };
      }
      if (item?.source === 'git-sync' && (
        item?.title === 'Local commit succeeded' ||
        item?.title === 'Remote push succeeded'
      )) {
        return {
          tabId: 'git-sync',
          selector: item?.title === 'Local commit succeeded' ? '#git-sync-commit-card' : '#git-sync-readiness-card',
          label: state.lang === 'zh' ? '查看同步状态' : 'View Sync Status',
        };
      }
      return null;
    };

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '通知总数' : 'Total Notifications', formatNumber(summary.total || 0), state.lang === 'zh' ? '全部记录' : 'all records')}
        ${metricCard(state.lang === 'zh' ? '未读通知' : 'Unread', formatNumber(summary.unread || 0), state.lang === 'zh' ? '待处理' : 'requires attention', (summary.unread || 0) > 0 ? 'warn' : 'success')}
        ${metricCard(state.lang === 'zh' ? '警告 / 错误' : 'Warnings / Errors', formatNumber(warningCount), state.lang === 'zh' ? '需要排查' : 'needs review', warningCount > 0 ? 'warn' : 'success')}
        ${metricCard(state.lang === 'zh' ? '成功事件' : 'Success Events', formatNumber(successCount), state.lang === 'zh' ? '最近完成' : 'recent completions', successCount > 0 ? 'success' : '')}
      </div>
      <div class="card">
        <div class="toolbar tight">
          <input id="notify-search" value="${escapeHtml(state.notificationSearchQuery || '')}" placeholder="${escapeHtml(state.lang === 'zh' ? '搜索标题 / 消息 / 来源' : 'Search title / message / source')}" />
          <select id="notify-source">
            <option value="all">${escapeHtml(state.lang === 'zh' ? '全部来源' : 'All sources')}</option>
            ${sources.map((source) => `<option value="${escapeHtml(source)}" ${state.notificationSource === source ? 'selected' : ''}>${escapeHtml(source)}</option>`).join('')}
          </select>
        </div>
        <div class="toolbar tight" style="margin-top:12px;">
          <button class="chip ${state.notificationFilter === 'all' ? 'active' : ''}" type="button" data-notify-filter="all">${state.lang === 'zh' ? '全部' : 'All'} (${formatNumber(summary.total || 0)})</button>
          <button class="chip ${state.notificationFilter === 'unread' ? 'active' : ''}" type="button" data-notify-filter="unread">${state.lang === 'zh' ? '未读' : 'Unread'} (${formatNumber(summary.unread || 0)})</button>
          <button class="chip ${state.notificationFilter === 'warning' ? 'active' : ''}" type="button" data-notify-filter="warning">${state.lang === 'zh' ? '警告' : 'Warning'} (${formatNumber(warningCount)})</button>
          <button class="chip ${state.notificationFilter === 'success' ? 'active' : ''}" type="button" data-notify-filter="success">${state.lang === 'zh' ? '成功' : 'Success'} (${formatNumber(successCount)})</button>
        </div>
        <div class="toolbar tight" style="margin-top:12px;">
          <button class="action-btn" type="button" data-notify-bulk="read-all">${escapeHtml(t('readAll'))}</button>
          <button class="action-btn" type="button" data-notify-bulk="unread-all">${escapeHtml(t('unreadAll'))}</button>
          <button class="action-btn" type="button" data-notify-bulk="clear-read">${escapeHtml(t('clearRead'))}</button>
          <button class="action-btn danger" type="button" data-notify-bulk="clear-all">${escapeHtml(t('clearAll'))}</button>
        </div>
      </div>
      <div class="list">
        ${filtered.length ? filtered.map((item) => {
          const jumpTarget = getNotificationJumpTarget(item);
          return `
          <div class="list-item ${item.read ? '' : 'unread'}">
            <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <div class="muted small">${escapeHtml(item.type)} · ${escapeHtml(item.source)} · ${escapeHtml(formatDate(item.createdAt))}</div>
              </div>
              <span class="pill ${item.severity === 'success' ? 'success' : item.severity === 'warning' ? 'warn' : item.severity === 'error' ? 'danger' : ''}">${escapeHtml(item.severity)}</span>
            </div>
            <p style="margin-top:10px;">${escapeHtml(item.message)}</p>
            ${item.meta ? `<pre style="margin-top:12px;">${prettyJson(item.meta)}</pre>` : ''}
            <div class="toolbar tight" style="margin-top:12px;">
              <button class="action-btn" type="button" data-notify-item="${escapeHtml(item.id)}" data-next-read="${item.read ? 'false' : 'true'}">${escapeHtml(item.read ? t('markUnread') : t('markRead'))}</button>
              <button class="action-btn" type="button" data-notify-copy="${escapeHtml(item.id)}">${escapeHtml(state.lang === 'zh' ? '复制详情' : 'Copy Details')}</button>
              ${jumpTarget ? `<button class="action-btn primary" type="button" data-notify-open-tab="${escapeHtml(jumpTarget.tabId)}" data-notify-focus="${escapeHtml(jumpTarget.selector)}">${escapeHtml(jumpTarget.label)}</button>` : ''}
            </div>
          </div>
        `;
        }).join('') : emptyState(state.lang === 'zh' ? '没有符合筛选条件的通知。' : 'No notifications match the current filters.')}
      </div>
    `;

    setPanel(t('tabs.notifications'), t('desc.notifications'), body);

    document.getElementById('notify-search')?.addEventListener('input', (event) => {
      state.notificationSearchQuery = event.target.value;
      loadNotifications();
    });
    document.getElementById('notify-source')?.addEventListener('change', (event) => {
      state.notificationSource = event.target.value || 'all';
      loadNotifications();
    });

    document.querySelectorAll('[data-notify-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.notificationFilter = button.getAttribute('data-notify-filter') || 'all';
        loadNotifications();
      });
    });

    document.querySelectorAll('[data-notify-bulk]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-notify-bulk');
        if (action === 'clear-all') {
          const confirmed = confirm(state.lang === 'zh' ? '确认清空所有通知吗？这个操作不可撤销。' : 'Clear all notifications? This cannot be undone.');
          if (!confirmed) return;
        }
        try {
          const result = await postJson('/api/notifications/bulk', { action });
          const ok = result?.success !== false;
          showToast(result?.message || 'OK', ok ? 'success' : 'error');
          await loadNotifications();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });

    document.querySelectorAll('[data-notify-item]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          const result = await postJson('/api/notifications/read', {
            id: button.getAttribute('data-notify-item'),
            read: button.getAttribute('data-next-read') === 'true',
          });
          const ok = result?.success !== false;
          showToast(ok ? (state.lang === 'zh' ? '通知状态已更新。' : 'Notification updated.') : (state.lang === 'zh' ? '通知状态更新失败。' : 'Failed to update notification.'), ok ? 'success' : 'error');
          await loadNotifications();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });

    document.querySelectorAll('[data-notify-copy]').forEach((button) => {
      button.addEventListener('click', async () => {
        const item = items.find((entry) => entry.id === button.getAttribute('data-notify-copy'));
        if (!item) {
          showToast(state.lang === 'zh' ? '没有找到对应的通知详情。' : 'Notification detail not found.', 'error');
          return;
        }
        await copyTextValue(JSON.stringify(item, null, 2), {
          successMessage: state.lang === 'zh' ? '通知详情已复制。' : 'Notification detail copied.',
        });
      });
    });

    document.querySelectorAll('[data-notify-open-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-notify-open-tab') || 'git-sync';
        const selector = button.getAttribute('data-notify-focus') || '#gitignore-preview-card';
        queuePanelFocus(tabId, selector);
        setActiveTab(tabId);
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
    const jobs = data.jobs || [];
    const enabledJobs = jobs.filter((job) => job.enabled);
    const disabledJobs = jobs.filter((job) => !job.enabled);
    const editingJob = state.cronEditingJobId
      ? jobs.find((job) => job.id === state.cronEditingJobId) || null
      : null;

    if (state.cronEditorMode === 'edit' && !editingJob) {
      state.cronEditorMode = 'create';
      state.cronEditingJobId = null;
      state.cronDraft = getDefaultCronDraft();
    } else if (!state.cronDraft) {
      state.cronDraft = editingJob ? buildCronDraftFromJob(editingJob) : getDefaultCronDraft();
    }

    const draft = state.cronDraft || getDefaultCronDraft();
    const filteredJobs = jobs.filter((job) => {
      if (state.cronFilter === 'enabled' && !job.enabled) return false;
      if (state.cronFilter === 'disabled' && job.enabled) return false;
      return matchesTextQuery([
        job.name,
        job.id,
        job.agentId,
        job.schedule,
        job.prompt,
        job.status,
      ], state.cronSearchQuery);
    });

    const formTitle = state.cronEditorMode === 'edit'
      ? (state.lang === 'zh' ? `编辑任务 ${state.cronEditingJobId}` : `Edit Job ${state.cronEditingJobId}`)
      : (state.lang === 'zh' ? '新建 Cron 任务' : 'Create Cron Job');

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '任务数' : 'Jobs', formatNumber(jobs.length), state.lang === 'zh' ? '当前已发现任务' : 'detected tasks')}
        ${metricCard(state.lang === 'zh' ? '启用中' : 'Enabled', formatNumber(enabledJobs.length), state.lang === 'zh' ? '正在调度' : 'active schedule', enabledJobs.length > 0 ? 'success' : '')}
        ${metricCard(state.lang === 'zh' ? '已停用' : 'Disabled', formatNumber(disabledJobs.length), state.lang === 'zh' ? '待恢复或清理' : 'paused jobs', disabledJobs.length > 0 ? 'warn' : '')}
        ${metricCard(state.lang === 'zh' ? '调度器' : 'Scheduler', data.status?.enabled === null ? '-' : (data.status.enabled ? 'ON' : 'OFF'), data.status?.schedulerNextWakeAt ? formatDate(data.status.schedulerNextWakeAt) : (data.status?.storePath || '-'), data.status?.enabled ? 'success' : 'warn')}
      </div>
      <div style="margin-top:14px;">${renderActionFeedback(state.lang === 'zh' ? '最近 Cron 操作' : 'Latest Cron Action', state.cronLastAction, state.lang === 'zh' ? '还没有执行过 Cron 管理动作。' : 'No cron action has been executed yet.')}</div>
      ${(data.warnings || []).length ? `<div class="status warn" style="margin-top:14px; white-space:pre-wrap;">${escapeHtml(data.warnings.join('\n'))}</div>` : ''}
      <div class="grid" style="margin-top:14px; align-items:start;">
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:center;">
            <h3>${escapeHtml(formTitle)}</h3>
            <span class="pill ${state.cronEditorMode === 'edit' ? 'warn' : 'success'}">${escapeHtml(state.cronEditorMode === 'edit' ? (state.lang === 'zh' ? '编辑模式' : 'edit mode') : (state.lang === 'zh' ? '创建模式' : 'create mode'))}</span>
          </div>
          <form id="cron-editor-form" class="form-grid" style="margin-top:12px;">
            ${renderFormField({
              name: 'name',
              label: state.lang === 'zh' ? '任务名称' : 'Job Name',
              value: draft.name,
              placeholder: state.lang === 'zh' ? '例如：每日汇总' : 'Example: Daily Brief',
            })}
            ${renderFormField({
              name: 'agentId',
              label: state.lang === 'zh' ? 'Agent ID' : 'Agent ID',
              value: draft.agentId,
              placeholder: state.lang === 'zh' ? '例如：task-hub' : 'Example: task-hub',
            })}
            ${renderFormField({
              name: 'scheduleMode',
              label: state.lang === 'zh' ? '调度类型' : 'Schedule Mode',
              value: draft.scheduleMode,
              type: 'select',
              options: ['cron', 'every', 'at'],
            })}
            ${renderFormField({
              name: 'scheduleValue',
              label: state.lang === 'zh' ? '调度值' : 'Schedule Value',
              value: draft.scheduleValue,
              placeholder: draft.scheduleMode === 'every'
                ? '10m / 1h'
                : draft.scheduleMode === 'at'
                  ? '2026-03-10T09:00:00+08:00'
                  : '0 9 * * *',
              help: state.lang === 'zh'
                ? 'cron: 5 段表达式；every: 10m/1h；at: ISO 时间或 +20m'
                : 'cron: 5-field expression; every: 10m/1h; at: ISO time or +20m',
            })}
            ${renderFormField({
              name: 'timezone',
              label: state.lang === 'zh' ? '时区' : 'Timezone',
              value: draft.timezone,
              placeholder: 'Asia/Shanghai',
            })}
            ${renderFormField({
              name: 'session',
              label: state.lang === 'zh' ? '会话模式' : 'Session',
              value: draft.session,
              type: 'select',
              options: ['main', 'isolated'],
            })}
            ${renderFormField({
              name: 'prompt',
              label: state.lang === 'zh' ? '任务消息' : 'Prompt',
              value: draft.prompt,
              type: 'textarea',
              fullWidth: true,
              placeholder: state.lang === 'zh' ? '例如：汇总今天的新线索并输出成 Markdown' : 'Example: Summarize today’s new leads in Markdown',
            })}
            ${renderFormField({
              name: 'description',
              label: state.lang === 'zh' ? '描述' : 'Description',
              value: draft.description,
              type: 'textarea',
              fullWidth: true,
              placeholder: state.lang === 'zh' ? '可选，给团队说明这个任务的用途' : 'Optional note for your team',
            })}
            ${renderFormField({
              name: 'model',
              label: state.lang === 'zh' ? '模型覆盖' : 'Model Override',
              value: draft.model,
              placeholder: state.lang === 'zh' ? '留空则使用 Agent 默认模型' : 'Leave blank to use agent default',
            })}
            ${renderFormField({
              name: 'thinking',
              label: state.lang === 'zh' ? 'Thinking' : 'Thinking',
              value: draft.thinking,
              type: 'select',
              options: ['', 'off', 'minimal', 'low', 'medium', 'high'],
            })}
            ${renderFormField({
              name: 'wake',
              label: state.lang === 'zh' ? '唤醒时机' : 'Wake Mode',
              value: draft.wake,
              type: 'select',
              options: ['now', 'next-heartbeat'],
            })}
            ${renderFormField({
              name: 'timeoutSeconds',
              label: state.lang === 'zh' ? '超时秒数' : 'Timeout Seconds',
              value: draft.timeoutSeconds,
              placeholder: '30',
            })}
            ${renderFormField({
              name: 'timeoutMs',
              label: state.lang === 'zh' ? '超时毫秒' : 'Timeout Milliseconds',
              value: draft.timeoutMs,
              placeholder: '30000',
            })}
            ${renderFormField({
              name: 'stagger',
              label: state.lang === 'zh' ? '抖动窗口' : 'Stagger',
              value: draft.stagger,
              placeholder: state.lang === 'zh' ? '30s / 5m / 0(表示 exact)' : '30s / 5m / 0 for exact',
            })}
            ${renderFormField({
              name: 'enabled',
              label: state.lang === 'zh' ? '启用任务' : 'Enabled',
              type: 'checkbox',
              checked: !!draft.enabled,
              help: state.lang === 'zh' ? '保存后立即参与调度' : 'Participate in scheduling right away',
            })}
            ${renderFormField({
              name: 'announce',
              label: state.lang === 'zh' ? '推送摘要' : 'Announce',
              type: 'checkbox',
              checked: !!draft.announce,
              help: state.lang === 'zh' ? '执行后向聊天发送摘要' : 'Send a summary to chat after execution',
            })}
            ${renderFormField({
              name: 'bestEffortDeliver',
              label: state.lang === 'zh' ? '最佳努力投递' : 'Best Effort Deliver',
              type: 'checkbox',
              checked: !!draft.bestEffortDeliver,
              help: state.lang === 'zh' ? '投递失败不阻断任务成功' : 'Do not fail the job when delivery fails',
            })}
            ${renderFormField({
              name: 'deleteAfterRun',
              label: state.lang === 'zh' ? '成功后删除' : 'Delete After Run',
              type: 'checkbox',
              checked: !!draft.deleteAfterRun,
              help: state.lang === 'zh' ? '适合一次性任务' : 'Useful for one-shot jobs',
            })}
          </form>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn primary" type="button" data-cron-action="${state.cronEditorMode === 'edit' ? 'save-edit' : 'create'}">${escapeHtml(state.cronEditorMode === 'edit' ? (state.lang === 'zh' ? '保存修改' : 'Save Changes') : (state.lang === 'zh' ? '创建任务' : 'Create Job'))}</button>
            <button class="action-btn" type="button" data-cron-action="reset-form">${escapeHtml(state.lang === 'zh' ? '重置表单' : 'Reset Form')}</button>
            ${state.cronEditorMode === 'edit' ? `<button class="action-btn" type="button" data-cron-action="cancel-edit">${escapeHtml(state.lang === 'zh' ? '取消编辑' : 'Cancel Edit')}</button>` : ''}
          </div>
        </div>
        <div class="card">
          <div class="toolbar tight">
            <input id="cron-search" value="${escapeHtml(state.cronSearchQuery || '')}" placeholder="${escapeHtml(state.lang === 'zh' ? '搜索任务名 / Agent / 表达式 / Prompt' : 'Search name / agent / schedule / prompt')}" />
            <button class="action-btn" type="button" data-cron-action="refresh">${escapeHtml(t('reload'))}</button>
          </div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="chip ${state.cronFilter === 'all' ? 'active' : ''}" type="button" data-cron-filter="all">${state.lang === 'zh' ? '全部' : 'All'} (${formatNumber(jobs.length)})</button>
            <button class="chip ${state.cronFilter === 'enabled' ? 'active' : ''}" type="button" data-cron-filter="enabled">${state.lang === 'zh' ? '启用中' : 'Enabled'} (${formatNumber(enabledJobs.length)})</button>
            <button class="chip ${state.cronFilter === 'disabled' ? 'active' : ''}" type="button" data-cron-filter="disabled">${state.lang === 'zh' ? '已停用' : 'Disabled'} (${formatNumber(disabledJobs.length)})</button>
          </div>
          <div class="list" style="margin-top:14px;">
            ${filteredJobs.length ? filteredJobs.map((job) => `
              <div class="list-item">
                <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                  <div>
                    <strong>${escapeHtml(job.name || job.id)}</strong>
                    <div class="muted small">${escapeHtml(job.agentId)} · ${escapeHtml(job.schedule || '-')}</div>
                  </div>
                  <div class="row" style="gap:8px; flex-wrap:wrap; justify-content:flex-end;">
                    <span class="pill ${job.enabled ? 'success' : 'warn'}">${escapeHtml(job.enabled ? (state.lang === 'zh' ? '已启用' : 'enabled') : (state.lang === 'zh' ? '已停用' : 'disabled'))}</span>
                    <span class="chip">${escapeHtml(job.status || '-')}</span>
                  </div>
                </div>
                <div class="row" style="margin-top:10px; gap:8px; flex-wrap:wrap;">
                  <span class="chip">${escapeHtml((state.lang === 'zh' ? '最近运行: ' : 'Last run: ') + formatDate(job.lastRunAt))}</span>
                  <span class="chip">${escapeHtml((state.lang === 'zh' ? '下次运行: ' : 'Next run: ') + formatDate(job.nextRunAt))}</span>
                </div>
                <p style="margin-top:10px;">${escapeHtml(job.prompt || '')}</p>
                <div class="toolbar tight" style="margin-top:12px;">
                  <button class="action-btn" type="button" data-cron-action="edit" data-job-id="${escapeHtml(job.id)}">${escapeHtml(state.lang === 'zh' ? '编辑' : 'Edit')}</button>
                  <button class="action-btn" type="button" data-cron-action="run" data-job-id="${escapeHtml(job.id)}">${escapeHtml(t('run'))}</button>
                  <button class="action-btn" type="button" data-cron-action="${job.enabled ? 'disable' : 'enable'}" data-job-id="${escapeHtml(job.id)}">${escapeHtml(job.enabled ? t('disable') : t('enable'))}</button>
                  <button class="action-btn danger" type="button" data-cron-action="remove" data-job-id="${escapeHtml(job.id)}">${escapeHtml(t('remove'))}</button>
                </div>
              </div>
            `).join('') : emptyState(state.lang === 'zh' ? '没有符合筛选条件的 Cron 任务。' : 'No cron jobs match the current filters.')}
          </div>
        </div>
      </div>
    `;

    setPanel(t('tabs.cron'), t('desc.cron'), body);

    document.getElementById('cron-editor-form')?.addEventListener('input', () => {
      syncCronDraftFromForm();
    });

    document.getElementById('cron-search')?.addEventListener('input', (event) => {
      state.cronSearchQuery = event.target.value;
      loadCron();
    });

    document.querySelectorAll('[data-cron-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.cronFilter = button.getAttribute('data-cron-filter') || 'all';
        loadCron();
      });
    });

    document.querySelectorAll('[data-cron-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-cron-action');
        const jobId = button.getAttribute('data-job-id');

        if (action === 'refresh') {
          await loadCron();
          return;
        }
        if (action === 'edit') {
          const target = jobs.find((job) => job.id === jobId);
          state.cronEditorMode = 'edit';
          state.cronEditingJobId = jobId;
          state.cronDraft = target ? buildCronDraftFromJob(target) : getDefaultCronDraft();
          await loadCron();
          return;
        }
        if (action === 'reset-form' || action === 'cancel-edit') {
          state.cronEditorMode = 'create';
          state.cronEditingJobId = null;
          state.cronDraft = getDefaultCronDraft();
          await loadCron();
          return;
        }
        if (action === 'remove') {
          const confirmed = confirm(state.lang === 'zh' ? `确认删除 Cron 任务 ${jobId} 吗？` : `Remove cron job ${jobId}?`);
          if (!confirmed) return;
        }

        try {
          if (action === 'create' || action === 'save-edit') {
            const payload = syncCronDraftFromForm();
            if (!payload.prompt?.trim()) {
              showToast(state.lang === 'zh' ? '请先填写任务消息。' : 'Prompt is required.', 'error');
              return;
            }
            if (!payload.scheduleValue?.trim()) {
              showToast(state.lang === 'zh' ? '请先填写调度值。' : 'Schedule value is required.', 'error');
              return;
            }

            const endpoint = action === 'create' ? '/api/cron-ui/create' : '/api/cron-ui/update';
            const requestBody = action === 'create'
              ? payload
              : { ...payload, jobId: state.cronEditingJobId };
            const result = await postJson(endpoint, requestBody);
            const ok = result?.success !== false;
            state.cronLastAction = {
              type: ok ? 'success' : 'error',
              message: result?.message || 'OK',
              at: new Date().toISOString(),
              detail: result?.output || requestBody,
            };
            if (ok) {
              state.cronEditorMode = 'create';
              state.cronEditingJobId = null;
              state.cronDraft = getDefaultCronDraft();
            }
            showToast(result?.message || 'OK', ok ? 'success' : 'error');
            await loadCron();
            return;
          }

          const result = await postJson(`/api/cron-ui/${action}`, { jobId });
          const ok = result?.success !== false;
          state.cronLastAction = {
            type: ok ? 'success' : 'error',
            message: result?.message || 'OK',
            at: new Date().toISOString(),
            detail: result?.output || { action, jobId },
          };
          showToast(result?.message || 'OK', ok ? 'success' : 'error');
          await loadCron();
        } catch (error) {
          state.cronLastAction = {
            type: 'error',
            message: error.message || String(error),
            at: new Date().toISOString(),
            detail: { action, jobId },
          };
          showToast(error.message || String(error), 'error');
          await loadCron();
        }
      });
    });
  }

  async function loadGitSync() {
    clearGitSyncPollTimer();
    const gitIgnoreMode = state.gitSyncIgnoreMode === 'exact' ? 'exact' : 'smart';
    const [status, gitignorePreview] = await Promise.all([
      apiRequest('/api/git-sync/status'),
      apiRequest(`/api/git-sync/gitignore-preview?mode=${encodeURIComponent(gitIgnoreMode)}`).catch(() => null),
    ]);
    const oauth = status.oauth || {};

    if (!state.gitSyncDraftMessage) state.gitSyncDraftMessage = '';

    const skippedEmbeddedRepos = Array.isArray(status.skippedEmbeddedRepos) ? status.skippedEmbeddedRepos : [];
    const stageableChangedFiles = Array.isArray(status.stageableChangedFiles) ? status.stageableChangedFiles : [];
    const allChangedFiles = Array.isArray(status.changedFiles) ? status.changedFiles : [];
    const gitIgnoreTemplate = typeof gitignorePreview?.suggestedBlock === 'string' && gitignorePreview.suggestedBlock.trim()
      ? gitignorePreview.suggestedBlock
      : buildGitIgnoreTemplate(skippedEmbeddedRepos);
    const gitIgnoreAppendBlock = typeof gitignorePreview?.appendBlock === 'string' ? gitignorePreview.appendBlock : '';
    const gitIgnoreExistingEntries = Array.isArray(gitignorePreview?.existingEntries) ? gitignorePreview.existingEntries : [];
    const gitIgnoreMissingEntries = Array.isArray(gitignorePreview?.missingEntries) ? gitignorePreview.missingEntries : [];
    const gitIgnorePath = gitignorePreview?.gitignorePath || `${status.repoPath || ''}/.gitignore`;
    const gitIgnoreModeOptions = `
      <option value="smart" ${gitIgnoreMode === 'smart' ? 'selected' : ''}>${escapeHtml(state.lang === 'zh' ? '智能模式：精确路径 + 常见通配符' : 'Smart: exact paths + common wildcards')}</option>
      <option value="exact" ${gitIgnoreMode === 'exact' ? 'selected' : ''}>${escapeHtml(state.lang === 'zh' ? '精确模式：只写当前检测到的路径' : 'Exact: detected paths only')}</option>
    `;
    const embeddedRepoGuide = buildEmbeddedRepoGuide(skippedEmbeddedRepos);

    const stages = [
      {
        label: state.lang === 'zh' ? '仓库初始化' : 'Repository',
        ok: !!status.repoInitialized,
        detail: status.repoInitialized ? (status.repoPath || '-') : (state.lang === 'zh' ? '需要先执行 git init' : 'git init required'),
      },
      {
        label: state.lang === 'zh' ? '远程绑定' : 'Remote',
        ok: !!status.remoteUrl,
        detail: status.remoteUrl || (state.lang === 'zh' ? '当前还没有绑定远程仓库' : 'No remote repository connected'),
      },
      {
        label: state.lang === 'zh' ? '认证配置' : 'Authentication',
        ok: !!status.authConfigured,
        detail: status.authConfigured
          ? `${status.authMode || 'token'}${status.accountUsername ? ` · ${status.accountUsername}` : ''}`
          : (state.lang === 'zh' ? '需要先配置 Token 或 OAuth' : 'Token or OAuth required'),
      },
      {
        label: state.lang === 'zh' ? '私有仓校验' : 'Private Check',
        ok: status.repoPrivate === true,
        detail: status.repoPrivate === true
          ? (state.lang === 'zh' ? '已确认是 private 仓库' : 'Private repository confirmed')
          : status.repoPrivate === false
            ? (state.lang === 'zh' ? '检测到 public 仓库，Guard 已阻断同步' : 'Public repository detected, sync blocked')
            : (state.lang === 'zh' ? '尚未执行 private 检查' : 'Private check not executed yet'),
      },
      {
        label: state.lang === 'zh' ? '本地提交' : 'Commit Ready',
        ok: !!status.canCommit,
        detail: status.canCommit
          ? (state.lang === 'zh' ? '可以执行本地 commit' : 'Ready for local commit')
          : (state.lang === 'zh' ? '当前仍有提交阻断项' : 'Commit is still blocked'),
      },
      {
        label: state.lang === 'zh' ? '远程推送' : 'Push Ready',
        ok: !!status.canPush,
        detail: status.canPush
          ? (state.lang === 'zh' ? '可以执行远程 push' : 'Ready for remote push')
          : (state.lang === 'zh' ? '当前仍有推送阻断项' : 'Push is still blocked'),
      },
      {
        label: state.lang === 'zh' ? '一键同步' : 'Sync Ready',
        ok: !!status.canSync,
        detail: status.canSync
          ? (state.lang === 'zh' ? '可以执行检查并同步' : 'Ready for check + sync')
          : (state.lang === 'zh' ? '当前仍有同步阻断项' : 'Sync is still blocked'),
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
      ? (state.lang === 'zh'
        ? '浏览器授权进行中，请在浏览器完成登录，这个页面会自动刷新状态。'
        : 'Authorization is in progress. Finish the browser login and this page will refresh automatically.')
      : oauth.phase === 'success'
        ? (oauth.message || (state.lang === 'zh' ? 'OAuth 已完成。' : 'OAuth completed.'))
        : oauth.phase === 'error'
          ? (oauth.error || oauth.message || (state.lang === 'zh' ? 'OAuth 失败。' : 'OAuth failed.'))
          : (state.lang === 'zh'
            ? '如果你更偏好浏览器授权，可以在这里填写 Client ID / Client Secret。'
            : 'Configure Client ID / Client Secret here if you prefer browser OAuth.');

    const commitBlockingHtml = status.commitReasons?.length
      ? status.commitReasons.map((reason) => `<div class="list-item"><div>${escapeHtml(reason)}</div></div>`).join('')
      : `<div class="status">${escapeHtml(state.lang === 'zh' ? '本地提交链路已就绪。' : 'Commit path is ready.')}</div>`;
    const pushBlockingHtml = status.pushReasons?.length
      ? status.pushReasons.map((reason) => `<div class="list-item"><div>${escapeHtml(reason)}</div></div>`).join('')
      : `<div class="status">${escapeHtml(state.lang === 'zh' ? '远程推送链路已就绪。' : 'Push path is ready.')}</div>`;
    const syncBlockingHtml = status.reasons?.length
      ? status.reasons.map((reason) => `<div class="list-item"><div>${escapeHtml(reason)}</div></div>`).join('')
      : `<div class="status">${escapeHtml(state.lang === 'zh' ? '当前没有同步阻断项。' : 'No sync blockers detected.')}</div>`;
    const stageHtml = stages.map((stage) => `
      <div class="list-item">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <strong>${escapeHtml(stage.label)}</strong>
          <span class="pill ${stage.ok ? 'success' : 'warn'}">${escapeHtml(stage.ok ? (state.lang === 'zh' ? '就绪' : 'ready') : (state.lang === 'zh' ? '待处理' : 'pending'))}</span>
        </div>
        <div class="muted small">${escapeHtml(stage.detail)}</div>
      </div>
    `).join('');
    const stageableFilesHtml = stageableChangedFiles.length
      ? stageableChangedFiles.map((file) => `
          <div class="list-item">
            <div class="row" style="justify-content:space-between; gap:12px;">
              <strong>${escapeHtml(file)}</strong>
              <span class="pill success">${escapeHtml(state.lang === 'zh' ? '会纳入本次提交' : 'Will be committed')}</span>
            </div>
          </div>
        `).join('')
      : emptyState(state.lang === 'zh' ? '当前没有可直接提交的普通文件。' : 'No stageable root-repo files detected.');
    const skippedReposHtml = skippedEmbeddedRepos.length
      ? skippedEmbeddedRepos.map((repoPath) => `
          <div class="list-item">
            <div class="row" style="justify-content:space-between; gap:12px;">
              <strong>${escapeHtml(repoPath)}/</strong>
              <span class="pill warn">${escapeHtml(state.lang === 'zh' ? '已自动跳过' : 'Skipped')}</span>
            </div>
            <div class="muted small">${escapeHtml(state.lang === 'zh' ? '这是嵌套 Git 仓库，需要单独处理或加入外层忽略规则。' : 'This is an embedded Git repository and must be handled separately or ignored in the root repo.')}</div>
          </div>
        `).join('')
      : emptyState(state.lang === 'zh' ? '当前没有检测到嵌套 Git 仓库。' : 'No embedded Git repositories detected.');
    const gitIgnoreExistingHtml = gitIgnoreExistingEntries.length
      ? gitIgnoreExistingEntries.map((entry) => `
          <div class="list-item">
            <div class="row" style="justify-content:space-between; gap:12px;">
              <strong>${escapeHtml(entry)}</strong>
              <span class="pill success">${escapeHtml(state.lang === 'zh' ? '已存在' : 'Already Present')}</span>
            </div>
          </div>
        `).join('')
      : emptyState(state.lang === 'zh' ? '当前 .gitignore 里还没有命中这些嵌套仓库规则。' : 'No matching embedded-repo rules are present in .gitignore yet.');
    const gitIgnoreMissingHtml = gitIgnoreMissingEntries.length
      ? gitIgnoreMissingEntries.map((entry) => `
          <div class="list-item">
            <div class="row" style="justify-content:space-between; gap:12px;">
              <strong>${escapeHtml(entry)}</strong>
              <span class="pill warn">${escapeHtml(state.lang === 'zh' ? '将追加' : 'Will Be Added')}</span>
            </div>
          </div>
        `).join('')
      : emptyState(skippedEmbeddedRepos.length
        ? (state.lang === 'zh' ? '当前 .gitignore 已覆盖这些嵌套仓库规则。' : '.gitignore already covers the current embedded repositories.')
        : (state.lang === 'zh' ? '当前没有需要生成的嵌套仓库忽略规则。' : 'No embedded repository ignore rules need to be generated right now.'));
    const rawChangeSummary = allChangedFiles.length
      ? `${formatNumber(allChangedFiles.length)} ${state.lang === 'zh' ? '项变更' : 'changed paths'}`
      : (state.lang === 'zh' ? '没有本地变更' : 'No local changes');
    const embeddedRepoNotice = skippedEmbeddedRepos.length
      ? `<div class="status warn" style="margin-top:14px;">${escapeHtml(state.lang === 'zh'
          ? `Guard 已检测到 ${skippedEmbeddedRepos.length} 个嵌套 Git 仓库。它们不会被纳入外层 .openclaw 的本次提交，请按下方建议单独处理。`
          : `Guard detected ${skippedEmbeddedRepos.length} embedded Git repositories. They will stay outside the root .openclaw commit and should be handled separately using the guidance below.`)}</div>`
      : '';
    const guidanceTitle = skippedEmbeddedRepos.length
      ? (state.lang === 'zh' ? '嵌套仓库处理建议' : 'Embedded Repository Guidance')
      : (state.lang === 'zh' ? '常见嵌套仓库建议' : 'Common Embedded Repository Guidance');
    const guidanceStatus = skippedEmbeddedRepos.length
      ? (state.lang === 'zh'
        ? '下面的建议基于当前检测到的嵌套仓库生成，可以直接复制忽略模板。'
        : 'These recommendations are generated from the embedded repositories detected right now. You can copy the ignore template directly.')
      : (state.lang === 'zh'
        ? '当 .openclaw 里包含 workspace-*、extensions/* 这类独立 Git 仓库时，可以提前按这里的规则规划同步边界。'
        : 'When .openclaw contains independent child repositories such as workspace-* or extensions/*, use these rules to plan the sync boundary ahead of time.');

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '仓库状态' : 'Repository', status.repoInitialized ? 'READY' : 'MISSING', status.repoPath || '-', status.repoInitialized ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '远程仓库' : 'Remote', status.remoteRepo || status.remoteUrl || '-', status.remoteWebUrl || status.provider || '-', status.remoteUrl ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '认证' : 'Auth', status.authConfigured ? (status.accountUsername || status.authMode || 'configured') : 'missing', status.authConfigured ? (state.lang === 'zh' ? '凭证已配置' : 'credentials ready') : (state.lang === 'zh' ? '尚未配置' : 'not configured'), status.authConfigured ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '全部变更' : 'All Changes', formatNumber(allChangedFiles.length), `${status.currentBranch || '-'} · ${rawChangeSummary}`, allChangedFiles.length > 0 ? 'warn' : 'success')}
        ${metricCard(state.lang === 'zh' ? '可提交文件' : 'Stageable', formatNumber(stageableChangedFiles.length), stageableChangedFiles.length > 0 ? (state.lang === 'zh' ? '将纳入外层 commit' : 'Will be staged in the root repo') : (state.lang === 'zh' ? '当前没有可提交普通文件' : 'No stageable root-repo files'), stageableChangedFiles.length > 0 ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '嵌套仓库' : 'Embedded Repos', formatNumber(skippedEmbeddedRepos.length), skippedEmbeddedRepos.length > 0 ? (state.lang === 'zh' ? '已自动跳过，需单独处理' : 'Skipped automatically, requires separate handling') : (state.lang === 'zh' ? '当前未发现' : 'No embedded repos detected'), skippedEmbeddedRepos.length > 0 ? 'warn' : 'success')}
      </div>
      ${status.state?.lastError ? `<div class="status error" style="margin-top:14px;">${escapeHtml((state.lang === 'zh' ? '最近错误：' : 'Last error: ') + status.state.lastError)}</div>` : ''}
      ${embeddedRepoNotice}
      <div style="margin-top:14px;">${renderActionFeedback(state.lang === 'zh' ? '最近 Git 同步操作' : 'Latest Git Sync Action', state.gitSyncLastAction, state.lang === 'zh' ? '还没有执行过 Git 同步动作。' : 'No Git sync action has been executed yet.')}</div>
      <div class="grid" style="margin-top:14px;">
        <div class="card accent-info panel-focus-target" id="git-sync-readiness-card">
          <h3>${state.lang === 'zh' ? '同步准备度' : 'Sync Readiness'}</h3>
          <div class="list">${stageHtml}</div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn" type="button" data-git-action="copy-repo-path">${state.lang === 'zh' ? '复制本地目录' : 'Copy Repo Path'}</button>
            <button class="action-btn" type="button" data-git-action="copy-remote" ${status.remoteUrl ? '' : 'disabled'}>${state.lang === 'zh' ? '复制远程地址' : 'Copy Remote URL'}</button>
            <button class="action-btn" type="button" data-git-action="open-remote" ${status.remoteWebUrl ? '' : 'disabled'}>${state.lang === 'zh' ? '打开远程仓库' : 'Open Remote'}</button>
            <button class="action-btn primary" type="button" data-git-action="check-sync">${state.lang === 'zh' ? '检查并同步' : 'Check + Sync'}</button>
          </div>
        </div>
        <div class="card panel-focus-target" id="git-sync-commit-card">
          <h3>${state.lang === 'zh' ? '阻断拆解' : 'Readiness Breakdown'}</h3>
          <div class="stack">
            <div>
              <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? '提交阻断' : 'Commit blockers')}</div>
              ${commitBlockingHtml}
            </div>
            <div>
              <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? '推送阻断' : 'Push blockers')}</div>
              ${pushBlockingHtml}
            </div>
            <div>
              <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? '同步阻断' : 'Sync blockers')}</div>
              ${syncBlockingHtml}
            </div>
          </div>
          <div class="stack" style="margin-top:14px;">
            <div class="list-item"><strong>${state.lang === 'zh' ? '最近校验' : 'Last Check'}</strong><div class="muted small">${escapeHtml(formatDate(status.state?.lastCheckedAt))}</div></div>
            <div class="list-item"><strong>${state.lang === 'zh' ? '最近提交' : 'Last Commit'}</strong><div class="muted small">${escapeHtml(formatDate(status.state?.lastCommitAt))}</div></div>
            <div class="list-item"><strong>${state.lang === 'zh' ? '最近推送' : 'Last Push'}</strong><div class="muted small">${escapeHtml(formatDate(status.state?.lastSyncAt))}</div></div>
          </div>
        </div>
      </div>
      <div class="grid" style="margin-top:14px;">
        <div class="card accent-success">
          <h3>${state.lang === 'zh' ? '本次会纳入提交的文件' : 'Stageable Files For This Commit'}</h3>
          <div class="muted small" style="margin-bottom:12px;">${escapeHtml(state.lang === 'zh' ? '这些路径属于外层 .openclaw 仓库，可直接纳入本次提交。' : 'These paths belong to the root .openclaw repository and will be staged normally.')}</div>
          <div class="list">${stageableFilesHtml}</div>
        </div>
        <div class="card accent-warn">
          <h3>${state.lang === 'zh' ? '已自动跳过的嵌套仓库' : 'Skipped Embedded Repositories'}</h3>
          <div class="muted small" style="margin-bottom:12px;">${escapeHtml(state.lang === 'zh' ? '这些路径带有自己的 .git，不会被外层 Git Sync 纳入 commit。' : 'These paths contain their own .git directories and will stay outside the root Git Sync commit.')}</div>
          <div class="list">${skippedReposHtml}</div>
        </div>
      </div>
      <div class="card accent-warn" style="margin-top:14px;">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:16px;">
          <div>
            <h3>${escapeHtml(guidanceTitle)}</h3>
            <p>${escapeHtml(guidanceStatus)}</p>
          </div>
          <span class="pill warn">${escapeHtml(skippedEmbeddedRepos.length > 0 ? `${formatNumber(skippedEmbeddedRepos.length)} ${state.lang === 'zh' ? '个待处理路径' : 'paths to review'}` : (state.lang === 'zh' ? '预防性指南' : 'Preventive guide'))}</span>
        </div>
        <div class="guide-grid" style="margin-top:12px;">
          <div class="sub-card">
            <strong>${escapeHtml(state.lang === 'zh' ? '方案 1：继续独立维护' : 'Option 1: Keep It Independent')}</strong>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '推荐做法。把子仓库路径加入外层 .gitignore，后续外层 Git Sync 只管主仓内容。' : 'Recommended. Add child repository paths to the root .gitignore so the root Git Sync only manages the main repository.')}</div>
          </div>
          <div class="sub-card">
            <strong>${escapeHtml(state.lang === 'zh' ? '方案 2：并入主仓' : 'Option 2: Flatten Into The Root Repo')}</strong>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '如果你想把内容并入 .openclaw 主仓，需要先删除子目录里的 .git，再重新 add / commit。' : 'If you want the content to live inside the root .openclaw repo, delete the child .git directory first, then add / commit again.')}</div>
          </div>
          <div class="sub-card">
            <strong>${escapeHtml(state.lang === 'zh' ? '方案 3：继续单独同步' : 'Option 3: Sync Separately')}</strong>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '保持子仓库不变，但请在对应子目录里独立执行它自己的 commit / push。' : 'Leave the child repository untouched, but commit and push from inside that child directory separately.')}</div>
          </div>
        </div>
        <div class="command-list" style="margin-top:14px;">
          <div class="muted small">${escapeHtml(state.lang === 'zh' ? '\u5efa\u8bae\u52a0\u5165\u5916\u5c42 .gitignore \u7684\u6a21\u677f' : 'Suggested root .gitignore template')}</div>
          <code>${escapeHtml(gitIgnoreTemplate)}</code>
        </div>
        <div class="guide-grid" style="margin-top:14px;">
          <div class="sub-card panel-focus-target" id="gitignore-preview-card">
            <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
              <div>
                <strong>${escapeHtml(state.lang === 'zh' ? '.gitignore \u5dee\u5f02\u9884\u89c8' : '.gitignore Diff Preview')}</strong>
                <div class="muted small" style="margin-top:8px;">${escapeHtml(gitIgnorePath)}</div>
              </div>
              <span class="pill ${gitIgnoreMissingEntries.length > 0 ? 'warn' : 'success'}">${escapeHtml(gitIgnoreMissingEntries.length > 0 ? (state.lang === 'zh' ? '\u6709\u5f85\u5199\u5165\u89c4\u5219' : 'Changes Pending') : (state.lang === 'zh' ? '\u65e0\u9700\u8ffd\u52a0' : 'Up To Date'))}</span>
            </div>
            <div style="margin-top:12px;">
              <label class="field-label" for="gitignore-mode">${escapeHtml(state.lang === 'zh' ? '写入策略' : 'Write Strategy')}</label>
              <select id="gitignore-mode">${gitIgnoreModeOptions}</select>
            </div>
            <div class="muted small" style="margin-top:12px;">${escapeHtml(state.lang === 'zh' ? '\u4e0b\u9762\u5c55\u793a\u8fd9\u6b21\u4f1a\u8ffd\u52a0\u5230\u5916\u5c42 .gitignore \u7684\u89c4\u5219\u7247\u6bb5\u3002' : 'This is the block that would be appended to the root .gitignore.')}</div>
            <pre style="margin-top:12px;">${escapeHtml(gitIgnoreAppendBlock || (state.lang === 'zh' ? '\u5f53\u524d\u6ca1\u6709\u65b0\u589e\u89c4\u5219\u9700\u8981\u5199\u5165\u3002' : 'No new ignore rules need to be written right now.'))}</pre>
          </div>
          <div class="sub-card">
            <strong>${escapeHtml(state.lang === 'zh' ? '\u89c4\u5219\u547d\u4e2d\u60c5\u51b5' : 'Rule Coverage')}</strong>
            <div class="stack" style="margin-top:12px;">
              <div>
                <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? '\u5df2\u5b58\u5728\u89c4\u5219' : 'Existing Rules')}</div>
                <div class="list">${gitIgnoreExistingHtml}</div>
              </div>
              <div>
                <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? '\u5c06\u65b0\u589e\u89c4\u5219' : 'Rules To Add')}</div>
                <div class="list">${gitIgnoreMissingHtml}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="toolbar tight" style="margin-top:12px;">
          <button class="action-btn" type="button" data-git-action="copy-ignore-template">${state.lang === 'zh' ? '\u590d\u5236\u5ffd\u7565\u6a21\u677f' : 'Copy Ignore Template'}</button>
          <button class="action-btn" type="button" data-git-action="preview-gitignore">${state.lang === 'zh' ? '\u5237\u65b0 .gitignore \u9884\u89c8' : 'Refresh .gitignore Preview'}</button>
          <button class="action-btn primary" type="button" data-git-action="apply-gitignore" ${gitIgnoreMissingEntries.length > 0 ? '' : 'disabled'}>${state.lang === 'zh' ? '\u4e00\u952e\u5199\u5165 .gitignore' : 'Apply To .gitignore'}</button>
          <button class="action-btn" type="button" data-git-action="copy-embedded-guide">${state.lang === 'zh' ? '\u590d\u5236\u5904\u7406\u8bf4\u660e' : 'Copy Guidance'}</button>
        </div>
      </div>
      <div class="grid" style="margin-top:14px;">
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
            ${renderFormField({ name: 'remoteUrl', label: 'Remote URL', value: status.remoteUrl || '', placeholder: 'https://github.com/owner/private-repo.git', fullWidth: true, help: state.lang === 'zh' ? '只支持 GitHub / Gitee，后续 Guard 会强制校验 private。' : 'GitHub / Gitee only. Guard will block public repositories.' })}
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
            ${renderFormField({ name: 'token', label: 'Token', type: 'password', value: '', placeholder: 'ghp_xxx / gitee token', fullWidth: true, help: state.lang === 'zh' ? '这里不会回显已保存的 Token；需要更新时请重新粘贴。' : 'Saved token is never echoed here; paste it again when you need to rotate it.' })}
          </div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn primary" type="button" data-git-action="token">${state.lang === 'zh' ? '保存 Token' : 'Save Token'}</button>
          </div>
        </div>
      </div>
      <div class="grid" style="margin-top:14px;">
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
            <button class="action-btn" type="button" data-git-action="commit" ${status.canCommit ? '' : 'disabled'}>commit</button>
            <button class="action-btn" type="button" data-git-action="push" ${status.canPush ? '' : 'disabled'}>push</button>
            <button class="action-btn" type="button" data-git-action="check-sync">${state.lang === 'zh' ? '检查并同步' : 'Check + Sync'}</button>
            <button class="action-btn primary" type="button" data-git-action="sync" ${status.canSync ? '' : 'disabled'}>sync</button>
          </div>
          <div class="list" style="margin-top:12px;">
            ${allChangedFiles.length
              ? allChangedFiles.map((file) => `
                  <div class="list-item">
                    <div class="row" style="justify-content:space-between; gap:12px;">
                      <strong>${escapeHtml(file)}</strong>
                      <span class="muted small">${escapeHtml(skippedEmbeddedRepos.includes(file) ? (state.lang === 'zh' ? '嵌套仓库' : 'embedded repo') : (stageableChangedFiles.includes(file) ? (state.lang === 'zh' ? '可提交' : 'stageable') : (state.lang === 'zh' ? '待确认' : 'pending')))}</span>
                    </div>
                  </div>
                `).join('')
              : emptyState(state.lang === 'zh' ? '当前没有待同步的本地变更。' : 'No local changes to sync.')}
          </div>
        </div>
      </div>
    `;

    setPanel(t('tabs.git-sync'), t('desc.git-sync'), body);
    applyPendingPanelFocus('git-sync');

    const rememberGitAction = (result, detail) => {
      const ok = result?.success !== false;
      state.gitSyncLastAction = {
        type: ok ? 'success' : 'error',
        message: result?.message || 'OK',
        at: new Date().toISOString(),
        detail: detail ?? result?.output ?? result?.status ?? null,
      };
      showToast(result?.message || 'OK', ok ? 'success' : 'error');
      return ok;
    };

    document.getElementById('gitignore-mode')?.addEventListener('change', (event) => {
      state.gitSyncIgnoreMode = event.target.value === 'exact' ? 'exact' : 'smart';
      loadGitSync();
    });

    document.querySelectorAll('[data-git-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-git-action');
        try {
          if (action === 'refresh-status') {
            await loadGitSync();
            return;
          }
          if (action === 'copy-repo-path') {
            await copyTextValue(status.repoPath, {
              successMessage: state.lang === 'zh' ? '本地目录已复制。' : 'Repository path copied.',
            });
            return;
          }
          if (action === 'copy-remote') {
            await copyTextValue(status.remoteUrl || '', {
              successMessage: state.lang === 'zh' ? '远程地址已复制。' : 'Remote URL copied.',
              emptyMessage: state.lang === 'zh' ? '当前还没有远程地址可复制。' : 'No remote URL to copy yet.',
            });
            return;
          }
          if (action === 'open-remote') {
            if (!status.remoteWebUrl) {
              showToast(state.lang === 'zh' ? '当前没有可打开的远程仓库页面。' : 'No remote repository page is available.', 'error');
              return;
            }
            window.open(status.remoteWebUrl, '_blank');
            return;
          }
          if (action === 'init' || action === 'check' || action === 'push') {
            const result = await postJson(`/api/git-sync/${action === 'check' ? 'check-private' : action}`, {});
            rememberGitAction(result);
            await loadGitSync();
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
            let finalResult = result;
            let detail = result?.status || null;
            if (result?.success !== false && result?.status?.authConfigured) {
              const checkResult = await postJson('/api/git-sync/check-private', {});
              finalResult = {
                ...checkResult,
                success: checkResult?.success !== false,
                message: `${result.message || ''}${result.message && checkResult?.message ? '；' : ''}${checkResult?.message || ''}`,
              };
              detail = {
                connect: result?.status || null,
                privateCheck: checkResult?.status || checkResult?.output || checkResult?.message || null,
              };
            }
            rememberGitAction(finalResult, detail);
            await loadGitSync();
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
            let finalResult = result;
            let detail = result?.status || null;
            if (result?.success !== false && (result?.status?.remoteUrl || status.remoteUrl)) {
              const checkResult = await postJson('/api/git-sync/check-private', {});
              finalResult = {
                ...checkResult,
                success: checkResult?.success !== false,
                message: `${result.message || ''}${result.message && checkResult?.message ? '；' : ''}${checkResult?.message || ''}`,
              };
              detail = {
                token: result?.status || null,
                privateCheck: checkResult?.status || checkResult?.output || checkResult?.message || null,
              };
            }
            rememberGitAction(finalResult, detail);
            await loadGitSync();
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
            rememberGitAction(result, {
              authorizeUrl: result?.output || null,
              status: result?.status || null,
            });
            if (result?.output) {
              try {
                window.open(result.output, '_blank');
              } catch {
                // noop
              }
            }
            await loadGitSync();
            return;
          }
          if (action === 'copy-oauth') {
            if (!oauth.authorizeUrl) {
              showToast(state.lang === 'zh' ? '当前没有可复制的授权地址。' : 'No authorization URL available.', 'error');
              return;
            }
            await copyTextValue(oauth.authorizeUrl, {
              successMessage: state.lang === 'zh' ? '授权地址已复制。' : 'Authorization URL copied.',
            });
            return;
          }
          if (action === 'copy-ignore-template') {
            await copyTextValue(gitIgnoreTemplate, {
              successMessage: state.lang === 'zh' ? '忽略模板已复制。' : 'Ignore template copied.',
              emptyMessage: state.lang === 'zh' ? '当前没有可复制的忽略模板。' : 'No ignore template available.',
            });
            return;
          }
          if (action === 'preview-gitignore') {
            const previewResult = await apiRequest(`/api/git-sync/gitignore-preview?mode=${encodeURIComponent(state.gitSyncIgnoreMode === 'exact' ? 'exact' : 'smart')}`);
            rememberGitAction({
              success: true,
              message: state.lang === 'zh'
                ? (previewResult?.willChange ? '\u5df2\u5237\u65b0 .gitignore \u5dee\u5f02\u9884\u89c8\u3002' : '.gitignore \u9884\u89c8\u5df2\u5237\u65b0\uff0c\u5f53\u524d\u65e0\u9700\u8ffd\u52a0\u89c4\u5219\u3002')
                : (previewResult?.willChange ? '.gitignore diff preview refreshed.' : '.gitignore preview refreshed, no new rules are required.'),
            }, previewResult);
            await loadGitSync();
            return;
          }
          if (action === 'apply-gitignore') {
            const result = await postJson('/api/git-sync/gitignore-apply', { mode: state.gitSyncIgnoreMode === 'exact' ? 'exact' : 'smart' });
            rememberGitAction(result, result?.preview || result?.status || null);
            queuePanelFocus('git-sync', '#gitignore-preview-card');
            await loadGitSync();
            return;
          }
          if (action === 'copy-embedded-guide') {
            await copyTextValue(embeddedRepoGuide, {
              successMessage: state.lang === 'zh' ? '处理说明已复制。' : 'Embedded repository guidance copied.',
            });
            return;
          }
          if (action === 'check-sync') {
            const message = document.querySelector('[name="gitCommitMessage"]')?.value.trim() || '';
            state.gitSyncDraftMessage = message;
            const checkResult = await postJson('/api/git-sync/check-private', {});
            if (checkResult?.success === false) {
              rememberGitAction(checkResult);
              await loadGitSync();
              return;
            }
            const syncResult = await postJson('/api/git-sync/sync', { message });
            rememberGitAction({
              ...syncResult,
              success: syncResult?.success !== false,
              message: `${checkResult.message || ''}${checkResult.message && syncResult?.message ? '；' : ''}${syncResult?.message || ''}`,
            }, {
              privateCheck: checkResult?.status || checkResult?.output || checkResult?.message || null,
              sync: syncResult?.status || syncResult?.output || syncResult?.message || null,
            });
            await loadGitSync();
            return;
          }
          if (action === 'commit' || action === 'sync') {
            const message = document.querySelector('[name="gitCommitMessage"]')?.value.trim() || '';
            state.gitSyncDraftMessage = message;
            const result = await postJson(`/api/git-sync/${action}`, { message });
            rememberGitAction(result);
            await loadGitSync();
            return;
          }
        } catch (error) {
          rememberGitAction({ success: false, message: error.message || String(error) });
          await loadGitSync();
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
    const serviceLogs = await apiRequest('/api/service/logs?lines=200').catch(() => ({ logs: [] }));
    const body = `
      <div class="toolbar tight">
        <button class="chip active" data-logs-target="service">Gateway</button>
        <button class="action-btn" data-logs-action="reload">${escapeHtml(t('reload'))}</button>
      </div>
      <div class="card"><pre>${escapeHtml((serviceLogs.logs || []).join('\n'))}</pre></div>
    `;
    setPanel(t('tabs.logs'), t('desc.logs'), body);
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

