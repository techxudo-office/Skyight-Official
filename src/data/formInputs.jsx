import { FaPlaneDeparture, FaUser } from "react-icons/fa";
import { iranianCities } from "./iranianCities"; 
import { countries } from "./countriesData";
const titleOptions = [
    { label: "Mr", value: "MR" },
    { label: "Mrs", value: "MS" },
  ];
  

  
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
export const travelersDetailsInputs= [
    {
      type: 'select',
      id: "title",
      label: "Title",
      name: "title",
      options: titleOptions,
      placeholder: "Select Title",
      optionIcons: <FaPlaneDeparture />
    },
    {
      type: "text",
      id: "first_name",
      label: "First Name",
      name: "first_name",
      placeholder: "Enter First Name",
    },
    {
      type: "text",
      id: "last_name",
      label: "Last Name",
      name: "last_name",
      placeholder: "Enter Last Name",
    },
    {
      type: "email",
      id: "email",
      label: "Email",
      name: "email",
      placeholder: "Enter Email",
    },
    {
      type: "Number",
      id: "telephone",
      label: "Phone Number",
      name: "telephone",
      placeholder: "Enter Phone Number",
    },
    {
      type: "Number",
      id: "mobile",
      label: "Mobile Number",
      name: "mobile",
      placeholder: "Enter Mobile Number",
    },
    {
      type: "select",
      id: "country",
      label: "Country",
      name: "country",
      options: countries,
      placeholder: "Select Country",
      optionIcons: <FaPlaneDeparture />,
    },
    {
      type: "select",
      id: "city",
      label: "City",
      name: "city",
      options: iranianCities,
      placeholder: "Select City",
      optionIcons: <FaPlaneDeparture />,
    },
    {
      type: "date",
      id: "date_of_birth",
      label: "Date of Birth",
      name: "date_of_birth",
    },
    {
      type: "select",
      id: "gender",
      label: "Gender",
      name: "gender",
      options: genderOptions,
      placeholder: "Select Gender",
      optionIcons: <FaUser />,
    },
    {
      type: "text",
      id: "passport_number",
      label: "Passport Number",
      name: "passport_number",
      placeholder: "Enter Passport Number",
    },
    {
      type: "date",
      id: "passport_expiry_date",
      label: "Passport Exp Date",
      name: "passport_expiry_date",
    },


  ]