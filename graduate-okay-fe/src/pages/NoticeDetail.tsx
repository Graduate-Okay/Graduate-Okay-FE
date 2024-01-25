import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import axios, { AxiosError } from "axios";
import api from "../apis/api";
import { INoticeDetail } from "../interfaces";
import HandleSection from "../components/HandleSection";
import { ReactComponent as Alarm } from "../assets/imgs/alarm.svg";

const NoticeDetail: React.FC = () => {
  const params = useParams();
  const [detail, setDetail] = useState<INoticeDetail>();
  const paramsId = params.id;

  const getDetail = useCallback(async () => {
    try {
      const response = await axios.get(`${api.notice}/${paramsId}`);
      setDetail(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      }
    }
  }, [paramsId]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  return (
    <ThemeProvider theme={theme}>
      <DetailSection>
        <HandleSection
          prevBtn={true}
          title="공지사항"
          closeBtn={false}
          color="#a489f0"
        />
        <DataGroup>
          <Alarm />
          <NoticeText>
            <NoticeName>{detail?.title}</NoticeName>
            <NoticeDate>{detail?.createdAt}</NoticeDate>
          </NoticeText>
        </DataGroup>
        <DetailContent>{detail?.content}</DetailContent>
      </DetailSection>
    </ThemeProvider>
  );
};

export default NoticeDetail;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 65vh;
  margin: 2vh auto;

  @media ${({ theme }) => theme.device.laptop} {
    width: 60%;
  }
`;

const DetailContent = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.4rem;
  margin-top: 2rem;

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
  }
`;

const DataGroup = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  align-items: center;
  border-bottom: 1px solid #a4b0be;

  > svg {
    width: 15%;
  }
`;

const NoticeText = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
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
