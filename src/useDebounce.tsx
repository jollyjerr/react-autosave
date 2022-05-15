import { useState, useEffect } from 'react';

function useDebounce<TData>(data: TData, interval: number) {
  const [liveData, setLiveData] = useState<TData>(data);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handler = setTimeout(() => {
        setLiveData(data);
      }, interval);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [data, interval]);

  return liveData;
}

export default useDebounce;
