import { useState, type Dispatch, type SetStateAction } from "react";
import type { Content } from "./content";
import "./Paste.css";
import { useAsync } from "./useAsync";

export function Paste({ setContent }: Props) {
  const [pasting, setPasting] = useState(false);
  useAsync(
    async (controller) => {
      if (!pasting) {
        return;
      }

      const text = await navigator.clipboard.readText();
      controller.signal.throwIfAborted();

      setContent((content) => ({
        type: "manual",
        value: text,
        index: content.index,
        refresh: content.refresh,
      }));

      setPasting(false);
    },
    [pasting, setContent]
  );

  return (
    <div
      className="clipboards-Paste"
      onClick={() => {
        if (pasting) {
          return;
        }

        setPasting(true);
      }}
    />
  );
}

interface Props {
  setContent: Dispatch<SetStateAction<Content>>;
}
