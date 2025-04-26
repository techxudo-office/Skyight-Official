import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button, CustomTooltip, Spinner } from "../../components/components";
import { IoMdAirplane } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import { getPNR } from "../../_core/features/bookingSlice";

const Finalticket = ({ downloadFromParent, id }) => {


    const ticketRefs = useRef([]);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(null);
    const [downloadingAll, setDownloadingAll] = useState(false);

    const { pnrData } = useSelector((state) => state.booking);
    const { userData } = useSelector((state) => state.auth);

    const travelers = pnrData?.AirReservation?.TravelerInfo || [];
    const originDestinationOptions = pnrData?.AirReservation?.AirItinerary?.OriginDestinationOptions || [];
    const priceInfo = travelers.map((passenger, i) => {
        let pricing = pnrData?.AirReservation?.PriceInfo?.PTC_FareBreakDowns.filter((item) => (item.PassengerTypeQuantity.Code == passenger.PassengerTypeCode));
        return pricing[0];
    });

    const bookingInfo = pnrData?.AirReservation?.bookingReferenceID;

    // Function to download a specific ticket as a PDF
    const downloadPDF = async (index) => {
        setLoading(index); // Set loader for the specific ticket

        const ticketElement = ticketRefs.current[index];
        if (!ticketElement) return;

        try {
            // Capture the element with forced width
            const canvas = await html2canvas(ticketElement, {
                scale: 2,
            });

            // Convert 1300px to mm (1px ≈ 0.264583mm)
            const pdfWidth = 400;
            const pdfHeight = (canvas.height * pdfWidth) / 800;

            // Create PDF with exact element width
            const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);

            // Convert canvas to PNG
            const imgData = canvas.toDataURL("image/png");

            // Add image to PDF
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`ticket_traveler_${index + 1}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setLoading(null); // Remove loader after download
        }
    };

    // Function to download all tickets
    const downloadAllTickets = async () => {
        setDownloadingAll(true);
        try {
            for (let i = 0; i < travelers.length; i++) {
                await downloadPDF(i);
            }
        } catch (error) {
            console.error("Error downloading all tickets:", error);
        } finally {
            setDownloadingAll(false);
        }
    };

    const downloadAllTicketsFromParent = () => {
        dispatch(getPNR({ token: userData.token, id: id })).then(downloadAllTickets)
    }

    // Expose the download function to parent when component mounts
    // useEffect(() => {
    //     if (onDownloadAll) {
    //         onDownloadAll(downloadAllTickets);
    //     }

    //     // Cleanup function to avoid memory leaks
    //     return () => {
    //         if (onDownloadAll) {
    //             onDownloadAll(null);
    //         }
    //     };
    // }, [onDownloadAll]);


    return (
        <>
            {downloadFromParent && (
                <CustomTooltip content={"Allow Download Multiple Files"}>
                    <Button
                        loading={downloadingAll}
                        icon={<MdDownload />}
                        onClick={downloadAllTicketsFromParent}
                    />
                </CustomTooltip>
            )}

            <div className={`md:p-4 w-[1000px] text-text mx-auto max-md:text-sm ${downloadFromParent ? "fixed -top-[9999] -right-[9999px]" : ""}`}>
                {travelers.length > 1 && !downloadFromParent && (
                    <div className="text-center mb-4">
                        <CustomTooltip content={"Allow Download Multiple Files"}>
                            <Button
                                loading={downloadingAll}
                                text={`Download All Tickets (${travelers.length})`}
                                icon={<MdDownload />}
                                onClick={downloadAllTickets}
                            />
                        </CustomTooltip>
                    </div>
                )}

                {travelers.map((travelerInfo, index) => {
                    const traveler = travelerInfo?.PersonName;
                    const ticketInfo = travelerInfo?.ETicketInfos?.[0];
                    const cabinClass = originDestinationOptions[0]?.CabinClass;

                    return (
                        <div key={index} className="mb-8 mx-auto bg-white rounded-lg  shadow-xl border-2  w-[900px]">
                            {/* Ticket Stub */}
                            <div className="bg-primary text-white py-2 px-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <IoMdAirplane className="text-xl" />
                                    <span className="font-bold">E-Ticket</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold">E-Ticket: </span>
                                    {ticketInfo?.ETicketNo || "N/A"}
                                </div>
                            </div>

                            {/* Main Ticket */}
                            <div className="bg-white" ref={(el) => (ticketRefs.current[index] = el)}>
                                {/* Passenger Header */}
                                <div className="bg-gradient-to-r bg-primary border-t border-white text-white p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-2xl font-bold">
                                                {traveler?.NameTitle} {traveler?.GivenName} {traveler?.Surname}
                                            </p>
                                            <p className="text-sm opacity-90">
                                                {travelerInfo.PassengerTypeCode} • {cabinClass === "Y" ? "ECONOMY" : cabinClass === "J" ? "BUSINESS" : cabinClass === "F" ? "FIRST CLASS" : cabinClass}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold">{bookingInfo?.Id || "N/A"}</p>
                                            <p className="text-sm opacity-90">BOOKING REFERENCE</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Flight Details */}
                                <div className="p-5 grid grid-cols-2 gap-4 border-b">
                                    {originDestinationOptions.map((option, optionIndex) =>
                                        option.FlightSegment.map((flightSegment, segmentIndex) => (
                                            <React.Fragment key={`${optionIndex}-${segmentIndex}`}>
                                                <div className="col-span-2 mb-4">
                                                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                                        <div className="text-center">
                                                            <p className="text-3xl font-bold">{flightSegment?.DepartureAirport?.LocationCode}</p>
                                                            <p className="text-sm text-gray-600">Departure</p>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className="flex items-center gap-2 text-5xl">
                                                                <div className="h-[2px] w-32 bg-primary"></div>
                                                                <IoMdAirplane className="text-primary transform rotate-90" />
                                                                <div className="h-[2px] w-32 bg-primary"></div>
                                                            </div>
                                                            <p className=" text-gray-500 mt-1">
                                                                {`${flightSegment?.FlightDuration.split(":")[0]}h ${flightSegment?.FlightDuration.split(":")[1]}m`}
                                                            </p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-3xl font-bold">{flightSegment?.ArrivalAirport?.LocationCode}</p>
                                                            <p className="text-sm text-gray-600">Arrival</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-lg text-gray-500">AIRLINE</p>
                                                        <p className="font-semibold">{flightSegment?.OperatingAirline?.Code} {flightSegment?.FlightNumber}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg text-gray-500">DEPARTS</p>
                                                        <p className="font-semibold">{flightSegment?.DepartureDate} at {flightSegment?.DepartureTime}</p>
                                                        <p className="text-sm">Terminal: {flightSegment?.DepartureAirport?.Terminal || "N/A"}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-lg text-gray-500">FLIGHT DATE</p>
                                                        <p className="font-semibold">{flightSegment?.DepartureDate}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg text-gray-500">ARRIVES</p>
                                                        <p className="font-semibold">{flightSegment?.ArrivalDate} at {flightSegment?.ArrivalTime}</p>
                                                        <p className="text-sm">Terminal: {flightSegment?.ArrivalAirport?.Terminal || "N/A"}</p>
                                                    </div>
                                                </div>

                                                <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
                                                    <div>
                                                        <p className="text-lg text-gray-500">BAGGAGE</p>
                                                        <p className="font-semibold">{flightSegment?.FreeBaggages || "N/A"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg text-gray-500">SEAT</p>
                                                        <p className="font-semibold">-</p>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))
                                    )}
                                </div>

                                {/* Price Section */}
                                <div className="p-5 bg-gray-50">
                                    <h3 className="font-bold text-lg text-primary mb-3">FARE DETAILS</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <p className="text-lg text-gray-500">BASE FARE</p>
                                            <p className="font-bold">
                                                {(
                                                    priceInfo[index]?.PassengerFare.BaseFare?.pkrBaseFare /
                                                    priceInfo[index]?.PassengerTypeQuantity?.Quantity
                                                )?.toLocaleString()} {priceInfo[index]?.PassengerFare.BaseFare.CurrencyCode || "PKR"}
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <p className="text-lg text-gray-500">TAXES & FEES</p>
                                            <p className="font-bold">
                                                {priceInfo[index]?.PassengerFare.Taxes?.Tax.reduce((sum, tax) => sum + tax.pkrAmount, 0)?.toLocaleString()} PKR
                                            </p>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-lg shadow-sm">
                                            <p className="text-lg text-primary">TOTAL</p>
                                            <p className="font-bold text-blue-700">
                                                {(
                                                    priceInfo[index]?.PassengerFare.TotalFare?.pkrTotalFare /
                                                    priceInfo[index]?.PassengerTypeQuantity?.Quantity
                                                )?.toLocaleString()} {priceInfo[index]?.PassengerFare.TotalFare.CurrencyCode || "PKR"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-4 bg-gray-100 text-center text-lg text-gray-600 border-t">
                                    <p>Please check in at least 2 hours before departure for domestic flights</p>
                                    <p>and 3 hours for international flights. Have a pleasant journey!</p>
                                </div>
                            </div>

                            {/* Download Button (unchanged) */}
                            <div className="p-4 text-center bg-gray-50 border-t">
                                <Button
                                    loading={loading === index}
                                    text={"Download E-Ticket"}
                                    icon={<MdDownload />}
                                    onClick={() => downloadPDF(index)}
                                    className="bg-primary hover:bg-blue-700 text-white"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Finalticket;