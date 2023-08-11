import styled from "styled-components";
import "./App.css";
import { useCodesContentContext } from "./context";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Panes from "./layout/Panes";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  header,
  footer {
    height: auto;
  }
`;

function App() {
  const { config, setConfig } = useCodesContentContext();

  return (
    <PageContainer>
      <Header config={config} setConfig={setConfig} />
      <Panes />
      <Footer />
    </PageContainer>
  );
}

export default App;
