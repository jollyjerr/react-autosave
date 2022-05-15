import { useState, useEffect } from 'react';

function useDebounce<TData>(data: TData, interval: number) {
  const [liveData, setLiveData] = useState<TData>(data);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = window.setTimeout(() => {
        setLiveData(data);
      }, interval);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [data, interval]);

  return liveData;
}

export default useDebounce;
