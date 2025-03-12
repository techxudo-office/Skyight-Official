import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const Searchbar = ({ placeholder = "Search", value, onChange,className }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className={`relative flex items-center border border-gray text-text rounded-md my-3  w-full ${className}`}>
      <input
        type="text"
        className="w-full p-4 outline-none rounded-md"
        placeholder={placeholder}
        value={searchTerm}
      onChange={handleInputChange}
      />
        <button
          className="absolute right-3 text-text hover:text-gray-700"
          onClick={handleClear}
        >
          <MdCancel size={20} />
        </button>
      
    </div>
  );
};

export default Searchbar;
