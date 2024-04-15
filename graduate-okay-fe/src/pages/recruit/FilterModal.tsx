import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";

interface ModalProps {
  onModal: () => void;
}

const FilterModal: React.FC<ModalProps> = ({ onModal }) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalBackground>
        <ModalContent>
          <Title>
            <TitleOption>초기화</TitleOption>
            <TitleName>검색 및 필터링</TitleName>
            <TitleOption onClick={onModal}>닫기</TitleOption>
          </Title>
        </ModalContent>
      </ModalBackground>
    </ThemeProvider>
  );
};

export default FilterModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 70%;
  height: 60%;
  align-items: center;

  > svg {
    @media ${({ theme }) => theme.device.laptop} {
      width: 30%;
      height: 30%;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 40%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 25%;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TitleOption = styled.p`
  display: flex;
  color: #a6a6a6;
  flex-grow: 1;
  justify-content: center;
  cursor: pointer;
`;

const TitleName = styled.p`
  display: flex;
  font-size: 1.2rem;
  flex-grow: 8;
  justify-content: center;
`;
