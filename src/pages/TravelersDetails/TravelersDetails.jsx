import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronCircleUp, FaUser, FaPlaneDeparture, FaChevronCircleDown } from "react-icons/fa";
import { MdAdd, MdArrowBack, MdArrowForward, MdCancel, MdCheck } from "react-icons/md";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { countries } from "../../data/countriesData";
import { iranianCities } from "../../data/iranianCities";
import { travelerDetailScehma } from "../../validations";
import { getTravelers } from "../../_core/features/bookingSlice";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody
} from "../../components/CardLayout/CardLayout";
import {
  Button, SecondaryButton, Spinner, Select, Input, CustomDate,
  FlightInfoCard, PriceSummary, ConfirmModal, TravelersQuantity,
  PopupMessage, CustomTooltip
} from "../../components/components";

const titleOptions = [
  { label: "Mr", value: "MR" },
  { label: "Mrs", value: "MS" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const TravelersDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth);
  const { travelers, isLoadingTravelers } = useSelector((state) => state.booking);

  const [flightData, setFlightData] = useState(null);
  const [travelersData, setTravelersData] = useState(null);
  const [pricingInfo, setPricingInfo] = useState(null);
  const [docType, setDocType] = useState(null);
  const [allTravelersData, setAllTravelersData] = useState(JSON.parse(localStorage.getItem("allFormData")) || []);
  const [disableAddTraveler, setDisableAddTraveler] = useState(JSON.parse(localStorage.getItem("disableTravelers")) || []);
  const [oldTraveller, setOldTraveller] = useState(JSON.parse(localStorage.getItem("oldTraveller")) || []);
  const [isFormValid, setIsFormValid] = useState([]);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [successPopup, setSuccessPopup] = useState({ status: false, message: "", icon: "" });
  const [clickedIndex, setClickedIndex] = useState(null);

  const formikRefs = useRef([]);

  useEffect(() => {
    if (location.state) {
      setFlightData(location.state.data);
      setTravelersData(location.state.travelers);
      setPricingInfo(location.state.pricingInfo);
      setDocType(location.state.doc_type);
    }
  }, [location.state]);

  const handleSubmit = (travelerIndex, values) => {
    const payload = {
      ...values,
      country: docType === "Domestic" ? "IRN" : values.country,
      doc_type: docType === "Domestic" ? "N" : "P",
    };

    setDisableAddTraveler((prev) => [...prev, travelerIndex]);
    setAllTravelersData((prevData) => {
      const updatedData = [...prevData];
      updatedData[travelerIndex] = payload;
      return updatedData;
    });

    setSuccessPopup({ status: true, message: "Traveler Added", icon: <MdCheck className="text-sm text-greenColor" /> });
  };

  const addAllTravelers = () => {
    localStorage.setItem("disableTravelers", JSON.stringify(disableAddTraveler));
    localStorage.setItem("allFormData", JSON.stringify(allTravelersData));
    localStorage.setItem("oldTraveller", JSON.stringify(oldTraveller));

    const totalTraveler = Object.values(travelersData).reduce((a, b) => Number(a) + Number(b), 0);

    if (allTravelersData.length === totalTraveler && allTravelersData.every(Boolean)) {
      navigate("/dashboard/confirm-booking", { state: { flightData, travelersData, allTravelersData } });
    } else {
      setSuccessPopup({ message: "Please fill all the travelers first", status: true });
    }
  };

  const gettingTravellers = (type) => {
    dispatch(getTravelers({ passengerType: type, token: userData?.token })).then(() => {
      const passengerOptions = travelers.map((item) => ({ value: item.email, label: item.email }));
      setPassengers(passengerOptions);
    });
  };

  const handlePassengerForm = (setValues, passenger, travelerIndex) => {
    const formValues = travelers.find((item) => item.email === passenger);
    if (formValues) {
      setOldTraveller((prev) => [...prev, travelerIndex]);
      setValues({
        ...formValues,
        country: docType === "Domestic" ? "IRN" : formValues.country,
        passenger_type: formValues.passenger_type_code,
      });
    }
  };

  if (!flightData || !travelersData) return <Spinner className={"text-primary"} />;

  const travelersDetailsInputs = [
    { type: "select", id: "title", label: "Title", name: "title", options: titleOptions },
    { type: "text", id: "first_name", label: "First Name", name: "first_name" },
    { type: "text", id: "last_name", label: "Last Name", name: "last_name" },
    { type: "email", id: "email", label: "Email", name: "email" },
    { type: "number", id: "telephone", label: "Phone Number", name: "telephone" },
    { type: "number", id: "mobile", label: "Mobile Number", name: "mobile" },
    { type: "select", id: "country", label: "Country", name: "country", options: countries, disabled: docType === "Domestic" },
    { type: "select", id: "city", label: "City", name: "city", options: iranianCities },
    { type: "date", id: "date_of_birth", label: "Date of Birth", name: "date_of_birth", pastDate: true },
    { type: "select", id: "gender", label: "Gender", name: "gender", options: genderOptions },
    { type: "text", id: "passport_number", label: "Passport Number", name: "passport_number" },
    { type: "date", id: "passport_expiry_date", label: "Passport Exp Date", name: "passport_expiry_date", futureDate: true },
  ];

  return (
    <>
      <PopupMessage {...successPopup} onClose={() => setSuccessPopup((prev) => ({ ...prev, status: false }))} />
      <div className="flex flex-col w-full">
        <TravelersQuantity flightSegments={flightData.AirItinerary.OriginDestinationOptions} travelers={travelersData} />
        <div className="flex flex-col w-full lg:flex-row">
          <div className="flex flex-wrap w-full lg:w-2/3">
            {Object.entries(travelersData).flatMap(([key, value]) =>
              Array.from({ length: value }, (_, i) => (
                <TravelerForm
                  key={`${key}-${i}`}
                  index={i}
                  travelertype={key === "adults" ? "ADT" : key === "childs" ? "CHD" : "INF"}
                  docType={docType}
                  formikRefs={formikRefs}
                  travelersDetailsInputs={travelersDetailsInputs}
                  disableAddTraveler={disableAddTraveler}
                  oldTraveller={oldTraveller}
                  handleSubmit={handleSubmit}
                  setClickedIndex={setClickedIndex}
                  setConfirmStatus={setConfirmStatus}
                  gettingTravellers={gettingTravellers}
                  handlePassengerForm={handlePassengerForm}
                  setDisableAddTraveler={setDisableAddTraveler}
                  setOldTraveller={setOldTraveller}
                  travelers={travelers}
                />
              )))
            }
          </div>
          <div className="flex flex-col w-full gap-3 px-3 lg:w-1/3">
            <PriceSummary pricingInfo={pricingInfo} travelers={travelersData} />
            <h2 className="pt-4 pl-1 text-2xl font-semibold text-text">Trip Summary</h2>
            <FlightInfoCard origin_destination={flightData.AirItinerary.OriginDestinationOptions} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 my-5">
          <SecondaryButton text="Back" onClick={() => navigate(-1)} icon={<MdArrowBack />} />
          <Button icon={<MdArrowForward />} text="Next Step" onClick={addAllTravelers} />
        </div>
      </div>
    </>
  );
};

const TravelerForm = ({
  index, travelertype, docType, formikRefs, travelersDetailsInputs, disableAddTraveler, oldTraveller,
  handleSubmit, setClickedIndex, setDisableAddTraveler, setConfirmStatus, gettingTravellers, travelers, handlePassengerForm
}) => {
  const [toogleForm, setToogleForm] = useState(null);

  return (
    <CardLayoutContainer key={index} className={"mb-5"}>
      <CardLayoutHeader>
        <h2 className="text-2xl font-semibold capitalize text-text">Travelers Detail {docType}</h2>
      </CardLayoutHeader>
      <CardLayoutHeader className={"flex items-center justify-between text-sm cursor-pointer"}>
        <div onClick={() => setToogleForm(toogleForm === index ? null : index)} className="flex items-end justify-between w-full">
          <h2 className="text-xl font-semibold capitalize text-primary">
            {`Traveller ${index + 1}. ${travelertype === "ADT" ? "adult" : travelertype === "CHD" ? "child" : "infant"}`}
          </h2>
          <span className="text-2xl transition-all cursor-pointer hover:scale-110 text-primary hover:text-secondary">
            {toogleForm !== index ? <FaChevronCircleDown /> : <FaChevronCircleUp />}
          </span>
        </div>
      </CardLayoutHeader>
      <Formik
        innerRef={(el) => (formikRefs.current[index] = el)}
        initialValues={{
          title: titleOptions[0].value,
          first_name: "",
          last_name: "",
          email: "",
          telephone: "",
          mobile: "",
          country: docType === "Domestic" ? "IRN" : "",
          city: "",
          date_of_birth: "",
          passenger_type: travelertype,
          gender: genderOptions[0].value,
          passport_number: "",
          passport_expiry_date: "",
        }}
        validationSchema={travelerDetailScehma}
        onSubmit={(values) => handleSubmit(index, values)}
        enableReinitialize
        validateOnChange={true}
      >
        {({ values, setValues, errors, touched, setFieldValue }) => (
          <>
            <div className="flex flex-col max-w-full gap-6 py-10 mx-3 md:w-80 lg:mx-auto">
              <div className="flex items-center gap-2 ">
                <Select
                  onClick={() => gettingTravellers(travelertype)}
                  id={"passengers"}
                  disabled={disableAddTraveler.includes(index)}
                  label={"Passengers"}
                  onChange={(option) => handlePassengerForm(setValues, option.value, index)}
                  value={values.previousPassenger}
                  options={travelers.map((item) => ({ value: item.email, label: item.email }))}
                />
                {oldTraveller.includes(index) && (
                  <MdCancel
                    className="text-2xl cursor-pointer text-primary"
                    onClick={() => {
                      setOldTraveller((prev) => prev.filter((item) => item !== index));
                      formikRefs.current[index]?.resetForm();
                      setDisableAddTraveler((prev) => prev.filter((item) => item !== index));
                    }}
                  />
                )}
              </div>
              {!oldTraveller.includes(index) && (
                <>
                  <div className="flex items-center w-full gap-3 text-primary">
                    <span className="h-0.5 w-2/5 bg-primary"></span>
                    <p className="w-1/5 text-2xl text-center">OR</p>
                    <span className="h-0.5 w-2/5 bg-primary"></span>
                  </div>
                  <h1 onClick={() => setToogleForm(index)} className="text-xl font-semibold text-center capitalize cursor-pointer text-text hover:underline hover:text-primary">
                    Add a new traveler
                  </h1>
                </>
              )}
            </div>
            {(toogleForm === index || oldTraveller.includes(index)) && (
              <>
                <Form>
                  <div className="flex flex-col items-center md:flex-row ">
                    <CardLayoutBody className={`w-full md:w-1/2 }`} removeBorder={true}>
                      <div className="flex flex-col gap-5 ">
                        {travelersDetailsInputs.map((input) => (
                          <div key={input.id} className="relative mb-5">
                            {input.type === "select" ? (
                              <Select
                                id={input.id}
                                name={input.name}
                                label={input.label}
                                options={input.options}
                                disabled={disableAddTraveler.includes(index) || input.disabled}
                                placeholder={input.placeholder}
                                value={values[input.name]}
                                onChange={(option) => setFieldValue(input.name, option.value)}
                              />
                            ) : input.type === "date" ? (
                              <CustomDate
                                id={input.id}
                                name={input.name}
                                pastDate={input.pastDate}
                                futureDate={input.futureDate}
                                label={input.label}
                                disabled={disableAddTraveler.includes(index)}
                                value={values[input.name]}
                                onChange={(e) => setFieldValue(input.name, e.target.value)}
                              />
                            ) : input.type === "number" ? (
                              <Input
                                id={input.id}
                                name={input.name}
                                label={input.label}
                                type={input.type}
                                placeholder={input.placeholder}
                                disabled={disableAddTraveler.includes(index)}
                                value={values[input.name]}
                                onChange={(e) => setFieldValue(input.name, e.target.value.replace(/\D/g, ""))}
                              />
                            ) : (
                              <Input
                                id={input.id}
                                name={input.name}
                                label={input.label}
                                type={input.type}
                                placeholder={input.placeholder}
                                disabled={disableAddTraveler.includes(index)}
                                value={values[input.name]}
                                onChange={(e) => setFieldValue(input.name, e.target.value)}
                              />
                            )}
                            {touched[input.name] && errors[input.name] && (
                              <div className="absolute left-0 mt-2 text-sm text-red-500">{errors[input.name]}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardLayoutBody>
                    <div className="w-full px-4 md:w-1/2 filledfields">
                      <div className="flex items-center justify-end gap-6">
                        {disableAddTraveler.includes(index) && (
                          <button
                            onClick={() => {
                              setDisableAddTraveler((prev) => prev.map((item, i) => (item === index ? false : item)));
                              setValues(formikRefs.current[index]?.values || {});
                            }}
                            className={`${disableAddTraveler.includes(index) ? "cursor-pointer" : "cursor-not-allowed"} text-primary hover:text-secondary underline`}
                          >
                            Edit Data
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setOldTraveller((prev) => prev.filter((item) => item !== index));
                            formikRefs.current[index]?.resetForm();
                            setDisableAddTraveler((prev) => prev.map((item, i) => (item === index ? null : item)));
                          }}
                          className="underline cursor-pointer text-primary hover:text-secondary"
                        >
                          Clear Data
                        </button>
                      </div>
                      <div className="mt-5 rounded-xl p-7 bg-bluebg shadow-lg border-primary border-[1px] h-fit">
                        <h1 className="pb-3 text-2xl font-semibold text-text">Travelers Detail</h1>
                        {Object.entries(values).map(([key, value]) => (
                          <p key={key} className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                            {key.replace(/_/g, " ")} <span>{value}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Form>
                <div className="flex items-center justify-end p-3">
                  <CustomTooltip content={Object.values(errors).map((err) => <p>{err}</p>)}>
                    <div onMouseEnter={() => setErrorsValue(Object.values(errors).map((err) => <p>{err}</p>))}>
                      <SecondaryButton
                        text={disableAddTraveler.includes(index) ? "Traveler Added" : "Add Traveler"}
                        onClick={() => {
                          setClickedIndex(index);
                          setConfirmStatus(true);
                        }}
                        disabled={disableAddTraveler.includes(index) || Object.keys(errors).length > 0}
                        icon={disableAddTraveler.includes(index) ? "" : <MdAdd />}
                      />
                      <ConfirmModal
                        status={confirmStatus}
                        onAbort={() => setConfirmStatus(false)}
                        onConfirm={() => handleSubmit(index, formikRefs.current[index]?.values)}
                        text={"Is the traveler data you provided is correct"}
                      />
                    </div>
                  </CustomTooltip>
                </div>
              </>
            )}
          </>
        )}
      </Formik>
    </CardLayoutContainer>
  );
};

export default TravelersDetails;