import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";



const PrivateRoute = ({ children }) => {
 const {user , loading} = useAuth();
  const location = useLocation();

  if (loading) {
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
