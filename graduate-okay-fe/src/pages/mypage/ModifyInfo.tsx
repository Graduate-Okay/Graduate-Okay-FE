import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import useInput from "../../hooks/useInput";
import HandleSection from "../../components/HandleSection";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ProfileWithSetting } from "../../assets/imgs/profile/profileWithSetting.svg";
import { useMutation } from "@tanstack/react-query";
import { modifyInfoQuery } from "../../queries/mypageQuery";
import Toast from "../../components/Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModifyInfo: React.FC = () => {
  const loginInput = useInput("");
  const passwordInput = useInput("");
  const navigate = useNavigate();

  const changeMutation = useMutation({
    mutationFn: (payload: { [key: string]: string }) =>
      modifyInfoQuery(payload),
    onSuccess: () => {
      toast.success("변경이 완료되었습니다.");
      navigate("/mypage");
    },
  });

  const changeInfomation = async () => {
    const payload: { [key: string]: string } = {};
    if (loginInput.value) {
      payload.nickname = loginInput.value;
    }
    if (passwordInput.value) {
      payload.password = passwordInput.value;
    }
    if (!loginInput.value && !passwordInput.value) {
      toast.error("입력 값을 확인해주세요.");
      return;
    }
    changeMutation.mutate(payload);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      changeInfomation();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Toast />
      <ModifyInfoSection>
        <HandleSection
          prevBtn={true}
          title="정보 수정하기"
          closeBtn={false}
          color="#a489f0"
        />
        <ModifyInfoDiv>
          <ProfileWithSetting onClick={() => toast.info("준비 중입니다!")} />
          <ChangeInfo>
            <Content>
              <Title>닉네임</Title>
              <Input
                placeholder={"변경할 닉네임을 적어주세요."}
                type="nickname"
                value={loginInput.value}
                onChange={loginInput.onChange}
                onKeyDown={handleKeyDown}
              />
            </Content>
            <Content>
              <Title>비밀번호 변경</Title>
              <Input
                placeholder={"새로운 비밀번호를 입력해주세요."}
                type="password"
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                onKeyDown={handleKeyDown}
              />
            </Content>
            <ChangeButton onClick={() => changeInfomation()}>
              수정하기
            </ChangeButton>
          </ChangeInfo>
        </ModifyInfoDiv>
      </ModifyInfoSection>
    </ThemeProvider>
  );
};

export default ModifyInfo;

const ModifyInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 75vh;
  margin: 2vh auto;
`;

const ModifyInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 60vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.device.tablet} {
    width: 60%;
    height: 70%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 50%;
    height: 65%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 50%;
    height: 60%;
  }
`;

const ChangeButton = styled.div`
  display: flex;
  width: 50%;
  height: 4rem;
  margin: auto;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #a489f0;
  border-radius: 30px;
  font-size: 1.4rem;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 40%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 25%;
  }
`;

const ChangeInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 75%;
  height: 5vh;
  font-size: 1.3rem;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 45%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
`;

const Input = styled.input`
  display: flex;
  width: 75%;
  height: 3.5vh;
  margin: 0 auto;
  border-color: #a489f0;
  border-radius: 10px;
  padding: 0.5rem;

  &:focus {
    outline: none;
    border-color: #d6d6f5;
  }

  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 45%;
    height: 15%;
    padding: 1rem;
  }
`;
