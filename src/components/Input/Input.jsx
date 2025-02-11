import React, { useEffect, useRef, useState } from "react";

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
  disabled,
  isSelected
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef()
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (isSelected) {
      inputRef.current.focus()
      if (type === "date" || type === "datetime-local") {
        inputRef.current.showPicker();
      }
    }
  }, [isSelected])

  return (
    <>
      <div className={`flex flex-col w-full ${className}`}>

        <div className={`rounded-lg relative flex items-center justify-between ${disabled ? 'bg-slate-100' : 'bg-white'}  `}>
          <label htmlFor={id} className="text-base rounded-md font-medium  mb-2 absolute -top-3 left-3 bg-white px-1 text-text">
            {label}
          </label>
          <div className="flex flex-1 w-full items-center gap-1 bg-transparent border-gray border rounded-md py-5 px-3 cursor-default text-text">
            <input
              ref={inputRef}
              className={`w-full bg-transparent  outline-none  `}
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
            <span className="cursor-default" onClick={showPasswordHandler}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          ) : type === "date" ? (
            <span className="cursor-default">
              {/* <MdDateRange /> */}
            </span>
          ) : type === "datetime-local" ? (
            <span className="cursor-default">
              {/* <MdDateRange /> */}
            </span>
          ) : (
            ""
          )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Input;
