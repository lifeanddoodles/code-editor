import Group from './Group';

interface Option {
  label: string;
  value: string | number;
  ariaLabel?: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const Option = ({ label, value }: Option) => {
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
