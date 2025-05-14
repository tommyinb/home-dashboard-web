import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useMemo, useState } from "react";
import "./Area.css";
import { folder } from "./storage";
import { useAsync } from "./useAsync";

export function Area({ className, index, refresh }: Props) {
  const [content, setContent] = useState<Content>({
    type: "idle",
    index,
    refresh,
  });
  useEffect(
    () => setContent({ type: "idle", index, refresh }),
    [index, refresh]
  );

  const file = useMemo(() => ref(folder, `${index}.txt`), [index]);
  const download = useAsync(async () => {
    const url = await getDownloadURL(file);
    const response = await fetch(url);
    const value = await response.text();

    return { type: "download", value, index, refresh } as const;
  }, [file, index, refresh]);
  useEffect(() => {
    if (!download.loading) {
      setContent((content) =>
        content.type === "manual" ? content : download.value
      );
    }
  }, [download]);

  useAsync(
    async (controller) => {
      if (content.type !== "manual") {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      controller.signal.throwIfAborted();

      await uploadString(file, content.value);
    },
    [content, file]
  );

  return (
    <textarea
      className={`clipboards-Area ${className} ${
        content.type === "idle"
          ? "loading"
          : !content.value
          ? "empty"
          : content.value.length > 80
          ? "long"
          : ""
      }`}
      value={content.type === "idle" ? "" : content.value}
      onChange={(event) =>
        setContent({
          type: "manual",
          value: event.target.value,
          index,
          refresh,
        })
      }
      placeholder={content.type === "idle" ? "(loading)" : "(empty)"}
    />
  );
}

interface Props {
  className: string;

  index: number;
  refresh: number;
}

type Content = (
  | {
      type: "idle";
    }
  | {
      type: "download";
      value: string;
    }
  | {
      type: "manual";
      value: string;
    }
) & {
  index: number;
  refresh: number;
};
