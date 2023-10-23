import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import OtherViewFooter from "./OtherViewFooter";
import MobileViewFooter from "./MobileViewFooter";
import useCheckMobile from "../../hooks/useCheckMobile";

const Footer: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {useCheckMobile() < theme.deviceSizes.tablet ? (
        <MobileViewFooter />
      ) : (
        <OtherViewFooter />
      )}
    </ThemeProvider>
  );
};

export default Footer;
