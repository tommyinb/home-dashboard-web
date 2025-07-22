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

      const attendanceItems = attendances.map((attendance) => ({
        attendance,
        date: new Date(attendance.time).toLocaleDateString("en-CA"),
        time: new Date(attendance.time).toLocaleTimeString("en-GB"),
      }));

      const dateItems = [...new Set(attendanceItems.map((item) => item.date))]
        .sort()
        .map((date) => ({
          date,
          week:
            parseInt(date.replaceAll("-", "")) - (new Date(date).getDay() - 1),
        }));

      const weeks = [...new Set(dateItems.map((item) => item.week))];

      const text = weeks
        .map((week) =>
          dateItems
            .filter((item) => item.week === week)
            .map((item) => item.date)
            .map((date) => {
              const weekday = getWeekday(new Date(date));

              const arrives = attendanceItems
                .filter((item) => item.date === date)
                .filter((item) => item.attendance.type === "arrive")
                .map((item) => item.time.substring(0, 5))
                .sort();
              const arrive = arrives[0] ?? "-";

              const leaves = attendanceItems
                .filter((item) => item.date === date)
                .filter((item) => item.attendance.type === "leave")
                .map((item) => item.time.substring(0, 5))
                .sort();
              const leave = leaves[leaves.length - 1] ?? "-";

              return `${date}, ${weekday}, ${arrive}, ${leave}`;
            })
            .join("\n")
        )
        .join("\n\n");

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
