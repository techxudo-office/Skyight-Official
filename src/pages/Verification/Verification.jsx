import React from "react";
import '../Login/Login.css';

import { VerificationForm } from "../../components/components";

const Verification = () => {
  return (
    <>
      <div className="animated-page h-screen w-full flex items-center justify-center">
        <VerificationForm />
      </div>
    </>
  );
};

export default Verification;
