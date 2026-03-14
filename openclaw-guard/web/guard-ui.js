(function () {
  const app = document.getElementById('guard-app');
  if (!app) return;

  const STORAGE_LANG = 'openclaw-guard.lang';
  const STORAGE_TAB = 'openclaw-guard.active-tab';
  const STORAGE_TOKEN = 'openclaw-guard.token';
  const STORAGE_THEME = 'openclaw-guard.theme';
  const STORAGE_OVERVIEW_GUIDE_HIDDEN = 'openclaw-guard.overview-guide-hidden';
  const SUPPORT_ISSUES_URL = 'https://github.com/qingmiao-tech/openclaw-guard/issues/new/choose';
  const THEME_OPTIONS = ['auto', 'light', 'dark'];
  const themeMediaQuery = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  const I18N = {
    zh: {
      appTitle: 'OpenClaw Guard 虾护卫',
      appSubtitle: '给 OpenClaw 加一层更稳、更安全、可恢复的控制台。',
      refresh: '刷新当前页',
      restartGuard: '完整重启 Guard',
      restartGuardWithGateway: 'Guard + Gateway 全重启',
      stopWeb: '一键停后台服务',
      themeLabel: '主题',
      themeAuto: '自动',
      themeLight: '浅色',
      themeDark: '深色',
      notificationReminderView: '提醒',
      notificationTimelineView: '时间线',
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
      login: '登录',
      logout: '退出登录',
      loginTitle: 'OpenClaw Guard 登录',
      loginPasswordLabel: '访问密码',
      loginPasswordPlaceholder: '请输入密码',
      loginBtn: '登录',
      loginLoading: '验证中…',
      loginError: '密码错误，请重试',
      loginHintTitle: '忘记初始化密码？',
      loginHintBody: '如果你没来得及记下第一次启动时的密码，请在本机终端执行下面的命令再次查看。',
      loginHintFallback: '如果命令提示无法回看，通常表示你已经修改过密码，或当前环境早于本机留存功能创建。',
      loginHintCurrent: '如果你已经改过密码，请直接输入修改后的当前密码。',
      loginHintCommandLabel: '本机查看命令',
      changePassword: '修改密码',
      changePwdCurrentLabel: '当前密码',
      changePwdNewLabel: '新密码',
      changePwdConfirmLabel: '确认新密码',
      changePwdMismatch: '两次密码输入不一致',
      changePwdSuccess: '密码已修改，请重新登录',
      changePwdBtn: '确认修改',
      tabs: {
        overview: '首页',
        system: '运维',
        openclaw: 'OpenClaw',
        channels: '渠道',
        ai: '模型',
        models: '模型',
        notifications: '通知',
        agents: '角色',
        sessions: '会话',
        activity: '时间线',
        files: '文件',
        memory: '记忆',
        search: '搜索',
        costs: '成本',
        cron: 'Cron',
        'git-sync': '备份与恢复',
        security: '安全',
        audit: '审计',
        profiles: '预设',
        harden: '加固',
        logs: '日志'
      },
      nav: {
        core: '核心控制台',
        coreHint: '先处理可用性、渠道、模型、安全与同步这些主路径。',
        workspace: '工作区与角色',
        workspaceHint: '角色、文件和搜索放在一起，减少来回切换。',
        runtime: '运行与排查',
        runtimeHint: '会话、日志和通知都围绕日常观察与问题定位。',
        automation: '自动化',
        automationHint: 'Cron 先保留在这里，作为后续扩展能力的稳定入口。',
      },
      fileModes: {
        all: '全部文件',
        memory: '核心记忆',
      },
      desc: {
        overview: '先确认现在能不能用、建议先做什么、以及有没有风险，再决定进入哪个页面。',
        system: '启动、修复和排查 Guard 与 Gateway，并查看本机运行状态。',
        openclaw: '检查 OpenClaw 安装状态，必要时安装、修复或更新。',
        channels: '管理官方消息入口与凭据，确认消息能否正常进入系统。',
        ai: '配置 Provider、主模型和回退模型，让运行策略清晰可控。',
        models: '配置 Provider、主模型和回退模型，让运行策略清晰可控。',
        notifications: '把提醒与时间线放在一起，便于处理告警和回看最近变化。',
        agents: '查看角色工作区、默认角色和关键文档是否就绪。',
        sessions: '观察会话、Token 使用和运行环境，并查看非账单性质的用量估算。',
        activity: '查看最近发生的操作、同步结果和告警时间线。',
        files: '统一处理受控文件与核心记忆文件，不再拆成两个独立页面。',
        memory: '查看和维护 SOUL、USER、AGENTS、MEMORY 等关键记忆文件。',
        search: '在工作区和记忆内容里快速定位配置、记录和文档。',
        costs: '查看内部估算的用量成本，不作为正式账单依据。',
        cron: '查看和维护自动化任务，确认定时执行是否健康。',
        'git-sync': '先保护当前状态，再回到稳定节点；高级 Git 配置仍然保留在这里。',
        security: '集中处理安全检查、权限模式与主机加固建议。',
        audit: '查看安全检查结果，并优先处理高风险问题。',
        profiles: '套用安全预设，快速调整当前机器的权限与行为。',
        harden: '按当前系统获取加固建议和脚本，减少误操作与越权风险。',
        logs: '查看运行日志，定位启动失败、连接异常或执行报错。'
      }
    },
    en: {
      appTitle: 'OpenClaw Guard',
      appSubtitle: 'A safer, steadier, and more recoverable control console for OpenClaw.',
      refresh: 'Refresh',
      restartGuard: 'Full Guard Restart',
      restartGuardWithGateway: 'Restart Guard + Gateway',
      stopWeb: 'Stop Background Web',
      themeLabel: 'Theme',
      themeAuto: 'Auto',
      themeLight: 'Light',
      themeDark: 'Dark',
      notificationReminderView: 'Reminders',
      notificationTimelineView: 'Timeline',
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
      login: 'Login',
      logout: 'Logout',
      loginTitle: 'OpenClaw Guard Login',
      loginPasswordLabel: 'Access Password',
      loginPasswordPlaceholder: 'Enter password',
      loginBtn: 'Login',
      loginLoading: 'Verifying…',
      loginError: 'Incorrect password, please retry',
      loginHintTitle: 'Missed the initial password?',
      loginHintBody: 'If you did not have time to copy the password shown on first startup, run this command in the local terminal to view it again.',
      loginHintFallback: 'If the command says the password is unavailable, the password was either changed already or this environment was initialized before Guard started keeping a local recovery record.',
      loginHintCurrent: 'If you already changed the password, use the current password you set yourself.',
      loginHintCommandLabel: 'Local command',
      changePassword: 'Change Password',
      changePwdCurrentLabel: 'Current Password',
      changePwdNewLabel: 'New Password',
      changePwdConfirmLabel: 'Confirm New Password',
      changePwdMismatch: 'Passwords do not match',
      changePwdSuccess: 'Password changed, please log in again',
      changePwdBtn: 'Confirm Change',
      tabs: {
        overview: 'Home',
        system: 'Operations',
        openclaw: 'OpenClaw',
        channels: 'Channels',
        ai: 'Models',
        models: 'Models',
        notifications: 'Notifications',
        agents: 'Roles',
        sessions: 'Sessions',
        activity: 'Timeline',
        files: 'Files',
        memory: 'Memory',
        search: 'Search',
        costs: 'Costs',
        cron: 'Cron',
        'git-sync': 'Backup & Recovery',
        security: 'Security',
        audit: 'Audit',
        profiles: 'Profiles',
        harden: 'Hardening',
        logs: 'Logs'
      },
      nav: {
        core: 'Core Control',
        coreHint: 'Focus first on availability, channels, models, security, and sync.',
        workspace: 'Workspace & Roles',
        workspaceHint: 'Keep roles, files, and search together so daily work feels calmer.',
        runtime: 'Runtime & Troubleshooting',
        runtimeHint: 'Sessions, logs, and notifications support daily observation and debugging.',
        automation: 'Automation',
        automationHint: 'Cron stays here as a stable entry for operational automation.',
      },
      fileModes: {
        all: 'All Files',
        memory: 'Core Memory',
      },
      desc: {
        overview: 'Answer three questions first: is the system usable, what should happen next, and what risks need attention.',
        system: 'Start, repair, or troubleshoot Guard and Gateway while reviewing local runtime state.',
        openclaw: 'Check whether OpenClaw is installed and repair or update it when needed.',
        channels: 'Manage built-in channels and credentials so messages can reach the system reliably.',
        ai: 'Configure providers, primary routing, and fallback models so the machine stays predictable.',
        models: 'Configure providers, primary routing, and fallback models so the machine stays predictable.',
        notifications: 'Handle reminders and review the recent timeline from a single page.',
        agents: 'Review role workspaces, defaults, and key documents so the team is ready to work.',
        sessions: 'Inspect sessions, token usage, runtime context, and non-billing usage estimates.',
        activity: 'Review the recent timeline of operations, sync results, and warnings.',
        files: 'Manage controlled files and core memory from one place instead of splitting them apart.',
        memory: 'Review and maintain key memory files such as SOUL, USER, AGENTS, and MEMORY.',
        search: 'Search across workspaces and memory files to find the config, note, or document you need.',
        costs: 'Review internal usage estimates only; this is not a billing view.',
        cron: 'Manage scheduled jobs and verify the automation runtime is healthy.',
        'git-sync': 'Protect the current state, return to a stable point, and keep advanced Git controls available.',
        security: 'Keep security checks, permission modes, and host hardening guidance together.',
        audit: 'Review security findings and focus on the highest-risk items first.',
        profiles: 'Apply security profiles to quickly adjust how this machine behaves.',
        harden: 'Get platform-specific hardening guidance and scripts to reduce mistakes and over-permission.',
        logs: 'Inspect runtime logs to diagnose startup failures, connection issues, or execution errors.'
      }
    }
  };

  const TAB_ALIAS_MAP = {
    feishu: 'channels',
    ai: 'models',
    memory: 'files',
    recovery: 'git-sync',
    activity: 'notifications',
    costs: 'sessions',
    audit: 'security',
    profiles: 'security',
    harden: 'security',
  };
  const CORE_TABS = ['overview', 'system', 'openclaw', 'channels', 'models', 'security', 'git-sync'];
  const WORKSPACE_ROLE_TABS = ['agents', 'files', 'search'];
  const RUNTIME_TABS = ['sessions', 'logs', 'notifications'];
  const AUTOMATION_TABS = ['cron'];
  const NAV_GROUPS = [
    { id: 'core', titleKey: 'nav.core', hintKey: 'nav.coreHint', tabs: CORE_TABS, priority: 'primary' },
    { id: 'workspace', titleKey: 'nav.workspace', hintKey: 'nav.workspaceHint', tabs: WORKSPACE_ROLE_TABS, priority: 'secondary' },
    { id: 'runtime', titleKey: 'nav.runtime', hintKey: 'nav.runtimeHint', tabs: RUNTIME_TABS, priority: 'secondary' },
    { id: 'automation', titleKey: 'nav.automation', hintKey: 'nav.automationHint', tabs: AUTOMATION_TABS, priority: 'secondary' },
  ];
  const TAB_ORDER = [...CORE_TABS, ...WORKSPACE_ROLE_TABS, ...RUNTIME_TABS, ...AUTOMATION_TABS];
  const SOFT_CACHE_TTL_MS = 10_000;
  const SECURITY_VIEW_TABS = [
    { id: 'audit', labelKey: 'tabs.audit' },
    { id: 'modes', labelKey: 'tabs.profiles' },
    { id: 'hardening', labelKey: 'tabs.harden' },
  ];
  const GIT_SYNC_VIEW_TABS = [
    { id: 'recovery', label: { zh: '恢复中心', en: 'Recovery' } },
    { id: 'advanced', label: { zh: '高级 Git', en: 'Advanced Git' } },
  ];
  const GIT_SYNC_ADVANCED_TABS = [
    { id: 'overview', label: { zh: '仓库连接', en: 'Repository Setup' } },
    { id: 'scope', label: { zh: '同步范围', en: 'Sync Scope' } },
    { id: 'gitignore', label: { zh: '.gitignore 建议', en: '.gitignore Suggestions' } },
    { id: 'auth', label: { zh: '认证与推送', en: 'Auth & Push' } },
  ];

  const state = {
    lang: localStorage.getItem(STORAGE_LANG) || 'zh',
    activeTab: null,
    authToken: localStorage.getItem(STORAGE_TOKEN) || null,
    authEnabled: null, // null = 尚未检测
    authConfigured: false,
    authInitialPasswordAvailable: null,
    authRevealCommand: 'openclaw-guard auth show-password',
    themePreference: normalizeThemePreference(localStorage.getItem(STORAGE_THEME) || 'auto'),
    overviewGuideHidden: localStorage.getItem(STORAGE_OVERVIEW_GUIDE_HIDDEN) === '1',
    topMenu: null,
    filesPath: '',
    filesMode: 'all',
    currentFile: null,
    fileOriginal: '',
    memoryFile: null,
    memoryOriginal: '',
    filesViewData: null,
    memoryViewData: null,
    memoryFilterQuery: '',
    memoryKindFilter: 'all',
    searchQuery: '',
    searchResults: [],
    notificationFilter: 'all',
    notificationSource: 'all',
    notificationSearchQuery: '',
    notificationDetailMode: 'summary',
    notificationView: 'reminders',
    notificationPage: 1,
    notificationPageSize: 20,
    notificationExpandedRawId: null,
    hardenPlatform: null,
    securityView: 'audit',
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
    gitSyncView: 'recovery',
    gitSyncAdvancedView: 'overview',
    gitSyncPollTimer: null,
    servicePollTimer: null,
    prewarmPollTimer: null,
    openclawPollTimer: null,
    cronPollTimer: null,
    runtimeViewPollTimer: null,
    guardRestartPollTimer: null,
    pendingPanelFocus: null,
    renderCache: {},
    tabRefreshHints: {},
  };

  let activeDialog = null;
  const CACHEABLE_TABS = new Set(['overview', 'system', 'openclaw', 'git-sync', 'security', 'notifications', 'agents', 'sessions', 'files']);

  function normalizeTabId(tabId) {
    const key = String(tabId || '').trim();
    const normalized = TAB_ALIAS_MAP[key] || key;
    return TAB_ORDER.includes(normalized) ? normalized : 'overview';
  }

  function normalizeThemePreference(value) {
    return THEME_OPTIONS.includes(value) ? value : 'auto';
  }

  function normalizeSecurityView(value) {
    return SECURITY_VIEW_TABS.some((item) => item.id === value) ? value : 'audit';
  }

  function normalizeGitSyncView(value) {
    if (['overview', 'scope', 'gitignore', 'auth'].includes(value)) return 'advanced';
    return GIT_SYNC_VIEW_TABS.some((item) => item.id === value) ? value : 'recovery';
  }

  function normalizeGitSyncAdvancedView(value) {
    return GIT_SYNC_ADVANCED_TABS.some((item) => item.id === value) ? value : 'overview';
  }

  function getLegacySecurityView(hashValue) {
    if (hashValue === 'profiles') return 'modes';
    if (hashValue === 'harden') return 'hardening';
    return hashValue === 'audit' ? 'audit' : null;
  }

  function normalizeNotificationView(value) {
    return value === 'timeline' ? 'timeline' : 'reminders';
  }

  function getResolvedTheme(preference = state.themePreference) {
    const normalized = normalizeThemePreference(preference);
    if (normalized === 'light' || normalized === 'dark') return normalized;
    return themeMediaQuery?.matches ? 'dark' : 'light';
  }

  function applyThemePreference(preference = state.themePreference, options = {}) {
    const normalized = normalizeThemePreference(preference);
    state.themePreference = normalized;
    if (options.persist !== false) {
      localStorage.setItem(STORAGE_THEME, normalized);
    }
    document.documentElement.dataset.theme = getResolvedTheme(normalized);
    document.documentElement.dataset.themePreference = normalized;
  }

  function setOverviewGuideHidden(hidden) {
    state.overviewGuideHidden = hidden === true;
    if (state.overviewGuideHidden) {
      localStorage.setItem(STORAGE_OVERVIEW_GUIDE_HIDDEN, '1');
    } else {
      localStorage.removeItem(STORAGE_OVERVIEW_GUIDE_HIDDEN);
    }
  }

  function normalizeFilesMode(mode) {
    return mode === 'memory' ? 'memory' : 'all';
  }

  function getActiveFilesEditorMode() {
    return state.filesMode === 'memory' ? 'memory' : 'file';
  }

  function isMemoryManagedPath(targetPath) {
    const normalized = String(targetPath || '').replace(/\\/g, '/');
    const baseName = normalized.split('/').pop() || '';
    if (['SOUL.md', 'USER.md', 'AGENTS.md', 'MEMORY.md'].includes(baseName)) return true;
    return /\/memory\/.+\.md$/i.test(normalized);
  }

  function getParentDirectory(targetPath) {
    const normalized = String(targetPath || '').replace(/\\/g, '/').replace(/\/+$/, '');
    if (!normalized) return '';
    const parts = normalized.split('/');
    parts.pop();
    return parts.join('/') || '';
  }

  function renderFilesModeActionsHtml() {
    return `
      <div class="toolbar tight">
        <button type="button" class="chip ${state.filesMode === 'all' ? 'active' : ''}" data-files-mode="all">${escapeHtml(t('fileModes.all'))}</button>
        <button type="button" class="chip ${state.filesMode === 'memory' ? 'active' : ''}" data-files-mode="memory">${escapeHtml(t('fileModes.memory'))}</button>
      </div>
    `;
  }

  async function updateFilesMode(nextMode, options = {}) {
    const normalized = normalizeFilesMode(nextMode);
    if (normalized === state.filesMode && state.activeTab !== 'files') {
      state.filesMode = normalized;
      return true;
    }
    if (normalized === state.filesMode) return true;
    if (!options.skipConfirm) {
      const confirmed = await confirmEditorSwitch(getActiveFilesEditorMode());
      if (!confirmed) return false;
    }
    state.filesMode = normalized;
    if (state.activeTab === 'files') {
      await loadFiles();
    }
    return true;
  }

  function bindFilesModeActions() {
    document.querySelectorAll('[data-files-mode]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          await updateFilesMode(button.getAttribute('data-files-mode'));
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

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

  function escapeMultilineHtml(value) {
    return escapeHtml(value).replace(/\n/g, '<br />');
  }

  if (themeMediaQuery) {
    const handleThemeChange = () => {
      if (state.themePreference !== 'auto') return;
      applyThemePreference('auto', { persist: false });
    };
    if (typeof themeMediaQuery.addEventListener === 'function') {
      themeMediaQuery.addEventListener('change', handleThemeChange);
    } else if (typeof themeMediaQuery.addListener === 'function') {
      themeMediaQuery.addListener(handleThemeChange);
    }
  }
  applyThemePreference(state.themePreference, { persist: false });

  function normalizeEditorText(value) {
    return String(value ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  function prettyJson(value) {
    return escapeHtml(JSON.stringify(value ?? {}, null, 2));
  }

  function renderAdvancedDisclosure(options = {}) {
    const title = options.title || (state.lang === 'zh' ? '诊断信息（高级）' : 'Diagnostics (Advanced)');
    const description = options.description || '';
    const bodyHtml = options.bodyHtml || '';
    const actionsHtml = options.actionsHtml || '';
    const open = options.open ? ' open' : '';
    const marginTop = Number.isFinite(options.marginTop) ? options.marginTop : 14;
    return `
      <details class="sub-card" style="margin-top:${marginTop}px;"${open}>
        <summary>${escapeHtml(title)}</summary>
        ${description ? `<div class="muted small" style="margin-top:10px; line-height:1.7;">${escapeHtml(description)}</div>` : ''}
        ${actionsHtml ? `<div class="toolbar tight" style="margin-top:12px;">${actionsHtml}</div>` : ''}
        ${bodyHtml ? `<div style="margin-top:12px;">${bodyHtml}</div>` : ''}
      </details>
    `;
  }

  function renderPageTip(options = {}) {
    const title = options.title || (state.lang === 'zh' ? '操作提示' : 'Quick Tip');
    const body = options.body || '';
    const bodyHtml = options.bodyHtml || '';
    const tone = options.tone === 'warn' ? 'warn' : 'info';
    const icon = tone === 'warn' ? '!' : 'i';
    return `
      <div class="page-tip${tone === 'warn' ? ' tone-warn' : ''}">
        <div class="page-tip-icon" aria-hidden="true">${icon}</div>
        <div class="page-tip-main">
          <div class="page-tip-label">${escapeHtml(title)}</div>
          <div class="page-tip-body">${bodyHtml || escapeHtml(body)}</div>
        </div>
      </div>
    `;
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

  function getLocalDayStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function getNotificationDayKey(value) {
    if (!value) return 'unknown';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'unknown';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatNotificationDayLabel(value) {
    if (!value) return state.lang === 'zh' ? '时间未知' : 'Unknown Date';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return state.lang === 'zh' ? '时间未知' : 'Unknown Date';
    const currentDay = getLocalDayStart(new Date());
    const targetDay = getLocalDayStart(date);
    const diffDays = Math.round((currentDay.getTime() - targetDay.getTime()) / 86_400_000);
    const dateLabel = date.toLocaleDateString(state.lang === 'zh' ? 'zh-CN' : 'en-US', state.lang === 'zh'
      ? { month: 'long', day: 'numeric', weekday: 'short' }
      : { month: 'short', day: 'numeric', weekday: 'short' });
    if (diffDays === 0) {
      return state.lang === 'zh' ? `今天 · ${dateLabel}` : `Today · ${dateLabel}`;
    }
    if (diffDays === 1) {
      return state.lang === 'zh' ? `昨天 · ${dateLabel}` : `Yesterday · ${dateLabel}`;
    }
    if (diffDays > 1 && diffDays < 7) {
      return state.lang === 'zh' ? `${diffDays} 天前 · ${dateLabel}` : `${diffDays} days ago · ${dateLabel}`;
    }
    const fullLabel = date.toLocaleDateString(state.lang === 'zh' ? 'zh-CN' : 'en-US', state.lang === 'zh'
      ? { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }
      : { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' });
    return fullLabel;
  }

  function groupNotificationsByDay(items) {
    const groups = [];
    const map = new Map();
    (items || []).forEach((item) => {
      const key = getNotificationDayKey(item?.createdAt);
      if (!map.has(key)) {
        const group = {
          key,
          label: formatNotificationDayLabel(item?.createdAt),
          items: [],
        };
        map.set(key, group);
        groups.push(group);
      }
      map.get(key).items.push(item);
    });
    return groups;
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

  function formatAgeMs(value) {
    const ms = Number(value);
    if (!Number.isFinite(ms) || ms < 0) return '-';
    if (ms < 1000) return `${Math.round(ms)} ms`;
    if (ms < 60_000) return `${Math.round(ms / 1000)} s`;
    if (ms < 3_600_000) return `${Math.round(ms / 60_000)} ${state.lang === 'zh' ? '分钟' : 'min'}`;
    return `${Math.round(ms / 3_600_000)} ${state.lang === 'zh' ? '小时' : 'h'}`;
  }

  function looksLikeGarbledText(value) {
    const text = String(value || '').trim();
    if (!text) return false;
    const replacementCount = (text.match(/\uFFFD/g) || []).length;
    return replacementCount >= 2;
  }

  function sanitizeDisplayText(value, fallback = '-') {
    const text = String(value || '').trim();
    if (!text) return fallback;
    if (looksLikeGarbledText(text)) {
      return fallback;
    }
    return text;
  }

  async function apiRequest(url, options = {}) {
    const { timeoutMs = 15000, headers = {}, ...fetchOptions } = options;
    const authHeaders = state.authToken ? { Authorization: `Bearer ${state.authToken}` } : {};
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...headers,
        },
        ...fetchOptions,
      });
    } catch (error) {
      clearTimeout(timer);
      if (error?.name === 'AbortError') {
        throw new Error(state.lang === 'zh'
          ? '请求超时。已停止等待本次加载，请稍后重试。'
          : 'The request timed out. Loading was cancelled, please retry.');
      }
      throw error;
    }
    clearTimeout(timer);
    const raw = await response.text();
    let data = raw;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = raw;
    }
    if (response.status === 401) {
      // 令牌失效，清除本地 token 并触发重新登录
      state.authToken = null;
      localStorage.removeItem(STORAGE_TOKEN);
      renderLoginPage();
      throw new Error(state.lang === 'zh' ? '会话已过期，请重新登录' : 'Session expired, please log in again');
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

  function dialogText(key) {
    const zh = {
      confirm: '确认',
      close: '关闭',
      cancel: '取消',
      manualCopy: '手动复制',
      continue: '继续',
      create: '创建',
      inputPlaceholder: '请输入内容',
      inputLabel: '内容',
      confirmTitle: '请确认操作',
      inputTitle: '请输入',
    };
    const en = {
      confirm: 'Confirm',
      close: 'Close',
      cancel: 'Cancel',
      manualCopy: 'Copy Manually',
      continue: 'Continue',
      create: 'Create',
      inputPlaceholder: 'Enter a value',
      inputLabel: 'Value',
      confirmTitle: 'Please confirm',
      inputTitle: 'Enter a value',
    };
    const dict = state.lang === 'zh' ? zh : en;
    return dict[key] || key;
  }

  function closeActiveDialog(result = false) {
    if (!activeDialog?.close) return;
    activeDialog.close(result);
  }

  function showModalDialog(options = {}) {
    if (activeDialog?.close) {
      activeDialog.close(options.replaceResult ?? false);
    }

    return new Promise((resolve) => {
      const tone = options.tone || 'info';
      const showCancel = options.showCancel !== false;
      const allowBackdropClose = options.allowBackdropClose !== false;
      const showCloseButton = options.showCloseButton !== false;
      const inputMode = options.inputMode || 'none';
      const title = options.title || dialogText(inputMode === 'input' ? 'inputTitle' : 'confirmTitle');
      const message = options.message ? `<div class="guard-modal-message">${escapeMultilineHtml(options.message)}</div>` : '';
      const description = options.description ? `<div class="guard-modal-description">${escapeMultilineHtml(options.description)}</div>` : '';
      const inputLabel = options.inputLabel
        ? `<label class="guard-modal-label" for="guard-modal-input">${escapeHtml(options.inputLabel)}</label>`
        : '';
      const promptValue = String(options.value ?? '');
      const promptPlaceholder = escapeHtml(options.placeholder || dialogText('inputPlaceholder'));
      const promptField = inputMode === 'input'
        ? `
          <div class="guard-modal-field">
            ${inputLabel}
            ${options.multiline
              ? `<textarea id="guard-modal-input" class="guard-modal-input" placeholder="${promptPlaceholder}">${escapeHtml(promptValue)}</textarea>`
              : `<input id="guard-modal-input" class="guard-modal-input" type="text" placeholder="${promptPlaceholder}" value="${escapeHtml(promptValue)}" />`}
          </div>
        `
        : '';
      const valueField = inputMode === 'value'
        ? `
          <div class="guard-modal-field">
            ${options.valueLabel ? `<div class="guard-modal-label">${escapeHtml(options.valueLabel)}</div>` : ''}
            <textarea id="guard-modal-value" class="guard-modal-value" readonly>${escapeHtml(promptValue)}</textarea>
          </div>
        `
        : '';
      const cancelText = options.cancelText || dialogText('cancel');
      const confirmText = options.confirmText || dialogText(showCancel ? 'confirm' : 'close');
      const overlay = document.createElement('div');
      overlay.className = 'guard-modal-overlay';
      overlay.innerHTML = `
        <div class="guard-modal-card guard-modal-${escapeHtml(tone)}" role="dialog" aria-modal="true" aria-labelledby="guard-modal-title">
          <div class="guard-modal-head">
            <div class="guard-modal-head-text">
              <div class="guard-modal-kicker">${escapeHtml(options.kicker || dialogText(tone === 'danger' ? 'confirm' : 'continue'))}</div>
              <h3 id="guard-modal-title">${escapeHtml(title)}</h3>
            </div>
            ${showCloseButton ? `<button type="button" class="guard-modal-close" data-dialog-close aria-label="${escapeHtml(dialogText('close'))}">×</button>` : ''}
          </div>
          ${message}
          ${description}
          ${promptField}
          ${valueField}
          <div class="guard-modal-actions">
            ${showCancel ? `<button type="button" class="action-btn" data-dialog-cancel>${escapeHtml(cancelText)}</button>` : ''}
            <button type="button" class="action-btn ${tone === 'danger' ? 'danger' : 'primary'}" data-dialog-confirm>${escapeHtml(confirmText)}</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.classList.add('guard-modal-open');

      const dialog = {
        overlay,
        resolve,
        closed: false,
        close(result) {
          if (dialog.closed) return;
          dialog.closed = true;
          document.removeEventListener('keydown', handleKeydown);
          overlay.remove();
          document.body.classList.remove('guard-modal-open');
          if (activeDialog === dialog) activeDialog = null;
          resolve(result);
        },
      };
      activeDialog = dialog;

      const confirmButton = overlay.querySelector('[data-dialog-confirm]');
      const cancelButton = overlay.querySelector('[data-dialog-cancel]');
      const closeButton = overlay.querySelector('[data-dialog-close]');
      const inputElement = overlay.querySelector('#guard-modal-input');
      const valueElement = overlay.querySelector('#guard-modal-value');

      const confirmDialog = () => {
        if (inputMode === 'input') {
          dialog.close(inputElement ? inputElement.value : '');
          return;
        }
        dialog.close(true);
      };

      const cancelDialog = () => {
        if (inputMode === 'input') {
          dialog.close(null);
          return;
        }
        dialog.close(false);
      };

      function handleKeydown(event) {
        if (event.key === 'Escape') {
          event.preventDefault();
          cancelDialog();
          return;
        }
        if (event.key !== 'Enter') return;
        if (inputMode === 'input' && options.multiline) {
          if (!(event.ctrlKey || event.metaKey)) return;
        }
        if (document.activeElement === cancelButton || document.activeElement === closeButton) return;
        event.preventDefault();
        confirmDialog();
      }

      document.addEventListener('keydown', handleKeydown);
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay && allowBackdropClose) {
          cancelDialog();
        }
      });
      confirmButton?.addEventListener('click', confirmDialog);
      cancelButton?.addEventListener('click', cancelDialog);
      closeButton?.addEventListener('click', cancelDialog);

      setTimeout(() => {
        if (inputElement) {
          inputElement.focus();
          inputElement.select?.();
          return;
        }
        if (valueElement) {
          valueElement.focus();
          valueElement.select?.();
          return;
        }
        confirmButton?.focus();
      }, 0);
    });
  }

  async function showConfirmDialog(options = {}) {
    return showModalDialog({
      title: options.title,
      message: options.message,
      description: options.description,
      confirmText: options.confirmText || dialogText('confirm'),
      cancelText: options.cancelText || dialogText('cancel'),
      tone: options.tone || 'warn',
      showCancel: true,
      showCloseButton: options.showCloseButton,
      allowBackdropClose: options.allowBackdropClose,
      kicker: options.kicker,
    });
  }

  async function showPromptDialog(options = {}) {
    return showModalDialog({
      title: options.title,
      message: options.message,
      description: options.description,
      value: options.value || '',
      inputMode: 'input',
      multiline: !!options.multiline,
      placeholder: options.placeholder,
      inputLabel: options.inputLabel || dialogText('inputLabel'),
      confirmText: options.confirmText || dialogText('confirm'),
      cancelText: options.cancelText || dialogText('cancel'),
      tone: options.tone || 'info',
      showCancel: true,
      showCloseButton: options.showCloseButton,
      allowBackdropClose: options.allowBackdropClose,
      kicker: options.kicker,
    });
  }

  async function showValueDialog(options = {}) {
    return showModalDialog({
      title: options.title,
      message: options.message,
      description: options.description,
      value: options.value || '',
      valueLabel: options.valueLabel,
      inputMode: 'value',
      confirmText: options.confirmText || dialogText('close'),
      tone: options.tone || 'info',
      showCancel: false,
      showCloseButton: true,
      allowBackdropClose: true,
      kicker: options.kicker,
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

  // ── 登录页面 ─────────────────────────────────────────────────────────────────

  function renderLoginHint() {
    const revealCommand = state.authRevealCommand || 'openclaw-guard auth show-password';
    const availabilityMessage = state.authInitialPasswordAvailable === false
      ? t('loginHintFallback')
      : t('loginHintCurrent');
    return `
      <div class="guard-login-note">
        <div class="guard-login-note-title">${escapeHtml(t('loginHintTitle'))}</div>
        <div class="guard-login-note-copy">${escapeHtml(t('loginHintBody'))}</div>
        <div class="guard-login-command">
          <span class="guard-login-command-label">${escapeHtml(t('loginHintCommandLabel'))}</span>
          <code>${escapeHtml(revealCommand)}</code>
        </div>
        <div class="guard-login-note-copy secondary">${escapeHtml(availabilityMessage)}</div>
      </div>
    `;
  }

  function renderLoginPage() {
    app.innerHTML = `
      <div id="guard-login-wrap">
        <div id="guard-login-card">
          <div class="guard-login-toolbar" data-top-controls="login">
            ${renderChromeControls({ includeRefresh: false, includeAccountActions: false })}
          </div>
          <div class="guard-login-logo">
            <img src="/ui/logo.png" alt="OpenClaw Guard" />
          </div>
          <h1>${escapeHtml(t('loginTitle'))}</h1>
          <form id="guard-login-form" autocomplete="on">
            <label for="guard-login-pwd">${escapeHtml(t('loginPasswordLabel'))}</label>
            <input
              id="guard-login-pwd"
              type="password"
              autocomplete="current-password"
              placeholder="${escapeHtml(t('loginPasswordPlaceholder'))}"
              autofocus
            />
            <div id="guard-login-error" class="guard-login-error" style="display:none"></div>
            <button type="submit" id="guard-login-btn">${escapeHtml(t('loginBtn'))}</button>
          </form>
          ${renderLoginHint()}
        </div>
        <div id="guard-toast" class="toast"></div>
      </div>
    `;

    bindTopMenuControls({
      onLanguageChange: () => renderLoginPage(),
    });

    const form = document.getElementById('guard-login-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwdInput = document.getElementById('guard-login-pwd');
      const errDiv = document.getElementById('guard-login-error');
      const btn = document.getElementById('guard-login-btn');
      const password = pwdInput?.value || '';
      btn.disabled = true;
      btn.textContent = t('loginLoading');
      if (errDiv) errDiv.style.display = 'none';
      try {
        const resp = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const result = await resp.json();
        if (result.success && result.token) {
          state.authToken = result.token;
          localStorage.setItem(STORAGE_TOKEN, result.token);
          renderShell();
          loadActiveTab();
        } else if (resp.status === 429 && result.retryAfter) {
          // 速率限制：显示倒计时
          let remaining = result.retryAfter;
          const rateLimitMsg = () => state.lang === 'zh'
            ? `尝试过于频繁，请 ${remaining} 秒后重试`
            : `Too many attempts, retry in ${remaining}s`;
          if (errDiv) { errDiv.textContent = rateLimitMsg(); errDiv.style.display = ''; }
          btn.disabled = true;
          const countdown = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
              clearInterval(countdown);
              btn.disabled = false;
              btn.textContent = t('loginBtn');
              if (errDiv) errDiv.style.display = 'none';
            } else {
              if (errDiv) errDiv.textContent = rateLimitMsg();
              btn.textContent = `${remaining}s`;
            }
          }, 1000);
        } else {
          if (errDiv) { errDiv.textContent = result.error || t('loginError'); errDiv.style.display = ''; }
          btn.disabled = false;
          btn.textContent = t('loginBtn');
          pwdInput?.focus();
        }
      } catch {
        if (errDiv) { errDiv.textContent = t('loginError'); errDiv.style.display = ''; }
        btn.disabled = false;
        btn.textContent = t('loginBtn');
      }
    });
  }

  function showChangePwdDialog() {
    closeActiveDialog(false);
    const overlay = document.createElement('div');
    overlay.id = 'guard-changepwd-overlay';
    overlay.innerHTML = `
      <div id="guard-changepwd-card">
        <h2>${escapeHtml(t('changePassword'))}</h2>
        <label>${escapeHtml(t('changePwdCurrentLabel'))}</label>
        <input id="cpwd-current" type="password" autocomplete="current-password" />
        <label>${escapeHtml(t('changePwdNewLabel'))}</label>
        <input id="cpwd-new" type="password" autocomplete="new-password" />
        <label>${escapeHtml(t('changePwdConfirmLabel'))}</label>
        <input id="cpwd-confirm" type="password" autocomplete="new-password" />
        <div id="cpwd-error" class="guard-login-error" style="display:none"></div>
        <div class="guard-changepwd-actions">
          <button id="cpwd-cancel" type="button" class="action-btn">${escapeHtml(t('cancel'))}</button>
          <button id="cpwd-submit" type="button" class="action-btn primary">${escapeHtml(t('changePwdBtn'))}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.getElementById('cpwd-cancel')?.addEventListener('click', close);
    document.getElementById('cpwd-submit')?.addEventListener('click', async () => {
      const current = document.getElementById('cpwd-current')?.value || '';
      const newPwd = document.getElementById('cpwd-new')?.value || '';
      const confirm = document.getElementById('cpwd-confirm')?.value || '';
      const errDiv = document.getElementById('cpwd-error');
      if (newPwd !== confirm) {
        if (errDiv) { errDiv.textContent = t('changePwdMismatch'); errDiv.style.display = ''; }
        return;
      }
      try {
        const result = await apiRequest('/api/auth/change-password', {
          method: 'POST',
          body: JSON.stringify({ currentPassword: current, newPassword: newPwd }),
        });
        if (result.success) {
          close();
          showToast(t('changePwdSuccess'));
          // 修改密码后服务端使所有 session 失效，本地也清除
          setTimeout(() => {
            state.authToken = null;
            localStorage.removeItem(STORAGE_TOKEN);
            renderLoginPage();
          }, 1200);
        } else {
          if (errDiv) { errDiv.textContent = result.error || t('loginError'); errDiv.style.display = ''; }
        }
      } catch (err) {
        if (errDiv) { errDiv.textContent = err.message || t('loginError'); errDiv.style.display = ''; }
      }
    });
  }

  function preserveCurrentTabSnapshot(tabId) {
    if (!CACHEABLE_TABS.has(tabId)) return;
    if (tabId === 'files') {
      cacheFilesPanelFromState();
      return;
    }
    rememberCurrentPanelRender(tabId);
  }

  function setActiveTab(tabId, updateHash = true) {
    const nextTab = normalizeTabId(tabId);
    const previousTab = state.activeTab;
    if (previousTab && previousTab !== nextTab) {
      preserveCurrentTabSnapshot(previousTab);
    }
    state.activeTab = nextTab;
    state.topMenu = null;
    localStorage.setItem(STORAGE_TAB, state.activeTab);
    if (updateHash) {
      history.replaceState(null, '', `#${state.activeTab}`);
    }
    document.querySelectorAll('[data-tab]').forEach((button) => {
      const isActive = button.getAttribute('data-tab') === state.activeTab;
      button.classList.toggle('active', isActive);
    });
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
    const attemptFocus = (remaining = 8) => {
      const target = document.querySelector(pending.selector);
      if (target) {
        state.pendingPanelFocus = null;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('panel-highlight');
        setTimeout(() => target.classList.remove('panel-highlight'), 1800);
        return;
      }
      if (remaining <= 0) {
        state.pendingPanelFocus = null;
        return;
      }
      setTimeout(() => attemptFocus(remaining - 1), 120);
    };
    setTimeout(() => {
      if (!state.pendingPanelFocus || state.pendingPanelFocus !== pending) return;
      attemptFocus();
    }, 80);
  }

  function metricCard(title, value, detail, pillClass = '') {
    return `<div class="card"><div class="row" style="justify-content:space-between"><h3>${escapeHtml(title)}</h3>${pillClass ? `<span class="pill ${pillClass}">${escapeHtml(detail || '')}</span>` : ''}</div><div class="metric">${escapeHtml(value)}</div>${pillClass ? '' : `<p>${escapeHtml(detail || '')}</p>`}</div>`;
  }

  function renderOverviewGuideStep(step, index, total) {
    const toneClass = step.complete ? 'is-complete' : step.current ? 'is-current' : '';
    const stateLabel = step.complete
      ? (state.lang === 'zh' ? '已完成' : 'Done')
      : step.current
        ? (state.lang === 'zh' ? '现在去做' : 'Do This Next')
        : (state.lang === 'zh' ? '稍后补齐' : 'Later');
    const statePill = step.complete ? 'success' : step.current ? 'warn' : '';
    return `
      <div class="overview-step ${toneClass}">
        <div class="overview-step-index">${index + 1}</div>
        <div class="overview-step-main">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <strong>${escapeHtml(step.title)}</strong>
            <span class="pill ${statePill}">${escapeHtml(stateLabel)}</span>
          </div>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(step.body)}</div>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(step.meta || (state.lang === 'zh' ? `步骤 ${index + 1} / ${total}` : `Step ${index + 1} / ${total}`))}</div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn ${step.current ? 'primary' : ''}" type="button" data-overview-open-tab="${escapeHtml(step.tabId)}" ${step.selector ? `data-overview-focus="${escapeHtml(step.selector)}"` : ''}>${escapeHtml(step.label)}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderOverviewPathCard(item) {
    const pillClass = item.complete ? 'success' : item.tone === 'warn' ? 'warn' : item.tone === 'danger' ? 'danger' : '';
    const pillLabel = item.complete
      ? (state.lang === 'zh' ? '已就绪' : 'Ready')
      : item.tone === 'warn' || item.tone === 'danger'
        ? (state.lang === 'zh' ? '待补齐' : 'Needs Setup')
        : (state.lang === 'zh' ? '可继续优化' : 'Can Improve');
    return `
      <div class="card guide-card tone-${escapeHtml(item.complete ? 'success' : item.tone || 'info')}">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <div>
            <div class="overview-kicker">${escapeHtml(item.kicker)}</div>
            <h3>${escapeHtml(item.title)}</h3>
          </div>
          <span class="pill ${pillClass}">${escapeHtml(pillLabel)}</span>
        </div>
        <p>${escapeHtml(item.body)}</p>
        ${item.meta ? `<div class="muted small" style="margin-top:8px;">${escapeHtml(item.meta)}</div>` : ''}
        <div class="toolbar tight" style="margin-top:14px;">
          <button class="action-btn ${item.complete ? '' : 'primary'}" type="button" data-overview-open-tab="${escapeHtml(item.tabId)}" ${item.selector ? `data-overview-focus="${escapeHtml(item.selector)}"` : ''}>${escapeHtml(item.label)}</button>
        </div>
      </div>
    `;
  }

  function renderCacheSummaryCard(cache, title) {
    if (!cache) return '';
    const statusLabel = cache.refreshing
      ? (state.lang === 'zh' ? '后台刷新中' : 'Refreshing in background')
      : cache.stale
        ? (state.lang === 'zh' ? '使用旧快照' : 'Serving stale snapshot')
        : (state.lang === 'zh' ? '热快照' : 'Hot snapshot');
    const pillClass = cache.refreshing || cache.stale ? 'warn' : 'success';
    const details = [
      `${state.lang === 'zh' ? '快照时间' : 'Snapshot'}: ${formatDate(cache.generatedAt)}`,
      `${state.lang === 'zh' ? '快照年龄' : 'Age'}: ${formatAgeMs(cache.ageMs)}`,
      `${state.lang === 'zh' ? '最近动作' : 'Last action'}: ${cache.lastReason || '-'}`,
    ];
    return `
      <div class="card accent-info">
        <div class="row" style="justify-content:space-between; align-items:center;">
          <h3>${escapeHtml(title)}</h3>
          <span class="pill ${pillClass}">${escapeHtml(statusLabel)}</span>
        </div>
        <div class="muted small" style="margin-top:8px;">${escapeHtml(details.join(' · '))}</div>
        ${cache.lastError ? `<div class="status warn" style="margin-top:12px;">${escapeHtml(cache.lastError)}</div>` : ''}
      </div>
    `;
  }

  function normalizeRepoPath(value) {
    let text = String(value || '')
      .trim();
    if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith('\'') && text.endsWith('\''))) {
      text = text.slice(1, -1);
    }
    return text
      .replace(/\\"/g, '"')
      .replace(/\\/g, '/')
      .replace(/^\.[/\\]/, '')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '');
  }

  function getRunStateLabel(running) {
    if (running) {
      return state.lang === 'zh' ? '运行中' : 'RUNNING';
    }
    return state.lang === 'zh' ? '未运行' : 'STOPPED';
  }

  function getInstallStateLabel(installed) {
    if (installed) {
      return state.lang === 'zh' ? '已安装' : 'INSTALLED';
    }
    return state.lang === 'zh' ? '未安装' : 'MISSING';
  }

  function getReadyStateLabel(ready) {
    if (ready) {
      return state.lang === 'zh' ? '就绪' : 'READY';
    }
    return state.lang === 'zh' ? '缺失' : 'MISSING';
  }

  function translateMappedLabel(value, map, fallback = '-') {
    const text = sanitizeDisplayText(value, '').trim();
    if (!text) return fallback;
    const normalized = text.toLowerCase();
    return map[normalized]?.[state.lang] || text;
  }

  function joinDisplayParts(parts, fallback = '-') {
    const values = (parts || []).map((item) => String(item || '').trim()).filter(Boolean);
    return values.length ? values.join(' / ') : fallback;
  }

  function getRuntimeServiceLabel(value) {
    return translateMappedLabel(value, {
      'scheduled task': { zh: '计划任务', en: 'Scheduled Task' },
      launchagent: { zh: 'LaunchAgent', en: 'LaunchAgent' },
      systemd: { zh: 'systemd', en: 'systemd' },
      'windows service': { zh: 'Windows 服务', en: 'Windows Service' },
      launchctl: { zh: 'launchctl', en: 'launchctl' },
      service: { zh: '服务', en: 'Service' },
    });
  }

  function getRuntimeLoadedStateLabel(value) {
    return translateMappedLabel(value, {
      registered: { zh: '已登记', en: 'Registered' },
      missing: { zh: '缺失', en: 'Missing' },
      unknown: { zh: '未知', en: 'Unknown' },
      loaded: { zh: '已加载', en: 'Loaded' },
      active: { zh: '活跃', en: 'Active' },
      inactive: { zh: '未激活', en: 'Inactive' },
      detected: { zh: '已检测', en: 'Detected' },
    });
  }

  function getRuntimeShortLabel(value) {
    const text = sanitizeDisplayText(value, '').trim();
    if (!text) return '-';
    const unknownMatch = text.match(/^unknown(?:\s*\((.+)\))?$/i);
    if (unknownMatch) {
      const detail = sanitizeDisplayText(unknownMatch[1], '').trim();
      if (detail) {
        return state.lang === 'zh' ? `未知（${detail}）` : `Unknown (${detail})`;
      }
      return state.lang === 'zh' ? '未知' : 'Unknown';
    }
    return translateMappedLabel(text, {
      running: { zh: '运行中', en: 'Running' },
      stopped: { zh: '未运行', en: 'Stopped' },
      pending: { zh: '等待中', en: 'Pending' },
      idle: { zh: '空闲', en: 'Idle' },
      launchagent: { zh: 'LaunchAgent', en: 'LaunchAgent' },
      'scheduled task': { zh: '计划任务', en: 'Scheduled Task' },
      systemd: { zh: 'systemd', en: 'systemd' },
      launchctl: { zh: 'launchctl', en: 'launchctl' },
      detected: { zh: '已检测', en: 'Detected' },
    });
  }

  function getRuntimeSourceLabel(value) {
    return translateMappedLabel(value, {
      'pid-file': { zh: 'PID 文件', en: 'PID File' },
      'port-scan': { zh: '端口探测', en: 'Port Scan' },
      none: { zh: '未记录', en: 'None' },
    });
  }

  function getWebBackgroundScenarioLabel(value) {
    return translateMappedLabel(value, {
      'managed-running': { zh: '托管运行中', en: 'Managed & Running' },
      'unmanaged-running': { zh: '未托管实例运行中', en: 'Running Without Guard Management' },
      stopped: { zh: '未运行', en: 'Stopped' },
    });
  }

  function getWebBackgroundNextActionLabel(value) {
    return translateMappedLabel(value, {
      'open-workbench': { zh: '直接访问工作台', en: 'Open The Workbench' },
      'adopt-or-stop': { zh: '先接管或先停止', en: 'Adopt Or Stop First' },
      'start-web': { zh: '启动后台服务', en: 'Start Background Service' },
    });
  }

  function getWebBackgroundNextActionHelp(value) {
    const map = {
      'open-workbench': {
        zh: '当前实例已被虾护卫托管，可直接打开工作台或按需停止。',
        en: 'The current instance is managed by Guard. Open the workbench directly or stop it if needed.',
      },
      'adopt-or-stop': {
        zh: '当前端口上已有未托管实例，请先决定接管它，或先停止后再启动新实例。',
        en: 'There is already an unmanaged instance on this port. Adopt it first, or stop it before starting a new one.',
      },
      'start-web': {
        zh: '当前未检测到 Guard Web 进程，建议直接启动后台服务。',
        en: 'No Guard Web instance is running right now. Start the background service first.',
      },
    };
    return map[value]?.[state.lang] || '-';
  }

  function getRuntimeAlertLevelLabel(value) {
    return translateMappedLabel(value, {
      info: { zh: '提示', en: 'Info' },
      warning: { zh: '警告', en: 'Warning' },
      error: { zh: '错误', en: 'Error' },
      critical: { zh: '严重', en: 'Critical' },
    });
  }

  function getRuntimeAlertPresentation(item) {
    const code = String(item?.code || '').trim();
    const message = String(item?.message || '').trim();
    const mapped = {
      'gateway-unreachable': {
        zh: {
          title: 'Gateway 无法连接',
          message: 'Guard 当前无法连到 Gateway。请先去运维页面检查 Gateway 地址、令牌和运行状态。',
        },
        en: {
          title: 'Gateway Is Unreachable',
          message: 'Guard cannot reach the Gateway right now. Check the Gateway address, token, and service state from Operations first.',
        },
      },
      'security-audit-critical': {
        zh: {
          title: '安全审计存在严重风险',
          message: '安全审计存在严重失败项，请尽快处理。',
        },
        en: {
          title: 'Security Audit Has Critical Findings',
          message: 'The security audit reports critical findings that should be handled as soon as possible.',
        },
      },
      'security-audit-warn': {
        zh: {
          title: '安全审计有提醒项',
          message: '安全审计存在警告项，建议尽快复核。',
        },
        en: {
          title: 'Security Audit Needs Review',
          message: 'The security audit reports warnings that should be reviewed soon.',
        },
      },
    };
    const localized = mapped[code]?.[state.lang];
    return {
      title: localized?.title || code || (state.lang === 'zh' ? '运行态告警' : 'Runtime Alert'),
      message: localized?.message || message || '-',
    };
  }

  function getUpdateChannelLabel(value) {
    return translateMappedLabel(value, {
      stable: { zh: '稳定版', en: 'Stable' },
      beta: { zh: '测试版', en: 'Beta' },
      nightly: { zh: '夜间版', en: 'Nightly' },
      canary: { zh: 'Canary', en: 'Canary' },
      default: { zh: '默认', en: 'Default' },
    });
  }

  function getUpdateDepsStatusLabel(value) {
    return translateMappedLabel(value, {
      unknown: { zh: '未知', en: 'Unknown' },
      current: { zh: '最新', en: 'Current' },
      outdated: { zh: '可更新', en: 'Outdated' },
      missing: { zh: '缺失', en: 'Missing' },
      error: { zh: '异常', en: 'Error' },
    });
  }

  function getInstallKindLabel(value) {
    return translateMappedLabel(value, {
      package: { zh: '包安装', en: 'Package' },
      binary: { zh: '二进制', en: 'Binary' },
      source: { zh: '源码', en: 'Source' },
      portable: { zh: '便携版', en: 'Portable' },
    });
  }

  function getMemoryBackendLabel(value) {
    return translateMappedLabel(value, {
      builtin: { zh: '内置', en: 'Builtin' },
      none: { zh: '无', en: 'None' },
      sqlite: { zh: 'SQLite', en: 'SQLite' },
      postgres: { zh: 'Postgres', en: 'Postgres' },
      chroma: { zh: 'Chroma', en: 'Chroma' },
    });
  }

  function getMemorySearchModeLabel(value) {
    return translateMappedLabel(value, {
      'fts-only': { zh: '仅 FTS', en: 'FTS Only' },
      hybrid: { zh: '混合检索', en: 'Hybrid' },
      'vector-only': { zh: '仅向量', en: 'Vector Only' },
      auto: { zh: '自动', en: 'Auto' },
      none: { zh: '无', en: 'None' },
    });
  }

  function getPrewarmTriggerLabel(value) {
    return translateMappedLabel(value, {
      'server-start': { zh: '服务启动后触发', en: 'Server Startup Trigger' },
      startup: { zh: '启动后触发', en: 'Startup Trigger' },
      manual: { zh: '手动触发', en: 'Manual Trigger' },
      'web-manual': { zh: '网页手动触发', en: 'Web Manual Trigger' },
      'cli-manual': { zh: 'CLI 手动触发', en: 'CLI Manual Trigger' },
      api: { zh: 'API 触发', en: 'API Trigger' },
      scheduled: { zh: '计划触发', en: 'Scheduled Trigger' },
      boot: { zh: '启动链路', en: 'Boot Flow' },
    });
  }

  function getLocalizedServiceSummary(service) {
    return {
      label: getRuntimeServiceLabel(service?.label),
      loadedText: getRuntimeLoadedStateLabel(service?.loadedText),
      runtimeShort: getRuntimeShortLabel(service?.runtimeShort),
    };
  }

  function getNotificationSourceLabel(source) {
    const key = String(source || '').trim();
    const map = {
      'git-sync': { zh: '备份与恢复', en: 'Backup & Recovery' },
      'cron-ui': { zh: 'Cron', en: 'Cron' },
      'runtime': { zh: '运行态', en: 'Runtime' },
      'service': { zh: '服务', en: 'Service' },
    };
    return map[key]?.[state.lang] || key || '-';
  }

  function getNotificationTypeLabel(type) {
    const key = String(type || '').trim();
    const map = {
      'git-sync': { zh: '恢复事件', en: 'Recovery Event' },
      'cron': { zh: 'Cron 事件', en: 'Cron Event' },
      'service': { zh: '服务事件', en: 'Service Event' },
      'runtime-warning': { zh: '运行告警', en: 'Runtime Warning' },
      session: { zh: '会话事件', en: 'Session Event' },
      sessions: { zh: '会话事件', en: 'Session Event' },
      file: { zh: '文件事件', en: 'File Event' },
      memory: { zh: '记忆事件', en: 'Memory Event' },
    };
    return map[key]?.[state.lang] || key || '-';
  }

  function getNotificationSeverityLabel(severity) {
    const key = String(severity || '').trim();
    const map = {
      info: { zh: '提示', en: 'Info' },
      success: { zh: '成功', en: 'Success' },
      warning: { zh: '警告', en: 'Warning' },
      error: { zh: '错误', en: 'Error' },
    };
    return map[key]?.[state.lang] || key || '-';
  }

  function getSessionStatusLabel(value) {
    return translateMappedLabel(value, {
      active: { zh: '进行中', en: 'Active' },
      running: { zh: '运行中', en: 'Running' },
      idle: { zh: '空闲', en: 'Idle' },
      pending: { zh: '等待中', en: 'Pending' },
      paused: { zh: '已暂停', en: 'Paused' },
      stopped: { zh: '已停止', en: 'Stopped' },
      closed: { zh: '已关闭', en: 'Closed' },
      completed: { zh: '已完成', en: 'Completed' },
      finished: { zh: '已完成', en: 'Completed' },
      failed: { zh: '失败', en: 'Failed' },
      error: { zh: '异常', en: 'Error' },
    });
  }

  function getSessionStatusClass(value) {
    const key = String(value || '').trim().toLowerCase();
    if (['active', 'running', 'completed', 'finished'].includes(key)) return 'success';
    if (['pending', 'paused', 'idle'].includes(key)) return 'warn';
    if (['failed', 'error'].includes(key)) return 'danger';
    return '';
  }

  function getActivityTypeLabel(value) {
    return translateMappedLabel(value, {
      'runtime-warning': { zh: '运行告警', en: 'Runtime Warning' },
      'git-sync': { zh: '备份与恢复', en: 'Backup & Recovery' },
      cron: { zh: '定时任务', en: 'Cron Job' },
      service: { zh: '服务操作', en: 'Service Action' },
      session: { zh: '会话事件', en: 'Session Event' },
      sessions: { zh: '会话事件', en: 'Session Event' },
      file: { zh: '文件操作', en: 'File Action' },
      memory: { zh: '记忆文件', en: 'Memory File' },
      audit: { zh: '安全审计', en: 'Security Audit' },
    });
  }

  function getActivityTypeClass(value) {
    const key = String(value || '').trim().toLowerCase();
    if (['runtime-warning', 'warning'].includes(key)) return 'warn';
    if (['error', 'failed'].includes(key)) return 'danger';
    if (['git-sync', 'service', 'cron', 'session', 'sessions', 'file', 'memory'].includes(key)) return 'success';
    return '';
  }

  function getCronJobStatusLabel(value, enabled) {
    const key = String(value || '').trim().toLowerCase();
    if (!key) {
      return enabled === false
        ? (state.lang === 'zh' ? '已停用' : 'Disabled')
        : (state.lang === 'zh' ? '已启用' : 'Enabled');
    }
    return translateMappedLabel(key, {
      enabled: { zh: '已启用', en: 'Enabled' },
      disabled: { zh: '已停用', en: 'Disabled' },
      running: { zh: '执行中', en: 'Running' },
      queued: { zh: '排队中', en: 'Queued' },
      pending: { zh: '等待中', en: 'Pending' },
      paused: { zh: '已暂停', en: 'Paused' },
      success: { zh: '成功', en: 'Success' },
      completed: { zh: '已完成', en: 'Completed' },
      failed: { zh: '失败', en: 'Failed' },
      error: { zh: '异常', en: 'Error' },
    }, enabled === false
      ? (state.lang === 'zh' ? '已停用' : 'Disabled')
      : (state.lang === 'zh' ? '已启用' : 'Enabled'));
  }

  function getCronJobStatusClass(value, enabled) {
    const key = String(value || '').trim().toLowerCase();
    if (['running', 'success', 'completed', 'enabled'].includes(key)) return 'success';
    if (['queued', 'pending', 'paused', 'disabled'].includes(key) || enabled === false) return 'warn';
    if (['failed', 'error'].includes(key)) return 'danger';
    return enabled === false ? 'warn' : '';
  }

  function getAuditStatusLabel(value) {
    return translateMappedLabel(value, {
      pass: { zh: '通过', en: 'Pass' },
      warn: { zh: '警告', en: 'Warning' },
      fail: { zh: '失败', en: 'Fail' },
      info: { zh: '提示', en: 'Info' },
    });
  }

  function getAuditStatusClass(value) {
    const key = String(value || '').trim().toLowerCase();
    if (key === 'pass') return 'success';
    if (key === 'warn') return 'warn';
    if (key === 'fail') return 'danger';
    return '';
  }

  function getRiskLevelLabel(value) {
    return translateMappedLabel(value, {
      low: { zh: '低风险', en: 'Low Risk' },
      medium: { zh: '中风险', en: 'Medium Risk' },
      high: { zh: '高风险', en: 'High Risk' },
      critical: { zh: '高危', en: 'Critical' },
      strict: { zh: '严格', en: 'Strict' },
      balanced: { zh: '平衡', en: 'Balanced' },
      relaxed: { zh: '宽松', en: 'Relaxed' },
    });
  }

  function getNotificationMetaList(metaValue) {
    if (!Array.isArray(metaValue)) return [];
    return uniqueItems(metaValue.map((item) => normalizeRepoPath(item)).filter(Boolean));
  }

  function getNotificationCountFromMessage(message, pattern) {
    const match = String(message || '').match(pattern);
    const count = Number(match?.[1] || NaN);
    return Number.isFinite(count) ? count : null;
  }

  function formatNotificationPathPreview(paths, options = {}) {
    const items = uniqueItems((paths || []).map((item) => normalizeRepoPath(item)).filter(Boolean));
    if (!items.length) {
      return options.emptyText || (state.lang === 'zh' ? '未提供路径详情。' : 'No path details were provided.');
    }
    const limit = Number.isFinite(options.limit) ? options.limit : 3;
    const visible = items.slice(0, limit);
    if (items.length <= limit) return visible.join(', ');
    return state.lang === 'zh'
      ? `${visible.join('、')} 等 ${items.length} 项`
      : `${visible.join(', ')} and ${items.length} total`;
  }

  function getNotificationPresentation(item) {
    const rawTitle = String(item?.title || '').trim();
    const rawMessage = String(item?.message || '').trim();
    const meta = item?.meta || {};
    const embeddedRepos = getNotificationMetaList(meta.embeddedRepos);
    const missingEntries = getNotificationMetaList(meta.missingEntries);
    const changedCount = getNotificationCountFromMessage(rawMessage, /There are\s+(\d+)\s+(?:stageable\s+root-repo\s+)?(?:changed files|changes?)\s+ready/i);
    const oauthAccountMatch = rawMessage.match(/^(github|gitee)\s+account:\s+(.+)$/i);
    const titleMap = {
      'Git sync repository initialized': {
        zh: '备份与恢复仓库已初始化',
        en: 'Protection repository initialized',
      },
      'Remote repository connected': {
        zh: '远程仓库已连接',
        en: 'Remote repository connected',
      },
      'Git authentication saved': {
        zh: '保护凭证已保存',
        en: 'Protection credentials saved',
      },
      'Private repository check passed': {
        zh: '私有仓校验通过',
        en: 'Private repository check passed',
      },
      'Private repository check failed': {
        zh: '私有仓校验失败',
        en: 'Private repository check failed',
      },
      'Git sync commit skipped': {
        zh: '本次保护提交已跳过',
        en: 'Protection commit skipped',
      },
      'Local commit succeeded': {
        zh: '本地提交成功',
        en: 'Local commit succeeded',
      },
      'Remote push failed': {
        zh: '远程推送失败',
        en: 'Remote push failed',
      },
      'Remote push succeeded': {
        zh: '远程推送成功',
        en: 'Remote push succeeded',
      },
      'Recovery point saved locally': {
        zh: '恢复点已保存在本机',
        en: 'Recovery point saved locally',
      },
      'Recovery point saved and synced': {
        zh: '恢复点已保存并上云',
        en: 'Recovery point saved and synced',
      },
      'Restore completed': {
        zh: '恢复已完成',
        en: 'Restore completed',
      },
      'OAuth callback verification failed': {
        zh: 'OAuth 回调校验失败',
        en: 'OAuth callback verification failed',
      },
      'OAuth completed successfully': {
        zh: 'OAuth 已完成',
        en: 'OAuth completed successfully',
      },
      'OAuth failed': {
        zh: 'OAuth 失败',
        en: 'OAuth failed',
      },
      'OAuth startup failed': {
        zh: 'OAuth 启动失败',
        en: 'OAuth startup failed',
      },
      'OAuth timed out': {
        zh: 'OAuth 已超时',
        en: 'OAuth timed out',
      },
      'OAuth started': {
        zh: '已启动 OAuth 授权',
        en: 'OAuth started',
      },
      'Cron action succeeded': {
        zh: 'Cron 操作成功',
        en: 'Cron action succeeded',
      },
      'Cron action failed': {
        zh: 'Cron 操作失败',
        en: 'Cron action failed',
      },
      'Runtime warning': {
        zh: '运行态告警',
        en: 'Runtime warning',
      },
    };

    let title = titleMap[rawTitle]?.[state.lang] || rawTitle;
    let message = rawMessage;

    if (rawTitle === 'Detected unsynced .openclaw changes') {
      title = state.lang === 'zh' ? '检测到 .openclaw 有未同步改动' : rawTitle;
      if (changedCount !== null) {
        message = state.lang === 'zh'
          ? `当前有 ${formatNumber(changedCount)} 项可纳入外层仓库的变更，已经可以提交并推送。`
          : `There are ${formatNumber(changedCount)} stageable root-repo changes ready to commit and push.`;
      }
    } else if (rawTitle === 'Embedded Git repositories detected') {
      title = state.lang === 'zh' ? '检测到嵌套 Git 仓库' : rawTitle;
      if (embeddedRepos.length) {
        message = state.lang === 'zh'
          ? `发现 ${formatNumber(embeddedRepos.length)} 个嵌套仓库：${formatNotificationPathPreview(embeddedRepos)}。请单独同步，或加入外层 .gitignore。`
          : `Detected ${formatNumber(embeddedRepos.length)} embedded repositories: ${formatNotificationPathPreview(embeddedRepos)}. Sync them separately or add them to the root .gitignore.`;
      }
    } else if (rawTitle === '.gitignore updated for embedded repositories') {
      const ignoreCount = missingEntries.length || getNotificationCountFromMessage(rawMessage, /Added\s+(\d+)\s+ignore rules/i);
      title = state.lang === 'zh' ? '已更新嵌套仓库忽略规则' : rawTitle;
      if (ignoreCount || embeddedRepos.length) {
        message = state.lang === 'zh'
          ? `已将 ${formatNumber(ignoreCount || 0)} 条 .gitignore 规则写入外层仓库，覆盖 ${formatNumber(embeddedRepos.length)} 个嵌套仓库。`
          : `Added ${formatNumber(ignoreCount || 0)} .gitignore rules for ${formatNumber(embeddedRepos.length)} embedded repositories in the root repo.`;
      }
    } else if (rawTitle === 'Remote repository connected') {
      message = state.lang === 'zh'
        ? `已绑定远程仓库：${rawMessage || '-'}`
        : rawMessage;
    } else if (rawTitle === 'Git sync repository initialized') {
      const updatedPath = rawMessage.match(/updated\s+(.+)$/i)?.[1] || '';
      message = state.lang === 'zh'
        ? `已经准备好备份与恢复仓库${updatedPath ? `，并更新 ${updatedPath}` : ''}。`
        : rawMessage;
    } else if (rawTitle === 'Git authentication saved') {
      message = state.lang === 'zh'
        ? '保护凭证已保存，可以继续执行 private 检查或直接同步。'
        : 'Protection credentials were saved. Continue with private-check or sync.';
    } else if (rawTitle === 'Private repository check passed') {
      message = state.lang === 'zh'
        ? '远程仓库已确认为 private，可以继续执行提交和推送。'
        : 'The remote repository is confirmed as private and ready to sync.';
    } else if (rawTitle === 'Private repository check failed') {
      message = state.lang === 'zh'
        ? `私有仓校验失败：${rawMessage || '请检查仓库权限与认证状态。'}`
        : rawMessage;
    } else if (rawTitle === 'Git sync commit skipped') {
      const skippedRepos = getNotificationMetaList(meta.skippedEmbeddedRepos);
      if (skippedRepos.length) {
        message = state.lang === 'zh'
          ? `当前只有嵌套仓库变更被跳过：${formatNotificationPathPreview(skippedRepos)}。外层仓库没有可提交文件。`
          : `Only embedded repositories were skipped: ${formatNotificationPathPreview(skippedRepos)}. No stageable files remained in the root repository.`;
      } else {
        message = state.lang === 'zh' ? '当前没有可提交的外层仓库变更。' : 'No stageable root-repo changes were found.';
      }
    } else if (rawTitle === 'Local commit succeeded') {
      const skippedRepos = getNotificationMetaList(meta.skippedEmbeddedRepos);
      message = state.lang === 'zh'
        ? `外层仓库已经创建新的本地提交。${skippedRepos.length ? ` 已跳过 ${formatNumber(skippedRepos.length)} 个嵌套仓库。` : ''}`
        : `A new local commit was created for the root repository.${skippedRepos.length ? ` ${formatNumber(skippedRepos.length)} embedded repositories were skipped.` : ''}`;
    } else if (rawTitle === 'Remote push succeeded') {
      message = state.lang === 'zh'
        ? '外层仓库变更已经推送到私有远程仓库。'
        : 'Changes were pushed to the private remote repository.';
    } else if (rawTitle === 'Recovery point saved locally') {
      message = state.lang === 'zh'
        ? '当前状态已经记成恢复点，但还只保存在本机。云端保护完成后，后续保存会自动同步。'
        : 'The current state was saved as a recovery point on this machine only. Once cloud protection is ready, future saves will sync automatically.';
    } else if (rawTitle === 'Recovery point saved and synced') {
      message = state.lang === 'zh'
        ? '当前状态已经记成恢复点，并同步到了私有远程仓库。'
        : 'The current state was saved as a recovery point and synced to the private remote.';
    } else if (rawTitle === 'Restore completed') {
      const restoredFrom = typeof meta.restoredFrom === 'string' ? meta.restoredFrom : '';
      message = state.lang === 'zh'
        ? `Guard 已经回到更早的稳定状态${restoredFrom ? `（来源节点 ${restoredFrom.slice(0, 7)}）` : ''}，并在当前主线上追加了新的恢复节点。`
        : `Guard restored an older stable state${restoredFrom ? ` from ${restoredFrom.slice(0, 7)}` : ''} and added a new restore point on the current branch.`;
    } else if (rawTitle === 'Remote push failed') {
      message = state.lang === 'zh'
        ? `远程推送失败：${rawMessage || '请检查权限、网络或远程配置。'}`
        : rawMessage;
    } else if (rawTitle === 'OAuth started') {
      message = state.lang === 'zh'
        ? '浏览器授权流程已启动，请在浏览器中完成登录并返回 Guard。'
        : 'Browser authorization started. Finish the login in your browser and return to Guard.';
    } else if (rawTitle === 'OAuth timed out') {
      message = state.lang === 'zh'
        ? '浏览器授权在 180 秒内没有完成，请重新发起 OAuth。'
        : 'The browser authorization was not completed within 180 seconds.';
    } else if (rawTitle === 'OAuth completed successfully') {
      message = oauthAccountMatch
        ? (state.lang === 'zh'
          ? `${oauthAccountMatch[1]} 账号已完成授权：${oauthAccountMatch[2]}`
          : `${oauthAccountMatch[1]} account: ${oauthAccountMatch[2]}`)
        : (state.lang === 'zh' ? 'OAuth 已完成，可以继续 private 检查或同步。' : 'OAuth completed. Continue with private-check or sync.');
    } else if (rawTitle === 'OAuth callback verification failed') {
      message = state.lang === 'zh'
        ? '回调里的 code/state 校验失败，请重新发起 OAuth。'
        : 'The callback did not include a valid code/state pair. Please start OAuth again.';
    } else if (rawTitle === 'OAuth startup failed') {
      message = state.lang === 'zh'
        ? `OAuth 回调服务启动失败：${rawMessage || '请检查端口占用。'}`
        : rawMessage;
    } else if (rawTitle === 'OAuth failed') {
      message = state.lang === 'zh'
        ? `OAuth 执行失败：${rawMessage || '请检查网络、Client ID、Client Secret 和回调设置。'}`
        : rawMessage;
    } else if (rawTitle === 'Cron action succeeded' && state.lang === 'zh') {
      message = rawMessage || 'Cron 操作已成功执行。';
    } else if (rawTitle === 'Cron action failed' && state.lang === 'zh') {
      message = rawMessage || 'Cron 操作执行失败。';
    }

    return {
      title: title || rawTitle || '-',
      message: message || rawMessage || '-',
      rawTitle: rawTitle || '-',
      rawMessage: rawMessage || '-',
      sourceLabel: getNotificationSourceLabel(item?.source),
      typeLabel: getNotificationTypeLabel(item?.type),
      severityLabel: getNotificationSeverityLabel(item?.severity),
    };
  }

  function getGitSyncNotificationJumpTarget(item) {
    const meta = item?.meta || {};
    if (item?.source === 'git-sync' && (
      Array.isArray(meta.embeddedRepos) ||
      item?.title === 'Embedded Git repositories detected' ||
      item?.title === '.gitignore updated for embedded repositories'
    )) {
      return {
        tabId: 'git-sync',
        gitView: 'advanced',
        advancedView: 'gitignore',
        selector: '#gitignore-preview-card',
        label: state.lang === 'zh' ? '打开备份与恢复' : 'Open Backup & Recovery',
      };
    }
    if (item?.source === 'git-sync' && (
      item?.title === 'Git sync repository initialized' ||
      item?.title === 'Remote repository connected' ||
      item?.title === 'Git authentication saved' ||
      item?.title === 'Private repository check passed' ||
      item?.title === 'Private repository check failed' ||
      item?.title === 'Remote push failed'
    )) {
      return {
        tabId: 'git-sync',
        gitView: 'advanced',
        advancedView: item?.title === 'Git authentication saved' || item?.title === 'Remote push failed' ? 'auth' : 'overview',
        selector: '#git-sync-readiness-card',
        label: state.lang === 'zh' ? '查看高级 Git' : 'Review Advanced Git',
      };
    }
    if (item?.source === 'git-sync' && (
      item?.title === 'Local commit succeeded' ||
      item?.title === 'Remote push succeeded' ||
      item?.title === 'Recovery point saved locally' ||
      item?.title === 'Recovery point saved and synced' ||
      item?.title === 'Restore completed'
    )) {
      return {
        tabId: 'git-sync',
        gitView: 'recovery',
        selector: '#recovery-timeline-card',
        label: state.lang === 'zh' ? '查看保护状态' : 'View Protection Status',
      };
    }
    return null;
  }

  function getNotificationSummaryMetaItems(item, present) {
    return [
      {
        label: state.lang === 'zh' ? '时间' : 'Time',
        value: formatDate(item?.createdAt),
      },
      {
        label: state.lang === 'zh' ? '来源' : 'Source',
        value: present.sourceLabel,
      },
      {
        label: state.lang === 'zh' ? '类型' : 'Type',
        value: present.typeLabel,
      },
      {
        label: state.lang === 'zh' ? '严重级别' : 'Severity',
        value: present.severityLabel,
        tone: item?.severity === 'success'
          ? 'success'
          : item?.severity === 'warning'
            ? 'warn'
            : item?.severity === 'error'
              ? 'danger'
              : '',
      },
    ];
  }

  function renderNotificationSummaryMetaStrip(item, present) {
    const items = getNotificationSummaryMetaItems(item, present);
    return `
      <div class="notify-detail-strip">
        ${items.map((entry) => `
          <div class="notify-detail-pill ${entry.tone || ''}">
            <span class="notify-detail-pill-label">${escapeHtml(entry.label)}</span>
            <span class="notify-detail-pill-value">${escapeHtml(entry.value)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function getNotificationDetailRows(item, present) {
    const meta = item?.meta || {};
    const rows = [];
    const appendRow = (labelZh, labelEn, value) => {
      const text = String(value || '').trim();
      if (!text) return;
      rows.push({
        label: state.lang === 'zh' ? labelZh : labelEn,
        value: text,
      });
    };
    appendRow('Provider', 'Provider', meta.provider);
    appendRow('远程仓库', 'Remote', meta.remoteUrl);
    appendRow('仓库 Owner', 'Repo Owner', meta.repoOwner);
    appendRow('仓库名', 'Repo Name', meta.repoName);
    appendRow('账号', 'Account', meta.username);
    appendRow('任务 ID', 'Job ID', meta.jobId);
    appendRow('任务名', 'Job Name', meta.jobName);
    appendRow('动作', 'Action', meta.action);
    appendRow('阶段', 'Phase', meta.phase);
    return rows;
  }

  function renderNotificationSummaryDetail(item, present) {
    const meta = item?.meta || {};
    const metaSections = [];
    const detailRows = getNotificationDetailRows(item, present);
    const embeddedRepos = getNotificationMetaList(meta.embeddedRepos);
    const missingEntries = getNotificationMetaList(meta.missingEntries);
    const skippedRepos = getNotificationMetaList(meta.skippedEmbeddedRepos);
    const appendSection = (titleZh, titleEn, content) => {
      const text = String(content || '').trim();
      if (!text) return;
      metaSections.push(`
        <div class="sub-card" style="margin-top:12px;">
          <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? titleZh : titleEn)}</div>
          <div>${escapeHtml(text)}</div>
        </div>
      `);
    };
    if (embeddedRepos.length) {
      appendSection('嵌套仓库', 'Embedded Repositories', formatNotificationPathPreview(embeddedRepos, { limit: 6 }));
    }
    if (missingEntries.length) {
      appendSection('待写入规则', 'Pending Ignore Rules', formatNotificationPathPreview(missingEntries, { limit: 6 }));
    }
    if (skippedRepos.length) {
      appendSection('已跳过仓库', 'Skipped Repositories', formatNotificationPathPreview(skippedRepos, { limit: 6 }));
    }
    return `
      <div class="sub-card" style="margin-top:12px;">
        <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? '摘要详情' : 'Summary Detail')}</div>
        ${renderNotificationSummaryMetaStrip(item, present)}
        ${detailRows.length ? `
          <div style="margin-top:12px;">
            ${keyValueGrid(detailRows)}
          </div>
        ` : ''}
        ${metaSections.join('')}
      </div>
    `;
  }

  function getNotificationRawFieldLabel(key) {
    const map = {
      id: { zh: '通知 ID', en: 'Notification ID' },
      type: { zh: '类型', en: 'Type' },
      source: { zh: '来源', en: 'Source' },
      title: { zh: '原始标题', en: 'Raw Title' },
      message: { zh: '原始消息', en: 'Raw Message' },
      severity: { zh: '严重级别', en: 'Severity' },
      createdAt: { zh: '创建时间', en: 'Created At' },
      read: { zh: '已读', en: 'Read' },
    };
    return map[key]?.[state.lang] || key;
  }

  function getNotificationMetaKeyLabel(key) {
    const map = {
      embeddedRepos: { zh: '嵌套仓库', en: 'Embedded Repositories' },
      missingEntries: { zh: '待写入规则', en: 'Pending Ignore Rules' },
      skippedEmbeddedRepos: { zh: '已跳过仓库', en: 'Skipped Repositories' },
      changedFiles: { zh: '变更文件', en: 'Changed Files' },
      provider: { zh: 'Provider', en: 'Provider' },
      remoteUrl: { zh: '远程仓库', en: 'Remote URL' },
      repoOwner: { zh: '仓库 Owner', en: 'Repo Owner' },
      repoName: { zh: '仓库名', en: 'Repo Name' },
      username: { zh: '账号', en: 'Account' },
      action: { zh: '动作', en: 'Action' },
      phase: { zh: '阶段', en: 'Phase' },
      jobId: { zh: '任务 ID', en: 'Job ID' },
      jobName: { zh: '任务名', en: 'Job Name' },
      authorizeUrl: { zh: '授权地址', en: 'Authorize URL' },
      redirectUrl: { zh: '回调地址', en: 'Redirect URL' },
      error: { zh: '错误详情', en: 'Error Detail' },
      message: { zh: '原始消息', en: 'Raw Message' },
    };
    return map[key]?.[state.lang] || key;
  }

  function formatNotificationRawPreview(value, options = {}) {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') {
      return value ? (state.lang === 'zh' ? '是' : 'true') : (state.lang === 'zh' ? '否' : 'false');
    }
    if (typeof value === 'number') return String(value);
    if (typeof value === 'string') {
      const normalized = options.normalizePath ? normalizeRepoPath(value) : value;
      const maxLength = Number.isFinite(options.maxLength) ? options.maxLength : 220;
      if (normalized.length <= maxLength) return normalized;
      return state.lang === 'zh'
        ? `${normalized.slice(0, maxLength)}...（共 ${formatNumber(normalized.length)} 字符）`
        : `${normalized.slice(0, maxLength)}... (${formatNumber(normalized.length)} chars)`;
    }
    if (Array.isArray(value)) {
      return state.lang === 'zh'
        ? `${formatNumber(value.length)} 项`
        : `${formatNumber(value.length)} items`;
    }
    if (typeof value === 'object') {
      const keyCount = Object.keys(value).length;
      return state.lang === 'zh'
        ? `${formatNumber(keyCount)} 个字段`
        : `${formatNumber(keyCount)} fields`;
    }
    return String(value);
  }

  function renderNotificationRawArray(key, value) {
    const items = Array.isArray(value) ? value : [];
    const limit = 10;
    const normalizedItems = items.map((entry) => {
      if (typeof entry === 'string') {
        const normalized = normalizeRepoPath(entry);
        return normalized || entry;
      }
      return entry;
    });
    const visible = normalizedItems.slice(0, limit);
    const hiddenCount = Math.max(0, normalizedItems.length - visible.length);
    return `
      <div class="sub-card" style="margin-top:12px;">
        <div class="row" style="justify-content:space-between; align-items:center;">
          <strong>${escapeHtml(getNotificationMetaKeyLabel(key))}</strong>
          <span class="chip">${escapeHtml(state.lang === 'zh' ? `${formatNumber(normalizedItems.length)} 项` : `${formatNumber(normalizedItems.length)} items`)}</span>
        </div>
        <div class="list" style="margin-top:10px;">
          ${visible.map((entry) => `<div class="list-item"><span class="muted" style="font-family:Consolas, 'Courier New', monospace;">${escapeHtml(formatNotificationRawPreview(entry, { maxLength: 180 }))}</span></div>`).join('')}
        </div>
        ${hiddenCount > 0 ? `<div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? `其余 ${formatNumber(hiddenCount)} 项已折叠；完整数据请使用“复制详情”。` : `${formatNumber(hiddenCount)} more items are folded. Use "Copy Details" for the full payload.`)}</div>` : ''}
      </div>
    `;
  }

  function renderNotificationRawObject(key, value) {
    const objectValue = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    const entries = Object.entries(objectValue);
    const limit = 8;
    const visible = entries.slice(0, limit);
    const hiddenCount = Math.max(0, entries.length - visible.length);
    return `
      <div class="sub-card" style="margin-top:12px;">
        <div class="row" style="justify-content:space-between; align-items:center;">
          <strong>${escapeHtml(getNotificationMetaKeyLabel(key))}</strong>
          <span class="chip">${escapeHtml(state.lang === 'zh' ? `${formatNumber(entries.length)} 个字段` : `${formatNumber(entries.length)} fields`)}</span>
        </div>
        <div class="stack" style="margin-top:10px;">
          ${visible.map(([entryKey, entryValue]) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(getNotificationMetaKeyLabel(entryKey))}</strong><span class="muted">${escapeHtml(formatNotificationRawPreview(entryValue))}</span></div></div>`).join('')}
        </div>
        ${hiddenCount > 0 ? `<div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? `其余 ${formatNumber(hiddenCount)} 个字段已折叠；完整数据请使用“复制详情”。` : `${formatNumber(hiddenCount)} more fields are folded. Use "Copy Details" for the full payload.`)}</div>` : ''}
      </div>
    `;
  }

  function renderNotificationRawDetail(item) {
    const baseRows = [
      { label: getNotificationRawFieldLabel('id'), value: item?.id || '-' },
      { label: getNotificationRawFieldLabel('type'), value: item?.type || '-' },
      { label: getNotificationRawFieldLabel('source'), value: item?.source || '-' },
      { label: getNotificationRawFieldLabel('severity'), value: item?.severity || '-' },
      { label: getNotificationRawFieldLabel('createdAt'), value: formatDate(item?.createdAt) },
      { label: getNotificationRawFieldLabel('read'), value: formatNotificationRawPreview(item?.read) },
      { label: getNotificationRawFieldLabel('title'), value: formatNotificationRawPreview(item?.title, { maxLength: 180 }) },
      { label: getNotificationRawFieldLabel('message'), value: formatNotificationRawPreview(item?.message, { maxLength: 260 }) },
    ];
    const meta = item?.meta && typeof item.meta === 'object' && !Array.isArray(item.meta) ? item.meta : {};
    const metaSections = Object.entries(meta).map(([key, value]) => {
      if (Array.isArray(value)) return renderNotificationRawArray(key, value);
      if (value && typeof value === 'object') return renderNotificationRawObject(key, value);
      return `
        <div class="sub-card" style="margin-top:12px;">
          <div class="row" style="justify-content:space-between">
            <strong>${escapeHtml(getNotificationMetaKeyLabel(key))}</strong>
            <span class="muted" style="font-family:Consolas, 'Courier New', monospace;">${escapeHtml(formatNotificationRawPreview(value, { normalizePath: /path|url/i.test(key) }))}</span>
          </div>
        </div>
      `;
    });
    return `
      <div class="sub-card" style="margin-top:12px;">
        <div class="muted small" style="margin-bottom:8px;">${escapeHtml(state.lang === 'zh' ? '原始通知结构' : 'Raw Notification Payload')}</div>
        ${keyValueGrid(baseRows)}
        ${metaSections.length ? `
          <div class="muted small" style="margin-top:12px;">${escapeHtml(state.lang === 'zh' ? 'Meta 预览已做折叠，超长数组不会直接平铺。完整内容请使用“复制详情”。' : 'The meta preview is folded so long arrays do not render inline. Use "Copy Details" for the full payload.')}</div>
          ${metaSections.join('')}
        ` : ''}
      </div>
    `;
  }

  function getNotificationPageButtons(currentPage, totalPages) {
    if (totalPages <= 1) return [1];
    const pages = new Set([1, totalPages, currentPage]);
    for (let offset = 1; offset <= 1; offset += 1) {
      pages.add(Math.max(1, currentPage - offset));
      pages.add(Math.min(totalPages, currentPage + offset));
    }
    const ordered = Array.from(pages).filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);
    const result = [];
    ordered.forEach((page, index) => {
      if (index > 0 && page - ordered[index - 1] > 1) result.push('ellipsis');
      result.push(page);
    });
    return result;
  }

  function ensureNotificationRawExpansion(items) {
    if (state.notificationDetailMode !== 'raw') return null;
    const visibleItems = Array.isArray(items) ? items.filter((item) => item?.id) : [];
    if (!visibleItems.length) {
      state.notificationExpandedRawId = null;
      return null;
    }
    if (visibleItems.some((item) => item.id === state.notificationExpandedRawId)) {
      return state.notificationExpandedRawId;
    }
    state.notificationExpandedRawId = visibleItems[0].id;
    return state.notificationExpandedRawId;
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
      state.lang === 'zh' ? '把这些路径加入外层 .gitignore，避免备份仓库反复把它们当成待处理变更。' : 'Add these paths to the root .gitignore so the root protection repo stops surfacing them as pending changes.',
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

  function getGitSyncScopeLevelMeta(level) {
    if (level === 'core') {
      return {
        label: state.lang === 'zh' ? '核心同步' : 'Core Sync',
        className: 'success',
      };
    }
    if (level === 'optional') {
      return {
        label: state.lang === 'zh' ? '可选同步' : 'Optional',
        className: 'warn',
      };
    }
    if (level === 'separate') {
      return {
        label: state.lang === 'zh' ? '建议拆仓' : 'Separate Repo',
        className: '',
      };
    }
    return {
      label: state.lang === 'zh' ? '默认排除' : 'Exclude By Default',
      className: 'danger',
    };
  }

  function describeGitSyncScopeEntry(entry) {
    switch (entry?.kind) {
      case 'workspace':
        return {
          description: state.lang === 'zh'
            ? '工作区里的提示词、文档、代码和长期资料通常最值得保留，换机后恢复价值最高。'
            : 'Workspace prompts, docs, code, and long-lived notes are usually the highest-value assets to preserve across machines.',
          warning: entry.autoDetected
            ? (state.lang === 'zh'
              ? '这是一个新识别出的 Workspace 候选。Guard 已经能浏览它；如果它应绑定到某个 Agent，后续再补进正式配置即可。'
              : 'This is a newly detected workspace candidate. Guard can already browse it; bind it to an agent later if needed.')
            : (entry.hasGitRepo
              ? (state.lang === 'zh'
                ? '这个工作区内部已经带有独立 Git 仓库，建议继续单独同步。'
                : 'This workspace already contains its own Git repository and is best synced separately.')
              : ''),
        };
      case 'config':
        return {
          description: state.lang === 'zh'
            ? '这是当前机器最关键的主配置入口，通常值得保留，但要避免把敏感值直接写进公开仓库。'
            : 'This is the main machine-level configuration entry and is usually worth keeping, but avoid storing sensitive values in public repositories.',
          warning: '',
        };
      case 'cron':
        return {
          description: state.lang === 'zh'
            ? '如果你希望换机后继续保留自动化任务编排，建议把这些规则一并同步。'
            : 'Sync this if you want scheduled automation rules to survive a machine move.',
          warning: '',
        };
      case 'canvas':
        return {
          description: state.lang === 'zh'
            ? '绘画和画布记录可以作为第二层资产保留，方便换机后找回创作历史。'
            : 'Canvas and drawing history can be kept as a second-layer asset so the creative record survives a machine move.',
          warning: state.lang === 'zh'
            ? '友好提醒：画布导出、图片和历史快照可能会让仓库迅速变大。建议只在你确实需要跨机器延续创作记录时再纳入同步。'
            : 'Friendly reminder: exports, images, and history snapshots can grow quickly. Include them only when you really need the creative history on another machine.',
        };
      case 'extensions':
        return {
          description: state.lang === 'zh'
            ? '如果这里放的是你长期维护的插件代码，更推荐单独仓库管理，而不是混进根 .openclaw 同步。'
            : 'If this folder contains plugin code you maintain long-term, it is better kept in a dedicated repository instead of the root .openclaw sync.',
          warning: '',
        };
      case 'skills':
        return {
          description: state.lang === 'zh'
            ? 'Skills 往往是可复用代码或模板，通常更适合独立版本化。'
            : 'Skills are often reusable code or templates and are usually better versioned independently.',
          warning: '',
        };
      case 'runtime':
        return {
          description: state.lang === 'zh'
            ? '这些目录主要承载运行态状态、日志和密钥，不适合默认进 Git。'
            : 'These paths mostly contain runtime state, logs, and secrets, so they should not enter Git by default.',
          warning: '',
        };
      case 'identity':
        return {
          description: state.lang === 'zh'
            ? '这里通常包含设备绑定、授权状态或敏感凭据，更适合留在本机。'
            : 'These files usually contain device binding, auth state, or sensitive credentials and are best kept local.',
          warning: '',
        };
      case 'browser-cache':
        return {
          description: state.lang === 'zh'
            ? '浏览器状态、队列和媒体缓存通常可重建，但体积和噪音都偏大。'
            : 'Browser state, queues, and media caches are usually reproducible but tend to be large and noisy.',
          warning: '',
        };
      case 'session-history':
        return {
          description: state.lang === 'zh'
            ? '会话历史、SQLite 索引和备份文件更像运行副产物，默认不建议同步。'
            : 'Session history, SQLite indexes, and backup files behave more like runtime by-products and are not recommended for default sync.',
          warning: '',
        };
      default:
        return {
          description: '',
          warning: '',
        };
    }
  }

  function renderGitSyncScopeEntry(entry) {
    const levelMeta = getGitSyncScopeLevelMeta(entry.level);
    const detail = describeGitSyncScopeEntry(entry);
    const stats = [];
    if (entry.fileCount > 0) stats.push(`${formatNumber(entry.fileCount)} ${state.lang === 'zh' ? '个文件' : 'files'}`);
    if (entry.totalBytes > 0) stats.push(formatBytes(entry.totalBytes));
    if (entry.statsTruncated) {
      stats.push(state.lang === 'zh' ? '统计为近似值' : 'approximate stats');
    }
    return `
      <div class="list-item">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <strong>${escapeHtml(entry.label)}</strong>
          <span class="pill ${levelMeta.className}">${escapeHtml(levelMeta.label)}</span>
        </div>
        ${entry.paths?.length ? `<div class="muted small" style="margin-top:8px;">${escapeHtml(entry.paths.join(' · '))}</div>` : ''}
        ${detail.description ? `<div style="margin-top:8px;">${escapeHtml(detail.description)}</div>` : ''}
        ${detail.warning ? `<div class="status warn" style="margin-top:10px;">${escapeHtml(detail.warning)}</div>` : ''}
        ${stats.length ? `<div class="muted small" style="margin-top:8px;">${escapeHtml(stats.join(' · '))}</div>` : ''}
      </div>
    `;
  }

  function renderGitSyncScopeSection(title, entries, emptyMessage) {
    return `
      <div class="sub-card">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <strong>${escapeHtml(title)}</strong>
          <span class="pill">${escapeHtml(`${formatNumber(entries.length)} ${state.lang === 'zh' ? '项' : 'items'}`)}</span>
        </div>
        <div style="margin-top:12px;">
          ${entries.length ? `<div class="list">${entries.map((entry) => renderGitSyncScopeEntry(entry)).join('')}</div>` : emptyState(emptyMessage)}
        </div>
      </div>
    `;
  }

  function getRecoveryNextActionMeta(overview) {
    const nextAction = overview?.nextAction || 'protected';
    if (nextAction === 'install-git') {
      return {
        tone: 'danger',
        title: state.lang === 'zh' ? '先安装 Git' : 'Install Git First',
        body: state.lang === 'zh'
          ? '这台机器还没有可用的 Git，暂时还不能建立恢复点。'
          : 'Git is not available yet, so Guard cannot create recovery points on this machine.',
        label: state.lang === 'zh' ? '打开 OpenClaw' : 'Open OpenClaw',
        tabId: 'openclaw',
      };
    }
    if (nextAction === 'setup-protection') {
      return {
        tone: 'warn',
        title: state.lang === 'zh' ? '先完成首次保护设置' : 'Prepare Protection First',
        body: state.lang === 'zh'
          ? '当前 .openclaw 还没有准备好保护仓库。先到高级 Git 完成仓库初始化和远程连接。'
          : 'The .openclaw directory is not prepared yet. Finish the repository setup from Advanced Git first.',
        label: state.lang === 'zh' ? '打开高级 Git' : 'Open Advanced Git',
        tabId: 'git-sync',
        gitView: 'advanced',
        advancedView: 'overview',
      };
    }
    if (nextAction === 'connect-private-remote') {
      return {
        tone: 'warn',
        title: state.lang === 'zh' ? '把保护接到私有仓库' : 'Connect a Private Remote',
        body: state.lang === 'zh'
          ? '你已经有本机恢复点了，但云端保护还没准备好。下一步去绑定 private 仓库并完成认证。'
          : 'Local recovery already works, but cloud protection is not ready yet. Connect a private remote and finish auth next.',
        label: state.lang === 'zh' ? '打开高级 Git' : 'Open Advanced Git',
        tabId: 'git-sync',
        gitView: 'advanced',
        advancedView: 'overview',
      };
    }
    if (nextAction === 'save-first-point') {
      return {
        tone: 'info',
        title: state.lang === 'zh' ? '先保住当前状态' : 'Save the Current State',
        body: state.lang === 'zh'
          ? '当前还没有任何恢复点。先保存一次，这样后面玩坏了才能回到稳定节点。'
          : 'There is no recovery point yet. Save once now so you always have a stable state to return to.',
        label: state.lang === 'zh' ? '立即保存' : 'Save Now',
        action: 'save',
      };
    }
    if (nextAction === 'save-current-state') {
      return {
        tone: 'warn',
        title: state.lang === 'zh' ? '把刚才的改动先保住' : 'Protect the Latest Changes',
        body: state.lang === 'zh'
          ? '当前还有没纳入恢复点的本地改动。建议先保存，再继续改。'
          : 'There are new local changes that are not protected yet. Save them first before continuing.',
        label: state.lang === 'zh' ? '立即保存' : 'Save Now',
        action: 'save',
      };
    }
    if (nextAction === 'sync-latest-point') {
      return {
        tone: 'warn',
        title: state.lang === 'zh' ? '把最新保护点同步到云端' : 'Sync the Latest Point to the Cloud',
        body: state.lang === 'zh'
          ? '最近一次保护已经存在，但云端还没跟上。建议尽快完成私有仓同步。'
          : 'The latest protection point exists locally, but the cloud copy is still behind.',
        label: state.lang === 'zh' ? '打开高级 Git' : 'Open Advanced Git',
        tabId: 'git-sync',
        gitView: 'advanced',
        advancedView: 'auth',
      };
    }
    if (nextAction === 'review-restored-state') {
      return {
        tone: 'info',
        title: state.lang === 'zh' ? '你刚刚回到了更早的稳定点' : 'You Recently Restored an Older State',
        body: state.lang === 'zh'
          ? '先确认现在是否稳定，再继续往前改。后续新版本会接在当前主线上，不会另开分支。'
          : 'Review the restored state first, then continue forward. New work stays on the same main line.',
        label: state.lang === 'zh' ? '查看时间线' : 'Review Timeline',
        selector: '#recovery-timeline-card',
      };
    }
    return {
      tone: 'success',
      title: state.lang === 'zh' ? '保护链路已经就绪' : 'Protection Is Ready',
      body: state.lang === 'zh'
        ? '当前已经有恢复点，也没有明显阻断。后续可以按节奏继续保存和同步。'
        : 'Recovery points already exist and no major blocker is visible. Keep saving and syncing as you work.',
      label: state.lang === 'zh' ? '查看高级 Git' : 'Review Advanced Git',
      tabId: 'git-sync',
      gitView: 'advanced',
      advancedView: 'overview',
    };
  }

  function getRecoveryPointKindMeta(point) {
    if (point?.kind === 'restore') {
      return {
        label: state.lang === 'zh' ? '已恢复到此状态' : 'Restore Point',
        pillClass: 'warn',
        title: state.lang === 'zh' ? '已恢复到更早状态' : 'Returned to an Earlier State',
      };
    }
    if (point?.kind === 'auto') {
      return {
        label: state.lang === 'zh' ? '自动保护' : 'Auto Protection',
        pillClass: 'info',
        title: state.lang === 'zh' ? '恢复前自动保护' : 'Automatic Protection Before Restore',
      };
    }
    return {
      label: state.lang === 'zh' ? '手动保存' : 'Manual Save',
      pillClass: 'success',
      title: point?.title || (state.lang === 'zh' ? '手动保存' : 'Manual Save'),
    };
  }

  function renderRecoveryPointTimeline(points) {
    if (!Array.isArray(points) || !points.length) {
      return emptyState(state.lang === 'zh' ? '当前还没有恢复点。' : 'No recovery points exist yet.');
    }
    return `
      <div class="list">
        ${points.map((point) => {
          const kindMeta = getRecoveryPointKindMeta(point);
          const summary = point?.summary || '';
          const sourceHint = point?.kind === 'restore' && point?.sourceCommitSha
            ? (state.lang === 'zh'
              ? `来源节点 ${point.sourceCommitSha.slice(0, 7)}`
              : `Source ${point.sourceCommitSha.slice(0, 7)}`)
            : '';
          const cloudLabel = point?.pushed
            ? (state.lang === 'zh' ? '已上云' : 'Synced')
            : (state.lang === 'zh' ? '仅本机' : 'Local Only');
          return `
            <div class="list-item">
              <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                <div>
                  <strong>${escapeHtml(kindMeta.title)}</strong>
                  <div class="muted small">${escapeHtml(formatDate(point?.createdAt))}${sourceHint ? ` · ${escapeHtml(sourceHint)}` : ''}</div>
                </div>
                <div class="row" style="gap:8px; flex-wrap:wrap; justify-content:flex-end;">
                  <span class="pill ${escapeHtml(kindMeta.pillClass)}">${escapeHtml(kindMeta.label)}</span>
                  <span class="pill ${point?.pushed ? 'success' : 'warn'}">${escapeHtml(cloudLabel)}</span>
                </div>
              </div>
              <div style="margin-top:10px;">${escapeHtml(summary || point?.title || '')}</div>
              <div class="toolbar tight" style="margin-top:12px;">
                <button class="action-btn" type="button" data-recovery-action="copy-point" data-commit-sha="${escapeHtml(point?.commitSha || '')}" ${point?.commitSha ? '' : 'disabled'}>${escapeHtml(state.lang === 'zh' ? '复制节点' : 'Copy Point')}</button>
                <button class="action-btn primary" type="button" data-recovery-action="restore" data-commit-sha="${escapeHtml(point?.commitSha || '')}" ${point?.restorable ? '' : 'disabled'}>${escapeHtml(state.lang === 'zh' ? '回到这个状态' : 'Restore This State')}</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function detectGitPathStatus(pathValue, stageableSet, skippedEmbeddedRepos) {
    if (stageableSet?.has(pathValue)) return 'stageable';
    if ((skippedEmbeddedRepos || []).some((repoPath) => pathValue === repoPath || pathValue.startsWith(`${repoPath}/`))) {
      return 'embedded';
    }
    return 'pending';
  }

  function createGitTreeNode(name, pathValue, depth) {
    return {
      name,
      path: pathValue,
      depth,
      totalCount: 0,
      stageableCount: 0,
      embeddedCount: 0,
      pendingCount: 0,
      directFiles: [],
      children: new Map(),
      containerLeaf: false,
    };
  }

  function incrementGitTreeNodeCount(node, status) {
    node.totalCount += 1;
    if (status === 'stageable') node.stageableCount += 1;
    else if (status === 'embedded') node.embeddedCount += 1;
    else node.pendingCount += 1;
  }

  function buildGitPathTree(paths, options = {}) {
    const normalizedPaths = uniqueItems((paths || []).map((item) => normalizeRepoPath(item)).filter(Boolean)).sort();
    const stageableSet = new Set(uniqueItems((options.stageablePaths || []).map((item) => normalizeRepoPath(item)).filter(Boolean)));
    const skippedEmbeddedRepos = uniqueItems((options.skippedEmbeddedRepos || []).map((item) => normalizeRepoPath(item)).filter(Boolean));
    const containerSet = new Set(skippedEmbeddedRepos);

    normalizedPaths.forEach((pathValue) => {
      const segments = pathValue.split('/').filter(Boolean);
      let current = '';
      for (let index = 0; index < segments.length - 1; index += 1) {
        current = current ? `${current}/${segments[index]}` : segments[index];
        containerSet.add(current);
      }
    });

    const root = createGitTreeNode('', '', 0);

    normalizedPaths.forEach((pathValue) => {
      const segments = pathValue.split('/').filter(Boolean);
      if (!segments.length) return;
      const status = detectGitPathStatus(pathValue, stageableSet, skippedEmbeddedRepos);
      const isContainer = containerSet.has(pathValue);

      incrementGitTreeNodeCount(root, status);

      let currentNode = root;
      let currentPath = '';

      for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];
        currentPath = currentPath ? `${currentPath}/${segment}` : segment;
        const isLast = index === segments.length - 1;

        if (isLast && !isContainer) {
          currentNode.directFiles.push({
            name: segment,
            path: currentPath,
            status,
          });
          break;
        }

        if (!currentNode.children.has(segment)) {
          currentNode.children.set(segment, createGitTreeNode(segment, currentPath, index + 1));
        }
        const childNode = currentNode.children.get(segment);
        incrementGitTreeNodeCount(childNode, status);

        if (isLast) {
          childNode.containerLeaf = true;
        }

        currentNode = childNode;
      }
    });

    return root;
  }

  function getGitTreeStatusPill(status) {
    if (status === 'stageable') {
      return {
        label: state.lang === 'zh' ? '可提交' : 'Stageable',
        className: 'success',
      };
    }
    if (status === 'embedded') {
      return {
        label: state.lang === 'zh' ? '嵌套仓库' : 'Embedded Repo',
        className: 'warn',
      };
    }
    return {
      label: state.lang === 'zh' ? '待确认' : 'Pending',
      className: '',
    };
  }

  function renderGitTreeFilePreview(file, compact = false) {
    const pill = getGitTreeStatusPill(file.status);
    return `
      <div class="git-tree-file${compact ? ' compact' : ''}">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <strong>${escapeHtml(file.name)}</strong>
          <span class="pill ${pill.className}">${escapeHtml(pill.label)}</span>
        </div>
        <div class="muted small" style="margin-top:6px;">${escapeHtml(file.path)}</div>
      </div>
    `;
  }

  function renderGitTreeNode(node, options = {}) {
    const childNodes = Array.from(node.children.values())
      .sort((left, right) => {
        if (right.totalCount !== left.totalCount) return right.totalCount - left.totalCount;
        return left.name.localeCompare(right.name);
      });
    const directFiles = node.directFiles
      .slice()
      .sort((left, right) => left.name.localeCompare(right.name));
    const previewLimit = Number.isFinite(options.previewLimit) ? options.previewLimit : 4;
    const childPreviewLimit = Number.isFinite(options.childPreviewLimit) ? options.childPreviewLimit : 10;
    const visibleChildren = childNodes.slice(0, childPreviewLimit);
    const hiddenChildCount = Math.max(0, childNodes.length - visibleChildren.length);
    const visibleFiles = directFiles.slice(0, previewLimit);
    const hiddenFileCount = Math.max(0, directFiles.length - visibleFiles.length);
    const isInitiallyOpen = options.expandDepth === undefined
      ? node.depth <= 1
      : node.depth <= options.expandDepth;
    const descriptorParts = [];
    if (childNodes.length > 0) {
      descriptorParts.push(state.lang === 'zh'
        ? `${formatNumber(childNodes.length)} 个子目录`
        : `${formatNumber(childNodes.length)} folders`);
    }
    if (directFiles.length > 0) {
      descriptorParts.push(state.lang === 'zh'
        ? `${formatNumber(directFiles.length)} 个直系文件`
        : `${formatNumber(directFiles.length)} direct files`);
    }
    if (node.containerLeaf && childNodes.length === 0 && directFiles.length === 0) {
      descriptorParts.push(state.lang === 'zh' ? '独立仓库根路径' : 'Repository root marker');
    }

    return `
      <details class="git-tree-node depth-${node.depth}" ${isInitiallyOpen ? 'open' : ''}>
        <summary class="git-tree-summary">
          <div class="git-tree-summary-main">
            <strong>${escapeHtml(node.name || (state.lang === 'zh' ? '根目录' : 'Root'))}</strong>
            <div class="muted small">${escapeHtml(descriptorParts.join(' · ') || (state.lang === 'zh' ? '暂无明细' : 'No details'))}</div>
          </div>
          <div class="git-tree-summary-pills">
            <span class="pill">${escapeHtml(`${formatNumber(node.totalCount)} ${state.lang === 'zh' ? '项' : 'items'}`)}</span>
            ${node.stageableCount > 0 ? `<span class="pill success">${escapeHtml(`${formatNumber(node.stageableCount)} ${state.lang === 'zh' ? '可提交' : 'stageable'}`)}</span>` : ''}
            ${node.embeddedCount > 0 ? `<span class="pill warn">${escapeHtml(`${formatNumber(node.embeddedCount)} ${state.lang === 'zh' ? '嵌套仓' : 'embedded'}`)}</span>` : ''}
          </div>
        </summary>
        <div class="git-tree-content">
          ${visibleFiles.length ? `<div class="git-tree-files">${visibleFiles.map((file) => renderGitTreeFilePreview(file, true)).join('')}</div>` : ''}
          ${hiddenFileCount > 0 ? `<div class="muted small git-tree-more">${escapeHtml(state.lang === 'zh' ? `还有 ${formatNumber(hiddenFileCount)} 个文件未展开，已用目录摘要收纳。` : `${formatNumber(hiddenFileCount)} more files are folded into the folder summary.`)}</div>` : ''}
          ${visibleChildren.length ? `<div class="git-tree-children">${visibleChildren.map((child) => renderGitTreeNode(child, options)).join('')}</div>` : ''}
          ${hiddenChildCount > 0 ? `<div class="muted small git-tree-more">${escapeHtml(state.lang === 'zh' ? `还有 ${formatNumber(hiddenChildCount)} 个子目录未直接展开。` : `${formatNumber(hiddenChildCount)} more folders are folded.`)}</div>` : ''}
        </div>
      </details>
    `;
  }

  function renderGitPathTreePanel(title, tree, options = {}) {
    const topFolders = Array.from(tree.children.values())
      .sort((left, right) => {
        if (right.totalCount !== left.totalCount) return right.totalCount - left.totalCount;
        return left.name.localeCompare(right.name);
      });
    const rootDirectFiles = tree.directFiles
      .slice()
      .sort((left, right) => left.name.localeCompare(right.name));
    const rootFilePreview = rootDirectFiles.slice(0, options.rootFilePreviewLimit || 6);
    const hiddenRootFileCount = Math.max(0, rootDirectFiles.length - rootFilePreview.length);

    if (!topFolders.length && !rootDirectFiles.length) {
      return emptyState(options.emptyMessage || (state.lang === 'zh' ? '当前没有路径可展示。' : 'No paths to display.'));
    }

    return `
      <div class="git-tree-panel">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:12px;">
          <div>
            <strong>${escapeHtml(title)}</strong>
            <div class="muted small" style="margin-top:6px;">${escapeHtml(options.description || '')}</div>
          </div>
          <div class="tag-list" style="margin-top:0;">
            <span class="chip active">${escapeHtml(`${formatNumber(topFolders.length)} ${state.lang === 'zh' ? '个一级目录' : 'top folders'}`)}</span>
            <span class="chip">${escapeHtml(`${formatNumber(tree.totalCount)} ${state.lang === 'zh' ? '项路径' : 'paths'}`)}</span>
          </div>
        </div>
        ${rootFilePreview.length ? `
          <div class="sub-card" style="margin-bottom:12px;">
            <div class="muted small" style="margin-bottom:10px;">${escapeHtml(state.lang === 'zh' ? '根目录直系路径预览' : 'Root-level path preview')}</div>
            <div class="git-tree-files">${rootFilePreview.map((file) => renderGitTreeFilePreview(file, true)).join('')}</div>
            ${hiddenRootFileCount > 0 ? `<div class="muted small git-tree-more">${escapeHtml(state.lang === 'zh' ? `根目录下还有 ${formatNumber(hiddenRootFileCount)} 项未直接展示。` : `${formatNumber(hiddenRootFileCount)} more root-level items are folded.`)}</div>` : ''}
          </div>
        ` : ''}
        <div class="git-tree-root">
          ${topFolders.map((node) => renderGitTreeNode(node, options)).join('')}
        </div>
      </div>
    `;
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

    await showValueDialog({
      title: options.title || dialogText('manualCopy'),
      message: options.promptLabel || (state.lang === 'zh' ? '系统剪贴板不可用，请手动复制下面的内容。' : 'Clipboard access is unavailable. Copy the value below manually.'),
      value,
      valueLabel: state.lang === 'zh' ? '待复制内容' : 'Value to copy',
      confirmText: dialogText('close'),
      tone: 'info',
      kicker: dialogText('manualCopy'),
    });
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
        ${detailText ? renderAdvancedDisclosure({
          title: state.lang === 'zh' ? '查看操作详情' : 'View Action Details',
          description: state.lang === 'zh' ? '这里保留了这次操作的原始返回内容，只有在排查问题时才需要展开。' : 'This keeps the raw result of the latest action. Expand it only when you need more detail.',
          bodyHtml: `<pre>${escapeHtml(detailText)}</pre>`,
        }) : ''}
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

  function maskSensitiveValue(key, value) {
    const text = String(value ?? '');
    if (!isSensitiveField(key)) return text;
    if (!text) return '';
    if (text.length <= 6) return '******';
    return `${text.slice(0, 2)}****${text.slice(-2)}`;
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
            ${options.map((option) => {
              const optionValue = option && typeof option === 'object' ? option.value : option;
              const optionLabel = option && typeof option === 'object' ? (option.label ?? option.value) : option;
              return `<option value="${escapeHtml(optionValue)}" ${String(value) === String(optionValue) ? 'selected' : ''}>${escapeHtml(optionLabel)}</option>`;
            }).join('')}
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

  function clearServicePollTimer() {
    if (state.servicePollTimer) {
      clearTimeout(state.servicePollTimer);
      state.servicePollTimer = null;
    }
  }

  function clearPrewarmPollTimer() {
    if (state.prewarmPollTimer) {
      clearTimeout(state.prewarmPollTimer);
      state.prewarmPollTimer = null;
    }
  }

  function clearOpenClawPollTimer() {
    if (state.openclawPollTimer) {
      clearTimeout(state.openclawPollTimer);
      state.openclawPollTimer = null;
    }
  }

  function clearCronPollTimer() {
    if (state.cronPollTimer) {
      clearTimeout(state.cronPollTimer);
      state.cronPollTimer = null;
    }
  }

  function clearRuntimeViewPollTimer() {
    if (state.runtimeViewPollTimer) {
      clearTimeout(state.runtimeViewPollTimer);
      state.runtimeViewPollTimer = null;
    }
  }

  function clearGuardRestartPollTimer() {
    if (state.guardRestartPollTimer) {
      clearTimeout(state.guardRestartPollTimer);
      state.guardRestartPollTimer = null;
    }
  }

  function getServiceActionMeta(actionState) {
    const action = actionState?.action || '';
    const actionLabel = action === 'start'
      ? (state.lang === 'zh' ? '启动' : 'Start')
      : action === 'stop'
        ? (state.lang === 'zh' ? '停止' : 'Stop')
        : action === 'restart'
          ? (state.lang === 'zh' ? '重启' : 'Restart')
          : (state.lang === 'zh' ? '待命' : 'Idle');
    const phase = actionState?.phase || 'idle';
    const phaseLabel = phase === 'running'
      ? (state.lang === 'zh' ? '执行中' : 'Running')
      : phase === 'completed'
        ? (state.lang === 'zh' ? '已完成' : 'Completed')
        : phase === 'error'
          ? (state.lang === 'zh' ? '失败' : 'Failed')
          : (state.lang === 'zh' ? '空闲' : 'Idle');
    const pillClass = phase === 'completed'
      ? 'success'
      : phase === 'error'
        ? 'danger'
        : phase === 'running'
          ? 'warn'
          : '';
    return {
      actionLabel,
      phase,
      phaseLabel,
      pillClass,
      message: actionState?.message || (state.lang === 'zh' ? '当前没有后台运维任务。' : 'No background service task is active.'),
    };
  }

  function getPrewarmMeta(prewarmStatus) {
    const phase = prewarmStatus?.phase || 'idle';
    const phaseLabel = phase === 'running'
      ? (state.lang === 'zh' ? '预热中' : 'Prewarming')
      : phase === 'scheduled'
        ? (state.lang === 'zh' ? '已调度' : 'Scheduled')
        : phase === 'completed'
          ? (state.lang === 'zh' ? '已完成' : 'Completed')
          : phase === 'error'
            ? (state.lang === 'zh' ? '异常' : 'Error')
            : (state.lang === 'zh' ? '空闲' : 'Idle');
    const pillClass = phase === 'completed'
      ? 'success'
      : phase === 'error'
        ? 'danger'
        : phase === 'running' || phase === 'scheduled'
          ? 'warn'
          : '';
    return {
      phase,
      phaseLabel,
      pillClass,
      message: prewarmStatus?.lastError || (state.lang === 'zh' ? '缓存预热状态正常。' : 'Cache prewarm state is healthy.'),
    };
  }

  function getOpenClawActionMeta(actionState) {
    const mode = actionState?.mode || '';
    const modeLabel = mode === 'install'
      ? (state.lang === 'zh' ? '安装' : 'Install')
      : mode === 'update'
        ? (state.lang === 'zh' ? '更新' : 'Update')
        : mode === 'rollback'
          ? (state.lang === 'zh' ? '回退' : 'Rollback')
          : mode === 'uninstall'
            ? (state.lang === 'zh' ? '卸载' : 'Uninstall')
            : (state.lang === 'zh' ? '待命' : 'Idle');
    const phase = actionState?.phase || 'idle';
    const phaseLabel = phase === 'running'
      ? (state.lang === 'zh' ? '执行中' : 'Running')
      : phase === 'completed'
        ? (state.lang === 'zh' ? '已完成' : 'Completed')
        : phase === 'error'
          ? (state.lang === 'zh' ? '失败' : 'Failed')
          : (state.lang === 'zh' ? '空闲' : 'Idle');
    const pillClass = phase === 'completed'
      ? 'success'
      : phase === 'error'
        ? 'danger'
        : phase === 'running'
          ? 'warn'
          : '';
    return {
      mode,
      modeLabel,
      phase,
      phaseLabel,
      pillClass,
      message: actionState?.message || (state.lang === 'zh' ? '当前没有 OpenClaw 生命周期任务。' : 'No OpenClaw lifecycle task is active.'),
    };
  }

  function getGuardRestartMeta(actionState) {
    const phase = actionState?.phase || 'idle';
    const phaseLabel = phase === 'running'
      ? (state.lang === 'zh' ? '执行中' : 'Running')
      : phase === 'completed'
        ? (state.lang === 'zh' ? '已完成' : 'Completed')
        : phase === 'error'
          ? (state.lang === 'zh' ? '失败' : 'Failed')
          : (state.lang === 'zh' ? '空闲' : 'Idle');
    const pillClass = phase === 'completed'
      ? 'success'
      : phase === 'error'
        ? 'danger'
        : phase === 'running'
          ? 'warn'
          : '';
    return {
      phase,
      phaseLabel,
      pillClass,
      message: actionState?.message || (state.lang === 'zh' ? '当前没有 Guard 完整重启任务。' : 'No full Guard restart task is active.'),
    };
  }

  function scheduleGuardRestartPoll(startedAt = Date.now()) {
    clearGuardRestartPollTimer();
    state.guardRestartPollTimer = setTimeout(async () => {
      try {
        const status = await apiRequest('/api/guard/restart-status', { timeoutMs: 2200 });
        const meta = getGuardRestartMeta(status);
        if (meta.phase === 'completed') {
          clearGuardRestartPollTimer();
          showToast(status?.message || (state.lang === 'zh' ? 'Guard 已恢复。' : 'Guard is back online.'));
          if (state.activeTab === 'overview' || state.activeTab === 'system') {
            loadActiveTab(true);
          }
          return;
        }
        if (meta.phase === 'error') {
          clearGuardRestartPollTimer();
          showToast(status?.message || (state.lang === 'zh' ? 'Guard 重启失败。' : 'Guard restart failed.'), 'error');
          if (state.activeTab === 'overview' || state.activeTab === 'system') {
            loadActiveTab(true);
          }
          return;
        }
      } catch {
        // Guard 进程切换期间请求失败是预期行为，继续轮询即可。
      }

      if (Date.now() - startedAt > 60_000) {
        clearGuardRestartPollTimer();
        showToast(state.lang === 'zh'
          ? 'Guard 重启等待超过 60 秒，请手动刷新页面确认状态。'
          : 'Guard restart took longer than 60s. Refresh the page to verify the state.', 'error');
        return;
      }

      scheduleGuardRestartPoll(startedAt);
    }, 1600);
  }

  async function triggerGuardRestart(restartGateway = false) {
    const confirmText = restartGateway
      ? (state.lang === 'zh'
        ? '确认执行 Guard + Gateway 全重启？当前页面会短暂断开，然后自动恢复。'
        : 'Restart Guard and Gateway together? This page will disconnect briefly, then recover.')
      : (state.lang === 'zh'
        ? '确认完整重启 Guard？当前页面会短暂断开，然后自动恢复。'
        : 'Perform a full Guard restart? This page will disconnect briefly, then recover.');
    const confirmed = await showConfirmDialog({
      title: restartGateway
        ? (state.lang === 'zh' ? '执行全重启' : 'Restart Guard + Gateway')
        : (state.lang === 'zh' ? '重启 Guard' : 'Restart Guard'),
      message: confirmText,
      confirmText: state.lang === 'zh' ? '立即重启' : 'Restart now',
      tone: 'warn',
    });
    if (!confirmed) return;

    try {
      const result = await postJson('/api/guard/restart', { restartGateway });
      const ok = result?.success !== false;
      showToast(result?.message || (state.lang === 'zh' ? 'Guard 重启任务已调度。' : 'Guard restart has been scheduled.'), ok ? 'success' : 'error');
      if (!ok) return;
      scheduleGuardRestartPoll();
    } catch (error) {
      showToast(error.message || String(error), 'error');
    }
  }

  function scheduleServiceStatusPoll() {
    clearServicePollTimer();
    state.servicePollTimer = setTimeout(() => {
      if (state.activeTab === 'overview' || state.activeTab === 'system') {
        loadActiveTab();
      }
    }, 1800);
  }

  function schedulePrewarmStatusPoll() {
    clearPrewarmPollTimer();
    state.prewarmPollTimer = setTimeout(() => {
      if (state.activeTab === 'overview' || state.activeTab === 'system') {
        loadActiveTab();
      }
    }, 1800);
  }

  function scheduleOpenClawStatusPoll() {
    clearOpenClawPollTimer();
    state.openclawPollTimer = setTimeout(() => {
      if (state.activeTab === 'openclaw') {
        loadActiveTab();
      }
    }, 2200);
  }

  function scheduleCronStatusPoll() {
    clearCronPollTimer();
    state.cronPollTimer = setTimeout(() => {
      if (state.activeTab === 'cron') {
        loadActiveTab();
      }
    }, 1800);
  }

  function scheduleRuntimeViewPoll() {
    clearRuntimeViewPollTimer();
    state.runtimeViewPollTimer = setTimeout(() => {
      if (state.activeTab === 'overview' || state.activeTab === 'sessions' || state.activeTab === 'costs') {
        loadActiveTab();
      }
    }, 1800);
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

  function buildPanelMarkup(title, description, bodyHtml, actionsHtml = '') {
    return `
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

  function setPanel(title, description, bodyHtml, actionsHtml = '') {
    const panel = document.getElementById('guard-panel');
    if (!panel) return;
    panel.innerHTML = buildPanelMarkup(title, description, bodyHtml, actionsHtml);
  }

  function renderTabRefreshBanner(tabId) {
    const refreshHint = state.tabRefreshHints[tabId];
    if (!refreshHint) return '';
    const tone = refreshHint.tone === 'danger' ? 'danger' : refreshHint.tone === 'success' ? 'success' : 'warn';
    const statusClass = tone === 'danger' ? 'error' : tone;
    return `
      <section class="guard-refresh-banner-wrap">
        <div class="status ${statusClass} guard-refresh-banner">
          <div class="row" style="justify-content:space-between; gap:12px; align-items:flex-start;">
            <strong>${escapeHtml(refreshHint.title || (state.lang === 'zh' ? '正在后台刷新' : 'Refreshing in background'))}</strong>
            ${refreshHint.ageLabel ? `<span class="pill ${tone}">${escapeHtml(refreshHint.ageLabel)}</span>` : ''}
          </div>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(refreshHint.message)}</div>
        </div>
      </section>
    `;
  }

  function clearTabRefreshHint(tabId) {
    delete state.tabRefreshHints[tabId];
  }

  function setTabRefreshHint(tabId, hint) {
    if (!hint) {
      clearTabRefreshHint(tabId);
      return;
    }
    state.tabRefreshHints[tabId] = hint;
  }

  function rememberCurrentPanelRender(tabId, bindFn = null) {
    if (!CACHEABLE_TABS.has(tabId)) return;
    const panel = document.getElementById('guard-panel');
    if (!panel) return;
    const existingCache = state.renderCache[tabId];
    clearTabRefreshHint(tabId);
    state.renderCache[tabId] = {
      html: panel.innerHTML,
      bind: typeof bindFn === 'function' ? bindFn : existingCache?.bind || null,
      cachedAt: new Date().toISOString(),
      lang: state.lang,
    };
  }

  function restoreCachedPanel(tabId, message, options = {}) {
    if (!CACHEABLE_TABS.has(tabId)) return false;
    const cached = state.renderCache[tabId];
    const panel = document.getElementById('guard-panel');
    if (!cached?.html || !panel || (cached.lang && cached.lang !== state.lang)) return false;
    const cachedAtMs = cached.cachedAt ? Date.parse(cached.cachedAt) : NaN;
    const ageMs = Number.isFinite(cachedAtMs) ? Math.max(0, Date.now() - cachedAtMs) : NaN;
    const isFresh = Number.isFinite(ageMs) && ageMs <= SOFT_CACHE_TTL_MS;
    const manualRefresh = options.manualRefresh === true;
    setTabRefreshHint(tabId, {
      title: manualRefresh
        ? (state.lang === 'zh' ? '正在刷新当前页' : 'Refreshing this page')
        : isFresh
          ? (state.lang === 'zh' ? '先显示最近结果' : 'Showing the latest snapshot first')
          : (state.lang === 'zh' ? '先展示上次结果' : 'Showing previous result'),
      message: message || (state.lang === 'zh'
        ? '当前页正在后台刷新最新数据，先显示上一次成功加载的内容。'
        : 'This view is refreshing in the background. Showing the last successful result first.'),
      ageLabel: Number.isFinite(ageMs)
        ? (state.lang === 'zh'
          ? `缓存 ${formatAgeMs(ageMs)}`
          : `Cached ${formatAgeMs(ageMs)}`)
        : '',
      tone: manualRefresh ? 'warn' : (isFresh ? 'success' : 'warn'),
    });
    panel.innerHTML = `${renderTabRefreshBanner(tabId)}${cached.html}`;
    cached.bind?.();
    return true;
  }

  function restoreCachedPanelWithError(tabId, error) {
    if (!CACHEABLE_TABS.has(tabId)) return false;
    const cached = state.renderCache[tabId];
    const panel = document.getElementById('guard-panel');
    if (!cached?.html || !panel) return false;
    const cachedAtMs = cached.cachedAt ? Date.parse(cached.cachedAt) : NaN;
    setTabRefreshHint(tabId, {
      title: state.lang === 'zh' ? '最新刷新失败，已保留缓存' : 'Refresh failed, showing cached data',
      message: state.lang === 'zh'
        ? '后台刷新没有成功，当前继续保留上一次成功加载的页面内容。你可以稍后再刷新。'
        : 'The background refresh did not succeed. Keeping the last successful result for now. You can refresh again later.',
      ageLabel: Number.isFinite(cachedAtMs)
        ? (state.lang === 'zh'
          ? `缓存 ${formatAgeMs(Date.now() - cachedAtMs)}`
          : `Cached ${formatAgeMs(Date.now() - cachedAtMs)}`)
        : '',
      tone: 'danger',
    });
    panel.innerHTML = `${renderTabRefreshBanner(tabId)}${cached.html}`;
    cached.bind?.();
    showToast(error?.message || String(error), 'error');
    return true;
  }

  function skeletonLine(width = '100%', height = '14px', className = '') {
    return `<span class="guard-skeleton-line ${className}" style="width:${width};height:${height};"></span>`;
  }

  function skeletonButton(width = '120px') {
    return `<span class="guard-skeleton-chip" style="width:${width};"></span>`;
  }

  function loadingMetricCard(title) {
    return `
      <div class="card guard-loading-card">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <h3>${escapeHtml(title)}</h3>
          <span class="pill">${escapeHtml(t('loading'))}</span>
        </div>
        <div class="guard-skeleton-stack" style="margin-top:10px;">
          ${skeletonLine('42%', '34px')}
          ${skeletonLine('68%', '12px')}
        </div>
      </div>
    `;
  }

  function loadingListBlock(itemCount = 4) {
    return `
      <div class="list">
        ${Array.from({ length: itemCount }, (_, index) => `
          <div class="list-item guard-loading-card">
            <div class="row" style="justify-content:space-between; align-items:center;">
              ${skeletonLine(index % 2 === 0 ? '46%' : '58%', '16px')}
              ${skeletonLine('92px', '26px', 'guard-skeleton-pill')}
            </div>
            <div class="guard-skeleton-stack" style="margin-top:12px;">
              ${skeletonLine('92%')}
              ${skeletonLine('76%')}
              ${skeletonLine('38%', '12px')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function loadingCard(title, message = '') {
    return `
      <div class="card guard-loading-card">
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <h3>${escapeHtml(title)}</h3>
          <span class="pill">${escapeHtml(t('loading'))}</span>
        </div>
        <div class="guard-skeleton-stack" style="margin-top:12px;">
          ${skeletonLine('96%')}
          ${skeletonLine('84%')}
          ${skeletonLine('64%')}
        </div>
        ${message ? `<div class="muted small" style="margin-top:12px;">${escapeHtml(message)}</div>` : ''}
      </div>
    `;
  }

  function renderPanelSectionsMarkup(sections) {
    return sections.map((section) => `
      <div data-panel-section="${escapeHtml(section.id)}">
        ${section.html || loadingCard(section.title || '')}
      </div>
    `).join('');
  }

  function setPanelSections(title, description, sections, actionsHtml = '') {
    const bodyHtml = renderPanelSectionsMarkup(sections);
    setPanel(title, description, bodyHtml, actionsHtml);
  }

  function updatePanelSection(sectionId, html) {
    const target = document.querySelector(`[data-panel-section="${sectionId}"]`);
    if (!target) return;
    target.innerHTML = html;
  }

  function renderTabLoadingState(tabId) {
    const loadingLabel = state.lang === 'zh' ? '正在准备页面结构与数据区域…' : 'Preparing the layout and data slots…';
    if (tabId === 'search') return;
    if (tabId === 'files') {
      if (state.filesMode === 'memory') {
        setPanel(t('tabs.files'), t('desc.files'), `
          <div class="toolbar">
            ${skeletonButton('140px')}
            ${skeletonButton('140px')}
          </div>
          <div class="grid" style="margin-top:14px;">
            ${loadingMetricCard(state.lang === 'zh' ? '记忆文件数' : 'Memory Files')}
            ${loadingMetricCard(state.lang === 'zh' ? '覆盖 Agent' : 'Covered Agents')}
            ${loadingMetricCard(state.lang === 'zh' ? '当前打开' : 'Current File')}
          </div>
          <div class="two-col" style="margin-top:14px;">
            <div class="card guard-loading-card">
              <h3>${escapeHtml(state.lang === 'zh' ? '核心记忆列表' : 'Core Memory')}</h3>
              <div class="split-list" style="margin-top:12px;">
                ${Array.from({ length: 6 }, (_, index) => `
                  <div class="guard-skeleton-entry">
                    ${skeletonLine(index % 2 === 0 ? '44%' : '52%', '16px')}
                    ${skeletonLine('90%', '12px')}
                  </div>
                `).join('')}
              </div>
            </div>
            ${loadingCard(state.lang === 'zh' ? '记忆编辑器' : 'Memory Editor', loadingLabel)}
          </div>
        `, renderFilesModeActionsHtml());
        bindFilesModeActions();
        return;
      }
      setPanel(t('tabs.files'), t('desc.files'), `
        <div class="toolbar">
          ${skeletonButton('148px')}
          ${skeletonButton('84px')}
          ${skeletonButton('104px')}
          ${skeletonButton('120px')}
          ${skeletonButton('120px')}
        </div>
        <div class="two-col">
          <div class="card guard-loading-card">
            <h3>${escapeHtml(state.lang === 'zh' ? '文件列表' : 'Files')}</h3>
            <div class="split-list" style="margin-top:12px;">
              ${Array.from({ length: 7 }, (_, index) => `
                <div class="guard-skeleton-entry">
                  ${skeletonLine(index % 2 === 0 ? '54%' : '64%', '16px')}
                  ${skeletonLine('86%', '12px')}
                </div>
              `).join('')}
            </div>
          </div>
          ${loadingCard(state.lang === 'zh' ? '文件编辑器' : 'Editor', loadingLabel)}
        </div>
      `, renderFilesModeActionsHtml());
      bindFilesModeActions();
      return;
    }
    if (tabId === 'channels' || tabId === 'models' || tabId === 'cron') {
      setPanel(t(`tabs.${tabId}`), t(`desc.${tabId}`), `
        <div class="toolbar">
          ${skeletonButton('112px')}
          ${skeletonButton('112px')}
          ${skeletonButton('140px')}
        </div>
        <div class="two-col">
          <div class="card guard-loading-card">
            <h3>${escapeHtml(state.lang === 'zh' ? '列表区域' : 'List Area')}</h3>
            <div style="margin-top:12px;">${loadingListBlock(5)}</div>
          </div>
          ${loadingCard(state.lang === 'zh' ? '详情区域' : 'Detail Area', loadingLabel)}
        </div>
      `);
      return;
    }
    if (tabId === 'security') {
      setPanelSections(t('tabs.security'), t('desc.security'), [
        { id: 'security-audit', title: state.lang === 'zh' ? '安全检查' : 'Security Checks', html: loadingCard(state.lang === 'zh' ? '安全检查' : 'Security Checks', loadingLabel) },
        { id: 'security-modes', title: state.lang === 'zh' ? '权限模式' : 'Permission Modes', html: loadingCard(state.lang === 'zh' ? '权限模式' : 'Permission Modes', loadingLabel) },
        { id: 'security-hardening', title: state.lang === 'zh' ? '主机加固指南' : 'Host Hardening Guide', html: loadingCard(state.lang === 'zh' ? '主机加固指南' : 'Host Hardening Guide', loadingLabel) },
      ]);
      return;
    }
    if (tabId === 'notifications') {
      setPanel(t('tabs.notifications'), t('desc.notifications'), `
        <div class="toolbar">
          ${skeletonButton('120px')}
          ${skeletonButton('136px')}
          ${skeletonButton('180px')}
          ${skeletonButton('108px')}
          ${skeletonButton('120px')}
        </div>
        ${loadingListBlock(6)}
      `);
      return;
    }
    if (tabId === 'costs') {
      setPanel(t('tabs.costs'), t('desc.costs'), `
        <div class="grid">
          ${loadingMetricCard(state.lang === 'zh' ? '总成本' : 'Total Cost')}
          ${loadingMetricCard(state.lang === 'zh' ? '总 Tokens' : 'Total Tokens')}
          ${loadingMetricCard(state.lang === 'zh' ? '会话数' : 'Sessions')}
        </div>
        <div class="grid">
          <div class="card guard-loading-card">
            <h3>${escapeHtml(state.lang === 'zh' ? '按模型' : 'By Model')}</h3>
            <div style="margin-top:12px;">${loadingListBlock(4)}</div>
          </div>
          <div class="card guard-loading-card">
            <h3>${escapeHtml(state.lang === 'zh' ? '按 Agent' : 'By Agent')}</h3>
            <div style="margin-top:12px;">${loadingListBlock(4)}</div>
          </div>
        </div>
      `);
      return;
    }
    if (tabId === 'agents' || tabId === 'sessions' || tabId === 'activity' || tabId === 'logs') {
      setPanel(t(`tabs.${tabId}`), t(`desc.${tabId}`), `
        <div class="grid">
          ${loadingMetricCard(state.lang === 'zh' ? '摘要 1' : 'Summary 1')}
          ${loadingMetricCard(state.lang === 'zh' ? '摘要 2' : 'Summary 2')}
          ${loadingMetricCard(state.lang === 'zh' ? '摘要 3' : 'Summary 3')}
        </div>
        ${loadingListBlock(tabId === 'activity' ? 7 : 5)}
      `);
      return;
    }
    setPanel(t(`tabs.${tabId}`), t(`desc.${tabId}`), `
      <div class="grid">
        ${loadingCard(state.lang === 'zh' ? '内容摘要' : 'Summary', loadingLabel)}
        ${loadingCard(state.lang === 'zh' ? '明细区域' : 'Details', loadingLabel)}
      </div>
    `);
  }

  function renderNavButtons(tabs, active) {
    return tabs.map((tabId) => `<button type="button" class="guard-tab ${tabId === active ? 'active' : ''}" data-tab="${tabId}">${escapeHtml(t(`tabs.${tabId}`))}</button>`).join('');
  }

  function getToolbarIconSvg(iconName) {
    if (iconName === 'desktop') {
      return `
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3.2" y="4.2" width="13.6" height="9.2" rx="2.1" />
          <path d="M7.4 15.8h5.2" />
          <path d="M10 13.4v2.4" />
        </svg>
      `;
    }
    if (iconName === 'sun') {
      return `
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="3.2" />
          <path d="M10 2.5v2.2" />
          <path d="M10 15.3v2.2" />
          <path d="m4.7 4.7 1.6 1.6" />
          <path d="m13.7 13.7 1.6 1.6" />
          <path d="M2.5 10h2.2" />
          <path d="M15.3 10h2.2" />
          <path d="m4.7 15.3 1.6-1.6" />
          <path d="m13.7 6.3 1.6-1.6" />
        </svg>
      `;
    }
    if (iconName === 'moon') {
      return `
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12.9 3.4a6.9 6.9 0 1 0 3.7 12.2A7.3 7.3 0 0 1 12.9 3.4Z" />
        </svg>
      `;
    }
    if (iconName === 'globe') {
      return `
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7" />
          <path d="M3.4 7.6h13.2" />
          <path d="M3.4 12.4h13.2" />
          <path d="M10 3c1.8 1.8 2.8 4.3 2.8 7S11.8 15.2 10 17" />
          <path d="M10 3c-1.8 1.8-2.8 4.3-2.8 7S8.2 15.2 10 17" />
        </svg>
      `;
    }
    if (iconName === 'refresh') {
      return `
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M16.2 10A6.2 6.2 0 1 1 14 5.28" />
          <path d="M16.2 3.8v4.4h-4.4" />
        </svg>
      `;
    }
    if (iconName === 'password') {
      return `
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="4.5" y="9" width="11" height="7" rx="2.2" />
          <path d="M7 9V7.7A3 3 0 0 1 10 4.7a3 3 0 0 1 3 3V9" />
          <circle cx="10" cy="12.4" r="1.05" fill="currentColor" stroke="none" />
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8.2 5.2H5.8A1.8 1.8 0 0 0 4 7v6a1.8 1.8 0 0 0 1.8 1.8h2.4" />
        <path d="M11.2 6.3 15 10l-3.8 3.7" />
        <path d="M8.2 10H15" />
      </svg>
    `;
  }

  function renderToolbarIconButton(action, label, iconName) {
    return `
      <button
        class="guard-icon-btn"
        type="button"
        data-global-action="${escapeHtml(action)}"
        aria-label="${escapeHtml(label)}"
        title="${escapeHtml(label)}"
        data-tooltip="${escapeHtml(label)}"
      >
        ${getToolbarIconSvg(iconName)}
      </button>
    `;
  }

  function getThemePreferenceMeta(preference = state.themePreference) {
    const normalized = normalizeThemePreference(preference);
    if (normalized === 'light') {
      return {
        icon: 'sun',
        label: t('themeLight'),
      };
    }
    if (normalized === 'dark') {
      return {
        icon: 'moon',
        label: t('themeDark'),
      };
    }
    return {
      icon: 'desktop',
      label: t('themeAuto'),
    };
  }

  function renderTopMenuTrigger(menuId, label, iconName) {
    const isOpen = state.topMenu === menuId;
    return `
      <button
        class="guard-icon-btn guard-menu-trigger ${isOpen ? 'active' : ''}"
        type="button"
        data-top-menu-trigger="${escapeHtml(menuId)}"
        aria-label="${escapeHtml(label)}"
        aria-expanded="${isOpen ? 'true' : 'false'}"
        aria-haspopup="menu"
        title="${escapeHtml(label)}"
        data-tooltip="${escapeHtml(label)}"
      >
        ${getToolbarIconSvg(iconName)}
      </button>
    `;
  }

  function renderTopMenuOption(options) {
    const {
      value,
      label,
      iconName = '',
      active = false,
      attrName,
    } = options;
    const iconMarkup = iconName
      ? `<span class="guard-menu-item-icon" aria-hidden="true">${getToolbarIconSvg(iconName)}</span>`
      : `<span class="guard-menu-item-icon guard-menu-item-icon-text" aria-hidden="true">${escapeHtml(String(label || '').slice(0, 2).toUpperCase())}</span>`;
    return `
      <button
        class="guard-menu-item ${active ? 'active' : ''}"
        type="button"
        ${attrName}="${escapeHtml(value)}"
        role="menuitemradio"
        aria-checked="${active ? 'true' : 'false'}"
      >
        ${iconMarkup}
        <span class="guard-menu-item-copy">${escapeHtml(label)}</span>
      </button>
    `;
  }

  function renderThemeMenu() {
    const themeMeta = getThemePreferenceMeta();
    return `
      <div class="guard-topmenu ${state.topMenu === 'theme' ? 'open' : ''}" data-top-menu="theme">
        ${renderTopMenuTrigger('theme', `${t('themeLabel')} · ${themeMeta.label}`, themeMeta.icon)}
        <div class="guard-topmenu-popover" role="menu" aria-label="${escapeHtml(t('themeLabel'))}">
          <div class="guard-topmenu-header">${escapeHtml(t('themeLabel'))}</div>
          ${renderTopMenuOption({ attrName: 'data-theme-pref', value: 'auto', label: t('themeAuto'), iconName: 'desktop', active: state.themePreference === 'auto' })}
          ${renderTopMenuOption({ attrName: 'data-theme-pref', value: 'light', label: t('themeLight'), iconName: 'sun', active: state.themePreference === 'light' })}
          ${renderTopMenuOption({ attrName: 'data-theme-pref', value: 'dark', label: t('themeDark'), iconName: 'moon', active: state.themePreference === 'dark' })}
        </div>
      </div>
    `;
  }

  function renderLanguageMenu() {
    const currentLangLabel = state.lang === 'en' ? 'English' : '中文';
    return `
      <div class="guard-topmenu ${state.topMenu === 'lang' ? 'open' : ''}" data-top-menu="lang">
        ${renderTopMenuTrigger('lang', `${state.lang === 'zh' ? '语言' : 'Language'} · ${currentLangLabel}`, 'globe')}
        <div class="guard-topmenu-popover" role="menu" aria-label="${escapeHtml(state.lang === 'zh' ? '语言' : 'Language')}">
          <div class="guard-topmenu-header">${escapeHtml(state.lang === 'zh' ? '语言' : 'Language')}</div>
          ${renderTopMenuOption({ attrName: 'data-lang', value: 'zh', label: '中文', active: state.lang === 'zh' })}
          ${renderTopMenuOption({ attrName: 'data-lang', value: 'en', label: 'English', active: state.lang === 'en' })}
        </div>
      </div>
    `;
  }

  function renderChromeControls(options = {}) {
    const includeRefresh = options.includeRefresh !== false;
    const includeAccountActions = options.includeAccountActions === true;
    return `
      <div class="guard-icon-actions">
        ${renderThemeMenu()}
        ${renderLanguageMenu()}
        ${includeRefresh ? renderToolbarIconButton('refresh', t('refresh'), 'refresh') : ''}
        ${includeAccountActions ? renderToolbarIconButton('change-pwd', t('changePassword'), 'password') : ''}
        ${includeAccountActions ? renderToolbarIconButton('logout', t('logout'), 'logout') : ''}
      </div>
    `;
  }

  function syncTopMenuState() {
    document.querySelectorAll('[data-top-menu]').forEach((node) => {
      const menuId = node.getAttribute('data-top-menu');
      const isOpen = menuId === state.topMenu;
      node.classList.toggle('open', isOpen);
      const trigger = node.querySelector('[data-top-menu-trigger]');
      if (trigger) {
        trigger.classList.toggle('active', isOpen);
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  }

  function closeTopMenu() {
    if (!state.topMenu) return;
    state.topMenu = null;
    syncTopMenuState();
  }

  function bindTopMenuControls(options = {}) {
    const onLanguageChange = typeof options.onLanguageChange === 'function' ? options.onLanguageChange : (() => {});
    bindTopMenuControls._options = { onLanguageChange };
    document.removeEventListener('click', bindTopMenuControls._handleDocumentClick, true);
    bindTopMenuControls._handleDocumentClick = (event) => {
      if (!state.topMenu) return;
      const openMenu = document.querySelector(`[data-top-menu="${state.topMenu}"]`);
      if (openMenu?.contains(event.target)) return;
      closeTopMenu();
    };
    document.addEventListener('click', bindTopMenuControls._handleDocumentClick, true);

    document.removeEventListener('keydown', bindTopMenuControls._handleEscape);
    bindTopMenuControls._handleEscape = (event) => {
      if (event.key === 'Escape') closeTopMenu();
    };
    document.addEventListener('keydown', bindTopMenuControls._handleEscape);

    app.querySelectorAll('[data-top-menu-trigger]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const menuId = button.getAttribute('data-top-menu-trigger');
        state.topMenu = state.topMenu === menuId ? null : menuId;
        syncTopMenuState();
      });
    });
    app.querySelectorAll('[data-theme-pref]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        applyThemePreference(button.getAttribute('data-theme-pref') || 'auto');
        closeTopMenu();
        renderCurrentChromeControls();
      });
    });
    app.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        state.lang = button.getAttribute('data-lang') || 'zh';
        localStorage.setItem(STORAGE_LANG, state.lang);
        closeTopMenu();
        onLanguageChange();
      });
    });
    syncTopMenuState();
  }

  function renderCurrentChromeControls() {
    document.querySelectorAll('[data-top-controls]').forEach((target) => {
      const mode = target.getAttribute('data-top-controls');
      target.innerHTML = renderChromeControls({
        includeRefresh: mode !== 'login',
        includeAccountActions: mode === 'shell' && !!state.authToken,
      });
    });
    syncTopMenuState();
    if (bindTopMenuControls._options) {
      bindTopMenuControls(bindTopMenuControls._options);
    }
  }

  function renderInnerTabNav(options = {}) {
    const {
      tabs,
      activeId,
      attrName,
      label,
    } = options;
    return `
      <div class="panel-subtabs" role="tablist" aria-label="${escapeHtml(label || '')}">
        ${tabs.map((tab) => {
          const tabId = tab.id;
          const tabLabel = tab.label || t(tab.labelKey);
          return `
            <button
              class="panel-subtab ${tabId === activeId ? 'active' : ''}"
              type="button"
              role="tab"
              ${attrName}="${escapeHtml(tabId)}"
              aria-selected="${tabId === activeId ? 'true' : 'false'}"
            >
              ${escapeHtml(tabLabel)}
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderInnerTabShell(options = {}) {
    return `
      <div class="panel-subview-shell">
        ${renderInnerTabNav(options)}
        <div class="panel-subview-body" data-subview-body="${escapeHtml(options.groupId)}">
          ${options.contentHtml || ''}
        </div>
      </div>
    `;
  }

  function updateInnerTabBody(groupId, html) {
    const target = document.querySelector(`[data-subview-body="${groupId}"]`);
    if (!target) return;
    target.innerHTML = html;
  }

  function getInnerTabAttrName(groupId) {
    if (groupId === 'security') return 'data-security-view';
    if (groupId === 'git-sync') return 'data-git-sync-view';
    if (groupId === 'git-sync-advanced') return 'data-git-sync-advanced-view';
    return 'data-subview';
  }

  function syncInnerTabState(groupId, activeId) {
    document.querySelectorAll(`[data-subview-body="${groupId}"]`).forEach((node) => {
      node.closest('.panel-subview-shell')?.querySelectorAll('.panel-subtab').forEach((button) => {
        const attrName = getInnerTabAttrName(groupId);
        const isActive = button.getAttribute(attrName) === activeId;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    });
  }

  function renderNavSection(options) {
    const {
      id,
      title,
      hint,
      tabs,
      active,
      priority = 'secondary',
    } = options;
    return `
      <section class="guard-nav-section priority-${escapeHtml(priority)}" data-nav-section="${escapeHtml(id)}">
        <div class="guard-nav-meta">
          <div class="guard-nav-copy">
            <div class="guard-nav-kicker">${escapeHtml(title)}</div>
            <div class="guard-nav-note">${escapeHtml(hint)}</div>
          </div>
        </div>
        <div class="guard-tabs">${renderNavButtons(tabs, active)}</div>
      </section>
    `;
  }

  function renderShell() {
    const active = state.activeTab || 'overview';
    app.innerHTML = `
      <div class="guard-shell">
        <header class="guard-chrome">
          <div class="guard-chrome-inner">
            <div class="guard-brand">
              <div class="guard-badge">
                <img class="guard-badge-logo" src="/ui/logo.png" alt="OpenClaw Guard logo" />
              </div>
            <div class="guard-title">
              <h1>${escapeHtml(t('appTitle'))}</h1>
              <p>${escapeHtml(t('appSubtitle'))}</p>
            </div>
          </div>
            <div class="guard-actions" data-top-controls="shell">
              ${renderChromeControls({ includeRefresh: true, includeAccountActions: !!state.authToken })}
            </div>
          </div>
        </header>
        <div class="guard-body">
          <aside class="guard-sidebar">
            <div class="guard-sidebar-inner">
              <nav class="guard-nav-stack" id="guard-nav">
                ${NAV_GROUPS.map((group) => renderNavSection({
                  id: group.id,
                  title: t(group.titleKey),
                  hint: t(group.hintKey),
                  tabs: group.tabs,
                  active,
                  priority: group.priority,
                })).join('')}
              </nav>
            </div>
          </aside>
          <section class="guard-workspace">
          <main class="guard-main">
            <div class="guard-main-inner">
              <div id="guard-panel"><div class="empty">${escapeHtml(t('loading'))}</div></div>
            </div>
          </main>
          </section>
        </div>
        <div id="guard-toast" class="toast"></div>
      </div>
    `;

    app.querySelectorAll('[data-tab]').forEach((button) => {
      button.addEventListener('click', () => setActiveTab(button.getAttribute('data-tab')));
    });
    bindTopMenuControls({
      onLanguageChange: () => {
        renderShell();
        loadActiveTab();
      },
    });
    app.querySelector('[data-global-action="refresh"]')?.addEventListener('click', () => loadActiveTab(true));
    app.querySelector('[data-global-action="change-pwd"]')?.addEventListener('click', () => showChangePwdDialog());
    app.querySelector('[data-global-action="logout"]')?.addEventListener('click', async () => {
      try { await postJson('/api/auth/logout', {}); } catch { /* 忽略 */ }
      state.authToken = null;
      localStorage.removeItem(STORAGE_TOKEN);
      renderLoginPage();
    });
  }

  async function loadOverview(options = {}) {
    const viewTabId = 'overview';
    const reuseExisting = options.reuseExisting === true;
    if (!reuseExisting) {
      setPanelSections(t('tabs.overview'), t('desc.overview'), [
        { id: 'overview-availability', title: state.lang === 'zh' ? '当前可用性' : 'Current Availability' },
        { id: 'overview-actions', title: state.lang === 'zh' ? '建议动作' : 'Recommended Actions' },
        { id: 'overview-risks', title: state.lang === 'zh' ? '风险提示' : 'Risk Signals' },
      ]);
    }

    const overviewPromise = apiRequest('/api/dashboard/overview');
    const webReportPromise = apiRequest('/api/web-background/report').catch(async () => {
      const webStatus = await apiRequest('/api/web-background/status');
      return {
        running: webStatus.running,
        pid: webStatus.pid,
        port: webStatus.port,
        managed: webStatus.managed,
        source: webStatus.source,
        primaryUrl: `http://127.0.0.1:${webStatus.port}/`,
        workbenchUrl: `http://127.0.0.1:${webStatus.port}/workbench`,
        nextAction: webStatus.running ? (webStatus.managed ? 'open-workbench' : 'adopt-or-stop') : 'start-web',
        scenario: webStatus.running ? (webStatus.managed ? 'managed-running' : 'unmanaged-running') : 'stopped',
        pidFile: webStatus.pidFile || '-',
        logPaths: {
          stdout: '-',
          stderr: '-',
        },
      };
    });
    const openclawStatusPromise = apiRequest('/api/openclaw/status').catch(() => ({
      installed: false,
      version: '-',
      latestVersion: '-',
      installReady: false,
      installBlockers: [],
    }));
    const aiConfigPromise = apiRequest('/api/ai/config').catch(() => ({
      primaryModel: '',
      fallbackModels: [],
      availableModels: [],
      providers: [],
    }));
    const channelsPromise = apiRequest('/api/channels').catch(() => []);
    const recoveryOverviewPromise = apiRequest('/api/recovery/overview').catch(() => ({
      protected: false,
      repoReady: false,
      remoteReady: false,
      currentBranch: null,
      lastSavedAt: null,
      lastPushedAt: null,
      unsyncedChanges: false,
      nextAction: 'setup-protection',
      warnings: [],
      latestPoint: null,
    }));
    const auditPromise = apiRequest('/api/audit').catch(() => ({
      summary: { pass: 0, warn: 0, fail: 0 },
      results: [],
    }));

    if (!reuseExisting) {
      updatePanelSection('overview-availability', `
        <div class="grid">
          ${loadingCard(state.lang === 'zh' ? '可用性总览' : 'Availability Overview', state.lang === 'zh' ? '正在读取当前机器的关键状态…' : 'Loading the key state of this machine…')}
          ${loadingMetricCard('Guard Web')}
          ${loadingMetricCard('Gateway')}
        </div>
      `);
      updatePanelSection('overview-actions', loadingCard(state.lang === 'zh' ? '建议动作' : 'Recommended Actions', state.lang === 'zh' ? '正在整理最建议优先处理的动作…' : 'Preparing the recommended next actions…'));
      updatePanelSection('overview-risks', loadingCard(state.lang === 'zh' ? '风险提示' : 'Risk Signals', state.lang === 'zh' ? '正在汇总安全与运行风险…' : 'Collecting runtime and security risks…'));
    }

    const [overview, webReport, openclawStatus, aiConfig, channels, recoveryOverview, auditData] = await Promise.all([
      overviewPromise,
      webReportPromise,
      openclawStatusPromise,
      aiConfigPromise,
      channelsPromise,
      recoveryOverviewPromise,
      auditPromise,
    ]);
    if (state.activeTab !== viewTabId) return;

    const alerts = overview.runtime?.alerts || [];
    const unreadNotifications = overview.notifications?.unread || 0;
    const latestNotifications = overview.notifications?.latest || [];
    const gatewayRunning = !!overview.gateway?.running;
    const gatewayReachable = overview.runtime?.gateway?.reachable !== false;
    const primaryModel = aiConfig.primaryModel || '';
    const configuredProviders = Array.isArray(aiConfig.providers) ? aiConfig.providers : [];
    const enabledChannels = (channels || []).filter((item) => item.enabled).length;
    const configuredChannels = (channels || []).filter((item) => item.configured).length;
    const securitySummary = auditData.summary || {};
    const serviceActionMeta = getServiceActionMeta(overview.gateway?.action || {});
    const securityHasFailure = (securitySummary.fail || 0) > 0;
    const securityHasWarning = (securitySummary.warn || 0) > 0;
    const recoveryReady = recoveryOverview?.protected === true;
    const recoveryCloudReady = recoveryOverview?.remoteReady === true;
    const systemReady = webReport.running && gatewayRunning && openclawStatus.installed && !!primaryModel && !securityHasFailure;
    const heroTone = securityHasFailure || !webReport.running || !gatewayRunning || !openclawStatus.installed
      ? 'warn'
      : alerts.length || unreadNotifications > 0 || !primaryModel || !recoveryReady
        ? 'info'
        : 'success';
    const heroTitle = systemReady
      ? (state.lang === 'zh' ? '现在可以开始正常工作' : 'The system is ready to work')
      : (state.lang === 'zh' ? '当前还需要先处理几个关键问题' : 'A few blockers still need attention first');
    const heroBody = systemReady
      ? (state.lang === 'zh'
        ? '核心服务与模型链路已经达到可用基线。下一步建议把渠道和备份保护补齐，让日常使用更稳、回退更安心。'
        : 'Core services and model routing are usable. The next step is to complete channels and protection so daily work stays steadier and easier to recover.')
      : (state.lang === 'zh'
        ? '先处理下方的关键阻断项，再沿着首次启动向导补齐 OpenClaw、模型、渠道和备份保护。'
        : 'Clear the blockers below first, then follow the getting-started guide for OpenClaw, models, channels, and protection.');

    const availabilityHtml = `
      <div class="card overview-hero ${heroTone === 'success' ? 'accent-success' : heroTone === 'warn' ? 'accent-warn' : 'accent-info'}">
        <div class="overview-hero-header">
          <div>
            <div class="overview-kicker">${escapeHtml(state.lang === 'zh' ? '当前状态' : 'Current State')}</div>
            <h3>${escapeHtml(heroTitle)}</h3>
          </div>
          <span class="pill ${heroTone === 'success' ? 'success' : heroTone === 'warn' ? 'warn' : ''}">${escapeHtml(systemReady ? (state.lang === 'zh' ? '可工作' : 'Ready') : (state.lang === 'zh' ? '需处理' : 'Needs Attention'))}</span>
        </div>
        <p>${escapeHtml(heroBody)}</p>
      </div>
      <div class="grid">
        ${metricCard('Guard Web', getRunStateLabel(webReport.running), webReport.primaryUrl || '-', webReport.running ? 'success' : 'warn')}
        ${metricCard('Gateway', getRunStateLabel(gatewayRunning), overview.gateway?.port ? `port ${overview.gateway.port}` : '-', gatewayRunning && gatewayReachable ? 'success' : 'warn')}
        ${metricCard('OpenClaw', openclawStatus.installed ? (openclawStatus.version || 'READY') : (state.lang === 'zh' ? '未安装' : 'Missing'), openclawStatus.installed ? (openclawStatus.updateAvailable ? (state.lang === 'zh' ? `可升级到 ${openclawStatus.latestVersion || '-'}` : `update to ${openclawStatus.latestVersion || '-'}`) : (state.lang === 'zh' ? 'CLI 已就绪' : 'CLI ready')) : (state.lang === 'zh' ? '需要先安装或修复' : 'install or repair required'), openclawStatus.installed ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '模型' : 'Models', primaryModel || (state.lang === 'zh' ? '待配置' : 'Not configured'), configuredProviders.length ? `${formatNumber(configuredProviders.length)} ${state.lang === 'zh' ? '个 Provider' : 'providers'}` : (state.lang === 'zh' ? '还没有 Provider' : 'no provider yet'), primaryModel ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '渠道' : 'Channels', `${formatNumber(enabledChannels)} / ${formatNumber((channels || []).length)}`, state.lang === 'zh' ? `${formatNumber(configuredChannels)} 个已配置` : `${formatNumber(configuredChannels)} configured`, enabledChannels > 0 ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '备份与恢复' : 'Backup & Recovery', recoveryReady ? (state.lang === 'zh' ? '已受保护' : 'Protected') : (state.lang === 'zh' ? '待建立' : 'Setup needed'), recoveryReady ? (recoveryCloudReady ? (state.lang === 'zh' ? '云端保护已就绪' : 'cloud protection ready') : (state.lang === 'zh' ? '当前仅本机可恢复' : 'local recovery only')) : (state.lang === 'zh' ? '建议先创建首个恢复点' : 'create the first recovery point next'), recoveryReady ? (recoveryCloudReady ? 'success' : 'warn') : 'warn')}
      </div>
    `;

    const setupSteps = [
      {
        id: 'openclaw',
        complete: !!openclawStatus.installed,
        title: state.lang === 'zh' ? '安装或修复 OpenClaw' : 'Install or Repair OpenClaw',
        body: openclawStatus.installed
          ? (state.lang === 'zh' ? 'OpenClaw CLI 已可用，后续工作区能力可以正常接入。' : 'The OpenClaw CLI is ready, so workspace features can attach cleanly.')
          : (state.lang === 'zh' ? '先把 OpenClaw CLI 装好，这是后续运行链路的基础。' : 'Set up the OpenClaw CLI first because the rest of the runtime depends on it.'),
        meta: openclawStatus.installed
          ? (openclawStatus.updateAvailable ? (state.lang === 'zh' ? `当前 ${openclawStatus.version || '-'}，可升级到 ${openclawStatus.latestVersion || '-'}` : `${openclawStatus.version || '-'} installed, update to ${openclawStatus.latestVersion || '-'}`) : (state.lang === 'zh' ? `当前版本 ${openclawStatus.version || '-'}` : `Current version ${openclawStatus.version || '-'}`))
          : (openclawStatus.installBlockers?.[0] || (state.lang === 'zh' ? '安装页会给出适合当前机器的命令。' : 'The OpenClaw page shows the commands that fit this machine.')),
        tabId: 'openclaw',
        label: state.lang === 'zh' ? '打开 OpenClaw' : 'Open OpenClaw',
      },
      {
        id: 'models',
        complete: !!primaryModel,
        title: state.lang === 'zh' ? '配置模型策略' : 'Configure Models',
        body: primaryModel
          ? (state.lang === 'zh' ? '主模型已经设好，Guard 有了稳定的默认执行路径。' : 'A primary model is configured, so Guard now has a stable default route.')
          : (state.lang === 'zh' ? '至少配置一个 Provider，并先确定主模型，再考虑备用顺序。' : 'Create at least one provider and lock the primary model before choosing fallbacks.'),
        meta: primaryModel
          ? (state.lang === 'zh' ? `主模型: ${primaryModel}` : `Primary model: ${primaryModel}`)
          : configuredProviders.length
            ? (state.lang === 'zh' ? `已配置 ${formatNumber(configuredProviders.length)} 个 Provider，待选定主模型` : `${formatNumber(configuredProviders.length)} providers configured, primary model still missing`)
            : (state.lang === 'zh' ? '当前还没有任何 Provider。' : 'No provider has been configured yet.'),
        tabId: 'models',
        label: state.lang === 'zh' ? '打开模型' : 'Open Models',
      },
      {
        id: 'channels',
        complete: enabledChannels > 0 && configuredChannels > 0,
        title: state.lang === 'zh' ? '连接官方渠道' : 'Connect Channels',
        body: enabledChannels > 0 && configuredChannels > 0
          ? (state.lang === 'zh' ? '消息入口已经接好，系统可以开始接收外部消息。' : 'At least one channel is connected, so the system can receive real messages.')
          : (state.lang === 'zh' ? '至少启用并配置一个官方渠道，让消息真正进入工作流。' : 'Enable and configure at least one built-in channel so real messages can enter the workflow.'),
        meta: state.lang === 'zh'
          ? `已启用 ${formatNumber(enabledChannels)} / 已配置 ${formatNumber(configuredChannels)}`
          : `enabled ${formatNumber(enabledChannels)} / configured ${formatNumber(configuredChannels)}`,
        tabId: 'channels',
        label: state.lang === 'zh' ? '打开渠道' : 'Open Channels',
      },
      {
        id: 'git-sync',
        complete: recoveryReady,
        title: state.lang === 'zh' ? '开启备份与恢复' : 'Turn On Backup & Recovery',
        body: recoveryReady
          ? (state.lang === 'zh' ? '恢复点已经建立，后续玩坏了也能回到稳定节点。' : 'A recovery point exists now, so you can return to a stable state when experiments go wrong.')
          : (state.lang === 'zh' ? '先保存一个恢复点，再按需要补上云端保护。' : 'Create the first recovery point now, then add cloud protection when you are ready.'),
        meta: recoveryReady
          ? (recoveryCloudReady
            ? (state.lang === 'zh' ? '当前云端保护已就绪。' : 'Cloud protection is ready.')
            : (state.lang === 'zh' ? '当前仅本机可恢复，建议后续补上云端保护。' : 'Recovery is local-only right now. Add cloud protection next.'))
          : (recoveryOverview?.warnings?.[0] || (state.lang === 'zh' ? '恢复中心会把 Git 细节隐藏在高级视图里。' : 'The recovery view keeps raw Git details inside Advanced Git.')),
        tabId: 'git-sync',
        label: state.lang === 'zh' ? '打开备份与恢复' : 'Open Backup & Recovery',
      },
    ];

    const completedSetupSteps = setupSteps.filter((item) => item.complete).length;
    const currentSetupStep = setupSteps.find((item) => !item.complete) || setupSteps[setupSteps.length - 1];
    const showGuide = !state.overviewGuideHidden;
    const pathCards = [
      {
        complete: !!openclawStatus.installed,
        tone: openclawStatus.installed ? 'success' : 'warn',
        kicker: state.lang === 'zh' ? '主路径 1 / 4' : 'Path 1 / 4',
        title: state.lang === 'zh' ? '安装 / 修复 OpenClaw' : 'Install / Repair OpenClaw',
        body: openclawStatus.installed
          ? (state.lang === 'zh' ? 'CLI 已就绪，Guard 可以继续管理更新、回退和运行状态。' : 'The CLI is ready, so Guard can continue managing updates, rollback, and runtime state.')
          : (state.lang === 'zh' ? '先把 OpenClaw 装好或修好，这是整机链路的第一步。' : 'Set up or repair OpenClaw first because everything else builds on it.'),
        meta: openclawStatus.installed
          ? (openclawStatus.updateAvailable ? (state.lang === 'zh' ? `可升级到 ${openclawStatus.latestVersion || '-'}` : `Update available: ${openclawStatus.latestVersion || '-'}`) : (state.lang === 'zh' ? `当前版本 ${openclawStatus.version || '-'}` : `Current version ${openclawStatus.version || '-'}`))
          : (openclawStatus.installBlockers?.[0] || (state.lang === 'zh' ? '安装页会根据当前来源给出推荐动作。' : 'The OpenClaw page will suggest the next action for the current install source.')),
        tabId: 'openclaw',
        label: state.lang === 'zh' ? '查看 OpenClaw' : 'Open OpenClaw',
      },
      {
        complete: !!primaryModel,
        tone: primaryModel ? 'success' : 'warn',
        kicker: state.lang === 'zh' ? '主路径 2 / 4' : 'Path 2 / 4',
        title: state.lang === 'zh' ? '模型配置' : 'Model Configuration',
        body: primaryModel
          ? (state.lang === 'zh' ? '主模型已经选定，现在更适合继续补齐备用模型和 Provider 说明。' : 'The primary model is selected, so you can polish fallbacks and provider details next.')
          : (state.lang === 'zh' ? '先把主模型定下来，让系统的默认行为稳定可预测。' : 'Set the primary model first so the system stays predictable.'),
        meta: primaryModel
          ? primaryModel
          : configuredProviders.length
            ? (state.lang === 'zh' ? `${formatNumber(configuredProviders.length)} 个 Provider 已就绪` : `${formatNumber(configuredProviders.length)} providers ready`)
            : (state.lang === 'zh' ? '当前还没有 Provider。' : 'No provider is configured yet.'),
        tabId: 'models',
        label: state.lang === 'zh' ? '查看模型' : 'Open Models',
      },
      {
        complete: enabledChannels > 0 && configuredChannels > 0,
        tone: enabledChannels > 0 && configuredChannels > 0 ? 'success' : 'warn',
        kicker: state.lang === 'zh' ? '主路径 3 / 4' : 'Path 3 / 4',
        title: state.lang === 'zh' ? '渠道连接' : 'Channel Connection',
        body: enabledChannels > 0 && configuredChannels > 0
          ? (state.lang === 'zh' ? '官方渠道已经接通，接下来可以继续优化凭据与路由策略。' : 'A built-in channel is ready, and you can continue polishing credentials or routing later.')
          : (state.lang === 'zh' ? '至少接好一个官方渠道，Guard 才能真正收消息、跑完整链路。' : 'Connect at least one built-in channel so Guard can receive real messages and run the full path.'),
        meta: state.lang === 'zh'
          ? `启用 ${formatNumber(enabledChannels)} / 配置 ${formatNumber(configuredChannels)}`
          : `enabled ${formatNumber(enabledChannels)} / configured ${formatNumber(configuredChannels)}`,
        tabId: 'channels',
        label: state.lang === 'zh' ? '查看渠道' : 'Open Channels',
      },
      {
        complete: recoveryReady,
        tone: recoveryReady ? 'success' : 'warn',
        kicker: state.lang === 'zh' ? '主路径 4 / 4' : 'Path 4 / 4',
        title: state.lang === 'zh' ? '备份与恢复' : 'Backup & Recovery',
        body: recoveryReady
          ? (state.lang === 'zh' ? '现在已经有“退可一键重生”的基础，后续可以继续把云端保护和范围管理补强。' : 'The project already has a recovery baseline, and you can strengthen cloud protection or scope management next.')
          : (state.lang === 'zh' ? '先把当前状态保存成恢复点，后面即使折腾坏了也能快速回去。' : 'Save the current state as a recovery point so you can return quickly when experiments go sideways.'),
        meta: recoveryReady
          ? (recoveryCloudReady
            ? (state.lang === 'zh' ? '最近一次保护点已具备云端保护能力。' : 'The latest recovery point is cloud protected.')
            : (state.lang === 'zh' ? '当前保护点还没有上云。' : 'The latest protection point is not in the cloud yet.'))
          : (recoveryOverview?.warnings?.[0] || (state.lang === 'zh' ? '恢复中心默认隐藏 Git 细节。' : 'The recovery view keeps Git details hidden by default.')),
        tabId: 'git-sync',
        label: state.lang === 'zh' ? '查看备份与恢复' : 'Open Backup & Recovery',
      },
    ];

    const guideHtml = showGuide ? `
      <div class="card accent-info overview-guide-card">
        <div class="overview-hero-header">
          <div>
            <div class="overview-kicker">${escapeHtml(state.lang === 'zh' ? '首次启动向导' : 'Getting Started')}</div>
            <h3>${escapeHtml(state.lang === 'zh' ? '先把这 4 步补齐，再进入日常工作' : 'Finish these 4 steps first, then move into daily work')}</h3>
          </div>
          <span class="pill ${completedSetupSteps === setupSteps.length ? 'success' : 'warn'}">${escapeHtml(state.lang === 'zh' ? `已完成 ${completedSetupSteps} / ${setupSteps.length}` : `${completedSetupSteps} / ${setupSteps.length} complete`)}</span>
        </div>
        <p>${escapeHtml(state.lang === 'zh'
          ? '这个向导默认只讲普通用户最需要的 4 条主路径，不要求你先理解 Git、Cron 或 OAuth 细节。'
          : 'This guide focuses on the 4 paths ordinary users need first. It does not expect Git, Cron, or OAuth knowledge up front.')}</p>
        ${(!webReport.running || !gatewayRunning || !gatewayReachable) ? `
          <div class="status warn" style="margin-top:14px;">
            ${escapeHtml(state.lang === 'zh'
              ? 'Guard Web 或 Gateway 还没稳定运行。先去运维页确认服务状态，再继续下面 4 步会更顺。'
              : 'Guard Web or Gateway is not stable yet. Check Operations first, then continue with the 4 steps below.')}
            <div class="toolbar tight" style="margin-top:12px;">
              <button class="action-btn" type="button" data-overview-open-tab="system" data-overview-focus="#system-service-card">${escapeHtml(state.lang === 'zh' ? '先看运维' : 'Open Operations First')}</button>
            </div>
          </div>
        ` : ''}
        <div class="overview-step-list" style="margin-top:16px;">
          ${setupSteps.map((step, index) => renderOverviewGuideStep({
            ...step,
            current: !step.complete && step.id === currentSetupStep.id,
          }, index, setupSteps.length)).join('')}
        </div>
        <div class="toolbar tight" style="margin-top:16px;">
          <button class="action-btn subtle" type="button" data-overview-guide-toggle="hide">${escapeHtml(state.lang === 'zh' ? '先收起这个向导' : 'Hide This Guide For Now')}</button>
        </div>
      </div>
    ` : `
      <div class="card overview-guide-compact">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <div>
            <div class="overview-kicker">${escapeHtml(state.lang === 'zh' ? '首次启动向导' : 'Getting Started')}</div>
            <h3>${escapeHtml(state.lang === 'zh' ? '需要时再展开 4 步引导' : 'Expand the 4-step guide when needed')}</h3>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? `当前完成 ${completedSetupSteps} / ${setupSteps.length}` : `${completedSetupSteps} / ${setupSteps.length} complete`)}</div>
          </div>
          <button class="action-btn" type="button" data-overview-guide-toggle="show">${escapeHtml(state.lang === 'zh' ? '展开向导' : 'Show Guide')}</button>
        </div>
      </div>
    `;

    const actionsHtml = `
      <div class="overview-onboarding-stack">
        ${guideHtml}
        <div class="overview-action-grid">
          ${pathCards.map((item) => renderOverviewPathCard(item)).join('')}
        </div>
        <div class="card overview-support-card">
          <div class="overview-hero-header">
            <div>
              <div class="overview-kicker">${escapeHtml(state.lang === 'zh' ? '求助与反馈' : 'Support & Feedback')}</div>
              <h3>${escapeHtml(state.lang === 'zh' ? '遇到问题时，先导出脱敏诊断包' : 'Export the redacted diagnostics bundle before asking for help')}</h3>
            </div>
          </div>
          <p>${escapeHtml(state.lang === 'zh'
            ? '诊断包会带上版本、状态、最近日志和恢复信息，但不会直接包含 Token、Secret 或密码值，适合开源 Issue 与远程协助。'
            : 'The diagnostics bundle includes versions, status, recent logs, and recovery signals, but it does not expose raw tokens, secrets, or passwords. It is designed for open-source issues and remote support.')}</p>
          <div class="toolbar tight" style="margin-top:14px;">
            <a class="action-btn primary" href="/api/support/diagnostics?download=1">${escapeHtml(state.lang === 'zh' ? '下载诊断包' : 'Download Diagnostics')}</a>
            <a class="action-btn" href="${escapeHtml(SUPPORT_ISSUES_URL)}" target="_blank" rel="noreferrer">${escapeHtml(state.lang === 'zh' ? '打开 Issue' : 'Open Issue')}</a>
          </div>
        </div>
      </div>
    `;

    const riskItems = [];
    if (!webReport.running) {
      riskItems.push({
        tone: 'danger',
        title: state.lang === 'zh' ? 'Guard Web 未运行' : 'Guard Web Is Not Running',
        message: state.lang === 'zh'
          ? '首页和工作台都依赖 Guard Web。请先去运维页启动或修复后台服务。'
          : 'The workbench depends on Guard Web. Start or repair the background service from Operations first.',
        tabId: 'system',
        selector: '#system-service-card',
      });
    }
    if (!openclawStatus.installed) {
      riskItems.push({
        tone: 'warn',
        title: state.lang === 'zh' ? 'OpenClaw CLI 缺失' : 'OpenClaw CLI Is Missing',
        message: state.lang === 'zh'
          ? 'CLI 没就绪时，角色、工作区和运行链路都会缺功能。'
          : 'Without the CLI, roles, workspaces, and the runtime path lose important capabilities.',
        tabId: 'openclaw',
      });
    }
    if (!primaryModel) {
      riskItems.push({
        tone: 'warn',
        title: state.lang === 'zh' ? '模型尚未配置' : 'Model Routing Is Missing',
        message: state.lang === 'zh'
          ? '还没有主模型，很多运行请求不会按预期工作。'
          : 'There is no primary model yet, so many runtime requests will not behave as expected.',
        tabId: 'models',
      });
    }
    if (securityHasFailure || securityHasWarning) {
      riskItems.push({
        tone: securityHasFailure ? 'danger' : 'warn',
        title: securityHasFailure ? (state.lang === 'zh' ? '安全检查存在失败项' : 'Security Checks Have Failures') : (state.lang === 'zh' ? '安全检查有提醒项' : 'Security Checks Need Review'),
        message: state.lang === 'zh'
          ? `失败 ${formatNumber(securitySummary.fail || 0)} 项，警告 ${formatNumber(securitySummary.warn || 0)} 项。`
          : `${formatNumber(securitySummary.fail || 0)} failures and ${formatNumber(securitySummary.warn || 0)} warnings need review.`,
        tabId: 'security',
      });
    }
    if (!enabledChannels) {
      riskItems.push({
        tone: 'warn',
        title: state.lang === 'zh' ? '还没有启用任何渠道' : 'No Channel Is Enabled',
        message: state.lang === 'zh'
          ? '即使系统已启动，也不会有消息入口进入工作流。'
          : 'Even if the system is running, no messages can enter the workflow yet.',
        tabId: 'channels',
      });
    }
    if (!recoveryReady) {
      riskItems.push({
        tone: 'warn',
        title: state.lang === 'zh' ? '还没有恢复点' : 'No Recovery Point Exists Yet',
        message: state.lang === 'zh'
          ? '当前状态还没有被 Guard 保存成可恢复节点。建议先去“备份与恢复”保存现在。'
          : 'The current state has not been saved as a recoverable point yet. Open Backup & Recovery and save the current state first.',
        tabId: 'git-sync',
      });
    } else if (!recoveryCloudReady) {
      riskItems.push({
        tone: 'warn',
        title: state.lang === 'zh' ? '最近保护点还没上云' : 'The Latest Recovery Point Is Not In The Cloud Yet',
        message: state.lang === 'zh'
          ? '当前仍以本机恢复为主，适合后续补齐 private 仓库连接与认证。'
          : 'Recovery is still local-first. Connect a private remote and authentication when you are ready.',
        tabId: 'git-sync',
      });
    }
    alerts.slice(0, 3).forEach((item) => {
      const alertView = getRuntimeAlertPresentation(item);
      riskItems.push({
        tone: item.level === 'critical' || item.level === 'error' ? 'danger' : 'warn',
        title: alertView.title,
        message: alertView.message,
        tabId: 'system',
        selector: '#system-service-card',
      });
    });
    if (unreadNotifications > 0) {
      riskItems.push({
        tone: 'info',
        title: state.lang === 'zh' ? '还有未读提醒' : 'Unread Reminders Need Review',
        message: state.lang === 'zh'
          ? `${formatNumber(unreadNotifications)} 条提醒还没有处理。`
          : `${formatNumber(unreadNotifications)} reminders still need attention.`,
        tabId: 'notifications',
      });
    }

    const latestReminder = latestNotifications[0] ? getNotificationPresentation(latestNotifications[0]) : null;
    const risksHtml = `
      ${latestReminder ? renderPageTip({
        title: state.lang === 'zh' ? '最近提醒' : 'Latest Reminder',
        tone: latestNotifications[0]?.severity === 'error' || latestNotifications[0]?.severity === 'warning' ? 'warn' : 'info',
        body: `${latestReminder.title} · ${latestReminder.message}`,
      }) : ''}
      ${riskItems.length ? `
        <div class="list">
          ${riskItems.slice(0, 6).map((item) => `
            <div class="list-item">
              <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                <strong>${escapeHtml(item.title)}</strong>
                <span class="pill ${item.tone === 'danger' ? 'danger' : item.tone === 'warn' ? 'warn' : ''}">${escapeHtml(item.tone === 'danger' ? (state.lang === 'zh' ? '优先处理' : 'High Priority') : item.tone === 'warn' ? (state.lang === 'zh' ? '建议尽快' : 'Review Soon') : (state.lang === 'zh' ? '可查看' : 'Review'))}</span>
              </div>
              <div style="margin-top:8px;">${escapeHtml(item.message)}</div>
              ${item.tabId ? `<div class="toolbar tight" style="margin-top:12px;"><button class="action-btn" type="button" data-overview-open-tab="${escapeHtml(item.tabId)}" ${item.selector ? `data-overview-focus="${escapeHtml(item.selector)}"` : ''}>${escapeHtml(state.lang === 'zh' ? '前往处理' : 'Open')}</button></div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="card accent-success">
          <h3>${escapeHtml(state.lang === 'zh' ? '当前没有明显风险' : 'No Immediate Risk Signals')}</h3>
          <p>${escapeHtml(state.lang === 'zh'
            ? '安全检查、核心服务和模型配置都没有暴露明显阻塞项。后续可以继续补齐备份与恢复和工作区内容。'
            : 'Security, core services, and model routing do not show obvious blockers right now. You can keep improving Backup & Recovery and workspace content next.')}</p>
        </div>
      `}
    `;

    updatePanelSection('overview-availability', availabilityHtml);
    updatePanelSection('overview-actions', actionsHtml);
    updatePanelSection('overview-risks', risksHtml);

    const bindOverviewView = () => {
      document.querySelectorAll('[data-overview-open-tab]').forEach((button) => {
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-overview-open-tab') || 'system';
          const selector = button.getAttribute('data-overview-focus');
          if (selector) queuePanelFocus(tabId, selector);
          setActiveTab(tabId);
        });
      });
      document.querySelectorAll('[data-overview-guide-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
          const nextState = button.getAttribute('data-overview-guide-toggle') === 'hide';
          setOverviewGuideHidden(nextState);
          loadOverview({ reuseExisting: false });
        });
      });
    };
    bindOverviewView();
    rememberCurrentPanelRender(viewTabId, bindOverviewView);

    if (overview.cache?.refreshing) scheduleRuntimeViewPoll();
    else clearRuntimeViewPollTimer();
  }

  async function loadOverviewLegacy() {
    const viewTabId = 'overview';
    setPanelSections(t('tabs.overview'), t('desc.overview'), [
      { id: 'overview-summary', title: state.lang === 'zh' ? '驾驶舱摘要' : 'Cockpit Summary' },
      { id: 'overview-runtime', title: state.lang === 'zh' ? '运行摘要' : 'Runtime Summary' },
      { id: 'overview-signals', title: state.lang === 'zh' ? '风险与信号' : 'Signals' },
    ]);

    const overviewPromise = apiRequest('/api/dashboard/overview');
    const webStatusPromise = apiRequest('/api/web-background/status');
    const prewarmStatusPromise = apiRequest('/api/cache-prewarm/status').catch(() => ({ phase: 'idle', tasks: [] }));

    const [webStatus, prewarmStatus] = await Promise.all([webStatusPromise, prewarmStatusPromise]);
    if (state.activeTab !== viewTabId) return;
    const quickPrewarmMeta = getPrewarmMeta(prewarmStatus);

    updatePanelSection('overview-summary', `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? 'Guard Web' : 'Guard Web', getRunStateLabel(webStatus.running), webStatus.running ? `PID ${webStatus.pid}` : (state.lang === 'zh' ? '未检测到后台进程' : 'No managed background process'), webStatus.running ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '缓存预热' : 'Cache Prewarm', quickPrewarmMeta.phaseLabel, prewarmStatus?.lastDurationMs ? `${prewarmStatus.lastDurationMs} ms` : (state.lang === 'zh' ? '等待首次结果' : 'Waiting for first result'), quickPrewarmMeta.pillClass)}
        ${loadingCard(state.lang === 'zh' ? '运行态总览' : 'Runtime Overview', state.lang === 'zh' ? '正在读取驾驶舱共享快照…' : 'Loading cockpit shared snapshot…')}
      </div>
    `);
    updatePanelSection('overview-runtime', loadingCard(state.lang === 'zh' ? '运行摘要' : 'Runtime Summary', state.lang === 'zh' ? '正在补充运行摘要与系统资源…' : 'Loading runtime summary and system resources…'));
    updatePanelSection('overview-signals', `
      <div class="grid">
        ${loadingCard(state.lang === 'zh' ? '风险与告警' : 'Risk & Alerts', state.lang === 'zh' ? '正在读取风险信号…' : 'Loading alerts…')}
        ${loadingCard(state.lang === 'zh' ? '最近提醒' : 'Recent Reminders', state.lang === 'zh' ? '正在读取提醒摘要…' : 'Loading reminders…')}
      </div>
    `);
    const overview = await overviewPromise;
    if (state.activeTab !== viewTabId) return;

    const alerts = overview.runtime?.alerts || [];
    const latestNotifications = overview.notifications?.latest || [];
    const runtimeSummary = overview.runtime?.summary || {};
    const runtimeMemory = overview.runtime?.memory || {};
    const runtimeUpdate = overview.runtime?.update || {};
    const runtimeOs = overview.runtime?.os || {};
    const gatewayService = overview.runtime?.gatewayService || {};
    const nodeService = overview.runtime?.nodeService || {};
    const localizedGatewayService = getLocalizedServiceSummary(gatewayService);
    const localizedNodeService = getLocalizedServiceSummary(nodeService);
    const gatewayReachable = overview.runtime?.gateway?.reachable;
    const serviceActionMeta = getServiceActionMeta(overview.gateway?.action || {});
    const prewarmMeta = getPrewarmMeta(prewarmStatus);
    const showQuickRestart = !overview.gateway?.running || gatewayReachable === false;
    const runtimeSummaryRows = [
      {
        label: state.lang === 'zh' ? '记忆后端' : 'Memory Backend',
        value: getMemoryBackendLabel(runtimeMemory.backend),
        help: state.lang === 'zh'
          ? `${formatNumber(runtimeMemory.files || 0)} 个文件 / ${formatNumber(runtimeMemory.chunks || 0)} 个分片`
          : `${formatNumber(runtimeMemory.files || 0)} files / ${formatNumber(runtimeMemory.chunks || 0)} chunks`,
      },
      {
        label: state.lang === 'zh' ? '更新状态' : 'Update',
        value: runtimeUpdate.latestVersion || getUpdateDepsStatusLabel(runtimeUpdate.depsStatus),
        help: getInstallKindLabel(runtimeUpdate.installKind) !== '-'
          ? joinDisplayParts([getInstallKindLabel(runtimeUpdate.installKind), runtimeUpdate.packageManager], '-')
          : (runtimeUpdate.packageManager || '-'),
      },
      {
        label: state.lang === 'zh' ? 'Gateway 服务' : 'Gateway Service',
        value: localizedGatewayService.loadedText,
        help: joinDisplayParts([
          localizedGatewayService.label,
          localizedGatewayService.runtimeShort !== '-' ? localizedGatewayService.runtimeShort : '',
        ], state.lang === 'zh' ? '服务信息暂不可可靠解码' : 'Service text is not available yet'),
      },
      {
        label: state.lang === 'zh' ? 'Node 服务' : 'Node Service',
        value: localizedNodeService.loadedText,
        help: joinDisplayParts([
          localizedNodeService.label,
          localizedNodeService.runtimeShort !== '-' ? localizedNodeService.runtimeShort : '',
        ], state.lang === 'zh' ? '服务信息暂不可可靠解码' : 'Service text is not available yet'),
      },
      {
        label: state.lang === 'zh' ? '默认模型' : 'Default Model',
        value: runtimeSummary.defaultModel || '-',
        help: state.lang === 'zh'
          ? `${formatNumber(runtimeSummary.sessionCount || 0)} 个会话`
          : `${formatNumber(runtimeSummary.sessionCount || 0)} sessions`,
      },
      {
        label: state.lang === 'zh' ? '运行平台' : 'Runtime Platform',
        value: runtimeOs.label || overview.platform || '-',
        help: runtimeOs.release || runtimeOs.arch || '-',
      },
    ];
    const cockpitActions = [
      `<button class="action-btn primary" type="button" data-overview-action="enter-operations">${state.lang === 'zh' ? '打开运维' : 'Open Operations'}</button>`,
      showQuickRestart ? `<button class="action-btn" type="button" data-overview-action="gateway-restart">${state.lang === 'zh' ? '重启 Gateway' : 'Restart Gateway'}</button>` : '',
      `<button class="action-btn" type="button" data-overview-action="open-dashboard">${state.lang === 'zh' ? '打开 OpenClaw' : 'Open OpenClaw'}</button>`,
    ].filter(Boolean).join('');
    const body = `
      ${renderCacheSummaryCard(overview.cache, state.lang === 'zh' ? '驾驶舱共享快照' : 'Cockpit Shared Snapshot')}
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? 'Gateway' : 'Gateway', getRunStateLabel(overview.gateway?.running), `port ${overview.gateway?.port || '-'}`, overview.gateway?.running ? 'success' : 'danger')}
        ${metricCard(state.lang === 'zh' ? 'Guard Web' : 'Guard Web', getRunStateLabel(webStatus.running), webStatus.running ? `PID ${webStatus.pid}` : (state.lang === 'zh' ? '未检测到后台进程' : 'No managed background process'), webStatus.running ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '缓存预热' : 'Cache Prewarm', prewarmMeta.phaseLabel, prewarmStatus?.lastDurationMs ? `${prewarmStatus.lastDurationMs} ms` : (state.lang === 'zh' ? '等待首次结果' : 'Waiting for first result'), prewarmMeta.pillClass)}
        ${metricCard(state.lang === 'zh' ? 'Agent' : 'Agents', formatNumber(overview.agents?.total || 0), `${overview.agents?.workspacesReady || 0} ${state.lang === 'zh' ? '个工作区就绪' : 'workspaces ready'}`)}
        ${metricCard(state.lang === 'zh' ? '会话' : 'Sessions', `${formatNumber(overview.sessions?.active || 0)} / ${formatNumber(overview.sessions?.total || 0)}`, state.lang === 'zh' ? '活跃 / 总数' : 'active / total')}
        ${metricCard(state.lang === 'zh' ? '通知' : 'Notifications', formatNumber(overview.notifications?.unread || 0), state.lang === 'zh' ? '未读通知' : 'unread')}
        ${metricCard(state.lang === 'zh' ? '记忆文件' : 'Memory Files', formatNumber(overview.memoryFiles || 0), overview.openclawDir || '-')}
      </div>
      ${renderPageTip({
        title: state.lang === 'zh' ? '页面用途' : 'Page Purpose',
        body: state.lang === 'zh'
          ? '驾驶舱只负责帮你快速判断整体状态、风险和提醒，不在这里堆具体操作。需要启动、重启或排查服务时，直接进入“运维”。'
          : 'The cockpit is for quickly judging overall health, risks, and reminders. Keep detailed actions in Operations instead of loading them here.',
      })}
      <div class="grid">
        <div class="card accent-info">
          <h3>${state.lang === 'zh' ? '你现在最需要知道的' : 'What Matters Right Now'}</h3>
          ${keyValueGrid(runtimeSummaryRows)}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '系统资源' : 'System Resources'}</h3>
          ${keyValueGrid([
            { label: state.lang === 'zh' ? 'CPU' : 'CPU', value: `${formatNumber(overview.cpu?.cores || 0)} cores`, help: overview.cpu?.model || '-' },
            { label: state.lang === 'zh' ? '内存' : 'Memory', value: `${formatBytes(overview.memory?.usedBytes || 0)} / ${formatBytes(overview.memory?.totalBytes || 0)}`, help: state.lang === 'zh' ? '已用 / 总量' : 'used / total' },
            { label: state.lang === 'zh' ? '磁盘' : 'Disk', value: `${formatBytes(overview.disk?.freeBytes || 0)} / ${formatBytes(overview.disk?.totalBytes || 0)}`, help: overview.disk?.mountPath || '-' },
            { label: state.lang === 'zh' ? '平台' : 'Platform', value: overview.platform || '-', help: `${overview.user || '-'} @ ${overview.homeDir || '-'}` },
          ])}
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '最近后台操作' : 'Recent Background Action'}</h3>
          <div class="list-item">
            <div class="row" style="justify-content:space-between">
              <strong>${escapeHtml(serviceActionMeta.actionLabel)}</strong>
              <span class="pill ${serviceActionMeta.pillClass}">${escapeHtml(serviceActionMeta.phaseLabel)}</span>
            </div>
            <div style="margin-top:8px;">${escapeHtml(serviceActionMeta.message)}</div>
            <div class="muted small" style="margin-top:8px;">
              ${escapeHtml(state.lang === 'zh'
                ? `PID ${overview.gateway?.action?.pid || '-'} · 开始 ${formatDate(overview.gateway?.action?.startedAt)}`
                : `PID ${overview.gateway?.action?.pid || '-'} · started ${formatDate(overview.gateway?.action?.startedAt)}`)}
            </div>
          </div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '风险与告警' : 'Risk & Alerts'}</h3>
          ${alerts.length ? `<div class="list">${alerts.map((item) => {
            const alertView = getRuntimeAlertPresentation(item);
            return `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(alertView.title)}</strong><span class="pill ${item.level === 'critical' || item.level === 'error' ? 'danger' : item.level === 'warning' ? 'warn' : ''}">${escapeHtml(getRuntimeAlertLevelLabel(item.level))}</span></div><div>${escapeHtml(alertView.message)}</div></div>`;
          }).join('')}</div>` : emptyState(state.lang === 'zh' ? '当前没有新的运行态告警。' : 'No runtime alerts right now.')}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '最近提醒' : 'Recent Reminders'}</h3>
          ${latestNotifications.length ? `<div class="list">${latestNotifications.map((item) => {
            const view = getNotificationPresentation(item);
            return `<div class="list-item ${item.read ? '' : 'unread'}"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(view.title)}</strong><span class="muted">${escapeHtml(formatRelative(item.createdAt))}</span></div><div class="muted small" style="margin-top:6px;">${escapeHtml(view.sourceLabel)} · ${escapeHtml(view.severityLabel)}</div><div style="margin-top:8px;">${escapeHtml(view.message)}</div></div>`;
          }).join('')}</div>` : emptyState(state.lang === 'zh' ? '暂时没有新的提醒。' : 'No new reminders right now.')}
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '当前建议' : 'Recommended Next Step'}</h3>
          <div class="status ${webStatus.running ? '' : 'warn'}" style="margin-top:14px;">${escapeHtml(webStatus.running ? (state.lang === 'zh' ? `当前 Guard Web 正在运行，PID ${webStatus.pid}。如需处理服务细节，直接进入“运维”。` : `Guard Web is running with PID ${webStatus.pid}. Use Operations for service-level actions.`) : (state.lang === 'zh' ? '当前未检测到 Guard Web 后台进程。建议先进入“运维”确认服务状态。' : 'No Guard Web background process detected. Open Operations to inspect service state.'))}</div>
          <div class="muted small" style="margin-top:12px; line-height:1.7;">${escapeHtml(state.lang === 'zh'
            ? '如果你只是查看整体健康度、最近提醒或风险，这一页已经足够。只有在需要修改服务、路径、环境变量或继续排查时，再进入对应页面。'
            : 'If you are only checking overall health, recent reminders, or risks, this page should be enough. Move to another page only when you need to change services, paths, environment variables, or investigate further.')}</div>
        </div>
      </div>
    `;

    setPanel(t('tabs.overview'), t('desc.overview'), body, cockpitActions);
    if (overview.cache?.refreshing) scheduleRuntimeViewPoll();
    else clearRuntimeViewPollTimer();

    document.querySelector('[data-overview-action="enter-operations"]')?.addEventListener('click', () => {
      queuePanelFocus('system', '#system-service-card');
      setActiveTab('system');
    });
    document.querySelector('[data-overview-action="gateway-restart"]')?.addEventListener('click', async () => {
      try {
        const result = await postJson('/api/service/restart', {});
        const ok = result?.success !== false;
        showToast(result.message || 'OK', ok ? 'success' : 'error');
        await loadOverview();
        if (result?.action?.phase === 'running') {
          scheduleServiceStatusPoll();
        }
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
    if (serviceActionMeta.phase === 'running') {
      scheduleServiceStatusPoll();
    }
    if (prewarmMeta.phase === 'running' || prewarmMeta.phase === 'scheduled') {
      schedulePrewarmStatusPoll();
    }
  }

  async function loadSystem(options = {}) {
    const viewTabId = 'system';
    const reuseExisting = options.reuseExisting === true;
    if (!reuseExisting) {
      setPanelSections(t('tabs.system'), t('desc.system'), [
        { id: 'system-summary', title: state.lang === 'zh' ? '运维摘要' : 'Operations Summary' },
        { id: 'system-services', title: state.lang === 'zh' ? '服务操作与后台状态' : 'Service Actions & Background State' },
        { id: 'system-env', title: state.lang === 'zh' ? '本机密钥与变量' : 'Local Secrets & Variables' },
        { id: 'system-runtime', title: state.lang === 'zh' ? '本机路径与诊断信息' : 'Local Paths & Diagnostics' },
      ]);
    }

    const infoPromise = apiRequest('/api/info');
    const servicePromise = apiRequest('/api/service/status');
    const webStatusPromise = apiRequest('/api/web-background/status');
    const webReportPromise = apiRequest('/api/web-background/report').catch(() => null);
    const guardRestartPromise = apiRequest('/api/guard/restart-status').catch(() => ({ phase: 'idle' }));
    const envPromise = apiRequest('/api/env').catch(() => ({}));
    const prewarmStatusPromise = apiRequest('/api/cache-prewarm/status').catch(() => ({ phase: 'idle', tasks: [] }));

    const [service, webStatus, webReportPayload, guardRestartStatus, envMap, prewarmStatus] = await Promise.all([
      servicePromise,
      webStatusPromise,
      webReportPromise,
      guardRestartPromise,
      envPromise,
      prewarmStatusPromise,
    ]);
    if (state.activeTab !== viewTabId) return;

    const envEntries = Object.entries(envMap || {}).sort(([left], [right]) => left.localeCompare(right));
    const quickServiceActionMeta = getServiceActionMeta(service.action || {});
    const quickGuardRestartMeta = getGuardRestartMeta(guardRestartStatus);
    const quickPrewarmMeta = getPrewarmMeta(prewarmStatus);
    const webReport = webReportPayload || {
      running: webStatus.running,
      pid: webStatus.pid,
      port: webStatus.port,
      managed: webStatus.managed,
      source: webStatus.source,
      primaryUrl: `http://127.0.0.1:${webStatus.port}/`,
      workbenchUrl: `http://127.0.0.1:${webStatus.port}/workbench`,
      nextAction: webStatus.running ? (webStatus.managed ? 'open-workbench' : 'adopt-or-stop') : 'start-web',
      scenario: webStatus.running ? (webStatus.managed ? 'managed-running' : 'unmanaged-running') : 'stopped',
      pidFile: webStatus.pidFile || '-',
      logPaths: {
        stdout: '-',
        stderr: '-',
      },
    };
    const webScenarioLabel = getWebBackgroundScenarioLabel(webReport.scenario);
    const webNextActionLabel = getWebBackgroundNextActionLabel(webReport.nextAction);
    const webNextActionHelp = getWebBackgroundNextActionHelp(webReport.nextAction);
    const webSourceLabel = getRuntimeSourceLabel(webReport.source);

    if (!reuseExisting) {
      updatePanelSection('system-summary', `
        <div class="grid">
          ${metricCard('Gateway', getRunStateLabel(service.running), `PID ${service.pid || '-'}`, service.running ? 'success' : 'danger')}
          ${metricCard('Guard Web', getRunStateLabel(webReport.running), webReport.running ? `PID ${webReport.pid || '-'}` : '-', webReport.running ? 'success' : 'warn')}
          ${metricCard(state.lang === 'zh' ? '托管来源' : 'Tracking Source', webSourceLabel, webScenarioLabel, webReport.managed ? 'success' : 'warn')}
          ${metricCard(state.lang === 'zh' ? '下一步建议' : 'Recommended Next Step', webNextActionLabel, webNextActionHelp)}
          ${metricCard(state.lang === 'zh' ? 'Guard 重启任务' : 'Guard Restart Task', quickGuardRestartMeta.phaseLabel, guardRestartStatus?.newPid ? `PID ${guardRestartStatus.newPid}` : '-', quickGuardRestartMeta.pillClass)}
          ${metricCard(state.lang === 'zh' ? '本地 Env' : 'Local Env', formatNumber(envEntries.length), state.lang === 'zh' ? '已读取本地键数量' : 'loaded local keys')}
          ${metricCard(state.lang === 'zh' ? '缓存预热' : 'Cache Prewarm', quickPrewarmMeta.phaseLabel, prewarmStatus?.lastDurationMs ? `${prewarmStatus.lastDurationMs} ms` : '-', quickPrewarmMeta.pillClass)}
        </div>
        <div class="grid">
          <div class="card accent-info">
            <h3>${state.lang === 'zh' ? 'Guard Web 摘要' : 'Guard Web Summary'}</h3>
            ${keyValueGrid([
              { label: state.lang === 'zh' ? '当前地址' : 'Primary URL', value: webReport.primaryUrl || '-' },
              { label: state.lang === 'zh' ? '工作台地址' : 'Workbench URL', value: webReport.workbenchUrl || '-' },
              { label: state.lang === 'zh' ? '监听端口' : 'Listening Port', value: webReport.port || '-' },
              { label: 'PID', value: webReport.pid || '-' },
              { label: state.lang === 'zh' ? '状态场景' : 'Scenario', value: webScenarioLabel },
              { label: state.lang === 'zh' ? '托管来源' : 'Tracking Source', value: webSourceLabel, help: webNextActionHelp },
            ])}
            ${renderAdvancedDisclosure({
              title: state.lang === 'zh' ? '运行记录与日志（高级）' : 'Runtime Record & Logs (Advanced)',
              description: state.lang === 'zh'
                ? '这里只放长路径和运行记录，避免在首屏堆叠过多诊断信息。'
                : 'Long paths and runtime record details live here so the first screen stays focused on the summary.',
              bodyHtml: keyValueGrid([
                { label: state.lang === 'zh' ? 'PID 记录文件' : 'PID Record File', value: webReport.pidFile || '-' },
                { label: state.lang === 'zh' ? '输出日志' : 'Stdout Log', value: webReport.logPaths?.stdout || '-' },
                { label: state.lang === 'zh' ? '错误日志' : 'Stderr Log', value: webReport.logPaths?.stderr || '-' },
              ]),
            })}
          </div>
        </div>
      `);
      updatePanelSection('system-services', `
        <div class="grid">
          <div class="card accent-warn">
            <h3>${state.lang === 'zh' ? '服务操作与后台状态' : 'Service Actions & Background State'}</h3>
            <div class="status ${quickServiceActionMeta.phase === 'error' ? 'warn' : ''}">${escapeHtml(quickServiceActionMeta.message)}</div>
            <div class="muted small" style="margin-top:10px;">${escapeHtml(quickGuardRestartMeta.message)}</div>
            <div class="muted small" style="margin-top:12px;">${escapeHtml(state.lang === 'zh' ? '正在补充可执行操作、后台接管状态和详细诊断信息…' : 'Loading available actions, background ownership, and detailed diagnostics…')}</div>
          </div>
          ${loadingCard(state.lang === 'zh' ? '启动后缓存预热' : 'Startup Cache Prewarm', state.lang === 'zh' ? '正在读取预热任务详情…' : 'Loading prewarm task details…')}
        </div>
      `);
      updatePanelSection('system-env', `
        <div class="card accent-success">
          <div class="row" style="justify-content:space-between; align-items:flex-start;">
            <div>
                <h3>${state.lang === 'zh' ? '本机密钥与变量' : 'Local Secrets & Variables'}</h3>
                <p>${escapeHtml(state.lang === 'zh' ? '已读取当前机器上供 Guard 使用的本地变量，马上会显示列表和编辑区。' : 'The local values used by Guard on this machine are loaded. The list and editor will appear next.')}</p>
              </div>
              <div class="tag-list">
                <span class="chip active">${escapeHtml((state.lang === 'zh' ? '键数量：' : 'Keys: ') + envEntries.length)}</span>
              </div>
            </div>
          </div>
      `);
      updatePanelSection('system-runtime', loadingCard(state.lang === 'zh' ? '本机路径与诊断信息' : 'Local Paths & Diagnostics', state.lang === 'zh' ? '正在读取配置路径、当前实例信息和诊断数据…' : 'Loading config paths, current instance details, and diagnostics…'));
    }

    const info = await infoPromise;
    if (state.activeTab !== viewTabId) return;
    const currentPid = Number(info.pid || 0);
    const isCurrentInstance = !!(webReport.running && webReport.pid && currentPid && webReport.pid === currentPid);
    const isCurrentManaged = isCurrentInstance && webReport.managed;
    const isOtherProcess = !!(webReport.running && webReport.pid && !isCurrentInstance);
    const serviceActionMeta = getServiceActionMeta(service.action || {});
    const guardRestartMeta = getGuardRestartMeta(guardRestartStatus);
    const prewarmMeta = getPrewarmMeta(prewarmStatus);
    const serviceBusy = serviceActionMeta.phase === 'running';
    const guardRestartBusy = guardRestartMeta.phase === 'running';
    const trackingSourceLabel = getRuntimeSourceLabel(webReport.source);

    let webPrimaryLabel = state.lang === 'zh' ? '后台启动 Guard Web' : 'Start Guard Web in Background';
    let webPrimaryHint = state.lang === 'zh'
      ? '当这个端口上还没有 Guard Web 时，可以用这里在后台启动一个新的工作台实例。'
      : 'Use this when no Guard Web is running on this port and you want to start one in the background.';
    let webPrimaryDisabled = false;

    if (isCurrentManaged) {
      webPrimaryLabel = state.lang === 'zh' ? '当前实例已纳入托管' : 'Current Instance Managed';
      webPrimaryHint = state.lang === 'zh'
        ? '你当前打开的这个工作台已经在 Guard 托管之下，不需要再次接管。'
        : 'The workbench you are viewing is already managed by Guard, so no further action is needed.';
      webPrimaryDisabled = true;
    } else if (isCurrentInstance) {
      webPrimaryLabel = state.lang === 'zh' ? '纳入后台托管' : 'Adopt Current Instance';
      webPrimaryHint = state.lang === 'zh'
        ? '当前工作台已经打开，但还没有写入后台托管记录。点击后会把它登记为可管理实例。'
        : 'This workbench is already open, but it is not tracked as a managed background instance yet. Guard can adopt it for you.';
    } else if (isOtherProcess) {
      webPrimaryLabel = state.lang === 'zh' ? '已有其他 Guard Web 实例' : 'Another Guard Web Is Running';
      webPrimaryHint = state.lang === 'zh'
          ? `端口 ${webReport.port} 已经被另一个 Guard Web 占用。请先停掉它，再决定是否启动新的实例。`
          : `Port ${webReport.port} is already occupied by another Guard Web instance. Stop it before starting a new one.`;
      webPrimaryDisabled = true;
    }

    const envRows = envEntries.length
      ? envEntries.map(([key, value]) => {
        const sensitive = isSensitiveField(key);
        const displayValue = maskSensitiveValue(key, value) || (state.lang === 'zh' ? '(空字符串)' : '(empty string)');
        return `
          <tr>
            <td><strong>${escapeHtml(key)}</strong></td>
            <td><span class="muted" style="font-family:Consolas, 'Courier New', monospace;">${escapeHtml(displayValue)}</span></td>
            <td><span class="pill ${sensitive ? 'warn' : 'success'}">${escapeHtml(sensitive ? (state.lang === 'zh' ? '敏感' : 'Sensitive') : (state.lang === 'zh' ? '普通' : 'Standard'))}</span></td>
            <td>
              <div class="toolbar tight">
                <button class="action-btn" type="button" data-env-edit="${escapeHtml(key)}">${state.lang === 'zh' ? '编辑' : 'Edit'}</button>
                <button class="action-btn danger" type="button" data-env-delete="${escapeHtml(key)}">${state.lang === 'zh' ? '删除' : 'Delete'}</button>
              </div>
            </td>
          </tr>
        `;
      }).join('')
      : `<tr><td colspan="4">${emptyState(state.lang === 'zh' ? '当前还没有本机变量。你可以在右侧新建一项。' : 'No local values are configured yet. Create one from the editor on the right.')}</td></tr>`;

    const runtimeSnapshot = {
      info: {
        platform: info.platform,
        user: info.user,
        home: info.home,
        openclawDir: info.openclawDir,
        configPath: info.configPath,
        envPath: info.envPath,
        pid: info.pid,
        nodeVersion: info.nodeVersion,
        arch: info.arch,
        openclaw: info.openclaw,
      },
      gateway: service,
      web: webReport,
      guardRestart: guardRestartStatus,
      envKeys: envEntries.map(([key]) => key),
    };
    const prewarmTasksHtml = (prewarmStatus.tasks || []).length
      ? prewarmStatus.tasks.map((task) => {
          const taskMeta = getPrewarmMeta({ phase: task.success === true ? 'completed' : task.success === false ? 'error' : 'idle', lastError: task.error });
          return `<div class="list-item"><div class="row" style="justify-content:space-between;"><strong>${escapeHtml(task.label)}</strong><span class="pill ${taskMeta.pillClass}">${escapeHtml(task.success === true ? (state.lang === 'zh' ? '完成' : 'Done') : task.success === false ? (state.lang === 'zh' ? '失败' : 'Failed') : (state.lang === 'zh' ? '等待执行' : 'Waiting'))}</span></div><div class="muted small">${escapeHtml(state.lang === 'zh' ? `开始 ${formatDate(task.startedAt)} · 结束 ${formatDate(task.finishedAt)} · 耗时 ${task.durationMs ?? '-'} ms` : `Started ${formatDate(task.startedAt)} · Finished ${formatDate(task.finishedAt)} · Duration ${task.durationMs ?? '-'} ms`)}</div>${task.error ? `<div style="margin-top:8px;">${escapeHtml(task.error)}</div>` : ''}</div>`;
        }).join('')
      : emptyState(state.lang === 'zh' ? '暂时还没有预热记录。手动触发一次后，这里会显示结果。' : 'No prewarm history yet. Trigger one run to see the result here.');

    const body = `
      <div class="grid">
        ${metricCard('Gateway', getRunStateLabel(service.running), `PID ${service.pid || '-'}`, service.running ? 'success' : 'danger')}
        ${metricCard('Guard Web', getRunStateLabel(webReport.running), webReport.running ? `PID ${webReport.pid || '-'}` : '-', webReport.running ? 'success' : 'warn')}
        ${metricCard('Node.js', info.nodeVersion || '-', info.arch || '-')}
        ${metricCard('OpenClaw', getInstallStateLabel(info.openclaw?.installed), info.openclaw?.version || '-', info.openclaw?.installed ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '本地 Env' : 'Local Env', formatNumber(envEntries.length), info.envPath || '-')}
      </div>
      <div class="card accent-warn panel-focus-target" id="system-service-card">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <div>
            <h3>${state.lang === 'zh' ? '服务操作与后台状态' : 'Service Actions & Background State'}</h3>
            <p>${escapeHtml(state.lang === 'zh'
              ? '启动、停止和重启按钮放在最前面。判断清楚状态后，直接在这里操作就可以。'
              : 'Keep the service controls first. Once the state is clear, act here directly without hunting through diagnostics.')}</p>
          </div>
          <div class="tag-list">
            <span class="chip ${webReport.running ? 'active' : ''}">${escapeHtml((state.lang === 'zh' ? 'Guard Web：' : 'Guard Web: ') + getRunStateLabel(webReport.running))}</span>
            <span class="chip ${service.running ? 'active' : ''}">${escapeHtml((state.lang === 'zh' ? 'Gateway：' : 'Gateway: ') + getRunStateLabel(service.running))}</span>
            <span class="chip">${escapeHtml((state.lang === 'zh' ? '端口：' : 'Port: ') + (webReport.port || '-'))}</span>
          </div>
        </div>
        <div class="toolbar" style="margin-top:14px;">
          <button class="action-btn primary" type="button" data-service-action="start" ${serviceBusy ? 'disabled' : ''}>${escapeHtml(t('start'))} Gateway</button>
          <button class="action-btn" type="button" data-service-action="restart" ${serviceBusy ? 'disabled' : ''}>${escapeHtml(t('restart'))} Gateway</button>
          <button class="action-btn warn" type="button" data-service-action="stop" ${serviceBusy ? 'disabled' : ''}>${escapeHtml(t('stop'))} Gateway</button>
          <button class="action-btn ${webPrimaryDisabled ? '' : 'primary'}" type="button" data-service-action="start-web" ${webPrimaryDisabled ? 'disabled' : ''}>${escapeHtml(webPrimaryLabel)}</button>
          <button class="action-btn warn" type="button" data-service-action="stop-web" ${webReport.running ? '' : 'disabled'}>${escapeHtml(t('stopWeb'))}</button>
          <button class="action-btn" type="button" data-service-action="restart-guard" ${guardRestartBusy ? 'disabled' : ''}>${escapeHtml(t('restartGuard'))}</button>
          <button class="action-btn" type="button" data-service-action="restart-guard-with-gateway" ${(guardRestartBusy || serviceBusy) ? 'disabled' : ''}>${escapeHtml(t('restartGuardWithGateway'))}</button>
        </div>
        <div class="status ${webPrimaryDisabled && !isCurrentManaged ? 'warn' : ''}" style="margin-top:14px;">${escapeHtml(webPrimaryHint)}</div>
        <div class="grid" style="margin-top:14px;">
          <div class="list-item">
            <div class="row" style="justify-content:space-between;">
              <strong>${state.lang === 'zh' ? '检测结果' : 'Detection Result'}</strong>
              <span class="pill ${webReport.running ? 'success' : 'warn'}">${escapeHtml(getRunStateLabel(webReport.running))}</span>
            </div>
            <div class="muted small" style="margin-top:8px;">
              ${escapeHtml(webReport.running
                ? (state.lang === 'zh'
                  ? `当前检测到 PID ${webReport.pid || '-'} 正在监听端口 ${webReport.port}，可直接访问 ${webReport.workbenchUrl}。`
                  : `PID ${webReport.pid || '-'} is listening on port ${webReport.port}. Open ${webReport.workbenchUrl} to access the workbench.`)
                : (state.lang === 'zh' ? '当前端口没有 Guard Web 进程在监听。' : 'No Guard Web process is listening on this port right now.'))}
            </div>
          </div>
          <div class="list-item">
            <div class="row" style="justify-content:space-between;">
              <strong>${state.lang === 'zh' ? '托管来源' : 'Tracking Source'}</strong>
              <span class="pill ${webReport.managed ? 'success' : 'warn'}">${escapeHtml(trackingSourceLabel)}</span>
            </div>
            <div class="muted small" style="margin-top:8px;">
              ${escapeHtml(webReport.managed
                ? (state.lang === 'zh' ? '该实例已经被 Guard 写入后台运行记录，可直接按托管实例处理。' : 'This instance is already tracked by Guard background runtime records and can be handled as a managed service.')
                : (state.lang === 'zh' ? '当前只是通过端口扫描识别到进程，还没有进入 Guard 托管。' : 'This instance is currently detected by port scan only and is not under Guard management yet.'))}
            </div>
          </div>
          <div class="list-item">
            <div class="row" style="justify-content:space-between;">
              <strong>${state.lang === 'zh' ? '下一步建议' : 'Recommended Next Step'}</strong>
              <span class="chip">${escapeHtml(webNextActionLabel)}</span>
            </div>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(webNextActionHelp)}</div>
          </div>
        </div>
        <div class="grid" style="margin-top:14px;">
          <div class="list-item">
            <div class="row" style="justify-content:space-between;">
              <strong>${state.lang === 'zh' ? 'Gateway 后台任务' : 'Gateway Background Task'}</strong>
              <span class="pill ${serviceActionMeta.pillClass}">${escapeHtml(serviceActionMeta.phaseLabel)}</span>
            </div>
            <div style="margin-top:8px;">${escapeHtml(serviceActionMeta.message)}</div>
            <div class="muted small" style="margin-top:8px;">
              ${escapeHtml(state.lang === 'zh'
                ? `任务 PID ${service.action?.pid || '-'} · 开始 ${formatDate(service.action?.startedAt)} · 结束 ${formatDate(service.action?.finishedAt)}`
                : `Task PID ${service.action?.pid || '-'} · started ${formatDate(service.action?.startedAt)} · finished ${formatDate(service.action?.finishedAt)}`)}
            </div>
          </div>
          <div class="list-item">
            <div class="row" style="justify-content:space-between;">
              <strong>${state.lang === 'zh' ? 'Guard 完整重启任务' : 'Guard Full Restart Task'}</strong>
              <span class="pill ${guardRestartMeta.pillClass}">${escapeHtml(guardRestartMeta.phaseLabel)}</span>
            </div>
            <div style="margin-top:8px;">${escapeHtml(guardRestartMeta.message)}</div>
            <div class="muted small" style="margin-top:8px;">
              ${escapeHtml(state.lang === 'zh'
                ? `任务 PID ${guardRestartStatus?.pid || '-'} · 旧实例 ${guardRestartStatus?.targetPid || '-'} · 新实例 ${guardRestartStatus?.newPid || '-'}`
                : `Task PID ${guardRestartStatus?.pid || '-'} · previous ${guardRestartStatus?.targetPid || '-'} · new ${guardRestartStatus?.newPid || '-'}`)}
            </div>
            <div class="muted small" style="margin-top:8px;">
              ${escapeHtml(state.lang === 'zh'
                ? `开始 ${formatDate(guardRestartStatus?.startedAt)} · 结束 ${formatDate(guardRestartStatus?.finishedAt)}`
                : `Started ${formatDate(guardRestartStatus?.startedAt)} · Finished ${formatDate(guardRestartStatus?.finishedAt)}`)}
            </div>
          </div>
        </div>
        <div class="sub-card" style="margin-top:14px;">
          <h3 style="margin-bottom:10px;">${state.lang === 'zh' ? '手动命令参考' : 'Manual Commands'}</h3>
          <div class="command-list">
            <code>openclaw-guard web-status --port ${webReport.port}</code>
            <code>npm run web:bg:start</code>
            <code>npm run web:bg:stop</code>
          </div>
          <div class="muted small" style="margin-top:10px;">
            ${escapeHtml(state.lang === 'zh'
              ? '如果这个工作台已经打开，优先使用“纳入后台托管”或“一键停后台服务”，避免在同一端口重复启动第二个实例。'
              : 'If this workbench is already open, adopt it or stop the background service first instead of starting a second instance on the same port.')}
          </div>
        </div>
      </div>
      ${renderPageTip({
        title: state.lang === 'zh' ? '适用场景' : 'Best Used For',
        body: state.lang === 'zh'
          ? '当你需要启动、停止、重启或排查 Guard / Gateway 时，优先在这一页处理。推荐顺序：先看首页，再回到这里动服务；只有在需要深查时，再继续进入会话、安全或备份与恢复。'
          : 'Use this page first when you need to start, stop, restart, or troubleshoot Guard and Gateway. Check Home first, act here next, and only continue into Sessions, Security, or Backup & Recovery for deeper diagnosis.',
      })}
      <div class="grid">
        <div class="card accent-info panel-focus-target" id="system-paths-card">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <h3>${state.lang === 'zh' ? '路径与配置位置' : 'Paths & Config Locations'}</h3>
              <p>${escapeHtml(state.lang === 'zh'
                ? '日常只会频繁用到端口、openclaw.json 和 .env。其他路径默认折叠，排查问题时再展开即可。'
                : 'For daily work you usually only need the port, openclaw.json, and .env. The rest stays folded until you need diagnostics.')}</p>
            </div>
            <div class="tag-list">
              <span class="chip">${escapeHtml((state.lang === 'zh' ? '平台：' : 'Platform: ') + (info.platform || '-'))}</span>
              <span class="chip">${escapeHtml((state.lang === 'zh' ? '端口：' : 'Port: ') + (webReport.port || '-'))}</span>
              <span class="chip active">openclaw.json</span>
              <span class="chip active">.env</span>
            </div>
          </div>
          ${renderAdvancedDisclosure({
            title: state.lang === 'zh' ? '展开本机路径与配置' : 'Expand Paths & Config',
            description: state.lang === 'zh'
              ? '这里只有在排查路径、确认配置文件位置或联系技术支持时才需要展开。'
              : 'Expand this when you need to troubleshoot paths, confirm config locations, or share details with support.',
            bodyHtml: `
              ${keyValueGrid([
                { label: state.lang === 'zh' ? '平台' : 'Platform', value: info.platform || '-' },
                { label: state.lang === 'zh' ? '用户' : 'User', value: info.user || '-' },
                { label: 'Home', value: info.home || '-' },
                { label: 'OpenClaw Dir', value: info.openclawDir || '-' },
                { label: 'openclaw.json', value: info.configPath || '-' },
                { label: '.env', value: info.envPath || '-' },
                { label: state.lang === 'zh' ? '当前工作台进程' : 'Current Workbench Process', value: info.pid || '-' },
                { label: state.lang === 'zh' ? '当前监听端口' : 'Current Port', value: webReport.port || '-' },
              ])}
              <div class="sub-card" style="margin-top:14px;">
                <div class="row" style="justify-content:space-between;">
                  <strong>${state.lang === 'zh' ? '这些路径分别做什么' : 'What These Paths Are For'}</strong>
                  <span class="pill success">${state.lang === 'zh' ? '当前工作台' : 'Current Workbench'}</span>
                </div>
                <div class="muted small" style="margin-top:8px; line-height:1.7;">
                  ${escapeHtml(state.lang === 'zh'
                    ? 'openclaw.json 保存模型、渠道和角色的主要配置；.env 保存只适合留在本机的密钥、令牌和账号变量，供渠道接入和备份与恢复等功能复用。'
                    : 'openclaw.json stores the main model, channel, and role settings. The .env file stores machine-local secrets, tokens, and account values used by channels, Backup & Recovery, and related features.')}
                </div>
              </div>
            `,
          })}
        </div>
        <div class="card accent-info panel-focus-target" id="system-prewarm-card">
          <div class="row" style="justify-content:space-between; align-items:flex-start;">
            <div>
              <h3>${state.lang === 'zh' ? '启动后缓存预热' : 'Startup Cache Prewarm'}</h3>
              <p>${escapeHtml(state.lang === 'zh'
                ? '首次打开慢页签时，Guard 会在启动后后台预热核心缓存。这里可以看到最近结果，也可以手动再跑一轮。'
                : 'Guard prewarms core caches after startup so the first visit to heavy tabs is faster. You can inspect the last run and trigger it manually here.')}</p>
            </div>
            <span class="pill ${prewarmMeta.pillClass}">${escapeHtml(prewarmMeta.phaseLabel)}</span>
          </div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn primary" type="button" data-prewarm-action="trigger" ${(prewarmMeta.phase === 'running' || prewarmMeta.phase === 'scheduled') ? 'disabled' : ''}>${state.lang === 'zh' ? '手动预热缓存' : 'Run Prewarm'}</button>
            <button class="action-btn" type="button" data-prewarm-action="reload">${escapeHtml(t('reload'))}</button>
          </div>
          <div class="status ${prewarmMeta.phase === 'error' ? 'warn' : ''}" style="margin-top:14px;">${escapeHtml(prewarmMeta.message)}</div>
          <div class="sub-card" style="margin-top:14px;">
            ${keyValueGrid([
              { label: state.lang === 'zh' ? '触发来源' : 'Trigger', value: getPrewarmTriggerLabel(prewarmStatus.trigger) },
              { label: 'PID', value: prewarmStatus.pid || '-' },
              { label: state.lang === 'zh' ? '开始时间' : 'Started At', value: formatDate(prewarmStatus.startedAt) },
              { label: state.lang === 'zh' ? '结束时间' : 'Finished At', value: formatDate(prewarmStatus.finishedAt) },
              { label: state.lang === 'zh' ? '最近耗时' : 'Last Duration', value: prewarmStatus.lastDurationMs ? `${prewarmStatus.lastDurationMs} ms` : '-' },
              { label: state.lang === 'zh' ? '下次允许时间' : 'Next Allowed At', value: formatDate(prewarmStatus.nextAllowedAt) },
            ])}
          </div>
          <div class="list" style="margin-top:14px;">
            ${prewarmTasksHtml}
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="card accent-success panel-focus-target" id="system-env-list-card">
          <div class="row" style="justify-content:space-between; align-items:flex-start;">
            <div>
              <h3>${state.lang === 'zh' ? '本机密钥与变量' : 'Local Secrets & Variables'}</h3>
              <p>${escapeHtml(state.lang === 'zh'
                ? '这里直接管理当前机器给 Guard 使用的本地变量。列表里会隐藏敏感值，但不会影响实际保存内容。'
                : 'Manage the machine-local values used by Guard here. Sensitive values stay masked in the list without changing what is stored.')}</p>
            </div>
            <div class="tag-list">
              <span class="chip">${escapeHtml((state.lang === 'zh' ? 'Env 文件：' : 'Env file: ') + (info.envPath || '-'))}</span>
              <span class="chip active">${escapeHtml((state.lang === 'zh' ? '键数量：' : 'Keys: ') + envEntries.length)}</span>
            </div>
          </div>
          <div class="table-wrap" style="margin-top:14px;">
            <table class="table">
              <thead>
                <tr>
                  <th>${state.lang === 'zh' ? 'Key' : 'Key'}</th>
                  <th>${state.lang === 'zh' ? '当前值' : 'Current Value'}</th>
                  <th>${state.lang === 'zh' ? '类型' : 'Type'}</th>
                  <th>${state.lang === 'zh' ? '操作' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>${envRows}</tbody>
            </table>
          </div>
        </div>
        <div class="card accent-info panel-focus-target" id="system-env-editor-card">
          <div class="row" style="justify-content:space-between; align-items:flex-start;">
            <div>
              <h3>${state.lang === 'zh' ? '新增或更新本机变量' : 'Add Or Update A Local Value'}</h3>
              <p id="system-env-mode">${state.lang === 'zh' ? '新建模式：填写变量名和值后保存。' : 'Create mode: enter the variable name and value, then save.'}</p>
            </div>
            <span class="pill success">${state.lang === 'zh' ? '本地优先' : 'Local First'}</span>
          </div>
          <div class="status" id="system-env-hint" style="margin-top:14px;">
            ${escapeHtml(state.lang === 'zh'
              ? '编辑已有敏感变量时，旧值不会回填到表单。直接输入新值即可覆盖。'
              : 'Existing sensitive values are never prefilled. Enter a new value if you want to replace them.')}
          </div>
          <form id="system-env-form" class="stack" style="margin-top:14px;">
            <div class="form-grid">
              <div class="field">
                <label for="system-env-key">${state.lang === 'zh' ? 'Env Key' : 'Env Key'}</label>
                <input id="system-env-key" name="key" type="text" placeholder="OPENCLAW_SAMPLE_TOKEN" autocomplete="off">
              </div>
              <div class="field field-span">
                <label for="system-env-value">${state.lang === 'zh' ? 'Env Value' : 'Env Value'}</label>
                <textarea id="system-env-value" name="value" style="min-height:180px;" placeholder="${state.lang === 'zh' ? '输入要保存到本地 env 文件的值' : 'Enter the value to store in the local env file'}"></textarea>
              </div>
            </div>
            <div class="toolbar tight">
              <button class="action-btn primary" type="submit">${state.lang === 'zh' ? '保存变量' : 'Save Value'}</button>
              <button class="action-btn" type="button" data-env-action="clear">${state.lang === 'zh' ? '清空表单' : 'Clear Form'}</button>
              <button class="action-btn" type="button" data-env-action="reload">${state.lang === 'zh' ? '刷新变量列表' : 'Reload Values'}</button>
            </div>
          </form>
        </div>
      </div>
      <div class="card panel-focus-target" id="system-runtime-card">
        <h3>${state.lang === 'zh' ? '本机路径与诊断信息' : 'Local Paths & Diagnostics'}</h3>
        <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '上面已经展示了日常会用到的路径和状态。只有在需要排查问题或联系技术支持时，再展开下面的高级诊断信息。' : 'The cards above already show the paths and statuses needed for daily use. Only expand the advanced diagnostics below when troubleshooting or contacting support.')}</div>
        ${renderAdvancedDisclosure({
          title: state.lang === 'zh' ? '诊断信息（高级）' : 'Diagnostics (Advanced)',
          description: state.lang === 'zh' ? '这是一份原始运行诊断数据，适合排查问题或发给技术支持。普通使用场景可以忽略。' : 'This raw diagnostic payload is mainly for troubleshooting or sharing with support. Most users can ignore it.',
          bodyHtml: `<pre>${prettyJson(runtimeSnapshot)}</pre>`,
        })}
      </div>
    `;

    setPanel(t('tabs.system'), t('desc.system'), body);
    const bindSystemPanelActions = () => {
      applyPendingPanelFocus('system');

      document.querySelectorAll('[data-service-action]').forEach((button) => {
        button.addEventListener('click', async () => {
          const action = button.getAttribute('data-service-action');
          try {
            let result;
            if (action === 'restart-guard') {
              await triggerGuardRestart(false);
              return;
            }
            if (action === 'restart-guard-with-gateway') {
              await triggerGuardRestart(true);
              return;
            }
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
            if (result?.action?.phase === 'running') {
              scheduleServiceStatusPoll();
            }
          } catch (error) {
            showToast(error.message || String(error), 'error');
          }
        });
      });

      document.querySelectorAll('[data-prewarm-action]').forEach((button) => {
        button.addEventListener('click', async () => {
          const action = button.getAttribute('data-prewarm-action');
          try {
            if (action === 'reload') {
              await loadSystem();
              return;
            }
            const result = await postJson('/api/cache-prewarm/trigger', { trigger: 'web-manual' });
            const ok = result?.scheduled !== false;
            showToast(result?.message || 'OK', ok ? 'success' : 'error');
            await loadSystem();
            if (result?.status?.phase === 'running' || result?.status?.phase === 'scheduled') {
              schedulePrewarmStatusPoll();
            }
          } catch (error) {
            showToast(error.message || String(error), 'error');
          }
        });
      });

      const envForm = document.getElementById('system-env-form');
      const envKeyInput = document.getElementById('system-env-key');
      const envValueInput = document.getElementById('system-env-value');
      const envMode = document.getElementById('system-env-mode');
      const envHint = document.getElementById('system-env-hint');

      const resetEnvForm = () => {
        if (!(envKeyInput instanceof HTMLInputElement) || !(envValueInput instanceof HTMLTextAreaElement)) return;
        if (envMode) {
          envMode.textContent = state.lang === 'zh'
            ? '新建模式：填写 key 和 value 后保存。'
            : 'Create mode: enter a key and value, then save.';
        }
        if (envHint) {
          envHint.textContent = state.lang === 'zh'
            ? '编辑已有敏感键时，旧值不会回填到表单。直接输入新值即可覆盖。'
            : 'Existing sensitive values are not prefilled. Enter a new value to overwrite them.';
        }
        envKeyInput.readOnly = false;
        envKeyInput.value = '';
        envValueInput.value = '';
        envValueInput.placeholder = state.lang === 'zh'
          ? '输入要保存到本地 env 文件的值'
          : 'Enter the value to store in the local env file';
      };

      document.querySelectorAll('[data-env-edit]').forEach((button) => {
        button.addEventListener('click', () => {
          if (!(envKeyInput instanceof HTMLInputElement) || !(envValueInput instanceof HTMLTextAreaElement)) return;
          const key = button.getAttribute('data-env-edit') || '';
          envKeyInput.value = key;
          envKeyInput.readOnly = true;
          envValueInput.value = '';
          envValueInput.placeholder = state.lang === 'zh'
            ? `输入新的值以覆盖 ${key}`
            : `Enter a new value to overwrite ${key}`;
          if (envMode) {
            envMode.textContent = state.lang === 'zh'
              ? `编辑模式：当前正在更新 ${key}`
              : `Edit mode: updating ${key}`;
          }
          if (envHint) {
            envHint.textContent = isSensitiveField(key)
              ? (state.lang === 'zh'
                ? '这是一个敏感键，旧值不会展示在表单中。请直接输入新值并保存。'
                : 'This is a sensitive key. The previous value is not shown in the form. Enter a new value and save it.')
              : (state.lang === 'zh'
                ? '这是一个普通键。为了避免误写，这里也不会回填旧值，保存后会直接覆盖。'
                : 'This is a standard key. The previous value is also not prefilled to avoid accidental leakage; saving will overwrite it.');
          }
          envValueInput.focus();
        });
      });

      document.querySelectorAll('[data-env-delete]').forEach((button) => {
        button.addEventListener('click', async () => {
          const key = button.getAttribute('data-env-delete') || '';
          if (!key) return;
          const confirmed = await showConfirmDialog({
            title: state.lang === 'zh' ? '删除环境变量' : 'Delete Environment Variable',
            message: state.lang === 'zh'
              ? `确认删除 ${key} 吗？这会把它从本地 env 文件里移除。`
              : `Remove ${key}? This will delete it from the local env file.`,
            confirmText: state.lang === 'zh' ? '确认删除' : 'Delete',
            tone: 'danger',
          });
          if (!confirmed) return;
          try {
            const result = await apiRequest(`/api/env?key=${encodeURIComponent(key)}`, { method: 'DELETE' });
            const ok = result?.success !== false;
            showToast(result?.message || 'OK', ok ? 'success' : 'error');
            await loadSystem();
          } catch (error) {
            showToast(error.message || String(error), 'error');
          }
        });
      });

      document.querySelector('[data-env-action="clear"]')?.addEventListener('click', () => {
        resetEnvForm();
        envKeyInput?.focus();
      });

      document.querySelector('[data-env-action="reload"]')?.addEventListener('click', async () => {
        await loadSystem();
      });

      envForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!(envKeyInput instanceof HTMLInputElement) || !(envValueInput instanceof HTMLTextAreaElement)) return;
        const key = envKeyInput.value.trim();
        const value = envValueInput.value;
        if (!key) {
          showToast(state.lang === 'zh' ? '请先填写 Env Key。' : 'Env key is required.', 'error');
          return;
        }
        try {
          const result = await postJson('/api/env', { key, value });
          const ok = result?.success !== false;
          showToast(result?.message || 'OK', ok ? 'success' : 'error');
          await loadSystem();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    };

    bindSystemPanelActions();
    rememberCurrentPanelRender(viewTabId, bindSystemPanelActions);

    if (serviceActionMeta.phase === 'running') {
      scheduleServiceStatusPoll();
    }
    if (guardRestartMeta.phase === 'running') {
      scheduleGuardRestartPoll();
    }
    if (prewarmMeta.phase === 'running' || prewarmMeta.phase === 'scheduled') {
      schedulePrewarmStatusPoll();
    }
  }

  async function loadOpenClawTab(options = {}) {
    return loadOpenClawTabV2(options);
    const viewTabId = 'openclaw';
    const reuseExisting = options.reuseExisting === true;
    if (!reuseExisting) {
      setPanelSections(t('tabs.openclaw'), t('desc.openclaw'), [
        { id: 'openclaw-summary', title: state.lang === 'zh' ? 'OpenClaw 概览' : 'OpenClaw Overview' },
        { id: 'openclaw-install', title: state.lang === 'zh' ? '安装、修复与更新' : 'Install, Repair & Update' },
        { id: 'openclaw-runtime', title: state.lang === 'zh' ? '安装 / 更新过程' : 'Install / Update Progress' },
        { id: 'openclaw-notes', title: state.lang === 'zh' ? '安装前先确认' : 'Before You Install' },
        { id: 'openclaw-snapshot', title: state.lang === 'zh' ? '诊断信息（高级）' : 'Diagnostics (Advanced)' },
      ]);
    }

    const status = await apiRequest('/api/openclaw/status');
    const dashboardPromise = apiRequest('/api/gateway/dashboard').catch(() => ({}));
    const tokenPromise = apiRequest('/api/gateway/token').catch(() => ({}));
    const actionMeta = getOpenClawActionMeta(status.action);
    const isRunning = actionMeta.phase === 'running';
    const installBlockers = Array.isArray(status.installBlockers) ? status.installBlockers.filter(Boolean) : [];
    const platformNotes = Array.isArray(status.platformNotes) ? status.platformNotes.filter(Boolean) : [];
    const logTail = Array.isArray(status.action?.logTail) ? status.action.logTail.filter(Boolean) : [];
    const targetPath = status.installTargetBinaryPath || status.installTargetBinDir || '-';
    const installCommand = status.installCommand || 'npm install -g openclaw@latest';
    const installReadyDetail = status.installReady
      ? (status.installTargetBinDir || (state.lang === 'zh' ? '环境检查通过' : 'Environment check passed'))
      : (installBlockers[0] || (state.lang === 'zh' ? '需要先处理安装前置条件' : 'Resolve install blockers first'));
    const versionDetail = status.installed
      ? (status.updateAvailable
        ? (state.lang === 'zh'
          ? `当前 ${status.version || '-'}，可更新到 ${status.latestVersion || '-'}`
          : `Current ${status.version || '-'}, latest ${status.latestVersion || '-'}`)
        : (state.lang === 'zh'
          ? `当前 ${status.version || '-'}`
          : `Current ${status.version || '-'}`))
      : (state.lang === 'zh' ? '尚未检测到 OpenClaw CLI。' : 'OpenClaw CLI is not installed yet.');

    const partialBody = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '安装状态' : 'Install State', status.installed ? (state.lang === 'zh' ? '已安装' : 'Installed') : (state.lang === 'zh' ? '未安装' : 'Missing'), versionDetail, status.installed ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '现在能否安装' : 'Ready To Install', status.installReady ? (state.lang === 'zh' ? '可以开始' : 'Ready') : (state.lang === 'zh' ? '先处理问题' : 'Blocked'), installReadyDetail, status.installReady ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '当前任务' : 'Current Task', actionMeta.phaseLabel, `${actionMeta.modeLabel} · ${formatRelative(status.action?.lastUpdatedAt || status.action?.startedAt)}`, actionMeta.pillClass)}
        ${metricCard('Dashboard', state.lang === 'zh' ? '加载中' : 'Loading', state.lang === 'zh' ? '正在读取 Gateway 信息' : 'Reading gateway details', 'warn')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '安装、修复与更新' : 'Install, Repair & Update'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '当这台电脑还没装 OpenClaw，或当前安装异常、版本过旧时，在这里处理。' : 'Use this section when OpenClaw is missing, broken, or needs to be updated on this machine.')}</div>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(actionMeta.message)}</div>
          <div class="toolbar tight" style="margin-top:14px;">
            <button class="action-btn primary" type="button" data-openclaw-action="install" ${isRunning ? 'disabled' : ''}>${state.lang === 'zh' ? '安装 / 修复' : 'Install / Repair'}</button>
            <button class="action-btn" type="button" data-openclaw-action="update" ${isRunning ? 'disabled' : ''}>${state.lang === 'zh' ? '更新到最新' : 'Update'}</button>
            <button class="action-btn" type="button" data-openclaw-action="copy-command">${state.lang === 'zh' ? '复制安装命令' : 'Copy Command'}</button>
          </div>
          <div class="status" style="margin-top:14px;">${escapeHtml(state.lang === 'zh' ? `命令: ${installCommand}` : `Command: ${installCommand}`)}</div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '开始前先看这里' : 'Check Before You Start'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '如果这里出现待处理项，先处理完再安装，成功率会更高。' : 'If this card shows blockers, clear them first so installation succeeds more reliably.')}</div>
          ${installBlockers.length
            ? `<div class="list" style="margin-top:12px;">${installBlockers.map((item) => `<div class="list-item">${escapeHtml(item)}</div>`).join('')}</div>`
            : `<div class="status" style="margin-top:12px;">${escapeHtml(state.lang === 'zh' ? '环境已满足自动安装前置条件。' : 'This machine is ready for automated installation.')}</div>`}
        </div>
      </div>
    `;
    if (!reuseExisting) {
      setPanel(t('tabs.openclaw'), t('desc.openclaw'), partialBody);
    }

    const [dashboard, token] = await Promise.all([dashboardPromise, tokenPromise]);
    const tokenMasked = token?.token ? maskSensitiveValue('token', token.token) : '';
    const actionTimeline = state.lang === 'zh'
      ? `开始 ${formatDate(status.action?.startedAt)} · 更新 ${formatDate(status.action?.lastUpdatedAt)} · 结束 ${formatDate(status.action?.finishedAt)}`
      : `Started ${formatDate(status.action?.startedAt)} · Updated ${formatDate(status.action?.lastUpdatedAt)} · Finished ${formatDate(status.action?.finishedAt)}`;

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '安装状态' : 'Install State', status.installed ? (state.lang === 'zh' ? '已安装' : 'Installed') : (state.lang === 'zh' ? '未安装' : 'Missing'), versionDetail, status.installed ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '现在能否安装' : 'Ready To Install', status.installReady ? (state.lang === 'zh' ? '可以开始' : 'Ready') : (state.lang === 'zh' ? '先处理问题' : 'Blocked'), installReadyDetail, status.installReady ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '当前任务' : 'Current Task', actionMeta.phaseLabel, state.lang === 'zh' ? `${actionMeta.modeLabel} · ${formatRelative(status.action?.lastUpdatedAt || status.action?.startedAt)}` : `${actionMeta.modeLabel} · ${formatRelative(status.action?.lastUpdatedAt || status.action?.startedAt)}`, actionMeta.pillClass)}
        ${metricCard('Dashboard', dashboard.url ? 'READY' : 'UNAVAILABLE', dashboard.url || (state.lang === 'zh' ? '等待 Gateway 就绪' : 'Waiting for Gateway'), dashboard.url ? 'success' : 'warn')}
      </div>
      <div class="grid">
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <h3>${state.lang === 'zh' ? '安装、修复与更新' : 'Install, Repair & Update'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '当这台电脑还没装 OpenClaw，或当前安装异常、版本过旧时，在这里处理。' : 'Use this section when OpenClaw is missing, broken, or needs to be updated on this machine.')}</div>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(actionMeta.message)}</div>
            </div>
            <span class="pill ${actionMeta.pillClass}">${escapeHtml(actionMeta.phaseLabel)}</span>
          </div>
          <div class="toolbar tight" style="margin-top:14px;">
            <button class="action-btn primary" type="button" data-openclaw-action="install" ${isRunning ? 'disabled' : ''}>${state.lang === 'zh' ? '安装 / 修复' : 'Install / Repair'}</button>
            <button class="action-btn" type="button" data-openclaw-action="update" ${isRunning ? 'disabled' : ''}>${state.lang === 'zh' ? '更新到最新' : 'Update'}</button>
            <button class="action-btn" type="button" data-openclaw-action="copy-command">${state.lang === 'zh' ? '复制安装命令' : 'Copy Command'}</button>
            <button class="action-btn" type="button" data-openclaw-action="dashboard" ${dashboard.url ? '' : 'disabled'}>${state.lang === 'zh' ? '打开 Dashboard' : 'Open Dashboard'}</button>
          </div>
          <div class="status" style="margin-top:14px;">
            ${escapeHtml(state.lang === 'zh' ? `命令: ${installCommand}` : `Command: ${installCommand}`)}
          </div>
          <div class="list" style="margin-top:14px;">
            <div class="list-item">
              <div class="row" style="justify-content:space-between"><strong>${state.lang === 'zh' ? 'CLI 路径' : 'CLI Path'}</strong><span class="pill ${status.binPath ? 'success' : 'warn'}">${escapeHtml(status.binPath ? (state.lang === 'zh' ? '已定位' : 'Detected') : (state.lang === 'zh' ? '未定位' : 'Missing'))}</span></div>
              <div class="muted small">${escapeHtml(status.binPath || '-')}</div>
            </div>
            <div class="list-item">
              <div class="row" style="justify-content:space-between"><strong>${state.lang === 'zh' ? '安装目标' : 'Install Target'}</strong><span class="pill">${escapeHtml(status.installTargetBinDir ? (state.lang === 'zh' ? 'npm 全局目录' : 'Global npm bin') : '-')}</span></div>
              <div class="muted small">${escapeHtml(targetPath)}</div>
            </div>
            <div class="list-item">
              <div class="row" style="justify-content:space-between"><strong>Node / npm</strong><span class="pill ${(status.npmVersion && status.nodeVersion) ? 'success' : 'warn'}">${escapeHtml(status.npmVersion ? (state.lang === 'zh' ? '环境正常' : 'Ready') : (state.lang === 'zh' ? '缺少 npm' : 'npm missing'))}</span></div>
              <div class="muted small">${escapeHtml(`Node ${status.nodeVersion || '-'} · npm ${status.npmVersion || '-'}`)}</div>
              <div class="muted small">${escapeHtml(status.npmPrefix || '-')}</div>
            </div>
            <div class="list-item">
              <div class="row" style="justify-content:space-between"><strong>Gateway Token</strong><span class="pill ${token?.token ? 'success' : 'warn'}">${escapeHtml(token?.token ? (state.lang === 'zh' ? '已就绪' : 'Ready') : (state.lang === 'zh' ? '未就绪' : 'Unavailable'))}</span></div>
              <div class="muted small">${escapeHtml(tokenMasked || (state.lang === 'zh' ? '未拿到 Gateway Token。' : 'Gateway token unavailable.'))}</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <h3>${state.lang === 'zh' ? '安装 / 更新过程' : 'Install / Update Progress'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里会显示最近一次安装或更新正在做什么，失败时也会留下线索。' : 'This card shows what the latest install or update is doing, and keeps clues when something fails.')}</div>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(actionTimeline)}</div>
            </div>
            <span class="pill ${actionMeta.pillClass}">${escapeHtml(actionMeta.modeLabel)}</span>
          </div>
          <div class="list" style="margin-top:14px;">
            <div class="list-item">
              <strong>${state.lang === 'zh' ? '运行说明' : 'Summary'}</strong>
              <div style="margin-top:8px;">${escapeHtml(actionMeta.message)}</div>
              ${status.action?.error ? `<div class="muted small" style="margin-top:8px; color:#b42318;">${escapeHtml(status.action.error)}</div>` : ''}
            </div>
            <div class="list-item">
              <strong>${state.lang === 'zh' ? '最近日志' : 'Recent Log'}</strong>
              <div style="margin-top:8px;">${logTail.length ? `<pre>${escapeHtml(logTail.join('\n'))}</pre>` : emptyState(state.lang === 'zh' ? '当前还没有安装或更新日志。' : 'No install or update log yet.')}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '安装前先确认' : 'Before You Install'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '如果这里提示待处理项，先修正后再安装，通常可以避免中途失败。' : 'If this card lists blockers, fix them before you install to avoid failing halfway through.')}</div>
          ${installBlockers.length
            ? `<div class="list" style="margin-top:12px;">${installBlockers.map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(state.lang === 'zh' ? '阻塞项' : 'Blocker')}</strong><span class="pill warn">${escapeHtml(state.lang === 'zh' ? '待处理' : 'Action Needed')}</span></div><div style="margin-top:8px;">${escapeHtml(item)}</div></div>`).join('')}</div>`
            : `<div class="status" style="margin-top:12px;">${escapeHtml(state.lang === 'zh' ? '当前环境满足 OpenClaw 自动安装条件。' : 'This machine is ready for automated OpenClaw installation.')}</div>`}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '平台补充说明' : 'Platform-specific Notes'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里会补充当前系统下的安装差异、路径习惯或兼容提醒。' : 'This card highlights platform-specific install differences, path conventions, and compatibility notes.')}</div>
          ${platformNotes.length
            ? `<div class="list" style="margin-top:12px;">${platformNotes.map((item) => `<div class="list-item">${escapeHtml(item)}</div>`).join('')}</div>`
            : emptyState(state.lang === 'zh' ? '当前没有额外的平台说明。' : 'No platform notes.')}
        </div>
      </div>
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <h3>${state.lang === 'zh' ? '诊断信息（高级）' : 'Diagnostics (Advanced)'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里保留原始状态，适合排查 PATH、版本识别或安装异常，也可以直接复制给技术支持。' : 'This raw state is helpful for diagnosing PATH, version detection, or install problems, and can be copied directly for support.')}</div>
            </div>
            <button class="action-btn" type="button" data-openclaw-action="copy-status">${state.lang === 'zh' ? '复制状态 JSON' : 'Copy JSON'}</button>
          </div>
          ${renderAdvancedDisclosure({
            title: state.lang === 'zh' ? '展开原始状态' : 'Expand Raw Status',
            description: state.lang === 'zh' ? '只有在需要进一步排查时，再展开查看完整状态 JSON。' : 'Expand this only when you need the full raw status JSON for troubleshooting.',
            bodyHtml: `<pre>${prettyJson(status)}</pre>`,
          })}
        </div>
    `;

    setPanel(t('tabs.openclaw'), t('desc.openclaw'), body);
    const bindOpenClawActions = () => {
      document.querySelectorAll('[data-openclaw-action]').forEach((button) => {
        button.addEventListener('click', async () => {
          const action = button.getAttribute('data-openclaw-action');
          if (!action) return;
          try {
            if (action === 'dashboard') {
              if (dashboard.url) window.open(dashboard.url, '_blank');
              return;
            }
            if (action === 'copy-command') {
              await copyTextValue(installCommand, {
                successMessage: state.lang === 'zh' ? '安装命令已复制。' : 'Install command copied.',
              });
              return;
            }
            if (action === 'copy-status') {
              await copyTextValue(JSON.stringify(status, null, 2), {
                successMessage: state.lang === 'zh' ? '状态 JSON 已复制。' : 'Status JSON copied.',
              });
              return;
            }
            const result = await postJson(`/api/openclaw/${action}`, {});
            const ok = result?.success !== false;
            showToast(result?.message || 'OK', ok ? 'success' : 'error');
            await loadOpenClawTab();
          } catch (error) {
            showToast(error.message || String(error), 'error');
          }
        });
      });
    };
    bindOpenClawActions();
    rememberCurrentPanelRender(viewTabId, bindOpenClawActions);

    if (isRunning) {
      scheduleOpenClawStatusPoll();
    } else {
      clearOpenClawPollTimer();
    }
  }

  async function loadOpenClawTabV2(options = {}) {
    const viewTabId = 'openclaw';
    const reuseExisting = options.reuseExisting === true;
    if (!reuseExisting) {
      setPanelSections(t('tabs.openclaw'), t('desc.openclaw'), [
        { id: 'openclaw-summary', title: state.lang === 'zh' ? '当前状态' : 'Current State' },
        { id: 'openclaw-primary', title: state.lang === 'zh' ? '推荐动作' : 'Recommended Action' },
        { id: 'openclaw-runtime', title: state.lang === 'zh' ? '任务进度' : 'Task Progress' },
        { id: 'openclaw-advanced', title: state.lang === 'zh' ? '高级能力' : 'Advanced Controls' },
      ]);
    }

    const [status, targets] = await Promise.all([
      apiRequest('/api/openclaw/status'),
      apiRequest('/api/openclaw/targets').catch(() => ({
        channels: ['stable', 'beta', 'dev'],
        packageVersions: [],
        quickRollbackTarget: null,
        recentGitTags: [],
        history: [],
      })),
    ]);

    const actionMeta = getOpenClawActionMeta(status.action);
    const isRunning = actionMeta.phase === 'running';
    const installBlockers = Array.isArray(status.installBlockers) ? status.installBlockers.filter(Boolean) : [];
    const platformNotes = Array.isArray(status.platformNotes) ? status.platformNotes.filter(Boolean) : [];
    const logTail = Array.isArray(status.action?.logTail) ? status.action.logTail.filter(Boolean) : [];
    const historyItems = Array.isArray(targets.history) ? targets.history : [];
    const versionOptions = Array.isArray(targets.packageVersions) ? targets.packageVersions : [];
    const recentTags = Array.isArray(targets.recentGitTags) ? targets.recentGitTags : [];
    const quickRollback = targets.quickRollbackTarget || null;
    const installKindLabel = status.installKind === 'git'
      ? (state.lang === 'zh' ? '源码检出' : 'Source Checkout')
      : status.installKind === 'package'
        ? (state.lang === 'zh' ? '包安装' : 'Package Install')
        : (state.lang === 'zh' ? '未识别' : 'Unknown');
    const updaterLabel = status.effectiveUpdater === 'official-cli'
      ? (state.lang === 'zh' ? '官方同源更新' : 'Official in-place updater')
      : status.effectiveUpdater === 'git-direct'
        ? (state.lang === 'zh' ? '源码直连回退' : 'Direct git rollback')
        : (state.lang === 'zh' ? 'Guard 托管修复' : 'Guard bootstrap repair');
    const primaryAction = status.installed ? 'update' : 'install';
    const primaryLabel = status.installed
      ? (state.lang === 'zh' ? '更新到推荐版本' : 'Update to Recommended Version')
      : (state.lang === 'zh' ? '安装 / 修复 OpenClaw' : 'Install / Repair OpenClaw');
    const versionDetail = status.installed
      ? (status.updateAvailable
        ? (state.lang === 'zh' ? `当前 ${status.version || '-'}，推荐 ${status.latestVersion || '-'}` : `Current ${status.version || '-'}, recommended ${status.latestVersion || '-'}`)
        : (state.lang === 'zh' ? `当前 ${status.version || '-'}` : `Current ${status.version || '-'}`))
      : (state.lang === 'zh' ? '当前未检测到可用的 OpenClaw CLI。' : 'No working OpenClaw CLI was detected.');
    const installReadyDetail = status.installReady
      ? (status.installTargetBinaryPath || status.installTargetBinDir || (state.lang === 'zh' ? '环境检查通过' : 'Environment check passed'))
      : (installBlockers[0] || (state.lang === 'zh' ? '需要先处理安装前置条件' : 'Resolve install blockers first'));
    const lastHistory = status.lastHistoryEntry
      ? `${status.lastHistoryEntry.kind} · ${formatDate(status.lastHistoryEntry.finishedAt)}`
      : (state.lang === 'zh' ? '暂无由 Guard 记录的历史' : 'No Guard-managed history yet');
    const detachedHint = status.installKind === 'git' && status.officialStatus?.git?.branch === 'HEAD'
      ? `<div class="status warn" style="margin-top:12px;">${escapeHtml(state.lang === 'zh' ? '当前处于 detached HEAD。完成历史点排查后，请在高级区切回正常渠道、分支或标签。' : 'The repo is currently on a detached HEAD. Use the advanced controls to return to a normal channel, branch, or tag when you are done.')}</div>`
      : '';
    const uninstallSummary = state.lang === 'zh'
      ? '这会尝试先停止 Gateway，并移除当前检测到的 OpenClaw 程序文件。不会删除 Guard、本机 .openclaw 数据、工作区、记忆、会话记录或你的自定义项目文件。'
      : 'This attempts to stop Gateway first and remove the detected OpenClaw program files. It does not remove Guard, local .openclaw data, workspaces, memories, sessions, or your custom project files.';
    const uninstallWarning = status.installKind === 'git'
      ? (state.lang === 'zh'
        ? '当前安装来自源码检出。Guard 不会自动删除你的源码仓库；执行后会给出手动清理说明。'
        : 'This install comes from a source checkout. Guard will not delete your repository automatically and will show manual cleanup guidance instead.')
      : (state.lang === 'zh'
        ? `当前将按 ${installKindLabel} 的方式清理 ${status.updateRoot || status.binPath || status.managedPrefix || '-' }。`
        : `Guard will remove the detected ${installKindLabel.toLowerCase()} install at ${status.updateRoot || status.binPath || status.managedPrefix || '-'}.`);

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '安装状态' : 'Install State', status.installed ? (state.lang === 'zh' ? '已安装' : 'Installed') : (state.lang === 'zh' ? '未安装' : 'Missing'), versionDetail, status.installed ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '更新渠道' : 'Update Channel', status.updateChannel || '-', status.updateChannelSource || (state.lang === 'zh' ? '来自 Guard 检测' : 'Detected by Guard'), status.updateChannel ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '更新方式' : 'Update Strategy', updaterLabel, `${installKindLabel} · ${status.packageManager || '-'}`, status.officialStatusAvailable ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '当前任务' : 'Current Task', actionMeta.phaseLabel, `${actionMeta.modeLabel} · ${formatRelative(status.action?.lastUpdatedAt || status.action?.startedAt)}`, actionMeta.pillClass)}
      </div>
      <div class="grid">
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <h3>${state.lang === 'zh' ? '推荐动作' : 'Recommended Action'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(status.installed
                ? (state.lang === 'zh' ? '默认主按钮只做推荐更新。复杂能力放在高级区里，避免把普通用户一上来就扔进版本细节。' : 'The primary button only handles the recommended update. Version-level controls stay in the advanced area so new users do not start with internals.')
                : (state.lang === 'zh' ? '当前先把 OpenClaw 安装好或修复好。之后 Guard 会继续沿原安装来源做更新和回退。' : 'Install or repair OpenClaw first. After that, Guard keeps following the original install path for updates and rollback.'))}</div>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(actionMeta.message)}</div>
            </div>
            <span class="pill ${actionMeta.pillClass}">${escapeHtml(actionMeta.phaseLabel)}</span>
          </div>
          <div class="toolbar tight" style="margin-top:14px;">
            <button class="action-btn primary" type="button" data-openclaw-action="${primaryAction}" ${isRunning ? 'disabled' : ''}>${primaryLabel}</button>
            ${quickRollback ? `<button class="action-btn" type="button" data-openclaw-action="quick-rollback" ${isRunning ? 'disabled' : ''}>${state.lang === 'zh' ? '恢复到上一版本' : 'Restore Previous Version'}</button>` : ''}
            <button class="action-btn" type="button" data-openclaw-action="copy-command">${state.lang === 'zh' ? '复制托管安装命令' : 'Copy Managed Install Command'}</button>
          </div>
          <div class="list" style="margin-top:14px;">
            <div class="list-item"><div class="row" style="justify-content:space-between"><strong>${state.lang === 'zh' ? '当前来源' : 'Detected Source'}</strong><span class="pill ${status.binPath ? 'success' : 'warn'}">${escapeHtml(status.detectedSource || '-')}</span></div><div class="muted small">${escapeHtml(status.binPath || '-')}</div></div>
            <div class="list-item"><div class="row" style="justify-content:space-between"><strong>${state.lang === 'zh' ? '安装根目录' : 'Install Root'}</strong><span class="pill">${escapeHtml(installKindLabel)}</span></div><div class="muted small">${escapeHtml(status.updateRoot || status.managedPrefix || '-')}</div></div>
            <div class="list-item"><div class="row" style="justify-content:space-between"><strong>Node / npm</strong><span class="pill ${(status.npmVersion && status.nodeVersion) ? 'success' : 'warn'}">${escapeHtml(status.npmVersion ? (state.lang === 'zh' ? '环境正常' : 'Ready') : (state.lang === 'zh' ? '缺少 npm' : 'npm missing'))}</span></div><div class="muted small">${escapeHtml(`Node ${status.nodeVersion || '-'} · npm ${status.npmVersion || '-'}`)}</div><div class="muted small">${escapeHtml(status.npmPrefix || '-')}</div></div>
            <div class="list-item"><div class="row" style="justify-content:space-between"><strong>${state.lang === 'zh' ? '最近历史' : 'Latest History'}</strong><span class="pill ${status.quickRollbackAvailable ? 'success' : ''}">${escapeHtml(status.quickRollbackAvailable ? (state.lang === 'zh' ? '可快速回退' : 'Quick rollback ready') : (state.lang === 'zh' ? '先完成一次更新' : 'Need one Guard update first'))}</span></div><div class="muted small">${escapeHtml(lastHistory)}</div></div>
          </div>
          ${detachedHint}
          ${installBlockers.length ? `<div class="status warn" style="margin-top:12px;">${escapeHtml(installBlockers[0])}</div>` : ''}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '任务进度' : 'Task Progress'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里会保留最近一次安装、更新、回退或卸载的摘要与日志线索。' : 'This card keeps the latest install, update, rollback, or uninstall summary together with the last useful logs.')}</div>
          <div class="list" style="margin-top:14px;">
            <div class="list-item"><strong>${state.lang === 'zh' ? '运行说明' : 'Summary'}</strong><div style="margin-top:8px;">${escapeHtml(actionMeta.message)}</div>${status.action?.error ? `<div class="muted small" style="margin-top:8px; color:#b42318;">${escapeHtml(status.action.error)}</div>` : ''}</div>
            <div class="list-item"><strong>${state.lang === 'zh' ? '时间线' : 'Timeline'}</strong><div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? `开始 ${formatDate(status.action?.startedAt)} · 更新 ${formatDate(status.action?.lastUpdatedAt)} · 结束 ${formatDate(status.action?.finishedAt)}` : `Started ${formatDate(status.action?.startedAt)} · Updated ${formatDate(status.action?.lastUpdatedAt)} · Finished ${formatDate(status.action?.finishedAt)}`)}</div></div>
            <div class="list-item"><strong>${state.lang === 'zh' ? '最近日志' : 'Recent Log'}</strong><div style="margin-top:8px;">${logTail.length ? `<pre>${escapeHtml(logTail.join('\n'))}</pre>` : emptyState(state.lang === 'zh' ? '当前还没有任务日志。' : 'No lifecycle task log yet.')}</div></div>
          </div>
        </div>
      </div>
    `;

    const advancedHtml = `
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '高级能力' : 'Advanced Controls'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '推荐更新之外的能力都放在这里，例如切渠道、指定版本、回到旧版本，执行源码检出回退，或彻底卸载当前安装。' : 'Everything beyond the recommended update lives here: switch channels, pick a version, restore an older release, run a source-checkout rollback, or fully remove the current install.')}</div>
          ${renderAdvancedDisclosure({
            title: state.lang === 'zh' ? '展开高级能力' : 'Expand Advanced Controls',
            description: state.lang === 'zh' ? '普通用户通常只需要上面的主按钮；这里只在你确实要管版本、渠道、历史点或卸载时再展开。' : 'Most users only need the primary button above. Expand this when you truly need version-, channel-, history-, or uninstall-level control.',
            bodyHtml: `
              <div class="list">
                <div class="list-item">
                  <strong>${state.lang === 'zh' ? '渠道切换' : 'Channel Switch'}</strong>
                  <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这会沿当前安装来源执行官方更新。源码检出用户通常用它切换 stable / beta / dev。' : 'This follows the current install source and runs the official updater. Source-checkout users typically use it to switch between stable / beta / dev.')}</div>
                  <div class="toolbar tight" style="margin-top:12px;">${(Array.isArray(targets.channels) ? targets.channels : ['stable', 'beta', 'dev']).map((channel) => `<button class="action-btn" type="button" data-openclaw-action="apply-channel" data-channel="${escapeHtml(channel)}" ${isRunning || !status.officialStatusAvailable ? 'disabled' : ''}>${escapeHtml(channel)}</button>`).join('')}</div>
                </div>
                <div class="list-item">
                  <strong>${state.lang === 'zh' ? '指定版本' : 'Choose a Version'}</strong>
                  <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '适合 package 安装场景。你可以指定一个版本更新过去，也可以配合“恢复到上一版本”回到最近的已知稳定版本。' : 'Best for package installs. Pick a version directly, or combine it with “Restore Previous Version” to move back to a recent known-good release.')}</div>
                  <div class="row" style="gap:10px; margin-top:12px; align-items:center;">
                    <select id="openclaw-version-select" ${isRunning || !versionOptions.length ? 'disabled' : ''}>
                      <option value="">${state.lang === 'zh' ? '选择一个版本' : 'Select a version'}</option>
                      ${versionOptions.map((version) => `<option value="${escapeHtml(version)}">${escapeHtml(version)}</option>`).join('')}
                    </select>
                    <button class="action-btn" type="button" data-openclaw-action="apply-version" ${isRunning || !versionOptions.length ? 'disabled' : ''}>${state.lang === 'zh' ? '更新到这个版本' : 'Update to This Version'}</button>
                    ${quickRollback ? `<button class="action-btn" type="button" data-openclaw-action="quick-rollback" ${isRunning ? 'disabled' : ''}>${state.lang === 'zh' ? '恢复到上一版本' : 'Restore Previous Version'}</button>` : ''}
                  </div>
                  ${quickRollback ? `<div class="muted small" style="margin-top:8px;">${escapeHtml(quickRollback.label || '')}</div>` : ''}
                </div>
                <div class="list-item">
                  <strong>${state.lang === 'zh' ? '源码检出高级回退' : 'Advanced Git Rollback'}</strong>
                  <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里只适合源码检出用户。执行前必须保持 clean worktree，且回退后可能进入 detached HEAD。' : 'This section is for source-checkout users only. The worktree must stay clean, and the repo may end up in detached HEAD after rollback.')}</div>
                  <div class="row" style="gap:10px; margin-top:12px; align-items:center;">
                    <select id="openclaw-history-select" ${isRunning || !historyItems.length ? 'disabled' : ''}>
                      <option value="">${state.lang === 'zh' ? '按 Guard 历史记录选择' : 'Pick a Guard history entry'}</option>
                      ${historyItems.map((item) => `<option value="${escapeHtml(item.id || '')}">${escapeHtml(`${item.kind || 'history'} · ${item.finishedAt || item.startedAt || '-'}`)}</option>`).join('')}
                    </select>
                    <input id="openclaw-git-ref" type="text" placeholder="${state.lang === 'zh' ? '标签 / ref / sha' : 'tag / ref / sha'}" ${isRunning || status.installKind !== 'git' ? 'disabled' : ''}>
                    <input id="openclaw-git-date" type="text" placeholder="${state.lang === 'zh' ? '日期，例如 2026-03-01' : 'date, e.g. 2026-03-01'}" ${isRunning || status.installKind !== 'git' ? 'disabled' : ''}>
                    <button class="action-btn" type="button" data-openclaw-action="git-rollback" ${isRunning || status.installKind !== 'git' ? 'disabled' : ''}>${state.lang === 'zh' ? '回到这个历史点' : 'Rollback to This Point'}</button>
                  </div>
                  ${recentTags.length ? `<div class="muted small" style="margin-top:8px;">${escapeHtml((state.lang === 'zh' ? '近期标签: ' : 'Recent tags: ') + recentTags.slice(0, 6).join(', '))}</div>` : ''}
                </div>
                <div class="list-item">
                  <strong>${state.lang === 'zh' ? '彻底卸载' : 'Complete Uninstall'}</strong>
                  <div class="muted small" style="margin-top:8px;">${escapeHtml(uninstallSummary)}</div>
                  <div class="status warn" style="margin-top:12px;">${escapeHtml(uninstallWarning)}</div>
                  <div class="toolbar tight" style="margin-top:12px;">
                    <button class="action-btn danger" type="button" data-openclaw-action="uninstall" ${isRunning || !status.installed ? 'disabled' : ''}>${state.lang === 'zh' ? '彻底卸载 OpenClaw' : 'Completely Uninstall OpenClaw'}</button>
                  </div>
                </div>
              </div>
            `,
          })}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '诊断与原始状态' : 'Diagnostics and Raw State'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '安装阻塞项、平台差异、原始状态 JSON 都放在这里。需要排障时再展开即可。' : 'Install blockers, platform notes, and the raw JSON contract live here. Expand them only when you need diagnostics.')}</div>
          ${installBlockers.length ? `<div class="status warn" style="margin-top:12px;">${escapeHtml(installBlockers[0])}</div>` : `<div class="status" style="margin-top:12px;">${escapeHtml(installReadyDetail)}</div>`}
          ${platformNotes.length ? `<div class="list" style="margin-top:12px;">${platformNotes.map((item) => `<div class="list-item">${escapeHtml(item)}</div>`).join('')}</div>` : ''}
          <div class="toolbar tight" style="margin-top:14px;">
            <button class="action-btn" type="button" data-openclaw-action="copy-command">${state.lang === 'zh' ? '复制托管安装命令' : 'Copy Managed Install Command'}</button>
            <button class="action-btn" type="button" data-openclaw-action="copy-status">${state.lang === 'zh' ? '复制状态 JSON' : 'Copy Status JSON'}</button>
            <button class="action-btn" type="button" data-openclaw-action="copy-targets">${state.lang === 'zh' ? '复制目标 JSON' : 'Copy Targets JSON'}</button>
          </div>
          ${renderAdvancedDisclosure({
            title: state.lang === 'zh' ? '展开原始状态与目标目录' : 'Expand Raw Status and Target Catalog',
            description: state.lang === 'zh' ? '只有在需要进一步排查 PATH、安装来源、版本目录或历史回退时，再展开这一块。' : 'Expand this only when you need to inspect PATH detection, install source, version catalog, or rollback history in raw JSON form.',
            bodyHtml: `<pre>${prettyJson({ status, targets })}</pre>`,
          })}
        </div>
      </div>
    `;

    setPanel(t('tabs.openclaw'), t('desc.openclaw'), body + advancedHtml);
    const bindOpenClawActions = () => {
      document.querySelectorAll('[data-openclaw-action]').forEach((button) => {
        button.addEventListener('click', async () => {
          const action = button.getAttribute('data-openclaw-action');
          if (!action) return;
          try {
            if (action === 'copy-command') {
              await copyTextValue(status.installCommand || 'npm install -g openclaw@latest', { successMessage: state.lang === 'zh' ? '托管安装命令已复制。' : 'Managed install command copied.' });
              return;
            }
            if (action === 'copy-status') {
              await copyTextValue(JSON.stringify(status, null, 2), { successMessage: state.lang === 'zh' ? '状态 JSON 已复制。' : 'Status JSON copied.' });
              return;
            }
            if (action === 'copy-targets') {
              await copyTextValue(JSON.stringify(targets, null, 2), { successMessage: state.lang === 'zh' ? '目标目录 JSON 已复制。' : 'Target catalog JSON copied.' });
              return;
            }
            let endpoint = '/api/openclaw/update';
            let payload = {};
            let confirmOptions = null;
            if (action === 'install') endpoint = '/api/openclaw/install';
            if (action === 'uninstall') {
              endpoint = '/api/openclaw/uninstall';
              const uninstallRoot = status.updateRoot || status.binPath || status.managedPrefix || '-';
              const firstConfirmed = await showConfirmDialog({
                title: state.lang === 'zh' ? '彻底卸载 OpenClaw' : 'Completely Uninstall OpenClaw',
                message: uninstallSummary,
                description: state.lang === 'zh'
                  ? `当前目标: ${uninstallRoot}\n\n不会删除 Guard、本机 .openclaw 数据、工作区、记忆或会话文件。`
                  : `Current target: ${uninstallRoot}\n\nGuard, local .openclaw data, workspaces, memories, and session files will stay untouched.`,
                confirmText: state.lang === 'zh' ? '继续下一步' : 'Continue',
                tone: 'warn',
                kicker: state.lang === 'zh' ? '危险操作' : 'Destructive Action',
              });
              if (!firstConfirmed) return;
              const secondConfirmed = await showConfirmDialog({
                title: state.lang === 'zh' ? '最后确认卸载' : 'Final Uninstall Confirmation',
                message: state.lang === 'zh'
                  ? '这是不可逆的程序卸载操作。确认现在就移除当前机器上的 OpenClaw 程序文件吗？'
                  : 'This is an irreversible program uninstall action. Remove the detected OpenClaw program files from this machine now?',
                description: uninstallWarning,
                confirmText: state.lang === 'zh' ? '确认卸载' : 'Uninstall Now',
                tone: 'danger',
                kicker: state.lang === 'zh' ? '最后确认' : 'Final Check',
              });
              if (!secondConfirmed) return;
            }
            if (action === 'apply-channel') payload = { channel: button.getAttribute('data-channel') || '' };
            if (action === 'apply-version') {
              const select = document.getElementById('openclaw-version-select');
              const version = select?.value || '';
              if (!version) {
                showToast(state.lang === 'zh' ? '先选择一个版本。' : 'Choose a version first.', 'error');
                return;
              }
              payload = { tag: version };
            }
            if (action === 'quick-rollback') {
              endpoint = '/api/openclaw/rollback';
              payload = quickRollback?.historyId ? { historyId: quickRollback.historyId } : (quickRollback?.version ? { version: quickRollback.version } : {});
              confirmOptions = {
                title: state.lang === 'zh' ? '恢复到上一版本' : 'Restore Previous Version',
                message: state.lang === 'zh' ? '这会在当前安装来源上创建一次非破坏式回退。确认继续吗？' : 'This creates a non-destructive rollback on the current install source. Continue?',
              };
            }
            if (action === 'git-rollback') {
              endpoint = '/api/openclaw/rollback';
              const historySelect = document.getElementById('openclaw-history-select');
              const refInput = document.getElementById('openclaw-git-ref');
              const dateInput = document.getElementById('openclaw-git-date');
              payload = {
                historyId: historySelect?.value || undefined,
                gitRef: refInput?.value?.trim() || undefined,
                gitDate: dateInput?.value?.trim() || undefined,
              };
              if (!payload.historyId && !payload.gitRef && !payload.gitDate) {
                showToast(state.lang === 'zh' ? '先选择一个历史记录、标签 / ref / sha，或输入日期。' : 'Pick a history entry, a ref/tag/sha, or enter a date first.', 'error');
                return;
              }
              confirmOptions = {
                title: state.lang === 'zh' ? '执行源码高级回退' : 'Run Advanced Git Rollback',
                message: state.lang === 'zh' ? '这只适合源码检出用户。Guard 会要求 clean worktree，且回退后可能进入 detached HEAD。确认继续吗？' : 'This is for source-checkout users only. Guard requires a clean worktree and the repo may end up in detached HEAD. Continue?',
              };
            }
            if (confirmOptions) {
              const confirmed = await showConfirmDialog({ ...confirmOptions, confirmText: state.lang === 'zh' ? '继续执行' : 'Continue', tone: 'warn' });
              if (!confirmed) return;
            }
            const result = await postJson(endpoint, payload);
            const ok = result?.success !== false;
            showToast(result?.message || 'OK', ok ? 'success' : 'error');
            await loadOpenClawTab();
          } catch (error) {
            showToast(error.message || String(error), 'error');
          }
        });
      });
    };
    bindOpenClawActions();
    rememberCurrentPanelRender(viewTabId, bindOpenClawActions);
    if (isRunning) scheduleOpenClawStatusPoll();
    else clearOpenClawPollTimer();
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
      icon: 'FL',
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
    const isFeishuChannel = selected.id === 'feishu';
    const feishuDomain = selected.config?.domain || 'feishu';
    const feishuConnectionMode = selected.config?.connectionMode || 'websocket';
    const feishuGroupPolicy = selected.config?.groupPolicy || '-';
    const feishuDmPolicy = selected.config?.dmPolicy || '-';
    const feishuResponseMode = selected.config?.streaming
      ? (state.lang === 'zh' ? '流式回复' : 'Streaming')
      : (state.lang === 'zh' ? '普通回复' : 'Standard');
    const feishuRenderMode = selected.config?.renderMode || '-';

    function getChannelStatusMessage() {
      if (isFeishuChannel) {
        return selected.enabled
          ? (state.lang === 'zh'
            ? '飞书作为官方渠道统一在这里维护。保存后会直接更新当前机器上的接入配置和回复策略。'
            : 'Feishu is maintained here as an official channel. Saving updates the live connection settings and reply behavior on this machine immediately.')
          : (state.lang === 'zh'
            ? '飞书当前处于停用状态。你可以先补齐机器人凭据与接入方式，再决定是否启用。'
            : 'Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it.');
      }
      return selected.enabled
        ? (state.lang === 'zh' ? '保存后会直接更新当前消息入口配置。' : 'Saving here updates the live channel configuration immediately.')
        : (state.lang === 'zh' ? '这个消息入口当前停用中。可以先补齐配置，再决定是否启用。' : 'This channel is currently disabled. Finish the settings first, then decide whether to enable it.');
    }

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
        ${metricCard(state.lang === 'zh' ? '消息入口总数' : 'Channels', formatNumber(defs.length), state.lang === 'zh' ? '当前可管理的消息入口' : 'available message entry points')}
        ${metricCard(state.lang === 'zh' ? '已启用' : 'Enabled', formatNumber((channels || []).filter((item) => item.enabled).length), state.lang === 'zh' ? '运行中会接收消息' : 'receives traffic at runtime')}
        ${metricCard(state.lang === 'zh' ? '已配置' : 'Configured', formatNumber((channels || []).filter((item) => item.configured).length), state.lang === 'zh' ? '已经填入配置或本机变量' : 'config or local values present')}
        ${metricCard(state.lang === 'zh' ? '当前查看' : 'Selected', selected.name || selected.id, selected.enabled ? (state.lang === 'zh' ? '已启用' : 'Enabled') : (state.lang === 'zh' ? '已停用' : 'Disabled'), selected.enabled ? 'success' : 'warn')}
      </div>
      <div class="two-col">
        <div class="card">
          <h3>${state.lang === 'zh' ? '消息入口列表' : 'Channel Catalog'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '先从左侧选择一个消息入口，再在右侧查看或修改它的设置。' : 'Choose a message entry point on the left, then review or update its settings on the right.')}</div>
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
            }).join('') || emptyState(state.lang === 'zh' ? '暂时没有可管理的消息入口定义。' : 'No channel definitions are available yet.')}
          </div>
        </div>
        <div class="stack">
          <div class="card">
            <div class="row" style="justify-content:space-between; align-items:flex-start;">
              <div>
                <h3>${escapeHtml(selected.name || selected.id)}</h3>
                <p>${escapeHtml(selected.id)}</p>
                <div class="muted small" style="margin-top:8px;">${escapeHtml(isFeishuChannel
                  ? (state.lang === 'zh'
                    ? '飞书在开源版中作为官方消息入口维护，后续如有扩展插件能力，会通过通用插件加载机制接入。'
                    : 'Feishu is maintained as an official channel in the public release. Future plugin-based enhancements will arrive through a generic extension loader.')
                  : (state.lang === 'zh'
                    ? '内置消息入口，建议直接在渠道页维护。'
                    : 'Built-in channel entry, best maintained directly from Channels.'))}</div>
              </div>
              <div class="tag-list">
                <span class="pill ${selected.enabled ? 'success' : 'warn'}">${escapeHtml(selected.enabled ? (state.lang === 'zh' ? '正在接收' : 'Enabled') : (state.lang === 'zh' ? '已停用' : 'Disabled'))}</span>
                <span class="pill ${selected.configured ? 'success' : 'warn'}">${escapeHtml(selected.configured ? (state.lang === 'zh' ? '配置已完成' : 'Configured') : (state.lang === 'zh' ? '还未配置' : 'Not Configured'))}</span>
              </div>
            </div>
            <div class="status ${selected.enabled ? '' : 'warn'}" style="margin-bottom:14px;">
              ${escapeHtml(getChannelStatusMessage())}
            </div>
            <div class="form-grid" id="channel-config-form">
              ${editorFields || emptyState(state.lang === 'zh' ? '这个消息入口当前没有可编辑字段。' : 'There are no editable fields for this channel right now.')}
            </div>
            <div class="toolbar tight" style="margin-top:14px;">
              <button class="action-btn primary" type="button" data-channel-action="save">${escapeHtml(t('save'))}</button>
              <button class="action-btn" type="button" data-channel-action="reload">${escapeHtml(t('reload'))}</button>
              <button class="action-btn danger" type="button" data-channel-action="clear">${state.lang === 'zh' ? '清空配置' : 'Clear Config'}</button>
            </div>
          </div>
          <div class="card">
            <h3>${state.lang === 'zh' ? '当前配置摘要' : 'Current Configuration Summary'}</h3>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '先看普通字段和本机变量数量；只有在排查问题时，再展开原始配置。' : 'Start with the counts of regular fields and local values. Expand the raw configuration only when you need more detail.')}</div>
            <div class="grid">
              ${metricCard(state.lang === 'zh' ? '普通字段' : 'Config Fields', formatNumber(configKeys.length), configKeys.join(', ') || '-')}
              ${metricCard(state.lang === 'zh' ? 'Env 字段' : 'Env Fields', formatNumber(envKeys.length), envKeys.join(', ') || '-')}
              ${isFeishuChannel
                ? metricCard(state.lang === 'zh' ? '接入域名' : 'Domain', feishuDomain, feishuConnectionMode)
                : ''}
              ${isFeishuChannel
                ? metricCard(state.lang === 'zh' ? '群聊策略' : 'Group Policy', feishuGroupPolicy, feishuDmPolicy)
                : ''}
              ${isFeishuChannel
                ? metricCard(state.lang === 'zh' ? '回复方式' : 'Response Mode', feishuResponseMode, feishuRenderMode)
                : ''}
            </div>
            ${renderAdvancedDisclosure({
              title: state.lang === 'zh' ? '查看原始配置' : 'View Raw Configuration',
              description: state.lang === 'zh' ? '这里会显示当前消息入口的完整原始配置。' : 'This shows the complete raw configuration for the selected channel.',
              bodyHtml: `<pre>${prettyJson(selected.config || {})}</pre>`,
            })}
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
      const confirmed = await showConfirmDialog({
        title: state.lang === 'zh' ? '清空渠道配置' : 'Clear Channel Configuration',
        message: state.lang === 'zh'
          ? `确认清空 ${selected.name || selected.id} 的配置？`
          : `Clear ${selected.name || selected.id} configuration?`,
        confirmText: state.lang === 'zh' ? '确认清空' : 'Clear configuration',
        tone: 'danger',
      });
      if (!confirmed) return;
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
            model.isFallback ? `<span class="pill warn">${state.lang === 'zh' ? '备用' : 'backup'}</span>` : '',
              model.contextWindow ? `<span class="chip">ctx ${escapeHtml(formatNumber(model.contextWindow))}</span>` : '',
              model.maxTokens ? `<span class="chip">max ${escapeHtml(formatNumber(model.maxTokens))}</span>` : '',
            ].join('');
            const fallbackButton = model.isFallback
      ? `<button class="action-btn danger" type="button" data-ai-model-action="remove-fallback" data-model-id="${escapeHtml(model.fullId)}">${state.lang === 'zh' ? '移出备用顺序' : 'Remove From Backups'}</button>`
      : `<button class="action-btn" type="button" data-ai-model-action="add-fallback" data-model-id="${escapeHtml(model.fullId)}">${state.lang === 'zh' ? '加入备用顺序' : 'Add As Backup'}</button>`;
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
      : emptyState(state.lang === 'zh' ? '先在右侧配置至少一个 Provider，这里才会显示可用模型和快捷操作。' : 'Configure at least one provider on the right to unlock model choices and quick actions here.');

    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '主模型' : 'Primary Model', config.primaryModel || '-', `${configuredProviders.length} ${state.lang === 'zh' ? '个 Provider' : 'providers'}`)}
        ${metricCard(state.lang === 'zh' ? '备用模型' : 'Backup Models', formatNumber((config.fallbackModels || []).length), (config.fallbackModels || []).join(', ') || '-')}
        ${metricCard(state.lang === 'zh' ? '可选模型' : 'Available Models', formatNumber((config.availableModels || []).length), state.lang === 'zh' ? '这些模型都可以选作主模型或备用模型' : 'These models can be used as a primary model or a backup model')}
        ${metricCard(state.lang === 'zh' ? '已配置 Provider' : 'Configured Providers', formatNumber(configuredProviders.length), configuredProviders.map((item) => item.name).join(', ') || '-')}
      </div>
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '主模型与备用顺序' : 'Primary Model & Backup Order'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '先确定主模型，再安排备用顺序。主模型不可用时，系统会按这里的顺序继续尝试。' : 'Set your primary model first, then define the backup order. If the primary model is unavailable, Guard will try these models in sequence.')}</div>
          ${renderFormField({
            name: 'primaryModel',
            label: state.lang === 'zh' ? '主模型 ID' : 'Primary Model ID',
            value: config.primaryModel || '',
            placeholder: 'openai-codex/gpt-5.3-codex',
            help: state.lang === 'zh' ? '可直接填完整 model id，也可通过下方快捷按钮写入。' : 'Use a full model id or fill it from the quick actions below.',
          })}
          ${renderFormField({
            name: 'fallbackModels',
            label: state.lang === 'zh' ? '备用模型' : 'Backup Models',
            type: 'textarea',
            value: (config.fallbackModels || []).join('\n'),
            placeholder: 'provider/model-a\nprovider/model-b',
            help: state.lang === 'zh' ? '一行一个模型，顺序就是自动切换的顺序。' : 'One model per line, in the order Guard should switch to them.',
            fullWidth: true,
          })}
          <div class="toolbar tight" style="margin-top:14px;">
            <button class="action-btn primary" type="button" data-ai-action="save-routing">${state.lang === 'zh' ? '保存模型设置' : 'Save Model Settings'}</button>
            <button class="action-btn" type="button" data-ai-action="clear-fallbacks">${state.lang === 'zh' ? '清空备用模型' : 'Clear Backup Models'}</button>
          </div>
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '已配置的 Provider' : 'Configured Providers'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里可以快速确认每个 Provider 是否已接好、是否可用。' : 'Use this card to quickly confirm whether each provider is connected and ready to use.')}</div>
          <div class="list">${providerSummaryHtml}</div>
        </div>
      </div>
      <div class="two-col">
        <div class="card">
          <h3>${state.lang === 'zh' ? '创建或选择 Provider' : 'Choose Or Create A Provider'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '可以从预设开始，也可以载入已有 Provider 继续修改。' : 'Start from a preset, or load an existing provider and continue editing it.')}</div>
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

    setPanel(t('tabs.models'), t('desc.models'), body);

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
      const confirmed = await showConfirmDialog({
        title: state.lang === 'zh' ? '删除 Provider' : 'Delete Provider',
        message: state.lang === 'zh'
          ? `确认删除 Provider ${providerDraft.name}？`
          : `Delete provider ${providerDraft.name}?`,
        confirmText: state.lang === 'zh' ? '确认删除' : 'Delete provider',
        tone: 'danger',
      });
      if (!confirmed) return;
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

  function bindNotificationsView(items, totalPages, pageSizeOptions) {
    document.querySelectorAll('[data-notify-view]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextView = normalizeNotificationView(button.getAttribute('data-notify-view'));
        if (nextView === state.notificationView) return;
        state.notificationView = nextView;
        state.notificationPage = 1;
        state.notificationExpandedRawId = null;
        loadNotifications();
      });
    });
    document.getElementById('notify-search')?.addEventListener('input', (event) => {
      state.notificationSearchQuery = event.target.value;
      state.notificationPage = 1;
      loadNotifications();
    });
    document.getElementById('notify-source')?.addEventListener('change', (event) => {
      state.notificationSource = event.target.value || 'all';
      state.notificationPage = 1;
      loadNotifications();
    });
    document.getElementById('notify-page-size')?.addEventListener('change', (event) => {
      const nextSize = Number(event.target.value) || 20;
      state.notificationPageSize = pageSizeOptions.includes(nextSize) ? nextSize : 20;
      state.notificationPage = 1;
      state.notificationExpandedRawId = null;
      loadNotifications();
    });

    document.querySelectorAll('[data-notify-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.notificationFilter = button.getAttribute('data-notify-filter') || 'all';
        state.notificationPage = 1;
        loadNotifications();
      });
    });

    document.querySelectorAll('[data-notify-detail-mode]').forEach((button) => {
      button.addEventListener('click', () => {
        state.notificationDetailMode = button.getAttribute('data-notify-detail-mode') || 'summary';
        state.notificationPage = 1;
        state.notificationExpandedRawId = null;
        loadNotifications();
      });
    });

    document.querySelectorAll('[data-notify-page]').forEach((button) => {
      button.addEventListener('click', () => {
        state.notificationPage = Number(button.getAttribute('data-notify-page')) || 1;
        state.notificationExpandedRawId = null;
        loadNotifications();
      });
    });

    document.querySelectorAll('[data-notify-page-nav]').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.getAttribute('data-notify-page-nav');
        const nextPage = direction === 'prev' ? state.notificationPage - 1 : state.notificationPage + 1;
        state.notificationPage = Math.min(Math.max(nextPage, 1), totalPages);
        state.notificationExpandedRawId = null;
        loadNotifications();
      });
    });

    document.querySelectorAll('[data-notify-raw-item]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextId = button.getAttribute('data-notify-raw-item');
        if (!nextId || nextId === state.notificationExpandedRawId) return;
        state.notificationExpandedRawId = nextId;
        loadNotifications();
      });
    });

    document.querySelectorAll('[data-notify-bulk]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-notify-bulk');
        if (action === 'clear-all') {
          const confirmed = await showConfirmDialog({
            title: state.lang === 'zh' ? '清空通知' : 'Clear Notifications',
            message: state.lang === 'zh' ? '确认清空所有通知吗？这个操作不可撤销。' : 'Clear all notifications? This cannot be undone.',
            confirmText: state.lang === 'zh' ? '确认清空' : 'Clear all',
            tone: 'danger',
          });
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
        const gitView = button.getAttribute('data-notify-git-view');
        const advancedView = button.getAttribute('data-notify-git-advanced-view');
        if (tabId === 'git-sync') {
          state.gitSyncView = normalizeGitSyncView(gitView || (advancedView ? 'advanced' : 'recovery'));
          if (state.gitSyncView === 'advanced') {
            state.gitSyncAdvancedView = normalizeGitSyncAdvancedView(advancedView || 'overview');
          }
        }
        queuePanelFocus(tabId, selector);
        setActiveTab(tabId);
      });
    });
  }

  function renderNotificationsTimelineHtml(events) {
    if (!events.length) {
      return emptyState(state.lang === 'zh' ? '时间线里还没有新的记录。' : 'No timeline events are available yet.');
    }
    return `
      <div class="notify-day-stack">
        ${events.map((event) => `
          <div class="list-item timeline-entry ${getActivityTypeClass(event.type)}">
            <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
              <div>
                <strong>${escapeHtml(event.title || (state.lang === 'zh' ? '系统事件' : 'System Event'))}</strong>
                <div class="muted small">${escapeHtml(formatDate(event.createdAt))}</div>
              </div>
              <span class="pill ${getActivityTypeClass(event.type)}">${escapeHtml(getActivityTypeLabel(event.type))}</span>
            </div>
            <div style="margin-top:8px;">${escapeHtml(event.description || '-')}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  async function loadNotifications() {
    const viewTabId = 'notifications';
    const [summary, activityData] = await Promise.all([
      apiRequest('/api/notifications?limit=200'),
      apiRequest('/api/activity?limit=80').catch(() => ({ events: [] })),
    ]);
    if (state.activeTab !== viewTabId) return;
    clearTabRefreshHint(viewTabId);

    const view = normalizeNotificationView(state.notificationView);
    const items = summary.items || [];
    const events = activityData.events || [];
    const pageSizeOptions = [10, 20, 50];
    if (!pageSizeOptions.includes(state.notificationPageSize)) {
      state.notificationPageSize = 20;
    }
    const warningCount = items.filter((item) => item.severity === 'warning' || item.severity === 'error').length;
    const successCount = items.filter((item) => item.severity === 'success').length;
    const sources = Array.from(new Set(items.map((item) => item.source).filter(Boolean))).sort();
    const filtered = items.filter((item) => {
      const present = getNotificationPresentation(item);
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
        present.title,
        present.message,
        present.typeLabel,
        present.sourceLabel,
        present.severityLabel,
      ], state.notificationSearchQuery);
    });
    const totalFiltered = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / state.notificationPageSize));
    if (state.notificationPage > totalPages) state.notificationPage = totalPages;
    if (state.notificationPage < 1) state.notificationPage = 1;
    const pageStart = (state.notificationPage - 1) * state.notificationPageSize;
    const pagedItems = filtered.slice(pageStart, pageStart + state.notificationPageSize);
    const pageEnd = pageStart + pagedItems.length;
    const pageButtons = getNotificationPageButtons(state.notificationPage, totalPages);
    const expandedRawId = ensureNotificationRawExpansion(pagedItems);
    const pagedGroups = groupNotificationsByDay(pagedItems);
    const getNotificationJumpTarget = (item) => getGitSyncNotificationJumpTarget(item);

    const summarySectionHtml = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '提醒总数' : 'Total Reminders', formatNumber(summary.total || 0), state.lang === 'zh' ? '全部提醒记录' : 'all reminder records')}
        ${metricCard(state.lang === 'zh' ? '还未处理' : 'Needs Attention', formatNumber(summary.unread || 0), state.lang === 'zh' ? '建议优先处理' : 'review first', (summary.unread || 0) > 0 ? 'warn' : 'success')}
        ${metricCard(state.lang === 'zh' ? '时间线事件' : 'Timeline Events', formatNumber(events.length), state.lang === 'zh' ? '最近 80 条动态' : 'latest 80 events')}
        ${metricCard(state.lang === 'zh' ? '需要排查' : 'Warnings / Errors', formatNumber(warningCount), state.lang === 'zh' ? '提醒中的告警数量' : 'warning reminders', warningCount > 0 ? 'warn' : 'success')}
      </div>
      <div class="card">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <div>
            <h3>${escapeHtml(state.lang === 'zh' ? '提醒与时间线' : 'Reminders & Timeline')}</h3>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh'
              ? '提醒适合处理待办和告警，时间线适合快速回看系统最近发生了什么。'
              : 'Use reminders for actionable follow-up and the timeline to review what the system did recently.')}</div>
          </div>
          <div class="toolbar tight">
            <button class="chip ${view === 'reminders' ? 'active' : ''}" type="button" data-notify-view="reminders">${escapeHtml(t('notificationReminderView'))}</button>
            <button class="chip ${view === 'timeline' ? 'active' : ''}" type="button" data-notify-view="timeline">${escapeHtml(t('notificationTimelineView'))}</button>
          </div>
        </div>
        ${renderPageTip({
          title: state.lang === 'zh' ? '页面说明' : 'Page Note',
          body: state.lang === 'zh'
            ? '这里不再拆分“活动”页面。你可以在同一个地方处理提醒，也能回看时间线。'
            : 'The old Activity page is merged here so reminders and the recent timeline live together.',
        })}
        ${view === 'reminders' ? `
          <div class="toolbar tight" style="margin-top:14px;">
            <input id="notify-search" value="${escapeHtml(state.notificationSearchQuery || '')}" placeholder="${escapeHtml(state.lang === 'zh' ? '搜索标题 / 消息 / 来源' : 'Search title / message / source')}" />
            <select id="notify-source">
              <option value="all">${escapeHtml(state.lang === 'zh' ? '全部来源' : 'All sources')}</option>
              ${sources.map((source) => `<option value="${escapeHtml(source)}" ${state.notificationSource === source ? 'selected' : ''}>${escapeHtml(getNotificationSourceLabel(source))}</option>`).join('')}
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
          <div class="toolbar tight" style="margin-top:12px;">
            <span class="muted small">${escapeHtml(state.lang === 'zh' ? '详情模式' : 'Detail Mode')}</span>
            <button class="chip ${state.notificationDetailMode === 'summary' ? 'active' : ''}" type="button" data-notify-detail-mode="summary">${escapeHtml(state.lang === 'zh' ? '易读详情' : 'Readable Detail')}</button>
            <button class="chip ${state.notificationDetailMode === 'raw' ? 'active' : ''}" type="button" data-notify-detail-mode="raw">${escapeHtml(state.lang === 'zh' ? '原始数据' : 'Raw Payload')}</button>
          </div>
          <div class="toolbar tight" style="margin-top:12px; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
            <div class="muted small">
              ${escapeHtml(totalFiltered
                ? (state.lang === 'zh'
                  ? `当前仅渲染第 ${formatNumber(state.notificationPage)} / ${formatNumber(totalPages)} 页，显示 ${formatNumber(pageStart + 1)}-${formatNumber(pageEnd)} / ${formatNumber(totalFiltered)} 条提醒。`
                  : `Rendering page ${formatNumber(state.notificationPage)} of ${formatNumber(totalPages)} with ${formatNumber(pageStart + 1)}-${formatNumber(pageEnd)} of ${formatNumber(totalFiltered)} reminders.`)
                : (state.lang === 'zh' ? '当前没有符合筛选条件的提醒。' : 'No reminders match the current filters.'))}
            </div>
            <div class="row" style="gap:8px;">
              <span class="muted small">${escapeHtml(state.lang === 'zh' ? '每页显示' : 'Per page')}</span>
              <select id="notify-page-size">
                ${pageSizeOptions.map((size) => `<option value="${size}" ${size === state.notificationPageSize ? 'selected' : ''}>${escapeHtml(state.lang === 'zh' ? `${formatNumber(size)} 条` : `${formatNumber(size)}`)}</option>`).join('')}
              </select>
            </div>
          </div>
        ` : `
          <div class="grid" style="margin-top:14px;">
            ${metricCard(state.lang === 'zh' ? '最近成功' : 'Recent Successes', formatNumber(successCount), state.lang === 'zh' ? '提醒里的成功记录' : 'success reminders', successCount > 0 ? 'success' : '')}
            ${metricCard(state.lang === 'zh' ? '还未处理提醒' : 'Unread Reminders', formatNumber(summary.unread || 0), state.lang === 'zh' ? '切回提醒视图可处理' : 'handle them from the reminder view', (summary.unread || 0) > 0 ? 'warn' : 'success')}
          </div>
        `}
      </div>
    `;

    const reminderListHtml = pagedGroups.length ? `
      <div class="notify-day-stack">
        ${pagedGroups.map((group) => `
          <section class="notify-day-group">
            <div class="notify-day-header">
              <div class="notify-day-label">${escapeHtml(group.label)}</div>
              <div class="notify-day-meta">${escapeHtml(state.lang === 'zh' ? `${formatNumber(group.items.length)} 条提醒` : `${formatNumber(group.items.length)} reminders`)}</div>
            </div>
            <div class="notify-day-list">
              ${group.items.map((item) => {
                const present = getNotificationPresentation(item);
                const jumpTarget = getNotificationJumpTarget(item);
                const isRawExpanded = state.notificationDetailMode === 'raw' && expandedRawId === item.id;
                return `
                  <div class="list-item ${item.read ? '' : 'unread'}">
                    <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                      <div>
                        <strong>${escapeHtml(present.title)}</strong>
                        <div class="muted small">${escapeHtml(present.typeLabel)} · ${escapeHtml(present.sourceLabel)} · ${escapeHtml(formatDate(item.createdAt))}</div>
                      </div>
                      <span class="pill ${item.severity === 'success' ? 'success' : item.severity === 'warning' ? 'warn' : item.severity === 'error' ? 'danger' : ''}">${escapeHtml(present.severityLabel)}</span>
                    </div>
                    <p style="margin-top:10px;">${escapeHtml(present.message)}</p>
                    ${state.notificationDetailMode === 'raw'
                      ? (isRawExpanded ? renderNotificationRawDetail(item) : '')
                      : renderNotificationSummaryDetail(item, present)}
                    <div class="toolbar tight" style="margin-top:12px;">
                      <button class="action-btn" type="button" data-notify-item="${escapeHtml(item.id)}" data-next-read="${item.read ? 'false' : 'true'}">${escapeHtml(item.read ? t('markUnread') : t('markRead'))}</button>
                      ${state.notificationDetailMode === 'raw'
                        ? `<button class="action-btn ${isRawExpanded ? 'primary' : ''}" type="button" data-notify-raw-item="${escapeHtml(item.id)}" ${isRawExpanded ? 'disabled' : ''}>${escapeHtml(isRawExpanded ? (state.lang === 'zh' ? '当前原始详情' : 'Current Raw Detail') : (state.lang === 'zh' ? '查看原始详情' : 'View Raw Detail'))}</button>`
                        : ''}
                      <button class="action-btn" type="button" data-notify-copy="${escapeHtml(item.id)}">${escapeHtml(state.lang === 'zh' ? '复制详情' : 'Copy Details')}</button>
                      ${jumpTarget ? `<button class="action-btn primary" type="button" data-notify-open-tab="${escapeHtml(jumpTarget.tabId)}" data-notify-focus="${escapeHtml(jumpTarget.selector)}" ${jumpTarget.gitView ? `data-notify-git-view="${escapeHtml(jumpTarget.gitView)}"` : ''} ${jumpTarget.advancedView ? `data-notify-git-advanced-view="${escapeHtml(jumpTarget.advancedView)}"` : ''}>${escapeHtml(jumpTarget.label)}</button>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>
        `).join('')}
        ${totalPages > 1 ? `
          <div class="notify-page-shell">
            <div class="notify-page-strip">
              <button class="action-btn notify-page-nav" type="button" data-notify-page-nav="prev" ${state.notificationPage <= 1 ? 'disabled' : ''}>${escapeHtml(state.lang === 'zh' ? '上一页' : 'Previous')}</button>
              <div class="notify-page-folders" role="tablist" aria-label="${escapeHtml(state.lang === 'zh' ? '提醒分页' : 'Reminder pages')}">
                ${pageButtons.map((page) => page === 'ellipsis'
                  ? `<span class="notify-page-gap" aria-hidden="true">...</span>`
                  : `<button class="notify-page-folder ${page === state.notificationPage ? 'active' : ''}" type="button" role="tab" aria-selected="${page === state.notificationPage ? 'true' : 'false'}" data-notify-page="${page}"><span class="notify-page-folder-tab"></span><span class="notify-page-folder-label">${escapeHtml(state.lang === 'zh' ? `第 ${formatNumber(page)} 页` : `Page ${formatNumber(page)}`)}</span></button>`).join('')}
              </div>
              <button class="action-btn notify-page-nav" type="button" data-notify-page-nav="next" ${state.notificationPage >= totalPages ? 'disabled' : ''}>${escapeHtml(state.lang === 'zh' ? '下一页' : 'Next')}</button>
            </div>
          </div>
        ` : ''}
      </div>
    ` : emptyState(state.lang === 'zh' ? '没有符合筛选条件的提醒。' : 'No reminders match the current filters.');

    const contentSectionTitle = view === 'timeline'
      ? (state.lang === 'zh' ? '最近时间线' : 'Recent Timeline')
      : (state.lang === 'zh' ? '提醒列表' : 'Reminder List');
    const contentSectionHtml = view === 'timeline'
      ? renderNotificationsTimelineHtml(events)
      : reminderListHtml;

    setPanelSections(t('tabs.notifications'), t('desc.notifications'), [
      { id: 'notifications-summary', title: state.lang === 'zh' ? '提醒中心' : 'Notification Center', html: summarySectionHtml },
      { id: 'notifications-content', title: contentSectionTitle, html: loadingCard(contentSectionTitle, state.lang === 'zh' ? '正在渲染当前视图…' : 'Rendering the current view…') },
    ]);

    requestAnimationFrame(() => {
      if (state.activeTab !== viewTabId) return;
      updatePanelSection('notifications-content', contentSectionHtml);
      bindNotificationsView(items, totalPages, pageSizeOptions);
      rememberCurrentPanelRender(viewTabId, () => bindNotificationsView(items, totalPages, pageSizeOptions));
    });
  }

  async function loadNotificationsLegacy() {
    const viewTabId = 'notifications';
    const summary = await apiRequest('/api/notifications?limit=200');
    if (state.activeTab !== viewTabId) return;
    clearTabRefreshHint(viewTabId);
    const items = summary.items || [];
    const pageSizeOptions = [10, 20, 50];
    if (!pageSizeOptions.includes(state.notificationPageSize)) {
      state.notificationPageSize = 20;
    }
    const warningCount = items.filter((item) => item.severity === 'warning' || item.severity === 'error').length;
    const successCount = items.filter((item) => item.severity === 'success').length;
    const sources = Array.from(new Set(items.map((item) => item.source).filter(Boolean))).sort();
    const filtered = items.filter((item) => {
      const present = getNotificationPresentation(item);
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
        present.title,
        present.message,
        present.typeLabel,
        present.sourceLabel,
        present.severityLabel,
      ], state.notificationSearchQuery);
    });
    const totalFiltered = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / state.notificationPageSize));
    if (state.notificationPage > totalPages) state.notificationPage = totalPages;
    if (state.notificationPage < 1) state.notificationPage = 1;
    const pageStart = (state.notificationPage - 1) * state.notificationPageSize;
    const pagedItems = filtered.slice(pageStart, pageStart + state.notificationPageSize);
    const pageEnd = pageStart + pagedItems.length;
    const pageButtons = getNotificationPageButtons(state.notificationPage, totalPages);
    const expandedRawId = ensureNotificationRawExpansion(pagedItems);
    const pagedGroups = groupNotificationsByDay(pagedItems);
    const getNotificationJumpTarget = (item) => getGitSyncNotificationJumpTarget(item);
    const summarySectionHtml = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '提醒总数' : 'Total Reminders', formatNumber(summary.total || 0), state.lang === 'zh' ? '全部记录' : 'all records')}
        ${metricCard(state.lang === 'zh' ? '还未处理' : 'Needs Attention', formatNumber(summary.unread || 0), state.lang === 'zh' ? '建议优先查看' : 'recommended to review first', (summary.unread || 0) > 0 ? 'warn' : 'success')}
        ${metricCard(state.lang === 'zh' ? '需要排查' : 'Warnings / Errors', formatNumber(warningCount), state.lang === 'zh' ? '建议尽快处理' : 'recommended to investigate', warningCount > 0 ? 'warn' : 'success')}
        ${metricCard(state.lang === 'zh' ? '最近成功' : 'Recent Successes', formatNumber(successCount), state.lang === 'zh' ? '近期已完成' : 'recent completions', successCount > 0 ? 'success' : '')}
      </div>
      <div class="card">
        <div class="muted small" style="margin-bottom:12px;">${escapeHtml(state.lang === 'zh' ? '你可以按来源、状态和关键词筛选提醒，再决定是否标记已读、清理或跳转到对应页面处理。' : 'Filter reminders by source, status, or keyword, then decide whether to mark them read, clear them, or jump to the relevant page.')}</div>
        <div class="toolbar tight">
          <input id="notify-search" value="${escapeHtml(state.notificationSearchQuery || '')}" placeholder="${escapeHtml(state.lang === 'zh' ? '搜索标题 / 消息 / 来源' : 'Search title / message / source')}" />
          <select id="notify-source">
            <option value="all">${escapeHtml(state.lang === 'zh' ? '全部来源' : 'All sources')}</option>
            ${sources.map((source) => `<option value="${escapeHtml(source)}" ${state.notificationSource === source ? 'selected' : ''}>${escapeHtml(getNotificationSourceLabel(source))}</option>`).join('')}
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
        <div class="toolbar tight" style="margin-top:12px;">
          <span class="muted small">${escapeHtml(state.lang === 'zh' ? '详情模式' : 'Detail Mode')}</span>
          <button class="chip ${state.notificationDetailMode === 'summary' ? 'active' : ''}" type="button" data-notify-detail-mode="summary">${escapeHtml(state.lang === 'zh' ? '易读详情' : 'Readable Detail')}</button>
          <button class="chip ${state.notificationDetailMode === 'raw' ? 'active' : ''}" type="button" data-notify-detail-mode="raw">${escapeHtml(state.lang === 'zh' ? '原始数据' : 'Raw Payload')}</button>
        </div>
        <div class="toolbar tight" style="margin-top:12px; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
          <div class="muted small">
            ${escapeHtml(totalFiltered
              ? (state.lang === 'zh'
                ? `当前仅渲染第 ${formatNumber(state.notificationPage)} / ${formatNumber(totalPages)} 页，显示 ${formatNumber(pageStart + 1)}-${formatNumber(pageEnd)} / ${formatNumber(totalFiltered)} 条通知。`
                : `Rendering page ${formatNumber(state.notificationPage)} of ${formatNumber(totalPages)} with ${formatNumber(pageStart + 1)}-${formatNumber(pageEnd)} of ${formatNumber(totalFiltered)} notifications.`)
              : (state.lang === 'zh' ? '当前没有符合筛选条件的通知。' : 'No notifications match the current filters.'))}
          </div>
          <div class="row" style="gap:8px;">
            <span class="muted small">${escapeHtml(state.lang === 'zh' ? '每页显示' : 'Per page')}</span>
            <select id="notify-page-size">
              ${pageSizeOptions.map((size) => `<option value="${size}" ${size === state.notificationPageSize ? 'selected' : ''}>${escapeHtml(state.lang === 'zh' ? `${formatNumber(size)} 条` : `${formatNumber(size)}`)}</option>`).join('')}
            </select>
          </div>
        </div>
        ${state.notificationDetailMode === 'raw' ? `
          <div class="sub-card" style="margin-top:12px;">
            <div class="muted small">${escapeHtml(state.lang === 'zh'
              ? '为降低页面负担，原始详情改为按需展开，当前页只渲染 1 条通知的原始负载。点击卡片里的“查看原始详情”可切换。'
              : 'To keep the page light, raw payloads are rendered on demand and only one notification on the current page expands at a time. Use "View Raw Detail" inside a card to switch.')}</div>
          </div>
        ` : ''}
        ${totalPages > 1 ? `
          <div class="notify-page-shell" style="margin-top:12px;">
            <div class="notify-page-strip">
              <button class="action-btn notify-page-nav" type="button" data-notify-page-nav="prev" ${state.notificationPage <= 1 ? 'disabled' : ''}>${escapeHtml(state.lang === 'zh' ? '上一页' : 'Previous')}</button>
              <div class="notify-page-folders" role="tablist" aria-label="${escapeHtml(state.lang === 'zh' ? '通知分页' : 'Notification pages')}">
                ${pageButtons.map((page) => page === 'ellipsis'
                  ? `<span class="notify-page-gap" aria-hidden="true">...</span>`
                  : `<button class="notify-page-folder ${page === state.notificationPage ? 'active' : ''}" type="button" role="tab" aria-selected="${page === state.notificationPage ? 'true' : 'false'}" data-notify-page="${page}"><span class="notify-page-folder-tab"></span><span class="notify-page-folder-label">${escapeHtml(state.lang === 'zh' ? `第 ${formatNumber(page)} 页` : `Page ${formatNumber(page)}`)}</span></button>`).join('')}
              </div>
              <button class="action-btn notify-page-nav" type="button" data-notify-page-nav="next" ${state.notificationPage >= totalPages ? 'disabled' : ''}>${escapeHtml(state.lang === 'zh' ? '下一页' : 'Next')}</button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
    const listSectionHtml = pagedGroups.length ? `
      <div class="notify-day-stack">
        ${pagedGroups.map((group) => `
          <section class="notify-day-group">
            <div class="notify-day-header">
              <div class="notify-day-label">${escapeHtml(group.label)}</div>
              <div class="notify-day-meta">${escapeHtml(state.lang === 'zh' ? `${formatNumber(group.items.length)} 条通知` : `${formatNumber(group.items.length)} notifications`)}</div>
            </div>
            <div class="notify-day-list">
              ${group.items.map((item) => {
                const present = getNotificationPresentation(item);
                const jumpTarget = getNotificationJumpTarget(item);
                const isRawExpanded = state.notificationDetailMode === 'raw' && expandedRawId === item.id;
                return `
                  <div class="list-item ${item.read ? '' : 'unread'}">
                    <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                      <div>
                        <strong>${escapeHtml(present.title)}</strong>
                        <div class="muted small">${escapeHtml(present.typeLabel)} · ${escapeHtml(present.sourceLabel)} · ${escapeHtml(formatDate(item.createdAt))}</div>
                      </div>
                      <span class="pill ${item.severity === 'success' ? 'success' : item.severity === 'warning' ? 'warn' : item.severity === 'error' ? 'danger' : ''}">${escapeHtml(present.severityLabel)}</span>
                    </div>
                    <p style="margin-top:10px;">${escapeHtml(present.message)}</p>
                    ${state.notificationDetailMode === 'raw'
                      ? (isRawExpanded ? renderNotificationRawDetail(item) : '')
                      : renderNotificationSummaryDetail(item, present)}
                    <div class="toolbar tight" style="margin-top:12px;">
                      <button class="action-btn" type="button" data-notify-item="${escapeHtml(item.id)}" data-next-read="${item.read ? 'false' : 'true'}">${escapeHtml(item.read ? t('markUnread') : t('markRead'))}</button>
                      ${state.notificationDetailMode === 'raw'
                        ? `<button class="action-btn ${isRawExpanded ? 'primary' : ''}" type="button" data-notify-raw-item="${escapeHtml(item.id)}" ${isRawExpanded ? 'disabled' : ''}>${escapeHtml(isRawExpanded ? (state.lang === 'zh' ? '当前原始详情' : 'Current Raw Detail') : (state.lang === 'zh' ? '查看原始详情' : 'View Raw Detail'))}</button>`
                        : ''}
                      <button class="action-btn" type="button" data-notify-copy="${escapeHtml(item.id)}">${escapeHtml(state.lang === 'zh' ? '复制详情' : 'Copy Details')}</button>
                      ${jumpTarget ? `<button class="action-btn primary" type="button" data-notify-open-tab="${escapeHtml(jumpTarget.tabId)}" data-notify-focus="${escapeHtml(jumpTarget.selector)}" ${jumpTarget.gitView ? `data-notify-git-view="${escapeHtml(jumpTarget.gitView)}"` : ''} ${jumpTarget.advancedView ? `data-notify-git-advanced-view="${escapeHtml(jumpTarget.advancedView)}"` : ''}>${escapeHtml(jumpTarget.label)}</button>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>
        `).join('')}
      </div>
    ` : emptyState(state.lang === 'zh' ? '没有符合筛选条件的通知。' : 'No notifications match the current filters.');
    setPanelSections(t('tabs.notifications'), t('desc.notifications'), [
      { id: 'notifications-summary', title: state.lang === 'zh' ? '提醒概览' : 'Reminder Overview', html: summarySectionHtml },
      { id: 'notifications-list', title: state.lang === 'zh' ? '提醒列表' : 'Reminder List', html: loadingCard(state.lang === 'zh' ? '提醒列表' : 'Reminder List', state.lang === 'zh' ? '正在分批渲染提醒卡片…' : 'Rendering reminder cards in batches…') },
    ]);
    requestAnimationFrame(() => {
      if (state.activeTab !== viewTabId) return;
      updatePanelSection('notifications-list', listSectionHtml);
      bindNotificationsView(items, totalPages, pageSizeOptions);
      rememberCurrentPanelRender(viewTabId, () => bindNotificationsView(items, totalPages, pageSizeOptions));
    });
  }

  async function loadAgents() {
    const viewTabId = 'agents';
    const data = await apiRequest('/api/agents');
    if (state.activeTab !== viewTabId) return;
    clearTabRefreshHint(viewTabId);
    const agents = data.agents || [];
    const docReadyCount = agents.filter((agent) => agent.docStatus?.soul && agent.docStatus?.user && agent.docStatus?.agents && agent.docStatus?.memory).length;
    const defaultCount = agents.filter((agent) => agent.isDefault).length;
    const summaryHtml = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '团队角色数' : 'Team Roles', formatNumber(agents.length), state.lang === 'zh' ? '当前已接入' : 'currently connected')}
        ${metricCard(state.lang === 'zh' ? '默认角色' : 'Default Role', formatNumber(defaultCount), defaultCount > 0 ? (state.lang === 'zh' ? '已设置默认值' : 'default role configured') : (state.lang === 'zh' ? '还没有设置默认角色' : 'no default role set'), defaultCount > 0 ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '关键文档齐全' : 'Core Docs Ready', formatNumber(docReadyCount), state.lang === 'zh' ? 'SOUL / USER / AGENTS / MEMORY' : 'SOUL / USER / AGENTS / MEMORY', docReadyCount > 0 ? 'success' : 'warn')}
      </div>
    `;
    const listHtml = agents.length
      ? `<div class="grid">${agents.map((agent) => `<div class="card"><div class="row" style="justify-content:space-between"><h3>${escapeHtml(agent.name)}</h3><span class="pill ${agent.isDefault ? 'success' : ''}">${agent.isDefault ? (state.lang === 'zh' ? '默认' : 'Default') : agent.id}</span></div><div class="muted">${escapeHtml(agent.resolvedWorkspace || agent.workspace || '-')}</div><div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '用下方标签快速确认关键文档是否齐全。' : 'Use the tags below to quickly confirm whether the key docs are present.')}</div><div class="tag-list" style="margin-top:12px;"><span class="chip ${agent.docStatus?.soul ? 'active' : ''}">SOUL</span><span class="chip ${agent.docStatus?.user ? 'active' : ''}">USER</span><span class="chip ${agent.docStatus?.agents ? 'active' : ''}">AGENTS</span><span class="chip ${agent.docStatus?.memory ? 'active' : ''}">MEMORY</span></div>${renderAdvancedDisclosure({ title: state.lang === 'zh' ? '查看诊断信息' : 'View Diagnostics', description: state.lang === 'zh' ? '这里保留这个角色的原始配置和状态信息，平时可以不用展开。' : 'This keeps the raw config and status for this role. You usually do not need to expand it.', bodyHtml: `<pre>${prettyJson(agent)}</pre>` })}</div>`).join('')}</div>`
      : emptyState(state.lang === 'zh' ? '还没有发现可用的 Agent。请先检查配置文件或安装步骤。' : 'No agents are available yet. Check the configuration or installation first.');
    setPanelSections(t('tabs.agents'), t('desc.agents'), [
      { id: 'agents-summary', title: state.lang === 'zh' ? '团队概览' : 'Team Overview', html: summaryHtml },
      { id: 'agents-list', title: state.lang === 'zh' ? '团队成员' : 'Team Members', html: loadingCard(state.lang === 'zh' ? '团队成员' : 'Team Members', state.lang === 'zh' ? '正在填充角色卡片…' : 'Rendering agent cards…') },
    ]);
    requestAnimationFrame(() => {
      if (state.activeTab !== viewTabId) return;
      updatePanelSection('agents-list', listHtml);
      rememberCurrentPanelRender(viewTabId);
    });
  }

  async function loadSessions() {
    const viewTabId = 'sessions';
    const data = await apiRequest('/api/sessions');
    if (state.activeTab !== viewTabId) return;
    clearTabRefreshHint(viewTabId);
    const snapshot = data.snapshot || {};
    const sessions = snapshot.sessions || [];
    const summary = snapshot.summary || {};
    const sessionsMeta = snapshot.sessionsMeta || {};
    const byAgent = sessionsMeta.byAgent || [];
    const runtimeMemory = snapshot.memory || {};
    const gatewayService = snapshot.gatewayService || {};
    const nodeService = snapshot.nodeService || {};
    const runtimeOs = snapshot.os || {};
    const runtimeUpdate = snapshot.update || {};
    const localizedGatewayService = getLocalizedServiceSummary(gatewayService);
    const localizedNodeService = getLocalizedServiceSummary(nodeService);
    const usageEstimateAvailable = Number.isFinite(Number(data.costSummary?.totalEstimatedCost))
      && ((data.costSummary?.pricingUnit ? true : false) || Number(data.costSummary?.totalEstimatedCost) > 0);
    const usageEstimateValue = usageEstimateAvailable
      ? formatCost(Number(data.costSummary?.totalEstimatedCost || 0))
      : (state.lang === 'zh' ? '无法估算' : 'Unavailable');
    const usageEstimateDetail = usageEstimateAvailable
      ? (state.lang === 'zh' ? '仅供本地观察，不代表账单数据' : 'For local observation only, not billing data')
      : (state.lang === 'zh' ? '缺少可靠单价或数据，当前不显示金额' : 'Pricing or usage data is incomplete, so no amount is shown');
    const summarySectionHtml = `
      ${renderCacheSummaryCard(data.cache, state.lang === 'zh' ? '会话共享快照' : 'Session Shared Snapshot')}
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '会话总数' : 'Sessions', formatNumber(summary.sessionCount ?? sessions.length), summary.defaultModel || '-')}
        ${metricCard(state.lang === 'zh' ? '默认上下文窗口' : 'Default Context Window', summary.defaultContextTokens ? formatNumber(summary.defaultContextTokens) : '-', state.lang === 'zh' ? 'tokens' : 'tokens')}
        ${metricCard(state.lang === 'zh' ? '累计 Tokens' : 'Total Tokens', formatNumber(data.costSummary?.totalTokens || 0), '')}
        ${metricCard(state.lang === 'zh' ? '用量估算' : 'Usage Estimate', usageEstimateValue, usageEstimateDetail, usageEstimateAvailable ? '' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '会话索引路径' : 'Session Paths', formatNumber((sessionsMeta.paths || []).length), state.lang === 'zh' ? '已发现路径' : 'discovered paths')}
        ${metricCard(state.lang === 'zh' ? '待处理系统消息' : 'Queued Events', formatNumber(summary.queuedSystemEvents || 0), state.lang === 'zh' ? '等待处理' : 'awaiting processing')}
      </div>
      ${renderPageTip({
        title: state.lang === 'zh' ? '用量说明' : 'Usage Note',
        body: usageEstimateAvailable
          ? (state.lang === 'zh'
            ? '这里的金额只是基于本地单价配置和 token 使用量的估算值，不应视为官方账单。'
            : 'The amount shown here is only an estimate based on local pricing and token usage. It is not an official bill.')
          : (state.lang === 'zh'
            ? '当前只保留 Token 和会话使用情况。若后续补齐模型单价配置，这里才会显示估算金额。'
            : 'For now, only session and token usage is available. An estimate appears here only after pricing data is configured.'),
      })}
      ${snapshot.warnings?.length ? `<div class="status warn" style="margin-top:14px; white-space:pre-wrap;">${escapeHtml(snapshot.warnings.join('\n'))}</div>` : ''}
    `;
    const runtimeSectionHtml = `
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '运行环境' : 'Runtime Context'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里展示当前会话依赖的系统、记忆检索和服务环境，便于判断异常是否来自运行环境。' : 'This card shows the system, memory search, and service environment behind the current sessions so you can tell whether an issue comes from the runtime context.')}</div>
          ${keyValueGrid([
            {
              label: state.lang === 'zh' ? '系统' : 'OS',
              value: runtimeOs.label || '-',
              help: [runtimeOs.platform, runtimeOs.arch, runtimeOs.release].filter(Boolean).join(' / '),
            },
            {
              label: state.lang === 'zh' ? '记忆检索' : 'Memory Search',
              value: joinDisplayParts([
                getMemoryBackendLabel(runtimeMemory.provider || runtimeMemory.backend),
                getMemorySearchModeLabel(runtimeMemory.searchMode),
              ]),
              help: runtimeMemory.dbPath || runtimeMemory.workspaceDir || '-',
            },
            {
              label: state.lang === 'zh' ? 'Gateway 自身信息' : 'Gateway Self',
              value: snapshot.gateway?.self?.version || '-',
              help: [snapshot.gateway?.self?.host, snapshot.gateway?.self?.platform].filter(Boolean).join(' / '),
            },
            {
              label: state.lang === 'zh' ? 'Gateway 服务' : 'Gateway Service',
              value: localizedGatewayService.label,
              help: joinDisplayParts([localizedGatewayService.loadedText, localizedGatewayService.runtimeShort]),
            },
            {
              label: state.lang === 'zh' ? 'Node 服务' : 'Node Service',
              value: localizedNodeService.label,
              help: joinDisplayParts([localizedNodeService.loadedText, localizedNodeService.runtimeShort]),
            },
            {
              label: state.lang === 'zh' ? '更新通道' : 'Update Channel',
              value: joinDisplayParts([getUpdateChannelLabel(runtimeUpdate.channel), runtimeUpdate.latestVersion || '-']),
              help: joinDisplayParts([
                runtimeUpdate.packageManager,
                getInstallKindLabel(runtimeUpdate.installKind),
                getUpdateDepsStatusLabel(runtimeUpdate.depsStatus),
              ]),
            },
          ])}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '按 Agent 查看会话' : 'Sessions By Agent'}</h3>
          ${byAgent.length ? `<div class="list">${byAgent.map((item) => {
            const lastSession = (item.recent || [])[0] || null;
            return `<div class="list-item">
              <div class="row" style="justify-content:space-between">
                <strong>${escapeHtml(item.agentId)}</strong>
                <span class="pill ${item.count > 0 ? 'success' : ''}">${formatNumber(item.count)} ${state.lang === 'zh' ? '个会话' : 'sessions'}</span>
              </div>
              <div class="muted small">${escapeHtml(item.path || '-')}</div>
              ${lastSession ? `<div class="muted small" style="margin-top:8px;">${escapeHtml(lastSession.modelId || '-')} · ${escapeHtml(formatDate(lastSession.updatedAt || lastSession.startedAt))}</div>` : `<div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '暂时没有最近会话' : 'No recent sessions yet')}</div>`}
            </div>`;
          }).join('')}</div>` : emptyState(state.lang === 'zh' ? '暂时还没有可按 Agent 聚合的会话数据。' : 'No session-by-agent data is available yet.')}
        </div>
      </div>
    `;
    const listSectionHtml = `<div class="list">${sessions.length ? sessions.map((session) => `<div class="list-item">
        <div class="row" style="justify-content:space-between">
          <div>
            <strong>${escapeHtml(session.id)}</strong>
            <div class="muted small">${escapeHtml(session.agentId)} · ${escapeHtml(session.modelId)}</div>
          </div>
          <span class="pill ${getSessionStatusClass(session.status)}">${escapeHtml(getSessionStatusLabel(session.status))}</span>
        </div>
        <div class="row">
          <span class="chip">${state.lang === 'zh' ? '输入' : 'Input'} ${formatNumber(session.usage?.inputTokens || 0)}</span>
          <span class="chip">${state.lang === 'zh' ? '输出' : 'Output'} ${formatNumber(session.usage?.outputTokens || 0)}</span>
          <span class="chip">${state.lang === 'zh' ? '缓存' : 'Cache'} ${formatNumber((session.usage?.cacheReadTokens || 0) + (session.usage?.cacheWriteTokens || 0))}</span>
          <span class="chip active">${formatNumber(session.usage?.totalTokens || 0)}</span>
          ${session.contextTokens ? `<span class="chip">${state.lang === 'zh' ? '上下文' : 'Context'} ${formatNumber(session.contextTokens)}</span>` : ''}
          ${session.remainingTokens ? `<span class="chip">${state.lang === 'zh' ? '剩余' : 'Remaining'} ${formatNumber(session.remainingTokens)}</span>` : ''}
          ${session.percentUsed ? `<span class="chip">${state.lang === 'zh' ? '使用率' : 'Used'} ${formatNumber(session.percentUsed)}%</span>` : ''}
        </div>
        <div class="muted small">${escapeHtml(formatDate(session.updatedAt || session.startedAt))}</div>
      </div>`).join('') : emptyState(state.lang === 'zh' ? '当前还没有可展示的会话。' : 'No sessions are available to show right now.')}</div>`;
    setPanelSections(t('tabs.sessions'), t('desc.sessions'), [
      { id: 'sessions-summary', title: state.lang === 'zh' ? '会话概览' : 'Session Overview', html: summarySectionHtml },
      { id: 'sessions-runtime', title: state.lang === 'zh' ? '运行环境' : 'Runtime Context', html: runtimeSectionHtml },
      { id: 'sessions-list', title: state.lang === 'zh' ? '会话明细' : 'Session List', html: loadingCard(state.lang === 'zh' ? '会话明细' : 'Session List', state.lang === 'zh' ? '正在填充会话卡片…' : 'Rendering session cards…') },
    ]);
    requestAnimationFrame(() => {
      if (state.activeTab !== viewTabId) return;
      updatePanelSection('sessions-list', `<div class="card"><h3>${escapeHtml(state.lang === 'zh' ? '会话明细' : 'Session Details')}</h3><div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里展示每个会话当前使用的模型、状态和 Token 消耗；若顶部显示了用量估算，也只作为本地观察参考。' : 'This section shows each session model, status, and token usage. If a usage estimate appears above, treat it as local guidance only.')}</div><div style="margin-top:14px;">${listSectionHtml}</div></div>`);
      rememberCurrentPanelRender(viewTabId);
    });
    if (data.cache?.refreshing) scheduleRuntimeViewPoll();
    else clearRuntimeViewPollTimer();
  }

  async function loadActivity() {
    const data = await apiRequest('/api/activity?limit=80');
    const events = data.events || [];
    const body = `<div class="card"><h3>${escapeHtml(state.lang === 'zh' ? '最近发生了什么' : 'What Happened Recently')}</h3><div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里按时间顺序记录最近的运行变化、同步结果和告警。' : 'This timeline records recent runtime changes, sync results, and alerts in chronological order.')}</div><div style="margin-top:14px;">${events.length ? `<div class="list">${events.map((event) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(event.title)}</strong><span class="pill ${getActivityTypeClass(event.type)}">${escapeHtml(getActivityTypeLabel(event.type))}</span></div><div>${escapeHtml(event.description)}</div><div class="muted small">${escapeHtml(formatDate(event.createdAt))}</div></div>`).join('')}</div>` : emptyState(state.lang === 'zh' ? '暂时还没有新的活动记录。' : 'No activity has been recorded yet.')}</div></div>`;
    setPanel(t('tabs.activity'), t('desc.activity'), body);
  }
  async function openManagedFile(targetPath, mode) {
    const data = await apiRequest(`/api/files/content?path=${encodeURIComponent(targetPath)}`);
    if (mode === 'memory') {
      state.memoryFile = data;
      state.memoryOriginal = normalizeEditorText(data.content || '');
    } else {
      state.currentFile = data;
      state.fileOriginal = normalizeEditorText(data.content || '');
    }
  }

  function hasDirtyEditor(mode) {
    const element = document.getElementById(mode === 'memory' ? 'memory-editor' : 'file-editor');
    const original = mode === 'memory' ? state.memoryOriginal : state.fileOriginal;
    return !!element && normalizeEditorText(element.value) !== original;
  }

  async function confirmEditorSwitch(mode) {
    if (!hasDirtyEditor(mode)) return true;
    const isMemory = mode === 'memory';
    return showConfirmDialog({
      title: isMemory
        ? (state.lang === 'zh' ? '切换记忆文件' : 'Switch Memory File')
        : (state.lang === 'zh' ? '切换文件' : 'Switch File'),
      message: isMemory
        ? (state.lang === 'zh' ? '当前记忆编辑器有未保存修改，确认切换？' : 'Unsaved memory changes detected. Continue?')
        : (state.lang === 'zh' ? '当前编辑器有未保存修改，确认切换？' : 'Unsaved changes detected. Continue?'),
      description: state.lang === 'zh'
        ? '如果继续切换，当前未保存内容将被放弃。'
        : 'Continuing will discard the unsaved content in the current editor.',
      confirmText: state.lang === 'zh' ? '继续切换' : 'Discard and continue',
      tone: 'warn',
    });
  }

  function syncFileEditorDraftState() {
    const editor = document.getElementById('file-editor');
    if (!editor || !state.currentFile) return;
    state.currentFile = {
      ...state.currentFile,
      content: editor.value,
    };
  }

  function syncMemoryEditorDraftState() {
    const editor = document.getElementById('memory-editor');
    if (!editor || !state.memoryFile) return;
    state.memoryFile = {
      ...state.memoryFile,
      content: editor.value,
    };
  }

  function renderFileEntryLabel(entry) {
    if (!entry?.isDirectory) return entry?.name || '';
    return `${state.lang === 'zh' ? '[目录]' : '[DIR]'} ${entry.name}`;
  }

  function renderFilesSummaryHtml(data) {
    const entries = data.entries || [];
    const dirCount = entries.filter((entry) => entry.isDirectory).length;
    const fileCount = entries.length - dirCount;
    const selectedRoot = (data.roots || []).find((root) => state.filesPath && state.filesPath.startsWith(root.path));
    return `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '可浏览根目录' : 'Managed Roots', formatNumber((data.roots || []).length), selectedRoot?.label || (state.lang === 'zh' ? '当前在受控范围内浏览' : 'browsing within the managed scope'))}
        ${metricCard(state.lang === 'zh' ? '当前目录内容' : 'Current Entries', formatNumber(entries.length), state.lang === 'zh' ? `${formatNumber(dirCount)} 个目录 / ${formatNumber(fileCount)} 个文件` : `${formatNumber(dirCount)} dirs / ${formatNumber(fileCount)} files`)}
        ${metricCard(state.lang === 'zh' ? '当前打开文件' : 'Open File', state.currentFile ? '1' : '0', state.currentFile ? (state.currentFile.relativePath || state.currentFile.path) : (state.lang === 'zh' ? '还没有打开文件' : 'no file opened yet'), state.currentFile ? 'success' : 'warn')}
      </div>
      <div class="card">
        <h3>${escapeHtml(state.lang === 'zh' ? '当前路径' : 'Current Path')}</h3>
        <div class="muted" style="margin-top:8px;">${escapeHtml(data.currentPath || state.filesPath || '-')}</div>
        <div class="muted small" style="margin-top:10px;">${escapeHtml(data.parentPath ? (state.lang === 'zh' ? '支持返回上级目录并在当前受控范围内继续浏览。' : 'You can move to the parent folder and continue browsing within the managed scope.') : (state.lang === 'zh' ? '当前已经位于受控范围的起点。' : 'You are already at the managed root.'))}</div>
      </div>
    `;
  }

  function renderFilesWorkspaceHtml(data) {
    const rootButtons = (data.roots || []).map((root) => `<button type="button" class="chip ${state.filesPath === root.path ? 'active' : ''}" data-root-path="${escapeHtml(root.path)}">${escapeHtml(root.label)}</button>`).join('');
    const entriesHtml = (data.entries || []).length
      ? data.entries.map((entry) => `<button type="button" class="${state.currentFile?.path === entry.path ? 'active' : ''}" data-file-entry="${escapeHtml(entry.path)}" data-entry-type="${entry.isDirectory ? 'dir' : 'file'}"><strong>${escapeHtml(renderFileEntryLabel(entry))}</strong><div class="muted small">${escapeHtml(entry.relativePath || entry.path)}</div></button>`).join('')
      : emptyState(state.lang === 'zh' ? '这个目录里暂时没有文件或子目录。' : 'This folder is empty right now.');

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
      : `<div class="card">${emptyState(state.lang === 'zh' ? '先从左侧选择一个文件，再在右侧查看或编辑内容。' : 'Select a file on the left to view or edit it here.')}</div>`;

    return `
      <div class="card">
        <div class="muted small" style="margin-bottom:12px;">${escapeHtml(state.lang === 'zh' ? '你可以在受控目录内切换路径、创建文件或目录，并在右侧编辑当前文件。' : 'Browse within the managed folders, create files or folders, and edit the selected file on the right.')}</div>
        <div class="toolbar">
          ${rootButtons}
          <button class="action-btn" type="button" data-file-action="go-up" ${data.parentPath ? '' : 'disabled'}>${state.lang === 'zh' ? '上一级' : 'Up'}</button>
          <button class="action-btn" type="button" data-file-action="reload-list">${escapeHtml(t('reload'))}</button>
          <button class="action-btn" type="button" data-file-action="new-file">${escapeHtml(t('createFile'))}</button>
          <button class="action-btn" type="button" data-file-action="new-dir">${escapeHtml(t('createDir'))}</button>
        </div>
      </div>
      <div class="two-col" style="margin-top:14px;">
        <div class="card"><div class="split-list">${entriesHtml}</div></div>
        ${editor}
      </div>
    `;
  }

  function renderMemoryFileEntryLabel(file) {
    if (!file) return '';
    if (file.type === 'memory') return file.relativePath || file.path || '';
    return file.type || file.relativePath || file.path || '';
  }

  function normalizeMemoryKindFilter(value) {
    return ['docs', 'notes'].includes(value) ? value : 'all';
  }

  function getMemoryFileKind(file) {
    return file?.type === 'memory' ? 'notes' : 'docs';
  }

  function getMemoryFilterLabel(kind) {
    if (kind === 'docs') return state.lang === 'zh' ? '核心文档' : 'Core Docs';
    if (kind === 'notes') return state.lang === 'zh' ? '记忆片段' : 'Memory Notes';
    return state.lang === 'zh' ? '全部' : 'All';
  }

  function getMemoryAgentLabel(agentId) {
    const normalized = String(agentId || '').trim();
    if (!normalized) return state.lang === 'zh' ? '未分组' : 'Ungrouped';
    if (!normalized.startsWith('detected:')) return normalized;
    const suffix = normalized.slice('detected:'.length) || 'workspace';
    return state.lang === 'zh' ? `自动发现：${suffix}` : `Auto-detected: ${suffix}`;
  }

  function getFilteredMemoryFiles(files) {
    const normalizedKind = normalizeMemoryKindFilter(state.memoryKindFilter);
    const query = String(state.memoryFilterQuery || '').trim().toLowerCase();
    return (files || [])
      .filter((file) => {
        if (normalizedKind !== 'all' && getMemoryFileKind(file) !== normalizedKind) {
          return false;
        }
        if (!query) return true;
        const haystack = [
          file.agentId,
          file.type,
          file.relativePath,
          file.path,
        ].join(' ').toLowerCase();
        return haystack.includes(query);
      })
      .sort((left, right) => {
        const leftAgent = String(left.agentId || '');
        const rightAgent = String(right.agentId || '');
        if (leftAgent !== rightAgent) return leftAgent.localeCompare(rightAgent);
        const leftKind = getMemoryFileKind(left);
        const rightKind = getMemoryFileKind(right);
        if (leftKind !== rightKind) return leftKind.localeCompare(rightKind);
        return renderMemoryFileEntryLabel(left).localeCompare(renderMemoryFileEntryLabel(right));
      });
  }

  function groupMemoryFilesByAgent(files) {
    const groups = new Map();
    for (const file of files || []) {
      const key = String(file.agentId || '');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(file);
    }
    return Array.from(groups.entries())
      .map(([agentId, groupFiles]) => ({
        agentId,
        label: getMemoryAgentLabel(agentId),
        files: groupFiles,
        docsCount: groupFiles.filter((file) => getMemoryFileKind(file) === 'docs').length,
        notesCount: groupFiles.filter((file) => getMemoryFileKind(file) === 'notes').length,
      }))
      .sort((left, right) => left.label.localeCompare(right.label));
  }

  function refreshFilesMemoryView(options = {}) {
    if (state.activeTab !== 'files' || state.filesMode !== 'memory' || !state.memoryViewData) return;
    syncMemoryEditorDraftState();
    updatePanelSection('files-summary', renderFilesMemorySummaryHtml(state.memoryViewData));
    updatePanelSection('files-workspace', renderFilesMemoryWorkspaceHtml(state.memoryViewData));
    bindFilesMemoryView();
    cacheFilesPanelFromState();
    if (options.focusFilter) {
      const input = document.getElementById('memory-filter-query');
      if (input) {
        const cursor = typeof options.cursor === 'number' ? options.cursor : String(input.value || '').length;
        input.focus();
        input.setSelectionRange?.(cursor, cursor);
      }
    }
  }

  function renderFilesMemorySummaryHtml(data) {
    const files = data.files || [];
    const filteredFiles = getFilteredMemoryFiles(files);
    const memoryAgentCount = new Set(files.map((file) => file.agentId).filter(Boolean)).size;
    const rootDocCount = files.filter((file) => file.type !== 'memory').length;
    const memoryFolderCount = files.filter((file) => file.type === 'memory').length;
    const filterSummary = state.memoryKindFilter !== 'all' || state.memoryFilterQuery
      ? (state.lang === 'zh'
        ? `${getMemoryFilterLabel(state.memoryKindFilter)} · “${state.memoryFilterQuery || '全部'}”`
        : `${getMemoryFilterLabel(state.memoryKindFilter)} · "${state.memoryFilterQuery || 'all'}"`)
      : (state.lang === 'zh' ? '未启用筛选' : 'No filter applied');
    return `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '记忆文件数' : 'Memory Files', formatNumber(files.length), state.lang === 'zh' ? `${formatNumber(rootDocCount)} 个核心文件 / ${formatNumber(memoryFolderCount)} 个记忆分片` : `${formatNumber(rootDocCount)} core files / ${formatNumber(memoryFolderCount)} memory notes`)}
        ${metricCard(state.lang === 'zh' ? '覆盖 Agent' : 'Covered Agents', formatNumber(memoryAgentCount), state.lang === 'zh' ? '包含记忆文件的 Agent' : 'agents with managed memory files')}
        ${metricCard(state.lang === 'zh' ? '当前显示' : 'Visible Now', formatNumber(filteredFiles.length), filterSummary, filteredFiles.length === files.length ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '当前打开' : 'Current File', state.memoryFile ? '1' : '0', state.memoryFile ? (state.memoryFile.relativePath || state.memoryFile.path) : (state.lang === 'zh' ? '还没有打开文件' : 'no file opened yet'), state.memoryFile ? 'success' : 'warn')}
      </div>
      ${renderPageTip({
        title: state.lang === 'zh' ? '核心记忆视图' : 'Core Memory View',
        tone: 'info',
        body: state.lang === 'zh'
          ? '这里集中维护 SOUL、USER、AGENTS、MEMORY 以及 memory/ 下的长期记忆片段。切回“全部文件”后，你会回到原来的工作区浏览路径。'
          : 'This view centralizes SOUL, USER, AGENTS, MEMORY, and long-term notes under memory/. Switch back to All Files to return to your previous workspace path.',
      })}
    `;
  }

  function renderFilesMemoryWorkspaceHtml(data) {
    const files = data.files || [];
    const filteredFiles = getFilteredMemoryFiles(files);
    const groupedFiles = groupMemoryFilesByAgent(filteredFiles);
    const listHtml = groupedFiles.length
      ? `<div class="list" style="margin-top:14px;">${groupedFiles.map((group) => `
          <div class="list-item" style="display:block;">
            <div class="row" style="justify-content:space-between; align-items:flex-start;">
              <div>
                <strong>${escapeHtml(group.label)}</strong>
                ${group.label !== group.agentId ? `<div class="muted small" style="margin-top:6px;">${escapeHtml(group.agentId || '-')}</div>` : ''}
              </div>
              <span class="pill">${formatNumber(group.files.length)}</span>
            </div>
            <div class="tag-list" style="margin-top:10px;">
              <span class="chip">${escapeHtml(getMemoryFilterLabel('docs'))} ${formatNumber(group.docsCount)}</span>
              <span class="chip">${escapeHtml(getMemoryFilterLabel('notes'))} ${formatNumber(group.notesCount)}</span>
            </div>
            <div class="split-list" style="margin-top:12px;">
              ${group.files.map((file) => `<button type="button" class="${state.memoryFile?.path === file.path ? 'active' : ''}" data-memory-file="${escapeHtml(file.path)}"><strong>${escapeHtml(renderMemoryFileEntryLabel(file))}</strong><div class="muted small">${escapeHtml(file.relativePath || file.path)}</div></button>`).join('')}
            </div>
          </div>
        `).join('')}</div>`
      : emptyState(state.lang === 'zh' ? '当前筛选条件下没有匹配的核心记忆文件。' : 'No core memory files match the current filters.');

    const editor = state.memoryFile ? `
      <div class="card">
        <div class="panel-head" style="margin-bottom:12px;">
          <div>
            <h3>${escapeHtml(state.memoryFile.relativePath || state.memoryFile.path)}</h3>
            <p>${escapeHtml(state.memoryFile.path)}</p>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '修改后记得保存，这些内容会直接影响对应 Agent 的行为和长期记忆。' : 'Remember to save after editing. These files directly affect agent behavior and long-term memory.')}</div>
          </div>
          <div class="toolbar tight">
            <button class="action-btn" type="button" data-memory-action="reload">${escapeHtml(t('reload'))}</button>
            <button class="action-btn subtle" type="button" data-memory-action="reveal-in-files">${escapeHtml(state.lang === 'zh' ? '在全部文件中定位' : 'Reveal in All Files')}</button>
            <button class="action-btn primary" type="button" data-memory-action="save">${escapeHtml(t('save'))}</button>
          </div>
        </div>
        <textarea id="memory-editor">${escapeHtml(state.memoryFile.content || '')}</textarea>
      </div>
    ` : `<div class="card">${emptyState(state.lang === 'zh' ? '先从左侧选择一个记忆文件，再在右侧查看或编辑。' : 'Select a memory file on the left to view or edit it here.')}</div>`;

    return `
      <div class="two-col">
        <div class="card">
          <div class="toolbar tight">
            <input id="memory-filter-query" value="${escapeHtml(state.memoryFilterQuery || '')}" placeholder="${escapeHtml(state.lang === 'zh' ? '搜索 Agent / 文件名 / 路径' : 'Filter by agent / file / path')}" />
          </div>
          <div class="tag-list" style="margin-top:12px;">
            <button type="button" class="chip ${state.memoryKindFilter === 'all' ? 'active' : ''}" data-memory-filter-kind="all">${escapeHtml(getMemoryFilterLabel('all'))}</button>
            <button type="button" class="chip ${state.memoryKindFilter === 'docs' ? 'active' : ''}" data-memory-filter-kind="docs">${escapeHtml(getMemoryFilterLabel('docs'))}</button>
            <button type="button" class="chip ${state.memoryKindFilter === 'notes' ? 'active' : ''}" data-memory-filter-kind="notes">${escapeHtml(getMemoryFilterLabel('notes'))}</button>
          </div>
          <div class="muted small" style="margin-top:12px;">${escapeHtml(state.lang === 'zh' ? `这里按 Agent 分组展示核心记忆，当前显示 ${formatNumber(filteredFiles.length)} / ${formatNumber(files.length)} 个文件。` : `Core memory is grouped by agent here. Showing ${formatNumber(filteredFiles.length)} of ${formatNumber(files.length)} files.`)}</div>
          ${listHtml}
        </div>
        ${editor}
      </div>
    `;
  }

  function bindFilesView(data) {
    bindFilesModeActions();
    document.querySelectorAll('[data-root-path]').forEach((button) => {
      button.addEventListener('click', async () => {
        const confirmed = await confirmEditorSwitch('file');
        if (!confirmed) return;
        state.filesPath = button.getAttribute('data-root-path') || '';
        state.currentFile = null;
        await loadFiles();
      });
    });

    document.querySelectorAll('[data-file-entry]').forEach((button) => {
      button.addEventListener('click', async () => {
        const confirmed = await confirmEditorSwitch('file');
        if (!confirmed) return;
        const targetPath = button.getAttribute('data-file-entry');
        const type = button.getAttribute('data-entry-type');
        if (type === 'dir') {
          state.filesPath = targetPath || state.filesPath;
          state.currentFile = null;
          await loadFiles();
          return;
        }
        try {
          await openManagedFile(targetPath, 'file');
          await loadFiles();
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
            const confirmed = await confirmEditorSwitch('file');
            if (!confirmed) return;
            state.filesPath = data.parentPath;
            state.currentFile = null;
            await loadFiles();
            return;
          }
          if (action === 'reload-list') {
            syncFileEditorDraftState();
            await loadFiles();
            return;
          }
          if (action === 'reload-current' && state.currentFile?.path) {
            const confirmed = await confirmEditorSwitch('file');
            if (!confirmed) return;
            await openManagedFile(state.currentFile.path, 'file');
            await loadFiles();
            return;
          }
          if (action === 'save-current' && state.currentFile?.path) {
            const content = document.getElementById('file-editor').value;
            const result = await postJson('/api/files/content', { path: state.currentFile.path, content });
            state.currentFile.content = content;
            state.fileOriginal = normalizeEditorText(content);
            showToast(result.message || 'OK');
            cacheFilesPanelFromState();
            return;
          }
          if (action === 'new-file' || action === 'new-dir') {
            const name = await showPromptDialog({
              title: action === 'new-file'
                ? (state.lang === 'zh' ? '新建文件' : 'Create New File')
                : (state.lang === 'zh' ? '新建目录' : 'Create New Folder'),
              message: action === 'new-file'
                ? (state.lang === 'zh' ? '请输入新文件名。' : 'Enter the new file name.')
                : (state.lang === 'zh' ? '请输入新目录名。' : 'Enter the new folder name.'),
              inputLabel: action === 'new-file'
                ? (state.lang === 'zh' ? '文件名' : 'File name')
                : (state.lang === 'zh' ? '目录名' : 'Folder name'),
              placeholder: action === 'new-file'
                ? (state.lang === 'zh' ? '例如：README-local.md' : 'Example: README-local.md')
                : (state.lang === 'zh' ? '例如：drafts' : 'Example: drafts'),
              confirmText: action === 'new-file'
                ? (state.lang === 'zh' ? '创建文件' : 'Create file')
                : (state.lang === 'zh' ? '创建目录' : 'Create folder'),
              tone: 'info',
              kicker: action === 'new-file'
                ? (state.lang === 'zh' ? '文件' : 'File')
                : (state.lang === 'zh' ? '目录' : 'Folder'),
            });
            if (name === null) return;
            const normalizedName = name.trim();
            if (!normalizedName) {
              showToast(state.lang === 'zh' ? '名称不能为空。' : 'Name is required.', 'error');
              return;
            }
            const result = await postJson('/api/files/create', {
              parentPath: state.filesPath,
              name: normalizedName,
              kind: action === 'new-dir' ? 'directory' : 'file',
            });
            showToast(result.message || 'OK');
            await loadFiles();
          }
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
  }

  function bindFilesMemoryView() {
    bindFilesModeActions();
    document.querySelectorAll('[data-memory-filter-kind]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextKind = normalizeMemoryKindFilter(button.getAttribute('data-memory-filter-kind'));
        if (nextKind === state.memoryKindFilter) return;
        state.memoryKindFilter = nextKind;
        refreshFilesMemoryView();
      });
    });
    document.getElementById('memory-filter-query')?.addEventListener('input', (event) => {
      const input = event.currentTarget;
      state.memoryFilterQuery = input?.value || '';
      refreshFilesMemoryView({
        focusFilter: true,
        cursor: input?.selectionStart ?? String(state.memoryFilterQuery || '').length,
      });
    });
    document.querySelectorAll('[data-memory-file]').forEach((button) => {
      button.addEventListener('click', async () => {
        const confirmed = await confirmEditorSwitch('memory');
        if (!confirmed) return;
        try {
          await openManagedFile(button.getAttribute('data-memory-file'), 'memory');
          await loadFiles();
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });

    document.querySelector('[data-memory-action="reload"]')?.addEventListener('click', async () => {
      if (!state.memoryFile?.path) return;
      try {
        const confirmed = await confirmEditorSwitch('memory');
        if (!confirmed) return;
        await openManagedFile(state.memoryFile.path, 'memory');
        await loadFiles();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });

    document.querySelector('[data-memory-action="save"]')?.addEventListener('click', async () => {
      if (!state.memoryFile?.path) return;
      try {
        const content = document.getElementById('memory-editor').value;
        const result = await postJson('/api/files/content', { path: state.memoryFile.path, content });
        state.memoryFile.content = content;
        state.memoryOriginal = normalizeEditorText(content);
        showToast(result.message || 'OK');
        cacheFilesPanelFromState();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
    document.querySelector('[data-memory-action="reveal-in-files"]')?.addEventListener('click', async () => {
      if (!state.memoryFile?.path) return;
      try {
        const confirmed = await confirmEditorSwitch('memory');
        if (!confirmed) return;
        await openManagedFile(state.memoryFile.path, 'file');
        state.filesPath = getParentDirectory(state.memoryFile.path) || state.filesPath;
        state.filesMode = 'all';
        await loadFiles();
      } catch (error) {
        showToast(error.message || String(error), 'error');
      }
    });
  }

  function cacheFilesPanelFromState() {
    if (state.filesMode === 'memory') {
      if (!state.memoryViewData) {
        rememberCurrentPanelRender('files');
        return;
      }
      syncMemoryEditorDraftState();
      const memorySections = [
        {
          id: 'files-summary',
          title: state.lang === 'zh' ? '核心记忆摘要' : 'Core Memory Summary',
          html: renderFilesMemorySummaryHtml(state.memoryViewData),
        },
        {
          id: 'files-workspace',
          title: state.lang === 'zh' ? '核心记忆工作区' : 'Core Memory Workspace',
          html: renderFilesMemoryWorkspaceHtml(state.memoryViewData),
        },
      ];
      state.renderCache.files = {
        html: buildPanelMarkup(t('tabs.files'), t('desc.files'), renderPanelSectionsMarkup(memorySections), renderFilesModeActionsHtml()),
        bind: () => bindFilesMemoryView(state.memoryViewData),
        cachedAt: new Date().toISOString(),
      };
      return;
    }
    if (!state.filesViewData) {
      rememberCurrentPanelRender('files');
      return;
    }
    syncFileEditorDraftState();
    const sections = [
      {
        id: 'files-summary',
        title: state.lang === 'zh' ? '文件摘要' : 'File Summary',
        html: renderFilesSummaryHtml(state.filesViewData),
      },
      {
        id: 'files-workspace',
        title: state.lang === 'zh' ? '文件工作区' : 'File Workspace',
        html: renderFilesWorkspaceHtml(state.filesViewData),
      },
    ];
    state.renderCache.files = {
      html: buildPanelMarkup(t('tabs.files'), t('desc.files'), renderPanelSectionsMarkup(sections), renderFilesModeActionsHtml()),
      bind: () => bindFilesView(state.filesViewData),
      cachedAt: new Date().toISOString(),
    };
  }

  async function loadFiles() {
    if (state.filesMode === 'memory') {
      return await loadMemory();
    }
    const viewTabId = 'files';
    const queryPath = state.filesPath ? `?path=${encodeURIComponent(state.filesPath)}` : '';
    const data = await apiRequest(`/api/files${queryPath}`);
    if (state.activeTab !== viewTabId) return;
    clearTabRefreshHint(viewTabId);
    state.filesPath = data.currentPath || state.filesPath;
    state.filesViewData = data;

    setPanelSections(t('tabs.files'), t('desc.files'), [
      { id: 'files-summary', title: state.lang === 'zh' ? '文件摘要' : 'File Summary', html: renderFilesSummaryHtml(data) },
      { id: 'files-workspace', title: state.lang === 'zh' ? '文件工作区' : 'File Workspace', html: loadingCard(state.lang === 'zh' ? '文件工作区' : 'File Workspace', state.lang === 'zh' ? '正在分步填充文件树与编辑器…' : 'Rendering the file tree and editor in phases…') },
    ], renderFilesModeActionsHtml());

    requestAnimationFrame(() => {
      if (state.activeTab !== viewTabId) return;
      updatePanelSection('files-workspace', renderFilesWorkspaceHtml(data));
      bindFilesView(data);
      rememberCurrentPanelRender(viewTabId, () => bindFilesView(data));
    });
  }

  async function loadMemory() {
    const viewTabId = 'files';
    const data = await apiRequest('/api/memory');
    if (state.activeTab !== viewTabId || state.filesMode !== 'memory') return;
    clearTabRefreshHint(viewTabId);
    state.memoryViewData = data;

    setPanelSections(t('tabs.files'), t('desc.files'), [
      { id: 'files-summary', title: state.lang === 'zh' ? '核心记忆摘要' : 'Core Memory Summary', html: renderFilesMemorySummaryHtml(data) },
      { id: 'files-workspace', title: state.lang === 'zh' ? '核心记忆工作区' : 'Core Memory Workspace', html: loadingCard(state.lang === 'zh' ? '核心记忆工作区' : 'Core Memory Workspace', state.lang === 'zh' ? '正在分步填充记忆文件与编辑器…' : 'Rendering memory files and editor in phases…') },
    ], renderFilesModeActionsHtml());

    requestAnimationFrame(() => {
      if (state.activeTab !== viewTabId || state.filesMode !== 'memory') return;
      updatePanelSection('files-workspace', renderFilesMemoryWorkspaceHtml(data));
      bindFilesMemoryView();
      rememberCurrentPanelRender(viewTabId, () => bindFilesMemoryView());
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
      <div class="list">${state.searchResults.length ? state.searchResults.map((item) => `<div class="list-item"><div class="row" style="justify-content:space-between"><strong>${escapeHtml(item.relativePath || item.path)}</strong><span class="muted">L${escapeHtml(item.line)}</span></div><div>${escapeHtml(item.preview)}</div><div class="toolbar tight" style="margin-top:12px;"><button class="action-btn" data-search-open="${escapeHtml(item.path)}">${state.lang === 'zh' ? '在工作区打开' : 'Open in Workspace'}</button></div></div>`).join('') : emptyState(state.lang === 'zh' ? '输入关键词开始搜索。' : 'Enter a query to search.')}</div>
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
          const targetPath = button.getAttribute('data-search-open') || '';
          const useMemoryMode = isMemoryManagedPath(targetPath);
          if (useMemoryMode) {
            state.filesMode = 'memory';
            await openManagedFile(targetPath, 'memory');
          } else {
            state.filesMode = 'all';
            await openManagedFile(targetPath, 'file');
            state.filesPath = getParentDirectory(state.currentFile?.path || targetPath) || state.filesPath;
          }
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
      ${renderCacheSummaryCard(summary.cache, state.lang === 'zh' ? '成本共享快照' : 'Cost Shared Snapshot')}
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
    if (summary.cache?.refreshing) scheduleRuntimeViewPoll();
    else clearRuntimeViewPollTimer();
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
      ${renderCacheSummaryCard(data.cache, state.lang === 'zh' ? 'Cron 状态缓存' : 'Cron Status Cache')}
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '任务总数' : 'Jobs', `${formatNumber(jobs.length)} / ${formatNumber(data.total ?? jobs.length)}`, state.lang === 'zh' ? '当前已加载 / 实际总量' : 'loaded / total')}
        ${metricCard(state.lang === 'zh' ? '已启用' : 'Enabled', formatNumber(enabledJobs.length), state.lang === 'zh' ? '会按计划运行' : 'scheduled to run', enabledJobs.length > 0 ? 'success' : '')}
        ${metricCard(state.lang === 'zh' ? '已停用' : 'Disabled', formatNumber(disabledJobs.length), state.lang === 'zh' ? '可恢复或清理' : 'can be resumed or cleaned up', disabledJobs.length > 0 ? 'warn' : '')}
        ${metricCard(state.lang === 'zh' ? '调度器状态' : 'Scheduler', data.status?.enabled === null ? '-' : (data.status.enabled ? (state.lang === 'zh' ? '已开启' : 'On') : (state.lang === 'zh' ? '已关闭' : 'Off')), data.status?.schedulerNextWakeAt ? formatDate(data.status.schedulerNextWakeAt) : (data.status?.storePath || '-'), data.status?.enabled ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '运行态任务数' : 'Runtime Job Count', data.status?.jobsCount === null ? '-' : formatNumber(data.status.jobsCount), state.lang === 'zh' ? 'cron status 返回的任务数' : 'reported by cron status')}
        ${metricCard(state.lang === 'zh' ? '分页窗口' : 'Pagination', `${formatNumber(data.offset || 0)} / ${formatNumber(data.limit || jobs.length)}`, data.hasMore ? (state.lang === 'zh' ? `后面还有更多任务，nextOffset=${data.nextOffset ?? '-'}` : `more available, nextOffset=${data.nextOffset ?? '-'}`) : (state.lang === 'zh' ? '当前页已完整' : 'current page is complete'), data.hasMore ? 'warn' : 'success')}
      </div>
      <div style="margin-top:14px;">${renderActionFeedback(state.lang === 'zh' ? '最近一次任务操作' : 'Latest Task Action', state.cronLastAction, state.lang === 'zh' ? '你还没有执行过任务管理操作。' : 'No task action has been executed yet.')}</div>
      ${(data.warnings || []).length ? `<div class="status warn" style="margin-top:14px; white-space:pre-wrap;">${escapeHtml(data.warnings.join('\n'))}</div>` : ''}
      ${(data.hasMore && jobs.length < (data.total || jobs.length)) ? `<div class="status warn" style="margin-top:14px;">${escapeHtml(state.lang === 'zh' ? `当前只加载了 ${jobs.length} 条 Cron，实际总量 ${data.total}，后续可以补做翻页。` : `Only ${jobs.length} cron jobs are loaded right now while the runtime reports ${data.total} in total.`)}</div>` : ''}
      <div class="grid" style="margin-top:14px; align-items:start;">
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:center;">
            <h3>${escapeHtml(formTitle)}</h3>
            <span class="pill ${state.cronEditorMode === 'edit' ? 'warn' : 'success'}">${escapeHtml(state.cronEditorMode === 'edit' ? (state.lang === 'zh' ? '编辑模式' : 'edit mode') : (state.lang === 'zh' ? '创建模式' : 'create mode'))}</span>
          </div>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '在这里创建或修改定时任务。保存后，任务会按你设置的时间自动运行。' : 'Create or edit scheduled jobs here. Once saved, they will run on the schedule you set.')}</div>
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
              placeholder: state.lang === 'zh' ? '例如：汇总今天的新线索并输出成 Markdown' : 'Example: today\'s leads in Markdown',
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
              options: ['', 'now', 'next-heartbeat'],
            })}
            ${renderFormField({
              name: 'timeoutSeconds',
              label: state.lang === 'zh' ? '超时（秒）' : 'Timeout (seconds)',
              value: draft.timeoutSeconds,
              type: 'number',
              placeholder: '90',
            })}
            ${renderFormField({
              name: 'stagger',
              label: state.lang === 'zh' ? '错峰' : 'Stagger',
              value: draft.stagger,
              placeholder: state.lang === 'zh' ? '例如：5m，填 0 表示精确执行' : 'Example: 5m, use 0 for exact scheduling',
            })}
            ${renderFormField({
              name: 'enabled',
              label: state.lang === 'zh' ? '任务状态' : 'Job State',
              value: draft.enabled === false ? 'disabled' : 'enabled',
              type: 'select',
              options: [
                { value: 'enabled', label: state.lang === 'zh' ? '启用' : 'Enabled' },
                { value: 'disabled', label: state.lang === 'zh' ? '停用' : 'Disabled' },
              ],
            })}
            ${renderFormField({
              name: 'announce',
              label: state.lang === 'zh' ? '结果投递' : 'Deliver Output',
              value: draft.announce ? 'true' : 'false',
              type: 'select',
              options: [
                { value: 'true', label: state.lang === 'zh' ? '投递' : 'Deliver' },
                { value: 'false', label: state.lang === 'zh' ? '仅运行' : 'Run only' },
              ],
            })}
            ${renderFormField({
              name: 'bestEffortDeliver',
              label: state.lang === 'zh' ? '尽力投递' : 'Best Effort Deliver',
              value: draft.bestEffortDeliver ? 'true' : 'false',
              type: 'select',
              options: [
                { value: 'true', label: state.lang === 'zh' ? '开启' : 'Enabled' },
                { value: 'false', label: state.lang === 'zh' ? '关闭' : 'Disabled' },
              ],
            })}
            ${renderFormField({
              name: 'deleteAfterRun',
              label: state.lang === 'zh' ? '运行后删除' : 'Delete After Run',
              value: draft.deleteAfterRun ? 'true' : 'false',
              type: 'select',
              options: [
                { value: 'false', label: state.lang === 'zh' ? '保留' : 'Keep' },
                { value: 'true', label: state.lang === 'zh' ? '执行后删除' : 'Delete after run' },
              ],
            })}
          </form>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn primary" type="button" data-cron-action="${state.cronEditorMode === 'edit' ? 'update' : 'create'}">${escapeHtml(state.cronEditorMode === 'edit' ? (state.lang === 'zh' ? '保存修改' : 'Save changes') : (state.lang === 'zh' ? '创建任务' : 'Create job'))}</button>
            <button class="action-btn" type="button" data-cron-action="reset-editor">${escapeHtml(state.lang === 'zh' ? '重置表单' : 'Reset form')}</button>
            ${state.cronEditorMode === 'edit' ? `<button class="action-btn" type="button" data-cron-action="switch-create">${escapeHtml(state.lang === 'zh' ? '切回创建模式' : 'Switch to create')}</button>` : ''}
          </div>
        </div>
        <div class="card">
          <div class="row" style="justify-content:space-between; align-items:center;">
            <h3>${state.lang === 'zh' ? '任务列表' : 'Job List'}</h3>
            <span class="muted small">${escapeHtml(state.lang === 'zh' ? `筛选后 ${filteredJobs.length} / ${jobs.length}` : `${filteredJobs.length} filtered / ${jobs.length}`)}</span>
          </div>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '先筛选出你关心的任务，再执行编辑、立即运行、启停或删除。' : 'Filter to the jobs you care about, then edit, run, enable, disable, or remove them.')}</div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="chip ${state.cronFilter === 'all' ? 'active' : ''}" type="button" data-cron-filter="all">${escapeHtml(state.lang === 'zh' ? '全部' : 'All')}</button>
            <button class="chip ${state.cronFilter === 'enabled' ? 'active' : ''}" type="button" data-cron-filter="enabled">${escapeHtml(state.lang === 'zh' ? '仅启用' : 'Enabled')}</button>
            <button class="chip ${state.cronFilter === 'disabled' ? 'active' : ''}" type="button" data-cron-filter="disabled">${escapeHtml(state.lang === 'zh' ? '仅停用' : 'Disabled')}</button>
            <input class="input" id="cron-search-input" value="${escapeHtml(state.cronSearchQuery || '')}" placeholder="${escapeHtml(state.lang === 'zh' ? '搜索任务 / Agent / cron 表达式' : 'Search by job / agent / cron')}" />
          </div>
          <div class="list" style="margin-top:12px;">
            ${filteredJobs.length ? filteredJobs.map((job) => `<div class="list-item">
              <div class="row" style="justify-content:space-between; gap:12px; align-items:flex-start;">
                <div>
                  <strong>${escapeHtml(job.name || job.id)}</strong>
                  <div class="muted small">${escapeHtml(job.id)} · ${escapeHtml(job.agentId)}</div>
                </div>
                <span class="pill ${getCronJobStatusClass(job.status, job.enabled)}">${escapeHtml(getCronJobStatusLabel(job.status, job.enabled))}</span>
              </div>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(job.schedule || '-')}</div>
              <div style="margin-top:8px;">${escapeHtml(job.prompt || '-')}</div>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? `上次：${formatDate(job.lastRunAt)} ｜ 下次：${formatDate(job.nextRunAt)}` : `Last: ${formatDate(job.lastRunAt)} | Next: ${formatDate(job.nextRunAt)}`)}</div>
              <div class="toolbar tight" style="margin-top:12px;">
                <button class="action-btn" type="button" data-cron-action="edit" data-job-id="${escapeHtml(job.id)}">${escapeHtml(state.lang === 'zh' ? '编辑' : 'Edit')}</button>
                <button class="action-btn" type="button" data-cron-action="run" data-job-id="${escapeHtml(job.id)}">${escapeHtml(t('run'))}</button>
                <button class="action-btn" type="button" data-cron-action="${job.enabled ? 'disable' : 'enable'}" data-job-id="${escapeHtml(job.id)}">${escapeHtml(job.enabled ? t('disable') : t('enable'))}</button>
                <button class="action-btn" type="button" data-cron-action="remove" data-job-id="${escapeHtml(job.id)}">${escapeHtml(t('remove'))}</button>
              </div>
            </div>`).join('') : emptyState(state.lang === 'zh' ? '当前筛选条件下没有匹配的任务。' : 'No cron jobs match the current filters.')}
          </div>
        </div>
      </div>
    `;
    setPanel(t('tabs.cron'), t('desc.cron'), body);
    if (data.cache?.refreshing) scheduleCronStatusPoll();
    else clearCronPollTimer();

    document.querySelectorAll('[data-cron-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.cronFilter = button.getAttribute('data-cron-filter') || 'all';
        loadCron();
      });
    });

    document.getElementById('cron-search-input')?.addEventListener('input', (event) => {
      state.cronSearchQuery = event.target.value || '';
      loadCron();
    });

    const readCronForm = () => {
      const form = document.getElementById('cron-editor-form');
      const payload = {
        name: '',
        description: '',
        agentId: '',
        prompt: '',
        scheduleMode: 'cron',
        scheduleValue: '',
        enabled: true,
        timezone: '',
        model: '',
        thinking: '',
        session: 'main',
        wake: '',
        timeoutSeconds: undefined,
        stagger: '',
        announce: false,
        bestEffortDeliver: false,
        deleteAfterRun: false,
      };
      form?.querySelectorAll('[name]').forEach((element) => {
        if (element.name === 'enabled') {
          payload.enabled = element.value !== 'disabled';
          return;
        }
        if (element.name === 'announce' || element.name === 'bestEffortDeliver' || element.name === 'deleteAfterRun') {
          payload[element.name] = element.value === 'true';
          return;
        }
        if (element.name === 'timeoutSeconds') {
          const value = Number(element.value);
          payload.timeoutSeconds = Number.isFinite(value) && value > 0 ? value : undefined;
          return;
        }
        payload[element.name] = element.value;
      });
      return payload;
    };

    document.querySelectorAll('[data-cron-action]').forEach((button) => {
      button.addEventListener('click', async () => {
        const action = button.getAttribute('data-cron-action');
        const jobId = button.getAttribute('data-job-id') || null;
        try {
          if (action === 'reset-editor') {
            state.cronEditorMode = 'create';
            state.cronEditingJobId = null;
            state.cronDraft = getDefaultCronDraft();
            await loadCron();
            return;
          }
          if (action === 'switch-create') {
            state.cronEditorMode = 'create';
            state.cronEditingJobId = null;
            state.cronDraft = getDefaultCronDraft();
            await loadCron();
            return;
          }
          if (action === 'edit' && jobId) {
            state.cronEditorMode = 'edit';
            state.cronEditingJobId = jobId;
            state.cronDraft = buildCronDraftFromJob(jobs.find((job) => job.id === jobId) || null);
            await loadCron();
            return;
          }

          let result = null;
          if (action === 'create') {
            result = await postJson('/api/cron-ui/create', readCronForm());
          } else if (action === 'update') {
            result = await postJson('/api/cron-ui/update', {
              jobId: state.cronEditingJobId,
              ...readCronForm(),
            });
          } else if (action === 'enable' && jobId) {
            result = await postJson('/api/cron-ui/enable', { jobId });
          } else if (action === 'disable' && jobId) {
            result = await postJson('/api/cron-ui/disable', { jobId });
          } else if (action === 'run' && jobId) {
            result = await postJson('/api/cron-ui/run', { jobId });
          } else if (action === 'remove' && jobId) {
            const confirmed = await showConfirmDialog({
              title: state.lang === 'zh' ? '删除 Cron 任务' : 'Delete Cron Job',
              message: state.lang === 'zh' ? `确认删除任务 ${jobId}？` : `Remove cron job ${jobId}?`,
              confirmText: state.lang === 'zh' ? '确认删除' : 'Delete job',
              tone: 'danger',
            });
            if (!confirmed) return;
            result = await postJson('/api/cron-ui/remove', { jobId });
          }

          if (result) {
            state.cronLastAction = {
              type: result.success === false ? 'error' : 'success',
              message: result.message || 'OK',
              at: new Date().toISOString(),
              detail: result.output || null,
            };
            if (result.success !== false && (action === 'create' || action === 'update')) {
              state.cronEditorMode = 'create';
              state.cronEditingJobId = null;
              state.cronDraft = getDefaultCronDraft();
            }
            showToast(result.message || 'OK', result.success === false ? 'error' : 'success');
            await loadCron();
          }
        } catch (error) {
          state.cronLastAction = {
            type: 'error',
            message: error.message || String(error),
            at: new Date().toISOString(),
            detail: null,
          };
          showToast(error.message || String(error), 'error');
          await loadCron();
        }
      });
    });
  }

  async function loadGitSync(options = {}) {
    clearGitSyncPollTimer();
    state.gitSyncView = normalizeGitSyncView(state.gitSyncView);
    state.gitSyncAdvancedView = normalizeGitSyncAdvancedView(state.gitSyncAdvancedView);
    const currentView = state.gitSyncView;
    const currentAdvancedView = state.gitSyncAdvancedView;
    const viewTabId = 'git-sync';
    const gitIgnoreMode = state.gitSyncIgnoreMode === 'exact' ? 'exact' : 'smart';
    const reuseExisting = options.reuseExisting === true && !!document.querySelector('[data-subview-body="git-sync"]');
    const getAdvancedLoadingCard = (viewId = currentAdvancedView) => {
      if (viewId === 'scope') {
        return loadingCard(state.lang === 'zh' ? '同步范围' : 'Sync Scope', state.lang === 'zh' ? '正在分析同步范围与工作区候选…' : 'Analyzing sync scope and workspace candidates…');
      }
      if (viewId === 'gitignore') {
        return loadingCard(state.lang === 'zh' ? '.gitignore 建议' : '.gitignore Suggestions', state.lang === 'zh' ? '正在读取嵌套仓库与忽略规则建议…' : 'Loading embedded repository and ignore guidance…');
      }
      if (viewId === 'auth') {
        return loadingCard(state.lang === 'zh' ? '认证与推送' : 'Auth & Push', state.lang === 'zh' ? '正在读取远程、认证与推送状态…' : 'Loading remote, authentication, and push state…');
      }
      return loadingCard(state.lang === 'zh' ? '仓库连接' : 'Repository Setup', state.lang === 'zh' ? '正在读取仓库状态与保护准备情况…' : 'Loading repository state and protection readiness…');
    };
    const getLoadingCard = (viewId = currentView) => {
      if (viewId === 'advanced') {
        return renderInnerTabShell({
          groupId: 'git-sync-advanced',
          tabs: GIT_SYNC_ADVANCED_TABS.map((item) => ({ ...item, label: item.label[state.lang] })),
          activeId: currentAdvancedView,
          attrName: 'data-git-sync-advanced-view',
          label: state.lang === 'zh' ? '高级 Git' : 'Advanced Git',
          contentHtml: getAdvancedLoadingCard(),
        });
      }
      return loadingCard(state.lang === 'zh' ? '恢复中心' : 'Recovery', state.lang === 'zh' ? '正在读取保护状态、恢复点与恢复建议…' : 'Loading protection status, recovery points, and guidance…');
    };
    if (!reuseExisting) {
      setPanel(
        t('tabs.git-sync'),
        t('desc.git-sync'),
        renderInnerTabShell({
          groupId: 'git-sync',
          tabs: GIT_SYNC_VIEW_TABS.map((item) => ({ ...item, label: item.label[state.lang] })),
          activeId: currentView,
          attrName: 'data-git-sync-view',
          label: t('tabs.git-sync'),
          contentHtml: getLoadingCard(),
        }),
      );
    } else {
      syncInnerTabState('git-sync', currentView);
      if (options.showSubviewLoading) {
        updateInnerTabBody('git-sync', getLoadingCard());
      }
    }
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
    const bindTopLevelGitSync = () => {
      document.querySelectorAll('[data-git-sync-view]').forEach((button) => {
        button.addEventListener('click', () => {
          const nextView = normalizeGitSyncView(button.getAttribute('data-git-sync-view'));
          if (nextView === state.gitSyncView) return;
          state.gitSyncView = nextView;
          syncInnerTabState('git-sync', nextView);
          updateInnerTabBody('git-sync', getLoadingCard(nextView));
          loadGitSync({ reuseExisting: true });
        });
      });
      document.querySelectorAll('[data-recovery-open-advanced]').forEach((button) => {
        button.addEventListener('click', () => {
          state.gitSyncView = 'advanced';
          state.gitSyncAdvancedView = normalizeGitSyncAdvancedView(button.getAttribute('data-recovery-open-advanced') || 'overview');
          syncInnerTabState('git-sync', 'advanced');
          updateInnerTabBody('git-sync', getLoadingCard('advanced'));
          loadGitSync({ reuseExisting: true });
        });
      });
      document.querySelectorAll('[data-recovery-action]').forEach((button) => {
        button.addEventListener('click', async () => {
          const action = button.getAttribute('data-recovery-action');
          const commitSha = button.getAttribute('data-commit-sha') || '';
          try {
            if (action === 'save') {
              const result = await postJson('/api/recovery/save', {});
              rememberGitAction(result, result?.overview || result?.createdPoint || null);
              await loadGitSync({ reuseExisting: true });
              return;
            }
            if (action === 'copy-point') {
              await copyTextValue(commitSha, {
                successMessage: state.lang === 'zh' ? '恢复点节点已复制。' : 'Recovery point copied.',
                emptyMessage: state.lang === 'zh' ? '当前没有可复制的恢复点。' : 'No recovery point is available to copy.',
              });
              return;
            }
            if (action === 'restore') {
              const confirmed = await showConfirmDialog({
                title: state.lang === 'zh' ? '回到这个状态' : 'Restore This State',
                message: state.lang === 'zh'
                  ? 'Guard 会先自动保护当前未保存的改动，然后在当前主线上创建一个新的恢复提交。确认继续吗？'
                  : 'Guard will protect unsaved changes first, then create a new restore commit on the same branch. Continue?',
                confirmText: state.lang === 'zh' ? '确认恢复' : 'Restore now',
                tone: 'warn',
              });
              if (!confirmed) return;
              const result = await postJson('/api/recovery/restore', { commitSha });
              rememberGitAction(result, {
                restoredFrom: result?.restoredFrom || null,
                createdPoint: result?.createdPoint || null,
              });
              await loadGitSync({ reuseExisting: true });
            }
          } catch (error) {
            rememberGitAction({ success: false, message: error.message || String(error) });
            await loadGitSync({ reuseExisting: true });
          }
        });
      });
      document.querySelectorAll('[data-overview-open-tab]').forEach((button) => {
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-overview-open-tab') || 'system';
          const selector = button.getAttribute('data-overview-focus');
          if (selector) queuePanelFocus(tabId, selector);
          setActiveTab(tabId);
        });
      });
    };
    if (currentView === 'recovery') {
      const [overview, pointsResult, syncScope] = await Promise.all([
        apiRequest('/api/recovery/overview'),
        apiRequest('/api/recovery/points?limit=12').catch(() => ({ items: [] })),
        apiRequest('/api/git-sync/scope').catch(() => null),
      ]);
      if (state.activeTab !== viewTabId || state.gitSyncView !== 'recovery') return;

      const nextActionMeta = getRecoveryNextActionMeta(overview);
      const points = Array.isArray(pointsResult?.items) ? pointsResult.items : [];
      const latestPoint = overview?.latestPoint || points[0] || null;
      const scopeEntries = Array.isArray(syncScope?.entries) ? syncScope.entries : [];
      const scopeCoreEntries = scopeEntries.filter((entry) => entry.level === 'core' && entry.exists !== false);
      const scopeOptionalEntries = scopeEntries.filter((entry) => entry.level === 'optional' && entry.exists !== false);
      const scopeSeparateEntries = scopeEntries.filter((entry) => entry.level === 'separate' && entry.exists !== false);
      const warnings = Array.isArray(overview?.warnings) ? overview.warnings : [];
      const recoveryHtml = `
        <div class="panel-subview-stack">
          <div class="grid">
            ${metricCard(state.lang === 'zh' ? '保护状态' : 'Protection', overview?.protected ? (state.lang === 'zh' ? '已建立' : 'Ready') : (state.lang === 'zh' ? '未建立' : 'Not Ready'), overview?.protected ? (state.lang === 'zh' ? '已经有恢复点' : 'recovery points exist') : (state.lang === 'zh' ? '还没有恢复点' : 'no recovery points yet'), overview?.protected ? 'success' : 'warn')}
            ${metricCard(state.lang === 'zh' ? '当前主线' : 'Current Branch', overview?.currentBranch || '-', overview?.remoteReady ? (state.lang === 'zh' ? '云端保护已就绪' : 'cloud protection ready') : (state.lang === 'zh' ? '云端保护未完成' : 'cloud protection not ready'), overview?.remoteReady ? 'success' : 'warn')}
            ${metricCard(state.lang === 'zh' ? '最近保存' : 'Last Saved', latestPoint ? formatRelative(latestPoint.createdAt) : '-', latestPoint ? formatDate(latestPoint.createdAt) : (state.lang === 'zh' ? '还没有保存记录' : 'no saved point yet'))}
            ${metricCard(state.lang === 'zh' ? '最近上云' : 'Last Cloud Sync', overview?.lastPushedAt ? formatRelative(overview.lastPushedAt) : (state.lang === 'zh' ? '尚未上云' : 'not synced yet'), overview?.lastPushedAt ? formatDate(overview.lastPushedAt) : (state.lang === 'zh' ? '只保存在本机' : 'local-only so far'), overview?.lastPushedAt ? 'success' : 'warn')}
          </div>
          <div class="card accent-info">
            <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
              <div>
                <h3>${state.lang === 'zh' ? '当前保护状态' : 'Current Protection Status'}</h3>
                <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里不讲 Git 细节，只回答三件事：有没有恢复点、云端有没有跟上、现在是否还存在未保护改动。' : 'This keeps Git details hidden and answers three questions: do recovery points exist, is the cloud copy ready, and are there unprotected changes right now?')}</div>
              </div>
              <span class="pill ${overview?.protected ? 'success' : 'warn'}">${escapeHtml(overview?.protected ? (state.lang === 'zh' ? '可恢复' : 'Recoverable') : (state.lang === 'zh' ? '待建立' : 'Setup Needed'))}</span>
            </div>
            <div class="stack" style="margin-top:14px;">
              <div class="list-item"><strong>${state.lang === 'zh' ? '最近一次保护点' : 'Latest Recovery Point'}</strong><div class="muted small">${escapeHtml(latestPoint ? `${formatDate(latestPoint.createdAt)} · ${getRecoveryPointKindMeta(latestPoint).label}` : (state.lang === 'zh' ? '当前还没有恢复点。' : 'No recovery point exists yet.'))}</div></div>
              <div class="list-item"><strong>${state.lang === 'zh' ? '云端状态' : 'Cloud Status'}</strong><div class="muted small">${escapeHtml(overview?.remoteReady ? (overview?.lastPushedAt ? (state.lang === 'zh' ? `最近同步于 ${formatDate(overview.lastPushedAt)}` : `Last synced at ${formatDate(overview.lastPushedAt)}`) : (state.lang === 'zh' ? '云端保护已准备好，下一次保存会自动同步。' : 'Cloud protection is ready and the next save will sync automatically.')) : (state.lang === 'zh' ? '当前还没完成 private 仓库连接与认证。' : 'A private remote and authentication are still not fully prepared.'))}</div></div>
              <div class="list-item"><strong>${state.lang === 'zh' ? '当前变化' : 'Current Changes'}</strong><div class="muted small">${escapeHtml(overview?.unsyncedChanges ? (state.lang === 'zh' ? '还有没纳入保护点的本地变化，建议先保存。' : 'There are local changes that are not protected yet. Save them first.') : (state.lang === 'zh' ? '当前没有明显未保护改动。' : 'No obvious unprotected changes are visible right now.'))}</div></div>
            </div>
          </div>
          <div class="grid">
            <div class="card">
              <h3>${escapeHtml(nextActionMeta.title)}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(nextActionMeta.body)}</div>
              <div class="toolbar tight" style="margin-top:14px;">
                ${nextActionMeta.action === 'save'
                  ? `<button class="action-btn primary" type="button" data-recovery-action="save">${escapeHtml(nextActionMeta.label)}</button>`
                  : nextActionMeta.tabId === 'git-sync'
                    ? `<button class="action-btn primary" type="button" data-recovery-open-advanced="${escapeHtml(nextActionMeta.advancedView || 'overview')}">${escapeHtml(nextActionMeta.label)}</button>`
                    : `<button class="action-btn primary" type="button" data-overview-open-tab="${escapeHtml(nextActionMeta.tabId || 'system')}" ${nextActionMeta.selector ? `data-overview-focus="${escapeHtml(nextActionMeta.selector)}"` : ''}>${escapeHtml(nextActionMeta.label)}</button>`}
              </div>
              ${warnings.length ? `<div class="list" style="margin-top:14px;">${warnings.slice(0, 4).map((warning) => `<div class="list-item"><div>${escapeHtml(warning)}</div></div>`).join('')}</div>` : `<div class="status" style="margin-top:14px;">${escapeHtml(state.lang === 'zh' ? '当前没有明显阻断项。' : 'No major blocker is visible right now.')}</div>`}
            </div>
            <div class="card accent-success">
              <h3>${state.lang === 'zh' ? '立即保存' : 'Save Now'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '保存后，Guard 会优先把当前状态记成恢复点；如果云端保护已经准备好，也会顺手把它同步出去。' : 'Guard will save the current state as a recovery point first, then sync it to the cloud automatically when cloud protection is ready.')}</div>
              <div class="toolbar tight" style="margin-top:14px;">
                <button class="action-btn primary" type="button" data-recovery-action="save">${escapeHtml(state.lang === 'zh' ? '保存现在' : 'Save Current State')}</button>
                <button class="action-btn" type="button" data-recovery-open-advanced="overview">${escapeHtml(state.lang === 'zh' ? '查看高级 Git' : 'View Advanced Git')}</button>
              </div>
              <div style="margin-top:12px;">${renderActionFeedback(state.lang === 'zh' ? '最近一次操作' : 'Latest Action', state.gitSyncLastAction, state.lang === 'zh' ? '你还没有执行过保存或恢复操作。' : 'No save or restore action has been executed yet.')}</div>
            </div>
          </div>
          <div class="card panel-focus-target" id="recovery-timeline-card">
            <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
              <div>
                <h3>${state.lang === 'zh' ? '恢复点时间线' : 'Recovery Timeline'}</h3>
                <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '恢复不会删除后面的历史，而是会在当前主线上追加一个新的“已恢复到此状态”节点。' : 'Restoring does not delete newer history. Guard adds a new restore point on the same branch instead.')}</div>
              </div>
              <button class="action-btn" type="button" data-recovery-open-advanced="auth">${escapeHtml(state.lang === 'zh' ? '查看云端保护' : 'Review Cloud Protection')}</button>
            </div>
            <div style="margin-top:14px;">${renderRecoveryPointTimeline(points)}</div>
            ${renderAdvancedDisclosure({
              title: state.lang === 'zh' ? '查看原始恢复数据' : 'View Raw Recovery Data',
              description: state.lang === 'zh' ? '只有在排查问题时，再展开恢复概览和时间线原始数据。' : 'Expand this only when you need to debug the recovery state or raw timeline data.',
              bodyHtml: `<pre>${prettyJson({ overview, points })}</pre>`,
              marginTop: 14,
            })}
          </div>
          ${syncScope ? `
            <div class="card">
              <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                <div>
                  <h3>${state.lang === 'zh' ? '保护范围摘要' : 'Protection Scope Summary'}</h3>
                  <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里用人话告诉你哪些内容值得保、哪些可选保留、哪些更适合单独维护。更细的范围和 `.gitignore` 策略放在高级 Git。' : 'This explains what is worth keeping, what is optional, and what should stay separate. Detailed scope and `.gitignore` strategy stays in Advanced Git.')}</div>
                </div>
                <button class="action-btn" type="button" data-recovery-open-advanced="scope">${escapeHtml(state.lang === 'zh' ? '查看高级范围设置' : 'Open Advanced Scope')}</button>
              </div>
              <div class="grid" style="margin-top:14px;">
                ${metricCard(state.lang === 'zh' ? '核心同步' : 'Core Sync', formatNumber(syncScope?.summary?.coreCount || scopeCoreEntries.length), state.lang === 'zh' ? '记忆、关键工作区和长期资料' : 'memory, key workspaces, and long-term assets', 'success')}
                ${metricCard(state.lang === 'zh' ? '可选同步' : 'Optional', formatNumber(syncScope?.summary?.optionalCount || scopeOptionalEntries.length), state.lang === 'zh' ? '绘画、导出和较大的资料' : 'artwork, exports, and heavier assets', scopeOptionalEntries.length ? 'warn' : '')}
                ${metricCard(state.lang === 'zh' ? '建议拆仓' : 'Separate Repo', formatNumber(syncScope?.summary?.separateCount || scopeSeparateEntries.length), state.lang === 'zh' ? '插件代码与独立仓内容' : 'plugin code and independent repositories')}
                ${metricCard(state.lang === 'zh' ? '默认排除' : 'Exclude', formatNumber(syncScope?.summary?.excludeCount || 0), state.lang === 'zh' ? '运行态缓存、日志和敏感数据' : 'runtime caches, logs, and sensitive data', (syncScope?.summary?.excludeCount || 0) ? 'danger' : '')}
              </div>
              <div class="panel-subview-stack" style="margin-top:16px;">
                ${renderGitSyncScopeSection(state.lang === 'zh' ? '值得优先保住的内容' : 'Keep These First', scopeCoreEntries, state.lang === 'zh' ? '当前没有检测到核心保护内容。' : 'No core protection candidates were detected.')}
                ${renderGitSyncScopeSection(state.lang === 'zh' ? '可按价值选择的内容' : 'Optional Content', scopeOptionalEntries, state.lang === 'zh' ? '当前没有可选内容。' : 'No optional content detected.')}
                ${renderGitSyncScopeSection(state.lang === 'zh' ? '更适合单独维护的内容' : 'Better Managed Separately', scopeSeparateEntries, state.lang === 'zh' ? '当前没有独立维护建议。' : 'No separate-repository suggestion detected.')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
      updateInnerTabBody('git-sync', recoveryHtml);
      bindTopLevelGitSync();
      rememberCurrentPanelRender(viewTabId, bindTopLevelGitSync);
      return;
    }
    if (!document.querySelector('[data-subview-body="git-sync-advanced"]')) {
      updateInnerTabBody('git-sync', getLoadingCard('advanced'));
    } else {
      syncInnerTabState('git-sync-advanced', currentAdvancedView);
      if (options.showSubviewLoading) {
        updateInnerTabBody('git-sync-advanced', getAdvancedLoadingCard());
      }
    }
    const status = await apiRequest('/api/git-sync/status');
    const gitignorePreviewPromise = apiRequest(`/api/git-sync/gitignore-preview?mode=${encodeURIComponent(gitIgnoreMode)}`).catch(() => null);
    const syncScopePromise = apiRequest('/api/git-sync/scope').catch(() => null);
    const oauth = status.oauth || {};

    if (!state.gitSyncDraftMessage) state.gitSyncDraftMessage = '';

    const skippedEmbeddedRepos = Array.isArray(status.skippedEmbeddedRepos) ? status.skippedEmbeddedRepos : [];
    const stageableChangedFiles = Array.isArray(status.stageableChangedFiles) ? status.stageableChangedFiles : [];
    const allChangedFiles = Array.isArray(status.changedFiles) ? status.changedFiles : [];

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
          <span class="pill ${stage.ok ? 'success' : 'warn'}">${escapeHtml(stage.ok ? (state.lang === 'zh' ? '就绪' : 'Ready') : (state.lang === 'zh' ? '待处理' : 'Needs Action'))}</span>
        </div>
        <div class="muted small">${escapeHtml(stage.detail)}</div>
      </div>
    `).join('');
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
    const rawChangeSummary = allChangedFiles.length
      ? `${formatNumber(allChangedFiles.length)} ${state.lang === 'zh' ? '项变更' : 'changed paths'}`
      : (state.lang === 'zh' ? '没有本地变更' : 'No local changes');
    const allChangesTree = buildGitPathTree(allChangedFiles, {
      stageablePaths: stageableChangedFiles,
      skippedEmbeddedRepos,
    });
    const stageableChangesTree = buildGitPathTree(stageableChangedFiles, {
      stageablePaths: stageableChangedFiles,
      skippedEmbeddedRepos,
    });
    const allChangesTreeHtml = renderGitPathTreePanel(
      state.lang === 'zh' ? '目录树视图' : 'Folder Tree View',
      allChangesTree,
      {
        description: state.lang === 'zh'
          ? '按目录聚合全部变更，默认折叠，避免一次性把数百条路径平铺到页面上。'
          : 'All changed paths grouped by folder and folded by default to avoid rendering hundreds of rows at once.',
        emptyMessage: state.lang === 'zh' ? '当前没有本地变更。' : 'No local changes.',
        expandDepth: 0,
        previewLimit: 4,
        childPreviewLimit: 8,
      },
    );
    const stageableTreeHtml = renderGitPathTreePanel(
      state.lang === 'zh' ? '待提交目录树' : 'Stageable Folder Tree',
      stageableChangesTree,
      {
        description: state.lang === 'zh'
          ? '这里只展示会纳入外层 .openclaw commit 的路径结构。'
          : 'Only the paths that will enter the root .openclaw commit are shown here.',
        emptyMessage: state.lang === 'zh' ? '当前没有可直接提交的普通文件。' : 'No stageable root-repo files detected.',
        expandDepth: 0,
        previewLimit: 5,
        childPreviewLimit: 8,
      },
    );
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

    const gitignorePreview = await gitignorePreviewPromise;
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
    const syncScope = await syncScopePromise;
    const scopeEntries = Array.isArray(syncScope?.entries) ? syncScope.entries : [];
    const scopeCoreEntries = scopeEntries.filter((entry) => entry.level === 'core' && entry.exists !== false);
    const scopeOptionalEntries = scopeEntries.filter((entry) => entry.level === 'optional' && entry.exists !== false);
    const scopeSeparateEntries = scopeEntries.filter((entry) => entry.level === 'separate' && entry.exists !== false);
    const scopeExcludeEntries = scopeEntries.filter((entry) => entry.level === 'exclude' && entry.exists !== false);
    const workspaceCandidates = Array.isArray(syncScope?.workspaceCandidates) ? syncScope.workspaceCandidates : [];
    const scopeIgnoreMissingEntries = Array.isArray(syncScope?.missingIgnoreEntries) ? syncScope.missingIgnoreEntries : [];
    const scopeIgnoreBlock = typeof syncScope?.recommendedIgnoreBlock === 'string' ? syncScope.recommendedIgnoreBlock : '';
    const workspaceCandidateNotice = workspaceCandidates.length
      ? `<div class="status warn" style="margin-top:14px;">${escapeHtml(state.lang === 'zh'
          ? `检测到 ${workspaceCandidates.length} 个新工作区候选。Guard 已自动把它们纳入文件浏览与搜索范围；如果它们应该绑定到某个 Agent，请后续补进正式配置。`
          : `Detected ${workspaceCandidates.length} new workspace candidates. Guard already includes them in file browsing and search; add them to the formal agent config later if they should be agent-bound.`)}</div>`
      : '';
    const workspaceCandidateHtml = workspaceCandidates.length
      ? `<div class="list" style="margin-top:12px;">${workspaceCandidates.map((candidate) => `
          <div class="list-item">
            <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
              <strong>${escapeHtml(candidate.relativePath)}</strong>
              <span class="pill ${candidate.hasGitRepo ? 'warn' : 'success'}">${escapeHtml(candidate.hasGitRepo ? (state.lang === 'zh' ? '带独立 Git' : 'Has Git Repo') : (state.lang === 'zh' ? '已自动识别' : 'Auto-detected'))}</span>
            </div>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(candidate.path)}</div>
            <div style="margin-top:8px;">${escapeHtml(candidate.reason === 'named-workspace'
              ? (state.lang === 'zh' ? '目录命名符合 workspace / workspace-* 约定。' : 'The directory name matches the workspace / workspace-* convention.')
              : (state.lang === 'zh' ? '目录内发现了多个 Workspace 标记文件。' : 'Multiple workspace marker files were found inside this directory.'))}</div>
          </div>
        `).join('')}</div>`
      : '';
    const scopeSummaryHtml = syncScope
      ? `
        <div class="grid">
          ${metricCard(state.lang === 'zh' ? '核心同步' : 'Core Sync', formatNumber(syncScope?.summary?.coreCount || scopeCoreEntries.length), state.lang === 'zh' ? '建议默认保留' : 'recommended by default', 'success')}
          ${metricCard(state.lang === 'zh' ? '可选同步' : 'Optional', formatNumber(syncScope?.summary?.optionalCount || scopeOptionalEntries.length), state.lang === 'zh' ? '按价值与体积取舍' : 'choose based on value and size', scopeOptionalEntries.length > 0 ? 'warn' : '')}
          ${metricCard(state.lang === 'zh' ? '建议拆仓' : 'Separate Repo', formatNumber(syncScope?.summary?.separateCount || scopeSeparateEntries.length), state.lang === 'zh' ? '代码型资产更适合独立版本化' : 'code-like assets are better versioned separately')}
          ${metricCard(state.lang === 'zh' ? '默认排除' : 'Exclude', formatNumber(syncScope?.summary?.excludeCount || scopeExcludeEntries.length), state.lang === 'zh' ? '运行态与敏感信息' : 'runtime and sensitive data', scopeExcludeEntries.length > 0 ? 'danger' : '')}
        </div>
        ${workspaceCandidateNotice}
        ${renderGitSyncScopeSection(state.lang === 'zh' ? '第一层：核心同步' : 'Layer 1: Core Sync', scopeCoreEntries, state.lang === 'zh' ? '当前没有核心同步项。' : 'No core-sync items detected.')}
        ${renderGitSyncScopeSection(state.lang === 'zh' ? '第二层：可选同步' : 'Layer 2: Optional Sync', scopeOptionalEntries, state.lang === 'zh' ? '当前没有可选同步项。' : 'No optional-sync items detected.')}
        ${renderGitSyncScopeSection(state.lang === 'zh' ? '第三层：建议拆仓' : 'Layer 3: Separate Repositories', scopeSeparateEntries, state.lang === 'zh' ? '当前没有建议拆仓的目录。' : 'No separate-repository candidates detected.')}
        ${renderGitSyncScopeSection(state.lang === 'zh' ? '第四层：默认排除' : 'Layer 4: Exclude By Default', scopeExcludeEntries, state.lang === 'zh' ? '当前没有默认排除项。' : 'No default exclusions detected.')}
        ${workspaceCandidateHtml ? `
          <div class="sub-card" style="margin-top:14px;">
            <strong>${escapeHtml(state.lang === 'zh' ? '新工作区候选' : 'New Workspace Candidates')}</strong>
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这些目录已经被自动识别为 Workspace 候选。你现在就可以在文件页里浏览它们；如果需要 Agent 级绑定，再补正式配置。' : 'These directories are already recognized as workspace candidates. You can browse them in the Files tab now; add formal agent bindings later if needed.')}</div>
            ${workspaceCandidateHtml}
          </div>
        ` : ''}
        <div class="sub-card" style="margin-top:14px;">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <strong>${escapeHtml(state.lang === 'zh' ? '推荐排除模板' : 'Recommended Exclusion Template')}</strong>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这是一组更贴近“内容同步、运行态排除”的根仓建议规则。你可以先复制审阅，再决定是否写进 .gitignore。' : 'This root-level template follows a content-sync / runtime-exclude approach. Copy and review it first, then decide whether to write it into .gitignore.')}</div>
            </div>
            <span class="pill ${scopeIgnoreMissingEntries.length > 0 ? 'warn' : 'success'}">${escapeHtml(scopeIgnoreMissingEntries.length > 0 ? `${formatNumber(scopeIgnoreMissingEntries.length)} ${state.lang === 'zh' ? '条待补齐' : 'missing'}` : (state.lang === 'zh' ? '已覆盖' : 'Covered'))}</span>
          </div>
          <div style="margin-top:12px;">
            ${scopeIgnoreBlock
              ? `<pre>${escapeHtml(scopeIgnoreBlock)}</pre>`
              : emptyState(state.lang === 'zh' ? '当前没有新的推荐排除规则。' : 'No new exclusion rules are recommended right now.')}
          </div>
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn" type="button" data-git-action="copy-scope-ignore-template" ${scopeIgnoreBlock ? '' : 'disabled'}>${state.lang === 'zh' ? '复制推荐排除模板' : 'Copy Exclusion Template'}</button>
          </div>
        </div>
      `
      : `<div class="card">${emptyState(state.lang === 'zh' ? '暂时无法读取同步范围建议。' : 'Sync scope guidance is unavailable right now.')}</div>`;

    const contentHtml = `
      <div class="panel-subview-stack">
        <div class="panel-subview-group" data-git-sync-advanced-section="overview">
          ${renderCacheSummaryCard(status.cache, state.lang === 'zh' ? 'Git 状态缓存' : 'Git Status Cache')}
          ${renderCacheSummaryCard(gitignorePreview?.cache, state.lang === 'zh' ? '.gitignore 建议缓存' : '.gitignore Suggestion Cache')}
          <div class="grid">
        ${metricCard(state.lang === 'zh' ? '仓库状态' : 'Repository', getReadyStateLabel(status.repoInitialized), status.repoPath || '-', status.repoInitialized ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '远程仓库' : 'Remote', status.remoteRepo || status.remoteUrl || '-', status.remoteWebUrl || status.provider || '-', status.remoteUrl ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '认证' : 'Auth', status.authConfigured ? (status.accountUsername || status.authMode || 'configured') : 'missing', status.authConfigured ? (state.lang === 'zh' ? '凭证已配置' : 'credentials ready') : (state.lang === 'zh' ? '尚未配置' : 'not configured'), status.authConfigured ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '全部变更' : 'All Changes', formatNumber(allChangedFiles.length), `${status.currentBranch || '-'} · ${rawChangeSummary}`, allChangedFiles.length > 0 ? 'warn' : 'success')}
        ${metricCard(state.lang === 'zh' ? '可提交文件' : 'Stageable', formatNumber(stageableChangedFiles.length), stageableChangedFiles.length > 0 ? (state.lang === 'zh' ? '将纳入外层 commit' : 'Will be staged in the root repo') : (state.lang === 'zh' ? '当前没有可提交普通文件' : 'No stageable root-repo files'), stageableChangedFiles.length > 0 ? 'success' : 'warn')}
        ${metricCard(state.lang === 'zh' ? '嵌套仓库' : 'Embedded Repos', formatNumber(skippedEmbeddedRepos.length), skippedEmbeddedRepos.length > 0 ? (state.lang === 'zh' ? '已自动跳过，需单独处理' : 'Skipped automatically, requires separate handling') : (state.lang === 'zh' ? '当前未发现' : 'No embedded repos detected'), skippedEmbeddedRepos.length > 0 ? 'warn' : 'success')}
          </div>
          ${status.state?.lastError ? `<div class="status error">${escapeHtml((state.lang === 'zh' ? '最近错误：' : 'Last error: ') + status.state.lastError)}</div>` : ''}
          <div>${renderActionFeedback(state.lang === 'zh' ? '最近一次高级 Git 操作' : 'Latest Advanced Git Action', state.gitSyncLastAction, state.lang === 'zh' ? '你还没有执行过高级 Git 操作。' : 'No advanced Git action has been executed yet.')}</div>
          <div class="grid">
            <div class="card accent-info panel-focus-target" id="git-sync-readiness-card">
              <h3>${state.lang === 'zh' ? '现在能不能同步' : 'Can You Sync Now?'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这里按步骤告诉你现在卡在哪，先处理待办项，再继续提交或推送。' : 'This card shows where the sync flow is blocked right now, so you can fix the pending items before committing or pushing.')}</div>
              <div class="list">${stageHtml}</div>
              <div class="toolbar tight" style="margin-top:12px;">
                <button class="action-btn" type="button" data-git-action="copy-repo-path">${state.lang === 'zh' ? '复制本地目录' : 'Copy Repo Path'}</button>
                <button class="action-btn" type="button" data-git-action="copy-remote" ${status.remoteUrl ? '' : 'disabled'}>${state.lang === 'zh' ? '复制远程地址' : 'Copy Remote URL'}</button>
                <button class="action-btn" type="button" data-git-action="open-remote" ${status.remoteWebUrl ? '' : 'disabled'}>${state.lang === 'zh' ? '打开远程仓库' : 'Open Remote'}</button>
                <button class="action-btn primary" type="button" data-git-action="check-sync">${state.lang === 'zh' ? '检查并同步' : 'Check + Sync'}</button>
              </div>
            </div>
            <div class="card panel-focus-target" id="git-sync-commit-card">
              <h3>${state.lang === 'zh' ? '为什么现在还不能提交 / 推送' : 'Why Commit Or Push Is Still Blocked'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '如果按钮是灰的，先看这里。它会分别告诉你提交、推送和一键同步卡在什么地方。' : 'If the action buttons are disabled, start here. This card explains what is blocking commit, push, or one-click sync.')}</div>
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
        </div>
        <div class="panel-subview-group" data-git-sync-advanced-section="scope">
          <div class="card">
          <h3>${state.lang === 'zh' ? '同步范围建议' : 'Sync Scope Guidance'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '目标不是把整个 .openclaw 全量塞进 Git，而是把真正值得换机保留的内容和运行副产物分开。' : 'The goal is not to push the entire .openclaw into Git, but to separate high-value portable content from runtime by-products.')}</div>
          <div style="margin-top:14px;">${scopeSummaryHtml}</div>
        </div>
        <div class="grid">
        <div class="card accent-success">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <h3>${state.lang === 'zh' ? '这次会提交哪些内容' : 'What Will Be Included In This Commit'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '改成目录树展示，既能看清结构，也不会被超长平铺列表拖慢。' : 'Rendered as a folder tree so the structure stays visible without the cost of a huge flat list.')}</div>
            </div>
            <button class="action-btn" type="button" data-git-action="copy-stageable-list" ${stageableChangedFiles.length ? '' : 'disabled'}>${state.lang === 'zh' ? '复制完整清单' : 'Copy Full List'}</button>
          </div>
          <div style="margin-top:12px;">${stageableTreeHtml}</div>
        </div>
        <div class="card accent-warn">
          <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <h3>${state.lang === 'zh' ? '已自动跳过的嵌套仓库' : 'Skipped Embedded Repositories'}</h3>
              <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '这些路径带有自己的 .git，不会被外层保护仓库纳入 commit。' : 'These paths contain their own .git directories and stay outside the root protection repository commit.')}</div>
            </div>
            <button class="action-btn" type="button" data-git-action="copy-skipped-list" ${skippedEmbeddedRepos.length ? '' : 'disabled'}>${state.lang === 'zh' ? '复制仓库列表' : 'Copy Repo List'}</button>
          </div>
          <div class="list">${skippedReposHtml}</div>
        </div>
      </div>
        </div>
        <div class="panel-subview-group" data-git-sync-advanced-section="gitignore">
      <div class="card accent-warn">
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
            <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '推荐做法。把子仓库路径加入外层 .gitignore，后续外层保护仓库只管主仓内容。' : 'Recommended. Add child repository paths to the root .gitignore so the root protection repository only manages the main repository.')}</div>
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
                <strong>${escapeHtml(state.lang === 'zh' ? '.gitignore 将写入哪些规则' : 'What Would Be Added To .gitignore')}</strong>
                <div class="muted small" style="margin-top:8px;">${escapeHtml(gitIgnorePath)}</div>
              </div>
              <span class="pill ${gitIgnoreMissingEntries.length > 0 ? 'warn' : 'success'}">${escapeHtml(gitIgnoreMissingEntries.length > 0 ? (state.lang === 'zh' ? '\u6709\u5f85\u5199\u5165\u89c4\u5219' : 'Changes Pending') : (state.lang === 'zh' ? '\u65e0\u9700\u8ffd\u52a0' : 'Up To Date'))}</span>
            </div>
            <div style="margin-top:12px;">
              <label class="field-label" for="gitignore-mode">${escapeHtml(state.lang === 'zh' ? '写入策略' : 'Write Strategy')}</label>
              <select id="gitignore-mode">${gitIgnoreModeOptions}</select>
            </div>
            ${renderAdvancedDisclosure({
              title: state.lang === 'zh' ? '查看建议写入的规则' : 'View Suggested Rules',
              description: state.lang === 'zh' ? '这里展示本次建议追加到外层 .gitignore 的规则片段。' : 'This shows the block that would be appended to the root .gitignore.',
              bodyHtml: `<pre>${escapeHtml(gitIgnoreAppendBlock || (state.lang === 'zh' ? '当前没有新增规则需要写入。' : 'No new ignore rules need to be written right now.'))}</pre>`,
              marginTop: 12,
            })}
          </div>
          <div class="sub-card">
            <strong>${escapeHtml(state.lang === 'zh' ? '当前规则覆盖情况' : 'Current Rule Coverage')}</strong>
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
      </div>
      <div class="panel-subview-group" data-git-sync-advanced-section="auth">
      <div class="grid">
        <div class="card">
          <h3>${state.lang === 'zh' ? '初始化仓库并绑定远程' : 'Initialize The Repo And Connect A Remote'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '第一次接入备份与恢复时，从这里完成仓库初始化和远程仓库绑定。' : 'Use this card the first time you set up Backup & Recovery to initialize the repo and bind a remote repository.')}</div>
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
          <h3>${state.lang === 'zh' ? 'HTTPS Token 认证' : 'HTTPS Token Authentication'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '如果你想直接用 Token 完成提交和推送，在这里保存凭证。' : 'Save a token here if you want to commit and push with HTTPS credentials.')}</div>
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
          <h3>${state.lang === 'zh' ? '浏览器 OAuth 授权' : 'Browser OAuth Authorization'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '如果你更习惯浏览器登录，可以在这里发起授权流程。' : 'Start the browser-based login flow here if you prefer OAuth over pasting a token.')}</div>
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
          ${renderAdvancedDisclosure({
            title: state.lang === 'zh' ? '查看 OAuth 原始状态' : 'View Raw OAuth State',
            description: state.lang === 'zh' ? '只有在授权异常或排查回调问题时，再展开这份原始状态。' : 'Expand this only when the OAuth flow fails or you need to debug the callback state.',
            bodyHtml: `<pre>${prettyJson(oauth)}</pre>`,
            marginTop: 12,
          })}
        </div>
        <div class="card">
          <h3>${state.lang === 'zh' ? '提交与推送' : 'Commit & Push'}</h3>
          <div class="muted small" style="margin-top:8px;">${escapeHtml(state.lang === 'zh' ? '确认改动后，可以先提交，再推送；也可以直接执行一键同步。' : 'Once the changes look correct, you can commit first and then push, or run one-click sync directly.')}</div>
          ${renderFormField({
            name: 'gitCommitMessage',
            label: state.lang === 'zh' ? '提交说明' : 'Commit Message',
            value: state.gitSyncDraftMessage,
            placeholder: state.lang === 'zh' ? '留空则使用默认英文保护说明' : 'Leave blank to use the default English checkpoint message',
            help: state.lang === 'zh' ? '建议使用英文，便于后续公开仓库维护。例如：guard: checkpoint prompt cleanup。' : 'English messages are recommended for public repository maintenance, for example: guard: checkpoint prompt cleanup.',
            fullWidth: true,
          })}
          <div class="toolbar tight" style="margin-top:12px;">
            <button class="action-btn" type="button" data-git-action="commit" ${status.canCommit ? '' : 'disabled'}>commit</button>
            <button class="action-btn" type="button" data-git-action="push" ${status.canPush ? '' : 'disabled'}>push</button>
            <button class="action-btn" type="button" data-git-action="check-sync">${state.lang === 'zh' ? '检查并同步' : 'Check + Sync'}</button>
            <button class="action-btn primary" type="button" data-git-action="sync" ${status.canSync ? '' : 'disabled'}>sync</button>
            <button class="action-btn" type="button" data-git-action="copy-change-list" ${allChangedFiles.length ? '' : 'disabled'}>${state.lang === 'zh' ? '复制全部路径' : 'Copy All Paths'}</button>
          </div>
          <div style="margin-top:12px;">${allChangesTreeHtml}</div>
        </div>
      </div>
      </div>
      </div>
    `;

    updateInnerTabBody('git-sync-advanced', contentHtml);
    syncInnerTabState('git-sync-advanced', currentAdvancedView);

    const bindGitSyncPanel = () => {
      bindTopLevelGitSync();
      document.querySelectorAll('[data-git-sync-advanced-section]').forEach((section) => {
        section.hidden = section.getAttribute('data-git-sync-advanced-section') !== state.gitSyncAdvancedView;
      });
      document.querySelectorAll('[data-git-sync-advanced-view]').forEach((button) => {
        button.addEventListener('click', () => {
          const nextView = normalizeGitSyncAdvancedView(button.getAttribute('data-git-sync-advanced-view'));
          if (nextView === state.gitSyncAdvancedView) return;
          state.gitSyncAdvancedView = nextView;
          syncInnerTabState('git-sync-advanced', nextView);
          updateInnerTabBody('git-sync-advanced', getAdvancedLoadingCard(nextView));
          loadGitSync({ reuseExisting: true });
        });
      });
      document.getElementById('gitignore-mode')?.addEventListener('change', (event) => {
        state.gitSyncIgnoreMode = event.target.value === 'exact' ? 'exact' : 'smart';
        loadGitSync({ reuseExisting: true, showSubviewLoading: true });
      });

      document.querySelectorAll('[data-git-action]').forEach((button) => {
        button.addEventListener('click', async () => {
          const action = button.getAttribute('data-git-action');
          try {
            if (action === 'refresh-status') {
              await loadGitSync({ reuseExisting: true, showSubviewLoading: true });
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
            if (action === 'copy-change-list') {
              await copyTextValue(allChangedFiles.join('\n'), {
                successMessage: state.lang === 'zh' ? '全部变更路径已复制。' : 'All changed paths copied.',
                emptyMessage: state.lang === 'zh' ? '当前没有待复制的变更路径。' : 'There are no changed paths to copy.',
              });
              return;
            }
            if (action === 'copy-stageable-list') {
              await copyTextValue(stageableChangedFiles.join('\n'), {
                successMessage: state.lang === 'zh' ? '可提交路径清单已复制。' : 'Stageable path list copied.',
                emptyMessage: state.lang === 'zh' ? '当前没有可提交路径。' : 'There are no stageable paths.',
              });
              return;
            }
            if (action === 'copy-skipped-list') {
              await copyTextValue(skippedEmbeddedRepos.map((repoPath) => `${repoPath}/`).join('\n'), {
                successMessage: state.lang === 'zh' ? '嵌套仓库列表已复制。' : 'Embedded repository list copied.',
                emptyMessage: state.lang === 'zh' ? '当前没有嵌套仓库路径。' : 'There are no embedded repositories.',
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
              await loadGitSync({ reuseExisting: true });
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
              await loadGitSync({ reuseExisting: true });
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
              await loadGitSync({ reuseExisting: true });
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
              await loadGitSync({ reuseExisting: true });
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
            if (action === 'copy-scope-ignore-template') {
              await copyTextValue(scopeIgnoreBlock, {
                successMessage: state.lang === 'zh' ? '推荐排除模板已复制。' : 'Exclusion template copied.',
                emptyMessage: state.lang === 'zh' ? '当前没有可复制的推荐排除模板。' : 'No exclusion template is available right now.',
              });
              return;
            }
            if (action === 'preview-gitignore') {
              const previewResult = await apiRequest(`/api/git-sync/gitignore-preview?mode=${encodeURIComponent(state.gitSyncIgnoreMode === 'exact' ? 'exact' : 'smart')}`);
              rememberGitAction({
                success: true,
                message: state.lang === 'zh'
                  ? (previewResult?.willChange ? '已刷新 .gitignore 差异预览。' : '.gitignore 预览已刷新，当前无需追加规则。')
                  : (previewResult?.willChange ? '.gitignore diff preview refreshed.' : '.gitignore preview refreshed, no new rules are required.'),
              }, previewResult);
              await loadGitSync({ reuseExisting: true });
              return;
            }
            if (action === 'apply-gitignore') {
              const result = await postJson('/api/git-sync/gitignore-apply', { mode: state.gitSyncIgnoreMode === 'exact' ? 'exact' : 'smart' });
              rememberGitAction(result, result?.preview || result?.status || null);
              queuePanelFocus('git-sync', '#gitignore-preview-card');
              await loadGitSync({ reuseExisting: true });
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
                await loadGitSync({ reuseExisting: true });
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
              await loadGitSync({ reuseExisting: true });
              return;
            }
            if (action === 'commit' || action === 'sync') {
              const message = document.querySelector('[name="gitCommitMessage"]')?.value.trim() || '';
              state.gitSyncDraftMessage = message;
              const result = await postJson(`/api/git-sync/${action}`, { message });
              rememberGitAction(result);
              await loadGitSync({ reuseExisting: true });
              return;
            }
          } catch (error) {
            rememberGitAction({ success: false, message: error.message || String(error) });
            await loadGitSync({ reuseExisting: true });
          }
        });
      });

      document.querySelector('[name="gitCommitMessage"]')?.addEventListener('input', (event) => {
        state.gitSyncDraftMessage = event.target.value;
      });

      applyPendingPanelFocus('git-sync');
    };

    bindGitSyncPanel();
    rememberCurrentPanelRender(viewTabId, bindGitSyncPanel);

    clearGitSyncPollTimer();
    if ((oauth.phase === 'authorizing' || status.cache?.refreshing || gitignorePreview?.cache?.refreshing) && state.activeTab === 'git-sync') {
      state.gitSyncPollTimer = setTimeout(() => {
        if (state.activeTab === 'git-sync') {
          loadGitSync({ reuseExisting: true });
        }
      }, 3000);
    }
  }

  function getSecurityModeMeta(profileKey) {
    if (profileKey === 'chat') {
      return {
        label: state.lang === 'zh' ? '最严格' : 'Most Strict',
        pillClass: 'success',
      };
    }
    if (profileKey === 'readonly') {
      return {
        label: state.lang === 'zh' ? '只读优先' : 'Read-first',
        pillClass: 'success',
      };
    }
    if (profileKey === 'coding') {
      return {
        label: state.lang === 'zh' ? '平衡' : 'Balanced',
        pillClass: 'warn',
      };
    }
    if (profileKey === 'devops') {
      return {
        label: state.lang === 'zh' ? '高权限' : 'Elevated',
        pillClass: 'warn',
      };
    }
    return {
      label: state.lang === 'zh' ? '高风险' : 'High Risk',
      pillClass: 'danger',
    };
  }

  function renderSecurityAuditSection(data) {
    const groups = {};
    (data.results || []).forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return `
      <div class="card accent-info">
        <h3>${state.lang === 'zh' ? '安全检查（Beta）' : 'Security Checks (Beta)'}</h3>
        <div class="status warn">${escapeHtml(state.lang === 'zh'
          ? '这一部分更像建议型检查，而不是安全达标证明。优先处理失败项，其次处理警告项。'
          : 'This section behaves like advisory checks, not a formal proof of compliance. Handle failures first, then warnings.')}</div>
      </div>
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '通过项' : 'Pass', formatNumber(data.summary?.pass || 0), state.lang === 'zh' ? '当前无需处理' : 'no action needed', 'success')}
        ${metricCard(state.lang === 'zh' ? '警告项' : 'Warning', formatNumber(data.summary?.warn || 0), state.lang === 'zh' ? '建议尽快检查' : 'recommended to review', 'warn')}
        ${metricCard(state.lang === 'zh' ? '失败项' : 'Fail', formatNumber(data.summary?.fail || 0), state.lang === 'zh' ? '需要优先处理' : 'highest priority', 'danger')}
      </div>
      <div class="stack" style="margin-top:14px;">
        ${Object.entries(groups).map(([category, items]) => `
          <div class="card">
            <h3>${escapeHtml(category)}</h3>
            <div class="list" style="margin-top:12px;">
              ${items.map((item) => `
                <div class="list-item">
                  <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                    <strong>${escapeHtml(item.item)}</strong>
                    <span class="pill ${getAuditStatusClass(item.status)}">${escapeHtml(getAuditStatusLabel(item.status))}</span>
                  </div>
                  <div style="margin-top:8px;">${escapeHtml(item.message)}</div>
                  ${item.fix ? `<div class="muted small" style="margin-top:8px;">${escapeHtml((state.lang === 'zh' ? '建议处理：' : 'Suggested fix: ') + item.fix)}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('') || emptyState(state.lang === 'zh' ? '当前没有审计结果。' : 'No audit results are available right now.')}
      </div>
    `;
  }

  function renderSecurityModesSection(profiles) {
    return profiles.length ? `
      <div class="card accent-warn">
        <h3>${state.lang === 'zh' ? '权限模式' : 'Permission Modes'}</h3>
        <div class="status warn">${escapeHtml(state.lang === 'zh'
          ? '这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动创建系统账户、修改 ACL、启用 Docker 或完成整机加固。'
          : 'These modes currently update only the OpenClaw tool-permission config. They do not automatically create system users, change ACLs, enable Docker, or complete host hardening.')}</div>
      </div>
      <div class="grid">
        ${profiles.map((profile) => {
          const meta = getSecurityModeMeta(profile.key);
          const allowRules = Array.isArray(profile.tools?.allow) ? profile.tools.allow : [];
          const denyRules = Array.isArray(profile.tools?.deny) ? profile.tools.deny : [];
          return `
            <div class="card">
              <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
                <h3>${escapeHtml(profile.name)}</h3>
                <span class="pill ${meta.pillClass}">${escapeHtml(meta.label)}</span>
              </div>
              <p>${escapeHtml(profile.description || '')}</p>
              <div class="list" style="margin-top:12px;">
                ${(profile.recommendations || []).map((item) => `<div class="list-item">${escapeHtml(item)}</div>`).join('')}
              </div>
              ${renderAdvancedDisclosure({
                title: state.lang === 'zh' ? '查看权限变更范围' : 'View Permission Scope',
                description: state.lang === 'zh' ? '这里显示该模式会写入 openclaw.json 的工具规则。' : 'This shows the tool rules that will be written into openclaw.json.',
                bodyHtml: `<pre>${escapeHtml([
                  `allow: ${allowRules.length ? allowRules.join(', ') : '(none)'}`,
                  `deny: ${denyRules.length ? denyRules.join(', ') : '(none)'}`,
                ].join('\n'))}</pre>`,
              })}
              <div class="toolbar tight" style="margin-top:12px;">
                <button class="action-btn primary" data-security-profile-key="${escapeHtml(profile.key)}">${state.lang === 'zh' ? '应用权限模式' : 'Apply Permission Mode'}</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    ` : emptyState(state.lang === 'zh' ? '当前没有可用的权限模式。' : 'No permission modes are available right now.');
  }

  function renderSecurityHardeningSection(data) {
    const steps = Array.isArray(data.steps) ? data.steps : [];
    const hardenStepsHtml = steps.map((step) => `
      <div class="list-item">
        <div class="row" style="justify-content:space-between; align-items:flex-start; gap:12px;">
          <strong>${escapeHtml(step.title || step.id || '-')}</strong>
          <span class="pill ${step.optional ? '' : 'warn'}">${escapeHtml(step.optional ? (state.lang === 'zh' ? '可选' : 'Optional') : (state.lang === 'zh' ? '建议' : 'Recommended'))}</span>
        </div>
        <div style="margin-top:8px;">${escapeHtml(step.description || '')}</div>
        ${renderAdvancedDisclosure({
          title: state.lang === 'zh' ? '查看命令与脚本' : 'View Commands',
          description: state.lang === 'zh' ? '只有在你准备执行这一步时，再展开查看对应命令。' : 'Expand this only when you are ready to run the commands for this step.',
          bodyHtml: `<pre>${escapeHtml((step.commands || []).join('\n') || (state.lang === 'zh' ? '当前没有附带命令。' : 'No commands are attached to this step.'))}</pre>`,
          marginTop: 12,
        })}
      </div>
    `).join('');
    return `
      <div class="card">
        <h3>${state.lang === 'zh' ? '主机加固指南（Beta）' : 'Host Hardening Guide (Beta)'}</h3>
        <div class="status">${escapeHtml(state.lang === 'zh'
          ? '基线建议在所有平台都一样：尽量使用非管理员账户运行，并限制工作区范围。Windows 上的“独立低权限账户”更适合长期后台运行或共享机器场景，不应作为所有用户的默认强制项。'
          : 'The baseline is the same on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.')}</div>
      </div>
      <div class="toolbar tight" style="margin-top:14px;">
        <button class="chip ${state.hardenPlatform === 'windows' ? 'active' : ''}" data-security-platform="windows">Windows</button>
        <button class="chip ${state.hardenPlatform === 'macos' ? 'active' : ''}" data-security-platform="macos">macOS</button>
        <button class="chip ${state.hardenPlatform === 'linux' ? 'active' : ''}" data-security-platform="linux">Linux</button>
        <a class="action-btn primary" href="/api/harden/script?platform=${encodeURIComponent(state.hardenPlatform)}">${state.lang === 'zh' ? '下载脚本' : 'Download Script'}</a>
      </div>
      <div class="list" style="margin-top:14px;">${hardenStepsHtml || emptyState(state.lang === 'zh' ? '当前平台还没有可显示的加固步骤。' : 'No hardening steps are available for this platform right now.')}</div>
    `;
  }

  function bindSecurityView() {
    document.querySelectorAll('[data-security-profile-key]').forEach((button) => {
      button.addEventListener('click', async () => {
        try {
          const result = await postJson('/api/profiles/apply', { profile: button.getAttribute('data-security-profile-key') });
          showToast(result.message || 'OK');
        } catch (error) {
          showToast(error.message || String(error), 'error');
        }
      });
    });
    document.querySelectorAll('[data-security-platform]').forEach((button) => {
      button.addEventListener('click', () => {
        state.hardenPlatform = button.getAttribute('data-security-platform') || state.hardenPlatform;
        loadSecurity({ reuseExisting: true, showSubviewLoading: true });
      });
    });
  }

  async function loadSecurity(options = {}) {
    const viewTabId = 'security';
    if (!state.hardenPlatform) {
      state.hardenPlatform = navigator.platform.toLowerCase().includes('win') ? 'windows' : navigator.platform.toLowerCase().includes('mac') ? 'macos' : 'linux';
    }
    state.securityView = normalizeSecurityView(state.securityView);
    const currentView = state.securityView;
    const reuseExisting = options.reuseExisting === true && !!document.querySelector('[data-subview-body="security"]');
    const getLoadingCard = () => {
      if (currentView === 'modes') {
        return loadingCard(state.lang === 'zh' ? '权限模式' : 'Permission Modes', state.lang === 'zh' ? '正在读取可用模式…' : 'Loading available modes…');
      }
      if (currentView === 'hardening') {
        return loadingCard(state.lang === 'zh' ? '主机加固指南' : 'Host Hardening Guide', state.lang === 'zh' ? '正在读取平台加固建议…' : 'Loading platform guidance…');
      }
      return loadingCard(state.lang === 'zh' ? '安全检查' : 'Security Checks', state.lang === 'zh' ? '正在读取安全检查结果…' : 'Loading security checks…');
    };

    const bindSecurityPanel = () => {
      document.querySelectorAll('[data-security-view]').forEach((button) => {
        button.addEventListener('click', () => {
          const nextView = normalizeSecurityView(button.getAttribute('data-security-view'));
          if (nextView === state.securityView) return;
          state.securityView = nextView;
          syncInnerTabState('security', nextView);
          updateInnerTabBody('security', getLoadingCard());
          loadSecurity({ reuseExisting: true });
        });
      });
      bindSecurityView();
    };

    if (!reuseExisting) {
      setPanel(
        t('tabs.security'),
        t('desc.security'),
        renderInnerTabShell({
          groupId: 'security',
          tabs: SECURITY_VIEW_TABS,
          activeId: currentView,
          attrName: 'data-security-view',
          label: t('tabs.security'),
          contentHtml: getLoadingCard(),
        }),
      );
      bindSecurityPanel();
    } else {
      syncInnerTabState('security', currentView);
      if (options.showSubviewLoading) {
        updateInnerTabBody('security', getLoadingCard());
      }
    }

    let contentHtml = '';
    if (currentView === 'modes') {
      const profiles = await apiRequest('/api/profiles');
      if (state.activeTab !== viewTabId || state.securityView !== currentView) return;
      contentHtml = renderSecurityModesSection(Array.isArray(profiles) ? profiles : []);
    } else if (currentView === 'hardening') {
      const hardenData = await apiRequest(`/api/harden/steps?platform=${encodeURIComponent(state.hardenPlatform)}`);
      if (state.activeTab !== viewTabId || state.securityView !== currentView) return;
      contentHtml = renderSecurityHardeningSection(hardenData);
    } else {
      const auditData = await apiRequest('/api/audit');
      if (state.activeTab !== viewTabId || state.securityView !== currentView) return;
      contentHtml = renderSecurityAuditSection(auditData);
    }

    updateInnerTabBody('security', contentHtml);
    bindSecurityPanel();
    rememberCurrentPanelRender(viewTabId, bindSecurityPanel);
  }

  async function loadLogs() {
    const serviceLogs = await apiRequest('/api/service/logs?lines=200').catch(() => ({ logs: [] }));
    const logLines = Array.isArray(serviceLogs.logs) ? serviceLogs.logs : [];
    const logError = typeof logLines[0] === 'string' && /^(获取日志失败|Failed to fetch logs)/.test(logLines[0]);
    const body = `
      <div class="grid">
        ${metricCard(state.lang === 'zh' ? '日志来源' : 'Source', 'Gateway RPC', state.lang === 'zh' ? '当前仅展示 Gateway 日志' : 'Gateway logs only')}
        ${metricCard(state.lang === 'zh' ? '日志行数' : 'Log Lines', formatNumber(logLines.length), state.lang === 'zh' ? '最近读取结果' : 'latest loaded result', logError ? 'warn' : '')}
      </div>
      ${renderPageTip({
        title: state.lang === 'zh' ? '排查提示' : 'Troubleshooting Tip',
        tone: logError ? 'warn' : 'info',
        body: state.lang === 'zh'
          ? '当服务启动失败、连接异常或动作报错时，先刷新这一页，再看最近日志；如果日志仍为空，再回到运维确认服务状态。'
          : 'When startup, connectivity, or action failures occur, refresh this page first and then inspect the latest log lines. If logs stay empty, go back to Operations and confirm the service state.',
      })}
      <div class="toolbar tight">
        <button class="chip active" data-logs-target="service">Gateway</button>
        <button class="action-btn" data-logs-action="reload">${escapeHtml(t('reload'))}</button>
      </div>
      <div class="card">
        ${logError ? `<div class="status warn">${escapeHtml(logLines[0])}</div>` : ''}
        ${renderAdvancedDisclosure({
          title: state.lang === 'zh' ? '查看最近 200 行日志' : 'View The Latest 200 Log Lines',
          description: state.lang === 'zh' ? '日志内容较长时，默认折叠显示。需要排查问题时再展开查看。' : 'Logs can be long, so they stay folded by default. Expand them when you need to investigate an issue.',
          bodyHtml: `<pre>${escapeHtml(logLines.join('\n') || (state.lang === 'zh' ? '当前没有可显示的日志内容。' : 'No log content is available right now.'))}</pre>`,
          marginTop: logError ? 12 : 0,
        })}
      </div>
      </div>
      </div>
    `;
    setPanel(t('tabs.logs'), t('desc.logs'), body);
    document.querySelector('[data-logs-action="reload"]')?.addEventListener('click', () => loadLogs());
  }

  async function loadActiveTab(forceRefresh = false) {
    const active = state.activeTab || 'overview';
    if (active !== 'git-sync') clearGitSyncPollTimer();
    if (active !== 'openclaw') clearOpenClawPollTimer();
    if (active !== 'cron') clearCronPollTimer();
    if (active !== 'overview' && active !== 'sessions') {
      clearRuntimeViewPollTimer();
    }
    if (active !== 'overview' && active !== 'system') {
      clearServicePollTimer();
      clearPrewarmPollTimer();
    }
    const restoredFromCache = restoreCachedPanel(active, forceRefresh
      ? (state.lang === 'zh'
        ? '已保留当前页面内容，同时正在拉取最新数据。'
        : 'Keeping the current view on screen while fetching the latest data.')
      : (state.lang === 'zh'
        ? '当前页正在后台刷新最新数据，先显示上一次成功加载的内容。'
        : 'Refreshing the latest data in the background. Showing the last successful result first.'), {
      manualRefresh: forceRefresh,
    });
    if (!restoredFromCache && !['overview', 'system', 'openclaw', 'git-sync', 'security', 'search'].includes(active)) {
      renderTabLoadingState(active);
    }
    try {
      const loadOptions = { reuseExisting: restoredFromCache, forceRefresh };
      if (active === 'overview') return await loadOverview(loadOptions);
      if (active === 'system') return await loadSystem(loadOptions);
      if (active === 'openclaw') return await loadOpenClawTab(loadOptions);
      if (active === 'channels') return await loadChannels();
      if (active === 'models') return await loadAI();
      if (active === 'notifications') return await loadNotifications();
      if (active === 'agents') return await loadAgents();
      if (active === 'sessions') return await loadSessions();
      if (active === 'files') return await loadFiles();
      if (active === 'search') return await loadSearch();
      if (active === 'cron') return await loadCron();
      if (active === 'git-sync') return await loadGitSync(loadOptions);
      if (active === 'security') return await loadSecurity(loadOptions);
      if (active === 'logs') return await loadLogs();
      return await loadOverview(loadOptions);
    } catch (error) {
      if (restoredFromCache && restoreCachedPanelWithError(active, error)) {
        return;
      }
      setPanel(t(`tabs.${active}`), t(`desc.${active}`), `<div class="status error">${escapeHtml(error.message || String(error))}</div><pre>${escapeHtml(error.stack || '')}</pre>`);
    }
  }

  const initialHash = (location.hash || '').replace(/^#/, '');
  const storedTab = localStorage.getItem(STORAGE_TAB) || 'overview';
  const requestedInitialTab = initialHash || storedTab;
  const initialSecurityView = getLegacySecurityView(requestedInitialTab);
  state.filesMode = initialHash === 'memory' || (!initialHash && storedTab === 'memory') ? 'memory' : 'all';
  state.notificationView = (!initialHash && storedTab === 'activity') || initialHash === 'activity'
    ? 'timeline'
    : 'reminders';
  if (requestedInitialTab === 'recovery') {
    state.gitSyncView = 'recovery';
  }
  if (requestedInitialTab === 'feishu') {
    state.channelSelectedId = 'feishu';
    state.activeTab = 'channels';
    if (initialHash) history.replaceState(null, '', '#channels');
  } else if (requestedInitialTab === 'memory') {
    state.activeTab = 'files';
    if (initialHash) history.replaceState(null, '', '#files');
  } else if (initialSecurityView) {
    state.securityView = initialSecurityView;
    state.activeTab = 'security';
    if (initialHash) history.replaceState(null, '', '#security');
  } else {
    state.activeTab = normalizeTabId(requestedInitialTab);
    if (initialHash && state.activeTab !== initialHash) {
      history.replaceState(null, '', `#${state.activeTab}`);
    }
  }
  if (!TAB_ORDER.includes(state.activeTab)) state.activeTab = 'overview';

  window.addEventListener('hashchange', async () => {
    const next = (location.hash || '').replace(/^#/, '');
    if (next === 'feishu') {
      state.channelSelectedId = 'feishu';
      setActiveTab('channels');
      return;
    }
    if (next === 'memory') {
      if (state.activeTab === 'files') {
        await updateFilesMode('memory');
        history.replaceState(null, '', '#files');
        return;
      }
      state.filesMode = 'memory';
      setActiveTab('files');
      return;
    }
    if (next === 'activity') {
      state.notificationView = 'timeline';
      setActiveTab('notifications');
      return;
    }
    if (next === 'recovery') {
      state.gitSyncView = 'recovery';
      if (state.activeTab === 'git-sync') {
        history.replaceState(null, '', '#git-sync');
        loadGitSync({ reuseExisting: true, showSubviewLoading: true });
        return;
      }
      setActiveTab('git-sync');
      return;
    }
    if (next === 'costs') {
      setActiveTab('sessions');
      return;
    }
    const nextSecurityView = getLegacySecurityView(next);
    if (nextSecurityView) {
      state.securityView = nextSecurityView;
      if (state.activeTab === 'security') {
        history.replaceState(null, '', '#security');
        loadSecurity({ reuseExisting: true, showSubviewLoading: true });
        return;
      }
      setActiveTab('security');
      return;
    }
    if (next === 'notifications') {
      state.notificationView = 'reminders';
    }
    const normalizedNext = normalizeTabId(next);
    if (normalizedNext !== state.activeTab) {
      setActiveTab(normalizedNext, normalizedNext === next ? false : true);
    }
  });

  // 启动时先检测鉴权状态，再决定显示登录页还是主界面
  (async function bootstrap() {
    try {
      const authStatus = await fetch('/api/auth/status').then((r) => r.json());
      state.authEnabled = authStatus.enabled;
      state.authConfigured = authStatus.configured === true;
      state.authInitialPasswordAvailable = authStatus.initialPasswordAvailable === true;
      if (typeof authStatus.revealCommand === 'string' && authStatus.revealCommand.trim()) {
        state.authRevealCommand = authStatus.revealCommand.trim();
      }
      if (!authStatus.enabled) {
        // 鉴权关闭（GUARD_NO_AUTH=1），直接进入主界面
        renderShell();
        loadActiveTab();
        return;
      }
    } catch {
      // 无法检测时，降级为假设已启用鉴权
      state.authEnabled = true;
      state.authConfigured = false;
      state.authInitialPasswordAvailable = null;
    }
    // 有 token 时先进入，如果 token 无效 apiRequest 会捕获 401 并重新触发 renderLoginPage
    if (state.authToken) {
      renderShell();
      loadActiveTab();
    } else {
      renderLoginPage();
    }
  })();

})();
