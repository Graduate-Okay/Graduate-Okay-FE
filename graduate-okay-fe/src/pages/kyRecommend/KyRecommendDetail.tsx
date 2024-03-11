import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ReviewModal from "./Review";
import StarRate from "./StarRate";
import HandleSection from "../../components/HandleSection";
import Button from "../../components/Button";
import { ReactComponent as Next } from "../../assets/imgs/arrow/next.svg";
import {
  kyRecommendDetailQuery,
  kyRecommendReviewList,
} from "../../queries/kyRecommendQuery";

const KyRecommendDetail: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const params = useParams();
  const paramsId = params.id;

  const { data: detailData, refetch } = useQuery({
    queryKey: ["kyRecommendDetail"],
    queryFn: () => kyRecommendDetailQuery(paramsId),
  });

  const { data: reviewData } = useQuery({
    queryKey: ["kyRecommendReviewList", detailData],
    queryFn: () => kyRecommendReviewList(detailData?.reviewDataList),
  });

  const IsModalOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <DetailSection>
        <HandleSection
          prevBtn={true}
          title="인기교양추천"
          closeBtn={false}
          color="#a489f0"
        />
        <DetailHeader>
          <Credit>{detailData?.credit || 0}학점</Credit>
          <DetailIsRequired>
            {detailData?.isRequired ? <p>교양필수</p> : null}
          </DetailIsRequired>
          <DetailTitle>
            {detailData?.name} ({detailData?.subName})
          </DetailTitle>
        </DetailHeader>
        <DetailInfo>
          <TypeText>핵심역량</TypeText>
          <Type>{detailData?.kyCoreType || "없음"}</Type>
          <TypeText>인재상</TypeText>
          <Type>{detailData?.kyModelType || "없음"}</Type>
        </DetailInfo>
        <ReviewSection>
          <HandleReview>
            <StarDiv>
              <StarRate score={detailData?.avgStarScore || undefined} />
              <AvgScore>
                {detailData?.avgStarScore.toFixed(1) || "0.0"}
              </AvgScore>
            </StarDiv>
            <LectureLeview>
              강의평 {detailData?.reviewCount || 0}건
            </LectureLeview>
          </HandleReview>
          {isOpen ? (
            <ReviewModal
              onClose={IsModalOpen}
              id={detailData?.subjectId}
              refetch={refetch}
            />
          ) : reviewData && reviewData.length > 0 ? (
            <WrapReview>
              {reviewData?.map((item: any) => {
                return (
                  <Review>
                    <HaveReview>
                      <ReviewDiv>
                        <StarRate score={item?.starScore || undefined} />
                        <ReviewTitle>{item?.title}</ReviewTitle>
                        <ReviewContent>{item?.content}</ReviewContent>
                      </ReviewDiv>
                      <div>
                        <Next />
                      </div>
                    </HaveReview>
                  </Review>
                );
              })}
            </WrapReview>
          ) : (
            <Review>
              <NoneReview>
                <p>강의평이 존재하지 않습니다.</p>
                <p>첫 번째로 강의를 평가해보세요.</p>
              </NoneReview>
            </Review>
          )}
        </ReviewSection>
        {!isOpen ? (
          <WrapButton>
            <Button text="강의 평가하기" handleOnClick={() => IsModalOpen()} />
          </WrapButton>
        ) : null}
      </DetailSection>
    </ThemeProvider>
  );
};

export default KyRecommendDetail;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 80vh;
  margin: 2vh auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 50%;
  }
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

  @media ${({ theme }) => theme.device.tablet} {
    width: 7rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 6rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 6rem;
  }
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
  height: 4.5vh;
  align-items: center;
  font-size: 1.7rem;
`;

const DetailInfo = styled.div`
  display: flex;
  height: 4vh;
  align-items: center;
  border-bottom: 1px solid #a4b0be;
  width: 90%;
  margin: 0 auto;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`;

const ReviewSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
`;

const HandleReview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  font-size: 1.1rem;
  width: 90%;
  margin: 0 auto;
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

const WrapReview = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  overflow-y: auto;
`;

const Review = styled.div`
  display: flex;
  width: 90%;
  min-height: 12vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.tablet} {
    height: 15vh;
  }
  @media ${({ theme }) => theme.device.laptop} {
    height: 18vh;
  }
`;

const NoneReview = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
  flex-direction: column;
  background-color: #f4f3f8;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
`;

const HaveReview = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  border: 1px solid #cacaca;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  justify-content: center;
`;

const ReviewTitle = styled.p`
  display: flex;
  width: 50%;
  height: 20%;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ReviewContent = styled.p`
  display: flex;
  width: 50%;
  height: 40%;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 15px;
  cursor: pointer;
`;

const LectureLeview = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
`;
