import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardLayoutContainer,
  CardLayoutHeader,
} from "../../components/CardLayout/CardLayout";
import { Loader, Table, Tag } from "../../components/components";
import dayjs from "dayjs";
import { Toaster } from "react-hot-toast";
import { getOrders } from "../../_core/features/bookingSlice";

import { IoIosAirplane } from "react-icons/io";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const { orders, isLoadingOrders, orderError } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (userData?.token) {
      dispatch(getOrders(userData.token));
    }
  }, [dispatch, userData?.token]);

  if (isLoadingOrders) return <Loader />;
  if (orderError) return <p>Error: {orderError}</p>;

  const columnsData = [
    {
      name: "TRIP TYPE",
      selector: (row) => row?.trip_type,
      sortable: false,
      center: true,
    },
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
      minwidth: "150px",
      center: true,
    },
    {
      name: "DATE",
      selector: (row) => dayjs(row.created_at).format("DD-MMM-YYYY"),
      sortable: false,
      center: true,
    },
    {
      name: "STATUS",
      selector: (row) => <Tag value={row?.booking_status} />,
      sortable: false,
      center: true,
    },
    {
      name: "PRICE",
      selector: (row) => row?.rate,
      sortable: false,
      minwidth: "200px",
      center: true,
    },
    // {
    //   name: "TOTAL FARE",
    //   selector: (row) => row?.total_fare,
    //   sortable: false,
    //   center: true,
    // },
  ];
  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader heading={"Search History"} />
        <Table
          columnsData={columnsData}
          tableData={orders || []}
          pagination={true}
          progressPending={isLoadingOrders}
          paginationTotalRows={orders?.length}
          paginationComponentOptions={{ noRowsPerPage: "10" }}
        />
      </CardLayoutContainer>
    </>
  );
};

export default OrderHistory;
