import { Translation } from './interfaces';

export const getOptions = (
  options: {
    label: string | Translation;
    value: string | number;
  }[],
  language: string,
) =>
  options.map(
    (option: { label: string | Translation; value: string | number }) => ({
      label:
        typeof option.label === 'string'
          ? option.label
          : option.label[language],
      value: option.value,
    }),
  );
