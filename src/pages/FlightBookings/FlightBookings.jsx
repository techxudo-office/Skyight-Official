import React, { useEffect, useState } from "react";
import { ExcelExportButton, Searchbar, SecondaryButton, Table, Tag } from "../../components/components";
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
import { IoIosAirplane } from "react-icons/io";
import dayjs from "dayjs";

const FlightBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);

  const { userData } = useSelector((state) => state.auth);
  const { flightBookings, isLoadingFlightBookings } = useSelector(
    (state) => state.booking
  );

  const navigationHandler = () => {
    navigate("/dashboard/search-flights");
  };

  const columns = [
    {
      name: "ROUTE",
      selector: (row) => (
        <span className="flex w-52 items-center lg:justify-center  gap-2 text-sm text-text">
          {row.origin}
          <div className="flex justify-center items-center gap-1">
            <span className="h-0.5 w-3 bg-primary"></span>
            <IoIosAirplane className="text-lg text-primary" />
            <span className="h-0.5 w-3 bg-primary"></span>
          </div>
          {row.destination}
        </span>
      ),
      sortable: false,

      wrap: true,
      grow: 4,
    },
    {
      name: "PNR",
      selector: (row) => row.booking_reference_id,
      sortable: false,

      grow: 2
    },
    {
      name: "TOTAL FARE",
      selector: (row) => parseFloat(row.total_fare).toFixed(2),
      sortable: false,

      grow: 2,

    },
    {
      name: "STATUS",
      selector: (row) => <Tag value={row.booking_status} />,
      sortable: false,

      wrap: true,
      grow: 4
    },
    {
      name: "CREATED AT",
      selector: (row) => dayjs(row.created_at).format("MMM-DD-YYYY"),
      sortable: false,

      grow: 2,

    },
    {
      name: "",
      selector: (row) => (
        <span
          className="text-lg cursor-pointer"
          onClick={() => {
            navigate("/dashboard/booking-details", {
              state: row,
            });
          }}>
          <FaEye title="View" className="text-green-500 " />
        </span>
      ),
      sortable: false,

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
          <ExcelExportButton
            data={filteredData || []}
            fileName="FlightBookings"
          />
          <Searchbar onFilteredData={setFilteredData} data={flightBookings} />
          <Table
            pagination={true}
            columnsData={columns}
            tableData={filteredData || []}
            progressPending={isLoadingFlightBookings}
            paginationTotalRows={filteredData.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />
        </CardLayoutBody>
        <CardLayoutFooter></CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightBookings;
