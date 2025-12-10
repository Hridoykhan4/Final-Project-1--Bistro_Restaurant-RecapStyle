import axios from "axios";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthValue from "./useAuthValue";
const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});
const useAxiosSecure = () => {
  const { user, logOut } = useAuthValue();
  const nav = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user) {
          const token = localStorage.getItem("token");
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (config) => config,
      async (error) => {
        console.log(error.status , error?.response?.status);
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          await logOut();
          nav("/login");
          Swal.fire({
            title: error?.response?.data?.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.request.eject(responseInterceptor);
    };
  }, [user, nav, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
