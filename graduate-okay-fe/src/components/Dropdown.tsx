import React, { useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import theme from "../constants/theme";
import dropdown from "../constants/dropdown";

interface DropdownProps {
  getOption: (
    selectedKyCore: string | null,
    selectedKyModel: string | null
  ) => void;
}

interface OptionProps {
  selected?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ getOption }) => {
  const [selectedKyCore, setSelectedKyCore] = useState<string | null>(null);
  const [selectedKyModel, setSelectedKyModel] = useState<string | null>(null);

  const handleKyCoreClick = (value: string) => {
    setSelectedKyCore(value);
  };

  const handleKyModelClick = (value: string) => {
    setSelectedKyModel(value);
  };

  const applyFilters = () => {
    getOption(selectedKyCore, selectedKyModel);
  };

  return (
    <ThemeProvider theme={theme}>
      <DropdownDiv>
        <OptionDiv>
          <OptionTitle>
            <p>핵심역량</p>
          </OptionTitle>
          <OptionContents>
            {dropdown.KY_CORE_TYPE.map((item) => {
              return (
                <Option
                  key={item.id}
                  selected={selectedKyCore === item.value}
                  onClick={() => handleKyCoreClick(item.value)}
                >
                  {item.value}
                </Option>
              );
            })}
          </OptionContents>
        </OptionDiv>
        <OptionDiv>
          <OptionTitle>
            <p>인재상</p>
          </OptionTitle>
          <OptionContents>
            {dropdown.KY_MODEL_TYPE.map((item) => {
              return (
                <Option
                  key={item.id}
                  selected={selectedKyModel === item.value}
                  onClick={() => handleKyModelClick(item.value)}
                >
                  {item.value}
                </Option>
              );
            })}
          </OptionContents>
        </OptionDiv>
        <OptionSelectButton onClick={applyFilters}>적용하기</OptionSelectButton>
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

const Option = styled.p<OptionProps>`
  display: flex;
  border: 1px solid black;
  border-radius: 2rem;
  width: 25%;
  height: 2.5vh;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.1rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 10%;
  }

  ${({ theme, selected }) =>
    selected &&
    css`
      background-color: ${theme.colors.gray};
      color: white;
    `}
`;
