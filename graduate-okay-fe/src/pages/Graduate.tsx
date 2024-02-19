import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import HandleSection from "../components/HandleSection";
import Modal from "../components/Modal";
import GraduateImage from "../assets/imgs/background/graduate.svg";
import axios from "axios";
import api from "../apis/api";
import { useCookies } from "react-cookie";
import { IGraduate } from "../interfaces";
import { ReactComponent as File } from "../assets/imgs/file.svg";
import { ReactComponent as Caution } from "../assets/imgs/caution.svg";
import { ReactComponent as Folder } from "../assets/imgs/folder.svg";
import { ReactComponent as Fail } from "../assets/imgs/x.svg";

interface ImageProps {
  backgroundImage: string;
}

const Graduate: React.FC = () => {
  const [cookies] = useCookies(["accessToken"]);
  const [isActive, setActive] = useState<boolean>(false);
  const [graduateData, setGraduateData] = useState<IGraduate>();
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDragStart = () => setActive(true);
  const handleDragLeave = () => setActive(false);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setActive(true);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleOnModal = () => {
    setIsOpen(!isOpen);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file: File) => {
    setActive(true);
    const fd = new FormData();
    fd.append("file", file);

    axios
      .post(`${api.graduate}`, fd, {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((response) => {
        setGraduateData(response.data.data);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setIsOpen(true);
        setActive(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <GraduateSection>
        <HandleSection
          prevBtn={false}
          title="졸업요건조회"
          closeBtn={false}
          color="#a489f0"
        />
        <Explain>학업성적확인서를 올려 졸업 요건을 조회해보세요.</Explain>
        <Label
          onDragEnter={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Image backgroundImage={GraduateImage}>
            <Input
              type="file"
              accept=".pdf"
              id="file"
              name="file"
              onChange={handleFileInputChange}
            />
            <FileButton>
              <File width={30} height={30} />
              <p>학업성적확인서 PDF 업로드</p>
            </FileButton>
          </Image>
        </Label>
        <Result>
          <Caution width={30} height={30} />
          <ResultExplain>
            <p>교양과목 정보 외의 인적사항 및 학점은 따로 저장되지 않습니다.</p>
            <p>현재 학기를 제외한 수료완료 학기 기준으로 결과가 출력됩니다.</p>
          </ResultExplain>
          <GraduateTable>
            <GraduateTableHeaderRow>
              <GraduateTd>이수학점</GraduateTd>
              <GraduateTd>전공학점</GraduateTd>
              <GraduateTd>교양학점</GraduateTd>
              <GraduateTd>비교과 이수 학기</GraduateTd>
              <GraduateTd>마일리지</GraduateTd>
            </GraduateTableHeaderRow>
            <tr>
              <GraduateTd>{graduateData?.totalCredit || "0"}</GraduateTd>
              <GraduateTd>{graduateData?.majorCredit || "0"}</GraduateTd>
              <GraduateTd>{graduateData?.kyCredit || "0"}</GraduateTd>
              <GraduateTd>{graduateData?.nonSubject || "0"}</GraduateTd>
              <GraduateTd>{graduateData?.mileage || "0"}</GraduateTd>
            </tr>
          </GraduateTable>
          {!isActive ? (
            <Default>
              <Folder width={35} height={35} />
              <PDFText>학업성적확인서 PDF 다운로드 경로</PDFText>
              <PDFInfo>
                portal.hs.ac.kr {`>`} 한신종합정보 {`>`} 인트라넷 {`>`}{" "}
                학부생서비스 {`>`} 성적 {`>`} 학업성적확인서
              </PDFInfo>
            </Default>
          ) : graduateData?.isGraduateOk ? (
            <Show>
              <p>당신은 졸업이</p>
              <IsGraduate>가능</IsGraduate>
              <p>합니다!</p>
            </Show>
          ) : (
            <Show>
              <p>당신은 졸업이</p>
              <IsGraduate>불가능</IsGraduate>
              <p>합니다!</p>
            </Show>
          )}
        </Result>
        {isOpen ? (
          <Modal
            svg={Fail}
            message={message}
            onModal={handleOnModal}
            closeMessage={"닫기"}
          />
        ) : null}
      </GraduateSection>
    </ThemeProvider>
  );
};

export default Graduate;

const GraduateSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75vh;
  margin: 0 auto;
`;

const Explain = styled.div`
  display: flex;
  font-size: 1.1rem;
  justify-content: center;
  text-align: center;
  height: 5%;
`;

const Image = styled.div<ImageProps>`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  justify-content: center;
  align-items: center;
`;

const FileButton = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #a489f0;
  width: 80%;
  height: 50%;
  border-radius: 40px;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
  color: white;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  > svg {
    height: 15%;
    align-items: center;
    justify-content: center;
  }
`;

const ResultExplain = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  height: 10%;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.4rem;
    height: 13%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.6rem;
    height: 15%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.8rem;
    height: 15%;
  }
`;

const GraduateTable = styled.table`
  width: 90%;
  margin-top: 1.3rem;
  margin-bottom: 3vh;
  text-align: center;
  line-height: 30px;
`;

const GraduateTableHeaderRow = styled.tr`
  background-color: #ece5ff;
`;

const GraduateTd = styled.td`
  border: 1px solid #a79d9d;
`;

const Show = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  background-color: #a489f0;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2.4rem;
`;

const IsGraduate = styled.div`
  display: flex;
  width: 20%;
  height: 35%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  color: #a489f0;
  margin-left: 10px;
  margin-right: 10px;
`;

const Label = styled.label`
  display: flex;
  width: 100%;
  height: 30%;
`;

const Input = styled.input`
  display: none;
`;

const Default = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 35%;
  background-color: #fafafa;
  justify-content: space-around;
  align-items: center;

  > svg {
    @media ${({ theme }) => theme.device.tablet} {
      width: 40px;
      height: 40px;
    }
  }
`;

const PDFText = styled.p`
  display: flex;
  font-size: 1.5rem;
  color: #885eff;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.6rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2rem;
  }
`;

const PDFInfo = styled.p`
  display: flex;
  width: 70%;
  height: 30%;
  font-size: 1.4rem;
  line-height: 1.5;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.5rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.6rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.7rem;
  }
`;
