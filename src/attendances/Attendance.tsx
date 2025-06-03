import { useAsync } from "../clipboards/useAsync";
import { downloadJson } from "../treasuries/downloadJson";
import "./Attendance.css";
import { AttendanceButton } from "./AttendanceButton";
import type { AttendanceData } from "./attendanceData";
import { AttendanceList } from "./AttendanceList";

export function Attendance() {
  const asyncData = useAsync(async () => {
    return await downloadJson<AttendanceData>("attendances/attendance.json");
  }, []);

  return (
    <div className="attendances-Attendance">
      <h2 className="name">Office Attendance</h2>

      {asyncData.loading ? (
        <div className="loading">(loading)</div>
      ) : (
        <div className="content">
          <AttendanceList
            className="list"
            attendances={asyncData.value.attendances}
          />

          <AttendanceButton attendances={asyncData.value.attendances} />
        </div>
      )}
    </div>
  );
}
