import React from "react";
import debounce from "lodash/debounce";

type Props<T, R> = {
  data: T;
  onSave: (data: T) => Promise<R>;
  interval?: number;
  onError?: Function;
  onSuccess?: Function;
};

const Autosave = <T extends unknown, R extends unknown>({
  data,
  onSave,
  interval = 2000,
  onError = console.error,
  onSuccess,
}: Props<T, R>): JSX.Element => {
  const debouncedSave = React.useCallback(
    debounce(async (data: T) => {
      try {
        const resp = await onSave(data);
        if (onSuccess) {
          onSuccess(resp);
        }
      } catch (error) {
        onError(error);
      }
    }, interval),
    [],
  );
  React.useEffect(() => {
    if (data) {
      debouncedSave(data);
    }
  }, [data, debouncedSave]);
  return null;
};

export default Autosave;
