import { OptionProps } from "./interfaces";

export const getOptions = (options: OptionProps[]) =>
  options.map((option) => ({
    label: option.label,
    value: option.value,
    ariaLabel: option.ariaLabel,
  }));
