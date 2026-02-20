# 个人工作台 Dashboard

一个面向**单用户（前端开发者）**的个人工作台。  
目标：高质量 UI、Widgets 可扩展、兼容桌面与移动端，并为后续 PWA 演进做好准备。

## 技术栈

- React + TypeScript + Vite
- 纯 CSS 响应式布局（12 栏网格）
- LocalStorage 持久化布局状态

## 快速开始

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 当前能力

- 现代卡片式 Dashboard UI
- 支持移动端与桌面端自适应
- Widget 操作：
  - 添加
  - 移除
  - 尺寸切换（small / medium / large / full）
- 布局自动持久化（浏览器刷新后保留）
- 预留 PWA manifest（`public/manifest.webmanifest`）

## 目录结构

```text
src/
  hooks/
    usePersistentState.ts      # 持久化状态 Hook
  widgets/
    types.ts                   # Widget 类型定义
    registry.ts                # Widget 注册中心 + 默认布局
    ClockWidget.tsx
    FocusWidget.tsx
    QuickLinksWidget.tsx
    SnippetsWidget.tsx
  App.tsx                      # Dashboard 主界面
  styles.css                   # 全局 + 页面样式
```

## 如何新增一个 Widget

1. 在 `src/widgets/` 新建组件文件，例如 `MyToolWidget.tsx`
2. 导出一个 `WidgetDefinition`：

```ts
export const myToolWidget: WidgetDefinition = {
  id: "my-tool",
  title: "我的工具",
  description: "做一件具体事情",
  defaultSize: "medium",
  Component: MyToolWidgetComponent
};
```

3. 在 `src/widgets/registry.ts` 中注册到 `widgetRegistry`
4. （可选）加入 `defaultLayout` 让它默认显示

这样 Dashboard 会自动支持该 Widget 的添加、渲染与布局管理。