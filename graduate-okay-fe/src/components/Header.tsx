import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useCheckMobile from "../hooks/useCheckMobile";
import { useCookies } from "react-cookie";

interface TextProps {
  borderRight?: boolean;
  color?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  const handlelogOut = () => {
    alert("로그아웃되었습니다.");
    removeCookie("accessToken");
    localStorage.clear();
    navigate("/");
  };

  const getFillValue = (path: string) => {
    return location.pathname === path ? theme.colors.selectFooter : "black";
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderDiv>
        <img src="imgs/logo.png" alt="헤더로고" onClick={() => navigate("/")} />
        {useCheckMobile() < theme.deviceSizes.tablet ? null : (
          <NavBar>
            <Link to="/kyRecommend">인기교양추천</Link>
            <Link to="/graduate">졸업요건조회</Link>
            <Link to="/mypage">마이페이지</Link>
          </NavBar>
        )}
        <SubDiv>
          <Text
            onClick={() => navigate("/notice")}
            borderRight={true}
            color={getFillValue("/notice")}
          >
            공지사항
          </Text>
          {cookies.accessToken ? (
            <Text onClick={() => handlelogOut()}>로그아웃</Text>
          ) : (
            <Text
              onClick={() => navigate("/login")}
              color={getFillValue("/login")}
            >
              로그인
            </Text>
          )}
        </SubDiv>
      </HeaderDiv>
    </ThemeProvider>
  );
};

export default Header;

const HeaderDiv = styled.header`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 90%;
  height: 6vh;
  margin: 1rem auto;

  > img {
    cursor: pointer;
  }

  @media ${({ theme }) => theme.device.desktop} {
    width: 90%;
  }
`;

const SubDiv = styled.div`
  display: flex;
`;

const Text = styled.p<TextProps>`
  display: flex;
  font-size: 1.2rem;
  width: 60px;
  justify-content: center;
  margin: auto 0;
  cursor: pointer;
  border-right: ${(props) => props.borderRight && "1px solid black"};
  color: ${(props) => props.color};

  &:hover {
    opacity: 0.5;
  }

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
    width: 80px;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.6rem;
  }
`;

const NavBar = styled.nav`
  font-family: ${theme.fonts.JejuGothic};
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.6rem;
  width: 50%;

  a {
    &:hover {
      opacity: 0.5;
    }
  }

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2rem;
  }
`;
