import React from "react";
import styled from "styled-components";
import { GroupProps } from "../interfaces";

const StyledGroup = styled.div`
  display: flex;
`;

const Group: React.FC<GroupProps> = ({
  role = "group",
  children,
  className,
  id,
  "aria-label": ariaLabel,
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
