import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label?: string;
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: "true" | "false";
  variant?: string;
};

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
      role={role}
      className={className}
      variant={variant}
    >
      {label || children}
    </StyledButton>
  );
};

export default Button;
