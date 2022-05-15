import { useRef, useEffect } from "react";
import { CommonProps } from "./props";
import useDebounce from "./useDebounce";

const useAutosave = <TData extends unknown, TReturn extends unknown>({
  data,
  onSave,
  interval = 2000,
}: CommonProps<TData, TReturn>) => {
  const valueOnCleanup = useRef(data);
  const initialRender = useRef(true);
  const debouncedValueToSave = useDebounce(data, interval);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (debouncedValueToSave) {
      onSave(debouncedValueToSave);
    }
  }, [debouncedValueToSave, onSave]);

  useEffect(() => {
    valueOnCleanup.current = data;
  }, [data]);

  useEffect(() => {
    return () => {
      onSave(valueOnCleanup.current);
    };
  }, [onSave]);
};

export default useAutosave;
