import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IframeProps } from "../interfaces";
import Button from "./Button";
import Iframe from "./Iframe";

const CopyButton = styled(Button)`
  border-radius: 0;
`;

const IframeColumn: React.FC<IframeProps> = ({
  src,
  srcDoc,
  title = "",
  width = "100%",
  height = "100%",
  onClick,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t } = useTranslation("translation", { keyPrefix: "codePanes" });

  const handleClick = () => {
    onClick && onClick(iframeRef);
  };

  return (
    <>
      <Iframe
        src={src}
        srcDoc={srcDoc}
        title={title}
        width={width}
        height={height}
        ref={iframeRef}
      />
      {/*
       * TODO: Change button label when copy successful
       */}
      <CopyButton label={t("copyButton")} onClick={handleClick} />
    </>
  );
};

export default IframeColumn;
