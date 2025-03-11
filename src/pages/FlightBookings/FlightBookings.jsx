import React, { useEffect, useState } from "react";
import { SecondaryButton, TableNew } from "../../components/components";
import { useNavigate } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { FaEye } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getFlightBookings } from "../../_core/features/bookingSlice";

const FlightBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { flightBookings, isLoadingFlightBookings } = useSelector(
      (state) => state.booking
    );

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

  useEffect(() => {
    if (userData?.user?.company_id) {
      dispatch(
        getFlightBookings({
          id: userData.user.company_id,
          token: userData.token,
        })
      );
    }
  }, [dispatch, userData?.user?.company_id]);

  return (
    <>
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
        <CardLayoutBody removeBorder={true}>
          <TableNew
            columnsToView={columnsData}
            tableData={flightBookings}
            downloadBtn={true}
            actions={actionsData}
            loader={isLoadingFlightBookings}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightBookings;
