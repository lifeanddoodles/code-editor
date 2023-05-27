import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Checkbox from './components/Checkbox';
import CodeEditorsPane from './components/CodeEditorsPane';
import Column from './components/Column';
import Iframe from './components/Iframe';
import Row from './components/Row';
import Select from './components/Select';
import Toolbar from './components/Toolbar';
import { useCodesContentContext } from './context';
import { CODE_SAMPLES } from './data/code';
import {
  lineWrappingLabel,
  selectIndentType,
  selectTabSize,
  title,
} from './data/uiText';
import { INDENT_VALUES } from './interfaces';
import { getOptions } from './utils';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  header,
  footer {
    height: auto;
  }
`;

const SiteHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1rem;
  gap: 2rem;

  h1 {
    font-size: 1.5rem;
  }
`;

const StyledContainer = styled.main`
  flex-grow: 1;
  overflow: hidden;

  .code-wrapper {
    height: 100%;
  }

  @media screen and (min-width: 640px) {
  }
`;

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

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    key: string,
  ) => {
    const target = event?.target as HTMLSelectElement;
    setConfig({ ...config, [key]: target.value });
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
    <PageContainer>
      <SiteHeader>
        <h1>{title[config.lang]}</h1>
        <Toolbar>
          <Checkbox
            id='lineWrapping'
            name='lineWrapping'
            label={lineWrappingLabel[config.lang]}
            checked={enableLineWrapping}
            onChange={setEnableLineWrapping}
          />
          <Select
            options={getOptions(selectIndentType?.options, config.lang)}
            value={config.indentUnit}
            onChange={(event) => handleSelect(event, 'indentUnit')}
            label={selectIndentType?.label[config.lang]}
          />
          <Select
            options={getOptions(selectTabSize?.options, config.lang)}
            value={config.indentWidth}
            onChange={(event) => handleSelect(event, 'indentWidth')}
            disabled={config.indentUnit === INDENT_VALUES.SPACES}
            label={selectTabSize.label[config.lang]}
          />
          <Select
            options={[
              { label: 'EN', value: 'en', ariaLabel: 'English' },
              { label: 'ES', value: 'es', ariaLabel: 'Español' },
            ]}
            value={config.lang}
            onChange={(event) => handleSelect(event, 'lang')}
          />
        </Toolbar>
      </SiteHeader>
      <StyledContainer>
        <Row className='code-wrapper'>
          <CodeEditorsPane
            codesList={CODE_SAMPLES}
            editorSettings={{
              lineWrapping: enableLineWrapping,
              indentUnit: config.indentUnit,
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
      </StyledContainer>
      <footer>
        <p>2023</p>
      </footer>
    </PageContainer>
  );
}

export default App;
