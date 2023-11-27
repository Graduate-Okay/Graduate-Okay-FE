import React from "react";
import styled, { ThemeProvider } from "styled-components";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import theme from "../constants/theme";
import useInput from "../hooks/useInput";
import api from "../apis/api";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const loginIdInput = useInput("");
  const passwordInput = useInput("");
  const [, setCookie] = useCookies(["accessToken"]);

  const submitLogin = async () => {
    if (isEmpty()) {
      alert("아이디와 비밀번호를 모두 입력해주세요");
      return;
    }
    try {
      await axios
        .post(`${api.admin}/login`, {
          loginId: loginIdInput.value,
          password: passwordInput.value,
        })
        .then((response) => {
          localStorage.clear();
          localStorage.setItem(
            "refreshToken",
            response?.data.data.tokenInfo.refreshToken
          );
          setCookie("accessToken", response?.data.data.tokenInfo.accessToken, {
            path: "/",
          });
        });

      //   navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  };
  const isEmpty = () => {
    return loginIdInput.value === "" || passwordInput.value === "";
  };
  return (
    <ThemeProvider theme={theme}>
      <LoginSection>
        <LoginDiv>ADMIN LOGIN</LoginDiv>
        <LoginInput
          placeholder="example"
          type="text"
          value={loginIdInput.value}
          onChange={loginIdInput.onChange}
          autoFocus
        />
        <LoginInput
          placeholder="password"
          type="password"
          value={passwordInput.value}
          onChange={passwordInput.onChange}
          onKeyDown={handleKeyDown}
        />
        <LoginStatus>
          <input type="checkbox" />
          <p>로그인 상태 유지</p>
        </LoginStatus>
        <SubmitLogin onClick={() => submitLogin()}>LOGIN</SubmitLogin>
        <Account>
          <p onClick={() => navigate(`/signup`)}>회원가입</p>
          <p onClick={() => navigate(`/find`)}>비밀번호찾기</p>
        </Account>
      </LoginSection>
    </ThemeProvider>
  );
};

export default Admin;

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
  > p {
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    margin: 0 auto;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
`;
