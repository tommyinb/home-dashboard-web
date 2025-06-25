import type { Dispatch, SetStateAction } from "react";
import type { Content } from "./content";
import "./Control.css";
import { Copy } from "./Copy";
import { Paste } from "./Paste";

export function Control({ className, value, setContent }: Props) {
  return (
    <div className={`clipboards-Control ${className}`}>
      <Copy value={value} />

      <Paste setContent={setContent} />
    </div>
  );
}

interface Props {
  className: string;
  value: string;
  setContent: Dispatch<SetStateAction<Content>>;
}
