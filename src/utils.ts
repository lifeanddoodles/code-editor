import { CODE_SAMPLES } from "./data/code";
import { CodeSampleProps, LANGUAGES, OptionProps } from "./interfaces";

export const getOptions = (options: OptionProps[]) =>
  options.map((option) => ({
    label: option.label,
    value: option.value,
    ariaLabel: option.ariaLabel,
  }));

export function getLanguageSetup(
  lang: keyof typeof LANGUAGES
): CodeSampleProps | undefined {
  const match = CODE_SAMPLES.find((item) => lang === item.language);
  if (!match) return;
  const { language, label, getInitialCode } = match;

  return {
    language,
    label,
    getInitialCode,
  };
}
