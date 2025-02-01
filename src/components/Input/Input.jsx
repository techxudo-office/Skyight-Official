import React, { useState } from "react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const Input = ({
  id,
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  autoComplete,
  onKeyPressHandler,
  className,
  disabled
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={`flex flex-col w-full ${className}`}>
       
        <div className={`rounded-lg flex items-center justify-between ${disabled?'bg-slate-100':'bg-white'}  `}>
        <label htmlFor={id} className="text-md rounded-md font-medium  mb-2 absolute -top-3 left-3 bg-white px-1 text-gray">
          {label}
        </label>
          <input
            className={`flex flex-1 w-full bg-transparent p-3 outline-none border-gray border rounded-md py-5 px-3 cursor-pointer text-gray`}
            id={id}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyPress={onKeyPressHandler}
            autoComplete={autoComplete}
          />
          {type === "password" ? (
            <span className="cursor-pointer" onClick={showPasswordHandler}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          ) : type === "date" ? (
            <span className="cursor-pointer">
              {/* <MdDateRange /> */}
            </span>
          ) : type === "datetime-local" ? (
            <span className="cursor-pointer">
              {/* <MdDateRange /> */}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
