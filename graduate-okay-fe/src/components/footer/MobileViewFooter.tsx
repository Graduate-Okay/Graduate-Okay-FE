import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Home } from "../../assets/imgs/home.svg";
import { ReactComponent as Mypage } from "../../assets/imgs/mypage.svg";
import { ReactComponent as Graduate } from "../../assets/imgs/graduate.svg";
import { ReactComponent as Recommend } from "../../assets/imgs/recommend.svg";
import theme from "../../constants/theme";

const MobileViewFooter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getFillValue = (path: string) => {
    return location.pathname === path ? theme.colors.selectFooter : "#cacaca";
  };

  return (
    <FooterSection>
      <FooterDiv onClick={() => navigate("/")}>
        <Home fill={getFillValue("/")} />
        <Text color={getFillValue("/")}>홈</Text>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/kyRecommend")}>
        <Recommend fill={getFillValue("/kyRecommend")} />
        <Text color={getFillValue("/kyRecommend")}>인기교양추천</Text>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/graduate")}>
        <Graduate fill={getFillValue("/graduate")} />
        <Text color={getFillValue("/graduate")}>졸업요건조회</Text>
      </FooterDiv>
      <FooterDiv onClick={() => navigate("/mypage")}>
        <Mypage fill={getFillValue("/mypage")} />
        <Text color={getFillValue("/mypage")}>마이페이지</Text>
      </FooterDiv>
    </FooterSection>
  );
};

export default MobileViewFooter;

const FooterSection = styled.footer`
  display: flex;
  position: fixed;
  width: 100%;
  height: 10.5vh;
  left: 0px;
  bottom: 0px;
  background-color: white;
  border-top: 1px solid #d9d9d9;
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > svg {
    flex-grow: 1;
  }
`;

const Text = styled.p<{ color: string }>`
  display: flex;
  font-size: 1.2rem;
  color: ${(props) => props.color};
  flex-grow: 0.5;
`;
