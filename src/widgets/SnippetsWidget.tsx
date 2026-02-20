import type { WidgetComponentProps, WidgetDefinition } from "./types";

const snippets = [
  {
    name: "启动开发环境",
    command: "npm run dev"
  },
  {
    name: "构建生产版本",
    command: "npm run build"
  },
  {
    name: "预览生产包",
    command: "npm run preview"
  }
];

const SnippetsWidgetComponent = ({ compact }: WidgetComponentProps) => {
  return (
    <div className="snippets-widget">
      {(compact ? snippets.slice(0, 2) : snippets).map((snippet) => (
        <div className="snippet-item" key={snippet.name}>
          <p>{snippet.name}</p>
          <code>{snippet.command}</code>
        </div>
      ))}
    </div>
  );
};

export const snippetsWidget: WidgetDefinition = {
  id: "snippets",
  title: "开发片段",
  description: "常用命令与流程提示",
  defaultSize: "large",
  Component: SnippetsWidgetComponent
};
