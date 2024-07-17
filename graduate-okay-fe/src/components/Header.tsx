import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useCheckMobile from "../hooks/useCheckMobile";
import { useCookies } from "react-cookie";
import { HEADER_DATA, LOGIN, LOGOUT, myPage } from "../constants/constants";

interface TextProps {
  borderRight?: boolean;
  color?: string;
  width: string;
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
        <TitleDiv>
          <Image
            src="imgs/logo.png"
            alt="헤더로고"
            onClick={() => navigate("/")}
          />
          {useCheckMobile() < theme.deviceSizes.tablet ? null : (
            <Navigation>
              {HEADER_DATA.map((data) => {
                return (
                  <Text
                    onClick={() => navigate(`${data.navigate}`)}
                    color={getFillValue(`${data.navigate}`)}
                    width={"120px"}
                  >
                    {data.title}
                  </Text>
                );
              })}
            </Navigation>
          )}
        </TitleDiv>
        <SubDiv>
          <Text
            onClick={() => navigate(`${myPage[2].sub[0].link}`)}
            width={"70px"}
            color={getFillValue(`${myPage[2].sub[0].link}`)}
          >
            {myPage[2].sub[0].text}
          </Text>
          <p>|</p>
          {cookies.accessToken ? (
            <Text onClick={() => handlelogOut()} width={"70px"}>
              {LOGOUT.title}
            </Text>
          ) : (
            <Text
              onClick={() => navigate(`${LOGIN.navigate}`)}
              color={getFillValue(`${LOGIN.navigate}`)}
              width={"70px"}
            >
              {LOGIN.title}
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
  min-height: 2.5rem;
  margin: 1rem auto;

  > img {
    cursor: pointer;
    min-height: 4rem;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: space-between;

  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 60%;
  }
`;

const SubDiv = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: space-evenly;

  @media ${({ theme }) => theme.device.tablet} {
    width: 15%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 13%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 10%;
  }
`;

const Text = styled.p<TextProps>`
  display: flex;
  font-size: 1.2rem;
  width: ${(props) => props.width};
  justify-content: center;
  margin: auto 0;
  cursor: pointer;
  color: ${(props) => props.color};

  &:hover {
    opacity: 0.5;
  }

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  width: 70%;
  height: 100%;
`;

const Image = styled.img`
  display: flex;
  cursor: pointer;
`;
