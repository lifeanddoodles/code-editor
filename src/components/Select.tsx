import { FormattedOptionProps, SelectProps } from '../interfaces';
import Group from './Group';

const Option = ({ label, value }: FormattedOptionProps) => {
  return <option value={value}>{label}</option>;
};

const Select = ({ label, options, value, onChange, disabled }: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };

  return (
    <Group>
      {label && <label>{label}</label>}
      <select value={value} onChange={handleChange} disabled={disabled}>
        {options.map((option) => (
          <Option
            label={option.label}
            value={option.value}
            key={option.value}
          />
        ))}
      </select>
    </Group>
  );
};

export default Select;
