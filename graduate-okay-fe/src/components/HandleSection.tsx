import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import theme from "../constants/theme";
import { ReactComponent as Prev } from "../assets/imgs/arrow/prev.svg";
import { ReactComponent as Close } from "../assets/imgs/arrow/close.svg";

interface handleSectionProps {
  prevBtn: boolean;
  title: string;
  closeBtn: boolean;
  color?: string;
}

interface SVGProps {
  visibility: boolean;
}

interface TextProps {
  color?: string;
}

const HandleSection: React.FC<handleSectionProps> = ({
  prevBtn,
  title,
  closeBtn,
  color,
}) => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={theme}>
      <HandleSectionDiv>
        <SVGWrapper visibility={prevBtn} onClick={handlePrev}>
          <Prev width={15} height={15} />
        </SVGWrapper>
        <Title color={color}>{title}</Title>
        <SVGWrapper visibility={closeBtn}>
          <Close width={15} height={15} />
        </SVGWrapper>
      </HandleSectionDiv>
    </ThemeProvider>
  );
};

export default HandleSection;

const HandleSectionDiv = styled.div`
  display: flex;
  width: 100%;
  height: 6vh;
  min-height: 6rem;
  font-size: 1.6rem;
  justify-content: center;
  align-items: center;

  > svg {
    flex-grow: 1;
  }
  > div {
    flex-grow: 1;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 2rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2.2rem;
  }
`;

const Title = styled.p<TextProps>`
  display: flex;
  flex-grow: 5;
  justify-content: center;
  color: ${(props) => props.color};
`;

const SVGWrapper = styled.div<SVGProps>`
  display: flex;
  justify-content: center;
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};

  > svg {
    @media ${({ theme }) => theme.device.tablet} {
      visibility: hidden;
    }
  }
`;
