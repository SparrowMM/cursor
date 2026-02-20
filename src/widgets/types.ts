import type { ComponentType } from "react";

export type WidgetSize = "small" | "medium" | "large" | "full";

export interface WidgetComponentProps {
  compact: boolean;
}

export interface WidgetDefinition {
  id: string;
  title: string;
  description: string;
  defaultSize: WidgetSize;
  Component: ComponentType<WidgetComponentProps>;
}

export interface WidgetLayoutItem {
  widgetId: string;
  size: WidgetSize;
}
