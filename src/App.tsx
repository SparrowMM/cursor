import { useMemo, useState } from "react";
import { usePersistentState } from "./hooks/usePersistentState";
import { defaultLayout, getNextWidgetSize, widgetMap, widgetRegistry } from "./widgets/registry";
import type { WidgetLayoutItem, WidgetSize } from "./widgets/types";

const LAYOUT_STORAGE_KEY = "dashboard-layout-v1";

const sizeClassMap: Record<WidgetSize, string> = {
  small: "size-small",
  medium: "size-medium",
  large: "size-large",
  full: "size-full"
};

const sizeLabelMap: Record<WidgetSize, string> = {
  small: "小",
  medium: "中",
  large: "大",
  full: "全宽"
};

const App = () => {
  const [layout, setLayout] = usePersistentState<WidgetLayoutItem[]>(LAYOUT_STORAGE_KEY, defaultLayout);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const activeWidgetIds = useMemo(() => new Set(layout.map((item) => item.widgetId)), [layout]);
  const availableWidgets = useMemo(
    () => widgetRegistry.filter((widget) => !activeWidgetIds.has(widget.id)),
    [activeWidgetIds]
  );

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("zh-CN", {
        dateStyle: "full"
      }).format(new Date()),
    []
  );

  const addWidget = (widgetId: string) => {
    const targetWidget = widgetMap.get(widgetId);
    if (!targetWidget) {
      return;
    }

    setLayout((previousLayout) => {
      if (previousLayout.some((item) => item.widgetId === widgetId)) {
        return previousLayout;
      }

      return [...previousLayout, { widgetId, size: targetWidget.defaultSize }];
    });
    setIsPickerOpen(false);
  };

  const removeWidget = (widgetId: string) => {
    setLayout((previousLayout) => previousLayout.filter((item) => item.widgetId !== widgetId));
  };

  const cycleWidgetSize = (widgetId: string) => {
    setLayout((previousLayout) =>
      previousLayout.map((item) =>
        item.widgetId === widgetId
          ? {
              ...item,
              size: getNextWidgetSize(item.size)
            }
          : item
      )
    );
  };

  const resetLayout = () => {
    setLayout(defaultLayout);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="topbar-kicker">Personal Workbench</p>
          <h1>个人工作台 Dashboard</h1>
          <p className="topbar-meta">{todayLabel}</p>
        </div>
        <div className="topbar-actions">
          <button
            type="button"
            className="action-button"
            onClick={() => setIsPickerOpen(true)}
            disabled={availableWidgets.length === 0}
          >
            添加 Widget
          </button>
          <button type="button" className="action-button ghost" onClick={resetLayout}>
            重置布局
          </button>
        </div>
      </header>

      {layout.length === 0 ? (
        <section className="empty-state">
          <h2>当前没有可见 Widget</h2>
          <p>点击右上角「添加 Widget」，将功能模块放回工作台。</p>
        </section>
      ) : (
        <section className="dashboard-grid">
          {layout.map((layoutItem) => {
            const widget = widgetMap.get(layoutItem.widgetId);
            if (!widget) {
              return null;
            }

            const WidgetComponent = widget.Component;

            return (
              <article
                key={layoutItem.widgetId}
                className={`widget-card ${sizeClassMap[layoutItem.size]}`}
                aria-label={widget.title}
              >
                <header className="widget-header">
                  <div>
                    <h2>{widget.title}</h2>
                    <p>{widget.description}</p>
                  </div>
                  <div className="widget-actions">
                    <button
                      type="button"
                      className="widget-action"
                      onClick={() => cycleWidgetSize(layoutItem.widgetId)}
                    >
                      尺寸：{sizeLabelMap[layoutItem.size]}
                    </button>
                    <button
                      type="button"
                      className="widget-action danger"
                      onClick={() => removeWidget(layoutItem.widgetId)}
                    >
                      移除
                    </button>
                  </div>
                </header>
                <div className="widget-content">
                  <WidgetComponent compact={layoutItem.size === "small"} />
                </div>
              </article>
            );
          })}
        </section>
      )}

      {isPickerOpen ? (
        <div className="picker-backdrop" role="presentation" onClick={() => setIsPickerOpen(false)}>
          <aside
            className="picker-panel"
            role="dialog"
            aria-modal="true"
            aria-label="添加 Widget"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="picker-header">
              <h3>添加功能模块</h3>
              <button type="button" className="widget-action" onClick={() => setIsPickerOpen(false)}>
                关闭
              </button>
            </div>

            {availableWidgets.length === 0 ? (
              <p className="picker-empty">所有 Widget 已添加到工作台。</p>
            ) : (
              <ul className="picker-list">
                {availableWidgets.map((widget) => (
                  <li key={widget.id}>
                    <div>
                      <h4>{widget.title}</h4>
                      <p>{widget.description}</p>
                    </div>
                    <button
                      type="button"
                      className="widget-action"
                      onClick={() => addWidget(widget.id)}
                    >
                      添加
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default App;
