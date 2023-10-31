import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import ArrowNext from "../assets/imgs/ArrowNext.svg";
import ArrowPrev from "../assets/imgs/ArrowPrev.svg";

interface PaginationProps {
  maxPageNumber: number;
  getCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  maxPageNumber,
  getCurrentPage,
}) => {
  const paging = () => {
    const numberArray = [];
    for (let i = 0; i < maxPageNumber; i++) {
      numberArray.push(
        <Number key={i} onClick={() => pageRouting(i)}>
          {i + 1}
        </Number>
      );
    }
    return numberArray;
  };

  const pageRouting = async (i: number) => {
    try {
      await getCurrentPage(i);
    } catch (error) {
      throw new Error(`페이징 에러 : ${error}`);
    }
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
    &:hover {
      background-color: #d9d9d9;
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
  &:hover {
    background-color: #d9d9d9;
  }
`;
