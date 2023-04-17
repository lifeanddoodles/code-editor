import React from 'react';
import styled from 'styled-components';

const StyledGroup = styled.div`
  display: flex;
  width: 100%;
`;

export interface GroupProps {
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
  role?: string;
}

const Group: React.FC<GroupProps> = ({
  role = 'group',
  children,
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  return (
    <StyledGroup
      role={role}
      className={className}
      id={id}
      aria-label={ariaLabel}
    >
      {children}
    </StyledGroup>
  );
};

export default Group;
