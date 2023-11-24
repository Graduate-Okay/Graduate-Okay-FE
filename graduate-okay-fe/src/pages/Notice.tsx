import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { INoticeDetail } from "../interfaces";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { noticeQuery } from "../queries/noticeQuery";

const Notice: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["notice", currentPage],
    queryFn: () => noticeQuery(currentPage),
  });

  const getCurrentPage = (page: number) => {
    setCurrentPage(page);
    return;
  };

  const routeDetail = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <NoticeDiv>
        <NoticeTitle>
          <p>공지사항</p>
        </NoticeTitle>
        <NoticeContent>
          {data &&
            data?.data.noticeList.map((notice: INoticeDetail) => {
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
        <Pagination
          maxPageNumber={data?.data.maxPageCount}
          getCurrentPage={getCurrentPage}
        />
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
    height: 80vh;
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

const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 70%;
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
