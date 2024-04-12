import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useQuery } from "@tanstack/react-query";
import { recruitListQuery } from "../../queries/recruitQuery";

const Recruit: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["recruitList"],
    queryFn: () => recruitListQuery(),
  });

  console.log(data);
  return (
    <ThemeProvider theme={theme}>
      <RecruitSection>
        <p>채용 공고 확인하기 </p>
      </RecruitSection>
    </ThemeProvider>
  );
};
export default Recruit;

const RecruitSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75vh;
  align-items: center;
`;
