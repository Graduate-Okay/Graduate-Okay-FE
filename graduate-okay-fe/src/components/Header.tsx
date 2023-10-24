import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useCheckMobile from "../hooks/useCheckMobile";
import BackButton from "../assets/imgs/BackButton.svg";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const moveMain = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderDiv>
        <SubDiv>
          {useCheckMobile() < theme.deviceSizes.tablet ? (
            <img src={BackButton} alt="뒤로가기" onClick={() => navigate(-1)} />
          ) : null}
        </SubDiv>
        <img src="imgs/logo.png" alt="헤더로고" onClick={moveMain} />
        <SubDiv
          onClick={() => {
            alert("준비중입니다");
          }}
        >
          <p>로그인</p>
        </SubDiv>
      </HeaderDiv>
    </ThemeProvider>
  );
};

export default Header;

const HeaderDiv = styled.header`
  display: flex;
  align-content: center;
  justify-content: space-around;
  width: 100%;
  height: 9vh;
  margin-top: 1.2rem;

  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
    margin: 1.2rem auto;
  }
`;

const SubDiv = styled.div`
  display: flex;
  > p {
    font-size: 1.4rem;
    margin: auto 0;
  }
  > img {
    width: 3.8rem;
  }
`;
