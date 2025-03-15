import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchHistory } from "../../_core/features/historySlice";
import { CardLayoutContainer, CardLayoutHeader } from "../../components/CardLayout/CardLayout";
import { Table } from "../../components/components";
import dayjs from "dayjs";
import { searchFlight } from "../../_core/features/bookingSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchHistory = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { SearchHistory, isSearchHistoryLoading, errorSearchHistory } =
    useSelector((state) => state.history);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.token) {
      dispatch(getSearchHistory(userData.token));
    }
  }, [dispatch, userData?.token]);

  console.log(
    "SearchHistory Data:",
    SearchHistory?.length ? SearchHistory : "No data found"
  );

  if (isSearchHistoryLoading) return <p>Loading search history...</p>;
  if (errorSearchHistory) return <p>Error: {errorSearchHistory}</p>;

  const searchFlightHandler = async (values) => {
    let flightType ;
    if (values.trip_type == "Return") {
      flightType = "International"
    }else{
      flightType="Domestic"
    }
    console.log("row", values)
    const payload = {
      flightRoute: flightType,
      tripType: values.trip_type,
      originCode: values.origin_destinations[0].origin_location_code,
      destinationCode: values.origin_destinations[0].destination_location_code,
      departureDate: values.origin_destinations[0].departure_date_time,
      returnDate: values.origin_destinations[1]?.departure_date_time||null,
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
      name: "City Pair",
      selector: (row) => (`${row.origin_destinations[0]?.destination_location_code} - ${row.origin_destinations[0]?.origin_location_code}`),
      sortable: false,
      center: true,
    },
    {
      name: "Travel Date",
      selector: (row) => dayjs(row.origin_destinations[0].departure_date_time).format("DD-MMM-YYYY"),
      sortable: false,
      center: true,
    },
    {
      name: "Results",
      selector: (row) => {

        return (
          <span
            className="text-base cursor-pointer text-primary hover:underline"
            onClick={() => searchFlightHandler(row)}>
            Result
          </span>
        )
      },
      sortable: false,
      center: true,
    }
  ]
  return (
    // <div className="p-6 bg-gray-100 min-h-screen">
    //   <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
    //     Search History
    //   </h2>

    //   {SearchHistory?.length ? (
    //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {SearchHistory.map((item, index) => (
    //         <div
    //           key={index}
    //           className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
    //           <h3 className="text-lg font-semibold text-gray-700 mb-2">
    //             Trip Type: {item.trip_type}
    //           </h3>
    //           <p className="text-gray-500 text-sm">
    //             Created At: {new Date(item.created_at).toLocaleString()}
    //           </p>

    //           <div className="mt-2 border-t pt-2">
    //             <h4 className="text-md font-medium text-gray-600">
    //               Passengers:
    //             </h4>
    //             <p className="text-gray-700">
    //               Adults: {item.adult_quantity}, Children: {item.child_quantity}
    //               , Infants: {item.infant_quantity}
    //             </p>
    //           </div>

    //           <div className="mt-2 border-t pt-2">
    //             <h4 className="text-md font-medium text-gray-600">Route:</h4>
    //             {item.origin_destinations.map((destination, destIndex) => (
    //               <p key={destIndex} className="text-gray-700">
    //                 {destination.origin_location_code} →{" "}
    //                 {destination.destination_location_code} <br />
    //                 <span className="text-gray-500 text-sm">
    //                   Date: {destination.departure_date_time}
    //                 </span>
    //               </p>
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <p className="text-center text-gray-600">No search history found.</p>
    //   )}
    // </div>
    <>
      <Toaster />
      <CardLayoutContainer>
        <CardLayoutHeader heading={"Search History"} />
        <Table
          columnsData={columnsData}
          tableData={SearchHistory || []}
          pagination={true}
          progressPending={isSearchHistoryLoading}
          paginationTotalRows={SearchHistory.length}
          paginationComponentOptions={{ noRowsPerPage: "10" }}
        />
      </CardLayoutContainer>
    </>
  );
};

export default SearchHistory;
