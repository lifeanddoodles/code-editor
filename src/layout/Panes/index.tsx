import { useEffect, useState } from "react";
import styled from "styled-components";
import CodeEditorsPane from "../../components/CodeEditorsPane";
import Column from "../../components/Column";
import Iframe from "../../components/Iframe";
import Row from "../../components/Row";
import { useCodesContentContext } from "../../context";
import { CODE_SAMPLES } from "../../data/code";

const StyledContainer = styled.main`
  flex-grow: 1;
  overflow: hidden;

  .code-wrapper {
    height: 100%;
  }

  @media screen and (min-width: 640px) {
  }
`;

const Panes = () => {
  const { html, css, config } = useCodesContentContext();
  const [srcDoc, setSrcDoc] = useState("");

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
    <StyledContainer>
      <Row className="code-wrapper">
        <CodeEditorsPane
          codesList={CODE_SAMPLES}
          editorSettings={{
            ...config,
            gutters: ["CodeMirror-lint-markers"],
            lint: true,
          }}
        />
        <Column className="code-preview">
          <Iframe
            srcDoc={srcDoc}
            title="Example"
            width={"100%"}
            height={"100%"}
          />
        </Column>
      </Row>
    </StyledContainer>
  );
};

export default Panes;
