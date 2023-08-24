import {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  ariaLabel?: string;
  ariaControls?: string;
  ariaSelected?: "true" | "false";
  ariaExpanded?: "true" | "false";
  variant?: string;
}

export interface CheckboxProps {
  "aria-label"?: string;
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange?: Dispatch<SetStateAction<boolean>>;
  required?: boolean;
  className?: string;
  value?: string | number | undefined;
}

export interface GroupProps {
  children:
    | boolean
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  className?: string;
  id?: string;
  "aria-label"?: string;
  role?: string;
}

export interface IframeProps {
  src?: string;
  srcDoc?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  ref?: RefObject<HTMLIFrameElement>;
  forwardRef?: RefObject<HTMLIFrameElement>;
  onClick?: (ref: RefObject<HTMLIFrameElement>) => void;
}

export interface MenuItemProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  label: string;
  href: string;
}

export interface LabelProps {
  label: string;
  htmlFor?: string;
}

export interface TextAreaProps {
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export interface ToolbarProps {
  children:
    | boolean
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
}

export interface SummaryProps {
  title?: string;
  className?: string;
  icon?: JSX.Element;
  onClick?: (event: React.PointerEvent<HTMLButtonElement>) => void;
}

export interface OptionProps {
  label: string | React.ReactElement;
  value: string | number;
  ariaLabel?: string;
}

export interface OptionGroupProps {
  label: string;
  options: OptionProps[];
}

export interface BaseSelectProps {
  id?: string;
  ariaLabel?: string;
  label?: string;
  disabled?: boolean;
  options?: OptionProps[];
  optionGroups?: OptionGroupProps[];
}

export interface SelectProps extends BaseSelectProps {
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
