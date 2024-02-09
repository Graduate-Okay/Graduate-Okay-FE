import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

interface buttonProps {
  text: string;
  handleOnClick?: () => void;
}

const Button: React.FC<buttonProps> = ({ text, handleOnClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <ButtonArea onClick={handleOnClick}>
        <Text>{text}</Text>
      </ButtonArea>
    </ThemeProvider>
  );
};

export default Button;

const ButtonArea = styled.div`
  display: flex;
  width: 10rem;
  height: 3.5rem;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.device.tablet} {
    width: 14rem;
    height: 5rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 18rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 21rem;
  }
`;

const Text = styled.p`
  display: flex;
  color: white;
  font-size: 1.2rem;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.4rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.7rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2.2rem;
  }
`;
