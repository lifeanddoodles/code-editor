import React from "react";
import styled from "styled-components";

interface SummaryProps {
  title?: string;
  className?: string;
  icon?: JSX.Element;
  onClick?: (event: React.PointerEvent<HTMLButtonElement>) => void;
}

const StyledSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--pane-header-background);
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;

  h2 {
    font-size: 1rem;
    line-height: 1.25;
    margin: 0;
    border-top-right-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--pane-header-title);
  }

  :focus {
    outline: 2px solid var(--color-focus);
  }
`;

const Summary = ({ title, className, icon, onClick }: SummaryProps) => {
  return (
    <StyledSummary className={className} onClick={onClick}>
      <h2>{title}</h2>
      {icon}
    </StyledSummary>
  );
};

export default Summary;
