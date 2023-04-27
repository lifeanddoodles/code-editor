import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Checkbox from './components/Checkbox';
import Column from './components/Column';
import EditorContainer from './components/EditorContainer';
import Iframe from './components/Iframe';
import Row from './components/Row';
import Toolbar from './components/Toolbar';
import { INDENT_VALUES, LANGUAGES, Translation } from './interfaces';

const StyledContainer = styled.div`
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

const title: Translation = {
  en: 'Hinting Email Code Editor',
  es: 'Editor de Código de Email',
};

const lineWrappingLabel: Translation = {
  en: 'Line wrapping',
  es: 'Ajuste de línea',
};

const htmlInstructions: Translation = {
  en: `Start editing your ${LANGUAGES.HTML} here`,
  es: `Empieza a editar tu ${LANGUAGES.HTML} aquí.`,
};

const cssInstructions: Translation = {
  en: `Write ${LANGUAGES.CSS} styles here`,
  es: `Escribe estilos ${LANGUAGES.CSS} aquí.`,
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
  const [enableLineWrapping, setEnableLineWrapping] = useState(true);
  const [config, setConfig] = useState({
    lang: 'en',
    indentWidth: 2,
    emmet: true,
    lineWrapping: enableLineWrapping,
    indentUnit: INDENT_VALUES.TABS,
    lint: true,
  });
  const [html, setHtml] = useState(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Email template</title>
    </head>
    <body>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td class="container">
            <h1>${htmlInstructions[config.lang]}</h1>
          </td>
        </tr>
      </table>
    </body>
  </html>`);
  const [css, setCss] = useState(`/* ${cssInstructions[config.lang]} */`);
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
          <Column
            className='code-editors'
            gridAutoRows={'min(320px, 50%)'}
            rowGap={'1rem'}
          >
            <EditorContainer
              language={LANGUAGES.HTML}
              value={html}
              onChange={setHtml}
              displayName='HTML'
              editorSettings={{
                lineWrapping: enableLineWrapping,
                indentUnit: INDENT_VALUES.TABS,
                indentWidth: +config.indentWidth,
                emmet: config.emmet,
                lint: true,
              }}
            />
            <EditorContainer
              language={LANGUAGES.CSS}
              value={css}
              onChange={setCss}
              displayName='CSS'
              editorSettings={{
                lineWrapping: enableLineWrapping,
                indentUnit: INDENT_VALUES.TABS,
                indentWidth: +config.indentWidth,
                emmet: config.emmet,
                lint: true,
              }}
            />
          </Column>
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
      <footer>
        <p>2023</p>
      </footer>
    </>
  );
}

export default App;
