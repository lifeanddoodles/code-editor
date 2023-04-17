import { FC } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  user-select: none;
`;

interface LabelProps {
  label: string;
  htmlFor?: string;
}

const Label: FC<LabelProps> = ({ label, htmlFor }) => {
  return <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>;
};

export default Label;
