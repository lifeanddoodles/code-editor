/*
 * Credits: https://blog.logrocket.com/create-advanced-scroll-lock-react-hook/
 */

import { useCallback, useLayoutEffect } from "react";

const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-compensation)";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarCompensation}px`
    );
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};

export default useScrollLock;
