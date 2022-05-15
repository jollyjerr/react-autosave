import { AutosaveProps } from './props';
import useAutosave from './useAutosave';

const Autosave = <TData, TReturn>({
  data,
  onSave,
  interval = 2000,
  element = null,
}: AutosaveProps<TData, TReturn>) => {
  useAutosave({ data, onSave, interval });
  return element;
};

export default Autosave;
