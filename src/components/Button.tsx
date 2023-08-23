import React from "react";
import styled from "styled-components";
import { ButtonProps } from "../interfaces";

export const UnstyledButton = styled.button`
  border: none;
  cursor: pointer;
`;

export const StyledButton = styled(UnstyledButton)<ButtonProps>`
  background-color: var(--button-background-color);
  color: var(--button-color);
  border-radius: var(--border-radius);
  padding: 0.65rem 1rem;
  font-size: 1em;
  transition: filter 0.25s;

  :hover {
    background-color: var(--interactive-element-background-hover);
  }

  :focus {
    outline: 2px solid var(--color-focus);
  }

  ${({ variant }) =>
    variant &&
    variant === "icon" &&
    `
    --button-background-color: transparent;
    width: 2rem;
    height: 2rem;
    color: var(--font-color);
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 50%;

    :hover {
      background-color: var(--interactive-element-background-hover);
    }
  `}
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  name,
  id,
  ariaLabel,
  ariaControls,
  ariaSelected,
  ariaExpanded,
  role,
  children,
  className,
  variant,
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
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-selected={ariaSelected}
      role={role}
      className={className}
      variant={variant}
    >
      {label || children}
    </StyledButton>
  );
};

export default Button;
