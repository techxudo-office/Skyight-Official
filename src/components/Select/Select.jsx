import React, { useState, useRef, useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

const Select = ({
  id,
  label,
  disabled,
  name,
  options,
  value,
  placeholder,
  onChange,
  className,
  optionIcons,
  selectIcon,
  isSelected
}) => {
  const selectRef = useRef(null);
  const [selectStatus, setSelectStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectHandler = () => {
    if(disabled){
      return
    }else{
      setSelectStatus((prev) => !prev);
    }
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
    <div className={`flex flex-col w-full   ${className}`} ref={selectRef}>


      <div className={`relative rounded-md border border-gray flex items-center justify-between px-2 ${disabled && 'bg-slate-100'}`}>
       <label htmlFor={id} className={` text-md bg-white font-medium  mb-2 absolute -top-3 left-3  px-1 roounded-md text-gray`}>
          {label}
        </label>
        <div
          className="flex w-full items-center justify-between py-5 px-3 cursor-pointer bg-transparent text-text"
          onClick={selectHandler}
        >

          <span className="text-gray flex gap-3 items-center"><span className="text-primary">{selectIcon}</span>{(value && value) || placeholder}</span>
          <FaCaretDown
            className={`text-gray transform transition-transform ${selectStatus || isSelected ? "rotate-180" : ""
              }`}
          />
        </div>

        {(selectStatus || isSelected ) && (
          <div className="absolute top-full left-0 z-10 w-full bg-white shadow-md border-[1px] border-gray mt-2 rounded-md">
            <div className="p-2">
              <input
                type="text"
                className="w-full p-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                placeholder="Search..."
                value={searchValue}
                onChange={searchHandler}
              />
            </div>

            <ul className="max-h-40 overflow-y-auto ">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`p-3 flex items-center justify-start gap-3 text-sm cursor-pointer hover:bg-slate-100 ${value?.value === option.value
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
