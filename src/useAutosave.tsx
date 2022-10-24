import { useRef, useEffect } from 'react';
import { CommonProps } from './props';
import useDebounce from './useDebounce';

function useAutosave<TData, TReturn>({
  data,
  onSave,
  interval = 2000,
  saveOnUnmount = true,
}: CommonProps<TData, TReturn>) {
  const valueOnCleanup = useRef(data);
  const initialRender = useRef(true);
  const handleSave = useRef(onSave);

  const debouncedValueToSave = useDebounce(data, interval);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleSave.current(debouncedValueToSave);
    }
  }, [debouncedValueToSave]);

  useEffect(() => {
    valueOnCleanup.current = data;
  }, [data]);

  useEffect(() => {
    handleSave.current = onSave;
  }, [onSave]);

  useEffect(
    () => () => {
      if (saveOnUnmount) {
        handleSave.current(valueOnCleanup.current);
      }
    },
    [saveOnUnmount],
  );
}

export default useAutosave;
