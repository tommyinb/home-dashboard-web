import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { useAsync } from "../clipboards/useAsync";
import { storage } from "../firebases/storage";
import "./Ganso.css";
import { GansoButton } from "./GansoButton";
import type { GansoItem } from "./gansoItem";
import { GansoRow } from "./GansoRow";

export function Ganso() {
  const [refresh, setRefresh] = useState(0);

  const asyncData = useAsync(async () => {
    if (refresh < 0) {
      return [];
    }

    const file = ref(storage, "watches/ganso.json");
    const url = await getDownloadURL(file);
    const response = await fetch(url);
    const value = await response.json();
    return value as GansoItem[];
  }, [refresh]);

  return (
    <div className="watches-Ganso">
      <h2 className="name">元祖室</h2>

      {asyncData.loading ? (
        <div className="loading">(loading)</div>
      ) : (
        <div className="content">
          <div className="list">
            {asyncData.value.map((item) => (
              <GansoRow key={item.date} item={item} />
            ))}
          </div>

          <GansoButton key={refresh} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  );
}
