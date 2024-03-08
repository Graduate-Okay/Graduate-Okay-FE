import axios from "axios";
import api from "../apis/api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getMypageDataQuery = async () => {
  const accessToken = cookies.get("accessToken");
  const response = await axios.get(`${api.user}/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
};

export const withdrawal = async () => {
  const accessToken = cookies.get("accessToken");

  return axios.delete(`${api.user}/withdrawal`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const modifyInfoQuery = async (payload: { [key: string]: string }) => {
  const accessToken = cookies.get("accessToken");
  await axios.patch(`${api.user}/info`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
