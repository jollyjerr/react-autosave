import { useState, useEffect } from "react";

const useDebounce = <T extends unknown>(data: T, interval: number) => {
  const [liveData, setLiveData] = useState<T>(data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = window.setTimeout(() => {
        setLiveData(data);
      }, interval);
      return () => {
        window.clearTimeout(handler);
      };
    }
  }, [data, interval]);

  return liveData;
};

export default useDebounce;
