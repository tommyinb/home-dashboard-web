import type { AttendanceItem } from "./attendanceItem";

export interface AttendanceData {
  attendances: AttendanceItem[];
  time: string;
}
