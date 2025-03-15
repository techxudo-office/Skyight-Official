import React, { useRef, useState,useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { MdEdit } from "react-icons/md";

const PhoneNumberInput = ({
  id,
  name,
  label,
  value,
  profile,
  onChange,
  disabled,
  className,
  isSelected,
  onEditClick,
  placeholder,
  autoComplete,
  setEditingField,
  onKeyPressHandler,
}) => {
  const [phone, setPhone] = useState(value||"");
  const inputRef = useRef();

  const handlePhoneChange = (value, country) => {
    setPhone(value);
    console.log("value",value)
    const phoneNumber = parsePhoneNumberFromString(`+${value}`);

    let parsedData = {
      area_code: '',
      country_code: '',
      number: '',
    };

    if (phoneNumber) {
      // Extract country code
      const countryCode = phoneNumber.countryCallingCode;

      // Extract national number (without country code)
      const nationalNumber = phoneNumber.nationalNumber;

      // Extract area code and subscriber number
      const areaCode = phoneNumber.extensions?.[0]?.ext || nationalNumber.slice(0, 3); // Fallback to first 3 digits
      const number = nationalNumber.slice(areaCode.length); // Subscriber number

      parsedData = {
        area_code: areaCode,
        country_code: countryCode,
        number: number,
      };
    }

    // Pass the parsed data to the parent component
    if (onChange) {
      onChange(parsedData);
    }
  };

  useEffect(() => {
    if (isSelected) {
      inputRef.current.focus();
    }
  }, [isSelected]);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div
        className={`relative flex items-center rounded-lg border border-gray text-text ${
          disabled ? "bg-slate-100" : "bg-white"
        }`}
      >
        <label
          htmlFor={id}
          className="absolute px-1 mb-2 text-base font-medium bg-white rounded-md -top-3 left-3 text-text"
        >
          {label}
        </label>
        <PhoneInput
          ref={inputRef}
          country={"us"} // Default country
          value={value||phone}
          onChange={handlePhoneChange}
          inputProps={{
            className:"w-full px-3 pt-3 bg-transparent outline-none text-base flex item-center pl-10",
            id: id,
            name: name,
            disabled: disabled,
            placeholder: placeholder,
            autoComplete: autoComplete,
            onBlur: () => setEditingField && setEditingField(null),
          }}
          inputClass="w-full  px-3 bg-transparent outline-none"
          containerClass="w-full h-12 "
          
          
        />
        {disabled && profile && (
          <span
            className="absolute text-xl  cursor-pointer right-3 text-primary"
            onClick={onEditClick}
          >
            <MdEdit className="text-xl text-black" />
          </span>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberInput;