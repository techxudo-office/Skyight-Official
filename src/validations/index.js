import * as Yup from "yup";
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";
import { useState } from "react";
export const ticketSchema = Yup.object({
  title: Yup.string().required("Please enter ticket title"),
  description: Yup.string().required("Please enter description"),
  status: Yup.string().required("Status Required"),
});

export const transactionSchema = Yup.object().shape({
  bank_name: Yup.string().required("Please enter bank name"),
  bank_number: Yup.string().required("Please enter bank number"),
  account_holder_name: Yup.string().required(
    "Please enter account holder name"
  ),
  document_number: Yup.string().required("Please enter account number"),
  payment_date: Yup.string().required("Please enter payment date"),
  amount: Yup.string().required("Please enter amount"),
  comment: Yup.string().required("Please enter comment"),
});

export const transactionInitialValues = {
  bank_name: "",
  bank_number: "",
  account_holder_name: "",
  document_number: "",
  payment_date: "",
  amount: "",
  comment: "",
};

export const userSchema = Yup.object({
  first_name: Yup.string().required("Please enter first name"),
  last_name: Yup.string().required("Please enter last name"),
  email: Yup.string().required("Please enter email address"),
  mobile_number: Yup.string().required("Please enter mobile number"),
  password: Yup.string().required("Please set a password"),
  role: Yup.string().required("Role is required")
});

export const userInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
  password: "",
  role: "",
}
export const travelerDetailScehma = Yup.object().shape({
  title: Yup.string().required("Please select title"),
  first_name: Yup.string().required("Please enter first name"),
  last_name: Yup.string().required("Please enter last name"),
  email: Yup.string().required("Please enter email"),
  telephone: Yup.mixed()
    .test(
      "is-valid-phone",
      "Please enter a valid telephone number",
      (value) => {
        console.log("phonenumber", typeof value)
        return (typeof value === "string" ||
          (typeof value === "object" && value !== null in value))
      } // Object with "number" key allowed
    )
    .required("Please enter phone number"),

  mobile: Yup.mixed()
    .test(
      "is-valid-mobile",
      "Please enter a valid mobile number",
      (value) => {
        console.log("phonenumber", typeof value)
        return (typeof value === "string" ||
          (typeof value === "object" && value !== null in value))
      }
    )
    .required("Please enter mobile number"),
  country: Yup.string().required("Please select country"),
  city: Yup.string().required("Please select city"),
  date_of_birth: Yup.string()
    .required("Please select date of birth")
    .test("age-validation", function (value) {
      const { passenger_type } = this.parent;
      if (!value || !passenger_type) return true; // Skip validation if missing

      const birthDate = new Date(value);
      const today = new Date();
      const dayAge = differenceInDays(today, birthDate)
      if (passenger_type === "ADT" && (dayAge < (12 * 365))) return this.createError({ message: "Invalid age! Adults must be 12 years or older." }); // Adult (>=12)
      if (passenger_type === "CHD" && (dayAge < 730 || dayAge > (12 * 365))) return this.createError({ message: "Invalid age! Children must be between 2 and 12 years." }); // Child (2-12)
      if (passenger_type === "INF" && (dayAge > 730)) return this.createError({ message: "Invalid age! Infants must be under 2 years." }); // Infant (<2)
      if (dayAge < 0) return this.createError({ message: "Invalid date of birth! " });
      return true;
    }),
  passenger_type: Yup.string().required("Please select passenger type"),
  gender: Yup.string().required("Please select gender"),
  passport_number: Yup.string()
    .required("Please enter a valid passport number")
    .max(10, "Passport number cannot exceed 10 characters") // Limits to 10 characters
    .min(6, "Passport number must be at least 6 characters") // Limits to 10 characters
    .matches(/^[A-Za-z0-9]+$/, "Passport number must contain only letters and numbers"),
  passport_expiry_date: Yup.string().required("Please select expiry date of passport"),
});