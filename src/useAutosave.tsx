import { useRef, useEffect, useCallback } from 'react';
import { CommonProps } from './props';
import useDebounce from './useDebounce';

function useAutosave<TData, TReturn>({
  data,
  onSave,
  interval = 2000,
  saveOnUnmount = true,
}: CommonProps<TData, TReturn>) {
  const hasChange = useRef(false);
  const latestData = useRef(data);
  const handleSave = useRef(onSave);
  const debouncedData = useDebounce(data, interval);

  const commit = useCallback((newData: TData) => {
    handleSave.current(newData);
    hasChange.current = false;
  }, []);

  useEffect(() => {
    if (hasChange.current) return;

    try {
      if (JSON.stringify(latestData.current) !== JSON.stringify(data)) {
        hasChange.current = true;
      }
    } catch {
      hasChange.current = true;
    }
  }, [data]);

  useEffect(() => {
    latestData.current = data;
  }, [data]);

  useEffect(() => {
    handleSave.current = onSave;
  }, [onSave]);

  useEffect(() => {
    if (hasChange.current) {
      commit(debouncedData);
    }
  }, [commit, debouncedData]);

  useEffect(
    () => () => {
      if (saveOnUnmount && hasChange.current) {
        commit(latestData.current);
      }
    },
    [commit, saveOnUnmount],
  );
}

export default useAutosave;
