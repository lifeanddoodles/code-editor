import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Checkbox from './components/Checkbox';
import CodeEditorsPane from './components/CodeEditorsPane';
import Column from './components/Column';
import Iframe from './components/Iframe';
import Row from './components/Row';
import Toolbar from './components/Toolbar';
import { useCodesContentContext } from './context';
import { CODE_SAMPLES } from './data/code';
import { lineWrappingLabel, title } from './data/uiText';
import { INDENT_VALUES } from './interfaces';

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;

  .code-wrapper {
    flex-grow: 1;
  }

  .code-editors {
  }

  .code-editor {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .code-editor_title {
    display: flex;
    justify-content: space-between;
    background-color: var(--secondary-color);
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .code-editor_ref {
    flex-grow: 1;
    overflow-y: hidden;
  }

  .cm-editor {
    height: 100%;
  }

  @media screen and (min-width: 640px) {
  }
`;

const Container = (props: {
  children:
    | boolean
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => <StyledContainer>{props.children}</StyledContainer>;

function App() {
  const [enableLineWrapping, setEnableLineWrapping] = useState(true);
  const [config, setConfig] = useState({
    lang: 'en',
    indentWidth: 2,
    emmet: true,
    lineWrapping: enableLineWrapping,
    indentUnit: INDENT_VALUES.TABS,
    lint: true,
  });
  const { html, css, setHtml, setCss } = useCodesContentContext();
  const [srcDoc, setSrcDoc] = useState('');

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    const target = event?.target as HTMLButtonElement;
    setConfig({ ...config, [key]: target.name });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css]);

  return (
    <>
      <header>
        <h1>{title[config.lang]}</h1>
      </header>
      <Container>
        <Toolbar>
          <Checkbox
            id='lineWrapping'
            name='lineWrapping'
            label={lineWrappingLabel[config.lang]}
            checked={enableLineWrapping}
            onChange={setEnableLineWrapping}
          />
          <ButtonGroup>
            <Button
              name='2'
              id='2'
              onClick={(event) => handleClick(event, 'indentWidth')}
              label={'2'}
            />
            <Button
              name='4'
              id='4'
              onClick={(event) => handleClick(event, 'indentWidth')}
              label={'4'}
            />
          </ButtonGroup>
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
        </Toolbar>
        <Row className='code-wrapper'>
          <CodeEditorsPane
            codesList={CODE_SAMPLES}
            editorSettings={{
              lineWrapping: enableLineWrapping,
              indentUnit: INDENT_VALUES.TABS,
              indentWidth: +config.indentWidth,
              emmet: config.emmet,
              gutters: ['CodeMirror-lint-markers'],
              lint: true,
            }}
            uiLanguage={config.lang}
            setHtml={setHtml}
            setCss={setCss}
          />
          <Column className='code-preview'>
            <Iframe
              srcDoc={srcDoc}
              title='Example'
              width={'100%'}
              height={'100%'}
            />
          </Column>
        </Row>
      </Container>
      {/* <footer>
        <p>2023</p>
      </footer> */}
    </>
  );
}

export default App;
