import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchHistory } from "../../_core/features/historySlice";

const SearchHistory = () => {
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Search History
      </h2>

      {SearchHistory?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SearchHistory.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Trip Type: {item.trip_type}
              </h3>
              <p className="text-gray-500 text-sm">
                Created At: {new Date(item.created_at).toLocaleString()}
              </p>

              <div className="mt-2 border-t pt-2">
                <h4 className="text-md font-medium text-gray-600">
                  Passengers:
                </h4>
                <p className="text-gray-700">
                  Adults: {item.adult_quantity}, Children: {item.child_quantity}
                  , Infants: {item.infant_quantity}
                </p>
              </div>

              <div className="mt-2 border-t pt-2">
                <h4 className="text-md font-medium text-gray-600">Route:</h4>
                {item.origin_destinations.map((destination, destIndex) => (
                  <p key={destIndex} className="text-gray-700">
                    {destination.origin_location_code} →{" "}
                    {destination.destination_location_code} <br />
                    <span className="text-gray-500 text-sm">
                      Date: {destination.departure_date_time}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No search history found.</p>
      )}
    </div>
  );
};

export default SearchHistory;
