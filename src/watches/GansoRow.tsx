import "./GansoRow.css";
import type { GansoItem } from "./gansoItem";

export function GansoRow({ item }: Props) {
  return (
    <div
      className={`watches-GansoRow ${
        item.date === "2025-08-07" ? "highlight" : ""
      }`}
    >
      <div className="date">
        {new Date(item.date).toLocaleDateString("en-CA")}
      </div>

      <div className="weekday">
        {
          ["日", "月", "火", "水", "木", "金", "土"][
            new Date(item.date).getDay()
          ]
        }
      </div>

      <div className="dash">—</div>

      <div className="vacancy">
        {item.vacancy ? "✅" : item.opened ? "❌" : "✕"}
      </div>
    </div>
  );
}

interface Props {
  item: GansoItem;
}
