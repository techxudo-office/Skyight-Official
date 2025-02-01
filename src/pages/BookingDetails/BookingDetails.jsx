import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { FaPlane, FaUser, FaSuitcase, FaMoneyBillAlt } from "react-icons/fa";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Button, Spinner, SecondaryButton } from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookingDetails } from "../../utils/api_handler";

const TicketDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const printRef = useRef();

  const downloadAsPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
  };

  const printHandler = () => {
    window.print();
  };

  const downloadHandler = () => {
    // alert("download handler");
    downloadAsPDF();
  };

  const [ticketData, setTicketData] = useState([]);

  const getBookingDetailsHandler = async (id) => {
    const response = await getBookingDetails(id);
    console.log(response.data)
    if (response.status) {
      setTicketData(response.data);
    }
  };

  useEffect(() => {
    if (location.state) {
      const refId = location.state;
      // console.log(location)
      getBookingDetailsHandler(refId);
    }
  }, []);

 

  const flightSegment =
    ticketData?.AirReservation?.AirItinerary?.OriginDestinationOptions?.[0]
      ?.FlightSegment?.[0];

  if (!flightSegment) {
    return <Spinner className="text-primary" />;
  }

  const {
    PriceInfo: { ItinTotalFare, PTC_FareBreakDowns },
    TravelerInfo,
    bookingReferenceID,
  } = ticketData.AirReservation;

  const renderPassengerDetails = () =>
    PTC_FareBreakDowns.map((passenger, index) => (
      <div
        key={index}
        className="flex flex-wrap gap-3 py-3 border-b border-slate-200 items-center justify-between"
      >
        <h2 className="text-sm font-semibold text-slate-600 flex items-center gap-1">
          <FaUser className="text-primary" />
          {passenger.PassengerTypeQuantity.Quantity}{" "}
          {passenger.PassengerTypeQuantity.Code}
        </h2>
        <h2 className="text-sm font-semibold text-slate-500 flex items-center gap-1">
          <FaMoneyBillAlt className="text-primary" />
          Base Fare: {passenger.PassengerFare.BaseFare.Amount}
        </h2>
        <h2 className="text-sm font-semibold text-slate-500 flex items-center gap-1">
          <FaMoneyBillAlt className="text-primary" />
          Taxes:{" "}
          {passenger.PassengerFare.Taxes.Tax.reduce(
            (total, tax) => total + tax.Amount,
            0
          )}
        </h2>
      </div>
    ));

  const renderTravelerInfo = () =>
    TravelerInfo.map((traveler, index) => (
      <div
        key={index}
        className="flex flex-wrap gap-3 py-3 border-b border-slate-200 items-center justify-between"
      >
        <h2 className="text-sm font-semibold text-slate-600 flex items-center gap-1">
          <FaUser className="text-primary" />
          {traveler.PersonName.NameTitle} {traveler.PersonName.GivenName}{" "}
          {traveler.PersonName.Surname}
        </h2>
        <h2 className="text-sm font-semibold text-slate-500">
          Passport: {traveler.Document.DocID || "N/A"}
        </h2>
        <h2 className="text-sm font-semibold text-slate-500">
          E-Ticket No: {traveler.ETicketInfos[0]?.ETicketNo || "Not Available"}
        </h2>
      </div>
    ));

  return (
    <>
      <Toaster />
      <div ref={printRef} className="w-full flex flex-col gap-5">
        <CardLayoutContainer>
          <CardLayoutHeader
            heading={`Booking Reference: ${bookingReferenceID.Id}`}
            className={"flex items-center justify-between"}
          >
            <div className="flex flex-wrap gap-2">
              <div>
                <Button
                  id={"hide-buttons"}
                  onClick={printHandler}
                  text={"Print Ticket"}
                />
              </div>
              <div>
                <Button
                  id={"hide-buttons"}
                  onClick={downloadHandler}
                  text={"Download"}
                />
              </div>
            </div>
          </CardLayoutHeader>
          <CardLayoutBody>
            <div className="flex items-center justify-between flex-wrap gap-5">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Departure
                </h2>
                <p>
                  {flightSegment.DepartureAirport.Terminal} (
                  {flightSegment.DepartureAirport.LocationCode})
                </p>
                <p>{flightSegment.DepartureDateTime}</p>
              </div>
              <FaPlane className="text-primary text-2xl" />
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Arrival
                </h2>
                <p>
                  {flightSegment.ArrivalAirport.Terminal} (
                  {flightSegment.ArrivalAirport.LocationCode})
                </p>
                <p>{flightSegment.ArrivalDateTime}</p>
              </div>
            </div>
          </CardLayoutBody>
        </CardLayoutContainer>

        <CardLayoutContainer>
          <CardLayoutHeader heading="Pricing Details" />
          <CardLayoutBody>{renderPassengerDetails()}</CardLayoutBody>
          <CardLayoutFooter>
            <h2 className="text-xl font-semibold text-slate-600">
              Total Fare: {ItinTotalFare.TotalFare.Amount}
            </h2>
          </CardLayoutFooter>
        </CardLayoutContainer>

        <CardLayoutContainer>
          <CardLayoutHeader heading="Traveler Information" />
          <CardLayoutBody>{renderTravelerInfo()}</CardLayoutBody>
        </CardLayoutContainer>

        <div className="flex items-center justify-end gap-3">
          <div>
            <Button
              id={"hide-buttons"}
              text="Go Back"
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
