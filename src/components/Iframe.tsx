import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledIframe = styled.iframe``;

interface IframeProps {
  src?: string;
  srcDoc?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
}

const Iframe: React.FC<IframeProps> = ({
  src,
  srcDoc,
  title = '',
  width = '100%',
  height = '100%',
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onLoad = () => {
    console.log('Iframe loaded');
  };

  return (
    <StyledIframe
      src={src}
      srcDoc={srcDoc}
      title={title}
      frameBorder='0'
      width={width}
      height={height}
      ref={iframeRef}
      onLoad={onLoad}
    />
  );
};

export default Iframe;
