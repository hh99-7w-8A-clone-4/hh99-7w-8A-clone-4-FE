import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loginform from "../components/loginPage/LoginForm";

const Loginpage = () => {
  const loggedUserName = useSelector((state) => state.userSlice.userName);
  // const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <div>
      <Loginform />
      {loggedUserName !== null && <Navigate to="/main" replace={true} />}
    </div>
  );
};

export default Loginpage;
