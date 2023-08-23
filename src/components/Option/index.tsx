import { OptionProps } from "../../interfaces";

const Option = ({ label, value, ariaLabel }: OptionProps) => {
  return (
    <option value={value} aria-label={ariaLabel}>
      {label}
    </option>
  );
};

export default Option;
