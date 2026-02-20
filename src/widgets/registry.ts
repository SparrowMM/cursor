import { clockWidget } from "./ClockWidget";
import { focusWidget } from "./FocusWidget";
import { quickLinksWidget } from "./QuickLinksWidget";
import { snippetsWidget } from "./SnippetsWidget";
import type { WidgetDefinition, WidgetLayoutItem, WidgetSize } from "./types";

export const widgetRegistry: WidgetDefinition[] = [
  clockWidget,
  focusWidget,
  quickLinksWidget,
  snippetsWidget
];

export const widgetMap = new Map(widgetRegistry.map((widget) => [widget.id, widget]));

export const defaultLayout: WidgetLayoutItem[] = widgetRegistry.map((widget) => ({
  widgetId: widget.id,
  size: widget.defaultSize
}));

const sizeOrder: WidgetSize[] = ["small", "medium", "large", "full"];

export const getNextWidgetSize = (currentSize: WidgetSize): WidgetSize => {
  const currentIndex = sizeOrder.indexOf(currentSize);
  const nextIndex = (currentIndex + 1) % sizeOrder.length;
  return sizeOrder[nextIndex];
};
