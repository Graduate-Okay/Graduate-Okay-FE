import axios, { AxiosError } from "axios";
import api from "../apis/api";
import { Cookies } from "react-cookie";
import { ISubjectReviewDataList } from "../interfaces";

const cookies = new Cookies();

export const kyRecommendDetailQuery = async (paramsId: string | undefined) => {
  const accessToken = cookies.get("accessToken");

  const { data } = await axios.get(`${api.subject}/${paramsId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data.data;
};

export const kyRecommendReviewList = async (list: any) => {
  const accessToken = cookies.get("accessToken");
  try {
    if (list) {
      const reviewPromises = list.map(
        async (review: ISubjectReviewDataList) => {
          const reviewId = review.reviewId;
          try {
            const response = await axios.get(`${api.review}/${reviewId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            return response.data.data;
          } catch (error) {
            if (error instanceof AxiosError) {
              console.error(error.response?.data?.message);
            }
            return null;
          }
        }
      );

      const reviews = await Promise.all(reviewPromises);
      return reviews;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data?.message);
    }
  }
};

export const kyRecommend = async (page: number, searchWord: string) => {
  const response = await axios.get(
    `${api.subject}?page=${page}&searchWord=${searchWord}&size=10`
  );
  return response.data.data;
};
