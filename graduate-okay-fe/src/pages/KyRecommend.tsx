import React, { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import axios from "axios";
import api from "../apis/api";
import { ISubjectData, ISubject } from "../interfaces";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

// 검색어 입력하면 디바운싱으로 검색 !
const KyRecommend: React.FC = () => {
  const [electives, setElectives] = useState<ISubjectData | null>(null);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();
  const search = useInput("");
  const params = {
    page: currentPage,
    searchWord: search.value,
  };

  const getElectives = useCallback(async () => {
    try {
      const response = await axios.get(
        `${api.subject}?page=${params.page}&searchWord=${params.searchWord}`
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      getElectives();
      e.preventDefault();
    }
  };

  useEffect(() => {
    getElectives();
  }, [getElectives]);

  return (
    <ThemeProvider theme={theme}>
      <NoticeSearch name="searchBar">
        <select name="srchType" id="srchType">
          <option value="Name">과목명</option>
          <option value="Creadit">학점</option>
        </select>
        <input
          type="text"
          placeholder="🔍︎과목명을 입력하세요"
          onChange={search.onChange}
          value={search.value}
          onKeyDown={handleKeyDown}
        />
      </NoticeSearch>
      <RecommendDiv>
        <TableWrapper>
          <RecommendTable>
            <thead>
              <TableRow>
                <TableHeader>순위</TableHeader>
                <TableHeader>과목명</TableHeader>
                <TableHeader>학점</TableHeader>
                <TableHeader>교양 인재상</TableHeader>
                <TableHeader>핵심 역량</TableHeader>
                <TableHeader>교양필수 여부</TableHeader>
                <TableHeader>수강 횟수</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {electives?.subjectList &&
                electives?.subjectList.map((item: ISubject, key: number) => {
                  return (
                    <TableRow
                      key={key}
                      onClick={() => routeDetail(item.subjectId)}
                    >
                      <TableContent>{key + 1}</TableContent>
                      <TableContent>{item.name || ""}</TableContent>
                      <TableContent>{item.credit || ""}</TableContent>
                      <TableContent>{item.kyModalType || ""}</TableContent>
                      <TableContent>{item.kyCoreType || ""}</TableContent>
                      <TableContent>{item.isRequired ? "O" : "X"}</TableContent>
                      <TableContent>{item.kyCount || ""}</TableContent>
                    </TableRow>
                  );
                })}
            </tbody>
          </RecommendTable>
        </TableWrapper>
        <Pagination
          maxPageNumber={maxPageNumber}
          getCurrentPage={getCurrentPage}
        />
      </RecommendDiv>
    </ThemeProvider>
  );
};

export default KyRecommend;

const RecommendDiv = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
  align-items: center;
  margin-top: 3%;
`;

const TableWrapper = styled.div`
  display: flex;
  width: 90%;
  max-height: 60vh;
  text-align: center;
  overflow: auto;
`;

const RecommendTable = styled.table`
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;

  @media ${({ theme }) => theme.device.laptop} {
    width: 80%;
  }
`;

const TableRow = styled.tr`
  text-align: center;
  font-size: 1rem;
  height: 2.5rem;
`;

const TableHeader = styled.th`
  vertical-align: middle;
  border: 1px solid #a79d9d;
  background-color: #d6d6f5;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.3rem;
  }
`;

const TableContent = styled.td`
  vertical-align: middle;
  border: 1px solid #a79d9d;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.3rem;
  }
`;

const NoticeSearch = styled.form`
  display: flex;
  flex-direction: row;
  height: 2.5rem;
`;
