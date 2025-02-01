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
import axios from "axios";
import { getToken, baseUrl } from "../../utils/api_handler";

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

  // const downloadHandler = () => {
  //   // alert("download handler");
  //   downloadAsPDF();
  // };

  const downloadHandler = async () => {
    try {
      // Replace with actual PNR value
      const pnrData = pnr;

      // Make POST request
      const response = await axios.post(
        `${baseUrl}/api/booking-pnr`,
        {
          headers: {
            Authorization: getToken(),
          },
        },
        pnrData
      );

      console.log("API Response:", response);

      // If API call is successful, proceed with PDF download
      await downloadAsPDF();
    } catch (error) {
      toast.error("Something went wrong!")
      console.error("Error sending PNR:", error);
    }
  };

  const [ticketData, setTicketData] = useState([]);
  const [pnr, setPnr] = useState("")

  const getBookingDetailsHandler = async (id) => {
    const response = await getBookingDetails(id);
    console.log(response.data.booking_reference_id);
    if (response.status) {
      setTicketData(response.data);
      setPnr(response.data.booking_reference_id)
    }
  };

  useEffect(() => {
    if (location.state) {
      const refId = location.state;
      // console.log(location)
      getBookingDetailsHandler(refId);
    }
  }, []);

  // const flightSegment =
  //   ticketData?.AirReservation?.AirItinerary?.OriginDestinationOptions?.[0]
  //     ?.FlightSegment?.[0];

  // if (!flightSegment) {
  //   return <Spinner className="text-primary" />;
  // }

  // const {
  //   PriceInfo: { ItinTotalFare, PTC_FareBreakDowns },
  //   TravelerInfo,
  //   bookingReferenceID,
  // } = ticketData.AirReservation;

  return (
    <>
      <Toaster />
      {/* <h1>
        {ticketData.booking_reference_id}
      </h1> */}

      <div ref={printRef} className="w-full flex flex-col gap-5">
        <CardLayoutContainer>
          <CardLayoutHeader
            // bookingReferenceID.Id
            heading={`Booking Reference: ${ticketData.booking_reference_id}`}
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
        </CardLayoutContainer>

        {/* <CardLayoutContainer>
          <CardLayoutHeader heading="Pricing Details" />
          <CardLayoutBody>{renderPassengerDetails()}</CardLayoutBody>
          <CardLayoutFooter>
            <h2 className="text-xl font-semibold text-slate-600">
              Total Fare: {ItinTotalFare.TotalFare.Amount}
            </h2>
          </CardLayoutFooter>
        </CardLayoutContainer> */}

        {/* <CardLayoutContainer>
          <CardLayoutHeader heading="Traveler Information" />
          <CardLayoutBody>{renderTravelerInfo()}</CardLayoutBody>
        </CardLayoutContainer>  */}

        <CardLayoutContainer>
          <CardLayoutHeader heading="Traveler Information" />
          {/* <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center justify-center gap-10 ">
              <h2 className="text-xl font-semibold text-primary mb-2 ml-4">
                Booking Reference Id
              </h2>
              <p>{ticketData.booking_reference_id}</p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center justify-center gap-10 ">
              <h2 className="text-xl font-semibold text-primary mb-2 ml-4">
                Booking Reference Id
              </h2>
            </div>
          </div> */}

          <CardLayoutBody>
            {ticketData?.passengers?.map((item, index) => (
              <div key={index} className="passenger-card ml-10">
                <h3>
                  <strong>Full Name: </strong>
                  {item.given_name} {item.surname}
                </h3>
                <p>
                  <strong>Nationality:</strong> {item.nationality}
                </p>
                <p>
                  <strong>Birth Date:</strong> {item.birth_date}
                </p>
                <p>
                  <strong>Document ID:</strong> {item.doc_id}
                </p>
                <p>
                  <strong>Document Type:</strong> {item.doc_type}
                </p>
                <p>
                  <strong>Issued Country:</strong> {item.doc_issue_country}
                </p>
                <p>
                  <strong>Phone:</strong> {item.phone_number}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
              </div>
            ))}
          </CardLayoutBody>
        </CardLayoutContainer>

        <CardLayoutContainer>
          <CardLayoutHeader heading="Fligh Information" />
          <CardLayoutBody>
            {ticketData?.flightSegments?.map((item, index) => (
              <div key={index} className="passenger-card ml-10">
                <h3>
                  <strong>Flight Number: </strong>
                  {item.flight_number}
                </h3>
                <p>
                  <strong>Arrival Airport:</strong> {item.arrival_airport}
                </p>
                <p>
                  <strong>Arrival Time:</strong> {item.arrival_datetime}
                </p>
                <p>
                  <strong>Departure Airport:</strong> {item.departure_airport}
                </p>
                <p>
                  <strong>Departure Time:</strong> {item.departure_datetime}
                </p>
              </div>
            ))}
            <p className="ml-10">
              <strong>Destination:</strong> {ticketData.destination}
            </p>
            <p className="ml-10">
              <strong>Origin:</strong> {ticketData.origin}
            </p>
          </CardLayoutBody>
        </CardLayoutContainer>
        <CardLayoutContainer>
          <CardLayoutHeader heading="Price Information" />
          <CardLayoutBody>
            <p>
              <strong>Total Fare:</strong> {ticketData.total_fare}
            </p>
          </CardLayoutBody>
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
