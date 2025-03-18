import React, { useEffect, useRef } from "react";

const Dropdown = ({ status, changeStatus, options, className, right }) => {
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       changeStatus(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <>
      {status && (
        <div
          ref={dropdownRef}
          className={`absolute inline-block text-left  ${className}`}>
          <div
            className="absolute z-10 min-w-40   top-4 p-2 border-[1px] border-primary bg-white shadow-lg"
            style={{ right: right ? `${right}px` : "-40px" }}>
            <ul>
              {options &&
                options.map((option, index) => {
                  return (
                    <li
                      key={index}
                      onClick={option.handler && option.handler}
                      className="flex items-center px-4 py-2 text-base text-gray-700 transition-all cursor-pointer text-text hover:bg-bluebg hover:text-primary">
                      {option && <span className="me-3">{option.icon}</span>}
                      <span>{option.name}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
