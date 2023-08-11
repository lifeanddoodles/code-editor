import { Fragment } from "react";
import styled from "styled-components";
import { FormattedOptionProps, SelectProps } from "../interfaces";
import Group from "./Group";

const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  grid-area: select;

  &::-ms-expand {
    display: none;
  }

  &:focus + .focus {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid var(--color-focus);
    border-radius: inherit;
  }
`;

const StyledCustomSelect = styled.div`
  width: fit-content;
  max-width: min(30ch, 50%);
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: var(--neutral-color-lighter);
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  margin-block: 1rem;

  &::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }

  label + & {
    margin-inline-start: 0.5rem;
  }
`;

const StyledCustomGroup = styled(Group)`
  align-items: center;
`;

const StyledLabel = styled.label`
  ${StyledCustomGroup} & {
    margin-block: 1rem;
  }
`;

const Option = ({ label, value }: FormattedOptionProps) => {
  return <option value={value}>{label}</option>;
};

const Select = ({
  label,
  ariaLabel,
  options,
  value,
  onChange,
  id,
  disabled,
}: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };

  const SelectWrapper = label ? StyledCustomGroup : Fragment;

  return (
    <SelectWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledCustomSelect>
        <StyledSelect
          id={id}
          value={value}
          aria-label={ariaLabel}
          onChange={handleChange}
          disabled={disabled}
        >
          {options.map((option) => (
            <Option
              label={option.label}
              value={option.value}
              key={option.value}
            />
          ))}
        </StyledSelect>
        <span className="focus"></span>
      </StyledCustomSelect>
    </SelectWrapper>
  );
};

export default Select;
