import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import dropdown from "../constants/dropdown";

const Dropdown: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <DropdownDiv>
        <OptionDiv>
          <OptionTitle>
            <p>핵심역량</p>
          </OptionTitle>
          <OptionContents>
            {dropdown.KY_CORE_TYPE.map((item) => {
              return <p>{item.value}</p>;
            })}
          </OptionContents>
        </OptionDiv>
        <OptionDiv>
          <OptionTitle>
            <p>인재상</p>
          </OptionTitle>
          <OptionContents>
            {dropdown.KY_MODEL_TYPE.map((item) => {
              return <p>{item.value}</p>;
            })}
          </OptionContents>
        </OptionDiv>
        <OptionSelectButton>적용하기</OptionSelectButton>
      </DropdownDiv>
    </ThemeProvider>
  );
};

export default Dropdown;

const DropdownDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
`;

const OptionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionTitle = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  height: 2vh;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.1rem;
  }
`;

const OptionContents = styled.div`
  display: flex;
  font-size: 1rem;
  > p {
    display: flex;
    border: 1px solid black;
    border-radius: 2rem;
    width: 25%;
    height: 2.5vh;
    align-items: center;
    justify-content: center;
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 1.1rem;
    }
    @media ${({ theme }) => theme.device.laptop} {
      width: 10%;
    }
  }
`;

const OptionSelectButton = styled.button`
  display: flex;
  width: 20%;
  height: 3vh;
  font-size: 1rem;
  margin: 1vh auto;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 1rem;
  font-family: "JejuGothic";
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.1rem;
  }
`;
