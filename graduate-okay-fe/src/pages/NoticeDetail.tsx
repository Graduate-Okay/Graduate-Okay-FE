import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import axios, { AxiosError } from "axios";
import api from "../apis/api";
import { INoticeDetail } from "../interfaces";

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
        <DetailHeader>공지사항</DetailHeader>
        <DetailTitle>{detail?.title}</DetailTitle>
        <DetailDate>{detail?.createdAt}</DetailDate>
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

const DetailHeader = styled.div`
  display: flex;
  font-size: 1.4rem;
  color: #7978cd;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.6rem;
    margin-top: 2rem;
  }
`;

const DetailTitle = styled.div`
  display: flex;
  height: 5vh;
  align-items: center;
  font-size: 1.8rem;
  margin-top: 5vh;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 2.4rem;
  }
`;

const DetailDate = styled.div`
  display: flex;
  color: #a4b0be;
  height: 3vh;
  font-size: 1.1rem;
  border-bottom: 1px solid #a4b0be;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
    height: 4vh;
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
