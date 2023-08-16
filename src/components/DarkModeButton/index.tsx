import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useDarkMode from "../../hooks/useDarkMode";
import IconButton from "../IconButton";

const DarkModeButtonStyled = styled(IconButton)``;

const DarkModeButton = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "header.darkModeToggle",
  });
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <DarkModeButtonStyled
      onClick={toggleDarkMode}
      ariaLabel={darkMode ? t("toggleOff") : t("toggleOn")}
      className="button-icon"
    >
      {darkMode ? (
        <MoonIcon className="button-icon__icon padding-1" />
      ) : (
        <SunIcon className="button-icon__icon" />
      )}
    </DarkModeButtonStyled>
  );
};

export default DarkModeButton;
