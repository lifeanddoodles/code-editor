import { OptionGroupProps } from "../../interfaces";
import Option from "../Option";

const OptionGroup = ({ label, options }: OptionGroupProps) => {
  return (
    <optgroup label={label}>
      {options.map((option) => (
        <Option
          label={option.label}
          value={option.value}
          ariaLabel={option.ariaLabel}
          key={option.value}
        />
      ))}
    </optgroup>
  );
};

export default OptionGroup;
