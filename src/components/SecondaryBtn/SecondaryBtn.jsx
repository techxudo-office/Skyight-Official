import React from "react";

const SecondaryButton = ({
  text,
  onClick,
  type = "button",
  className = "",
  styles,
  disabled,
  id,
}) => {
  return (
    <>
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-3 px-6 ${disabled?'bg-lightgray text-text':'bg-blue-100 hover:text-secondary text-primary'}   font-semibold rounded-md transition duration-300 ease-in-out transform focus:outline-none ${className}`}
        style={styles}
      >
        {text}
      </button>
    </>
  );
};

export default SecondaryButton;
