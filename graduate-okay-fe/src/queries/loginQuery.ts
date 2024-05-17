import axios from "axios";
import api from "../apis/api";
import { Cookies } from "react-cookie";

export const submitLoginQuery = async (email: string, password: string) => {
  const cookies = new Cookies();

  await axios
    .post(`${api.user}/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      localStorage.clear();
      localStorage.setItem("id", response?.data.data.id);
      localStorage.setItem("nickname", response?.data.data.nickname);
      localStorage.setItem(
        "refreshToken",
        response?.data.data.tokenInfo.refreshToken
      );
      cookies.set("accessToken", response?.data.data.tokenInfo.accessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
      });
    });
};
