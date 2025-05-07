import React from "react";
import "./Login.css";

import { LoginForm, Navbar } from "../../components/components";

const Login = () => {
  return (
    <>
      <Navbar hideLinks={true} />
      <div className="animated-page h-screen w-full py-10   overflow-y-auto ">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
