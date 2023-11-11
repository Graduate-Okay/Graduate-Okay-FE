import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import MainImg1 from "../assets/pngs/mainImg.png";

interface IntroduceTextProps {
  fontSize?: string;
  color?: string;
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
          <IntroduceDiv>
            <TextDiv>
              <IntroduceText fontSize={"2.4rem"}>졸업요건 검사</IntroduceText>
              <IntroduceText fontSize={"2.8rem"} color={"#8f8de7"}>
                졸업가능에서
              </IntroduceText>
              <IntroduceText fontSize={"2.4rem"}>
                쉽고 간편하게 확인하자
              </IntroduceText>
            </TextDiv>
            <img src={MainImg1} alt="메인페이지 이미지1" />
          </IntroduceDiv>
          <IntroduceDiv>
            <TextDiv>
              <IntroduceText fontSize={"2.4rem"}>
                학업성적확인서 PDF를 올려서 한번에 검사
              </IntroduceText>
              <IntroduceText fontSize={"2rem"} color={"gray"}>
                졸업 요건을 확인하고 인기교양을 추천받아
              </IntroduceText>
              <IntroduceText fontSize={"2rem"} color={"gray"}>
                수강 계획을 구상할 수 있어요
              </IntroduceText>
            </TextDiv>
          </IntroduceDiv>
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

  & > :nth-child(even) {
    background-color: #fafaff;
  }
`;

const IntroduceDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 55vh;

  > img {
    display: flex;
    width: 80%;
    height: 50%;
    object-fit: fill;
    margin: 0 auto;
  }

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: row;
    > img {
      width: 20%;
      margin: auto;
    }
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.laptop} {
    margin: auto;
  }
`;

const IntroduceText = styled.p<IntroduceTextProps>`
  display: flex;
  font-size: ${(props) => props.fontSize || "2rem"};
  color: ${(props) => props.color};
  margin: 0.4rem auto;
  align-items: center;
  width: 90%;
  word-break: keep-all;
  text-align: center;
  white-space: normal;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: row;
  }
`;
