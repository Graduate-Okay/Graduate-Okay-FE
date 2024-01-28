import React, { useEffect, useState, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import api from "../../apis/api";
import HandleSection from "../../components/HandleSection";
import { ReactComponent as Profile } from "../../assets/imgs/profile/profile.svg";
import { ReactComponent as GraduationCap } from "../../assets/imgs/graduationCap.svg";
import { ReactComponent as Next } from "../../assets/imgs/arrow/next.svg";

const Mypage: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [cookies, , removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const getInfo = useCallback(async () => {
    try {
      const response = await axios.get(`${api.user}/info`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      setNickname(response?.data.data.nickname);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.message);
      }
    }
  }, [cookies.accessToken]);

  const handleWithdrawal = async () => {
    const withdrawal = window.confirm("정말 탈퇴하시겠습니까?");
    if (!withdrawal) {
      return;
    }
    try {
      const response = await axios.delete(`${api.user}/withdrawal`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      if (response?.data.status === "OK") {
        alert("정상적으로 회원탈퇴되었습니다.");
        removeCookie("accessToken");
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <ThemeProvider theme={theme}>
      <MypageSection>
        <HandleSection
          prevBtn={false}
          title="마이페이지"
          closeBtn={false}
          color="#a489f0"
        />
        <MyDiv>
          <UserInfo>
            <GraduationCap width={50} height={50} />
            <UserText>안녕하세요!</UserText>
            <UserText>'{nickname}'님</UserText>
          </UserInfo>
          <Profile />
        </MyDiv>
        <Divide />
        <MypageDiv>
          <OptionList>
            <MypageHeader>
              <p>졸업요건 조회</p>
            </MypageHeader>
            <MypageRow>
              <p onClick={() => navigate("/graduate")}>졸업결과 확인하기</p>
              <Next />
            </MypageRow>
            <MypageHeader>
              <p>나의 정보</p>
            </MypageHeader>
            <MypageRow>
              <p onClick={() => navigate("/mypage/modifyInfo")}>
                정보 수정하기
              </p>
              <Next />
            </MypageRow>
            <MypageRow>
              <p>리뷰 관리</p>
              <Next />
            </MypageRow>
            <MypageHeader>
              <p>기타</p>
            </MypageHeader>
            <MypageRow>
              <p onClick={() => navigate("/notice")}>공지사항</p>
              <Next />
            </MypageRow>
            <MypageRow>
              <p onClick={() => handleWithdrawal()}>회원탈퇴</p>
              <Next />
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
  flex-direction: column;
  width: 100%;
  height: 75vh;
  align-items: center;
`;

const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 67%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
`;

const MypageRow = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: gray;
  }

  > p {
    margin-left: 0.5rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
`;

const MypageHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: bold;
  justify-contents: center;
  height: 3rem;
  margin-top: 2rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.6rem;
  }
`;

const MyDiv = styled.div`
  display: flex;
  width: 90%;
  height: 25%;
  justify-content: space-around;
  align-items: center;
`;

const UserText = styled.p`
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;
`;

const Divide = styled.div`
  display: flex;
  width: 100%;
  height: 3%;
  background-color: #f4f3f8;
`;
