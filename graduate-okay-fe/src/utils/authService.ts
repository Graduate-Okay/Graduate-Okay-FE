import { jwtDecode } from "jwt-decode";
import axios from "axios";
import api from "../apis/api";

const authService = {
  isAccessTokenExpired: (accessToken: string) => {
    try {
      const decodedToken = jwtDecode(accessToken);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000;

        return decodedToken.exp < currentTime;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking access token expiration:", error);
      return true;
    }
  },

  refreshAccessToken: async (refreshToken: any) => {
    try {
      const response = await axios.post(`${api.user}/token`, {
        refreshToken: refreshToken,
      });

      if (response && response.data) {
        return response?.data;
      } else {
        console.error("Failed to refresh access token:", response);
        return null;
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  },
};
export default authService;
