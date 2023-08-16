import styled from "styled-components";
import Button, { ButtonProps } from "../Button";

export type IconButtonProps = ButtonProps & {
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export const StyledIconButton = styled(Button)<IconButtonProps>`
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
`;

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <Button variant="icon" {...props}>
      {icon || children}
    </Button>
  );
};

export default IconButton;
