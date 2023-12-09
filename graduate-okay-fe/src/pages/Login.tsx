import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import axios, { AxiosError } from "axios";
import api from "../apis/api";
import CheckSchoolEmail from "../utils/CheckSchoolEmail";
import { useCookies } from "react-cookie";

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
        <LoginDiv>LOGIN</LoginDiv>
        <LoginInput
          placeholder="example@hs.ac.kr 또는 example"
          type="text"
          value={emailInput.value}
          onChange={emailInput.onChange}
          autoFocus
        />
        <LoginSub>한신대학교 이메일 아이디로만 로그인이 가능합니다.</LoginSub>
        <LoginInput
          placeholder="password"
          type="password"
          value={passwordInput.value}
          onChange={passwordInput.onChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        <SubmitLogin onClick={() => submitLogin()}>LOGIN</SubmitLogin>
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
