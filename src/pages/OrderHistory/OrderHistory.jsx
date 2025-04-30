import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardLayoutBody,
  CardLayoutContainer,
  CardLayoutHeader,
} from "../../components/CardLayout/CardLayout";
import { ExcelExportButton, Loader, Searchbar, Table, Tag } from "../../components/components";
import dayjs from "dayjs";
import { Toaster } from "react-hot-toast";
import { getOrders, getPNR } from "../../_core/features/bookingSlice";

import { IoIosAirplane } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Finalticket from "../FinalTicket/Finalticket";
import { MdDownload } from "react-icons/md";

const OrderHistory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [pnrFetched, setPnrFetched] = useState(false)
  const [downloadAllFn, setDownloadAllFn] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const { orders, isLoadingOrders, orderError, pnrData, isLoadingPNR } = useSelector(
    (state) => state.booking
  );
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!userData?.token) return;
    dispatch(getOrders(userData.token));
  }, [dispatch, userData?.token]);



  const columnsData = [
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
      name: "TRIP TYPE",
      selector: (row) => row?.trip_type,
      sortable: false,

    },
    {
      name: "DATE",
      selector: (row) => dayjs(row.created_at).format("DD-MMM-YYYY"),
      sortable: false,

    },
    {
      name: "STATUS",
      selector: (row) => <Tag value={row?.booking_status} />,
      sortable: false,

    },
    {
      name: "PRICE",
      selector: (row) => row?.rate,
      sortable: false,
      minwidth: "200px",

    },
    {
      name: "",
      selector: (row) => (
        <div className="flex items-center justify-center gap-3 text-text">
          <span
            className="text-lg cursor-pointer"
            onClick={() => {
              navigate("/dashboard/booking-details", {
                state: row,
              });
            }}>
            <FaEye title="View" className="text-green-500 " />
          </span>
          <span className="text-lg cursor-pointer">
            <Finalticket downloadFromParent={true} id={row.booking_reference_id}
            />
          </span>
        </div>
      ),
      sortable: false,

    }
  ];
  if (isLoadingOrders) return <Loader />;
  // if (orderError) return <p>Error: {orderError}</p>;
  return (
    <>
      
      <CardLayoutContainer className={"z-10 "}>

        <CardLayoutHeader heading={"Order History"} />
        <CardLayoutBody>
          <ExcelExportButton
            data={filteredData || []}
            fileName="FlightBookings"
          />
          <Searchbar data={orders} onFilteredData={setFilteredData} />
          <Table
            columnsData={columnsData}
            tableData={filteredData || []}
            pagination={true}
            progressPending={isLoadingOrders}
            paginationTotalRows={filteredData?.length}
            paginationComponentOptions={{ noRowsPerPage: "10" }}
          />

        </CardLayoutBody>

      </CardLayoutContainer>
    </>
  );
};

export default OrderHistory;
