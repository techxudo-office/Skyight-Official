import React from "react";

const Textarea = ({ id, name, label, value, placeholder, onChange, onBlur }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="border-none outline-none resize bg-[#F1F5F9] text-text rounded-sm mt-3 p-3 resize-none focus:outline-[#666] "
        rows="2" // Adjust as needed
      ></textarea>
    </div>
  );
};

export default Textarea;
