import React, { useEffect, useState } from "react";
import { SecondaryButton, TableNew } from "../../components/components";
import { getFlightBookings } from "../../utils/api_handler";

import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import toast from "react-hot-toast";

import { FaEye } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";

const FlightBookings = () => {
  const navigate = useNavigate();
  const [bookingsData, setBookingsData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

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
    { columnName: "Status", fieldName: "booking_status", type: "status" },
    { columnName: "Created At", fieldName: "created_at", type: "date" },
    // { columnName: "Actions", fieldName: "actions", type: "actions" },
  ];

  const actionsData = [
    {
      name: "View",
      icon: <FaEye title="View" className="text-green-500 " />,
      handler: (_, item) => {
        console.log("item", item);
        navigate("/dashboard/booking-details", {
          state: item,
        });
      },
    },
  ];

  const gettingFlightBookings = async () => {
    const id = userData?.user?.company_id;
    const response = await getFlightBookings(id);
    if (response?.status) {
      setBookingsData(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    gettingFlightBookings();
  }, []);

  return (
    <>
      <CardLayoutContainer removeBg={true}>
        <CardLayoutHeader
          removeBorder={true}
          heading={"Flight Bookings"}
          className="flex items-center justify-between">
          <div className="relative">
            <SecondaryButton
              text={"Create New Booking"}
              icon={<MdAdd />}
              onClick={navigationHandler}
            />
          </div>
        </CardLayoutHeader>
        <CardLayoutBody removeBorder={true}>
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
