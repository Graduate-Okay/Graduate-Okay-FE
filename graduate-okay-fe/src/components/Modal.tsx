import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

interface ModalProps {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  message: string;
  onModal: () => void;
  handleFunction?: () => void;
}

interface ButtonProps {
  bgColor: string;
}

const Modal: React.FC<ModalProps> = ({
  svg: SvgComponent,
  title,
  message,
  onModal,
  handleFunction,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalBackground>
        <ModalContent>
          <SvgWrap>
            <SvgComponent width={35} height={35} />
          </SvgWrap>
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ButtonArea>
            <Button bgColor="#cacaca" onClick={onModal}>
              취소하기
            </Button>
            <Button bgColor="#ff7272" onClick={handleFunction}>
              탈퇴하기
            </Button>
          </ButtonArea>
        </ModalContent>
      </ModalBackground>
    </ThemeProvider>
  );
};

export default Modal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 50%;
  height: 30%;
  align-items: center;
  justify-content: space-around;
`;

const SvgWrap = styled.div`
  display: flex;
  background-color: #ff7272;
  width: 30%;
  height: 25%;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 3px;
`;

const ButtonArea = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  border: none;
  color: white;
  background-color: ${(props) => props.bgColor};
  width: 40%;
  height: 50%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
`;

const Title = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 1.6rem;
`;

const Message = styled.p`
  display: flex;
  font-size: 1.3rem;
  width: 75%;
  word-break: keep-all;
  text-align: center;
`;
