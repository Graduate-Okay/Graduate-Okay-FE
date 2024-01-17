import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
// import useCheckMobile from "../hooks/useCheckMobile";
// import BackButton from "../assets/imgs/BackButton.svg";
import { useCookies } from "react-cookie";

interface TextProps {
  borderRight?: boolean;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  const handlelogOut = () => {
    alert("로그아웃되었습니다.");
    removeCookie("accessToken");
    localStorage.clear();
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderDiv>
        <img src="imgs/logo.png" alt="헤더로고" onClick={() => navigate("/")} />
        {/* <SubDiv>
          {useCheckMobile() < theme.deviceSizes.tablet ? (
            <img src={BackButton} alt="뒤로가기" onClick={() => navigate(-1)} />
          ) : null}
        </SubDiv> */}
        <SubDiv>
          <Text onClick={() => navigate("/notice")} borderRight={true}>
            공지사항
          </Text>
          {cookies.accessToken ? (
            <Text onClick={() => handlelogOut()}>로그아웃</Text>
          ) : (
            <Text onClick={() => navigate("/login")}>로그인</Text>
          )}
        </SubDiv>

        {/* {cookies.accessToken ? (
          <SubDiv onClick={() => handlelogOut()}>
            <p>로그아웃</p>
          </SubDiv>
        ) : (
          <SubDiv onClick={() => navigate("/login")}>
            <p>로그인</p>
          </SubDiv>
        )} */}
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

  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
    margin: 1.2rem auto;
  }

  > img {
    cursor: pointer;
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

  &:hover {
    opacity: 0.5;
  }
`;
