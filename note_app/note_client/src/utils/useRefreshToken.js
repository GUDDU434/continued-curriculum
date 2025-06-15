/* eslint-disable */
import { useContext } from "react";
import { axiosInstance } from "./axiosInstance";

const useRefreshToken = () => {
  const { user } = useContext(AuthContext);
  const refresh = async () => {
    const refreshToken = user?.refreshToken || "";
    const response = await axiosInstance.post(
      "/api/v1/users/refresh",
      JSON.stringify({ refreshToken })
    );

    localStorage.setItem("accessToken", response?.data?.data);
    return response?.data?.data;
  };
  return refresh;
};

export default useRefreshToken;
