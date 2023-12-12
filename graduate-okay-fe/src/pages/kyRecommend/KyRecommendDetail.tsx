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

const KyRecommendDetail: React.FC = () => {
  const [detail, setDetail] = useState<ISubjectDetail>();
  const [review, setReview] = useState<IReview>();
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
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [paramsId, cookies.accessToken]);

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

  useEffect(() => {
    getDetail();
    getReview();
  }, [getDetail, getReview]);

  return (
    <ThemeProvider theme={theme}>
      <DetailSection>
        <DetailIsRequired>
          {detail?.isRequired ? <p>교양필수</p> : null}
        </DetailIsRequired>
        <DetailTitle>
          {detail?.name} ({detail?.subName})
        </DetailTitle>
        <DetailInfo>
          <p>핵심역량 : {detail?.kyCoreType || "X"},</p>
          <p>인재상 : {detail?.kyModelType || "X"},</p>
          <p>{detail?.credit || 0}학점</p>
        </DetailInfo>
        <ReviewSection>
          <HandleReview>
            <StarDiv>
              <StarRate review={detail?.reviewSummary?.[0] || undefined} />
              <p>{detail?.reviewSummary[0]?.avgStarScore || 0}/5.0</p>
              <p>{detail?.reviewSummary[0]?.totalCount || 0}건</p>
            </StarDiv>
            <p onClick={() => setIsOpen(!isOpen)}>리뷰 쓰기🖋️</p>
          </HandleReview>
          {review ? <div>{review.content}</div> : <div>{message}</div>}
        </ReviewSection>
      </DetailSection>
      {isOpen ? (
        <ReviewModal onClose={handleCloseModal} title={detail?.name} />
      ) : null}
    </ThemeProvider>
  );
};

export default KyRecommendDetail;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 65vh;
  margin: 2vh auto;
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
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
  color: #a4b0be;
  height: 3.3vh;
  font-size: 1.1rem;
  border-bottom: 1px solid #a4b0be;
  > p {
    margin-right: 0.5rem;
  }
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
  height: 2rem;
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
  > p {
    width: 100%;
    margin: 0px 5px;
  }
`;
