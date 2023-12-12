import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import useInput from "../../hooks/useInput";
import axios, { AxiosError } from "axios";
import api from "../../apis/api";
import option from "../../constants/option";

interface ModalProps {
  onClose: () => void;
  title?: string;
}

const ReviewModal: React.FC<ModalProps> = ({ onClose, title }) => {
  const reviewTitle = useInput("");
  const reviewContent = useInput("");

  const submitReview = async () => {
    try {
      await axios.post(`${api.review}`, {
        title: reviewTitle.value,
        content: reviewContent.value,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ModalSection>
        <ModalDiv>
          <ModalHeader>
            <ReviewHeader>리뷰 작성</ReviewHeader>
            <ReviewClose onClick={onClose}>🗙</ReviewClose>
          </ModalHeader>
          <ModalContent>
            <SubjectTitle>{title}</SubjectTitle>
            <InputDiv>
              <p>한학기 동안 전반적인 수업이 어땠나요?</p>
              <SelectBox options={option.REVIEW_OPTIONS} />
              <TitleInput
                type="text"
                placeholder="제목을 입력해주세요"
                onChange={reviewTitle.onChange}
                value={reviewTitle.value}
              />
              <ContentInput
                placeholder="내용을 입력해주세요"
                onChange={reviewContent.onChange}
                value={reviewContent.value}
              />
            </InputDiv>
          </ModalContent>
          <ModalFooter>
            <p onClick={submitReview}>등록하기</p>
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
  width: 95%;
  align-items: center;
  flex-grow: 1;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8rem;
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

const SelectBox = (props: any) => {
  return (
    <select>
      {props.options.map((option: any) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

const TitleInput = styled.input`
  display: flex;
  width: 100%;
  padding: 0.2rem;
`;
const ContentInput = styled.textarea`
  display: flex;
  width: 100%;
  padding: 0.2rem;
  height: 70%;
  resize: none;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
`;

const SubjectTitle = styled.div`
  display: flex;
  font-weight: bold;
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
