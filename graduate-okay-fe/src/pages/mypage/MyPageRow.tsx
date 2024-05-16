import styled, { ThemeProvider } from "styled-components";
import theme from "../../constants/theme";
import { ReactComponent as Next } from "../../assets/imgs/arrow/next.svg";
import { myPage } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

interface props {
  handleOnModal: () => void;
}

const MyPageRow: React.FC<props> = ({ handleOnModal }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      {myPage.map((item) => {
        return (
          <>
            <MypageHeader key={item.headerText}>
              <p>{item.headerText}</p>
            </MypageHeader>
            {item.sub.map((item) => {
              return (
                <MypageRow
                  key={item.text}
                  onClick={() => {
                    item.link ? navigate(item.link) : handleOnModal();
                  }}
                >
                  <p>{item.text}</p>
                  <Next />
                </MypageRow>
              );
            })}
          </>
        );
      })}
    </ThemeProvider>
  );
};

export default MyPageRow;

const MypageHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: bold;
  justify-contents: center;
  height: 3rem;
  margin-top: 2rem;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.6rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.8rem;
    height: 4rem;
  }
  @media ${({ theme }) => theme.device.largeLaptop} {
    font-size: 2rem;
  }
`;

const MypageRow = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: gray;
  }
  > p {
    margin-left: 0.5rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.5rem;
    height: 4rem;
  }
`;
