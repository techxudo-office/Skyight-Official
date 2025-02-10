import * as Yup from "yup";

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