import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Header: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HeaderDiv>
        <a href="/">
          <img className="header-img" src="imgs/logo.png" alt="헤더로고" />
        </a>
      </HeaderDiv>
    </ThemeProvider>
  );
};

export default Header;

const HeaderDiv = styled.header`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 1.2rem;
  @media ${({ theme }) => theme.device.tablet} {
    height: 200vh;
  }
`;
