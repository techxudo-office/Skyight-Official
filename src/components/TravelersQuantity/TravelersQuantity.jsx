import React, { useEffect, useState } from "react";
import { CardLayoutContainer } from "../CardLayout/CardLayout";
import { IoIosAirplane, IoMdClock } from "react-icons/io";
import { MdCalendarMonth, MdChildCare, MdChildFriendly, MdLuggage, MdPerson } from "react-icons/md";
import dayjs from "dayjs";

export default function TravelersQuantity({ flightSegments, travelers }) {
    const [travelersQuantity, setTravelersQuantity] = useState([]);
console.log('flightsegments',flightSegments)
    useEffect(() => {
        if (Object.keys(travelers).length) {
            setTravelersQuantity(
                Object.entries(travelers)
                    .filter(([key, value]) => value > 0)
                    .map(([key, value]) => ({
                        icon: key === "adults" ? <MdPerson /> : key === "childs" ? <MdChildCare /> : <MdChildFriendly />,
                        name: key === "adults" ? "Adult" : key === "childs" ? "Child" : "Infant",
                        value: value,
                    }))
            );
        }
    }, [travelers]);

    return (
        <CardLayoutContainer className="mb-5">
            <div className="flex md:flex-row flex-col justify-between px-6 gap-3 md:items-end py-9 text-text">
                <div className="flex flex-col gap-2 items-start">
                    {flightSegments.map((origin, originIndex) => (
                        origin.FlightSegment.map((segment, segmentIndex) => (
                            <div key={`${originIndex}-${segmentIndex}`} className="mb-4">
                                <p className="text-text text-xl items-center font-bold uppercase flex gap-2 pb-3">
                                    <span>{segment.DepartureAirport.LocationCode}</span>
                                    <div className="flex gap-3 items-center text-primary">
                                        <span className="h-0.5 w-6 bg-primary"></span>
                                        <IoIosAirplane className="text-2xl" />
                                        <span className="h-0.5 w-6 bg-primary"></span>
                                    </div>
                                    <span>{segment.ArrivalAirport.LocationCode}</span>
                                    <div className="flex gap-1 text-sm md:text-base ml-3 text-text font-semibold items-center">
                                        <MdCalendarMonth className="text-base md:text-lg" />
                                        <span>{dayjs(segment.DepartureDate).format("DD,MMM")}</span>
                                    </div>
                                </p>

                                {/* Flight Duration */}
                                <div className="text-sm flex gap-2 font-semibold h-fit pt-1 rounded-lg text">
                                    <span className="flex items-center gap-1">
                                        <IoMdClock className="text-base" />
                                        Duration:
                                    </span>
                                    <span className="lowercase text-primary">
                                        {segment.FlightDuration.split(":")[0].replace("0", "")} hrs{" "}
                                        {segment.FlightDuration.split(":")[1] !== "00" && (
                                            <span>{segment.FlightDuration.split(":")[1]} mins</span>
                                        )}
                                    </span>
                                </div>

                                {/* Travelers & Free Baggages */}
                                <div className="flex gap-2 md:gap-4 flex-wrap">
                                    {travelersQuantity.map((traveler, i) => (
                                        <div key={i} className="flex flex-col gap-2 text-xl text-text font-semibold items-start">
                                            <div className="flex items-center gap-1">
                                                {traveler.icon}
                                                <span className="text-base mt-1">
                                                    {traveler.value} {traveler.name}
                                                    {traveler.value > 1 && (traveler.name === "Child" ? "ren" : "s")}
                                                </span>
                                            </div>

                                            {/* Handling FreeBaggages */}
                                            {segment.FreeBaggages && segment.FreeBaggages[i] && (
                                                <p className="flex items-center gap-1 text-base">
                                                    <MdLuggage className="text-xl mb-1" />
                                                    {segment.FreeBaggages[i].Quantity}
                                                    {segment.FreeBaggages[i].Unit}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </CardLayoutContainer>
    );
}
