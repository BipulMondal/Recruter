import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

const PrivateRoutes = () => {
  const auth = reactLocalStorage.get("loginStatus");
  // const {loginStatus} = useUserApi()

  // console.log("LOGINS" , loginStatus);
  return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
