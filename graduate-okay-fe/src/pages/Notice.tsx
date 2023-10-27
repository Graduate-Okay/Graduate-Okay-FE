import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import axios from "axios";

const Notice: React.FC = () => {
  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/notice`
      );
      console.log(response.data);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NoticeDiv>
        <NoticeTitle>
          <p>공지사항</p>
          <SearchForm name="searchBar">
            <select name="srchType" id="srchType">
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              name="srchKeyword"
              id="srchKeyword"
            />
            <SearchButton
              type="submit"
              id="submit"
              name="submit"
              value="검 색"
            />
          </SearchForm>
        </NoticeTitle>

        <div className="tabcontent">
          <div className="Notice__content--title">
            <div className="Notice__content--number">번호</div>
            <div className="Notice__content--category">카테고리</div>
            <div className="Notice__content--name">제목</div>
            <div className="Notice__content--date">날짜</div>
          </div>
          {/* {inputData.map((inputData) => {
                  return <NoticeRow Notice={inputData} />;
                })} */}
        </div>
        <div className="Board__page">
          {/* <Pagination
                  searchHelper={searchHelper}
                  pageName={pageName}
                  handleButton={handleButton}
                /> */}
        </div>
      </NoticeDiv>
    </ThemeProvider>
  );
};

export default Notice;

const NoticeDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65vh;
`;

const NoticeTitle = styled.div`
  display: flex;
  width: 100%;
  height: 4vh;
  color: #7978cd;
  font-size: 1.2rem;
  align-items: center;
  justify-content: space-around;
  @media ${({ theme }) => theme.device.tablet} {
    width: 90%;
    margin: 2vh auto;
    justify-content: space-between;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
    margin: 2vh auto;
    font-size: 1.6rem;
  }
`;

const SearchForm = styled.form`
  display: flex;
  > input {
    font-size: 1.4rem;
  }
`;

const SearchButton = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  background-color: #8f8de7;
  border: none;
  font-family: "JejuGothic";
`;
