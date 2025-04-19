import React from "react";
import '../Login/Login.css';

import { ResetPasswordform } from "../../components/components";

const ResetPassword = () => {
    return (
        <>
            <div className="animated-page h-screen w-full flex items-center justify-center">
                <ResetPasswordform />
            </div>
        </>
    );
};

export default ResetPassword;
