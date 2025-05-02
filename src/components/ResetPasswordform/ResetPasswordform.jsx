import React, { useState } from "react";
import {
    CardLayoutContainer,
    CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import { Button, Spinner, Input } from "../../components/components";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../_core/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordform = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const loading = useSelector((state) => state.auth.isLoadingForgotPassword);

    const validatePassword = (password) => {
        // Check if password contains at least 8 letters (a-z, A-Z)
        const letterRegex = /[a-zA-Z]/g;
        const letterMatches = password.match(letterRegex) || [];
        return letterMatches.length >= 8;
    };

    const resetPasswordHandler = () => {
        if (!validatePassword(password)) {
            toast.error("Invalid password format");
            return;
        }
        dispatch(resetPassword({ password }));
    };

    return (
        <>
            <CardLayoutContainer className="hide-scrollbar max-w-[900px] h-[500px] m-auto p-0 shadow-3xl overflow-y-scroll">
                <CardLayoutBody removeBorder padding="p-0" className="flex">
                    <div className="flex items-center justify-center flex-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 395 274"
                            width={395}
                            height={200}>
                            <g filter="url(#password_svg__a)">
                                <path
                                    fill="#fff"
                                    fillRule="evenodd"
                                    d="M127.39 236.71a5.75 5.75 0 0 0-6.14 1.5 38.7 38.7 0 0 1-28.87 12.87 38.7 38.7 0 0 1-28.86-12.87 5.75 5.75 0 0 0-6.14-1.5 25.87 25.87 0 1 1 0-48.88c2.15.75 4.61.2 6.14-1.5a38.7 38.7 0 0 1 28.86-12.87 38.7 38.7 0 0 1 28.87 12.88 5.75 5.75 0 0 0 6.14 1.49 25.87 25.87 0 1 1 0 48.88"
                                    clipRule="evenodd"
                                />
                            </g>
                            <rect
                                width="141.93"
                                height="93.99"
                                x="93.02"
                                y="117.95"
                                fill="url(#password_svg__b)"
                                rx="12.62"
                            />
                            <path
                                stroke="url(#password_svg__c)"
                                strokeWidth="13.25"
                                d="M194.22 118.14V52.5a30.42 30.42 0 1 0-60.84 0v65.64"
                            />
                            <path
                                fill="url(#password_svg__d)"
                                fillRule="evenodd"
                                d="M166.78 168.7a13.88 13.88 0 1 0-6.23 0l-6.98 21.8h20.19z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="#000"
                                fillRule="evenodd"
                                d="M166.78 168.7a13.88 13.88 0 1 0-6.23 0l-6.98 21.8h20.19z"
                                clipRule="evenodd"
                            />
                            <g filter="url(#password_svg__e)">
                                <rect
                                    width="186.71"
                                    height="42.89"
                                    x="198.35"
                                    y="147.6"
                                    fill="#fff"
                                    rx="21.45"
                                />
                            </g>
                            <path
                                stroke="#000"
                                strokeWidth="1.26"
                                d="M223.27 156.43v25.86m-9.14-22.07 9.14 9.14 9.14 9.15"
                            />
                            <path
                                stroke="#000"
                                strokeWidth="1.26"
                                d="m232.41 160.22-9.14 9.14-9.14 9.15m-3.79-9.15h25.86m21.76-12.93v25.86m-9.14-22.07 9.14 9.14 9.15 9.15m-.01-18.29-9.14 9.14-9.14 9.15m-3.79-9.15h25.86m21.77-12.93v25.86m-9.15-22.07 9.15 9.14 9.14 9.15m0-18.29-9.14 9.14-9.15 9.15m-3.78-9.15h25.86m21.76-12.93v25.86m-9.15-22.07 9.15 9.14 9.14 9.15"
                            />
                            <path
                                stroke="#000"
                                strokeWidth="1.26"
                                d="m336.5 160.22-9.15 9.14-9.14 9.15m-3.79-9.15h25.86m21.76-12.93v25.86m-9.14-22.07 9.14 9.14 9.14 9.15"
                            />
                            <path
                                stroke="#000"
                                strokeWidth="1.26"
                                d="m371.19 160.22-9.15 9.14-9.14 9.15m-3.79-9.15h25.86"
                            />
                            <circle
                                cx="258.04"
                                cy="95.64"
                                r="40.69"
                                fill="url(#password_svg__f)"
                                transform="rotate(7.76 258.04 95.64)"
                            />
                            <circle
                                cx="258.04"
                                cy="95.64"
                                r="33.43"
                                stroke="#000"
                                strokeWidth="0.63"
                                transform="rotate(7.76 258.04 95.64)"
                            />
                            <path
                                stroke="#000"
                                strokeWidth="0.63"
                                d="m251.1 101.9.05-.31.47-3.47a6.9 6.9 0 0 1 2.28-4.54c1.31-1.14 3.21-1.97 5.84-2.66 2.64-.72 4.34-1.31 5.42-1.97.53-.32.9-.65 1.14-1 .25-.36.4-.76.46-1.23.17-1.25-.35-2.4-1.4-3.31a8.84 8.84 0 0 0-4.58-1.85c-2.53-.35-4.63.08-6.22 1.16-1.6 1.08-2.72 2.83-3.25 5.21l-.07.31-.3-.07-8.6-1.95-.3-.07.06-.3c.93-4.6 3.12-8.1 6.67-10.38 3.55-2.27 7.93-3.07 13.16-2.35l-.05.3c8.77 1.08 15.31 7.54 14.2 14.4zm0 0 .32.04 8.16 1.12.31.04.05-.31.19-1.42c.15-1.1.47-1.8 1.15-2.35.71-.57 1.84-1.01 3.66-1.48 3.5-.88 6.18-2.02 8.08-3.58a9.14 9.14 0 0 0 3.37-6.1zm-2.3 12.53-.05.31.32.05 9.69 1.32.31.04.05-.31 1.25-9.23.05-.3-.32-.05-9.7-1.32-.3-.04-.05.3z"
                            />
                            <path
                                fill="#000"
                                d="M92.66 57.64a11 11 0 0 0 10.77 10.76h.23-.23a11 11 0 0 0-10.76 10.64v.36-.36a11 11 0 0 0-10.8-10.64h-.2.19a11 11 0 0 0 10.8-10.76v-.24zM259.82.24A11 11 0 0 0 270.58 11h.24-.24a11 11 0 0 0-10.76 10.64V22v-.36A11 11 0 0 0 249.02 11h-.2.2A11 11 0 0 0 259.81.24V0v.17V0v.23Zm3.78 218.25a11 11 0 0 0 10.76 10.76h.24-.17.17-.24a11 11 0 0 0-10.75 10.64v.36-.36a11 11 0 0 0-10.8-10.64h-.2.13-.13.19a11 11 0 0 0 10.8-10.76v-.24.17-.16z"
                            />
                            <defs>
                                <linearGradient
                                    id="password_svg__b"
                                    x1="103.68"
                                    x2="234.94"
                                    y1="198.71"
                                    y2="164.95"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#9076C9" />
                                    <stop offset="0.77" stopColor="#CBD0E3" />
                                    <stop offset={1} stopColor="#E1E7FF" />
                                </linearGradient>
                                <linearGradient
                                    id="password_svg__c"
                                    x1="93.33"
                                    x2="214.44"
                                    y1="-31.54"
                                    y2="152.33"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#E6E5F7" />
                                    <stop offset="0.34" stopColor="#F5EBF4" />
                                    <stop offset="0.57" stopColor="#FBCBD7" />
                                    <stop offset="0.79" stopColor="#BEC3E0" />
                                    <stop offset={1} stopColor="#E1DFED" />
                                </linearGradient>
                                <linearGradient
                                    id="password_svg__d"
                                    x1="163.37"
                                    x2="163.37"
                                    y1="156.49"
                                    y2="186.05"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F55F30" />
                                    <stop offset="0.63" stopColor="#FF9A9A" />
                                    <stop offset={1} stopColor="#FFC93D" />
                                </linearGradient>
                                <linearGradient
                                    id="password_svg__f"
                                    x1="217.35"
                                    x2="294.63"
                                    y1="170.7"
                                    y2="66.94"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F55F30" />
                                    <stop offset={1} stopColor="#FFC93D" />
                                </linearGradient>
                                <filter
                                    id="password_svg__a"
                                    width="183.59"
                                    height="122.44"
                                    x="0.59"
                                    y="151.05"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="userSpaceOnUse">
                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="11.21" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                    <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_151_2950"
                                    />
                                    <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_151_2950"
                                        result="shape"
                                    />
                                </filter>
                                <filter
                                    id="password_svg__e"
                                    width="205.63"
                                    height="61.82"
                                    x="188.89"
                                    y="138.14"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="userSpaceOnUse">
                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="4.73" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                    <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_151_2950"
                                    />
                                    <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_151_2950"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    <div className="flex-1 p-16">
                        <h3 className="mb-5 text-4xl font-extrabold text-center">
                            Reset Your Password
                        </h3>
                        <h3 className="mx-2 mb-10 text-md text-slate-500 text-start">
                            Enter your password to reset your account password. We will send a
                            mail to your mailbox.
                        </h3>

                        <div className="flex flex-col gap-5 px-2">
                            <div className="relative">
                                <Input
                                    placeholder="abc.xcv@gmail.com"
                                    id="password"
                                    name="password"
                                    label="Password*"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-end px-1 mt-[-10px]">
                                <Link
                                    to={"/login"}
                                    className="transition-all text-end text-primary hover:text-secondary">
                                    Back to Login?
                                </Link>
                            </div>

                            <div className="flex items-center justify-center mt-3">
                                <Button
                                    text={loading ? <Spinner /> : "Forget Password"}
                                    onClick={resetPasswordHandler}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                </CardLayoutBody>
            </CardLayoutContainer>
        </>
    );
};

export default ResetPasswordform;
