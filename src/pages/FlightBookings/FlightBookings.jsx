// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   SecondaryButton,
//   ConfirmModal,
// } from "../../components/components";
// import {
//   getFlightBookings,
//   cancelFlightBooking,
//   refundRequest,
// } from "../../utils/api_handler";

// import { useNavigate } from "react-router-dom";
// import {
//   CardLayoutContainer,
//   CardLayoutHeader,
//   CardLayoutBody,
//   CardLayoutFooter,
// } from "../../components/CardLayout/CardLayout";
// import toast from "react-hot-toast";

// import { FaEye } from "react-icons/fa";
// import { HiReceiptRefund } from "react-icons/hi";
// import { MdCancel } from "react-icons/md";

// const FlightBookings = () => {
//   const navigate = useNavigate();

//   const [activeIndex, setActiveIndex] = useState(null);
//   const [bookingsData, setBookingsData] = useState([]);
//   const [modalStatus, setModalStatus] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const navigationHandler = () => {
//     navigate("/dashboard/search-flights");
//   };

//   const columnsData = [
//     { columnName: "No.", fieldName: "no.", type: "no." },
//     { columnName: "Origin", fieldName: "origin", type: "text" },
//     { columnName: "Destination", fieldName: "destination", type: "text" },
//     { columnName: "Total Fare", fieldName: "total_fare", type: "text" },
//     { columnName: "Currency", fieldName: "currency", type: "text" },
//     { columnName: "Status", fieldName: "booking_status", type: "status" },
//     { columnName: "Created At", fieldName: "created_at", type: "text" },
//     { columnName: "Actions", fieldName: "actions", type: "actions" },
//   ];

//   const viewColumns = [
//     { columnName: "Ref Id", fieldName: "booking_reference_id", type: "text" },
//     { columnName: "Updated At", fieldName: "updated_at", type: "text" },
//     {
//       columnName: "Transaction Identifier",
//       fieldName: "transaction_identifier",
//       type: "text",
//     },
//     {
//       columnName: "Ticketing Time Limit",
//       fieldName: "ticketing_time_limit",
//       type: "text",
//     },
//     { columnName: "Booking Id", fieldName: "id", type: "id" },
//     { columnName: "Rate", fieldName: "rate", type: "text" },
//     { columnName: "Percentage", fieldName: "persantage", type: "text" },
//     { columnName: "Cancel At", fieldName: "canceled_at", type: "text" },
//   ];

//   const actionsData = [
//     {
//       name: "View",
//       icon: <FaEye title="View" className="text-green-500" />,
//       handler: (index) => {
//         if (activeIndex === index) {
//           setActiveIndex(null);
//         } else setActiveIndex(index);
//       },
//     },
//     {
//       name: "Refund",
//       icon: <HiReceiptRefund title="Refund" className="text-blue-500" />,
//       handler: (_, item) => {
//         refundRequestHandler(item);
//       },
//     },
//     {
//       name: "Cancel",
//       icon: <MdCancel title="Cancel" className="text-red-500" />,
//       handler: (_, item) => {
//         cancelFlightBookingHandler(item);
//       },
//     },
//   ];

//   const gettingFlightBookings = async () => {
//     const response = await getFlightBookings();
//     if (response.status) {
//       setBookingsData(response.data);
//     }
//   };

//   const cancelFlightBookingHandler = async (flight) => {
//     console.log(flight);

//     const bookingId = {
//       booking_id: flight.booking_reference_id,
//     };

//     console.log(bookingId);

//     let response = await cancelFlightBooking(bookingId);
//     if (response.status) {
//       toast.success(response.message);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   const refundRequestHandler = async (flight) => {
//     console.log(flight);

//     const bookingId = {
//       booking_id: flight.booking_reference_id,
//     };

//     console.log(bookingId);

//     let response = await refundRequest(bookingId);
//     if (response.status) {
//       toast.success(response.message);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   const abortDeleteHandler = () => {
//     setModalStatus(false);
//     setDeleteId(null);
//   };

//   useEffect(() => {
//     gettingFlightBookings();
//   }, []);

//   return (
//     <>
//       <ConfirmModal
//         status={modalStatus}
//         abortDelete={abortDeleteHandler}
//         deleteHandler={cancelFlightBookingHandler}
//       />
//       <CardLayoutContainer removeBg={true}>
//         <CardLayoutHeader
//           removeBorder={true}
//           heading={"Flight Bookings"}
//           className="flex justify-between items-center"
//         >
//           <div className="relative">
//             <SecondaryButton
//               text={"Create New Booking"}
//               onClick={navigationHandler}
//             />
//           </div>
//         </CardLayoutHeader>
//         <CardLayoutBody removeBorder={true}>
//           <Table
//             columns={columnsData}
//             viewColumns={viewColumns}
//             data={bookingsData}
//             actions={actionsData}
//             activeIndex={activeIndex}
//           />
//         </CardLayoutBody>
//         <CardLayoutFooter></CardLayoutFooter>
//       </CardLayoutContainer>
//     </>
//   );
// };

// export default FlightBookings;

import React from "react";

const BookingDetails = () => {
  const bookingData = {
    data: {
      id: 8,
      created_at: "2024-12-26T18:21:44.065Z",
      created_by: 53,
      updated_at: null,
      updated_by: null,
      is_deleted: false,
      booking_reference_id: "W82BJ",
      Timelimit: "12/26/2024 10:06:42 PM",
      transaction_identifier: null,
      origin: "TBZ",
      destination: "THR",
      total_fare: "7000000",
      currency: null,
      booking_status: "pending",
      rate: "280",
      persantage: "10",
      canceled_by: null,
      is_canceled: false,
      canceled_at: null,
      flightSegments: [
        {
          id: 5,
          created_at: "2024-12-26T18:21:44.217Z",
          created_by: 53,
          updated_at: null,
          updated_by: null,
          is_deleted: false,
          flight_number: "9999",
          departure_airport: "THR - Tehran",
          departure_terminal: null,
          arrival_airport: "TBZ - Tabriz",
          arrival_terminal: null,
          departure_datetime: "2024-12-27 01:00",
          arrival_datetime: "2024-12-27 03:00",
          flight_duration: null,
          operating_airline: null,
          equipment: null,
        },
      ],
      passengers: [
        {
          id: 5,
          created_at: "2024-12-26T18:21:44.362Z",
          created_by: 53,
          updated_at: null,
          updated_by: null,
          is_deleted: false,
          given_name: "Testing",
          surname: "Ticket",
          email: "techxudosfdfffice@gmail.com",
          doc_type: "N",
          doc_id: "5430066131",
          doc_issue_country: "PAK",
          expire_date: "2028-11-26",
          nationality: "PAK",
          address: "KRJ, PAK",
          phone_number: "98 - 912 - 2569355",
          birth_date: "2004-11-26",
          passenger_type_code: "ADT",
        },
      ],
    },
  };

  const {
    booking_reference_id,
    Timelimit,
    origin,
    destination,
    total_fare,
    currency = "IRR", // Defaulting to IRR as currency is null in your example
    booking_status,
    rate,
    persantage,
    flightSegments,
    passengers,
  } = bookingData.data;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Details</h1>

      {/* Booking Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Booking Information
        </h2>
        <p className="text-gray-600">
          <span className="font-medium">Booking ID:</span>{" "}
          {booking_reference_id}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Time Limit:</span> {Timelimit}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`${
              booking_status === "pending"
                ? "text-yellow-500"
                : "text-green-500"
            } font-bold`}
          >
            {booking_status}
          </span>
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Total Fare:</span> {total_fare}{" "}
          {currency}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Discount:</span> {persantage}%
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Rate:</span> {rate}
        </p>
      </div>

      {/* Flight Segments */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Flight Information
        </h2>
        {flightSegments.map((segment) => (
          <div
            key={segment.id}
            className="border p-4 rounded-lg bg-gray-50 mb-4"
          >
            <p className="text-gray-600">
              <span className="font-medium">Flight Number:</span>{" "}
              {segment.flight_number}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Departure:</span>{" "}
              {segment.departure_airport} at {segment.departure_datetime}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Arrival:</span>{" "}
              {segment.arrival_airport} at {segment.arrival_datetime}
            </p>
          </div>
        ))}
      </div>

      {/* Passenger Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Passenger Information
        </h2>
        {passengers.map((passenger) => (
          <div
            key={passenger.id}
            className="border p-4 rounded-lg bg-gray-50 mb-4"
          >
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {passenger.given_name}{" "}
              {passenger.surname}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Document ID:</span>{" "}
              {passenger.doc_id} ({passenger.doc_type})
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Nationality:</span>{" "}
              {passenger.nationality}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {passenger.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span>{" "}
              {passenger.phone_number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDetails;
