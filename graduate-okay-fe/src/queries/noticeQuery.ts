import axios from "axios";
import api from "../apis/api";

export const noticeQuery = async (page: number, size: number) => {
  const { data } = await axios.get(`${api.notice}?page=${page}&size=${size}`);
  return data;
};
