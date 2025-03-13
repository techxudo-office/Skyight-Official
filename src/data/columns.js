
// import { IoIosAirplane } from "react-icons/io";
// import dayjs from "dayjs";
// import { FaEye } from "react-icons/fa";

// export const bookingColumns = [
//     {
//         name: "ROUTE",
//         selector: (row) => (
//             <span className="flex items-center justify-center gap-2 text-sm text-text">
//                 {row.origin}
//                 <div className="flex items-center gap-1">
//                     <span className="h-0.5 w-3 bg-primary"></span>
//                     <IoIosAirplane className="text-lg text-primary" />
//                     <span className="h-0.5 w-3 bg-primary"></span>
//                 </div>
//                 {row.destination}
//             </span>
//         ),
//         sortable: false,
//         center: "yes",
//     },
//     {
//         name: "PNR",
//         selector: (row) => row.booking_reference_id,
//         sortable: false,
//         minwidth: "150px",
//         center: "yes",
//     },
//     {
//         name: "TOTAL FARE",
//         selector: (row) => row.total_fare,
//         sortable: false,
//         center: "yes",
//     },
//     {
//         name: "STATUS",
//         selector: (row) => row.booking_status,
//         sortable: false,
//         center: "yes",
//     },
//     {
//         name: "CREATED AT",
//         selector: (row) => dayjs(row.created_at).format("MMM-DD-YYYY"),
//         sortable: false,
//         center: "yes",
//     },
//     {
//         name: "",
//         selector: (row) => (
//             <span
//                 className="text-lg cursor-pointer"
//                 onClick={() => {
//                     navigate("/dashboard/booking-details", {
//                         state: row,
//                     });
//                 }}>
//                 <FaEye title="View" className="text-green-500 " />
//             </span>
//         ),
//         sortable: false,
//         center: "yes",
//     },
// ];

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

export const roleColumns = [
    {
        name: "ROLE",
        selector: (row) => row.role,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
    {
        name: "ROLE ID",
        selector: (row) => row.id,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
    {
        name: "STATUS",
        selector: (row) => row.status,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
];

export const userColumns = [
    {
        name: "USER ID",
        selector: (row) => row.id,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
    {
        name: "FIRST NAME",
        selector: (row) => row.first_name,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
    {
        name: "LAST NAME",
        selector: (row) => row.last_name,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
    {
        name: "EMAIL",
        selector: (row) => row.email,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
    {
        name: "ROLE",
        selector: (row) => row.temp_role,
        sortable: false,
        minwidth: "150px",
        center: "yes",
    },
];