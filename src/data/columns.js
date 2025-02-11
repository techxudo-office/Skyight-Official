export const ticketColumns = [
    // { columnName: "No.", fieldName: "no.", type: "no." },
    { columnName: "Title", fieldName: "title", type: "text" },
    { columnName: "Description", fieldName: "description", type: "text" },
    { columnName: "Status", fieldName: "status", type: "status" },
    // { columnName: "Actions", fieldName: "actions", type: "actions" },
];

export const transactionColumns = [
    { columnName: "Bank", fieldName: "bank_name", type: "text" },
    { columnName: "Bank No.", fieldName: "bank_number", type: "text" },
    { columnName: "Payment Date", fieldName: "payment_date", type: "date" },
    { columnName: "Amount", fieldName: "amount", type: "text" },
    { columnName: "Status", fieldName: "status", type: "status" },
];

export const transactionViewColumns = [
    { columnName: "Transaction ID", fieldName: "id", type: "id" },
    { columnName: "Company", fieldName: "company_id", type: "id" },
    {
        columnName: "Document Number",
        fieldName: "document_number",
        type: "text",
    },
    { columnName: "Document", fieldName: "document_url", type: "img" },
    { columnName: "Comment", fieldName: "comment", type: "text" },
    { columnName: "Reasons", fieldName: "reasonIds", type: "text" },
    {
        columnName: "Account Holder Name",
        fieldName: "account_holder_name",
        type: "text",
    },
];


export const userColumns = [
    { columnName: "User Id", fieldName: "id", type: "id" },
    { columnName: "First Name", fieldName: "first_name", type: "text" },
    { columnName: "Last Name", fieldName: "last_name", type: "text" },
    { columnName: "Email", fieldName: "email", type: "email" },
    { columnName: "Mobile Number", fieldName: "mobile_number", type: "text" },
    { columnName: "Role", fieldName: "temp_role", type: "text" },
];