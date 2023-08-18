import { FC } from "react";
import styled from "styled-components";
import { CheckboxProps } from "../interfaces";
import Group from "./Group";
import Label from "./Label";

const StyledCheckboxGroup = styled(Group)`
  align-items: baseline;
  column-gap: 0.5rem;
  margin-block: 1rem;

  label {
    line-height: 1;
  }
`;

const StyledCheckbox = styled.input`
  :focus {
    outline: 2px solid var(--color-focus);
  }
`;

const Checkbox: FC<CheckboxProps> = ({
  "aria-label": ariaLabel,
  id,
  name,
  label,
  checked,
  onChange,
  className,
  value,
  required,
}) => {
  const handleChange = () => {
    onChange && onChange(!checked);
  };

  return (
    <StyledCheckboxGroup>
      <StyledCheckbox
        id={id}
        name={name}
        aria-label={ariaLabel}
        value={value}
        checked={checked}
        className={className}
        onChange={handleChange}
        required={required}
        type="checkbox"
      />
      <Label htmlFor={id} label={label} />
    </StyledCheckboxGroup>
  );
};

export default Checkbox;
