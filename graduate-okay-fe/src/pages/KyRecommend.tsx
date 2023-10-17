import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const KyRecommend: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecommendDiv>
        {/* <p>✨인기 교양 추천✨</p> */}
        <TableWrapper>
          <RecommendTable>
            <TableRow>
              <TableHeader className="grade_table_th rank_width">
                순위
              </TableHeader>
              <TableHeader className="grade_table_th name_width">
                과목명
              </TableHeader>
              <TableHeader className="grade_table_th ky_width">
                교양 인재상
              </TableHeader>
              <TableHeader className="grade_table_th core_width">
                핵심 역량
              </TableHeader>
              <TableHeader className="grade_table_th gradenum_width">
                학점
              </TableHeader>
              <TableHeader className="grade_table_th num_width">
                수강횟수
              </TableHeader>
            </TableRow>
          </RecommendTable>
        </TableWrapper>
      </RecommendDiv>
    </ThemeProvider>
  );
};

export default KyRecommend;

const RecommendDiv = styled.div`
  display: flex;
  width: 100%;
  height: 65vh;
  flex-direction: column;
  align-items: center;
  margin-top: 3%;
`;

const TableWrapper = styled.div`
  display: flex;
  width: 90%;
  max-height: 60vh;
  overflow-y: scroll;
  text-align: center;
`;

const RecommendTable = styled.table`
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media ${({ theme }) => theme.device.laptop} {
    width: 80%;
  }
`;

const TableRow = styled.tr`
  text-align: center;
  font-size: 1rem;
  height: 2.5rem;
  background-color: #d6d6f5;
`;

const TableHeader = styled.th`
  vertical-align: middle;
  border: 1px solid #a79d9d;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.3rem;
  }
`;
