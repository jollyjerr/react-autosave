import React from "react";
import { CommonProps } from "./props";
import useDebounce from "./useDebounce";

const useAutosave = <TData extends unknown, TReturn extends unknown>({
  data,
  onSave,
  interval = 2000,
}: CommonProps<TData, TReturn>) => {
  const initialRender = React.useRef(true);
  const debouncedValueToSave = useDebounce(data, interval);
  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (debouncedValueToSave) {
        onSave(debouncedValueToSave);
      }
    }
  }, [debouncedValueToSave, interval, onSave]);
};

export default useAutosave;
