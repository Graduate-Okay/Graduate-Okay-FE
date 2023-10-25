import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPageDiv>
        <ImgDiv>
          <p>타이틀</p>
          <p>컨텐츠내용</p>
        </ImgDiv>
        <IntroduceSection>
          <IntroduceText>
            졸업요건 검사 졸업가능에서 쉽고 간편하게
          </IntroduceText>
        </IntroduceSection>
        <IntroduceSection>
          <IntroduceText>
            졸업요건 검사 졸업가능에서 쉽고 간편하게
          </IntroduceText>
        </IntroduceSection>
        <IntroduceSection>
          <IntroduceText>
            졸업요건 검사 졸업가능에서 쉽고 간편하게
          </IntroduceText>
        </IntroduceSection>
        <IntroduceSection>
          <IntroduceText>
            졸업요건 검사 졸업가능에서 쉽고 간편하게
          </IntroduceText>
        </IntroduceSection>
        <IntroduceSection>
          <IntroduceText>
            졸업요건 검사 졸업가능에서 쉽고 간편하게
          </IntroduceText>
        </IntroduceSection>
      </MainPageDiv>
    </ThemeProvider>
  );
};
export default Main;

const MainPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  overflow-y: auto;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10vh;
  background-image: url("imgs/background.jpg");
  background-size: 100%;
  justify-content: center;
  align-items: center;
`;

const IntroduceSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IntroduceText = styled.p`
  display: flex;
  font-size: 2.4rem;
  margin: 0 auto;
  align-items: center;
  width: 40%;
  height: 35vh;
  word-break: keep-all;
  text-align: center;
  white-space: normal;
`;
