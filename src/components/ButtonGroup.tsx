import React from 'react';
import styled from 'styled-components';
import Group, { GroupProps } from './Group';

const StyledButtonGroup = styled(Group)`
  margin-block: 1rem;
  column-gap: 1rem;
`;

const ButtonGroup: React.FC<GroupProps> = ({
  children,
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  return (
    <StyledButtonGroup className={className} id={id} aria-label={ariaLabel}>
      {children}
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
