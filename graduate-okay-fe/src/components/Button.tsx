import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

interface buttonProps {
  text: string;
}

const Button: React.FC<buttonProps> = ({ text }) => {
  return (
    <ThemeProvider theme={theme}>
      <ButtonArea>
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
`;

const Text = styled.p`
  display: flex;
  color: white;
  font-size: 1.2rem;
`;
