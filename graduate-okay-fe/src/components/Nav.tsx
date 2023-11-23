import React from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useCheckMobile from "../hooks/useCheckMobile";

const Nav: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {useCheckMobile() < theme.deviceSizes.tablet ? null : (
        <NavBar>
          <Link to="/notice">공지사항</Link>
          <Link to="/kyRecommend">인기교양추천</Link>
          <Link to="/graduate">졸업요건조회</Link>
          <Link to="/mypage">마이페이지</Link>
        </NavBar>
      )}
    </ThemeProvider>
  );
};

export default Nav;

const NavBar = styled.nav`
  font-family: ${theme.fonts.JejuGothic};
  font-weight: lighter;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  width: 80%;
  margin: 1.2rem auto;
  font-size: 1.4rem;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.6rem;
    margin: 1.3rem auto;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2rem;
    margin: 1rem auto;
    width: 60%;
  }
`;
