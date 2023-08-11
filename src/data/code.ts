import { CodeSampleProps, LANGUAGES } from "../interfaces";

export const CODE_SAMPLES: CodeSampleProps[] = [
  {
    language: LANGUAGES.HTML,
    label: "HTML",
    getInitialCode: (string: string) =>
      `<div>\n\t<p>\n\t\t${string}\n\t</p>\n</div>`,
  },
  {
    language: LANGUAGES.CSS,
    label: "CSS",
    getInitialCode: (string: string) => `/* ${string} */\np { color: red; }`,
  },
];
