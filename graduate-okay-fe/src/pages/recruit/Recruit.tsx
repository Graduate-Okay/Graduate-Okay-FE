import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRecruitListQuery } from "../../queries/recruitQuery";
import HandleSection from "../../components/HandleSection";
import Pagination from "../../components/Pagination";
import FilterModal from "./FilterModal";

const Recruit: React.FC = () => {
  const [currnetPage, setCurrentPage] = useState<number>(1);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["recruitList", currnetPage],
    queryFn: () => fetchRecruitListQuery(currnetPage),
    staleTime: 600000,
    placeholderData: keepPreviousData,
  });

  const getCurrentPage = (page: number) => {
    const correction = page + 1;
    setCurrentPage(correction);
    return;
  };

  const handleClick = (url: string) => {
    window.open(url);
  };

  const handleFilter = () => {
    setOpen(!isOpen);
  };

  console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <HandleSection
        prevBtn={true}
        title="채용 공고 확인하기"
        closeBtn={false}
        color="#a489f0"
      />
      <Filter>
        <p onClick={handleFilter}>필터링</p>
      </Filter>
      <RecruitSection>
        <RecruitDiv>
          <Title>
            <OrganizationTitle>공시기관</OrganizationTitle>
            <AnnouncementTitle>공고</AnnouncementTitle>
            <Classification>채용구분</Classification>
            <Employment>고용형태</Employment>
          </Title>
          {data &&
            data.result.map((item: any) => {
              return (
                <Content
                  key={item?.recrutPblntSn}
                  onClick={() => handleClick(item?.srcUrl)}
                >
                  <Organization>{item?.instNm}</Organization>
                  <Announcement>{item?.recrutPbancTtl}</Announcement>
                  <Classification>{item?.recrutSeNm}</Classification>
                  <EmploymentContent>
                    <p>{item?.hireTypeNmLst}</p>
                    <WorkPlace>{item?.workRgnNmLst}</WorkPlace>
                  </EmploymentContent>
                </Content>
              );
            })}
          <Pagination
            maxPageNumber={data?.totalCount}
            getCurrentPage={getCurrentPage}
          />
        </RecruitDiv>
      </RecruitSection>
      {isOpen && <FilterModal onModal={handleFilter} />}
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
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 8%;
  background-color: #ece5ff;
  font-size: 1.2rem;

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.6rem;
  }
`;

const Organization = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const OrganizationTitle = styled(Organization)`
  justify-content: center;
`;

const Announcement = styled.div`
  display: flex;
  width: 35%;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AnnouncementTitle = styled(Announcement)`
  justify-content: center;
`;

const Employment = styled.div`
  display: flex;
  width: 20%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-content: center;
`;

const EmploymentContent = styled(Employment)`
  flex-direction: column;
  font-size: 1rem;
  align-items: start;
`;

const Classification = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WorkPlace = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const Filter = styled.div`
  display: flex;
  width: 90%;
  height: 2vh;
  justify-content: flex-end;
  margin: 0 auto;

  > p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 100%;
    border: 1px solid #636e72;
    border-radius: 10rem;
    font-size: 1.1rem;
    cursor: pointer;
  }
`;
