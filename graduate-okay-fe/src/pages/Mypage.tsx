import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

// 섹션 나타내는 탭
// 섹션 하위 탭
const Mypage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MypageSection>
        <MypageDiv>
          <UserInfo>
            <UserDiv>사용자 정보</UserDiv>
          </UserInfo>
          <OptionList>
            <MypageHeader>
              <p>나의 졸업요건 조회</p>
            </MypageHeader>
            <MypageRow>
              <p>졸업결과 확인하기</p>
            </MypageRow>
            <MypageHeader>
              <p>나의 정보</p>
            </MypageHeader>
            <MypageRow>
              <p>닉네임 변경</p>
            </MypageRow>
            <MypageRow>
              <p>비밀번호 변경</p>
            </MypageRow>
            <MypageHeader>
              <p>기타</p>
            </MypageHeader>
            <MypageRow>
              <p>공지사항</p>
            </MypageRow>
          </OptionList>
        </MypageDiv>
      </MypageSection>
    </ThemeProvider>
  );
};

export default Mypage;

const MypageSection = styled.section`
  display: flex;
  width: 100%;
  height: 70vh;
`;

const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 100%;
  border: 1px solid #b2bec3;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
`;

const UserDiv = styled.div`
  display: flex;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
`;

const MypageRow = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
  font-size: 1.2rem;

  > p {
    margin-left: 0.5rem;
  }
`;

const MypageHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  justify-contents: center;
  height: 3rem;
  margin-top: 2rem;
`;
