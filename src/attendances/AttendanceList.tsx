import type { AttendanceItem } from "./attendanceItem";
import "./AttendanceList.css";
import { AttendanceRow } from "./AttendanceRow";

export function AttendanceList({ className, attendances }: Props) {
  return (
    <div className={`attendances-AttendanceList ${className}`}>
      {attendances.map((attendance, i) => (
        <AttendanceRow key={i} attendance={attendance} />
      ))}
    </div>
  );
}

interface Props {
  className: string;
  attendances: AttendanceItem[];
}
