import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Checkbox from "../../components/Checkbox";
import Select from "../../components/Select";
import Toolbar from "../../components/Toolbar";
import { selectIndentType, selectTabSize, title } from "../../data/uiText";
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
      <h1>{title[i18n.language]}</h1>
      <Toolbar>
        <Checkbox
          id="lineWrapping"
          name="lineWrapping"
          label={t("toolbar.lineWrappingLabel")}
          checked={enableLineWrapping}
          onChange={setEnableLineWrapping}
        />
        <Select
          options={getOptions(selectIndentType?.options, i18n.language)}
          value={config.indentUnit}
          onChange={(event) => handleSelect(event, "indentUnit")}
          label={selectIndentType?.label[i18n.language]}
        />
        <Select
          options={getOptions(selectTabSize?.options, i18n.language)}
          value={config.indentWidth}
          onChange={(event) => handleSelect(event, "indentWidth")}
          disabled={config.indentUnit === INDENT_VALUES.SPACES}
          label={selectTabSize.label[i18n.language]}
        />
        <Select
          id="changeLanguage"
          ariaLabel={"Change Language"}
          value={i18n.language}
          options={[
            { label: "EN", value: "en" },
            { label: "ES", value: "es" },
          ]}
          onChange={(event) => changeLanguage(event)}
        />
      </Toolbar>
    </SiteHeader>
  );
};

export default Header;
