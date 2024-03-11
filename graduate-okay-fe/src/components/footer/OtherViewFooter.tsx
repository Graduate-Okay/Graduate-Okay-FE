import React from "react";
import styled from "styled-components";
import { ReactComponent as SchoolTitle } from "../../assets/imgs/logo/schoolTitle.svg";
import { ReactComponent as FullLogo } from "../../assets/imgs/logo/FullLogo.svg";

const OtherViewFooter: React.FC = () => {
  const handleOnClick = (args: string) => {
    if (args === "univ") {
      window.open("https://hs.ac.kr/intro.html");
    } else if (args === "graduate") {
      window.open("https://github.com/Graduate-Okay");
    }
  };
  return (
    <FooterSection>
      <FooterTitle>바로가기</FooterTitle>
      <FooterContent>
        <SchoolTitle onClick={() => handleOnClick("univ")} />
        <FullLogo onClick={() => handleOnClick("graduate")} />
      </FooterContent>
    </FooterSection>
  );
};

export default OtherViewFooter;

const FooterSection = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15vh;
  font-size: 1.1rem;
  align-items: center;
`;

const FooterTitle = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
`;

const FooterContent = styled.div`
  display: flex;
  width: 80%;
  height: 60%;
  justify-content: space-around;
  align-items: center;

  > svg {
    height: 70%;
    cursor: pointer;
  }
`;
