import React from "react";
import debounce from "lodash/debounce";

type Props<T, R> = {
  /** The controlled form value to be auto saved   */
  data: T;
  /** Callback function to save your data */
  onSave: (data: T) => Promise<R>;
  /** The number of milliseconds between save attempts. Defaults to 2000 */
  interval?: number;
  /** A callback function for if the save function errors */
  onError?: Function;
  /** A callback function for if the save function resolves */
  onSuccess?: Function;
};

const Autosave = <T extends unknown, R extends unknown>({
  data,
  onSave,
  interval = 2000,
  onError = console.error,
  onSuccess,
}: Props<T, R>): null => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
