import React from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import HandleSection from "../../components/HandleSection";
import { ReactComponent as Alarm } from "../../assets/imgs/alarm.svg";
import { noticeDetailQuery } from "../../queries/noticeQuery";
import { useQuery } from "@tanstack/react-query";

const NoticeDetail: React.FC = () => {
  const params = useParams();
  const paramsId = params.id;

  const { data } = useQuery({
    queryKey: ["getNoticeDetailQuery"],
    queryFn: () => noticeDetailQuery(paramsId),
  });

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
          <Alarm width={30} height={30} />
          <NoticeText>
            <NoticeName>{data?.title}</NoticeName>
            <NoticeDate>{data?.createdAt}</NoticeDate>
          </NoticeText>
        </DataGroup>
        <DetailContent>{data?.content}</DetailContent>
      </DetailSection>
    </ThemeProvider>
  );
};

export default NoticeDetail;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100vh;
  margin: 2vh auto;

  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
    height: 85vh;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 50%;
    height: 75vh;
  }
`;

const DetailContent = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.4rem;
  margin-top: 2rem;
  white-space: pre-wrap;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.5rem;
    margin: 2rem auto;
    width: 80%;
  }

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.6rem;
  }
`;

const DataGroup = styled.div`
  display: flex;
  width: 100%;
  height: 7vh;
  min-height: 5rem;
  align-items: center;
  border-bottom: 1px solid #a4b0be;

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
  width: 70%;
`;

const NoticeName = styled.div`
  display: flex;
  font-size: 1.6rem;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 2rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
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
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.5rem;
  }
`;
