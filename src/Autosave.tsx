import React from "react";
import { debounce } from "lodash";

type Props<T, R> = {
  data: T;
  saveFunction: (data: T) => Promise<R>;
  interval?: number;
  onError?: Function;
  onSuccess?: Function;
};

const Autosave = <T extends unknown, R extends unknown>({
  data,
}: Props<T, R>) => {
  return null;
};

export default Autosave;
