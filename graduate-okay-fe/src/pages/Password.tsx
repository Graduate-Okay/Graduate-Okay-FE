import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import HandleSection from "../components/HandleSection";
import { ReactComponent as Logo } from "../assets/imgs/logo/logo.svg";
import { postPasswordResetLink } from "../queries/findQuery";
import { useMutation } from "@tanstack/react-query";
import useInput from "../hooks/useInput";
import Modal from "../components/Modal";
import { ReactComponent as Caution } from "../assets/imgs/caution.svg";
import CheckSchoolEmail from "../utils/CheckSchoolEmail";

const Password: React.FC = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const emailInput = useInput("");
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const postPasswordResetLinkMutation = useMutation({
    mutationFn: (email: string) => postPasswordResetLink(email),
    onSuccess: () => setIsClick(true),
    onError: () => {
      setErrorMessage("올바른 아이디를 입력해주세요.");
      setError(true);
    },
  });

  const handlePostPasswordResetLink = () => {
    if (isEmpty()) {
      setErrorMessage("아이디/비밀번호가 비어있습니다.");
      setError(true);
      return;
    }
    const email = emailInput.value;
    emailInput.value = CheckSchoolEmail(email);
    postPasswordResetLinkMutation.mutate(emailInput.value);
  };

  const isEmpty = () => {
    return emailInput.value === "";
  };

  const handleOnModal = () => {
    setError(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Section>
        <HandleSection prevBtn={true} title="비밀번호 찾기" closeBtn={false} />
        <LoginDiv>
          <Logo width="167" height="38" fill="#a489f0" />
        </LoginDiv>
        <PasswordInput
          placeholder="이메일을 입력해주세요(example@hs.ac.kr 또는 example)"
          type="text"
          value={emailInput.value}
          onChange={emailInput.onChange}
          autoFocus
        />
        {isClick ? (
          <PasswordInput
            placeholder="인증번호를 입력해주세요"
            type="text"
            autoFocus
          />
        ) : null}
        <SubmitFind onClick={() => handlePostPasswordResetLink()}>
          입력 완료
        </SubmitFind>
      </Section>
      {isError ? (
        <Modal
          svg={Caution}
          message={errorMessage}
          onModal={handleOnModal}
          closeMessage="닫기"
        />
      ) : null}
    </ThemeProvider>
  );
};

export default Password;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60vh;
  min-height: 60rem;
  margin: 5% auto;
  @media ${({ theme }) => theme.device.laptop} {
    justify-content: center;
  }
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 6vh;
  min-height: 5rem;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const PasswordInput = styled.input`
  display: flex;
  width: 80%;
  height: 3vh;
  min-height: 2rem;
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

const SubmitFind = styled.div`
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
