import { useState } from "react";
import { useAsync } from "../clipboards/useAsync";
import "./AttendanceButton.css";
import type { AttendanceItem } from "./attendanceItem";
import { getWeekday } from "./getWeekday";

export function AttendanceButton({ attendances }: Props) {
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  useAsync(
    async (controller) => {
      if (!copying) {
        return;
      }

      const items = attendances.map((attendance) => ({
        date: new Date(attendance.time).toLocaleDateString("en-CA"),
        time: new Date(attendance.time).toLocaleTimeString("en-GB"),
        type: attendance.type,
      }));

      const dates = [...new Set(items.map((item) => item.date))]
        .sort()
        .reverse();

      const lines = dates.map((date) => {
        const weekday = getWeekday(new Date(date));

        const arrives = items
          .filter((item) => item.date === date && item.type === "arrive")
          .map((item) => item.time.substring(0, 5))
          .sort();

        const arrive = arrives[0] ?? "-";

        const leaves = items
          .filter((item) => item.date === date && item.type === "leave")
          .map((item) => item.time.substring(0, 5))
          .sort();

        const leave = leaves[leaves.length - 1] ?? "-";

        return `${date}, ${weekday}, ${arrive}, ${leave}`;
      });

      const text = lines.join("\n");

      await navigator.clipboard.writeText(text);

      controller.signal.throwIfAborted();

      setCopied(true);
    },
    [attendances, copying]
  );

  return (
    <div
      className={`attendances-AttendanceButton ${copied ? "" : "active"}`}
      onClick={() => setCopying(true)}
    >
      {copied ? "Copied" : "Copy"}
    </div>
  );
}

interface Props {
  attendances: AttendanceItem[];
}
