import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";

const ModifyInfo: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ModifyInfoSection>
        <ModifyInfoDiv>
          <SubmitLogin>닉네임 변경</SubmitLogin>
          <SubmitLogin>비밀번호 변경</SubmitLogin>
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
  height: 100%;
  border: 1px solid #b2bec3;
  border-radius: 2rem;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    height: 80%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
    height: 80%;
  }
`;

const SubmitLogin = styled.div`
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
