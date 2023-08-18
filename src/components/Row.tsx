import styled from "styled-components";
import { RowProps } from "../interfaces";

const StyledRow = styled.div`
  display: grid;
  width: 100%;
  max-width: 100%;

  @media screen and (min-width: 640px) {
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    margin: 0 auto;
  }
`;

const Row: React.FC<RowProps> = ({
  children,
  className,
  id,
  role,
  "aria-label": ariaLabel,
  "aria-controls": ariaControls,
}) => {
  return (
    <StyledRow
      role={role}
      className={className}
      id={id}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
    >
      {children}
    </StyledRow>
  );
};

export default Row;
