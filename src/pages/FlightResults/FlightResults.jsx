import React, { useState, useEffect } from "react";
import { FlightCard, Spinner } from "../../components/components";
import { useLocation } from "react-router-dom";

const FlightResults = () => {
  const location = useLocation();

  const [flightsData, setFlightsData] = useState([]);
  const [travelersData, setTravelersData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setFlightsData(
        location.state.flightsData.PricedItineraries.PricedItinerary
      );
      setTravelersData(location.state.travelersData);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        {flightsData.length > 0 ? (
          flightsData.map((item, index) => {
            return (
              <FlightCard key={index} data={item} travelers={travelersData} />
            );
          })
        ) : (
          <Spinner className={"text-primary"} />
        )}
      </div>
    </>
  );
};

export default FlightResults;
