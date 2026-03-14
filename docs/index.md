---
layout: home

hero:
  name: OpenClaw Guard
  text: 给 OpenClaw 穿上“防弹衣”与“复活甲”
  tagline: 一个更稳、更安全、可恢复的 OpenClaw 控制台。先装得上，再保得住，出问题还能自救。
  image:
    src: /hero.png
    alt: OpenClaw Guard Hero
  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started
    - theme: alt
      text: 控制台导览
      link: /console-overview
    - theme: alt
      text: GitHub
      link: https://github.com/qingmiao-tech/openclaw-guard

features:
  - title: 先装得上
    details: 自动检查 Node、OpenClaw 与 Guard Web 状态，支持整机初始化、安装、修复和一键启动。
  - title: 再保得住
    details: 把“保存现在 / 恢复到某个状态 / 恢复后继续往前走”做成普通用户也能理解的备份与恢复体验。
  - title: 出问题能自救
    details: 提供安全预设、运行状态、日志、诊断包和恢复建议，不需要先懂一堆 Git 或运维术语。
---

## 为什么是 Guard

OpenClaw Guard 不是想替代 OpenClaw，而是给 OpenClaw 增加一层更适合真实使用的控制台能力：

- 帮你把安装、修复、更新、回退这些高频运维动作做成清晰路径
- 帮你把记忆、角色、工作区、长期资料纳入保护视图
- 帮你在“想自由折腾”和“不能彻底玩坏”之间找到平衡

如果你第一次接触 OpenClaw，不想一上来就看见 Git、Cron、OAuth、插件机制这些概念，那么 Guard 首页会先只讲最核心的 4 条主路径：

1. 安装 / 修复 OpenClaw
2. 配置模型
3. 连接渠道
4. 开启备份与恢复

::: tip 推荐理解方式
把 Guard 当成 OpenClaw 的“机器侧控制台”，而不是一个新的大而全平台。它最重要的价值不是堆功能，而是把关键路径做得更可靠、更可恢复。
:::

## 适合哪些人

### 个人用户

- 想快速在自己电脑上把 OpenClaw 跑起来
- 担心“玩坏了回不去”
- 希望有一个清晰的 Web 控制台来管理模型、渠道、安全和恢复

### 技术支持 / 交付 / 客户现场

- 需要更可控的安装与修复路径
- 需要导出脱敏诊断信息做远程协助
- 需要给非技术用户一个更容易理解的入口

### 团队内部试用

- 想先把高风险操作加上安全预设
- 想对工作区、记忆和恢复点有更清楚的观察与回退手段

## 你会在文档里找到什么

- [快速开始](/getting-started)：从安装到首次进入工作台
- [控制台导览](/console-overview)：首页和主要菜单怎么理解
- [OpenClaw 生命周期](/openclaw-lifecycle)：安装、更新、回退、卸载、修复
- [备份与恢复](/backup-and-recovery)：恢复点、主线续写、高级 Git
- [安全与防误触](/security)：安全检查、权限模式、主机加固
- [排障与诊断包](/troubleshooting)：日志、支持信息、如何提 Issue

## 支持平台

| 平台 | 状态 | 说明 |
| --- | --- | --- |
| Windows | Supported | 推荐从这里开始，启动脚本和后台管理链路最完整。 |
| macOS | Supported | 支持工作台、安全建议和常规生命周期管理。 |
| Linux | Supported | 首发重点覆盖 Debian/Ubuntu、Fedora/RHEL、Arch 三类常见发行版。 |
