import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({
  id,
  className,
  name,
  label,
  value,
  placeholder,
  disabled,
  onChange,
}) => {
  // Convert object value to a full phone number string
  const getPhoneNumber = (val) => {
    if (typeof val === "object" && val !== null) {
      return [val.country_code, val.area_code, val.number].filter(Boolean).join("");
    }
    return (typeof val ==="string"? Number(String(val).replace(/\D/g, "")) : 
    parseInt(String(val).replace(/\D/g, "") ))
               
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label
        htmlFor={id}
        className="px-1 mb-2 text-base font-medium bg-white rounded-md text-text"
      >
        {label}
      </label>

      <PhoneInput
        id={id}
        country={"us"} // Default country
        value={getPhoneNumber(value)}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(phone) => {
            if (typeof phone !== "string") return; // Prevent errors
          const cleanedNumber = (phone).replace(/\D/g, ""); // Remove non-numeric characters

          // Set values in structured format
          const formattedValue = {
            country_code: cleanedNumber.slice(0, 3) || "", // First 3 digits as country code
            area_code: cleanedNumber.slice(3, 6) || "", // Next 3 digits as area code
            number: cleanedNumber.slice(6) || "", // Remaining digits as number
          };

          onChange({
            target: { name, value: formattedValue },
          });
        }}
        inputClass="custom-phone-input"
      />
    </div>
  );
};

export default PhoneNumberInput;
