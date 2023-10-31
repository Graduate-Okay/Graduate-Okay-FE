import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Find: React.FC = () => {
  const [isClick, setIsClick] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <FindSection>
        <FindDiv>회원가입</FindDiv>
        <FindInput
          placeholder="이메일을 입력해주세요(example@hs.ac.kr 또는 example)"
          type="text"
          autoFocus
        />
        {isClick ? (
          <FindInput
            placeholder="인증번호를 입력해주세요"
            type="text"
            autoFocus
          />
        ) : null}
        <SubmitFind onClick={() => setIsClick(true)}>
          새로운 비밀번호를 입력해주세요
        </SubmitFind>
      </FindSection>
    </ThemeProvider>
  );
};

export default Find;

const FindSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60vh;
  margin: 5% auto;
`;

const FindDiv = styled.div`
  display: flex;
  width: 100%;
  height: 8vh;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

const FindInput = styled.input`
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

const SubmitFind = styled.div`
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
