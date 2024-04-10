import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const NotFound: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NotFoundSection>
        <h1>404 Not Found</h1>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
        <p>입력하신 주소가 정확한지 한번 더 확인해주세요.</p>
      </NotFoundSection>
    </ThemeProvider>
  );
};

export default NotFound;

const NotFoundSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;

  > h1 {
    font-size: 4rem;
  }

  > p {
    font-size: 1rem;
  }

  @media ${({ theme }) => theme.device.laptop} {
    > h1 {
      font-size: 5rem;
    }

    > p {
      font-size: 1.5rem;
    }
  }
`;
