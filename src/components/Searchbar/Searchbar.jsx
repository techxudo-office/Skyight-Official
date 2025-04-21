import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

const Searchbar = ({
  placeholder,
  data = [],
  onFilteredData,
  className,
  searchFields = [] // New prop: array of field names to search in
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Updated search function to only search specified fields
  const searchObjects = (data, searchTerm, fields) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return data;
    }

    const term = searchTerm.toString().toLowerCase();

    return data.filter(item => {
      // If no specific fields are provided, search all fields (backward compatible)
      const fieldsToSearch = fields.length > 0 ? fields : Object.keys(item);

      return fieldsToSearch.some(field => {
        const value = item[field];
        if (value === null || value === undefined) {
          return false;
        }
        return value.toString().toLowerCase().includes(term);
      });
    });
  };

  useEffect(() => {
    const filteredData = searchObjects(data, searchTerm, searchFields);
    onFilteredData && onFilteredData(filteredData);
  }, [searchTerm, data, searchFields]); // Added searchFields to dependencies

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className={`relative flex items-center border border-gray text-text rounded-md my-3 w-full ${className}`}>
      <input
        type="text"
        className="w-full p-4 outline-none rounded-md"
        placeholder={placeholder || `Search ${searchFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1)).join(", ").replaceAll("_", " ")}`}
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm && (
        <button
          className="absolute right-3 text-text hover:text-gray-700"
          onClick={handleClear}
        >
          <MdCancel size={20} />
        </button>
      )}
    </div>
  );
};

export default Searchbar;