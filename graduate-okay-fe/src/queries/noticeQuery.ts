import axios, { AxiosError } from "axios";
import api from "../apis/api";

export const noticeQuery = async (page: number, size: number) => {
  const { data } = await axios.get(`${api.notice}?page=${page}&size=${size}`);
  return data;
};

export const noticeDetailQuery = async (id: string | undefined) => {
  try {
    const { data } = await axios.get(`${api.notice}/${id}`);
    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error.response?.data?.message);
    }
  }
};
