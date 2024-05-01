import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useCheckMobile from "../hooks/useCheckMobile";
import { useCookies } from "react-cookie";

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
          <img
            src="imgs/logo.png"
            alt="헤더로고"
            onClick={() => navigate("/")}
          />
          {useCheckMobile() < theme.deviceSizes.tablet ? null : (
            <Navigation>
              <Text
                onClick={() => navigate("/kyRecommend")}
                color={getFillValue("/kyRecommend")}
                width={"120px"}
              >
                인기교양추천
              </Text>
              <Text
                onClick={() => navigate("/graduate")}
                color={getFillValue("/graduate")}
                width={"120px"}
              >
                졸업요건조회
              </Text>
              <Text
                onClick={() => navigate("/recruit")}
                color={getFillValue("/recruit")}
                width={"120px"}
              >
                채용공고
              </Text>
              <Text
                onClick={() => navigate("/mypage")}
                color={getFillValue("/mypage")}
                width={"120px"}
              >
                마이페이지
              </Text>
            </Navigation>
          )}
        </TitleDiv>
        <SubDiv>
          <Text
            onClick={() => navigate("/notice")}
            borderRight={true}
            width={"60px"}
            color={getFillValue("/notice")}
          >
            공지사항
          </Text>
          {cookies.accessToken ? (
            <Text onClick={() => handlelogOut()} width={"60px"}>
              로그아웃
            </Text>
          ) : (
            <Text
              onClick={() => navigate("/login")}
              color={getFillValue("/login")}
              width={"60px"}
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
`;

const Text = styled.p<TextProps>`
  display: flex;
  font-size: 1.2rem;
  width: ${(props) => props.width};
  justify-content: center;
  margin: auto 0;
  cursor: pointer;
  border-right: ${(props) => props.borderRight && "1px solid black"};
  color: ${(props) => props.color};

  &:hover {
    opacity: 0.5;
  }

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.4rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  width: 70%;
  height: 100%;
`;
