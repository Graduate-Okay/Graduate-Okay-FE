import React, { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageGroupSize = 10;

  const paging = () => {
    const numberArray = [];
    const startPage =
      (Math.ceil(currentPage / pageGroupSize) - 1) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, maxPageNumber);

    for (let i = startPage; i <= endPage; i++) {
      numberArray.push(
        <Number key={i} onClick={() => pageRouting(i)}>
          {i}
        </Number>
      );
    }
    return numberArray;
  };

  const pageRouting = async (i: number) => {
    try {
      setCurrentPage(i);
      await getCurrentPage(i - 1);
    } catch (error) {
      throw new Error(`페이징 에러 : ${error}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Page>
        <img
          src={ArrowPrev}
          alt="prev"
          onClick={() => {
            if (currentPage > 1) {
              pageRouting(currentPage - 1);
            }
          }}
        />

        {paging()}
        <img
          src={ArrowNext}
          alt="next"
          onClick={() => {
            if (currentPage < maxPageNumber) {
              pageRouting(currentPage + 1);
            }
          }}
        />
      </Page>
    </ThemeProvider>
  );
};

export default Pagination;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;

  > img {
    width: 15px;
    height: 15px;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: #d9d9d9;
    }

    @media ${({ theme }) => theme.device.tablet} {
      width: 15px;
      height: 15px;
    }
    @media ${({ theme }) => theme.device.laptop} {
      width: 18px;
      height: 18px;
    }
    @media ${({ theme }) => theme.device.largeLaptop} {
      width: 20px;
      height: 20px;
    }
  }
`;

const Number = styled.span`
  display: flex;
  width: 30px;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.4rem;
  }
`;
