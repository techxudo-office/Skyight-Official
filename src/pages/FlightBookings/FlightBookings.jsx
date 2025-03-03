import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  TableNew,
  Spinner,
} from "../../components/components";
import {
  getFlightBookings,
  cancelFlightBooking,
  refundRequest,
} from "../../utils/api_handler";

import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import toast from "react-hot-toast";

import { FaEye } from "react-icons/fa";
import { HiReceiptRefund } from "react-icons/hi";
import { MdAdd, MdCancel } from "react-icons/md";

const FlightBookings = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(null);
  const [bookingsData, setBookingsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [refundItem, setRefundItem] = useState(null);

  const navigationHandler = () => {
    navigate("/dashboard/search-flights");
  };

  const columnsData = [
    // { columnName: "No.", fieldName: "no.", type: "no." },
    { columnName: "Origin", fieldName: "origin", type: "text" },
    { columnName: "Destination", fieldName: "destination", type: "text" },
    { columnName: "PNR", fieldName: "booking_reference_id", type: "text" },
    { columnName: "Total Fare", fieldName: "total_fare", type: "number" },
    // { columnName: "Currency", fieldName: "currency", type: "text" },
    // { columnName: "Status", fieldName: "booking_status", type: "status" },
    { columnName: "Created At", fieldName: "created_at", type: "date" },
    // { columnName: "Actions", fieldName: "actions", type: "actions" },
  ];

  // const viewColumns = [
  //   { columnName: "Ref Id", fieldName: "booking_reference_id", type: "text" },
  //   { columnName: "Updated At", fieldName: "updated_at", type: "text" },
  //   {
  //     columnName: "Transaction Identifier",
  //     fieldName: "transaction_identifier",
  //     type: "text",
  //   },
  //   {
  //     columnName: "Ticketing Time Limit",
  //     fieldName: "ticketing_time_limit",
  //     type: "text",
  //   },
  //   { columnName: "Booking Id", fieldName: "id", type: "id" },
  //   { columnName: "Rate", fieldName: "rate", type: "text" },
  //   { columnName: "Percentage", fieldName: "persantage", type: "text" },
  //   { columnName: "Cancel At", fieldName: "canceled_at", type: "text" },
  // ];

  const actionsData = [
    {
      name: "View",
      icon: <FaEye title="View" className="text-green-500 " />,
      // handler: (index) => {
      //   if (activeIndex === index) {
      //     setActiveIndex(null);
      //   } else setActiveIndex(index);
      // },
      handler: (_, item) => {
        console.log("item", item);
        navigate("/dashboard/booking-details", {
          state: item,
        });
      },
    },
    // {
    //   name: "Refund",
    //   icon: <HiReceiptRefund title="Refund" className="text-blue-500 text-xl" />,
    //   handler: (_, item) => {
    //     setConfirmStatus(true)
    //     setRefundItem(item)

    //   },
    // },
    // {
    //   name: "Cancel",
    //   icon: <MdCancel title="Cancel" className="text-red-500" />,
    //   handler: (_,item) => {
    //     cancelFlightBookingHandler(item);
    //   },
    // },
  ];

  const gettingFlightBookings = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const id = userData?.company_id;
    const response = await getFlightBookings(id);
    if (response.status) {
      setBookingsData(response.data);
    }
  };


  const abortDeleteHandler = () => {
    setModalStatus(false);
    setDeleteId(null);
  };

  useEffect(() => {
    gettingFlightBookings();
  }, []);

  return (
    <>
      {/* <ConfirmModal
        status={modalStatus}
        abortDelete={abortDeleteHandler}
        deleteHandler={cancelFlightBookingHandler}
      /> */}
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Flight Bookings"}
          className="flex items-center justify-between"
        >
          <div className="relative">
            <SecondaryButton
              text={"Create New Booking"}
              icon={<MdAdd />}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        {/* <ConfirmModal status={confirmStatus} onAbort={() => setConfirmStatus(false)} onConfirm={() => refundRequestHandler(refundItem)} text={"Are you really want to refund the request"} /> */}
        <CardLayoutBody removeBorder={true}>
          {/* <Table
            columns={columnsData}
            data={bookingsData}
            actions={actionsData}
            activeIndex={activeIndex}
          /> */}

          <TableNew
            columnsToView={columnsData}
            tableData={bookingsData}
            downloadBtn={true}
            actions={actionsData}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightBookings;
