import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import Button from "../components/Button";
import BackgroundImage from "../assets/imgs/MainBackground.svg";
import capAndCircle from "../assets/imgs/capAndCircle.svg";
import pencilAndCircle from "../assets/imgs/pencilAndCircle.svg";

interface IntroduceTextProps {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
}

interface IntroduceDivProps {
  backgroundImage?: string;
  backgroundColor?: string;
}

interface TextProps {
  width?: string;
  justifyContent?: string;
}

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPageDiv>
        <IntroduceSection>
          <IntroduceDiv backgroundImage={BackgroundImage}>
            <BackgroundImg src={capAndCircle} alt="배경이미지" />
            <ButtonDiv width={"95%"} justifyContent={"flex-start"}>
              <Button text={"졸업요건 검사"} />
            </ButtonDiv>
            <TextDiv width={"95%"} justifyContent={"center"}>
              <IntroduceText
                fontSize={"2rem"}
                color={"white"}
                fontWeight={"bold"}
              >
                "졸업가능?"
              </IntroduceText>
              <IntroduceText fontSize={"2rem"} color={"white"}>
                에서 쉽고 간편하게 확인하자!
              </IntroduceText>
            </TextDiv>
          </IntroduceDiv>
          <IntroduceDiv backgroundColor={"#ece5ff"}>
            <BackgroundImg src={pencilAndCircle} alt="배경이미지" />
            <ButtonDiv width={"95%"} justifyContent={"flex-end"}>
              <Button text={"인기교양추천"} />
            </ButtonDiv>
            <TextDiv width={"95%"} justifyContent={"flex-end"}>
              <IntroduceText fontSize={"2rem"}>인기교양 추천도</IntroduceText>
              <IntroduceText fontSize={"2rem"} fontWeight={"bold"}>
                "졸업가능?"
              </IntroduceText>
              <IntroduceText fontSize={"2rem"}>에서!</IntroduceText>
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
`;

const IntroduceSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IntroduceDiv = styled.div<IntroduceDivProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 38vh;
  background: url(${(props) => props.backgroundImage}) center;
  background-color: ${(props) => props.backgroundColor};

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: row;
  }
`;

const BackgroundImg = styled.img`
  display: flex;
  width: 100%;
  height: 70%;
`;

const TextDiv = styled.div<TextProps>`
  display: flex;
  flex-direction: row;
  width: ${(props) => (props ? props.width : "100%")};
  justify-content: ${(props) => props.justifyContent};

  // @media ${({ theme }) => theme.device.tablet} {
  //   width: 50%;
  //   justify-content: center;
  // }
  // @media ${({ theme }) => theme.device.laptop} {
  //   margin: auto;
  // }
`;

const IntroduceText = styled.p<IntroduceTextProps>`
  display: flex;
  font-size: ${(props) => props.fontSize || "2rem"};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  align-items: center;
  word-break: keep-all;
  text-align: center;
  white-space: normal;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: row;
  }
`;

const ButtonDiv = styled.div<TextProps>`
  display: flex;
  width: ${(props) => props.width};
  justify-content: ${(props) => props.justifyContent};
  margin: 1rem auto;
`;
