import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button, Spinner } from "../../components/components";
import { IoMdAirplane } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";

const Finalticket = () => {
    const ticketRefs = useRef([]);
    const { pnrData, isLoadingPNR } = useSelector((state) => state.booking)
    const { AirReservation } = pnrData;
    const travelers = AirReservation?.TravelerInfo || [];
    const originDestinationOptions =
        AirReservation?.AirItinerary?.OriginDestinationOptions || [];
    const priceInfo = travelers.map((passenger, i) => {
        let pricing = AirReservation?.PriceInfo?.PTC_FareBreakDowns.filter((item) => (item.PassengerTypeQuantity.Code == passenger.PassengerTypeCode));
        return pricing[0];
    });

    const bookingInfo = AirReservation?.bookingReferenceID;

    // Function to download a specific ticket as a PDF
    const downloadPDF = async (index) => {
        const ticketElement = ticketRefs.current[index];
        if (!ticketElement) return;

        // Capture the element with forced width
        const canvas = await html2canvas(ticketElement, {
            scale: 2,
            scrollX: 0,
            scrollY: 0
        });

        // Convert 1300px to mm (1px ≈ 0.264583mm)
        const pdfWidth = 201;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Create PDF with exact element width
        const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);

        // Convert canvas to PNG
        const imgData = canvas.toDataURL("image/png");

        // Add image to PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`ticket_traveler_${index + 1}.pdf`);

    };


    return (
        <div className="md:p-4 w-full text-text mx-auto max-md:text-sm">
            {travelers.map((travelerInfo, index) => {
                const traveler = travelerInfo?.PersonName;
                const ticketInfo = travelerInfo?.ETicketInfos?.[0];

                return (
                    <>
                        <div
                            key={index}
                            className="lg:w-[90%] mb-8 mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
                        >

                            <div className="bg-white" ref={(el) => (ticketRefs.current[index] = el)}>

                                {/* Header Section */}
                                <div className="bg-primary text-white text-xl font-bold py-3 px-5 flex flex-wrap gap-3 justify-between">
                                    <span className="text-2xl">Ticket - Traveler {index + 1}</span>
                                    <span className="text-lg">E-Ticket No: {ticketInfo?.ETicketNo || "N/A"}</span>
                                </div>

                                {/* Passenger Info */}
                                <div className="p-5 border-b ">
                                    <p className="text-xl font-semibold">
                                        {traveler?.NameTitle} {traveler?.GivenName} {traveler?.Surname}
                                    </p>
                                    <p className="text-lg text-text">Date of Issue: 07 Mar 2025</p>
                                </div>

                                {/* Flight Details */}
                                <div className="p-4 bg-white border-b">
                                    <h3 className="font-bold text-xl mb-2 text-primary">Flight Details</h3>
                                    <div className="w-full">
                                        {originDestinationOptions.map((option, optionIndex) =>
                                            option.FlightSegment.map((flightSegment, segmentIndex) => (
                                                <div
                                                    key={`${optionIndex}-${segmentIndex}`}
                                                    className="flex text-lg flex-wrap gap-y-5 gap-x-10 rounded-lg bg-white mb-4 "
                                                >
                                                    {/* Airline */}
                                                    <div className="flex gap-2">
                                                        <span className="text-text">Airline:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">
                                                            {flightSegment?.OperatingAirline?.Code} {flightSegment?.FlightNumber}
                                                        </span>
                                                    </div>

                                                    {/* Depart */}
                                                    <div className="flex gap-2">
                                                        <span className="text-text ">Depart:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">
                                                            {flightSegment?.DepartureAirport?.LocationCode} ({flightSegment?.DepartureAirport?.Terminal})
                                                        </span>
                                                    </div>
                                                    {/* Arrive */}
                                                    <div className="flex gap-2">
                                                        <span className="text-text ">Arrive:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">
                                                            {flightSegment?.ArrivalAirport?.LocationCode} ({flightSegment?.ArrivalAirport?.Terminal})
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="text-text ">Departure Date:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">
                                                            {flightSegment?.DepartureDate} {flightSegment?.DepartureTime}
                                                        </span>
                                                    </div>



                                                    <div className="flex gap-2">
                                                        <span className="text-text ">Arrival Date:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">
                                                            {flightSegment?.ArrivalDate} {flightSegment?.ArrivalTime}
                                                        </span>
                                                    </div>

                                                    {/* Type */}
                                                    <div className="flex gap-2">
                                                        <span className="text-text ">Type:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">{travelerInfo.PassengerTypeCode}</span>
                                                    </div>

                                                    {/* Duration */}
                                                    <div className="flex gap-2">
                                                        <span className="text-text ">Duration:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">
                                                            {`${(flightSegment?.FlightDuration).split(":")[0]} hr ${(flightSegment?.FlightDuration).split(":")[1]} min ` || "N/A"}
                                                        </span>
                                                    </div>

                                                    {/* PNR */}
                                                    <div className="flex gap-2">
                                                        <span className="text-text ">PNR:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">{bookingInfo?.Id || "N/A"}</span>
                                                    </div>

                                                    {/* Baggage */}
                                                    <div className="flex gap-2">
                                                        <span className="text-text ">Baggage:</span>
                                                        <span className="border-b-2 border-dashed border-primary font-semibold">{flightSegment?.FreeBaggages || "N/A"}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                </div>

                                {/* Price Details */}
                                <div className="p-5 border-b text-lg">
                                    <h3 className="font-bold text-xl text-primary">Price Details</h3>
                                    <p>
                                        <span >{travelerInfo.PassengerTypeCode} Base Price:</span>{" "}
                                        <span className="font-semibold border-dashed border-b-2 border-primary">
                                            {(
                                                priceInfo[index]?.PassengerFare.BaseFare?.Amount /
                                                priceInfo[index]?.PassengerTypeQuantity?.Quantity
                                            )?.toLocaleString()}{" "}
                                            {priceInfo[index]?.PassengerFare.BaseFare.CurrencyCode || "PKR"}
                                        </span>
                                    </p>
                                    <p>
                                        <span >{travelerInfo.PassengerTypeCode} Taxes:</span>{" "}
                                        <span className=" border-dashed border-b-2 border-primary">
                                            {
                                                priceInfo[index]?.PassengerFare.Taxes?.Tax.map((tax, i) => (
                                                    <div className="pl-3 flex gap-2">
                                                        <p key={i}>{tax.Name}:</p>
                                                        <p className="border-b-2 border-dashed border-primary font-semibold">{(tax.Amount).toLocaleString()} PKR</p>
                                                    </div>

                                                ))
                                            }{" "}
                                        </span>

                                    </p>

                                    <p>
                                        <span>{travelerInfo.PassengerTypeCode} Total Price:</span>{" "}
                                        <span className="border-b-2 border-dashed border-primary font-semibold">
                                            {(
                                                priceInfo[index]?.PassengerFare.TotalFare?.Amount /
                                                priceInfo[index]?.PassengerTypeQuantity?.Quantity
                                            )?.toLocaleString()}{" "}
                                            {priceInfo[index]?.PassengerFare.TotalFare.CurrencyCode || "PKR"}
                                        </span>

                                    </p>
                                </div>

                                {/* Fare Conditions */}
                                <div className="p-5 ">
                                    <h3 className="font-bold text-xl text-primary">Fare Conditions</h3>
                                    <ul className="list-disc  ml-5 text-text">
                                        <li>Cancellation charges as per airline rules.</li>
                                        <li>Date change charges as applicable.</li>
                                        <li><strong>E-Ticket Notice:</strong> Terms & conditions apply.</li>
                                        <li><strong>Check-in Time:</strong> Domestic - 1 hour, International - 3 hours.</li>
                                        <li><strong>Passport/Visa/Health:</strong> Ensure valid documents.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="p-5 text-center">
                                <Button
                                    text={"Download PDF"}
                                    icon={<MdDownload />}
                                    onClick={() => downloadPDF(index)}
                                    className=""
                                >

                                </Button>
                            </div>
                        </div>

                    </>
                );
            })}
        </div>
    );
};

export default Finalticket;
