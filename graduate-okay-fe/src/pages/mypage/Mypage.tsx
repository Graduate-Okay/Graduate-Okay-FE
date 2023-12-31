import React, { useEffect, useState, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import MypageSVG from "../../assets/imgs/mypage.svg";
import api from "../../apis/api";

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
        <MypageDiv>
          <UserInfo>
            <UserImg>
              <img src={MypageSVG} alt="프로필" />
            </UserImg>
            <UserDiv>
              <UserNickname>안녕하세요, {nickname}님</UserNickname>
            </UserDiv>
          </UserInfo>
          <OptionList>
            <MypageHeader>
              <p>나의 졸업요건 조회</p>
            </MypageHeader>
            <MypageRow>
              <p onClick={() => navigate("/graduate")}>졸업결과 확인하기</p>
            </MypageRow>
            <MypageHeader>
              <p>나의 정보</p>
            </MypageHeader>
            <MypageRow>
              <p onClick={() => navigate("/mypage/modifyInfo")}>
                정보 수정하기
              </p>
            </MypageRow>
            <MypageRow>
              <p>리뷰 관리</p>
            </MypageRow>

            <MypageHeader>
              <p>기타</p>
            </MypageHeader>
            <MypageRow>
              <p onClick={() => navigate("/notice")}>공지사항</p>
            </MypageRow>
            <MypageRow>
              <p onClick={() => handleWithdrawal()}>회원탈퇴</p>
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
  align-items: center;
`;

const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 100%;
  border: 1px solid #b2bec3;
  border-radius: 2rem;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    height: 80%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
    height: 80%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
`;

const UserImg = styled.div`
  display: flex;
  width: 30%;
  height: 80%;
  justify-content: center;
  margin: auto;

  > img {
    border: 1px solid black;
    border-radius: 50%;
  }
`;

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  height: 100%;
`;

const UserNickname = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.4rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.6rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
  }
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
  align-items: center;
  font-size: 1.2rem;

  > p {
    margin-left: 0.5rem;
    cursor: pointer;
    &:hover {
      color: gray;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
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
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.6rem;
  }
`;
