import React from "react";

const SecondaryButton = ({
  text,
  onClick,
  type = "button",
  className = "",
  styles,
  disabled,
  id,
  icon
}) => {
  return (
    <>
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-2 px-5 ${disabled?'bg-lightgray cursor-not-allowed text-text':'bg-blue-100 hover:text-secondary text-primary'} flex items-center gap-2  font-semibold rounded-md transition duration-300 ease-in-out transform focus:outline-none ${className} border border-primary`}
        style={styles}
      >
        {icon}
        {text}
      </button>
    </>
  );
};

export default SecondaryButton;
