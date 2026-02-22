# 需求文档：OpenClaw 课程交互式网页版

## 简介

将 OpenClaw 实战训练营的 18 个课程章节（13 天核心课程 + 5 个选修渠道 Lab）从 Markdown 文稿转化为交互式网页版本。网页版需完整保留所有课程内容，并提供丰富的交互功能以提升学习体验，包括代码高亮、可折叠区域、进度追踪、验收清单等。

## 术语表

- **Course_App**：交互式课程网页应用，即本项目的最终产物
- **Chapter_Page**：单个课程章节对应的网页页面
- **Markdown_Parser**：将课程 Markdown 文件解析为结构化数据的解析模块
- **Progress_Tracker**：追踪用户学习进度的模块，基于浏览器本地存储
- **Checklist_Component**：可交互的验收自检清单组件，支持勾选状态持久化
- **Code_Block**：带语法高亮和复制功能的代码展示组件
- **Collapsible_Section**：可折叠/展开的内容区域组件
- **Navigation_System**：课程章节间的导航系统，包括侧边栏和章节内锚点导航
- **Mermaid_Renderer**：将 Mermaid 语法渲染为可视化图表的模块
- **Section_Slide**：课程章节内按"页"组织的内容单元（对应原始 Markdown 中的"第 N 页"）

## 需求

### 需求 1：Markdown 内容解析与渲染

**用户故事：** 作为学习者，我希望在网页上看到与原始课程文稿完全一致的内容，以便获得完整的学习体验。

#### 验收标准

1. WHEN a Chapter_Page loads, THE Markdown_Parser SHALL parse the corresponding Markdown file and render all content including headings, paragraphs, lists, tables, bold/italic text, links, and images
2. WHEN a Markdown file contains fenced code blocks, THE Code_Block SHALL render them with syntax highlighting appropriate to the specified language (bash, json, markdown, javascript, etc.)
3. WHEN a Markdown file contains Mermaid diagram syntax, THE Mermaid_Renderer SHALL render the diagram as a visual SVG graphic
4. WHEN a Markdown file contains tables, THE Course_App SHALL render them as styled, readable HTML tables with proper alignment
5. WHEN a Markdown file contains blockquotes (tips, warnings, notes marked with emoji), THE Course_App SHALL render them as visually distinct callout boxes with appropriate styling
6. THE Markdown_Parser SHALL preserve the "第 N 页" section structure from the original Markdown, converting each section into a navigable Section_Slide

### 需求 2：章节导航与课程结构

**用户故事：** 作为学习者，我希望能方便地在课程章节之间导航，并清楚了解课程的整体结构，以便有计划地学习。

#### 验收标准

1. THE Navigation_System SHALL display a sidebar listing all 18 course chapters grouped by tier (基础层, 进阶层, 实战层, 进阶扩展, 选修 Lab)
2. WHEN a user clicks a chapter in the sidebar, THE Course_App SHALL navigate to the corresponding Chapter_Page and highlight the active chapter
3. WHEN a Chapter_Page is displayed, THE Navigation_System SHALL show an in-page table of contents listing all Section_Slides within that chapter
4. WHEN a user clicks a Section_Slide entry in the in-page table of contents, THE Course_App SHALL smooth-scroll to that section
5. WHEN a user reaches the end of a chapter, THE Course_App SHALL display navigation links to the previous and next chapters
6. THE Course_App SHALL display a course home page listing all chapters with their titles, estimated duration, and tier information

### 需求 3：代码块交互功能

**用户故事：** 作为学习者，我希望能方便地复制课程中的代码示例，以便快速在自己的环境中实践。

#### 验收标准

1. WHEN a Code_Block is displayed, THE Code_Block SHALL show a copy button in the top-right corner
2. WHEN a user clicks the copy button, THE Code_Block SHALL copy the code content to the clipboard and display a brief success feedback (such as changing the button text to "已复制")
3. WHEN a Code_Block contains code, THE Code_Block SHALL display the language label (e.g., "bash", "json") in the top-left corner
4. THE Code_Block SHALL apply syntax highlighting using distinct colors for keywords, strings, comments, and other token types

### 需求 4：可折叠内容区域

**用户故事：** 作为学习者，我希望能折叠和展开某些内容区域（如故障排查、延伸阅读、进阶配置），以便专注于当前学习的核心内容。

#### 验收标准

1. WHEN a Chapter_Page contains sections identified as collapsible (故障排查速查, 延伸阅读, 进阶配置, 安全提示), THE Collapsible_Section SHALL render them in a collapsed state by default
2. WHEN a user clicks on a Collapsible_Section header, THE Collapsible_Section SHALL toggle between collapsed and expanded states with a smooth animation
3. WHEN a Collapsible_Section is in collapsed state, THE Collapsible_Section SHALL display only the section title with a visual indicator (such as a chevron icon) showing it can be expanded
4. WHEN a Collapsible_Section is expanded, THE Collapsible_Section SHALL display the full section content and change the visual indicator to show it can be collapsed

### 需求 5：学习进度追踪

**用户故事：** 作为学习者，我希望能追踪自己的学习进度，以便了解已完成和未完成的章节。

#### 验收标准

1. WHEN a user visits the course home page, THE Progress_Tracker SHALL display the completion percentage for each chapter and the overall course
2. WHEN a user marks a chapter as completed, THE Progress_Tracker SHALL persist the completion state to browser local storage
3. WHEN a user revisits the Course_App, THE Progress_Tracker SHALL restore the previously saved progress from local storage
4. WHEN a user completes all checklist items in a chapter's verification section, THE Progress_Tracker SHALL automatically mark that chapter as completed
5. THE Progress_Tracker SHALL display a visual progress bar on the course home page showing overall course completion

### 需求 6：验收自检清单

**用户故事：** 作为学习者，我希望能交互式地勾选每个章节的验收自检项，以便确认自己已掌握该章节的学习目标。

#### 验收标准

1. WHEN a Chapter_Page contains a verification checklist (验收自检), THE Checklist_Component SHALL render each item as an interactive checkbox
2. WHEN a user checks or unchecks a checklist item, THE Checklist_Component SHALL persist the state to browser local storage immediately
3. WHEN a user revisits a Chapter_Page, THE Checklist_Component SHALL restore the previously saved checklist state from local storage
4. WHEN all checklist items in a chapter are checked, THE Checklist_Component SHALL display a visual completion indicator (such as a congratulatory message or badge)

### 需求 7：响应式布局与视觉设计

**用户故事：** 作为学习者，我希望在不同设备（桌面、平板、手机）上都能舒适地阅读课程内容。

#### 验收标准

1. THE Course_App SHALL use a responsive layout that adapts to desktop (≥1024px), tablet (768px–1023px), and mobile (<768px) screen widths
2. WHILE the screen width is less than 768px, THE Navigation_System SHALL collapse the sidebar into a hamburger menu
3. WHILE the screen width is 768px or greater, THE Navigation_System SHALL display the sidebar as a persistent panel
4. THE Course_App SHALL use a clean, readable typography with appropriate font sizes, line heights, and contrast ratios for comfortable reading
5. THE Course_App SHALL support a dark mode toggle that switches between light and dark color themes
6. WHEN a user toggles dark mode, THE Course_App SHALL persist the preference to local storage and apply it on subsequent visits

### 需求 8：搜索功能

**用户故事：** 作为学习者，我希望能搜索课程内容中的关键词，以便快速找到特定知识点。

#### 验收标准

1. THE Course_App SHALL provide a search input field accessible from the navigation area
2. WHEN a user types a search query, THE Course_App SHALL display matching results from all chapters with the chapter title, matched text snippet, and a link to the relevant section
3. WHEN a user clicks a search result, THE Course_App SHALL navigate to the corresponding Chapter_Page and scroll to the matched content
4. WHEN no search results are found, THE Course_App SHALL display a message indicating no matches were found

### 需求 9：实操任务区域高亮

**用户故事：** 作为学习者，我希望实操任务区域在视觉上与讲解内容有明显区分，以便快速定位需要动手操作的部分。

#### 验收标准

1. WHEN a Chapter_Page contains practical task sections (实操任务), THE Course_App SHALL render them with a distinct visual style (such as a colored left border and background) to differentiate from lecture content
2. WHEN a practical task section contains success criteria (成功标志), THE Course_App SHALL render them as a highlighted checklist within the task area
3. WHEN a Chapter_Page contains a task overview table (实操任务总览), THE Course_App SHALL render it with enhanced styling including task numbers, objectives, and estimated time

### 需求 10：静态站点构建与部署

**用户故事：** 作为课程维护者，我希望网页版课程能作为静态站点构建和部署，以便简单高效地托管和更新。

#### 验收标准

1. THE Course_App SHALL be buildable as a static site with all course content bundled at build time
2. WHEN the course Markdown files are updated, THE Course_App SHALL reflect the changes after a rebuild
3. THE Course_App SHALL load and render a Chapter_Page within 3 seconds on a standard broadband connection
4. THE Course_App SHALL function correctly without a backend server after static deployment
