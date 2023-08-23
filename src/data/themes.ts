import { Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "codemirror";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  amy,
  ayuLight,
  barf,
  bespin,
  birdsOfParadise,
  boysAndGirls,
  clouds,
  cobalt,
  coolGlow,
  dracula,
  espresso,
  noctisLilac,
  rosePineDawn,
  smoothy,
  solarizedLight,
  tomorrow,
} from "thememirror";
import { useExtensionCompartment } from "../hooks/useExtensionCompartment";
import { EditorSettings } from "../interfaces";
import { getOptionGroups } from "../utils";

export const themeOptions = [
  { name: "Amy", value: "amy", variant: "dark" },
  { name: "Ayu Light", value: "ayuLight", variant: "light" },
  { name: "Barf", value: "barf", variant: "dark" },
  { name: "Bespin", value: "bespin", variant: "dark" },
  {
    name: "Birds of Paradise",
    value: "birdsOfParadise",
    variant: "dark",
  },
  { name: "Boys and Girls", value: "boysAndGirls", variant: "dark" },
  { name: "Clouds", value: "clouds", variant: "light" },
  { name: "Cobalt", value: "cobalt", variant: "dark" },
  { name: "Cool Glow", value: "coolGlow", variant: "dark" },
  { name: "Dracula", value: "dracula", variant: "dark" },
  { name: "Espresso", value: "espresso", variant: "light" },
  { name: "Noctis Lilac", value: "noctisLilac", variant: "light" },
  { name: "One Dark", value: "oneDark", variant: "dark" },
  { name: "Rosé Pine Dawn", value: "rosePineDawn", variant: "light" },
  { name: "Smoothy", value: "smoothy", variant: "light" },
  { name: "Solarized Light", value: "solarizedLight", variant: "light" },
  { name: "Tomorrow", value: "tomorrow", variant: "light" },
];

export const themes: { [key: string]: Extension } = {
  amy,
  ayuLight,
  barf,
  bespin,
  birdsOfParadise,
  boysAndGirls,
  clouds,
  cobalt,
  coolGlow,
  dracula,
  espresso,
  noctisLilac,
  oneDark,
  rosePineDawn,
  smoothy,
  solarizedLight,
  tomorrow,
};

export function createThemeOptions(
  themesArray: { name: string; value: string; variant: string }[]
) {
  return themesArray.map((theme) => ({
    label: theme.name,
    value: theme.value,
  }));
}

export function useGetThemes(darkMode: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "header.toolbar.theme",
  });
  const primaryOptions = useMemo(
    () => (darkMode ? "dark" : "light"),
    [darkMode]
  );

  const secondaryOptions = useMemo(
    () => (primaryOptions === "dark" ? "light" : "dark"),
    [primaryOptions]
  );

  function getThemeOptionGroups() {
    return getOptionGroups([
      {
        label: darkMode ? t("dark") : t("light"),
        options: createThemeOptions(
          themeOptions.filter((theme) => theme.variant === primaryOptions)
        ),
      },
      {
        label: t(`${secondaryOptions}`),
        options: createThemeOptions(
          themeOptions.filter((theme) => theme.variant === secondaryOptions)
        ),
      },
    ]);
  }

  const sortedThemeOptions = getThemeOptionGroups();
  return sortedThemeOptions;
}

export function useThemeExtension(
  editorSettings: EditorSettings,
  editorView: EditorView
) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    function loadTheme() {
      const loadedTheme = themes[editorSettings.theme];

      if (loadedTheme && typeof updateCompartment === "function") {
        updateCompartment([loadedTheme]);
      }
    }

    loadTheme();
  }, [editorSettings.theme, updateCompartment]);

  return compartment;
}
