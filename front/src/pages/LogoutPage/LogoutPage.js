import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const LogoutPage = () => {
  const { logout, ready } = useContext(AuthContext);

  logout();
  
  if(!ready) {
    return <div>Loading...</div>
  }

  return <Redirect to="/" />;
};
