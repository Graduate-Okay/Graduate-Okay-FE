import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import axios from "axios";
import api from "../apis/api";
import { INotice } from "../interfaces";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Notice: React.FC = () => {
  const [notice, setNotice] = useState<INotice>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = async () => {
    try {
      const response = await axios.get(`${api.notice}`);
      setNotice(response.data.data);
      setPageNumber(response.data.data.maxPageCount);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const routeDetail = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <NoticeDiv>
        <NoticeTitle>
          <p>공지사항</p>
          <SearchForm name="searchBar">
            <select name="srchType" id="srchType">
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              name="srchKeyword"
              id="srchKeyword"
            />
            <SearchButton
              type="submit"
              id="submit"
              name="submit"
              value="검 색"
            />
          </SearchForm>
        </NoticeTitle>
        <NoticeContent>
          {notice?.noticeList.map((notice) => {
            return (
              <NoticeData
                key={notice.id}
                onClick={() => routeDetail(notice.id)}
              >
                <NoticeName>{notice.title}</NoticeName>
                <NoticeDate>{notice.createdAt}</NoticeDate>
              </NoticeData>
            );
          })}
        </NoticeContent>
        <Pagination pageNumber={pageNumber} />
      </NoticeDiv>
    </ThemeProvider>
  );
};

export default Notice;

const NoticeDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
    height: 90vh;
    margin: 0 auto;
  }
`;

const NoticeTitle = styled.div`
  display: flex;
  width: 100%;
  height: 4vh;
  color: #7978cd;
  font-size: 1.2rem;
  align-items: center;
  justify-content: space-around;
  @media ${({ theme }) => theme.device.tablet} {
    width: 90%;
    margin: 2vh auto;
    justify-content: space-between;
    font-size: 1.4rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
    margin: 2vh auto;
    font-size: 1.6rem;
  }
`;

const SearchForm = styled.form`
  display: flex;
  > input {
    font-size: 1.4rem;
  }
`;

const SearchButton = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  background-color: #8f8de7;
  border: none;
  font-family: "JejuGothic";
`;

const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 75%;
  margin: 2vh auto;
  justify-content: space-between;
`;

const NoticeData = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const NoticeName = styled.div`
  display: flex;
  font-size: 1.6rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.9rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 2.1rem;
  }
`;

const NoticeDate = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #a4b0be;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;
