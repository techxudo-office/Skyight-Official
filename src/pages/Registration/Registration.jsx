import React from "react";
import '../Login/Login.css';

import { RegistrationForm } from "../../components/components";

const Registration = () => {
  return (
    <>
      <div className="animated-page h-screen w-full flex items-center justify-center">
        <RegistrationForm />
      </div>
    </>
  );
};

export default Registration;
