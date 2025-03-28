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

const FlightCard = ({ data, doc_type, travelers, pricingInfo }) => {
  const [flightSegment, setFlightSegment] = useState(
    data.AirItinerary.OriginDestinationOptions.map(
      (item) => item.FlightSegment[0]
    )
  );
  console.log("pricing info", pricingInfo)
  const navigate = useNavigate();
  const totalTravelers = [];
  Object.entries(travelers).forEach(([key, value]) => {
    if (value > 0) {
      totalTravelers.push(key.replace("s", ""));
    }
  });

  const viewDetails = () => {
    navigate("/dashboard/travelers-details", {
      state: { data, doc_type, travelers, pricingInfo },
    });
  };

  return (
    <>
      <CardLayoutContainer className={"mb-5"}>
        <CardLayoutHeader className={""}>
          <div className="text-text text-sm mb-3">
            <h2 className=" font-semibold text-text">
              {data.AirItinerary.OriginDestinationOptions.length === 1 ?
                "Non Stop (fix)" : `Stops: ${data.AirItinerary.OriginDestinationOptions.length}`
              }
            </h2>
          </div>
          {flightSegment.map((flights, idx) => (
            <div
              key={idx}
              className="w-full mb-4 flex flex-wrap gap-5 justify-between items-center">
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
                    <h2 className="text-md font-semibold text-text">
                      {flights.DepartureAirport.LocationCode}
                    </h2>
                    <h2 className="text-md font-semibold text-text">
                      {flights.DepartureTime}
                    </h2>
                  </div>
                  <div className="flex gap-3 items-center text-primary">
                    <span className="h-0.5 w-8 bg-primary"></span>
                    <IoIosAirplane className="text-2xl" />
                    <span className="h-0.5 w-8 bg-primary"></span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-md font-semibold text-text">
                      {flights.ArrivalAirport.LocationCode}
                    </h2>
                    <h2 className="text-md font-semibold text-text">
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
                    <h2 className="text-sm font-semibold text-text flex items-center  gap-1">
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
                        className="text-sm mb-1 font-semibold text-text  flex items-center gap-1">
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

                  <h2 className="text-sm font-semibold text-text flex items-center justify-end gap-1">
                    <span>
                      <FaMoneyBillAlt />
                    </span>
                    <span className="">{(pricingInfo.PTC_FareBreakdowns[index].PassengerFare.TotalFare.Amount).toLocaleString()}</span>
                  </h2>
                </div>
              ))}
          </div>
        </CardLayoutBody>
        <CardLayoutFooter>
          <div className=" mr-4 lg:mr-7">
            <h1 className="text-text text-xl font-semibold">Total:{" "}
              <span className="text-primary">
                {(pricingInfo.ItinTotalFare.TotalFare.pkrTotalFare).toLocaleString()}
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
