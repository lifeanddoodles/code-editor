import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--button-background-color);
  color: var(--button-color);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.65rem 1rem;
  :hover {
    filter: brightness(0.9);
  }
`;

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  name?: string;
  id?: string;
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  name,
  id,
  'aria-label': ariaLabel,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
  };

  return (
    <StyledButton
      name={name}
      id={id}
      onClick={(event) => handleClick(event)}
      aria-label={ariaLabel}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
