import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const moveMain = () => {
    navigate("/");
  };
  return (
    <ThemeProvider theme={theme}>
      <HeaderDiv>
        <img src="imgs/logo.png" alt="헤더로고" onClick={moveMain} />
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
  width: 100%;
  height: 9vh;
`;
