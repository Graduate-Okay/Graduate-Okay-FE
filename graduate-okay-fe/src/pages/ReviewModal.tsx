import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const ReviewModal: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ModalSection>
        <p>sdf</p>
      </ModalSection>
    </ThemeProvider>
  );
};

export default ReviewModal;

const ModalSection = styled.section`
  display: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;
