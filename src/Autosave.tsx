import React from 'react';
import { AutosaveProps } from './props';
import useAutosave from './useAutosave';

const Autosave = <TData extends unknown, TReturn extends unknown>({
  data,
  onSave,
  interval = 2000,
  element = <></>,
}: AutosaveProps<TData, TReturn>) => {
  useAutosave({ data, onSave, interval });
  return element;
};

export default Autosave;
