import styled from "styled-components";

type DetailsProps = {
  className: string;
  open: boolean;
  children: React.ReactNode;
};

const StyledDetails = styled.details`
  display: grid;
  grid-auto-flow: row;
  position: relative;

  .code-editor_ref {
    height: 100%;
    position: relative;
  }

  .cm-editor {
    height: 100%;
  }
`;

const Details = ({ open, children, className }: DetailsProps) => {
  return (
    <StyledDetails className={className} open={open}>
      {children}
    </StyledDetails>
  );
};

export default Details;
