import React from "react";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <a href="/">
        <img className="header-img" src="imgs/logo.png" alt="헤더로고" />
      </a>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.header`
  display: flex;
  align-content: center;
  padding: 0.8rem;
  margin-top: 1.2rem;
  justify-content: center;
`;
