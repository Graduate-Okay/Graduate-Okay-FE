import React, { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useParams } from "react-router-dom";
import { IReview, ISubjectDetail } from "../../interfaces";
import axios, { AxiosError } from "axios";
import api from "../../apis/api";
import { useCookies } from "react-cookie";
import ReviewModal from "./ReviewModal";
import StarRate from "./StarRate";
import HandleSection from "../../components/HandleSection";
import Button from "../../components/Button";

const KyRecommendDetail: React.FC = () => {
  const [detail, setDetail] = useState<ISubjectDetail>();
  const [review, setReview] = useState<IReview>();
  const [reviewList, setReviewList] = useState<number[]>();
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const params = useParams();
  const paramsId = params.id;
  const [cookies] = useCookies(["accessToken"]);

  const getDetail = useCallback(async () => {
    try {
      const response = await axios.get(`${api.subject}/${paramsId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      setDetail(response?.data.data);
      setReviewList(response?.data.data.reviewSummary.reviewIdList);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [paramsId, cookies.accessToken]);

  /**
   * @todo paramsId -> reviewList에있는 배열 값이 들어가야함
   */
  const getReview = useCallback(async () => {
    try {
      const response = await axios.get(`${api.review}/${paramsId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      setReview(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data?.message);
      }
    }
  }, [paramsId, cookies.accessToken]);

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  console.log(reviewList);

  console.log(message);

  useEffect(() => {
    getDetail();
    getReview();
  }, [getDetail, getReview]);

  return (
    <ThemeProvider theme={theme}>
      <DetailSection>
        <HandleSection
          prevBtn={true}
          title="인기교양추천"
          closeBtn={false}
          color="#a489f0"
        />
        <Credit>{detail?.credit || 0}학점</Credit>
        <DetailIsRequired>
          {detail?.isRequired ? <p>교양필수</p> : null}
        </DetailIsRequired>
        <DetailTitle>
          {detail?.name} ({detail?.subName})
        </DetailTitle>
        <DetailInfo>
          <TypeText>핵심역량</TypeText>
          <Type>{detail?.kyCoreType || "없음"}</Type>
          <TypeText>인재상</TypeText>
          <Type>{detail?.kyModelType || "없음"}</Type>
        </DetailInfo>
        <ReviewSection>
          <HandleReview>
            <StarDiv>
              <StarRate review={detail?.reviewSummary || undefined} />
              <AvgScore>{detail?.reviewSummary?.avgStarScore || 0}</AvgScore>
            </StarDiv>
            <p>강의평 {detail?.reviewSummary?.totalCount || 0}건</p>
            {/* <p onClick={() => setIsOpen(!isOpen)}>리뷰 쓰기🖋️</p> */}
          </HandleReview>
          {review ? (
            <Review>{review.content}</Review>
          ) : (
            <Review>
              <NoneReview>
                <p>강의평이 존재하지 않습니다.</p>
                <p>첫 번째로 강의를 평가해보세요.</p>
              </NoneReview>
              <Button text="강의 평가하기" />
            </Review>
          )}
        </ReviewSection>
      </DetailSection>
      {isOpen ? (
        <ReviewModal
          onClose={handleCloseModal}
          title={detail?.name}
          id={detail?.subjectId}
        />
      ) : null}
    </ThemeProvider>
  );
};

export default KyRecommendDetail;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 70vh;
  margin: 2vh auto;
`;

const Credit = styled.div`
  display: flex;
  width: 6rem;
  height: 3rem;
  background-color: #a489f0;
  border-radius: 13px;
  color: white;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
`;

const Type = styled.div`
  display: flex;
  width: 5rem;
  height: 2rem;
  border: 1px solid #313131;
  border-radius: 13px;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
`;

const TypeText = styled.p`
  display: flex;
  font-weight: bold;
  width: 5rem;
  text-align: center;
  justify-content: center;
`;

const AvgScore = styled.p`
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
  width: 20%;
`;

const DetailIsRequired = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #7978cd;
  > p {
    display: flex;
    width: 23%;
    height: 3vh;
    border: 1px solid #7978cd;
    border-radius: 2rem;
    align-items: center;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 70%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 50%;
  }
`;

const DetailTitle = styled.div`
  display: flex;
  height: 8vh;
  align-items: center;
  font-size: 1.7rem;
`;

const DetailInfo = styled.div`
  display: flex;
  height: 4vh;
  align-items: center;
  border-bottom: 1px solid #a4b0be;
`;

const ReviewSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HandleReview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  font-size: 1.1rem;
  > p {
    &:hover {
      opacity: 0.5;
    }
  }
`;

const StarDiv = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  > p {
    width: 100%;
    margin: 0px 5px;
  }
`;

const Review = styled.div`
  display: flex;
  width: 90%;
  height: 15vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
`;

const NoneReview = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  flex-direction: column;
  background-color: #f4f3f8;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
