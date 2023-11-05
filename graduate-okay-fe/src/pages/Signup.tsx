import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useInput from "../hooks/useInput";
import axios, { AxiosError } from "axios";
import api from "../apis/api";
import CheckSchoolEmail from "../utils/CheckSchoolEmail";

const Signup: React.FC = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const emailInput = useInput("");
  const authNumber = useInput("");

  const sendAuthNumber = async () => {
    if (isEmpty()) {
      alert("이메일을 입력해주세요");
      return;
    }
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
      await axios
        .get(`${api.user}/email`, {
          params: {
            number: authNumber.value,
          },
        })
        .then((response) => console.log(response));
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
        <SignupSub>한신대학교 이메일로만 가입이 가능합니다.</SignupSub>
        <SignupInput
          placeholder="이메일을 입력해주세요(example@hs.ac.kr 또는 example)"
          type="text"
          value={emailInput.value}
          onChange={emailInput.onChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        {isClick ? (
          <SignupInput
            placeholder="인증번호를 입력해주세요"
            type="text"
            value={authNumber.value}
            onChange={authNumber.onChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : null}
        {isClick ? (
          <SubmitSignup onClick={() => submitAuthNumber()}>
            번호 인증하기
          </SubmitSignup>
        ) : (
          <SubmitSignup onClick={() => sendAuthNumber()}>
            인증번호 보내기
          </SubmitSignup>
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
  font-size: 2rem;
  font-weight: bold;
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
  width: 60%;
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
