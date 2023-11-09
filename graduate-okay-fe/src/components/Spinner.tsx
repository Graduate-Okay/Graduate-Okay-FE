import React from "react";
import styled from "styled-components";
import SpinnerSVG from "../assets/imgs/spinner.svg";

const Spinner: React.FC = () => {
  return (
    <SpinnerSection>
      <h3>잠시만 기다려주세요.</h3>
      <img src={SpinnerSVG} alt="스피너" />
    </SpinnerSection>
  );
};

export default Spinner;

const SpinnerSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  > h3 {
    font-size: 1.6rem;
  }
`;
