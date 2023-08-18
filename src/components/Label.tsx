import { FC } from "react";
import styled from "styled-components";
import { LabelProps } from "../interfaces";

const StyledLabel = styled.label`
  user-select: none;
`;

const Label: FC<LabelProps> = ({ label, htmlFor }) => {
  return <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>;
};

export default Label;
