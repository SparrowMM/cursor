import { useEffect, useMemo, useState } from "react";
import type { WidgetComponentProps, WidgetDefinition } from "./types";

const ClockWidgetComponent = ({ compact }: WidgetComponentProps) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("zh-CN", {
        month: "long",
        day: "numeric",
        weekday: "long"
      }).format(now),
    [now]
  );

  const timeLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        second: compact ? undefined : "2-digit",
        hour12: false
      }).format(now),
    [compact, now]
  );

  return (
    <div className="clock-widget">
      <p className="clock-time">{timeLabel}</p>
      <p className="clock-date">{dateLabel}</p>
    </div>
  );
};

export const clockWidget: WidgetDefinition = {
  id: "clock",
  title: "时间中心",
  description: "查看当前日期与时间节奏",
  defaultSize: "small",
  Component: ClockWidgetComponent
};
