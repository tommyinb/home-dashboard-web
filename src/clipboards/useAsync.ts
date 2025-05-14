import { useEffect, useState, type DependencyList } from "react";

export function useAsync<T>(
  func: (controller: AbortController) => Promise<T>,
  deps: DependencyList
): AsyncValue<T> {
  const [value, setValue] = useState<AsyncValue<T>>({ loading: true });

  useEffect(() => {
    setValue((value) => ({ ...value, loading: true }));

    const controller = new AbortController();

    (async () => {
      try {
        const value = await func(controller);

        if (controller.signal.aborted) {
          return;
        }

        setValue({
          loading: false,
          value,
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        throw error;
      }
    })();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return value;
}

type AsyncValue<T> =
  | {
      loading: true;
      value?: T;
    }
  | {
      loading: false;
      value: T;
    };
