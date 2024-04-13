import axios from "axios";

const BASE_URL = process.env.REACT_APP_RECRUIT_BASE_URL;
const SERVICE_KEY = process.env.REACT_APP_RECRUIT_API_KEY;

export const fetchRecruitListQuery = async (page: number) => {
  const response = await axios.get(
    `${BASE_URL}/list?serviceKey=${SERVICE_KEY}&pageNo=${page}`
  );

  return response.data;
};
