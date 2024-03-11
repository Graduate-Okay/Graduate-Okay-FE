import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import Button from "../components/Button";
import BackgroundImage from "../assets/imgs/MainBackground.svg";
import { ReactComponent as CapAndCircle } from "../assets/imgs/capAndCircle.svg";
import { ReactComponent as PencilAndCircle } from "../assets/imgs/pencilAndCircle.svg";

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

interface SVGProps {
  justifyContent?: string;
}

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPageDiv>
        <IntroduceSection>
          <IntroduceDiv backgroundImage={BackgroundImage}>
            <SVGDiv justifyContent="flex-end">
              <CapAndCircle width={250} height={230} />
            </SVGDiv>
            <ButtonDiv width={"95%"} justifyContent={"flex-start"}>
              <Button text={"졸업요건 검사"} />
            </ButtonDiv>
            <TextDiv width={"95%"} justifyContent={"flex-start"}>
              <IntroduceText
                fontSize={"1.8rem"}
                color={"white"}
                fontWeight={"bold"}
              >
                "졸업가능?"
              </IntroduceText>
              <IntroduceText fontSize={"1.8rem"} color={"white"}>
                에서 쉽고 간편하게 확인하자!
              </IntroduceText>
            </TextDiv>
          </IntroduceDiv>
          <IntroduceDiv backgroundColor={"#ece5ff"}>
            <SVGDiv justifyContent="flex-start">
              <PencilAndCircle width={250} height={250} />
            </SVGDiv>
            <ButtonDiv width={"95%"} justifyContent={"flex-end"}>
              <Button text={"인기교양추천"} />
            </ButtonDiv>
            <TextDiv width={"95%"} justifyContent={"flex-end"}>
              <IntroduceText fontSize={"1.8rem"}>인기교양 추천도</IntroduceText>
              <IntroduceText fontSize={"1.8rem"} fontWeight={"bold"}>
                "졸업가능?"
              </IntroduceText>
              <IntroduceText fontSize={"1.8rem"}>에서!</IntroduceText>
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
  height: 40vh;
  background-image: url(${(props) => props.backgroundImage});
  background-color: ${(props) => props.backgroundColor};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  align-items: center;
`;

const TextDiv = styled.div<TextProps>`
  display: flex;
  flex-direction: row;
  width: ${(props) => (props ? props.width : "100%")};
  height: 5vh;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
`;

const IntroduceText = styled.p<IntroduceTextProps>`
  display: flex;
  font-size: ${(props) => props.fontSize || "2rem"};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  word-break: keep-all;
  text-align: center;
  white-space: normal;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 2.1rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 2.4rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2.7rem;
  }
`;

const ButtonDiv = styled.div<TextProps>`
  display: flex;
  width: ${(props) => props.width};
  justify-content: ${(props) => props.justifyContent};
  margin-bottom: 0.5rem;
`;

const SVGDiv = styled.div<SVGProps>`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: ${(props) => props.justifyContent};

  @media ${({ theme }) => theme.device.tablet} {
    > svg {
      width: 400px;
      height: 450px;
    }
  }
  @media ${({ theme }) => theme.device.laptop} {
    > svg {
      width: 500px;
      height: 550px;
    }
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    > svg {
      width: 600px;
      height: 550px;
    }
  }
`;
