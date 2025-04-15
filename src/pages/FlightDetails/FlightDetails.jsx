import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaPlane } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";

import { iranianCities } from "../../data/iranianCities";
import { countries } from "../../data/countriesData";

import { FaPlaneDeparture } from "react-icons/fa6";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Button,
  SecondaryButton,
  Spinner,
  Select,
  Input,
} from "../../components/components";
import toast, { Toaster } from "react-hot-toast";

const titleOptions = [
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Other", value: "Other" },
];

const passengerOptions = [
  { label: "Adult", value: "ADT" },
  { label: "Child", value: "CHD" },
  { label: "Infant", value: "INF" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please select title"),
  firstName: Yup.string().required("Please enter first name"),
  lastName: Yup.string().required("Please enter last name"),
  email: Yup.string().required("Please enter email"),
  phoneNumber: Yup.string().required("Please enter phone number"),
  mobileNumber: Yup.string().required("Please enter mobile number"),
  country: Yup.string().required("Please select country"),
  city: Yup.string().required("Please select city"),
  dateOfBirth: Yup.string().required("Please select date of birth"),
  passengerType: Yup.string().required("Please select passenger type"),
  gender: Yup.string().required("Please select gender"),
  passportNumber: Yup.string().required("Please enter valid passport number"),
  passportExpDate: Yup.string().required("Please select exp data of passport"),
});

const FlightDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: titleOptions[0].value,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    mobileNumber: "",
    country: countries[0].value,
    city: "",
    dateOfBirth: "",
    passengerType: passengerOptions[0].value,
    gender: genderOptions[0].value,
    passportNumber: "",
    passportExpDate: "",
  };

  const handleSubmit = (values) => {
    // searchFlightHandler(values);
  };

  const flightSegment =
    flightData &&
    flightData.AirItinerary.OriginDestinationOptions[0].FlightSegment[0];

  useEffect(() => {
    if (location.state) {
      setFlightData(location.state.data);
    }
  }, [location.state]);

  if (!flightData) {
    return <Spinner className={"text-primary"} />;
  }

  const {
    AirItinerary: { OriginDestinationOptions },
    AirItineraryPricingInfo: { ItinTotalFare, PTC_FareBreakdowns },
    Currency,
  } = flightData;

  const renderPassengerDetails = () => {
    return (
      <>
        {PTC_FareBreakdowns.map((passenger, index) => (
          <div
            key={index}
            className="flex flex-wrap gap-3 py-3 border-b border-slate-200 items-center justify-between"
          >
            <h2 className="text-sm font-semibold text-slate-600 flex items-center justify-center gap-1">
              <span className="text-primary">
                <FaUser />
              </span>
              <span>
                {passenger.PassengerTypeQuantity.Quantity}{" "}
                {passenger.PassengerTypeQuantity.Code}
              </span>
            </h2>
            <h2 className="text-sm font-semibold text-slate-500 flex items-center justify-center gap-1">
              <span className="text-primary">
                <FaMoneyBillAlt />
              </span>
              <span>Base Fare: {passenger.PassengerFare.BaseFare.Amount}</span>
            </h2>
            <h2 className="text-sm font-semibold text-slate-500 flex items-center justify-center gap-1">
              <span className="text-primary">
                <FaMoneyBillAlt />
              </span>
              <span>
                Taxes:{" "}
                {passenger.PassengerFare.Taxes.Tax.reduce(
                  (total, tax) => total + tax.Amount,
                  0
                )}
              </span>
            </h2>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">
        <CardLayoutContainer className={"mb-5"}>
          <CardLayoutHeader
            heading={"Flight Details"}
            className={"flex items-center flex-wrap gap-5 justify-between"}
          >
            <div>
              <div className="flex items-center justify-center gap-5">
                <h2 className="text-xl font-semibold text-text">
                  {flightSegment.DepartureAirport.Terminal} (
                  {flightSegment.DepartureAirport.LocationCode})
                </h2>
                <div className="w-[24px] bg-primary rounded-full h-[2px]"></div>
                <FaPlane className="text-primary" />
                <div className="w-[24px] bg-primary rounded-full h-[2px]"></div>
                <h2 className="text-xl font-semibold text-text">
                  {flightSegment.ArrivalAirport.Terminal} (
                  {flightSegment.ArrivalAirport.LocationCode})
                </h2>
              </div>
            </div>
          </CardLayoutHeader>
          <CardLayoutBody>
            <div className="flex flex-wrap gap-5 justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Departure Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Date: {flightSegment.DepartureDate}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Time: {flightSegment.DepartureTime}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Arrival Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Date: {flightSegment.ArrivalDate}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Time: {flightSegment.ArrivalTime}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Flight Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Flight Number:
                  {flightSegment.FlightNumber}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Flight Duration:
                  {flightSegment.FlightDuration}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Airline Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Airline Code: {flightSegment.OperatingAirline.Code}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Equipment: {flightSegment.Equipment.AirEquipType}
                </h2>
              </div>
            </div>
          </CardLayoutBody>
        </CardLayoutContainer>

        <div className="flex gap-5 mb-5">
          <CardLayoutContainer className={"flex  flex-col flex-[2]"}>
            <CardLayoutHeader heading={"Pricing Details"} />
            <CardLayoutBody removeBorder={true}>
              <div className="w-full flex flex-col">
                {renderPassengerDetails()}
              </div>
            </CardLayoutBody>
          </CardLayoutContainer>

          <CardLayoutContainer className={"flex  flex-col flex-[1]"}>
            <CardLayoutHeader heading={"Baggage"} />
            <CardLayoutBody removeBorder={true}>
              <div className="flex flex-col">
                {flightSegment.FreeBaggages &&
                  flightSegment.FreeBaggages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-wrap gap-3 py-3 border-b border-slate-200 items-center justify-between"
                      >
                        <h2 className="text-sm font-semibold text-slate-600 flex  items-center justify-center gap-1">
                          <span className="text-primary">
                            <FaUser />
                          </span>
                          <span>Type:{item.PassengerType}</span>
                        </h2>
                        <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                          <span className="text-primary">
                            <FaSuitcase />
                          </span>
                          <span>
                            Baggage {item.Quantity} {item.Unit}
                          </span>
                        </h2>
                      </div>
                    );
                  })}
              </div>
            </CardLayoutBody>
          </CardLayoutContainer>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div>
            <SecondaryButton
              text="Cancel Booking"
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </div>
          <div>
            <Button
              text="Continue Booking"
              onClick={() => {
                navigate("/dashboard/travelers-details", {
                  state: location.state,
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
