/* eslint-disable */

import { useContext, useEffect } from "react";
import { axiosInstance } from "./axiosInstance";
import { AuthContext } from "../auth/AuthContext";

const useAxiosPrivate = () => {
  // const refresh = useRefreshToken();
  const { user, refresh } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${user?.accessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosInstance;
};

export default useAxiosPrivate;
