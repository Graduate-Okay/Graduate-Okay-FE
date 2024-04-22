import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import HandleSection from "../components/HandleSection";
import { ReactComponent as Next } from "../assets/imgs/arrow/next.svg";

const More: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HandleSection
        prevBtn={true}
        title="더보기"
        closeBtn={false}
        color="#a489f0"
      />
      <MoreSection>
        <MorePageDiv>
          <OptionList>
            <MoreHeader>
              <p></p>
            </MoreHeader>
            <MoreRow>
              <p>채용공고 확인하기</p>
              <Next />
            </MoreRow>
            <MoreRow>
              <p>마이페이지</p>
              <Next />
            </MoreRow>
          </OptionList>
        </MorePageDiv>
      </MoreSection>
    </ThemeProvider>
  );
};

export default More;

const MoreSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75vh;
  min-height: 50rem;
  align-items: center;
`;

const MorePageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 67%;
  justify-content: center;

  @media ${({ theme }) => theme.device.laptop} {
    width: 60%;
    height: 60%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 30%;
  }
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
`;

const MoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: bold;
  justify-contents: center;
  height: 3rem;
  margin-top: 2rem;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.6rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
    height: 4rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2rem;
  }
`;

const MoreRow = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: gray;
  }
  > p {
    margin-left: 0.5rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.5rem;
    height: 4rem;
  }
`;
