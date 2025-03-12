import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    CardLayoutBody,
    CardLayoutContainer,
    CardLayoutHeader,
} from "../../components/CardLayout/CardLayout";
import { logo } from "../../assets/Index.js";
import { Spinner } from "../../components/components";


const Finalticket = () => {
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(location.state);
    }, [location.state]);

    if (!data) return <Spinner />;

    const { AirReservation } = data;
    const travelers = AirReservation?.TravelerInfo || [];
    const originDestinationOptions =
        AirReservation?.AirItinerary?.OriginDestinationOptions || [];
    const priceInfo = AirReservation?.PriceInfo?.PTC_FareBreakDowns;
    const bookingInfo = AirReservation?.bookingReferenceID;
    console.log("final data", data)
    return (
        <div className="p-4 w-full text-text mx-auto text-sm">
            {travelers.map((travelerInfo, index) => {
                const traveler = travelerInfo?.PersonName;
                const ticketInfo = travelerInfo?.ETicketInfos?.[0];

                return (
                    <CardLayoutContainer key={index} className="mb-10 shadow-md">
                        {/* Header */}
                        <CardLayoutHeader className={"bg-primary text-white rounded-t-md"} heading={`Electronic Ticket - Traveler ${index + 1}`} />
                        <CardLayoutBody>
                            <div className="pb-2">
                                <p>
                                    <strong>Traveler:</strong> {traveler?.NameTitle} {traveler?.GivenName}{" "}
                                    {traveler?.Surname}
                                </p>
                                <p>
                                    <strong>E-Ticket Number:</strong> {ticketInfo?.ETicketNo || "N/A"}
                                </p>
                                <p>
                                    <strong>Date of Issue:</strong> 07 Mar 2025
                                </p>
                            </div>
                        </CardLayoutBody>

                        {/* Flight Details */}
                        {originDestinationOptions.map((option, optionIndex) => (
                            <CardLayoutBody key={optionIndex}>
                                <div className="pb-2">
                                    <h3 className="font-bold p-2 bg-background mb-2 text-xl">
                                        Flight Details {originDestinationOptions.length > 1 && ` (Segment ${optionIndex + 1})`}</h3>
                                    {option.FlightSegment.map((flightSegment, segmentIndex) => (
                                        <div key={segmentIndex} className="">
                                            <p>
                                                {flightSegment?.DepartureAirport?.LocationCode} to{" "}
                                                {flightSegment?.ArrivalAirport?.LocationCode} on{" "}
                                                {flightSegment?.DepartureDate} | Airline PNR: {bookingInfo?.Id}
                                            </p>
                                            <div className="flex items-center gap-2 my-2">
                                                <img
                                                    src={logo}
                                                    alt="Airline Logo"
                                                    className=" h-12"
                                                />
                                                <div>
                                                    <p>
                                                        <strong>Airline:</strong> {flightSegment?.OperatingAirline?.Code}
                                                    </p>
                                                    <p>
                                                        <strong>Flight No / Aircraft Type:</strong>{" "}
                                                        {flightSegment?.FlightNumber} /{" "}
                                                        {flightSegment?.Equipment?.AirEquipType}
                                                    </p>
                                                    <p>
                                                        <strong>Cabin / Stop:</strong> Economy /{" "}
                                                        {flightSegment?.StopQuantity || "0"} stop
                                                    </p>
                                                    <p>
                                                        <strong>Baggage:</strong>{" "}
                                                        {flightSegment?.FreeBaggages || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p>
                                                <strong>Depart:</strong> {flightSegment?.DepartureAirport?.Terminal} (
                                                {flightSegment?.DepartureAirport?.LocationCode})
                                            </p>
                                            <p>
                                                <strong>Date:</strong> {flightSegment?.DepartureDate} |{" "}
                                                <strong>Time:</strong> {flightSegment?.DepartureTime}
                                            </p>
                                            <p>
                                                <strong>Arrive:</strong> {flightSegment?.ArrivalAirport?.Terminal} (
                                                {flightSegment?.ArrivalAirport?.LocationCode})
                                            </p>
                                            <p>
                                                <strong>Date:</strong> {flightSegment?.ArrivalDate} |{" "}
                                                <strong>Time:</strong> {flightSegment?.ArrivalTime}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardLayoutBody>
                        ))}

                        {/* Price Details */}
                        <CardLayoutBody>
                            <div className="pb-2">
                                <h3 className="font-bold p-2 bg-background mb-2 text-xl">Price Details</h3>
                                <p>
                                    <strong>{travelerInfo.PassengerTypeCode} Base Price:</strong> {(priceInfo[index]?.PassengerFare.BaseFare?.Amount).toLocaleString()}{" "}
                                    {priceInfo[index].PassengerFare.BaseFare.CurrencyCode || "IRR"}
                                </p>
                                <p>
                                    <strong>{travelerInfo.PassengerTypeCode} Total Price:</strong> {(priceInfo[index]?.PassengerFare.TotalFare?.Amount).toLocaleString()}{" "}
                                    {priceInfo[index].PassengerFare.TotalFare.CurrencyCode || "IRR"}
                                </p>
                            </div>

                            {/* Fare Conditions */}
                            <div className="pb-2">
                                <h3 className="font-bold">Fare Conditions</h3>
                                <ul className="list-disc ml-4">
                                    <li>Cancellation charges as per airline rules.</li>
                                    <li>Date change charges as applicable.</li>
                                    <li>
                                        <strong>E-Ticket Notice:</strong> Terms & conditions apply.
                                    </li>
                                    <li>
                                        <strong>Check-in Time:</strong> Domestic - 1 hour, International - 3 hours.
                                    </li>
                                    <li>
                                        <strong>Passport/Visa/Health:</strong> Ensure valid documents.
                                    </li>
                                </ul>
                            </div>
                        </CardLayoutBody>
                    </CardLayoutContainer>
                );
            })}
        </div>
    );
};

export default Finalticket;
