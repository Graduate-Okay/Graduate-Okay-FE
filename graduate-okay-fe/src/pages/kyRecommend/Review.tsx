import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import useInput from "../../hooks/useInput";
import option from "../../constants/option";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { postReview } from "../../queries/reviewQuery";

interface ModalProps {
  onClose: () => void;
  title?: string;
  id: number;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

interface OptionProps {
  value: number;
  name: string;
}

const Review: React.FC<ModalProps> = ({ onClose, id, refetch }) => {
  const reviewTitle = useInput("");
  const reviewContent = useInput("");
  const [selectedValue, setSelectedValue] = useState<number | string>("");

  const postReviewMutation = useMutation({
    mutationFn: (data: {
      id: number;
      reviewTitle: string;
      reviewContent: string;
      selectedValue: number;
    }) => {
      const { id, reviewTitle, reviewContent, selectedValue } = data;
      return postReview(id, reviewTitle, reviewContent, selectedValue);
    },
    onSuccess: () => {
      alert("리뷰 등록이 완료되었습니다.");
      onClose();
      if (refetch) {
        refetch();
      }
    },
  });

  const submitReview = async () => {
    postReviewMutation.mutate({
      id: id,
      reviewTitle: reviewTitle.value,
      reviewContent: reviewContent.value,
      selectedValue: Number(selectedValue),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ReviewSection>
        <ModalContent>
          <Title>
            <p>한학기 동안 전반적인 수업이 어땠나요?</p>
            <Select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {option.REVIEW_OPTIONS.map((option: OptionProps) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </Select>
          </Title>
          <InputDiv>
            <TitleInput
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={reviewTitle.onChange}
              value={reviewTitle.value}
            />
            <ContentInput
              placeholder="강의에 대한 평가를 적어주세요."
              onChange={reviewContent.onChange}
              value={reviewContent.value}
            />
          </InputDiv>
        </ModalContent>
        <Footer>
          <Button>
            <p onClick={onClose}>취소하기</p>
          </Button>
          <Button>
            <p onClick={submitReview}>등록하기</p>
          </Button>
        </Footer>
      </ReviewSection>
    </ThemeProvider>
  );
};

export default Review;

const ReviewSection = styled.section`
  width: 100%;
  height: 40vh;
`;

const Title = styled.div`
  display: flex;
  width: 90%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  > p {
    font-size: 1.2rem;
  }
`;

const Select = styled.select`
  display: flex;
  border: 1px solid #ece5ff;
  border-radius: 10px;
  width: 10rem;
  height: 3rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  align-items: center;
`;

const TitleInput = styled.input`
  display: flex;
  width: 90%;
  height: 15%;
  border: 1px solid #a489f0;
  border-radius: 10px;
  padding: 0.5rem;

  @media ${({ theme }) => theme.device.tablet} {
    padding: 1rem;
    width: 88%;
    height: 8%;
  }
`;
const ContentInput = styled.textarea`
  display: flex;
  width: 90%;
  height: 70%;
  resize: none;
  border: 1px solid #a489f0;
  border-radius: 10px;
  padding: 0.5rem;

  @media ${({ theme }) => theme.device.tablet} {
    padding: 1rem;
    width: 88%;
    height: 65%;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 45vh;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-around;
  margin-top: 2rem;
`;

const Button = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  font-size: 1.4rem;
  align-items: center;
  justify-content: center;
  color: white;
`;
