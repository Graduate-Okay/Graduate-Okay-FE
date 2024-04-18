import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useQuery } from "@tanstack/react-query";
import { getMypageDataQuery } from "../../queries/mypageQuery";
import HandleSection from "../../components/HandleSection";
import { ReactComponent as Next } from "../../assets/imgs/arrow/next.svg";

const MyReview: React.FC = () => {
  const { data: myData } = useQuery({
    queryKey: ["getMypageData"],
    queryFn: () => getMypageDataQuery(),
  });

  return (
    <ThemeProvider theme={theme}>
      <MyReviewSection>
        <HandleSection
          prevBtn={true}
          title="리뷰 관리"
          closeBtn={false}
          color="#a489f0"
        />
        {myData ? (
          myData?.reviewList.map((item: any) => {
            return (
              <Review>
                <HaveReview>
                  <ReviewDiv>
                    <Subject>{item?.subject}</Subject>
                    <ReviewTitle>{item?.title}</ReviewTitle>
                    <ReviewContent>{item?.content}</ReviewContent>
                  </ReviewDiv>
                  <Next />
                </HaveReview>
              </Review>
            );
          })
        ) : (
          <p>작성한 리뷰가 없습니다</p>
        )}
      </MyReviewSection>
    </ThemeProvider>
  );
};

export default MyReview;

const MyReviewSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100vh;
  min-height: 60rem;
  align-items: center;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.laptop} {
    width: 60%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 40%;
  }
`;

const ReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 93%;
  height: 100%;
  overflow-y: auto;
  align-items: space-around;
`;

const HaveReview = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  border: 1px solid #cacaca;
  border-radius: 10px;
  align-items: center;
`;

const ReviewTitle = styled.p`
  display: flex;
  width: 95%;
  height: 20%;
  align-items: center;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0 auto;
`;

const ReviewContent = styled.p`
  display: flex;
  width: 95%;
  height: 50%;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0 auto;
`;

const Review = styled.div`
  display: flex;
  width: 90%;
  height: 12vh;
  min-height: 10rem;
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
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }
`;

const Subject = styled.p`
  display: flex;
  width: 95%;
  height: 30%;
  align-items: center;
  font-size: 1.4rem;
  margin: 0 auto;
  font-weight: bold;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.5rem;
  }
`;
