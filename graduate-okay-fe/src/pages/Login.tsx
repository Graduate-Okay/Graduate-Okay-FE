import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import Modal from "../components/Modal";
import CheckSchoolEmail from "../utils/CheckSchoolEmail";
import { ReactComponent as Logo } from "../assets/imgs/logo/logo.svg";
import { ReactComponent as Caution } from "../assets/imgs/caution.svg";
import { useMutation } from "@tanstack/react-query";
import { submitLoginQuery } from "../queries/loginQuery";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submitLoginMutation = useMutation({
    mutationFn: (formData: { emailInput: string; passwordInput: string }) => {
      const { emailInput, passwordInput } = formData;
      return submitLoginQuery(emailInput, passwordInput);
    },
    onSuccess: () => navigate("/"),
    onError: () => {
      setErrorMessage("올바른 아이디/비밀번호를 입력해주세요.");
      setError(true);
    },
  });

  const isEmpty = () => {
    return emailInput.value === "" || passwordInput.value === "";
  };

  const submitLogin = async () => {
    if (isEmpty()) {
      setErrorMessage("아이디/비밀번호가 비어있습니다.");
      setError(true);
      return;
    }
    const email = emailInput.value;
    emailInput.value = CheckSchoolEmail(email);
    submitLoginMutation.mutate({
      emailInput: emailInput.value,
      passwordInput: passwordInput.value,
    });
  };

  const handleOnModal = () => {
    setError(false);
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
        />
        <SubmitLogin onClick={() => submitLogin()}>로그인</SubmitLogin>
        <Account>
          <p onClick={() => navigate(`/signup`)}>회원가입</p>
          <p onClick={() => navigate(`/find`)}>비밀번호찾기</p>
        </Account>
      </LoginSection>
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

export default Login;

const LoginSection = styled.section`
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
  height: 14vh;
  min-height: 8rem;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const LoginInput = styled.input`
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
  font-size: 1.5rem;

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
    &:hover {
      opacity: 0.5;
    }
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
  min-height: 3rem;
  align-items: center;
  margin-left: auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 75%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 65%;
  }
`;

const LoginTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
  width: 90%;
  height: 3vh;
  min-height: 3rem;
  align-items: center;
  margin-left: auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 75%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 65%;
  }
`;
