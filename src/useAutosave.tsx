import { useRef, useEffect } from 'react';
import { CommonProps } from './props';
import useDebounce from './useDebounce';

function useAutosave<TData, TReturn>({
  data,
  onSave,
  interval = 2000,
}: CommonProps<TData, TReturn>) {
  const valueOnCleanup = useRef(data);
  const initialRender = useRef(true);
  const debouncedValueToSave = useDebounce(data, interval);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      onSave(debouncedValueToSave);
    }
  }, [debouncedValueToSave, onSave]);

  useEffect(() => {
    valueOnCleanup.current = data;
  }, [data]);

  useEffect(() => () => {
    onSave(valueOnCleanup.current);
  }, [onSave]);
}

export default useAutosave;
