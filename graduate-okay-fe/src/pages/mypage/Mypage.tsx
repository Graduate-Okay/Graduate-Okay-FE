import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import HandleSection from "../../components/HandleSection";
import Modal from "../../components/Modal";
import { ReactComponent as Profile } from "../../assets/imgs/profile/profile.svg";
import { ReactComponent as GraduationCap } from "../../assets/imgs/graduationCap.svg";
import { ReactComponent as Withdrawal } from "../../assets/imgs/withdrawal.svg";
import { getMypageDataQuery, withdrawal } from "../../queries/mypageQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import MyPageRow from "./MyPageRow";
import Toast from "../../components/Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mypage: React.FC = () => {
  const [, , removeCookie] = useCookies(["accessToken"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: myData } = useQuery({
    queryKey: ["getMypageData"],
    queryFn: () => getMypageDataQuery(),
  });

  const { mutate: withdrawalMutation } = useMutation({
    mutationFn: () => withdrawal(),
    onSuccess: () => {
      toast.success("정상적으로 회원탈퇴되었습니다.");
      removeCookie("accessToken");
      localStorage.clear();
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    },
  });

  const handleOnModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toast />
      <HandleSection
        prevBtn={false}
        title="마이페이지"
        closeBtn={false}
        color="#a489f0"
      />
      <MypageSection>
        <MyDiv>
          <UserInfo>
            <GraduationCap width={50} height={50} />
            <UserText>안녕하세요!</UserText>
            <UserText>'{myData?.nickname}'님</UserText>
          </UserInfo>
          <Profile />
        </MyDiv>
        <Divide />
        <MypageDiv>
          <OptionList>
            <MyPageRow handleOnModal={() => handleOnModal()} />
          </OptionList>
        </MypageDiv>
        {isOpen ? (
          <Modal
            svg={Withdrawal}
            title="정말 탈퇴하시겠어요?"
            message="탈퇴 시, 계정과 활동 정보가 삭제되며 복구되지 않습니다."
            onModal={handleOnModal}
            handleFunction={withdrawalMutation}
            closeMessage="취소하기"
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
  min-height: 50rem;
  align-items: center;
`;

const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 67%;
  justify-content: center;

  @media ${({ theme }) => theme.device.laptop} {
    width: 60%;
    height: 60%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 30%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
  justify-content: space-around;

  @media ${({ theme }) => theme.device.laptop} {
    justify-content: space-around;
    align-items: center;
    height: 43%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    height: 40%;
  }
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
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
    > svg {
      order: -1;
    }
  }
`;

const UserText = styled.p`
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;

  @media ${({ theme }) => theme.device.laptop} {
    font-weight: normal;
    font-size: 1.7rem;
  }
`;

const Divide = styled.div`
  display: flex;
  width: 100%;
  height: 3%;
  background-color: #f4f3f8;
`;
