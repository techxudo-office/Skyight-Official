import React from "react";
import { Spinner } from "../components";

const SecondaryButton = ({
  text,
  onClick = () => {},
  type = "button",
  className = "",
  styles,
  disabled,
  loading = false,
  id,
  icon,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-fit py-2 px-5 ${
        disabled || loading
          ? "bg-lightgray cursor-not-allowed text-text"
          : "bg-blue-100 hover:text-secondary text-primary"
      } flex items-center justify-center gap-2 font-semibold rounded-md transition duration-300 ease-in-out transform focus:outline-none ${className} border border-primary`}
      style={styles}
    >
      {loading ? (
        <>
          <Spinner />
          {text && <span>{text}</span>}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </button>
  );
};

export default SecondaryButton;
