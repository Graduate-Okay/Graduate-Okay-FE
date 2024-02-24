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

// export const withdrawalMyDataQuery = async () => {
//     try {
//         const response = await axios.delete(`${api.user}/withdrawal`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (response?.data.status === "OK") {
//           alert("정상적으로 회원탈퇴되었습니다.");
//           localStorage.clear();
//         }
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           alert(error?.response?.data?.message);
//         }
//       }
// }
