import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";

const Administration: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <p>admini</p>
    </ThemeProvider>
  );
};

export default Administration;
