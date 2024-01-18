import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { ReactComponent as Prev } from "../assets/imgs/arrow/prev.svg";
import { ReactComponent as Close } from "../assets/imgs/arrow/close.svg";

interface handleSectionProps {
  prevBtn: boolean;
  title: string;
  closeBtn: boolean;
}

interface SVGProps {
  justifyContent: string;
  visibility: boolean;
}

const HandleSection: React.FC<handleSectionProps> = ({
  prevBtn,
  title,
  closeBtn,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SignupDiv>
        <SVGWrapper justifyContent="flex-start" visibility={prevBtn}>
          <Prev width={15} height={15} />
        </SVGWrapper>
        <Title>{title}</Title>
        <SVGWrapper justifyContent="flex-end" visibility={closeBtn}>
          <Close width={15} height={15} />
        </SVGWrapper>
      </SignupDiv>
    </ThemeProvider>
  );
};

export default HandleSection;

const SignupDiv = styled.div`
  display: flex;
  width: 100%;
  height: 6vh;
  font-size: 1.6rem;
  justify-content: center;
  align-items: center;

  > svg {
    flex-grow: 1;
  }
  > div {
    flex-grow: 1;
  }
`;

const Title = styled.p`
  display: flex;
  flex-grow: 5;
  justify-content: center;
`;

const SVGWrapper = styled.div<SVGProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
`;
