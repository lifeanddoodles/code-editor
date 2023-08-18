export interface ColumnProps {
  children:
    | boolean
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  className?: string;
  gridAutoRows?: string;
  gridTemplateRows?: string;
  rowGap?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
}

export interface RowProps {
  children:
    | boolean
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
}
