import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRecruitListQuery } from "../../queries/recruitQuery";
import HandleSection from "../../components/HandleSection";
import Pagination from "../../components/Pagination";

const Recruit: React.FC = () => {
  const [currnetPage, setCurrentPage] = useState<number>(1);
  const { data } = useQuery({
    queryKey: ["recruitList", currnetPage],
    queryFn: () => fetchRecruitListQuery(currnetPage),
    staleTime: 600000,
    placeholderData: keepPreviousData,
  });

  console.log(data);
  const getCurrentPage = (page: number) => {
    const correction = page + 1;
    setCurrentPage(correction);
    return;
  };

  return (
    <ThemeProvider theme={theme}>
      <HandleSection
        prevBtn={true}
        title="채용 공고 확인하기"
        closeBtn={false}
        color="#a489f0"
      />
      <RecruitSection>
        <RecruitDiv>
          <Title>
            <Organization>공시기관</Organization>
            <Classification>채용구분</Classification>
            <Credit>학점</Credit>
            <Count>수강횟수</Count>
          </Title>
          {data &&
            data.result.map((item: any) => {
              return (
                <Content>
                  <Organization>{item?.instNm}</Organization>
                  <Classification>{item?.recrutSeNm}</Classification>
                  <Credit>학점</Credit>
                  <Count>수강횟수</Count>
                </Content>
              );
            })}
          <Pagination
            maxPageNumber={data?.totalCount}
            getCurrentPage={getCurrentPage}
          />
        </RecruitDiv>
      </RecruitSection>
    </ThemeProvider>
  );
};
export default Recruit;

const RecruitSection = styled.section`
  display: flex;
  width: 100%;
  height: 70vh;
  flex-direction: column;
  align-items: center;
  margin-top: 3%;

  @media ${({ theme }) => theme.device.laptop} {
    width: 80%;
    margin: 0 auto;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 65%;
  }
`;

const RecruitDiv = styled.div`
  display: flex;
  width: 100%;
  height: 85%;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
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

const Classification = styled.div`
  display: flex;
  width: 12%;
  justify-content: center;
  align-items: center;
`;

const Organization = styled.div`
  display: flex;
  width: 30%;
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

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 8%;
  font-size: 1.2rem;
  border-bottom: 1px solid #d9d9d9;
  cursor: pointer;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.25rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.4rem;
  }
`;
