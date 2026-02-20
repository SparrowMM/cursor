import type { WidgetComponentProps, WidgetDefinition } from "./types";

const focusItems = [
  "完成组件化重构并补齐类型",
  "处理一个视觉细节优化点",
  "为新增模块补 README 使用说明"
];

const FocusWidgetComponent = ({ compact }: WidgetComponentProps) => {
  return (
    <div className="focus-widget">
      <p className="focus-label">今日关键任务</p>
      <ul className="focus-list">
        {(compact ? focusItems.slice(0, 2) : focusItems).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export const focusWidget: WidgetDefinition = {
  id: "focus",
  title: "今日 Focus",
  description: "聚焦最重要的开发任务",
  defaultSize: "medium",
  Component: FocusWidgetComponent
};
