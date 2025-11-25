import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";



const PrivateRoute = ({ children }) => {

  const axiosInstance = useAxios();


  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosInstance.get("/profile", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const location = useLocation();

  if (isLoading) {
    return <div className="">
      <span className=""></span>
    </div>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
