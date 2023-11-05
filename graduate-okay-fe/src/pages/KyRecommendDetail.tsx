import React, { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { useParams } from "react-router-dom";
import { ISubjectDetail } from "../interfaces";
import axios from "axios";
import api from "../apis/api";
import { useCookies } from "react-cookie";

const KyRecommendDetail: React.FC = () => {
  const [detail, setDetail] = useState<ISubjectDetail>();
  const params = useParams();
  const paramsId = params.id;
  const [cookies] = useCookies(["accessToken"]);

  const getDetail = useCallback(async () => {
    try {
      const response = await axios.get(`${api.subject}/${paramsId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      setDetail(response?.data.data);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [paramsId, cookies.accessToken]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  console.log(detail);
  return (
    <ThemeProvider theme={theme}>
      <DetailSection>
        <DetailIsRequired>
          {detail?.isRequired ? null : <p>교양필수</p>}
        </DetailIsRequired>
        <DetailTitle>
          {detail?.name} ({detail?.subName})
        </DetailTitle>
        <DetailInfo>
          <p>핵심역량 : {detail?.kyCoreType || "X"},</p>
          <p>인재상 : {detail?.kyModalType || "X"},</p>
          <p>{detail?.credit}학점</p>
        </DetailInfo>
      </DetailSection>
    </ThemeProvider>
  );
};

export default KyRecommendDetail;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 65vh;
  margin: 2vh auto;
  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
`;

const DetailIsRequired = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #7978cd;
  > p {
    display: flex;
    width: 23%;
    height: 3vh;
    border: 1px solid #7978cd;
    border-radius: 2rem;
    align-items: center;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 70%;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 50%;
  }
`;

const DetailTitle = styled.div`
  display: flex;
  height: 8vh;
  align-items: center;
  font-size: 1.7rem;
`;

const DetailInfo = styled.div`
  display: flex;
  color: #a4b0be;
  height: 3.3vh;
  font-size: 1.1rem;
  border-bottom: 1px solid #a4b0be;
  > p {
    margin-right: 0.5rem;
  }
`;
