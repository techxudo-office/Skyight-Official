import * as Yup from "yup";

// Create Transaction - CreateTransaction.jsx
export const validationSchema = Yup.object().shape({
    bank_name: Yup.string().required("Please enter bank name"),
    bank_number: Yup.string().required("Please enter bank number"),
    account_holder_name: Yup.string().required(
        "Please enter account holder name"
    ),
    document_number: Yup.string().required("Please enter document number"),
    payment_date: Yup.string().required("Please enter payment date"),
    amount: Yup.string().required("Please enter amount"),
    comment: Yup.string().required("Please enter comment"),
});

export const initialValues = {
    bank_name: "",
    bank_number: "",
    account_holder_name: "",
    document_number: "",
    payment_date: "",
    amount: "",
    comment: "",
};

// Create Ticket - CreateTicket.jsx
export const ticketSchema = Yup.object({
    title: Yup.string().required("Please enter ticket title"),
    description: Yup.string().required("Please enter description"),
    // status: Yup.string().required("Status Required"),
});


export const registrationValidationSchema = Yup.object({
    company_name: Yup.string().required("Please enter your company name"),
    first_name: Yup.string().required("Please enter your first name"),
    last_name: Yup.string().required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    phone_number: Yup.string().required("Please enter your phone number"),
    mobile_number: Yup.string().required("Please enter your mobile number"),
    password: Yup.string().required("Please enter your password"),
    city: Yup.string().required("Please enter your city"),
    country: Yup.object().required("Please enter your country"),
    address: Yup.string().required("Please enter your address"),
    website: Yup.string().required("Please enter your website"),
  });
