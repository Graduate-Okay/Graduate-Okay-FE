import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { INoticeDetail } from "../interfaces";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { noticeQuery } from "../queries/noticeQuery";
import HandleSection from "../components/HandleSection";
import { ReactComponent as Alarm } from "../assets/imgs/alarm.svg";
import { ReactComponent as Next } from "../assets/imgs/arrow/next.svg";

const Notice: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["notice", currentPage],
    queryFn: () => noticeQuery(currentPage, 7),
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
        <HandleSection
          prevBtn={false}
          title="공지사항"
          closeBtn={false}
          color="#a489f0"
        />
        <NoticeContent>
          {data &&
            data?.data.noticeList.map((notice: INoticeDetail) => {
              return (
                <NoticeData
                  key={notice.id}
                  onClick={() => routeDetail(notice.id)}
                >
                  <DataGroup>
                    <Alarm width={27} height={27} />
                    <NoticeText>
                      <NoticeName>{notice.title}</NoticeName>
                      <NoticeDate>{notice.createdAt}</NoticeDate>
                    </NoticeText>
                    <Next />
                  </DataGroup>
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
  justify-content: center;
  align-items: center;
`;

const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 75%;
  margin: 2vh auto;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.device.tablet} {
    width: 70%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 65%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 50%;
  }
`;

const NoticeData = styled.div`
  display: flex;
  cursor: pointer;
  border: 1px solid #cacaca;
  border-radius: 30px;
  width: 100%;
  height: 11%;
  align-items: center;
  &:hover {
    background-color: #ecf0f1;
  }

  @media ${({ theme }) => theme.device.laptop} {
    height: 12%;
  }
`;

const DataGroup = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;

  > svg {
    width: 15%;
    @media ${({ theme }) => theme.device.tablet} {
      width: 10%;
    }
  }
`;

const NoticeText = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 70%;
  justify-content: space-around;

  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }
`;

const NoticeName = styled.div`
  display: flex;
  font-size: 1.6rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8rem;
  }
`;

const NoticeDate = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #a4b0be;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;
