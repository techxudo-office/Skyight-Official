import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button, CustomTooltip, Spinner } from "../../components/components";
import { IoIosAirplane, IoMdAirplane } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import { getPNR } from "../../_core/features/bookingSlice";
import dayjs from "dayjs";

const Finalticket = ({ downloadFromParent, id }) => {
  const ticketRefs = useRef([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const { pnrData } = useSelector((state) => state.booking);
  const { userData } = useSelector((state) => state.auth);

  const travelers = pnrData?.AirReservation?.TravelerInfo || [];
  const originDestinationOptions =
    pnrData?.AirReservation?.AirItinerary?.OriginDestinationOptions || [];
  const priceInfo = travelers.map((passenger, i) => {
    let pricing = pnrData?.AirReservation?.PriceInfo?.PTC_FareBreakDowns.filter(
      (item) => item.PassengerTypeQuantity.Code == passenger.PassengerTypeCode
    );
    return pricing[0];
  });

  const bookingInfo = pnrData?.AirReservation?.bookingReferenceID;

  // Function to download a specific ticket as a PDF
  const downloadPDF = async (index) => {
    setLoading(index);
    const ticketElement = ticketRefs.current[index];
    if (!ticketElement) return;

    const originalStyles = {
      width: ticketElement.style.width,
      overflow: ticketElement.style.overflow,
    };

    try {
      // Force consistent dimensions
      ticketElement.style.width = "900px"; // Match your ticket's actual width
      ticketElement.style.overflow = "visible";

      const canvas = await html2canvas(ticketElement, {
        scale: 3, // Increase scale for better quality
        logging: true,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: ticketElement.scrollWidth,
        windowHeight: ticketElement.scrollHeight,
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`ticket_traveler_${index + 1}.pdf`);
    } finally {
      // Restore original styles
      ticketElement.style.width = originalStyles.width;
      ticketElement.style.overflow = originalStyles.overflow;
      setLoading(null);
    }
  };

  // Function to download all tickets
  const downloadAllTickets = async () => {
    setDownloadingAll(true);
    try {
      for (let i = 0; i < travelers.length; i++) {
        await downloadPDF(i);
      }
    } finally {
      setDownloadingAll(false);
    }
  };

  const downloadAllTicketsFromParent = () => {
    dispatch(getPNR({ token: userData.token, id: id })).then(
      downloadAllTickets
    );
  };

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

      <div
        className={`md:p-4 w-[1000px] text-text mx-auto max-md:text-sm ${
          downloadFromParent ? "fixed -top-[9999] -right-[9999px]" : ""
        }`}
      >
        {travelers.length > 1 && !downloadFromParent && (
          <div className="mb-4 text-center">
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
            <div
              key={index}
              className="mb-8 mx-auto bg-white rounded-lg  shadow-xl border-2  w-[900px]"
            >
              {/* Ticket Stub */}
              <div className="flex items-center justify-end gap-4 px-4 py-2 text-white bg-primary">
                <div className="flex items-center gap-2">
                  <IoIosAirplane className="text-xl " />
                  <span className="font-bold">E-Ticket</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold"> </span>
                  {ticketInfo?.ETicketNo || "N/A"}
                </div>
              </div>

              {/* Main Ticket */}
              <div
                className="bg-white"
                ref={(el) => (ticketRefs.current[index] = el)}
              >
                {/* Passenger Header */}
                <div className="p-4 text-white border-t border-white bg-gradient-to-r bg-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {traveler?.NameTitle} {traveler?.GivenName}{" "}
                        {traveler?.Surname}
                      </p>
                      <p className="text-sm opacity-90">
                        {travelerInfo.PassengerTypeCode} •{" "}
                        {cabinClass === "Y"
                          ? "ECONOMY"
                          : cabinClass === "J"
                          ? "BUSINESS"
                          : cabinClass === "F"
                          ? "FIRST CLASS"
                          : cabinClass}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        {bookingInfo?.Id || "N/A"}
                      </p>
                      <p className="text-sm opacity-90">BOOKING REFERENCE</p>
                    </div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="gap-4 p-5 border-b">
                  {originDestinationOptions.map((option, optionIndex) =>
                    option.FlightSegment.map((flightSegment, segmentIndex) => (
                      <React.Fragment key={`${optionIndex}-${segmentIndex}`}>
                        <div className="mb-4 ">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <div className="text-center">
                              <p className="text-3xl font-bold">
                                {flightSegment?.DepartureAirport?.LocationCode}
                              </p>
                              <p className="text-sm text-gray-600">Departure</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-center gap-2 text-5xl">
                                <div className="h-[2px] w-32 bg-primary"></div>
                                <IoIosAirplane className="transform text-primary " />
                                <div className="h-[2px] w-32 bg-primary"></div>
                              </div>
                              <p className="mt-1 text-gray-500 ">
                                {`${
                                  flightSegment?.FlightDuration.split(":")[0]
                                }h ${
                                  flightSegment?.FlightDuration.split(":")[1]
                                }m`}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-3xl font-bold">
                                {flightSegment?.ArrivalAirport?.LocationCode}
                              </p>
                              <p className="text-sm text-gray-600">Arrival</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-col justify-between gap-6">
                            <div>
                              <p className="text-lg text-gray-500">AIRLINE</p>
                              <p className="font-semibold">
                                {flightSegment?.OperatingAirline?.Code}{" "}
                                {flightSegment?.FlightNumber}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-gray-500">DEPARTS</p>
                              <p className="font-semibold">
                                {dayjs(flightSegment?.DepartureDate).format(
                                  "DD MMM YYYY"
                                ) || "N/A"}{" "}
                                at {flightSegment?.DepartureTime}
                              </p>
                              <p className="">
                                Terminal:{" "}
                                {flightSegment?.DepartureAirport?.Terminal ||
                                  "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-gray-500">
                                {travelerInfo?.Document.DocType === "N"
                                  ? "NATIONAL ID"
                                  : "PASSPORT"}
                              </p>
                              <p className="font-semibold">
                                {travelerInfo?.Document.DocID}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between gap-6">
                            <div>
                              <p className="text-lg text-gray-500">
                                FLIGHT DATE
                              </p>
                              <p className="font-semibold">
                                {flightSegment?.DepartureDate}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-gray-500">ARRIVES</p>
                              <p className="font-semibold">
                                {dayjs(flightSegment?.ArrivalDate).format(
                                  "DD MMM YYYY"
                                ) || "N/A"}{" "}
                                at {flightSegment?.ArrivalTime}
                              </p>
                              <p className="">
                                Terminal:{" "}
                                {flightSegment?.ArrivalAirport?.Terminal ||
                                  "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-gray-500">
                                NATIONALITY
                              </p>
                              <p className="font-semibold">
                                {travelerInfo?.Document.Nationality || "-"}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between gap-6">
                            <div>
                              <p className="text-lg text-gray-500">BAGGAGE</p>
                              <p className="font-semibold">
                                {flightSegment?.FreeBaggages || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg text-gray-500">SEAT</p>
                              <p className="font-semibold">-</p>
                            </div>
                            <div>
                              <p className="pt-5 text-lg text-gray-500">
                                EXPIRE DATE
                              </p>
                              <p className="font-semibold">
                                {travelerInfo?.Document.ExpireDate || "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))
                  )}
                </div>

                {/* Price Section */}
                <div className="p-5 bg-gray-50">
                  <h3 className="mb-3 text-lg font-bold text-primary">
                    FARE DETAILS
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-lg text-gray-500">BASE FARE</p>
                      <p className="font-bold">
                        {priceInfo[
                          index
                        ]?.PassengerFare.BaseFare?.pkrBaseFare?.toLocaleString()}{" "}
                        {priceInfo[index]?.PassengerFare.BaseFare
                          .CurrencyCode || "PKR"}
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-lg text-gray-500">TAXES & FEES</p>
                      <p className="font-bold">
                        {priceInfo[index]?.PassengerFare.Taxes?.Tax.reduce(
                          (sum, tax) => sum + tax.pkrAmount,
                          0
                        )?.toLocaleString()}{" "}
                        PKR
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg shadow-sm">
                      <p className="text-lg text-primary">TOTAL</p>
                      <p className="font-bold text-primary">
                        {(
                          priceInfo[index]?.PassengerFare.TotalFare
                            ?.pkrTotalFare /
                          priceInfo[index]?.PassengerTypeQuantity.Quantity
                        )?.toLocaleString()}{" "}
                        {priceInfo[index]?.PassengerFare.TotalFare
                          .CurrencyCode || "PKR"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 text-sm text-center text-gray-600 bg-gray-100 border-t">
                  <p>
                    Please check in at least 2 hours before departure for
                    domestic flights
                  </p>
                  <p>
                    and 3 hours for international flights. Have a pleasant
                    journey!
                  </p>
                </div>
              </div>

              {/* Download Button (unchanged) */}
              <div className="p-4 text-center border-t bg-gray-50">
                <Button
                  loading={loading === index}
                  text={"Download E-Ticket"}
                  icon={<MdDownload />}
                  onClick={() => downloadPDF(index)}
                  className="text-white bg-primary hover:bg-blue-700"
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
