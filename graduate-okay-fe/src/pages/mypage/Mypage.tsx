import React, { useEffect, useState, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import api from "../../apis/api";
import HandleSection from "../../components/HandleSection";
import Modal from "../../components/Modal";
import { ReactComponent as Profile } from "../../assets/imgs/profile/profile.svg";
import { ReactComponent as GraduationCap } from "../../assets/imgs/graduationCap.svg";
import { ReactComponent as Next } from "../../assets/imgs/arrow/next.svg";
import { ReactComponent as Withdrawal } from "../../assets/imgs/withdrawal.svg";

const Mypage: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [cookies, , removeCookie] = useCookies(["accessToken"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const handleOnModal = () => {
    setIsOpen(!isOpen);
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
              <p onClick={() => handleOnModal()}>회원탈퇴</p>
              <Next />
            </MypageRow>
          </OptionList>
        </MypageDiv>
        {isOpen ? (
          <Modal
            svg={Withdrawal}
            title="정말 탈퇴하시겠어요?"
            message="탈퇴 시, 계정과 활동 정보가 삭제되며 복구되지 않습니다."
            onModal={handleOnModal}
            handleFunction={handleWithdrawal}
          />
        ) : null}
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
  @media ${({ theme }) => theme.device.laptop} {
    width: 60%;
    height: 60%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 40%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
  @media ${({ theme }) => theme.device.laptop} {
    justify-content: center;
    align-items: center;
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
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.5rem;
    height: 4rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.7rem;
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
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
    height: 4rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2rem;
  }
`;

const MyDiv = styled.div`
  display: flex;
  width: 90%;
  height: 25%;
  justify-content: space-around;
  align-items: center;

  @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
    height: 35%;
    justify-content: center;
    > svg {
      order: -1;
    }
  }
`;

const UserText = styled.p`
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;

  @media ${({ theme }) => theme.device.laptop} {
    font-weight: normal;
    font-size: 1.8rem;
  }
`;

const Divide = styled.div`
  display: flex;
  width: 100%;
  height: 3%;
  background-color: #f4f3f8;
`;
