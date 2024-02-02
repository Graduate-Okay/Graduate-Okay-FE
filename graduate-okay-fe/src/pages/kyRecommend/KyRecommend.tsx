import React, { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { ISubjectData, ISubject } from "../../interfaces";
import theme from "../../constants/theme";
import api from "../../apis/api";
import useInput from "../../hooks/useInput";
import useDebounce from "../../hooks/useDebounce";
import HandleSection from "../../components/HandleSection";

const KyRecommend: React.FC = () => {
  const [electives, setElectives] = useState<ISubjectData | null>(null);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();
  const search = useInput("");

  const debouncedSearch = useDebounce(search.value, 400);

  const params = {
    page: currentPage,
    searchWord: debouncedSearch,
  };

  const getElectives = useCallback(async () => {
    try {
      const response = await axios.get(
        `${api.subject}?page=${params.page}&searchWord=${params.searchWord}&size=10`
      );
      setElectives(response?.data.data);
      setMaxPageNumber(response?.data.data.maxPageCount);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [params.page, params.searchWord]);

  const getCurrentPage = (page: number) => {
    setCurrentPage(page);
    return;
  };

  const routeDetail = (subjectId: number) => {
    navigate(`${subjectId}`);
  };

  useEffect(() => {
    getElectives();
  }, [getElectives]);

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
              <LengthNumber>{electives?.totalCount}</LengthNumber>
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
            {electives?.subjectList &&
              electives?.subjectList.map((item: ISubject, key: number) => {
                return (
                  <Content
                    key={item.subjectId}
                    onClick={() => routeDetail(item.subjectId)}
                  >
                    <Rank>{key + 1}</Rank>
                    <Subject>{item.name || ""}</Subject>
                    <Credit>{item.credit || ""}</Credit>
                    <Count>{item.kyCount || ""}</Count>
                  </Content>
                );
              })}
            <Pagination
              maxPageNumber={maxPageNumber}
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 8%;
  font-size: 1.2rem;
  border-bottom: 1px solid #d9d9d9;
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
  width: 90%;
  height: 7%;
  justify-content: center;
  align-items: center;
`;

const InputSearch = styled.input`
  display: flex;
  width: 30rem;
  height: 3rem;
  border: 2px solid #a489f0;
  border-radius: 15px;
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
`;
