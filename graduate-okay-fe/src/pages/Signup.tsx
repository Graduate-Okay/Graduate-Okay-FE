import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useInput from "../hooks/useInput";
import { AxiosError } from "axios";
import { ReactComponent as Logo } from "../assets/imgs/logo/logo.svg";
import HandleSection from "../components/HandleSection";
import { useMutation } from "@tanstack/react-query";
import {
  postAuthNumberToEmail,
  submitAuthNumberQuery,
  submitPasswordQuery,
} from "../queries/signupQuery";
import { checkSchoolEmail, emailValidate, isEmpty } from "../utils/validate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../components/Toast";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const emailInput = useInput("");
  const authNumber = useInput("");
  const passwordInput = useInput("");

  const postAuthNumberToEmailMutation = useMutation({
    mutationFn: (emailInput: string) => {
      setIsClick(true);
      return postAuthNumberToEmail(emailInput);
    },
  });

  const submitPasswordMutation = useMutation({
    mutationFn: (formData: { emailInput: string; passwordInput: string }) => {
      const { emailInput, passwordInput } = formData;
      return submitPasswordQuery(emailInput, passwordInput);
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다.");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  const sendAuthNumber = async () => {
    if (isEmpty(emailInput.value)) {
      toast.info("이메일을 입력해주세요");
      return;
    }

    if (emailValidate(emailInput.value)) {
      toast.error("올바른 이메일 형식을 입력해주세요");
      return;
    }

    toast.info("인증번호를 전송했습니다. 메일을 확인해주세요");
    const email = emailInput.value;
    emailInput.value = checkSchoolEmail(email);
    postAuthNumberToEmailMutation.mutate(emailInput.value);
  };

  const submitAuthNumber = async () => {
    if (isEmpty(authNumber.value)) {
      toast.error("인증번호를 입력해주세요");
      return;
    }
    try {
      const response = await submitAuthNumberQuery(authNumber.value);
      if (response?.data.status === "OK") {
        setIsAuth(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const submitPassword = async () => {
    if (isEmpty(passwordInput.value)) {
      toast.error("비밀번호를 입력해주세요");
      return;
    }
    const email = emailInput.value;
    emailInput.value = checkSchoolEmail(email);
    submitPasswordMutation.mutate({
      emailInput: emailInput.value,
      passwordInput: passwordInput.value,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendAuthNumber();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Toast />
      <SignupSection>
        <HandleSection prevBtn={true} title="회원가입" closeBtn={false} />
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
  min-height: 60rem;
  margin: 5% auto;
  @media ${({ theme }) => theme.device.laptop} {
    justify-content: center;
  }
`;

const SignupSub = styled.div`
  display: flex;
  width: 100%;
  height: 4vh;
  justify-content: center;
  font-size: 1rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;

const SignupInput = styled.input`
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
  min-height: 5rem;
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
  @media ${({ theme }) => theme.device.tablet} {
    width: 75%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 65%;
  }
`;
