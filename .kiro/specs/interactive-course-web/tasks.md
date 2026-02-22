# Implementation Plan: OpenClaw 课程交互式网页版

## Overview

使用 Astro + Tailwind CSS + TypeScript 构建静态交互式课程网站。采用增量方式：先搭建项目骨架和核心解析逻辑，再逐步添加交互组件，最后集成搜索和进度追踪功能。

## Tasks

- [x] 1. 初始化 Astro 项目与基础配置
  - [x] 1.1 创建 Astro 项目，安装依赖（tailwindcss, @astrojs/mdx, shiki, mermaid, fuse.js, fast-check）
    - 初始化 `package.json`、`astro.config.mjs`、`tailwind.config.mjs`、`tsconfig.json`
    - 配置 Astro 的 Markdown 处理和 Shiki 代码高亮
    - _Requirements: 10.1, 10.4_
  - [x] 1.2 创建基础布局和主题系统
    - 创建 `src/layouts/BaseLayout.astro`，包含 HTML 骨架、Tailwind 样式、dark mode CSS 变量
    - 创建 `src/styles/global.css`，定义排版、颜色主题（light/dark）、响应式断点
    - _Requirements: 7.1, 7.4, 7.5_
  - [x] 1.3 定义核心 TypeScript 类型和课程结构数据
    - 创建 `src/types.ts`，定义 ChapterMeta、SectionSlide、ChecklistItem、Tier 等接口
    - 创建 `src/data/course-structure.ts`，定义 COURSE_TIERS 和章节分组数据
    - 创建 `src/utils/chapter-id.ts`，实现 parseChapterId 文件名解析函数
    - _Requirements: 2.1, 2.6_

- [x] 2. 实现 Markdown 解析插件
  - [x] 2.1 实现 remark-section-slides 插件
    - 创建 `src/plugins/remark-section-slides.ts`
    - 按 "第 N 页" 标题拆分 Markdown AST 为 SectionSlide 节点
    - 为每个 slide 生成 slug 用于锚点导航
    - _Requirements: 1.1, 1.6_
  - [ ]* 2.2 编写 Section Slide 解析属性测试
    - **Property 1: Section Slide 解析保持结构**
    - **Validates: Requirements 1.6**
  - [x] 2.3 实现 remark-callout 插件
    - 创建 `src/plugins/remark-callout.ts`
    - 将带 emoji 前缀的 blockquote 转换为 callout 节点，映射 emoji 到类型（tip/warning/danger/info）
    - _Requirements: 1.5_
  - [ ]* 2.4 编写 Callout 类型映射属性测试
    - **Property 2: Callout 类型映射**
    - **Validates: Requirements 1.5**
  - [x] 2.5 实现 remark-collapsible 插件
    - 创建 `src/plugins/remark-collapsible.ts`
    - 识别包含关键词（故障排查速查、延伸阅读、进阶配置、安全提示）的标题，标记为可折叠区域
    - _Requirements: 4.1_
  - [ ]* 2.6 编写可折叠区域检测属性测试
    - **Property 3: 可折叠区域检测**
    - **Validates: Requirements 4.1**
  - [x] 2.7 实现 remark-checklist 插件
    - 创建 `src/plugins/remark-checklist.ts`
    - 将验收自检区域的 `- [ ]` 列表转换为 ChecklistItem 数据
    - _Requirements: 6.1_
  - [x] 2.8 实现 remark-task-area 插件
    - 创建 `src/plugins/remark-task-area.ts`
    - 识别实操任务区域、成功标志、任务总览表，添加特殊 CSS 类标记
    - _Requirements: 9.1, 9.2, 9.3_
  - [ ]* 2.9 编写实操任务区域检测属性测试
    - **Property 12: 实操任务区域检测与标记**
    - **Validates: Requirements 9.1, 9.2, 9.3**

- [x] 3. Checkpoint - 确保解析插件测试通过
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. 实现导航系统
  - [x] 4.1 实现侧边栏组件
    - 创建 `src/components/Sidebar.astro`
    - 按层级分组显示所有 18 个章节，高亮当前章节
    - 响应式：≥768px 显示为固定面板，<768px 折叠为汉堡菜单
    - _Requirements: 2.1, 2.2, 7.2, 7.3_
  - [x] 4.2 实现页内目录组件和 TOC 生成逻辑
    - 创建 `src/utils/toc.ts`，实现从 SectionSlide 数组生成 TocItem 数组的函数
    - 创建 `src/components/TableOfContents.astro`，显示当前章节的 Section_Slide 列表
    - _Requirements: 2.3, 2.4_
  - [ ]* 4.3 编写 TOC 生成属性测试
    - **Property 4: 页内目录生成**
    - **Validates: Requirements 2.3**
  - [x] 4.4 实现章节底部导航和导航链接生成逻辑
    - 创建 `src/utils/chapter-nav.ts`，实现 getPrevNext 函数
    - 创建 `src/components/ChapterNav.astro`，显示上一章/下一章链接
    - _Requirements: 2.5_
  - [ ]* 4.5 编写上一章/下一章导航属性测试
    - **Property 5: 上一章/下一章导航**
    - **Validates: Requirements 2.5**

- [x] 5. 实现交互组件
  - [x] 5.1 实现 Code Block 组件
    - 创建 `src/components/CodeBlock.astro`
    - 显示语言标签（左上角）和复制按钮（右上角）
    - 实现复制到剪贴板逻辑，点击后显示"已复制"反馈 2 秒
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [x] 5.2 实现 Collapsible Section 组件
    - 创建 `src/components/CollapsibleSection.astro`（或使用客户端 JS island）
    - 默认折叠，点击标题切换展开/折叠，带 CSS transition 动画和 chevron 图标
    - _Requirements: 4.2, 4.3, 4.4_
  - [x] 5.3 实现 Callout 组件
    - 创建 `src/components/Callout.astro`
    - 根据类型（tip/warning/danger/info）应用不同颜色和图标样式
    - _Requirements: 1.5_
  - [x] 5.4 实现 Mermaid 渲染组件
    - 创建 `src/components/MermaidDiagram.astro`
    - 在客户端加载 mermaid.js 并渲染 Mermaid 代码块为 SVG
    - _Requirements: 1.3_
  - [x] 5.5 实现 Task Area 组件
    - 创建 `src/components/TaskArea.astro` 和 `src/components/TaskOverview.astro`
    - 实操任务区域使用左侧彩色边框 + 浅色背景，成功标志渲染为高亮列表
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 6. 实现进度追踪与清单系统
  - [x] 6.1 实现 Progress Tracker 模块
    - 创建 `src/utils/progress.ts`
    - 实现 getProgress、setChapterCompleted、getChapterProgress、getOverallCompletion、toggleChecklistItem、isChapterCompleted 函数
    - 处理 localStorage 不可用的降级逻辑
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ]* 6.2 编写进度数据持久化往返属性测试
    - **Property 6: 学习进度数据持久化往返**
    - **Validates: Requirements 5.2, 5.3**
  - [ ]* 6.3 编写清单状态持久化往返属性测试
    - **Property 7: 清单状态持久化往返**
    - **Validates: Requirements 6.2, 6.3**
  - [ ]* 6.4 编写自动完成属性测试
    - **Property 8: 清单全部勾选触发自动完成**
    - **Validates: Requirements 5.4, 6.4**
  - [ ]* 6.5 编写总体完成百分比属性测试
    - **Property 9: 总体完成百分比计算**
    - **Validates: Requirements 5.1**
  - [x] 6.6 实现 Checklist 交互组件
    - 创建 `src/components/Checklist.astro`（客户端 island）
    - 渲染交互式 checkbox 列表，勾选时调用 Progress Tracker 持久化
    - 全部勾选时显示 🎉 完成徽章
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 6.7 实现课程首页进度展示
    - 在首页为每个章节显示完成百分比和整体进度条
    - _Requirements: 5.1, 5.5_

- [x] 7. Checkpoint - 确保进度追踪测试通过
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. 实现暗色模式与搜索功能
  - [x] 8.1 实现暗色模式切换
    - 创建 `src/components/ThemeToggle.astro`
    - 切换 light/dark 主题，持久化偏好到 localStorage，页面加载时恢复
    - _Requirements: 7.5, 7.6_
  - [ ]* 8.2 编写暗色模式偏好持久化属性测试
    - **Property 10: 暗色模式偏好持久化往返**
    - **Validates: Requirements 7.6**
  - [x] 8.3 实现搜索索引构建
    - 创建 `src/utils/search-index.ts`，构建时从所有章节生成搜索索引 JSON
    - 每个条目包含 chapterId、chapterTitle、slideTitle、slug、纯文本 content
    - _Requirements: 8.1, 8.2_
  - [x] 8.4 实现搜索组件
    - 创建 `src/components/SearchBar.astro`（客户端 island）
    - 使用 Fuse.js 进行模糊搜索，显示结果列表（章节标题、匹配片段、跳转链接）
    - 无结果时显示提示信息
    - _Requirements: 8.2, 8.3, 8.4_
  - [ ]* 8.5 编写搜索结果属性测试
    - **Property 11: 搜索返回匹配结果且包含必要字段**
    - **Validates: Requirements 8.2**

- [x] 9. 组装页面与集成
  - [x] 9.1 创建课程首页
    - 创建 `src/pages/index.astro`
    - 显示所有章节列表（按层级分组），包含标题、时长、层级信息和进度
    - _Requirements: 2.6, 5.1, 5.5_
  - [x] 9.2 创建章节动态页面
    - 创建 `src/pages/[chapter].astro`
    - 集成所有组件：Sidebar、TableOfContents、CodeBlock、Collapsible、Callout、Mermaid、Checklist、TaskArea、ChapterNav
    - 在 Astro 的 getStaticPaths 中为每个 Markdown 文件生成路由
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6_
  - [x] 9.3 集成响应式布局
    - 在 BaseLayout 中集成 Sidebar（响应式）、SearchBar、ThemeToggle
    - 确保移动端汉堡菜单正常工作
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 10. Final checkpoint - 确保所有测试通过
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases using Vitest
