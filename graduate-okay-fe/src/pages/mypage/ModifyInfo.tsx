import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import useInput from "../../hooks/useInput";
import axios, { AxiosError } from "axios";
import api from "../../apis/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ModifyInfo: React.FC = () => {
  const [change, setChange] = useState<string>();
  const input = useInput("");
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const handleClick = (value: string) => {
    setChange(value);
  };

  const changeInfomation = async () => {
    if (isEmpty()) {
      alert("입력칸이 비어있습니다.");
      return;
    }
    try {
      const payload = {
        [change!]: input.value,
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

  const isEmpty = () => {
    return input.value === "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      changeInfomation();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ModifyInfoSection>
        <ModifyInfoDiv>
          {change ? (
            <ChangeInfo>
              <Title>{change}</Title>
              <Content>
                <LoginInput
                  placeholder={change}
                  type={change}
                  value={input.value}
                  onChange={input.onChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <ChangeButton onClick={() => changeInfomation()}>
                  변경하기
                </ChangeButton>
              </Content>
            </ChangeInfo>
          ) : (
            <>
              <ChangeButton onClick={() => handleClick("nickname")}>
                닉네임 변경
              </ChangeButton>
              <ChangeButton onClick={() => handleClick("password")}>
                비밀번호 변경
              </ChangeButton>
            </>
          )}
        </ModifyInfoDiv>
      </ModifyInfoSection>
    </ThemeProvider>
  );
};

export default ModifyInfo;

const ModifyInfoSection = styled.section`
  display: flex;
  width: 100%;
  height: 70vh;
  align-items: center;
`;

const ModifyInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 70%;
  border: 1px solid #b2bec3;
  border-radius: 2rem;
  margin: 0 auto;

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
  width: 70%;
  height: 3rem;
  margin: auto;
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

const ChangeInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13vh;
  font-size: 1.4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vh;
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
