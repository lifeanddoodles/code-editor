import { Trans } from "react-i18next";
import styled from "styled-components";

const SiteFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 1rem;
`;

const currentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  return (
    <SiteFooter>
      <p className="copyright">
        <Trans i18nKey="footer.copyright" values={{ year: currentYear() }} />
      </p>
    </SiteFooter>
  );
};

export default Footer;
