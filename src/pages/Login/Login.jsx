import React from "react";
import "./Login.css";

import { LoginForm, Navbar } from "../../components/components";

const Login = () => {
  return (
    <>
      <Navbar hideLinks={true} />
      <div className="animated-page h-screen w-full flex items-center justify-center pt-16">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
