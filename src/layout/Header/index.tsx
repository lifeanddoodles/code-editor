import { Cog8ToothIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Checkbox from "../../components/Checkbox";
import Column from "../../components/Column";
import DarkModeButton from "../../components/DarkModeButton";
import IconButton from "../../components/IconButton";
import Select from "../../components/Select";
import Toolbar from "../../components/Toolbar";
import { useCodesContentContext } from "../../context";
import { useGetThemes } from "../../data/themes";
import { selectIndentType, selectTabSize } from "../../data/uiText";
import useResponsive from "../../hooks/useResponsive";
import useScrollLock from "../../hooks/useScrollLock";
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

  @media screen and (max-width: 320px) {
    flex-direction: column;
    .header__toolbar {
      justify-content: center;
    }
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 1.5rem;
  }

  @media screen and (min-width: 321px) {
    .header__toolbar {
      justify-content: end;
    }
  }

  .header__toolbar--user-interface {
    grid-auto-flow: column;
    grid-template-columns: repeat(2, minmax(min-content, max-content));
    gap: 1rem;
    align-items: center;
  }

  .header__toolbar--mobile {
    flex-direction: row;
    align-items: center;

    .header__toolbar--code-options__controls {
      display: none;
    }
  }

  .header__toolbar--mobile-open {
    &.header__toolbar--mobile {
      display: grid;
      position: absolute;
      padding: 2rem 1rem;
      z-index: 100;
      height: 100%;
      background: var(--body-background);
      top: 0;
      left: 0;
      width: 100%;
      grid-auto-rows: max-content;
      justify-content: initial;
    }

    .header__toolbar--code-options__controls {
      display: grid;
    }
  }

  @media screen and (min-width: 681px) {
    .header__toolbar {
      flex-flow: row;
    }
    .header__toolbar--code-options {
      flex-grow: 1;
      display: flex;
    }
    .header__toolbar--code-options__controls {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1rem;
    }
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();
  const { darkMode } = useCodesContentContext();
  const themeOptions = useGetThemes(darkMode);
  const [isMobile] = useResponsive();

  const { t, i18n } = useTranslation("translation", { keyPrefix: "header" });

  const changeLanguage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const code = event?.target?.value;
      i18n.changeLanguage(code);
    },
    [i18n]
  );

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, key: string) => {
      const target = event?.target as HTMLSelectElement;
      setConfig({ ...config, [key]: target.value });
    },
    [setConfig]
  );

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    isMobileMenuOpen ? lockScroll() : unlockScroll();
  }, [isMobileMenuOpen]);

  return (
    <SiteHeader>
      <h1>{t("title")}</h1>
      <Toolbar
        className={`header__toolbar${
          isMobile ? " header__toolbar--mobile" : ""
        }${
          isMobile && isMobileMenuOpen ? " header__toolbar--mobile-open" : ""
        }`}
      >
        <Column className="header__toolbar--code-options">
          {isMobile && (
            <IconButton
              icon={isMobileMenuOpen ? <XMarkIcon /> : <Cog8ToothIcon />}
              onClick={toggleMobileMenu}
              ariaLabel={
                isMobileMenuOpen
                  ? "Close config options"
                  : "Open config options"
              }
              ariaControls="code-options"
              ariaExpanded={isMobileMenuOpen ? "true" : "false"}
            />
          )}
          <div
            className="header__toolbar--code-options__controls"
            id="code-options"
          >
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
              // TODO: make disabled styles more noticeable
              disabled={config.indentUnit === INDENT_VALUES.SPACES}
              label={t("toolbar.selectTabSize.label")}
            />
            <Select
              optionGroups={themeOptions}
              value={config.theme}
              onChange={(event) => handleSelect(event, "theme")}
              label={t("toolbar.theme.label")}
            />
          </div>
        </Column>
        <Column className="header__toolbar--user-interface" gridAutoRows="auto">
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
        </Column>
      </Toolbar>
    </SiteHeader>
  );
};

export default Header;
