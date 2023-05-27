import { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';
import Group from './Group';
import Label from './Label';

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

interface CheckboxProps {
  'aria-label'?: string;
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange?: Dispatch<SetStateAction<boolean>>;
  required?: boolean;
  className?: string;
  value?: string | number | undefined;
}

const Checkbox: FC<CheckboxProps> = ({
  'aria-label': ariaLabel,
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
        type='checkbox'
      />
      <Label htmlFor={id} label={label} />
    </StyledCheckboxGroup>
  );
};

export default Checkbox;
