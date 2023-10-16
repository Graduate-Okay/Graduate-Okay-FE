import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainPageDiv>
        <ImgDiv>
          <img
            className="contentsPage-img"
            src="imgs/background.jpg"
            alt="background"
          />
        </ImgDiv>
      </MainPageDiv>
    </ThemeProvider>
  );
};
export default Main;

const MainPageDiv = styled.div`
  display: flex;
  width: 100%;
  height: 65vh;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 80%;
    height: 80%;
    margin: 0 auto;
    margin-top: 5vh;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    margin-top: 3vh;
  }
`;
