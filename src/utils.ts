import { CODE_SAMPLES } from "./data/code";
import {
  CodeSampleProps,
  LANGUAGES,
  OptionGroupProps,
  OptionProps,
} from "./interfaces";

export const getOptions = (options: OptionProps[]) =>
  options.map((option) => ({
    label: option.label,
    value: option.value,
    ariaLabel: option.ariaLabel,
  }));

export const getOptionGroups = (optionGroups: OptionGroupProps[]) => {
  return optionGroups.map((optionGroup) => ({
    label: optionGroup.label,
    options: getOptions(optionGroup.options),
  }));
};

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
