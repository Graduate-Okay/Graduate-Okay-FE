import axios from "axios";
import api from "../apis/api";

export const postPasswordResetLink = async (email: string) => {
  await axios.post(`${api.user}/password-email`, {
    email: email,
  });
};

export const patchPassword = async (
  email: string,
  key: string,
  password: string
) => {
  await axios.patch(`${api.user}/password`, {
    email: email,
    key: key,
    password: password,
  });
};
