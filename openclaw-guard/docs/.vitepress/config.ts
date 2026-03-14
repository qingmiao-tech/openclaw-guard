import { defineConfig } from 'vitepress';

const base = process.env.GITHUB_ACTIONS ? '/openclaw-guard/' : '/';

export default defineConfig({
  lang: 'zh-CN',
  title: 'OpenClaw Guard Docs',
  description: 'OpenClaw Guard 官方文档：安装、配置、备份恢复、安全与排障指南。',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${base}logo.png` }],
    ['meta', { name: 'theme-color', content: '#0f5fae' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'OpenClaw Guard',
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/getting-started' },
      { text: '核心能力', link: '/console-overview' },
      { text: '排障支持', link: '/troubleshooting' },
      { text: 'GitHub', link: 'https://github.com/qingmiao-tech/openclaw-guard' },
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '项目介绍', link: '/' },
          { text: '快速开始', link: '/getting-started' },
          { text: '控制台导览', link: '/console-overview' },
        ],
      },
      {
        text: '核心路径',
        items: [
          { text: 'OpenClaw 生命周期', link: '/openclaw-lifecycle' },
          { text: '备份与恢复', link: '/backup-and-recovery' },
          { text: '安全与防误触', link: '/security' },
          { text: '渠道与模型', link: '/channels-and-models' },
          { text: '工作区工具', link: '/workspace-tools' },
        ],
      },
      {
        text: '支持与维护',
        items: [
          { text: '排障与诊断包', link: '/troubleshooting' },
          { text: 'FAQ', link: '/faq' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/qingmiao-tech/openclaw-guard' },
    ],
    footer: {
      message: 'Built for a safer and more recoverable OpenClaw workflow.',
      copyright: 'MIT License © Qingmiao Tech',
    },
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '文档导航',
    darkModeSwitchLabel: '主题切换',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
});
