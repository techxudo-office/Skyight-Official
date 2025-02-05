import React, { useEffect, useState } from "react";
import {
  Table,
  SecondaryButton,
  ConfirmModal,
  TableNew,
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
import { MdCancel } from "react-icons/md";

const FlightBookings = () => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(null);
  const [bookingsData, setBookingsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigationHandler = () => {
    navigate("/dashboard/search-flights");
  };

  const columnsData = [
    { columnName: "No.", fieldName: "no.", type: "no." },
    { columnName: "Origin", fieldName: "origin", type: "text" },
    { columnName: "Destination", fieldName: "destination", type: "text" },
    { columnName: "Total Fare", fieldName: "total_fare", type: "text" },
    { columnName: "Currency", fieldName: "currency", type: "text" },
    { columnName: "Status", fieldName: "booking_status", type: "status" },
    { columnName: "Created At", fieldName: "created_at", type: "text" },
    { columnName: "Actions", fieldName: "actions", type: "actions" },
  ];

  const viewColumns = [
    { columnName: "Ref Id", fieldName: "booking_reference_id", type: "text" },
    { columnName: "Updated At", fieldName: "updated_at", type: "text" },
    {
      columnName: "Transaction Identifier",
      fieldName: "transaction_identifier",
      type: "text",
    },
    {
      columnName: "Ticketing Time Limit",
      fieldName: "ticketing_time_limit",
      type: "text",
    },
    { columnName: "Booking Id", fieldName: "id", type: "id" },
    { columnName: "Rate", fieldName: "rate", type: "text" },
    { columnName: "Percentage", fieldName: "persantage", type: "text" },
    { columnName: "Cancel At", fieldName: "canceled_at", type: "text" },
  ];

  const actionsData = [
    {
      name: "View",
      icon: <FaEye title="View" className="text-green-500" />,
      // handler: (index) => {
      //   if (activeIndex === index) {
      //     setActiveIndex(null);
      //   } else setActiveIndex(index);
      // },
      handler: (index, item) => {
        navigate("/dashboard/booking-details", {
          state: item.booking_reference_id,
        });
      },
    },
    {
      name: "Refund",
      icon: <HiReceiptRefund title="Refund" className="text-blue-500" />,
      handler: (_, item) => {
        refundRequestHandler(item);
      },
    },
    {
      name: "Cancel",
      icon: <MdCancel title="Cancel" className="text-red-500" />,
      handler: (_, item) => {
        cancelFlightBookingHandler(item);
      },
    },
  ];

  const gettingFlightBookings = async () => {
    const response = await getFlightBookings();
    if (response.status) {
      setBookingsData(response.data);
    }
  };

  const cancelFlightBookingHandler = async (flight) => {
    console.log(flight);

    const bookingId = {
      booking_id: flight.id,
    };

    console.log(bookingId);

    let response = await cancelFlightBooking(bookingId);
    if (response.status) {
      toast.success(response.message);
      setBookingsData([]);
      gettingFlightBookings();
    } else {
      toast.error(response.message);
    }
  };

  const refundRequestHandler = async (flight) => {
    console.log(flight);

    const bookingId = {
      booking_id: flight.id,
    };

    console.log(bookingId);

    let response = await refundRequest(bookingId);
    if (response.status) {
      toast.success(response.message);
      setBookingsData([]);
      gettingFlightBookings();
    } else {
      toast.error(response.message);
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
      <ConfirmModal
        status={modalStatus}
        abortDelete={abortDeleteHandler}
        deleteHandler={cancelFlightBookingHandler}
      />
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Flight Bookings"}
          className="flex justify-between items-center"
        >
          <div className="relative">
            <SecondaryButton
              text={"Create New Booking"}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
          <Table
            columns={columnsData}
            viewColumns={viewColumns}
            data={bookingsData}
            actions={actionsData}
            activeIndex={activeIndex}
          /> 
          <TableNew columnsToView={columnsData} tableData={bookingsData}/>
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightBookings;
