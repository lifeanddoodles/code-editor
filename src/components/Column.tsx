import styled from 'styled-components';

const StyledColumn = styled.div<ColumnProps>`
  display: grid;
  grid-auto-flow: row;
  ${({ gridAutoRows }) => gridAutoRows && `grid-auto-rows: ${gridAutoRows};`}
  ${({ gridTemplateRows }) =>
    gridTemplateRows && `grid-template-rows: ${gridTemplateRows};`}
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap};`}

  @media screen and (min-width: 640px) {
  }
`;

interface ColumnProps {
  children:
    | boolean
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  className?: string;
  gridAutoRows?: string;
  gridTemplateRows?: string;
  rowGap?: string;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-controls'?: string;
}

const Column: React.FC<ColumnProps> = ({
  children,
  className,
  gridAutoRows,
  gridTemplateRows,
  rowGap,
  id,
  role,
  'aria-label': ariaLabel,
  'aria-controls': ariaControls,
}) => {
  return (
    <StyledColumn
      role={role}
      className={className}
      gridAutoRows={gridAutoRows}
      gridTemplateRows={gridTemplateRows}
      rowGap={rowGap}
      id={id}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
    >
      {children}
    </StyledColumn>
  );
};

export default Column;
