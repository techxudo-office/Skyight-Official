import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const Select = ({
  id,
  label,
  name,
  options,
  value,
  placeholder,
  onChange,
  className,
  optionIcons,
}) => {
  const selectRef = useRef(null);
  const [selectStatus, setSelectStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectHandler = () => {
    setSelectStatus((prev) => !prev);
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const selectOptionHandler = (option) => {
    onChange(option);
    setSearchValue("");
    setSelectStatus(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectStatus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex flex-col w-full ${className}`} ref={selectRef}>
      <label htmlFor={id} className="text-md font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative rounded-lg flex items-center justify-between bg-slate-100">
        <div
          className="flex flex-1 items-center justify-between p-3 cursor-pointer bg-transparent text-text"
          onClick={selectHandler}
        >
          <span>{(value && value) || placeholder}</span>
          <FaChevronDown
            className={`text-gray-500 transform transition-transform ${
              selectStatus ? "rotate-180" : ""
            }`}
          />
        </div>

        {selectStatus && (
          <div className="absolute top-full left-0 z-10 w-full bg-white shadow-md mt-2 rounded-lg">
            <div className="p-2">
              <input
                type="text"
                className="w-full p-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                placeholder="Search..."
                value={searchValue}
                onChange={searchHandler}
              />
            </div>

            <ul className="max-h-40 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`p-3 flex items-center justify-start gap-3 text-sm cursor-pointer hover:bg-slate-100 ${
                    value?.value === option.value
                      ? "text-primary font-medium"
                      : "text-slate-500"
                  }`}
                  onClick={() => selectOptionHandler(option)}
                >
                  {optionIcons && <span>{optionIcons}</span>}
                  {option.label}
                </li>
              ))}
              {filteredOptions.length === 0 && (
                <li className="p-3 text-sm text-gray-500">No options found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
