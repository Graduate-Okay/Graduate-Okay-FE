import axios from "axios";
import api from "../apis/api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const deleteReview = async (id: number) => {
  await axios.delete(`${api.review}/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies}`,
    },
  });
};

export const postReview = async (
  id: number,
  reviewTitle: string,
  reviewContent: string,
  selectedValue: number
) => {
  const accessToken = cookies.get("accessToken");

  await axios.post(
    `${api.review}`,
    {
      subjectId: id,
      title: reviewTitle,
      content: reviewContent,
      starScore: selectedValue,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
