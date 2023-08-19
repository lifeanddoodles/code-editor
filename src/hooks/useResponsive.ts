import { useEffect, useMemo, useState } from "react";

enum sizes {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

function getScreenSize(width: number) {
  if (width <= 480) return sizes.xs;
  if (width > 480 && width <= 640) return sizes.sm;
  if (width > 640 && width <= 1280) return sizes.md;
  if (width > 1280 && width <= 1920) return sizes.lg;
  return sizes.xl;
}

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState(
    getScreenSize(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize(window.innerWidth));
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(
    () => [screenSize === sizes.xs || screenSize === sizes.sm, screenSize],
    [screenSize]
  );
};

export default useResponsive;
