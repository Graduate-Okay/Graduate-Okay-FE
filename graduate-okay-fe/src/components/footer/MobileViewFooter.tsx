import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NoticeSVG from "../../assets/imgs/notice.svg";
import RecommendSVG from "../../assets/imgs/recommend.svg";
import mypage from "../../assets/imgs/mypage.svg";
import lookup from "../../assets/imgs/lookup.svg";

const MobileViewFooter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <FooterSection>
      <FooterDiv onClick={() => navigate("/notice")}>
        <img src={NoticeSVG} alt="공지사항" />
        <p>공지사항</p>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/kyRecommend")}>
        <img src={RecommendSVG} alt="교양추천" />
        <p>인기교양추천</p>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/graduate")}>
        <img src={lookup} alt="졸업요건조회" />
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
  height: 13vh;
  left: 0px;
  bottom: 0px;
  background-color: white;
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  > img {
    height: 40%;
  }
  > p {
    font-size: 1.2rem;
  }
`;
