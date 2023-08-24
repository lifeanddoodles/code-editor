import { Ref, forwardRef } from "react";
import styled from "styled-components";
import { IframeProps } from "../../interfaces";

const StyledIframe = styled.iframe``;

const Iframe = forwardRef(
  (
    { src, srcDoc, title = "", width = "100%", height = "100%" }: IframeProps,
    ref: Ref<HTMLIFrameElement>
  ) => {
    return (
      <StyledIframe
        src={src}
        srcDoc={srcDoc}
        title={title}
        width={width}
        height={height}
        ref={ref}
        allow="clipboard-write"
      />
    );
  }
);

export default Iframe;
