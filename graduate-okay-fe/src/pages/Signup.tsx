import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useInput from "../hooks/useInput";
import axios, { AxiosError } from "axios";
import api from "../apis/api";
import CheckSchoolEmail from "../utils/CheckSchoolEmail";
import { ReactComponent as Logo } from "../assets/imgs/logo/logo.svg";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const emailInput = useInput("");
  const authNumber = useInput("");
  const passwordInput = useInput("");

  const sendAuthNumber = async () => {
    if (isEmpty()) {
      alert("이메일을 입력해주세요");
      return;
    }
    alert("인증번호를 전송했습니다. 메일을 확인해주세요");
    const email = emailInput.value;
    emailInput.value = CheckSchoolEmail(email);

    try {
      setIsClick(true);
      await axios.post(`${api.user}/email`, {
        email: emailInput.value,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      }
    }
  };

  const submitAuthNumber = async () => {
    if (isEmpty()) {
      alert("인증번호를 입력해주세요");
      return;
    }
    try {
      const response = await axios.get(`${api.user}/email`, {
        params: {
          number: authNumber.value,
        },
      });
      if (response?.data.status === "OK") {
        setIsAuth(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      }
    }
  };

  const submitPassword = async () => {
    if (isEmpty()) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    const email = emailInput.value;
    emailInput.value = CheckSchoolEmail(email);

    try {
      const response = await axios.post(`${api.user}/join`, {
        email: emailInput.value,
        password: passwordInput.value,
      });
      if (response?.data.status === "CREATED") {
        alert("회원가입이 완료되었습니다.");
      }
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      }
    }
  };

  const isEmpty = () => {
    return emailInput.value === "" ? true : false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendAuthNumber();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SignupSection>
        <SignupDiv>회원가입</SignupDiv>
        <LoginDiv>
          <Logo width="167" height="38" fill="#a489f0" />
        </LoginDiv>
        <SignupSub>한신대학교 이메일만 가입이 가능합니다.</SignupSub>
        <LoginTitle>이메일</LoginTitle>
        <SignupInput
          type="text"
          value={emailInput.value}
          onChange={emailInput.onChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        {isClick ? (
          <>
            <LoginTitle>인증번호를 입력해주세요.</LoginTitle>
            <SignupInput
              type="text"
              value={authNumber.value}
              onChange={authNumber.onChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </>
        ) : null}
        {isAuth ? (
          <>
            <LoginTitle>비밀번호 입력</LoginTitle>
            <SignupInput
              type="password"
              value={passwordInput.value}
              onChange={passwordInput.onChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </>
        ) : null}

        {isAuth ? (
          <SubmitSignup onClick={() => submitPassword()}>가입하기</SubmitSignup>
        ) : isClick ? (
          <SubmitSignup onClick={() => submitAuthNumber()}>
            인증하기
          </SubmitSignup>
        ) : (
          <SubmitSignup onClick={() => sendAuthNumber()}>인증하기</SubmitSignup>
        )}
      </SignupSection>
    </ThemeProvider>
  );
};

export default Signup;

const SignupSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60vh;
  margin: 5% auto;
`;

const SignupDiv = styled.div`
  display: flex;
  width: 100%;
  height: 8vh;
  justify-content: center;
  font-size: 1.6rem;
`;

const SignupSub = styled.div`
  display: flex;
  width: 100%;
  height: 4vh;
  justify-content: center;
  font-size: 1rem;
`;

const SignupInput = styled.input`
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

const SubmitSignup = styled.div`
  display: flex;
  width: 80%;
  height: 4.2rem;
  margin: 3rem auto;
  border-radius: 30px;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #a489f0;
  font-size: 1.2rem;

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

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 6vh;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const LoginTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
  width: 90%;
  height: 3vh;
  align-items: center;

  margin-left: auto;
`;
