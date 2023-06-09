import { CodeSampleProps, LANGUAGES } from '../interfaces';

export const CODE_SAMPLES: CodeSampleProps[] = [
  {
    language: LANGUAGES.HTML,
    label: 'HTML',
    instructions: {
      en: `Start editing your ${LANGUAGES.HTML} here`,
      es: `Empieza a editar tu ${LANGUAGES.HTML} aquí.`,
    },
    getInitialCode: (string: string) =>
      `<div>\n\t<p>\n\t\t${string}\n\t</p>\n</div>`,
  },
  {
    language: LANGUAGES.CSS,
    label: 'CSS',
    instructions: {
      en: `Write ${LANGUAGES.CSS} styles here`,
      es: `Escribe estilos ${LANGUAGES.CSS} aquí.`,
    },
    getInitialCode: (string: string) => `/* ${string} */\np { color: red; }`,
  },
];
