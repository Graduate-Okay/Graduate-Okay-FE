import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import useInput from "../../hooks/useInput";
import HandleSection from "../../components/HandleSection";
import axios, { AxiosError } from "axios";
import api from "../../apis/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ProfileWithSetting } from "../../assets/imgs/profile/profileWithSetting.svg";

const ModifyInfo: React.FC = () => {
  const [change, setChange] = useState<string>();
  const loginInput = useInput("");
  const passwordInput = useInput("");

  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const handleClick = (value: string) => {
    setChange(value);
  };

  const changeInfomation = async () => {
    try {
      const payload = {
        [change!]: loginInput.value,
      };
      await axios
        .patch(`${api.user}/info`, payload, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then(() => {
          alert("변경이 완료되었습니다.");
          navigate("/mypage");
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      changeInfomation();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ModifyInfoSection>
        <HandleSection
          prevBtn={true}
          title="정보 수정하기"
          closeBtn={false}
          color="#a489f0"
        />
        <ModifyInfoDiv>
          <ProfileWithSetting />
          <ChangeInfo>
            <Content>
              <Title>닉네임</Title>
              <Input
                placeholder={"변경할 닉네임을 적어주세요."}
                type={change}
                value={loginInput.value}
                onChange={loginInput.onChange}
                onKeyDown={handleKeyDown}
              />
            </Content>
            <Content>
              <Title>비밀번호 변경</Title>
              <Input
                placeholder={"새로운 비밀번호를 입력해주세요."}
                type={change}
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
    width: 50%;
    height: 70%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 35%;
    height: 65%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 40%;
    height: 60%;
  }
`;

const ChangeButton = styled.div`
  display: flex;
  width: 80%;
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
    width: 30%;
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
  width: 85%;
  height: 5vh;
  font-size: 1.3rem;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
`;

const Input = styled.input`
  display: flex;
  width: 85%;
  height: 5vh;
  margin: 0 auto;
  border-color: #a489f0;
  border-radius: 10px;

  &:focus {
    outline: none;
    border-color: #d6d6f5;
  }
`;
