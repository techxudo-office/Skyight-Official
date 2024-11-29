import React from "react";
import { FlightCard } from "../../components/components";

const FlightResults = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <FlightCard />
        <FlightCard />
        <FlightCard />
      </div>
    </>
  );
};

export default FlightResults;
