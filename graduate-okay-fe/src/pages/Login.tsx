import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Login: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoginSection>
        <LoginDiv>LOGIN</LoginDiv>
        <LoginInput placeholder="아이디" type="text" autoFocus />
        <LoginSub>한신대학교 이메일 아이디로만 로그인이 가능합니다.</LoginSub>
        <LoginInput placeholder="비밀번호" type="password" />
        <LoginStatus>
          <input type="checkbox" />
          <p>로그인 상태 유지</p>
        </LoginStatus>
        <SubmitLogin onClick={() => alert("준비중입니다")}>LOGIN</SubmitLogin>
        <Account>
          <p>회원가입</p>
          <p>비밀번호찾기</p>
        </Account>
      </LoginSection>
    </ThemeProvider>
  );
};

export default Login;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60vh;
  margin: 5% auto;
`;

const LoginDiv = styled.div`
  display: flex;
  width: 100%;
  height: 8vh;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

const LoginSub = styled.div`
  display: flex;
  width: 80%;
  margin-top: 0.5rem;
  justify-content: center;
`;

const LoginInput = styled.input`
  display: flex;
  width: 80%;
  height: 3vh;
  margin: 0 auto;
  margin-top: 1.5vh;
  &:focus {
    outline: none;
    border-color: #d6d6f5;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
`;

const LoginStatus = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    margin: 0 auto;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
`;

const SubmitLogin = styled.div`
  display: flex;
  width: 90%;
  height: 3rem;
  margin: 3rem auto;
  border-radius: 3px;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #9b59b6;
  &:hover {
    background-color: #d6d6f5;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
`;

const Account = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 1.1rem;
  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    margin: 0 auto;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
`;
