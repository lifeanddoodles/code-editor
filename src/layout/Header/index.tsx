import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Checkbox from "../../components/Checkbox";
import DarkModeButton from "../../components/DarkModeButton";
import Select from "../../components/Select";
import Toolbar from "../../components/Toolbar";
import { useCodesContentContext } from "../../context";
import { useGetThemes } from "../../data/themes";
import { selectIndentType, selectTabSize } from "../../data/uiText";
import { ConfigProps, INDENT_VALUES } from "../../interfaces";
import { getOptions } from "../../utils";

const SiteHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1rem;
  gap: 2rem;

  h1 {
    font-size: 1.5rem;
  }
`;

const Header = ({
  config,
  setConfig,
}: {
  config: ConfigProps;
  setConfig: Dispatch<SetStateAction<ConfigProps>>;
}) => {
  const [enableLineWrapping, setEnableLineWrapping] = useState(
    config.lineWrapping!
  );
  const { darkMode } = useCodesContentContext();
  const themeOptions = useGetThemes(darkMode);

  const { t, i18n } = useTranslation("translation", { keyPrefix: "header" });

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event?.target?.value;
    i18n.changeLanguage(code);
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    const target = event?.target as HTMLSelectElement;
    setConfig({ ...config, [key]: target.value });
  };

  return (
    <SiteHeader>
      <h1>{t("title")}</h1>
      <Toolbar>
        <Checkbox
          id="lineWrapping"
          name="lineWrapping"
          label={t("toolbar.lineWrappingLabel")}
          checked={enableLineWrapping}
          onChange={setEnableLineWrapping}
        />
        <Select
          options={getOptions(selectIndentType?.options)}
          value={config.indentUnit}
          onChange={(event) => handleSelect(event, "indentUnit")}
          label={t("toolbar.selectIndentType.label")}
        />
        <Select
          options={getOptions(selectTabSize?.options)}
          value={config.indentWidth}
          onChange={(event) => handleSelect(event, "indentWidth")}
          disabled={config.indentUnit === INDENT_VALUES.SPACES}
          label={t("toolbar.selectTabSize.label")}
        />
        <Select
          options={themeOptions}
          value={config.theme}
          onChange={(event) => handleSelect(event, "theme")}
          label={t("toolbar.theme.label")}
        />
        <Select
          id="changeLanguage"
          ariaLabel={t("toolbar.languageSwitcher.label")}
          value={i18n.language}
          options={[
            {
              label: "EN",
              ariaLabel: t("languageSwitcher.options.en"),
              value: "en",
            },
            {
              label: "ES",
              ariaLabel: t("languageSwitcher.options.es"),
              value: "es",
            },
          ]}
          onChange={(event) => changeLanguage(event)}
        />
        <DarkModeButton />
      </Toolbar>
    </SiteHeader>
  );
};

export default Header;
