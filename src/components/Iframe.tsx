import React, { useRef } from "react";
import styled from "styled-components";
import { IframeProps } from "../interfaces";

const StyledIframe = styled.iframe``;

const Iframe: React.FC<IframeProps> = ({
  src,
  srcDoc,
  title = "",
  width = "100%",
  height = "100%",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onLoad = () => {
    console.log("Iframe loaded");
  };

  return (
    <StyledIframe
      src={src}
      srcDoc={srcDoc}
      title={title}
      frameBorder="0"
      width={width}
      height={height}
      ref={iframeRef}
      onLoad={onLoad}
    />
  );
};

export default Iframe;
