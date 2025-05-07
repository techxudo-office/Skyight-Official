import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardLayoutContainer,
  CardLayoutHeader,
} from "../../components/CardLayout/CardLayout";
import { ExcelExportButton, Loader, Searchbar, Table, Tag } from "../../components/components";
import dayjs from "dayjs";
import { Toaster } from "react-hot-toast";
import { getFlightBookings } from "../../_core/features/bookingSlice";
import { FaEye } from "react-icons/fa";

import { IoIosAirplane } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const { flightBookings, isLoadingFlightBookings, flightBookingsError } =
    useSelector((state) => state.booking);

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

  if (isLoadingFlightBookings) return <Loader />;

  const columns = [
    {
      name: "ROUTE",
      selector: (row) => (
        <span className="flex items-center justify-center gap-2 text-sm text-text">
          {row.origin}
          <div className="flex items-center gap-1">
            <span className="h-0.5 w-3 bg-primary"></span>
            <IoIosAirplane className="text-lg text-primary" />
            <span className="h-0.5 w-3 bg-primary"></span>
          </div>
          {row.destination}
        </span>
      ),
      sortable: false,

    },
    {
      name: "PNR",
      selector: (row) => row.booking_reference_id,
      sortable: false,

    },
    {
      name: "TOTAL FARE",
      selector: (row) => row.total_fare,
      sortable: false,

    },
    {
      name: "STATUS",
      selector: (row) => <Tag value={row.booking_status} />,
      sortable: false,

    },
    {
      name: "CREATED AT",
      selector: (row) => dayjs(row.created_at).format("MMM-DD-YYYY"),
      sortable: false,

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
  const bookedBookings = flightBookings?.filter((item) => item.booking_status === "booked")
  return (
    <>

      <CardLayoutContainer removeBg={true} >
        <CardLayoutHeader heading={"Booking History"} />
        <ExcelExportButton
          data={filteredData || []}
          fileName="FlightBookings"
        />
        <Searchbar onFilteredData={setFilteredData} data={bookedBookings} />

        <Table
          columnsData={columns}
          tableData={filteredData || []}
          pagination={true}
          progressPending={isLoadingFlightBookings}
          paginationTotalRows={filteredData?.length}
          paginationComponentOptions={{ noRowsPerPage: "10" }}
        />
      </CardLayoutContainer>


    </>
  );
};

export default BookingHistory;
