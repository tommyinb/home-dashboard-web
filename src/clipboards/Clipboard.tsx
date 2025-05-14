import { useState } from "react";
import { Area } from "./Area";
import "./Clipboard.css";
import { Paging } from "./Paging";

export function Clipboard() {
  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="clipboards-Clipboard">
      <h2 className="name">Clipboard</h2>

      <Area className="area" index={index} refresh={refresh} />

      <Paging index={index} setIndex={setIndex} setRefresh={setRefresh} />
    </div>
  );
}
