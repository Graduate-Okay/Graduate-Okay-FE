import axios from "axios";

const BASE_URL = process.env.REACT_APP_RECRUIT_BASE_URL;
const SERVICE_KEY = process.env.REACT_APP_RECRUIT_API_KEY;

export const fetchRecruitListQuery = async (
  page: number,
  region: string,
  hireType: string,
  recrutSe: string,
  acbgCondLst: string,
  ncsCdLst: string,
  title: string
) => {
  const response = await axios.get(
    `${BASE_URL}/list?serviceKey=${SERVICE_KEY}&pageNo=${page}&workRgnLst=${region}&hireTypeLst=${hireType}&recrutSe=${recrutSe}&acbgCondLst=${acbgCondLst}&ncsCdLst=${ncsCdLst}&recrutPbancTtl=${title}`
  );

  return response.data;
};
