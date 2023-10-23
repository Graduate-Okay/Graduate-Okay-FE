import React from "react";
import styled from "styled-components";

const OtherViewFooter: React.FC = () => {
  return (
    <FooterSection>
      <Content>
        <p>바로가기</p>
        <a
          href="https://www.hs.ac.kr/intro.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          한신대학교 홈페이지
        </a>
        <a
          href="https://hsctis.hs.ac.kr/app-nexa/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          한신대학교 종합정보시스템
        </a>
      </Content>
      <Content>
        <p>졸업가능?</p>
        <p>https://github.com/Graduate-Okay</p>
      </Content>
    </FooterSection>
  );
};

export default OtherViewFooter;

const FooterSection = styled.footer`
  display: flex;
  width: 100%;
  height: 20vh;
  background-color: #8f8de7;
  font-size: 1.1rem;
`;

const Content = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.4rem;
  }
`;
