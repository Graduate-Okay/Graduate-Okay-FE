import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Review: React.FC = () => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default Review;
