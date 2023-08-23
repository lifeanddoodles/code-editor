import styled from "styled-components";
import { ButtonProps } from "../../interfaces";
import Button from "../Button";

const StyledTab: React.FC<ButtonProps> = styled(Button)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  --button-background-color: var(--pane-header-title);
  color: inherit;
`;

const Tab = ({
  label,
  id,
  ariaControls,
  ariaSelected,
  onClick,
}: ButtonProps) => (
  <StyledTab
    id={id}
    role="tab"
    ariaControls={ariaControls}
    ariaSelected={ariaSelected}
    onClick={onClick}
  >
    {label}
  </StyledTab>
);

export default Tab;
