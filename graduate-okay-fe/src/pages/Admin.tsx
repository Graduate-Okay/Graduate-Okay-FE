import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Admin: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <p>admin</p>
    </ThemeProvider>
  );
};

export default Admin;
