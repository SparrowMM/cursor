import type { WidgetComponentProps, WidgetDefinition } from "./types";

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Vite 文档", href: "https://vite.dev" },
  { label: "React 文档", href: "https://react.dev" },
  { label: "MDN", href: "https://developer.mozilla.org" }
];

const QuickLinksWidgetComponent = ({ compact }: WidgetComponentProps) => {
  return (
    <div className="quick-links-widget">
      <ul className="quick-links-list">
        {(compact ? links.slice(0, 2) : links).map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const quickLinksWidget: WidgetDefinition = {
  id: "quick-links",
  title: "常用链接",
  description: "快速访问开发常用站点",
  defaultSize: "medium",
  Component: QuickLinksWidgetComponent
};
