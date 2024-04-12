import axios from "axios";

export const recruitListQuery = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_RECRUIT_BASE_URL}/list`,
    {
      params: {
        serviceKey: `${process.env.REACT_APP_RECRUIT_API_KEY}`,
      },
    }
  );
  return response.data;
};
