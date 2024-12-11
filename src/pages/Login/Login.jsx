import React from "react";
import './Login.css';

import { LoginForm } from "../../components/components";

const Login = () => {
  return (
    <>
      <div className="login-page h-screen w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
