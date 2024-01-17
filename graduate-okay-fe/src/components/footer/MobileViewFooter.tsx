import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import recommend from "../../assets/imgs/recommend.svg";
import mypage from "../../assets/imgs/mypage.svg";
import graduate from "../../assets/imgs/graduate.svg";
import home from "../../assets/imgs/home.svg";

const MobileViewFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FooterSection>
      <FooterDiv onClick={() => navigate("/")}>
        <img src={home} alt="홈" />
        <p>홈</p>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/kyRecommend")}>
        <img src={recommend} alt="인기교양추천" />
        <p>인기교양추천</p>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/graduate")}>
        <img src={graduate} alt="졸업요건조회" />
        <p>졸업요건조회</p>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/mypage")}>
        <img src={mypage} alt="마이페이지" />
        <p>마이페이지</p>
      </FooterDiv>
    </FooterSection>
  );
};

export default MobileViewFooter;

const FooterSection = styled.footer`
  display: flex;
  position: fixed;
  width: 100%;
  height: 11vh;
  left: 0px;
  bottom: 0px;
  background-color: white;
  border-top: 1px solid #cacaca;
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  justify-content: space-around;
  align-items: center;
  margin-top: auto;

  > img {
    height: 35%;
  }

  > p {
    font-size: 1.2rem;
    color: #cacaca;
  }
`;
