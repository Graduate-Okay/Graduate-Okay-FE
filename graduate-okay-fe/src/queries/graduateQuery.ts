import axios from "axios";
import api from "../apis/api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const postGraduateFile = async (fd: FormData) => {
  const accessToken = cookies.get("accessToken");
  const response = await axios.post(`${api.graduate}`, fd, {
    headers: {
      "Content-Type": `multipart/form-data`,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
};
