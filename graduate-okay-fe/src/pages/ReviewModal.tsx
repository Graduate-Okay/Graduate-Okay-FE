import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const ReviewModal: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ModalSection>
        <ModalDiv>
          <ModalHeader>
            <ReviewHeader>리뷰 작성</ReviewHeader>
            <ReviewClose>🗙</ReviewClose>
          </ModalHeader>
          <ModalContent>
            <p>sdf</p>
            <p>sdf</p>
            <p>sdf</p>
          </ModalContent>
        </ModalDiv>
      </ModalSection>
    </ThemeProvider>
  );
};

export default ReviewModal;

const ModalSection = styled.section`
  width: 100%;
  height: 100vh;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 280px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;
`;

const ModalHeader = styled.div`
  display: flex;
  font-size: 1.6rem;
  width: 100%;
  height: 4vh;
  align-items: center;
`;
const ReviewHeader = styled(ModalHeader)`
  justify-content: center;
`;

const ReviewClose = styled(ModalHeader)`
  justify-content: right;
  width: 5%;
  &:hover {
    opacity: 0.5;
  }
`;

const ModalContent = styled.div`
  display: flex;
`;
