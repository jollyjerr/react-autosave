export interface CommonProps<TData, TReturn> {
  /** The controlled form value to be auto saved   */
  data: TData;
  /** Callback function to save your data */
  onSave: (data: TData) => Promise<TReturn> | TReturn | void;
  /** The number of milliseconds between save attempts. Defaults to 2000 */
  interval?: number;
}

export interface AutosaveProps<TData, TReturn>
  extends CommonProps<TData, TReturn> {
  /** JSX.Element to return */
  element?: JSX.Element;
}
