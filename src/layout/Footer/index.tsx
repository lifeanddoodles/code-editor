import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("translation", { keyPrefix: "footer" });

  return (
    <SiteFooter>
      <p className="copyright">{t("copyright", { year: currentYear() })}</p>
    </SiteFooter>
  );
};

export default Footer;
