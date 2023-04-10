import React from 'react';
import styled from 'styled-components';

const StyledButtonGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 640px;
  margin-block: 1rem;
  column-gap: 1rem;
`;

interface ButtonGroupProps {
  children:
    | boolean
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return <StyledButtonGroup role='group'>{children}</StyledButtonGroup>;
};

export default ButtonGroup;
