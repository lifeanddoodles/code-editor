import { Fragment } from "react";
import styled from "styled-components";
import { SelectProps } from "../interfaces";
import Group from "./Group";
import Option from "./Option";
import OptionGroup from "./OptionGroup";

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
  width: max-content;
  max-width: min(30ch, 100%);
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: var(--select-background-color);
  color: var(--select-color);
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  margin-block: 1rem;

  &::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-color);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }

  :hover {
    background-color: var(--interactive-element-background-hover);
  }

  label + & {
    margin-inline-start: 0.5rem;
  }
`;

const StyledCustomGroup = styled(Group)`
  align-items: baseline;
`;

const StyledLabel = styled.label`
  ${StyledCustomGroup} & {
    margin-block: 1rem;
  }
`;

const Select = ({
  label,
  ariaLabel,
  options,
  optionGroups,
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
          {options?.map((option) => (
            <Option
              label={option.label}
              value={option.value}
              ariaLabel={option.ariaLabel}
              key={option.value}
            />
          ))}
          {optionGroups?.map((optionGroup) => (
            <OptionGroup
              key={optionGroup.label}
              label={optionGroup.label}
              options={optionGroup.options}
            />
          ))}
        </StyledSelect>
        <span className="focus"></span>
      </StyledCustomSelect>
    </SelectWrapper>
  );
};

export default Select;
