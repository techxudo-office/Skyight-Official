import * as Yup from "yup";
import { differenceInYears } from "date-fns";
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
  telephone: Yup.number().required("Please enter phone number"),
  mobile: Yup.number().required("Phone number is required"),
  country: Yup.string().required("Please select country"),
  city: Yup.string().required("Please select city"),
  date_of_birth: Yup.string()
    .required("Please select date of birth")
    .test("age-validation", "Invalid age for selected passenger type", function (value) {
      const { passenger_type } = this.parent;
      if (!value || !passenger_type) return true; // Skip validation if missing

      const birthDate = new Date(value);
      const today = new Date();
      const age = differenceInYears(today, birthDate); // Calculate age

      if (passenger_type === "ADT" && (age < 12)) return false; // Adult (>=12)
      if (passenger_type === "CHD" && (age < 2 || age > 12)) return false; // Child (2-12)
      if (passenger_type === "INF" && (age >= 2 )) return false; // Infant (<2)

      return true;
    }),
  passenger_type: Yup.string().required("Please select passenger type"),
  gender: Yup.string().required("Please select gender"),
  passport_number: Yup.string().required("Please enter valid passport number"),
  passport_expiry_date: Yup.string().required("Please select expiry date of passport"),
});