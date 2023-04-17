import styled from 'styled-components';

const StyledRow = styled.div`
  display: grid;
  max-width: 100%;

  @media screen and (min-width: 640px) {
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    margin: 0 auto;
  }
`;

interface RowProps {
  children:
    | boolean
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  className?: string;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-controls'?: string;
}

const Row: React.FC<RowProps> = ({
  children,
  className,
  id,
  role,
  'aria-label': ariaLabel,
  'aria-controls': ariaControls,
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
