import React, { useEffect, useState } from "react";
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
import { IoIosAirplane, IoMdEye } from "react-icons/io";
import { MdChildCare, MdChildFriendly, MdPerson } from "react-icons/md";

const FlightCard = ({ data, travelers, pricingInfo }) => {
  const flightSegment =
    data.AirItinerary.OriginDestinationOptions.map(
      (item) => item.FlightSegment[0]
    )

  const navigate = useNavigate();
  const totalTravelers = [];
  Object.entries(travelers).forEach(([key, value]) => {
    if (value > 0) {
      totalTravelers.push(key.replace("s", ""));
    }
  });
  const viewDetails = () => {
    navigate("/dashboard/travelers-details", {
      state: { data, travelers, pricingInfo },
    });
  };

  return (
    <>
      <CardLayoutContainer className={"mb-5"}>
        <CardLayoutHeader className={""}>
          {/* <div className="mb-3 text-sm text-text">
            <h2 className="font-semibold text-text">
              {data.AirItinerary.OriginDestinationOptions.length === 1 ?
                "Non Stop (fix)" : `Stops: ${data.AirItinerary.OriginDestinationOptions.length}`
              }
            </h2>
          </div> */}
          {flightSegment.map((flights, idx) => (
            <div
              key={idx}
              className="flex flex-wrap items-center justify-between w-full gap-5 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-text">
                  {flights.OperatingAirline.Code}
                </h2>
                <h2 className="text-sm font-semibold text-gray">
                  {flights.FlightNumber}
                </h2>
                <h2 className="text-sm font-semibold text-gray">
                  {flights.DepartureDate}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div>
                  <h2 className="text-sm font-semibold text-text">
                    {flights.FlightDuration}
                  </h2>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-md text-text">
                      {flights.DepartureAirport.LocationCode}
                    </h2>
                    <h2 className="font-semibold text-md text-text">
                      {flights.DepartureTime}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 text-primary">
                    <span className="h-0.5 w-8 bg-primary"></span>
                    <IoIosAirplane className="text-2xl" />
                    <span className="h-0.5 w-8 bg-primary"></span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-md text-text">
                      {flights.ArrivalAirport.LocationCode}
                    </h2>
                    <h2 className="font-semibold text-md text-text">
                      {flights.ArrivalTime}
                    </h2>
                  </div>
                </div>
              </div>
              <div>
                <SecondaryButton text={data?.ProviderType} />
              </div>
            </div>
          ))}
        </CardLayoutHeader>
        <CardLayoutBody>
          <div className="flex flex-col">
            {totalTravelers.length &&
              totalTravelers.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-3 ${index == totalTravelers.length - 1 ? "" : "border-b"
                    }  border-slate-200`}>
                  <div>
                    <h2 className="flex items-center gap-1 text-sm font-semibold text-text">
                      <span className="text-lg">
                        {item == "adult" ? (
                          <MdPerson />
                        ) : item == "child" ? (
                          <MdChildCare />
                        ) : (
                          <MdChildFriendly />
                        )}
                      </span>
                      <span className="capitalize"> {item}</span>
                    </h2>
                  </div>
                  <div className="pr-16">
                    {flightSegment.map((item, idx) => (
                      <h2
                        key={idx}
                        className="flex items-center gap-1 mb-1 text-sm font-semibold text-text">
                        <span>
                          <FaSuitcase />
                        </span>

                        <span>
                          Flight-{idx + 1}: {item.FreeBaggages[index].Quantity}{" "}
                          {item.FreeBaggages[index].Unit}
                        </span>
                      </h2>
                    ))}
                  </div>

                  <h2 className="flex items-center justify-end gap-1 text-sm font-semibold text-text">
                    <span>
                      <FaMoneyBillAlt />
                    </span>
                    <span className="flex items-end">{(pricingInfo.PTC_FareBreakdowns[index].PassengerFare.TotalFare.pkrTotalFare).toLocaleString()}
                      {travelers[`${item}s`] !== 1 &&
                        <p> (x{travelers[`${item}s`]})</p>}  PKR</span>
                  </h2>
                </div>
              ))}
          </div>
        </CardLayoutBody>
        <CardLayoutFooter>
          <div className="mr-4 lg:mr-7">
            <h1 className="text-xl font-semibold text-text">Total:{" "}
              <span className="text-primary">
                {(pricingInfo.ItinTotalFare.TotalFare.pkrTotalFare).toLocaleString()} PKR
              </span>
            </h1>
          </div>
          <div>
            <Button
              icon={<IoMdEye />}
              onClick={viewDetails}
              text={"View Details"}
            />
          </div>
        </CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightCard;
