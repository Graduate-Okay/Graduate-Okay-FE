import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import ArrowNext from "../assets/imgs/ArrowNext.svg";
import ArrowPrev from "../assets/imgs/ArrowPrev.svg";

interface PaginationProps {
  pageNumber: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageNumber }) => {
  const paging = () => {
    const numberArray = [];
    for (let i = 0; i < pageNumber; i++) {
      numberArray.push(<Number key={i}>{i + 1}</Number>);
    }
    return numberArray;
  };

  return (
    <ThemeProvider theme={theme}>
      <Page>
        <img src={ArrowPrev} alt="prev" />
        {paging()}
        <img src={ArrowNext} alt="next" />
      </Page>
    </ThemeProvider>
  );
};

export default Pagination;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 5%;
    cursor: pointer;
    @media ${({ theme }) => theme.device.tablet} {
      width: 30px;
    }
  }
`;

const Number = styled.span`
  display: flex;
  width: 30px;
  justify-content: center;
  cursor: pointer;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
`;
