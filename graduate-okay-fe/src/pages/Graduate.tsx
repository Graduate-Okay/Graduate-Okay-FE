import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

/**
 * @todo https://inpa.tistory.com/entry/CSS-%F0%9F%92%8D-%EB%B2%84%ED%8A%BC-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%AA%A8%EC%9D%8C
 * 에서 쓸 버튼 받기
 */
const Graduate: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GraduateSection>
        <GraduateTitle>당신은 졸업이 가능한가요 ?</GraduateTitle>
        <GraduateForm method="post" action="/Graduate">
          <GraduateButton className="section__button">
            <label>학업성적확인서 PDF 업로드</label>
            <input
              type="file"
              accept=".pdf"
              id="file"
              name="file"
              style={{ display: "none" }}
            />
          </GraduateButton>
        </GraduateForm>
        <GraduateContents>
          <div>❓ 학업성적확인서 PDF ❓</div>
          <a href="https://hsctis.hs.ac.kr/app-nexa/index.html" target="_blank">
            👉한신대학교 종합정보시스템
          </a>
          <div>👉인트라넷</div>
          <div>👉학부생서비스</div>
          <div>👉성적</div>
          <div>👉학업성적확인서(16학번 이후)</div>
          <div>👉SAVE</div>
        </GraduateContents>
        <InformationText>
          교양과목 정보 외의 인적사항 및 학점은 따로 저장하지 않습니다!
        </InformationText>
        <InformationText>
          현재 학기를 제외한 확실히 수료완료한 학기 기준으로 결과가 출력됩니다.
        </InformationText>
        <GraduateTable>
          <GraduateTableHeaderRow>
            <GraduateTd>이수 학점</GraduateTd>
            <GraduateTd>전공 학점</GraduateTd>
            <GraduateTd>교양 학점</GraduateTd>
            <GraduateTd>비교과 이수 학기</GraduateTd>
            <GraduateTd>마일리지</GraduateTd>
          </GraduateTableHeaderRow>
          <tr>
            <GraduateTd>totalCredit</GraduateTd>
            <GraduateTd>majorCredit</GraduateTd>
            <GraduateTd>kyCredit</GraduateTd>
            <GraduateTd>nonSubject</GraduateTd>
            <GraduateTd>mileage</GraduateTd>
          </tr>
        </GraduateTable>
        <GraduateResult>failure</GraduateResult>
      </GraduateSection>
    </ThemeProvider>
  );
};

export default Graduate;

const GraduateSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 65vh;
  margin: auto;
  margin-top: 5vh;
  margin-bottom: 5vh;
  border: dashed;
  max-width: 100%;
  border-color: rgba(0, 0, 0, 0.5);
  @media ${({ theme }) => theme.device.laptop} {
    width: 50%;
  }
`;

const GraduateTitle = styled.div`
  font-size: 1.6rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const GraduateButton = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const GraduateForm = styled.form`
  display: flex;
  width: 50%;
  height: 3vh;
  margin: 0 auto;
  background-color: #e5e5fdba;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const GraduateContents = styled.div`
  display: flex;
  background-color: #e5e5fdba;
  width: 90%;
  height: 15vh;
  margin: 5% auto;
  color: #2c2c2cdf;
  border-radius: 10px;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const InformationText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  margin-top: 2vh;
`;

const GraduateTable = styled.table`
  width: 90%;
  text-align: center;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 8vh;
  line-height: 30px;
`;

const GraduateTableHeaderRow = styled.tr`
  background-color: #bfdefc96;
`;

const GraduateTd = styled.td`
  border: 1px solid #a79d9d;
`;

const GraduateResult = styled.div`
  color: red;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`;
