interface Option {
  label: string;
  value: string | number;
  ariaLabel?: string;
}

interface SelectProps {
  options: Option[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Option = ({ label, value }: Option) => {
  return <option value={value}>{label}</option>;
};

const Select = ({ options, value, onChange }: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <Option label={option.label} value={option.value} key={option.value} />
      ))}
    </select>
  );
};

export default Select;
