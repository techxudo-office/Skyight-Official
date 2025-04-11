import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchHistory } from "../../_core/features/historySlice";
import {
  CardLayoutContainer,
  CardLayoutHeader,
} from "../../components/CardLayout/CardLayout";
import { Button, Loader, Searchbar, Table } from "../../components/components";
import dayjs from "dayjs";
import { searchFlight } from "../../_core/features/bookingSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";

const SearchHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingRowId, setLoadingRowId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const { SearchHistory, isSearchHistoryLoading, errorSearchHistory } =
    useSelector((state) => state.history);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.token) return;
    dispatch(getSearchHistory(userData.token));
  }, [dispatch, userData?.token]);

  if (isSearchHistoryLoading) return <Loader />;
  if (errorSearchHistory) return <p>Error: {errorSearchHistory}</p>;

  const searchFlightHandler = async (values) => {
    setLoadingRowId(values.id);

    let flightType =
      values.trip_type === "Return" ? "International" : "Domestic";

    const payload = {
      flightRoute: flightType,
      tripType: values.trip_type,
      originCode: values.origin_destinations[0].origin_location_code,
      destinationCode: values.origin_destinations[0].destination_location_code,
      departureDate: values.origin_destinations[0].departure_date_time,
      returnDate: values.origin_destinations[1]?.departure_date_time || null,
      adult: Number(values.adult_quantity),
      child: Number(values.child_quantity),
      infant: Number(values.infant_quantity),
    };

    try {
      const response = await dispatch(
        searchFlight({ payload, token: userData?.token })
      ).unwrap();

      if (
        response?.PricedItineraries?.PricedItinerary &&
        response.PricedItineraries.PricedItinerary.length > 0
      ) {
        navigate("/dashboard/flight-results", {
          state: {
            payload,
            flightsData: response,
            travelersData: {
              adults: payload.adult,
              childs: payload.child,
              infants: payload.infant,
            },
          },
        });
      } else {
        toast.error(response?.message || "No flights found");
      }
    } catch (error) {
      if (Array.isArray(error)) {
        error.forEach((msg) => toast.error(msg.toUpperCase()));
      } else {
        toast.error(error || "Failed to search flights");
      }
    } finally {
      setLoadingRowId(null);
    }
  };

  const columnsData = [
    {
      name: "Search On",
      selector: (row) => dayjs(row.created_at).format("DD-MMM-YYYY | h:m a"),
      sortable: false,
      center: true,
    },
    {
      name: "ROUTE",
      selector: (row) => (
        <span className="flex items-center justify-center gap-2 text-sm text-text">
          {row.origin_destinations[0]?.destination_location_code}
          <div className="flex items-center gap-1">
            <span className="h-0.5 w-3 bg-primary"></span>
            <IoIosAirplane className="text-lg text-primary" />
            <span className="h-0.5 w-3 bg-primary"></span>
          </div>
          {row.origin_destinations[0]?.origin_location_code}
        </span>
      ),
      sortable: false,
      minwidth: "150px",
      center: true,
    },
    {
      name: "Travel Date",
      selector: (row) =>
        dayjs(row.origin_destinations[0].departure_date_time).format(
          "DD-MMM-YYYY"
        ),
      sortable: false,
      center: true,
    },
    {
      name: "Results",
      selector: (row) => {
        return (
          <Button
            loading={loadingRowId === row.id}
            onClick={() => searchFlightHandler(row)}
            text={"Results"}
          />
        );
      },
      sortable: false,
      center: true,
    },
  ];

  return (
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader heading={"Search History"} />
        <Searchbar onFilteredData={setFilteredData} data={SearchHistory} />
        <Table
          columnsData={columnsData}
          tableData={filteredData || []}
          pagination={true}
          progressPending={isSearchHistoryLoading}
          paginationTotalRows={filteredData.length}
          paginationComponentOptions={{ noRowsPerPage: "10" }}
        />
      </CardLayoutContainer>
    </>
  );
};

export default SearchHistory;
