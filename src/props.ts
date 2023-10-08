import { JSX } from 'react';

export interface CommonProps<TData, TReturn> {
  /** The controlled form value to be auto saved   */
  data: TData;
  /** Callback function to save your data */
  onSave: (data: TData) => Promise<TReturn> | TReturn | void;
  /** The number of milliseconds between save attempts. Defaults to 2000 */
  interval?: number;
  /** Set to false if you do not want the save function to fire on unmount */
  saveOnUnmount?: boolean;
}

export interface AutosaveProps<TData, TReturn>
  extends CommonProps<TData, TReturn> {
  /** JSX.Element to return */
  element?: JSX.Element | null;
}
