import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  max-width: 640px;
  margin-block: 1rem;
  border: var(--border-width) var(--border-style) var(--border-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  font-size: var(--font-size-code);
`;

interface TextAreaProps {
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ onChange, placeholder }) => {
  const [value, setValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(event);
    setValue(event.target.value);
  };
  return (
    <StyledTextArea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
