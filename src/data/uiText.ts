import { INDENT_VALUES, SelectUIProps, Translation } from '../interfaces';

export const title: Translation = {
  en: 'Code Editor',
  es: 'Código de Email',
};

export const lineWrappingLabel: Translation = {
  en: 'Line wrapping',
  es: 'Ajuste de línea',
};

export const selectIndentType: SelectUIProps = {
  label: {
    en: 'Indent type',
    es: 'Tipo de indentación',
  },
  options: [
    {
      label: {
        en: 'Tabs',
        es: 'Tabuladores',
      },
      value: INDENT_VALUES.TABS,
    },
    {
      label: {
        en: 'Spaces',
        es: 'Espacios',
      },
      value: INDENT_VALUES.SPACES,
    },
  ],
};

export const selectTabSize: SelectUIProps = {
  label: {
    en: 'Tab size',
    es: 'Tamaño de tabulador',
  },
  options: [
    {
      label: '2',
      value: 2,
    },
    {
      label: '4',
      value: 4,
    },
  ],
};
