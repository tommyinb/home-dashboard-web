export type Content = (
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
