import { Trans } from "react-i18next";

const currentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  return (
    <footer>
      <p className="copyright">
        <Trans i18nKey="footer.copyright" values={{ year: currentYear() }} />
      </p>
    </footer>
  );
};

export default Footer;
