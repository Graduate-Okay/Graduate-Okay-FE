import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

interface ModalProps {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  message: string;
  onModal: () => void;
  handleFunction?: () => void;
  closeMessage?: string;
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
  closeMessage,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalBackground>
        <ModalContent>
          <SvgComponent width={80} height={80} />
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ButtonArea>
            <Button bgColor="#cacaca" onClick={onModal}>
              {closeMessage}
            </Button>
            {handleFunction ? (
              <Button bgColor="#ff7272" onClick={handleFunction}>
                탈퇴하기
              </Button>
            ) : null}
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

  > svg {
    @media ${({ theme }) => theme.device.laptop} {
      width: 30%;
      height: 30%;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 40%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 30%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 25%;
  }
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
  font-weight: bold;

  @media ${({ theme }) => theme.device.largeLaptop} {
    width: 30%;
  }
`;

const Title = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 1.6rem;
  height: 15%;
  align-items: center;

  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
  }
`;

const Message = styled.p`
  display: flex;
  font-size: 1.3rem;
  width: 85%;
  word-break: keep-all;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.4rem;
    width: 75%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 1.5rem;
  }
`;
