import React, { useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import theme from "../../constants/theme";

interface DropdownProps {
  getOption: (divide: string, options: string[]) => void;
  data: any;
  width: number;
  divide: string;
}

interface OptionProps {
  selected?: boolean;
  width?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  getOption,
  data,
  width,
  divide,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSearchType = (value: string) => {
    const isOptionSelected = selectedOptions.includes(value);
    let updatedOptions;
    if (isOptionSelected) {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    } else {
      updatedOptions = [...selectedOptions, value];
    }
    setSelectedOptions(updatedOptions);
    getOption(divide, updatedOptions);
  };

  return (
    <ThemeProvider theme={theme}>
      <DropdownDiv>
        <OptionDiv>
          {data.map((item: any) => {
            return (
              <Option
                key={item.id}
                width={width}
                selected={selectedOptions.includes(item.code)}
                onClick={() => handleSearchType(item.code)}
              >
                {item.value}
              </Option>
            );
          })}
        </OptionDiv>
      </DropdownDiv>
    </ThemeProvider>
  );
};

export default Dropdown;

const DropdownDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100%;
  margin: 0 auto;
`;

const OptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-flow: row wrap;
`;

const Option = styled.p<OptionProps>`
  display: flex;
  border: 1px solid black;
  border-radius: 2rem;
  width: ${(props) => props.width}%;
  height: 2.2vh;
  font-size: 0.9rem;
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
