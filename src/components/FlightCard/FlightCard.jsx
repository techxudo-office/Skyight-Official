import React, { useEffect } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Button, SecondaryButton } from "../../components/components";
import { useNavigate } from "react-router-dom";

import { FaPlane } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";

const FlightCard = ({ data, travelers }) => {
  const navigate = useNavigate();

  const flightSegment =
    data.AirItinerary.OriginDestinationOptions[0].FlightSegment[0];

  const viewDetails = () => {
    navigate("/dashboard/flight-details", { state: { data, travelers } });
  };

  return (
    <>
      <CardLayoutContainer className={"mb-5"}>
        <CardLayoutHeader className={"flex items-center justify-between"}>
          <div className="w-full flex flex-wrap gap-5 justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-text">
                {flightSegment.OperatingAirline.Code}
              </h2>
              <h2 className="text-sm font-semibold text-slate-400">
                {flightSegment.FlightNumber}
              </h2>
              <h2 className="text-sm font-semibold text-slate-400">
                {flightSegment.DepartureDate}
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <h2 className="text-sm font-semibold text-slate-400">
                  {flightSegment.FlightDuration}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.DepartureAirport.LocationCode}
                  </h2>
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.DepartureTime}
                  </h2>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="w-28 bg-primary rounded-full h-[2px]"></div>
                  <FaPlane className="text-primary" />
                  <div className="w-28 bg-primary rounded-full h-[2px]"></div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.ArrivalAirport.LocationCode}
                  </h2>
                  <h2 className="text-md font-semibold text-text">
                    {flightSegment.ArrivalTime}
                  </h2>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-semibold text-text">
                  Non Stop (Fix)
                </h2>
              </div>
            </div>
            <div>
              <SecondaryButton text={"AIRBLUEAPI (Fix)"} />
            </div>
          </div>
        </CardLayoutHeader>
        <CardLayoutBody>
          <div className="flex flex-col">
            {flightSegment.FreeBaggages &&
              flightSegment.FreeBaggages.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex py-3 border-b border-slate-200 items-center justify-between"
                  >
                    <h2 className="text-sm font-semibold text-slate-600 flex  items-center justify-center gap-1">
                      <span>
                        <FaUser />
                      </span>
                      <span>Type:{item.PassengerType}</span>
                    </h2>
                    <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                      <span>
                        <FaSuitcase />
                      </span>
                      <span>
                        Baggage {item.Quantity} {item.Unit}
                      </span>
                    </h2>
                    <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                      <span>
                        <FaMoneyBillAlt />
                      </span>
                      <span>20,000 (Fix)</span>
                    </h2>
                  </div>
                );
              })}
          </div>
        </CardLayoutBody>
        <CardLayoutFooter>
          <div>
            <Button onClick={viewDetails} text={"View Details"} />
          </div>
        </CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightCard;
