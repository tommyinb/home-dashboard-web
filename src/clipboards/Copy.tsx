import { useState } from "react";
import "./Copy.css";
import { useAsync } from "./useAsync";

export function Copy({ value }: Props) {
  const [copying, setCopying] = useState(false);
  useAsync(
    async (controller) => {
      if (!copying) {
        return;
      }

      await navigator.clipboard.writeText(value);
      controller.signal.throwIfAborted();

      setCopying(false);
    },
    [copying, value]
  );

  return (
    <div
      className="clipboards-Copy"
      onClick={() => {
        if (copying) {
          return;
        }

        setCopying(true);
      }}
    />
  );
}

interface Props {
  value: string;
}
