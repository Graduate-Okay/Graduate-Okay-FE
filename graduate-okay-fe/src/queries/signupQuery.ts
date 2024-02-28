import axios, { AxiosError } from "axios";
import api from "../apis/api";

export const postAuthNumberToEmail = async (email: string) => {
  try {
    await axios.post(`${api.user}/email`, {
      email: email,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error.response?.data?.message);
    }
  }
};

export const submitAuthNumberQuery = async (authNumber: string) => {
  const response = await axios.get(`${api.user}/email`, {
    params: {
      number: authNumber,
    },
  });
  return response;
};

export const submitPasswordQuery = async (email: string, password: string) => {
  await axios.post(`${api.user}/join`, {
    email: email,
    password: password,
  });
};
