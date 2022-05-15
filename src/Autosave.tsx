import { AutosaveProps } from './props';
import useAutosave from './useAutosave';

const Autosave = <TData, TReturn>({
  element = null,
  ...props
}: AutosaveProps<TData, TReturn>) => {
  useAutosave(props);
  return element;
};

export default Autosave;
