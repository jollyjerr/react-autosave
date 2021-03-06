import React from "react";
import { AutosaveProps } from "./props";
import useDebounce from "./useDebounce";

const Autosave = <TData extends unknown, TReturn extends unknown>({
  data,
  onSave,
  interval = 2000,
  element = <></>,
}: AutosaveProps<TData, TReturn>) => {
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
  return element;
};

export default Autosave;
