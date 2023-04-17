import React from 'react';
import styled from 'styled-components';

const StyledToolbar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

interface ToolbarProps {
  children:
    | boolean
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-controls'?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({
  children,
  className,
  id,
  'aria-label': ariaLabel,
  'aria-controls': ariaControls,
}) => {
  return (
    <StyledToolbar
      role='toolbar'
      className={className}
      id={id}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
    >
      {children}
    </StyledToolbar>
  );
};

export default Toolbar;
