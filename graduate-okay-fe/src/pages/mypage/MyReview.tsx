import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useQuery } from "@tanstack/react-query";
import { getMypageDataQuery } from "../../queries/mypageQuery";
import HandleSection from "../../components/HandleSection";
import StarRate from "../kyRecommend/StarRate";
import { ReactComponent as Next } from "../../assets/imgs/arrow/next.svg";

const MyReview: React.FC = () => {
  const { data: myData } = useQuery({
    queryKey: ["getMypageData"],
    queryFn: () => getMypageDataQuery(),
  });

  console.log(myData?.reviewList);

  return (
    <ThemeProvider theme={theme}>
      <MyReviewSection>
        <HandleSection
          prevBtn={true}
          title="리뷰 관리"
          closeBtn={false}
          color="#a489f0"
        />
        <ReviewDiv>
          {myData?.reviewList.map((item: any) => {
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
        </ReviewDiv>
      </MyReviewSection>
    </ThemeProvider>
  );
};

export default MyReview;

const MyReviewSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100vh;
  margin: 2vh auto;
`;

const ReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  height: 70%;
  @media ${({ theme }) => theme.device.laptop} {
    width: 60%;
    height: 60%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 40%;
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
