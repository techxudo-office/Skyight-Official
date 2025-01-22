import React from "react";
import '../Login/Login.css';

import { ForgetPassForm } from "../../components/components";

const ForgetPassword = () => {
  return (
    <>
      <div className="animated-page h-screen w-full flex items-center justify-center">
        <ForgetPassForm />
      </div>
    </>
  );
};

export default ForgetPassword;
