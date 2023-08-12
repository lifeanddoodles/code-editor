import { Trans } from "react-i18next";
import { INDENT_VALUES } from "../interfaces";

export const selectIndentType = {
  options: [
    {
      label: <Trans i18nKey="header.toolbar.selectIndentType.options.0" />,
      value: INDENT_VALUES.TABS,
    },
    {
      label: <Trans i18nKey="header.toolbar.selectIndentType.options.1" />,
      value: INDENT_VALUES.SPACES,
    },
  ],
};

export const selectTabSize = {
  options: [
    {
      label: "2",
      value: 2,
    },
    {
      label: "4",
      value: 4,
    },
  ],
};
