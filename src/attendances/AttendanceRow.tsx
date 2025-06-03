import { useMemo } from "react";
import "./AttendanceRow.css";
import type { AttendanceItem } from "./attendanceItem";
import { getWeekday } from "./getWeekday";

export function AttendanceRow({ attendance }: Props) {
  const time = useMemo(() => new Date(attendance.time), [attendance.time]);

  const weekday = useMemo(() => getWeekday(time), [time]);

  return (
    <div className="attendances-AttendanceRow">
      <div className="date">
        {time.toLocaleDateString("en-ZA").substring(5)}
      </div>

      <div className="weekday">{weekday}</div>

      <div className="time">
        {time.toLocaleTimeString("en-GB").substring(0, 5)}
      </div>

      <div className="type">
        {attendance.type === "arrive" ? "Arrived" : "Left"}
      </div>
    </div>
  );
}

interface Props {
  attendance: AttendanceItem;
}
