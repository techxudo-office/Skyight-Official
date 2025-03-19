import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "../../components/components";
import { IoMdAirplane } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

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
    
        // Force element width to 1300px before capturing
        ticketElement.style.width = "1000px";
    
        // Capture the element with forced width
        const canvas = await html2canvas(ticketElement, { 
            scale: 2,
            scrollX: 0, 
            scrollY: 0 
        });
    
        // Convert 1300px to mm (1px ≈ 0.264583mm)
        const pdfWidth = 1000 ;  
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
        // Create PDF with exact element width
        const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
    
        // Convert canvas to PNG
        const imgData = canvas.toDataURL("image/png");
    
        // Add image to PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`ticket_traveler_${index + 1}.pdf`);
    
        // Reset element width after capturing
        ticketElement.style.width = "";
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
                                    <div className="overflow-x-auto">
                                        <table className="min-w-[600px] md:min-w-[750px] lg:w-[1000px]">
                                            <thead>
                                                <tr className="bg-background text-left text-xs md:text-sm">
                                                    <th className="p-2">Airline</th>
                                                    <th className="p-2">Depart</th>
                                                    <th className="p-2">Arrive</th>
                                                    <th className="p-2">Type</th>
                                                    <th className="p-2">Duration</th>
                                                    <th className="p-2">PNR</th>
                                                    <th className="p-2">Baggage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {originDestinationOptions.map((option, optionIndex) =>
                                                    option.FlightSegment.map((flightSegment, segmentIndex) => (
                                                        <tr key={`${optionIndex}-${segmentIndex}`} className="text-xs md:text-sm">
                                                            <td className="p-2 flex items-center gap-2">
                                                                <span>{flightSegment?.OperatingAirline?.Code}</span>
                                                                {flightSegment?.FlightNumber}
                                                            </td>
                                                            <td className="p-2">
                                                                {flightSegment?.DepartureAirport?.LocationCode} ({flightSegment?.DepartureAirport?.Terminal}) <br />
                                                                {flightSegment?.DepartureDate} {flightSegment?.DepartureTime}
                                                            </td>
                                                            <td className="p-2">
                                                                {flightSegment?.ArrivalAirport?.LocationCode} ({flightSegment?.ArrivalAirport?.Terminal}) <br />
                                                                {flightSegment?.ArrivalDate} {flightSegment?.ArrivalTime}
                                                            </td>
                                                            <td className="p-2">{travelerInfo.PassengerTypeCode}</td>
                                                            <td className="p-2">{`${(flightSegment?.FlightDuration).split(":")[0]} hr ${(flightSegment?.FlightDuration).split(":")[1]} min ` || "N/A"}</td>
                                                            <td className="p-2">{bookingInfo?.Id || "N/A"}</td>
                                                            <td className="p-2">{flightSegment?.FreeBaggages || "N/A"}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Price Details */}
                                <div className="p-5 border-b text-lg">
                                    <h3 className="font-bold text-xl text-primary">Price Details</h3>
                                    <p>
                                        <strong>{travelerInfo.PassengerTypeCode} Base Price:</strong>{" "}
                                        {(
                                            priceInfo[index]?.PassengerFare.BaseFare?.Amount /
                                            priceInfo[index]?.PassengerTypeQuantity?.Quantity
                                        )?.toLocaleString()}{" "}
                                        {priceInfo[index]?.PassengerFare.BaseFare.CurrencyCode || "IRR"}
                                    </p>
                                    <p>
                                        <strong>{travelerInfo.PassengerTypeCode} Total Price:</strong>{" "}
                                        {(
                                            priceInfo[index]?.PassengerFare.TotalFare?.Amount /
                                            priceInfo[index]?.PassengerTypeQuantity?.Quantity
                                        )?.toLocaleString()}{" "}
                                        {priceInfo[index]?.PassengerFare.TotalFare.CurrencyCode || "IRR"}
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
                                <button
                                    onClick={() => downloadPDF(index)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                                >
                                    Download PDF
                                </button>
                            </div>
                        </div>

                    </>
                );
            })}
        </div>
    );
};

export default Finalticket;
