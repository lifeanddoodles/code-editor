import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Editor from './components/Editor';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Translation {
  [key: string]: string;
}

const title: Translation = {
  en: 'Hinting Email Code Editor',
  es: 'Editor de Código de Email',
};

const Container = (props: {
  children:
    | boolean
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => <StyledContainer>{props.children}</StyledContainer>;

function App() {
  const [config, setConfig] = useState({ lang: 'en' });
  const [code, setCode] = useState('');

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    const target = event?.target as HTMLButtonElement;
    setConfig({ ...config, [key]: target.name });
  };

  return (
    <Container>
      <h1>{title[config.lang]}</h1>
      <Editor />
      <ButtonGroup>
        <Button
          name='en'
          id='en'
          onClick={(event) => handleClick(event, 'lang')}
          label={'EN'}
          aria-label='English'
        />
        <Button
          name='es'
          id='es'
          onClick={(event) => handleClick(event, 'lang')}
          label={'ES'}
          aria-label='Español'
        />
      </ButtonGroup>
    </Container>
  );
}

export default App;
