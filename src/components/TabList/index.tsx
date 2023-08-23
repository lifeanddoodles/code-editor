import { Dispatch, useCallback } from "react";
import styled from "styled-components";
import { CodeSampleProps } from "../../interfaces";
import { getLanguageSetup } from "../../utils";
import Tab from "../Tab";

const StyledTabList = styled.section`
  background-color: var(--pane-header-background);
  display: flex;
  column-gap: 0.125rem;
`;

const TabList = ({
  codesList,
  activeTab,
  setActiveTab,
}: {
  codesList: CodeSampleProps[];
  activeTab: string;
  setActiveTab: Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSelectTab = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLButtonElement;
      setActiveTab(target.id);
    },
    [activeTab]
  );

  const getTabs = () => {
    return codesList.map((codeLang: CodeSampleProps) => {
      const codeObj = getLanguageSetup(codeLang.language);

      return (
        <Tab
          key={codeLang.language}
          label={codeObj?.label}
          id={`tab-${codeObj?.language}`}
          ariaControls={`tabpanel-${codeObj?.language}`}
          ariaSelected={
            activeTab === `tab-${codeObj?.language}` ? "true" : "false"
          }
          onClick={handleSelectTab}
        />
      );
    });
  };

  return <StyledTabList role="tablist">{getTabs()}</StyledTabList>;
};

export default TabList;
