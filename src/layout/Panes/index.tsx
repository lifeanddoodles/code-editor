import { RefObject, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CodeEditorsPane from "../../components/CodeEditorsPane";
import Column from "../../components/Column";
import IframeColumn from "../../components/IframeColumn";
import Row from "../../components/Row";
import { useCodesContentContext } from "../../context";
import { CODE_SAMPLES } from "../../data/code";

const StyledContainer = styled.main`
  flex-grow: 1;
  overflow: hidden;

  .code-wrapper {
    height: 100%;

    @media screen and (max-width: 640px) {
      grid-auto-rows: 1fr;
    }
  }

  .code-preview {
    grid-auto-rows: 1fr max-content;
  }
`;

const StyledHeading = styled.h2`
  text-align: center;
`;

const Panes = () => {
  const { t } = useTranslation("translation", { keyPrefix: "codePanes" });
  const { html, css, config } = useCodesContentContext();
  const [srcDoc, setSrcDoc] = useState("");

  const handleCopyCode = useCallback(
    async (ref: RefObject<HTMLIFrameElement>) => {
      try {
        const content = ref.current?.contentWindow?.document.body.innerHTML;
        const preElement = document.createElement("pre");
        preElement.innerText = content!;

        /*
         * TODO: Fix whitespace issues
         */
        await navigator.clipboard
          .writeText(preElement.textContent!)
          .then(() => {
            console.log("Content copied to clipboard:", content);
          });
      } catch (err) {
        console.error("Could not write to clipboard", err);
      }
    },
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        css
          ? `
        <html>
          <body>${html}</body>
          <style>${css}</style>
        </html>
      `
          : `
        <html>
          <body>${html}</body>
        </html>
      `
      );
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
          {!html ? (
            <StyledHeading>{t("instructions.empty")}</StyledHeading>
          ) : (
            <IframeColumn
              srcDoc={srcDoc}
              title="Example"
              width={"100%"}
              height={"100%"}
              onClick={handleCopyCode}
            />
          )}
        </Column>
      </Row>
    </StyledContainer>
  );
};

export default Panes;
