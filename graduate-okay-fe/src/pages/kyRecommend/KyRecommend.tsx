import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { SubjectList } from "../../interfaces";
import theme from "../../constants/theme";
import useInput from "../../hooks/useInput";
import useDebounce from "../../hooks/useDebounce";
import HandleSection from "../../components/HandleSection";
import { useQuery } from "@tanstack/react-query";
import { kyRecommend } from "../../queries/kyRecommendQuery";

const KyRecommend: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();
  const search = useInput("");
  const debouncedSearch = useDebounce(search.value, 400);
  const params = {
    page: currentPage,
    searchWord: debouncedSearch,
  };

  const getCurrentPage = (page: number) => {
    setCurrentPage(page);
    return;
  };

  const routeDetail = (subjectId: number) => {
    navigate(`${subjectId}`);
  };

  const { data } = useQuery({
    queryKey: ["kyRecommend", params.page, params.searchWord],
    queryFn: () => kyRecommend(params.page, params.searchWord),
  });

  return (
    <ThemeProvider theme={theme}>
      <HandleSection
        prevBtn={false}
        title="인기교양추천"
        closeBtn={false}
        color="#a489f0"
      />
      <KyRecommendSection>
        <ExplainDiv>
          <p>과목 클릭 시, 세부 페이지로 이동합니다.</p>
          <p>과목명, 학점, 수강 횟수 클릭 시 오름/내림차순으로 정렬합니다.</p>
        </ExplainDiv>
        <InputSearch
          type="text"
          placeholder="🔍︎과목명을 입력하세요"
          onChange={search.onChange}
          value={search.value}
        />
        <ContentSection>
          <SearchOptions>
            <SubjectLength>과목수</SubjectLength>
            <Length>
              <p>총</p>
              <LengthNumber>{data?.totalCount}</LengthNumber>
              <p>건</p>
            </Length>
          </SearchOptions>
          <RecommendDiv>
            <Title>
              <Rank>순위</Rank>
              <Subject>과목명</Subject>
              <Credit>학점</Credit>
              <Count>수강횟수</Count>
            </Title>
            {data?.subjectList &&
              data?.subjectList.map((item: SubjectList, index: number) => {
                const rank = currentPage * 10 + index + 1;
                return (
                  <Content
                    key={item.subjectId}
                    onClick={() => routeDetail(item.subjectId)}
                  >
                    <Rank>{rank}</Rank>
                    <Subject>{item.name || ""}</Subject>
                    <Credit>{item.credit || ""}</Credit>
                    <Count>{item.kyCount || ""}</Count>
                  </Content>
                );
              })}
            <Pagination
              maxPageNumber={data?.maxPageCount}
              getCurrentPage={getCurrentPage}
            />
          </RecommendDiv>
        </ContentSection>
      </KyRecommendSection>
    </ThemeProvider>
  );
};

export default KyRecommend;

const KyRecommendSection = styled.section`
  display: flex;
  width: 100%;
  height: 70vh;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.device.laptop} {
    width: 80%;
    margin: 0 auto;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 70%;
  }
`;

const SubjectLength = styled.div`
  display: flex;
  border: 1px solid #ece5ff;
  border-radius: 30px;
  width: 6rem;
  height: 2.5rem;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
`;

const RecommendDiv = styled.div`
  display: flex;
  width: 100%;
  height: 85%;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 10%;
  background-color: #ece5ff;
  font-size: 1.2rem;

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.6rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 8%;
  font-size: 1.2rem;
  border-bottom: 1px solid #d9d9d9;
  cursor: pointer;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.25rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.3rem;
  }
`;

const Rank = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const Subject = styled.div`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
`;

const Credit = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
`;

const Count = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
`;

const ExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  width: 80%;
  height: 5%;
  align-items: center;
`;

const InputSearch = styled.input`
  display: flex;
  width: 30rem;
  height: 2rem;
  border: 2px solid #a489f0;
  border-radius: 30rem;
  padding: 0.6rem;

  @media ${({ theme }) => theme.device.tablet} {
    width: 35rem;
  }

  @media ${({ theme }) => theme.device.laptop} {
    width: 40rem;
    height: 2rem;
    padding: 0.7rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 45rem;
    height: 2rem;
  }
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
  border-top: 1px solid #d9d9d9;
  margin-top: 3%;
`;

const SearchOptions = styled.div`
  display: flex;
  width: 95%;
  height: 15%;
  align-items: center;
  margin-left: auto;
`;

const Length = styled.div`
  display: flex;
  width: 7rem;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const LengthNumber = styled.p`
  display: flex;
  color: #5315fc;
  margin-left: 3px;
`;
