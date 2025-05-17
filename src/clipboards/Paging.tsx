import type { Dispatch, SetStateAction } from "react";
import "./Paging.css";

export function Paging({ index, setIndex, setRefresh }: Props) {
  return (
    <div className="clipboards-Paging">
      {[1, 0, 2].map((i) => (
        <div
          key={i}
          className={`dot ${i === index ? "active" : ""}`}
          onClick={() => {
            setIndex(i);
            setRefresh((t) => t + 1);
          }}
        />
      ))}
    </div>
  );
}

interface Props {
  index: number;
  setIndex: (index: number) => void;

  setRefresh: Dispatch<SetStateAction<number>>;
}
