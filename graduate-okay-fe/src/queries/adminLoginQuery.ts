import axios from "axios";
import api from "../apis/api";

export const adminLoginQuery = async (
  loginValue: string,
  passwordValue: string
) => {
  const { data } = await axios.post(`${api.admin}/login`, {
    loginId: loginValue,
    password: passwordValue,
  });

  return data;
};
