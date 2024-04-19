// import React, { useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import theme from "../constants/theme";

interface DropdownProps {
  getOption: (searchType: string | null) => void;
  data: any;
  width: number;
}

interface OptionProps {
  selected?: boolean;
  width?: number;
}

const Dropdown: React.FC<DropdownProps> = ({ getOption, data, width }) => {
  // const [searchType, setSearchType] = useState<string | null>(null);

  // const handleSearchType = (value: string) => {
  //   setSearchType(value);
  // };

  // const applyFilters = () => {
  //   getOption(searchType);
  // };

  // const cleanFilter = () => {
  //   getOption("");
  // };

  return (
    <ThemeProvider theme={theme}>
      <DropdownDiv>
        <OptionDiv>
          {data.map((item: any) => {
            return (
              <Option
                key={item.id}
                width={width}
                // selected={searchType === item.code}
                // onClick={() => handleSearchType(item.type)}
              >
                {item.value}
              </Option>
            );
          })}
        </OptionDiv>
        {/* <DropdownButton>
          <OptionSelectButton onClick={cleanFilter}>
            옵션 초기화
          </OptionSelectButton>
          <OptionSelectButton onClick={applyFilters}>
            적용하기
          </OptionSelectButton>
        </DropdownButton> */}
      </DropdownDiv>
    </ThemeProvider>
  );
};

export default Dropdown;

const DropdownDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: auto;
  margin: 0 auto;
`;

const OptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-flow: row wrap;
`;

// const OptionSelectButton = styled.button`
//   display: flex;
//   width: 20%;
//   height: 3vh;
//   font-size: 1rem;
//   margin: 1vh auto;
//   justify-content: center;
//   align-items: center;
//   border: none;
//   border-radius: 1rem;
//   font-family: "JejuGothic";
//   @media ${({ theme }) => theme.device.tablet} {
//     font-size: 1.1rem;
//   }
// `;

const Option = styled.p<OptionProps>`
  display: flex;
  border: 1px solid black;
  border-radius: 2rem;
  width: ${(props) => props.width}%;
  height: 2.5vh;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.1rem;
  }

  ${({ theme, selected }) =>
    selected &&
    css`
      background-color: ${theme.colors.gray};
      color: white;
    `}
`;

// const DropdownButton = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;
