import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {

   const { user, userLogOut } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
     const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }

       return config;
     });

     const resInterceptors = axiosSecure.interceptors.response.use(
       (response) => {
         return response;
       },
       (error) => {
        
         if (error?.status === 401 || error?.status === 403) {
          //  userLogOut().then(() => {
          //    navigate("/login");
           //  });
           toast.error("Forbidden Access!");
         }

         return Promise.reject(error);
       }
     );

     return () => {
       axiosSecure.interceptors.request.eject(reqInterceptors);
       axiosSecure.interceptors.response.eject(resInterceptors);
     };
   }, [user, navigate, userLogOut]);

  return axiosSecure;
};

export default useAxiosSecure;
