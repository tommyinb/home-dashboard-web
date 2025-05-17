import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useAsync } from "../clipboards/useAsync";
import "./GansoButton.css";

export function GansoButton({ setRefresh }: Props) {
  const [active, setActive] = useState(false);

  const asyncData = useAsync(async () => {
    if (!active) {
      return false;
    }

    const response = await fetch(
      "https://us-central1-home-dashboard-7b463.cloudfunctions.net/gansoWatch"
    );
    await response.json();

    return true;
  }, [active]);

  useEffect(() => {
    if (active && asyncData.value) {
      setRefresh((prev) => prev + 1);
    }
  }, [active, asyncData, setRefresh]);

  return (
    <div
      className={`watches-GansoButton ${active ? "active" : ""}`}
      onClick={() => setActive(true)}
    >
      Refresh
    </div>
  );
}

interface Props {
  setRefresh: Dispatch<SetStateAction<number>>;
}
