import axios, { AxiosError } from "axios";
import api from "../apis/api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getMypageDataQuery = async () => {
  const accessToken = cookies.get("accessToken");
  try {
    const response = await axios.get(`${api.user}/info`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};

export const withdrawal = async () => {
  const accessToken = cookies.get("accessToken");

  return axios.delete(`${api.user}/withdrawal`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
