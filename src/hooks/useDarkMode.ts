import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function useDarkMode() {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(() => {
      return storedTheme ? storedTheme === "dark" : prefersDarkScheme;
    });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [darkMode]);

  const toggleDarkMode: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setDarkMode((prevDarkMode) => !prevDarkMode);
    }, []);

  return { darkMode, toggleDarkMode };
}
