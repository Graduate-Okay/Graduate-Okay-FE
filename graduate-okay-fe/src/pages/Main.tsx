import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

interface IntroduceTextProps {
  fontSize?: string;
}

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPageDiv>
        <ImgDiv>
          <p>타이틀</p>
          <p>컨텐츠내용</p>
        </ImgDiv>
        <IntroduceSection>
          <IntroduceText fontSize={"2.6rem"}>
            졸업요건 검사 졸업가능에서 쉽고 간편하게
          </IntroduceText>
          <IntroduceText>
            나의 졸업 요건을 확인하고 아직 수강하지 않는 과목이 어떤 것인지
            체크하고 인기교양을 추천받아 수강 계획을 구상할 수 있어요
          </IntroduceText>
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

const IntroduceText = styled.p<IntroduceTextProps>`
  display: flex;
  font-size: ${(props) => props.fontSize || "2rem"};
  margin: 0 auto;
  align-items: center;
  width: 50%;
  height: 55vh;
  word-break: keep-all;
  text-align: center;
  white-space: normal;
`;
