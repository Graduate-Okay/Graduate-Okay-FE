import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const ModifyInfo: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ModifyInfoSection>
        <ModifyInfoDiv></ModifyInfoDiv>
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
