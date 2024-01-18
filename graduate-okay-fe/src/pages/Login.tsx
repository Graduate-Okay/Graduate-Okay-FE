import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import axios, { AxiosError } from "axios";
import api from "../apis/api";
import CheckSchoolEmail from "../utils/CheckSchoolEmail";
import { useCookies } from "react-cookie";
import { ReactComponent as Logo } from "../assets/imgs/logo/logo.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const [, setCookie] = useCookies(["accessToken"]);

  const submitLogin = async () => {
    if (isEmpty()) {
      alert("아이디와 비밀번호를 모두 입력해주세요");
      return;
    }
    const email = emailInput.value;
    emailInput.value = CheckSchoolEmail(email);

    try {
      await axios
        .post(`${api.user}/login`, {
          email: emailInput.value,
          password: passwordInput.value,
        })
        .then((response) => {
          localStorage.clear();
          localStorage.setItem("id", response?.data.data.id);
          localStorage.setItem("nickname", response?.data.data.nickname);
          localStorage.setItem(
            "refreshToken",
            response?.data.data.tokenInfo.refreshToken
          );
          setCookie("accessToken", response?.data.data.tokenInfo.accessToken, {
            path: "/",
          });
        });

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      }
    }
  };

  const isEmpty = () => {
    return emailInput.value === "" || passwordInput.value === "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginSection>
        <LoginDiv>
          <Logo width="167" height="38" fill="#a489f0" />
        </LoginDiv>
        <LoginTitle>이메일</LoginTitle>
        <LoginInput
          type="text"
          value={emailInput.value}
          onChange={emailInput.onChange}
          title="학교 이메일로만 로그인 가능합니다."
          autoFocus
        />
        <Announcement>학교 이메일로만 로그인이 가능합니다.</Announcement>
        <LoginTitle>비밀번호</LoginTitle>
        <LoginInput
          type="password"
          value={passwordInput.value}
          onChange={passwordInput.onChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        <SubmitLogin onClick={() => submitLogin()}>로그인</SubmitLogin>
        <Account>
          <p onClick={() => navigate(`/signup`)}>회원가입</p>
          <p onClick={() => navigate(`/find`)}>비밀번호찾기</p>
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
  flex-direction: column;
  width: 100%;
  height: 14vh;
  justify-content: space-around;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const LoginInput = styled.input`
  display: flex;
  width: 80%;
  height: 3vh;
  margin: 0 auto;
  margin-top: 1.5vh;
  border: none;
  border-bottom: 1px solid #adadad;

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

const SubmitLogin = styled.div`
  display: flex;
  width: 80%;
  height: 4.2rem;
  margin: 3rem auto;
  border-radius: 30px;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #a489f0;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
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
  > p {
    cursor: pointer;
    font-size: 1.2rem;
  }
  &:hover {
    opacity: 0.5;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    margin: 0 auto;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
`;

const Announcement = styled.div`
  display: flex;
  color: gray;
  font-size: 1.1rem;
  width: 90%;
  height: 5vh;
  align-items: center;
  margin-left: auto;
`;

const LoginTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
  width: 90%;
  height: 3vh;
  align-items: center;
  margin-left: auto;
`;
