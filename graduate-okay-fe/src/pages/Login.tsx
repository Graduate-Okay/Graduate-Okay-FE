import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Login: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoginSection>
        <LoginDiv>s</LoginDiv>
      </LoginSection>
    </ThemeProvider>
  );
};

export default Login;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40vh;
  justify-content: center;
  align-items: center;
`;

const LoginDiv = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;
