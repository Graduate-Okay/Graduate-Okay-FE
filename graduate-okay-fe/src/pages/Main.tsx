import React from "react";
import styled from "styled-components";

const Main: React.FC = () => {
  return (
    <MainPageDiv>
      <ImgDiv>
        <img
          className="contentsPage-img"
          src="imgs/background.jpg"
          alt="background"
        />
      </ImgDiv>
    </MainPageDiv>
  );
};
export default Main;

const MainPageDiv = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const ImgDiv = styled.div`
  display: flex;
  width: 100%;
  height: 40rem;
  justify-content: center;
`;
