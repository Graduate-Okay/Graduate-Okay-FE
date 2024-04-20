import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import useInput from "../../hooks/useInput";
import recruit from "../../constants/recruit";
import Dropdown from "./Dropdown";
import { ReactComponent as Up } from "../../assets/imgs/arrow/up.svg";
import { ReactComponent as Down } from "../../assets/imgs/arrow/down.svg";

interface ModalProps {
  onModal: () => void;
  handleSearch: (
    region: string,
    acbgCondLst: string,
    hireType: string,
    ncsCdLst: string,
    recrutSe: string,
    title: string
  ) => void;
}

const FilterModal: React.FC<ModalProps> = ({ onModal, handleSearch }) => {
  const [dropdowns, setDropdowns] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const title = useInput("");
  const [region, setRegion] = useState<string>("");
  const [acbgCondLst, setAcbgCondLst] = useState<string>("");
  const [hireType, setHireType] = useState<string>("");
  const [ncsCdLst, setNcsCdLst] = useState<string>("");
  const [recrutSe, setRecrutSe] = useState<string>("");

  const getOption = (divide: string, args: any) => {
    if (divide === "region") {
      setRegion(args.join(","));
    }
    if (divide === "eduLevel") {
      setAcbgCondLst(args.join(","));
    }
    if (divide === "employmentType") {
      setHireType(args.join(","));
    }
    if (divide === "ncsClassification") {
      setNcsCdLst(args.join(","));
    }
  };

  const handleOption = (index: number) => {
    setDropdowns((prev) => {
      const newDropdowns = [...prev];
      newDropdowns[index] = !newDropdowns[index];
      return newDropdowns;
    });
  };

  const handleSubmit = () => {
    handleSearch(
      region,
      acbgCondLst,
      hireType,
      ncsCdLst,
      recrutSe,
      title.value
    );
    onModal();
  };

  const handleClear = () => {
    setRegion("");
    setAcbgCondLst("");
    setHireType("");
    setNcsCdLst("");
    setRecrutSe("");
    title.value = "";

    handleSearch(
      region,
      acbgCondLst,
      hireType,
      ncsCdLst,
      recrutSe,
      title.value
    );
    onModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <ModalBackground>
        <ModalContent>
          <Title>
            <TitleOption onClick={handleClear}>초기화</TitleOption>
            <TitleName>검색 및 필터링</TitleName>
            <TitleOption onClick={onModal}>닫기</TitleOption>
          </Title>
          <Search>
            <SearchForm>
              <SearchText>공고 제목</SearchText>
              <InputDiv>
                <input
                  type="text"
                  placeholder="공고 제목을 입력해주세요."
                  onChange={title.onChange}
                  value={title.value}
                />
              </InputDiv>
            </SearchForm>
            <SearchForm>
              <SearchText>채용 구분</SearchText>
              <InputDiv>
                <select
                  name="recruitmentClassification"
                  onChange={(e) => setRecrutSe(e.target.value)}
                >
                  <option value="">전체보기</option>
                  {recruit.RECRUITMENT_CLASSIFICATION.map((item) => {
                    return (
                      <option key={item.id} value={item.code}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </InputDiv>
            </SearchForm>
            <SearchForm>
              <SearchText onClick={() => handleOption(0)}>
                <p>지역</p>
                {dropdowns[0] ? <Down fill="#a6a6a6" /> : <Up fill="#a6a6a6" />}
              </SearchText>
              {dropdowns[0] ? (
                <Dropdown
                  getOption={getOption}
                  data={recruit.REGION}
                  width={10}
                  divide="region"
                />
              ) : null}
            </SearchForm>
            <SearchForm>
              <SearchText onClick={() => handleOption(1)}>
                <p>학력</p>
                {dropdowns[1] ? <Down fill="#a6a6a6" /> : <Up fill="#a6a6a6" />}
              </SearchText>
              {dropdowns[1] ? (
                <Dropdown
                  getOption={getOption}
                  data={recruit.EDU_LEVEL}
                  width={23}
                  divide="eduLevel"
                />
              ) : null}
            </SearchForm>
            <SearchForm>
              <SearchText onClick={() => handleOption(2)}>
                <p>고용형태</p>
                {dropdowns[2] ? <Down fill="#a6a6a6" /> : <Up fill="#a6a6a6" />}
              </SearchText>
              {dropdowns[2] ? (
                <Dropdown
                  getOption={getOption}
                  data={recruit.EMPLOYMENT_TYPE}
                  width={24}
                  divide="employmentType"
                />
              ) : null}
            </SearchForm>
            <SearchForm>
              <SearchText onClick={() => handleOption(3)}>
                <p>직무</p>
                {dropdowns[3] ? <Down fill="#a6a6a6" /> : <Up fill="#a6a6a6" />}
              </SearchText>
              {dropdowns[3] ? (
                <Dropdown
                  getOption={getOption}
                  data={recruit.NCS_CLASSIFICATION}
                  width={24}
                  divide="ncsClassification"
                />
              ) : null}
            </SearchForm>
          </Search>
          <Submit onClick={handleSubmit}>적용하기</Submit>
        </ModalContent>
      </ModalBackground>
    </ThemeProvider>
  );
};

export default FilterModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 75%;
  height: 60%;
  min-height: 40rem;
  align-items: center;

  > svg {
    @media ${({ theme }) => theme.device.laptop} {
      width: 30%;
      height: 30%;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 60%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 45%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 25%;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4%;
  min-height: 1rem;
`;

const TitleOption = styled.p`
  display: flex;
  color: #a6a6a6;
  flex-grow: 1;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;

const TitleName = styled.p`
  display: flex;
  font-size: 1.2rem;
  flex-grow: 8;
  justify-content: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.4rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.6rem;
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 92%;
`;

const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 2rem;
  justify-content: space-around;
  align-items: center;
`;

const InputDiv = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    height: 2.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    height: 2.4rem;
  }

  > input {
    display: flex;
    width: 95%;
    border: none;

    &:focus {
      outline: none;
    }
  }

  > select {
    display: flex;
    width: 98%;
    border: none;
  }
`;

const SearchText = styled.p`
  display: flex;
  font-size: 1.1rem;
  color: #a6a6a6;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4vh;

  > svg {
    color: #a6a6a6;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  > p {
    width: 50%;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;

const Submit = styled.div`
  display: flex;
  width: 100%;
  height: 4%;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.4rem;
  }
`;
