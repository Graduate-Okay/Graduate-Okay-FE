import React, { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";
import { ISubjectData, ISubject } from "../interfaces";
import theme from "../constants/theme";
import api from "../apis/api";
import useInput from "../hooks/useInput";
import useDebounce from "../hooks/useDebounce";
import Downbutton from "../assets/imgs/ArrowDown.svg";
import Upbutton from "../assets/imgs/ArrowUp.svg";
import Dropdown from "../components/Dropdown";

const KyRecommend: React.FC = () => {
  const [electives, setElectives] = useState<ISubjectData | null>(null);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDropdownView, setIsDropdownView] = useState<boolean>(false);
  const [type, setType] = useState<string | null>("PEACE");
  const navigate = useNavigate();
  const search = useInput("");

  const debouncedSearch = useDebounce(search.value, 400);

  const params = {
    page: currentPage,
    searchWord: debouncedSearch,
    type: type,
  };

  const getElectives = useCallback(async () => {
    try {
      const response = await axios.get(
        `${api.subject}?page=${params.page}&searchWord=${params.searchWord}&type=${params.type}`
      );
      setElectives(response?.data.data);
      setMaxPageNumber(response?.data.data.maxPageCount);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [params.page, params.searchWord, params.type]);

  const handleDropdown = () => {
    setIsDropdownView(!isDropdownView);
  };

  const getCurrentPage = (page: number) => {
    setCurrentPage(page);
    return;
  };

  const routeDetail = (subjectId: number) => {
    navigate(`${subjectId}`);
  };

  const getOption = (searchType: string | null) => {
    setType(searchType);
  };

  useEffect(() => {
    getElectives();
  }, [getElectives]);

  return (
    <ThemeProvider theme={theme}>
      <ExplainDiv>
        <p>과목 클릭 시, 세부 페이지로 이동합니다.</p>
        <p>과목명, 학점, 수강 횟수 클릭 시 오름/내림차순으로 정렬합니다.</p>
      </ExplainDiv>
      <SubjectSearch>
        <InputSearch
          type="text"
          placeholder="🔍︎과목명을 입력하세요"
          onChange={search.onChange}
          value={search.value}
        />
      </SubjectSearch>
      <SearchOptions>
        <p>과목 수 : {electives?.totalCount}건</p>
        <DropOptions onClick={handleDropdown}>
          <DropTitle>
            <p>상세 옵션</p>
            {isDropdownView ? (
              <img src={Downbutton} alt="드롭버튼" />
            ) : (
              <img src={Upbutton} alt="드롭버튼" />
            )}
          </DropTitle>
        </DropOptions>
      </SearchOptions>
      {isDropdownView && <Dropdown getOption={getOption} />}
      <RecommendDiv>
        <TableWrapper>
          <RecommendTable>
            <thead>
              <TableRow>
                <TableHeader>순위</TableHeader>
                <TableHeader>과목명 ▲</TableHeader>
                <TableHeader>학점 ▲</TableHeader>
                <TableHeader>교양 인재상</TableHeader>
                <TableHeader>핵심 역량</TableHeader>
                <TableHeader>교양필수 여부</TableHeader>
                <TableHeader>수강 횟수 ▲</TableHeader>
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
                      <TableContent>{item.kyModelType || ""}</TableContent>
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
`;

const ExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: gray;
  width: 90%;
  margin: 8px auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 75%;
    justify-content: center;
    align-items: center;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.2rem;
    margin: 1.5rem auto;
    height: 8vh;
  }
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
  &:hover {
    background-color: #ecf0f1;
  }
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
  cursor: pointer;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.3rem;
  }
`;

const SubjectSearch = styled.form`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 2.3rem;
  justify-content: right;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
    margin: 2vh auto;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
`;

const InputSearch = styled.input`
  display: flex;
  width: 40%;
  padding: 0.5rem;
  transition: width 0.3s ease;

  &:focus {
    width: 50%;
  }

  @media ${({ theme }) => theme.device.laptop} {
    width: 15%;

    &:focus {
      width: 20%;
    }
  }
`;

const SearchOptions = styled.div`
  display: flex;
  width: 90%;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 75%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
    font-size: 1.2rem;
  }
`;

const DropOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  justify-content: end;
`;

const DropTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 2rem;
  }
`;
