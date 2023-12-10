import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import useInput from "../hooks/useInput";

interface ModalProps {
  onClose: () => void;
  title?: string;
}

const ReviewModal: React.FC<ModalProps> = ({ onClose, title }) => {
  const reviewTitle = useInput("");
  const reviewContent = useInput("");

  return (
    <ThemeProvider theme={theme}>
      <ModalSection>
        <ModalDiv>
          <ModalHeader>
            <ReviewHeader>리뷰 작성</ReviewHeader>
            <ReviewClose onClick={onClose}>🗙</ReviewClose>
          </ModalHeader>
          <ModalContent>
            <SubjectTitle>과목명 - {title}</SubjectTitle>
            <InputDiv>
              <TitleInput
                type="text"
                placeholder="제목을 입력해주세요"
                onChange={reviewTitle.onChange}
                value={reviewTitle.value}
                autoFocus
              />
              <ContentInput
                type="text"
                placeholder="내용을 입력해주세요"
                onChange={reviewContent.onChange}
                value={reviewContent.value}
              />
            </InputDiv>
          </ModalContent>
          <ModalFooter>
            <p>등록하기</p>
          </ModalFooter>
        </ModalDiv>
      </ModalSection>
    </ThemeProvider>
  );
};

export default ReviewModal;

const ModalSection = styled.section`
  width: 100%;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 300px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;

  @media ${({ theme }) => theme.device.tablet} {
    width: 450px;
    height: 600px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 500px;
    height: 700px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  font-size: 1.6rem;
  width: 100%;
  align-items: center;
  flex-grow: 1;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8rem;
    width: 95%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 2rem;
  }
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
  flex-direction: column;
  flex-grow: 10;
  width: 70%;
`;

const TitleInput = styled.input`
  display: flex;
  width: 100%;
  padding: 0.5rem;
`;
const ContentInput = styled(TitleInput)`
  height: 70%;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60%;
`;

const SubjectTitle = styled.div`
  display: flex;
  color: gray;
  font-size: 1.2rem;
  height: 10%;
  align-items: center;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: #8f8de7;
`;
