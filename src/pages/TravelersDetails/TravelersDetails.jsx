import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
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
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import {
  Button,
  SecondaryButton,
  Spinner,
  Select,
  Input,
  CustomDate,
  FlightInfoCard,
  PriceSummary,
  ConfirmModal,
  TravelersQuantity,
  PopupMessage,
  CustomTooltip,
  PhoneNumberInput,
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
  const [passengers, setPassengers] = useState([]);
  const [allTravelersData, setAllTravelersData] = useState([]);
  const [disableAddTraveler, setDisableAddTraveler] = useState(JSON.parse(localStorage.getItem("disableTravelers")) || []);
  const [oldTraveller, setOldTraveller] = useState(JSON.parse(localStorage.getItem("oldTraveller")) || []);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [successPopup, setSuccessPopup] = useState({ active: false, message: "", icon: "" });
  const [toogleForm, setToogleForm] = useState(null);
  const [clickedIndex, setClickedIndex] = useState();

  const formikRefs = useRef([]);

  useEffect(() => {
    if (location.state) {
      setFlightData(location.state.data);
      setTravelersData(location.state.travelers);
      setPricingInfo(location.state.pricingInfo);
      setDocType(location.state.doc_type);
    }
  }, [location.state]);
  useEffect(() => {
    setTimeout(() => {
      if (successPopup.active) {
        setSuccessPopup((prev) => ({ ...prev, active: false }))

      }
    }, 2500);

  }, [successPopup.active])

  const handleSubmit = (travelerIndex, values) => {
    console.log("formValues",values)
    const payload = {
      ...values,
      // mobile: {
      //   area_code: String(values.mobile).slice(0, 2),
      //   country_code: String(values.mobile).slice(0, 3),
      //   number: String(values.mobile).slice(0, 7),
      // },
      // telephone: {
      //   area_code: String(values.telephone).slice(0, 2),
      //   country_code: String(values.telephone).slice(0, 3),
      //   number: String(values.telephone).slice(0, 7),
      // },
      country: docType === "Domestic" ? "IRN" : values.country,
      doc_type: docType === "Domestic" ? "N" : "P",
    };

    setDisableAddTraveler((prev) => [...prev, travelerIndex]);
    setAllTravelersData((prevData) => {
      const updatedData = [...prevData];
      updatedData[travelerIndex] = payload;
      return updatedData;
    });
    setConfirmStatus(false)
    setSuccessPopup({ active: true, message: "Traveler Added", icon: <MdCheck className="text-sm text-greenColor" /> });
  };

  const addAllTravelers = () => {
    localStorage.setItem("disableTravelers", JSON.stringify(disableAddTraveler));
    localStorage.setItem("allFormData", JSON.stringify(allTravelersData));
    localStorage.setItem("oldTraveller", JSON.stringify(oldTraveller));

    const totalTraveler = Object.values(travelersData).reduce((a, b) => Number(a) + Number(b), 0);

    if (allTravelersData.length === totalTraveler && allTravelersData.every(Boolean)) {
      navigate("/dashboard/confirm-booking", { state: { flightData, travelersData, allTravelersData } });
    } else {
      setSuccessPopup({ message: "Please fill all the travelers first", active: true });
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
      setValues((prev) => ({
        ...prev,
        title: formValues.title,
        first_name: formValues.given_name,
        last_name: formValues.surname,
        email: formValues.email,
        telephone: formValues.phone_number.replace(/[-\s]/g, ''),
        mobile: formValues.phone_number.replace(/[-\s]/g, ''),
        country: docType === "Domestic" ? "IRN" : formValues.nationality,
        city: formValues.address.split(",")[0],
        date_of_birth: formValues.birth_date,
        passenger_type: formValues.travelertype,
        gender: genderOptions[0].value,
        passport_number: formValues.doc_id,
        passport_expiry_date: formValues.expire_date,
        passenger_type: formValues.passenger_type_code,
      }));
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

  let count = -1;
  console.log("alltravellersData", allTravelersData)
  return (
    <>
      <PopupMessage {...successPopup} onClose={() => setSuccessPopup((prev) => ({ ...prev, active: false }))} />
      <div className="flex flex-col w-full">
        <TravelersQuantity flightSegments={flightData.AirItinerary.OriginDestinationOptions} travelers={travelersData} />
        <div className="flex flex-col w-full lg:flex-row">
          <div className="flex flex-wrap w-full lg:w-2/3">
            {Object.entries(travelersData).flatMap(([key, value], index) =>
              Array.from({ length: value }, (_, i) => {
                count++;
                const travelerIndex = count;
                const travelertype = key === "adults" ? "ADT" : key === "childs" ? "CHD" : "INF";

                return (
                  <CardLayoutContainer key={`${key}-${i}`} className={"mb-5"}>
                    <CardLayoutHeader>
                      <h2 className="text-2xl font-semibold capitalize text-text">Travelers Detail {docType}</h2>
                    </CardLayoutHeader>
                    <CardLayoutHeader className={"flex items-center justify-between text-sm cursor-pointer"}>
                      <div onClick={() => setToogleForm(toogleForm === travelerIndex ? null : travelerIndex)} className="flex items-end justify-between w-full">
                        <h2 className="text-xl font-semibold capitalize text-primary">
                          {`Traveller ${travelerIndex + 1}. ${travelertype === "ADT" ? "adult" : travelertype === "CHD" ? "child" : "infant"}`}
                        </h2>
                        <span className="text-2xl transition-all cursor-pointer hover:scale-110 text-primary hover:text-secondary">
                          {toogleForm !== travelerIndex ? <FaChevronCircleDown /> : <FaChevronCircleUp />}
                        </span>
                      </div>
                    </CardLayoutHeader>
                    <Formik
                      innerRef={(el) => (formikRefs.current[travelerIndex] = el)}
                      initialValues={{
                        title: titleOptions[0].value,
                        first_name: "",
                        last_name: "",
                        email: "",
                        telephone: {
                          area_code: "",
                          country_code: "",
                          number: ""
                        },
                        mobile: {
                          area_code: "",
                          country_code: "",
                          number: ""
                        },
                        country: docType === "Domestic" ? "IRN" : "",
                        city: "",
                        date_of_birth: "",
                        passenger_type: travelertype,
                        gender: genderOptions[0].value,
                        passport_number: "",
                        passport_expiry_date: "",
                      }}
                      validationSchema={travelerDetailScehma}
                      onSubmit={(values) => handleSubmit(travelerIndex, values)}
                      enableReinitialize
                      validateOnChange={true}
                    >
                      {({ values, setValues, errors, touched, setFieldValue }) => {
                        useEffect(() => {
                          const allFormData = JSON.parse(localStorage.getItem("allFormData"))

                          if (allFormData) {
                            setAllTravelersData(allFormData)
                            console.log("formikRefs", formikRefs.current)
                            formikRefs.current?.forEach((item, idx) => {
                              const persistValues=allFormData[idx]
                              item?.setValues({...persistValues
                              })
                            })
                          }
                        }, [location.state])
                        return (
                          <>
                            <div className="flex flex-col max-w-full gap-6 py-10 mx-3 md:w-80 lg:mx-auto">
                              <div className="flex items-center gap-2 ">
                                <Select
                                  onClick={() => gettingTravellers(travelertype)}
                                  id={"passengers"}
                                  disabled={disableAddTraveler.includes(travelerIndex)}
                                  label={"Passengers"}
                                  onChange={(option) => handlePassengerForm(formikRefs.current[travelerIndex]?.setValues, option.value, travelerIndex)}
                                  value={oldTraveller.includes(travelerIndex) && `${values.first_name} ${values.last_name}`}
                                  options={passengers}
                                />
                                {oldTraveller.includes(travelerIndex) && (
                                  <MdCancel
                                    className="text-2xl cursor-pointer text-primary"
                                    onClick={() => {
                                      setOldTraveller((prev) => prev.filter((item) => item !== travelerIndex));
                                      formikRefs.current[travelerIndex]?.resetForm();
                                      setDisableAddTraveler((prev) => prev.filter((item) => item !== travelerIndex));
                                    }}
                                  />
                                )}
                              </div>
                              {!oldTraveller.includes(travelerIndex) && (
                                <>
                                  <div className="flex items-center w-full gap-3 text-primary">
                                    <span className="h-0.5 w-2/5 bg-primary"></span>
                                    <p className="w-1/5 text-2xl text-center">OR</p>
                                    <span className="h-0.5 w-2/5 bg-primary"></span>
                                  </div>
                                  <h1 onClick={() => setToogleForm(travelerIndex)} className="text-xl font-semibold text-center capitalize cursor-pointer text-text hover:underline hover:text-primary">
                                    Add a new traveler
                                  </h1>
                                </>
                              )}
                            </div>
                            {(toogleForm === travelerIndex || oldTraveller.includes(travelerIndex)) && (
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
                                                disabled={disableAddTraveler.includes(travelerIndex) || input.disabled}
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
                                                disabled={disableAddTraveler.includes(travelerIndex)}
                                                value={values[input.name]}
                                                onChange={(e) => setFieldValue(input.name, e.target.value)}
                                              />
                                            ) : 
                                            input.type === "number" ? (
                                              // <Input
                                              //   id={input.id}
                                              //   name={input.name}
                                              //   label={input.label}
                                              //   type={input.type}
                                              //   placeholder={input.placeholder}
                                              //   disabled={disableAddTraveler.includes(travelerIndex)}
                                              //   value={values[input.name]}
                                              //   onChange={(e) => setFieldValue(input.name, e.target.value.replace(/\D/g, ""))}
                                              // />
                                              <PhoneNumberInput

                                                id={input.id}
                                                name={input.name}
                                                label={input.label}
                                                value={String(Object.values(values[input.name]).map((num)=>num))}
                                                onChange={(parsedNumber) => {
                                                  setFieldValue(`${input.name}.country_code`, parsedNumber.country_code);
                                                  setFieldValue(`${input.name}.area_code`, parsedNumber.area_code);
                                                  setFieldValue(`${input.name}.number`, parsedNumber.number);
                                                }}

                                                disabled={disableAddTraveler.includes(travelerIndex)}
                                                placeholder={input.name}
                                              />
                                            ) : 
                                            (
                                              <Input
                                                id={input.id}
                                                name={input.name}
                                                label={input.label}
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                disabled={disableAddTraveler.includes(travelerIndex)}
                                                value={values[input.name]}
                                                onChange={(e) => setFieldValue(input.name, e.target.value)}
                                              />
                                            )
                                            }
                                            {touched[input.name] && errors[input.name] && (
                                              <div className="absolute left-0 mt-2 text-sm text-red-500">{errors[input.name]}</div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </CardLayoutBody>
                                    <div className="w-full px-4 md:w-1/2 filledfields">
                                      <div className="flex items-center justify-end gap-6">
                                        {disableAddTraveler.includes(travelerIndex) && (
                                          <button
                                            onClick={() => {
                                              setDisableAddTraveler((prev) => prev.map((item, i) => (item === travelerIndex ? false : item)));
                                              setAllTravelersData((prev) => prev.map((item, i) => (i === travelerIndex ? false : item)))
                                              setValues(formikRefs.current[travelerIndex]?.values || {});
                                            }}
                                            className={`${disableAddTraveler.includes(travelerIndex) ? "cursor-pointer" : "cursor-not-allowed"} text-primary hover:text-secondary underline`}
                                          >
                                            Edit Data
                                          </button>
                                        )}
                                        <button
                                          onClick={() => {
                                            setOldTraveller((prev) => prev.filter((item) => item !== travelerIndex));
                                            formikRefs.current[travelerIndex]?.resetForm();
                                            setAllTravelersData((prev) => prev.map((item, i) => (i === travelerIndex ? false : item)))
                                            setDisableAddTraveler((prev) => prev.map((item, i) => (item === travelerIndex ? null : item)));
                                          }}
                                          className="underline cursor-pointer text-primary hover:text-secondary"
                                        >
                                          Clear Data
                                        </button>
                                      </div>
                                      <div className="mt-5 rounded-xl p-7 bg-bluebg shadow-lg border-primary border-[1px] h-fit">
                                        <h1 className="pb-3 text-2xl font-semibold text-text">Travelers Detail</h1>
                                        {Object.entries(values).map(([key, value]) => (
                                          <p key={key} className="flex justify-between py-4 font-semibold border-b border-lightgray text-text">
                                            <span className="capitalize"> {key.replace(/_/g, " ")} </span>
                                           
                                            <span>{
                                              typeof value==="object"?
                                              Object.values(value).map((num)=>num):value
                                              }</span>
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Form>
                                <div className="flex items-center justify-end p-3">
                                  <CustomTooltip content={Object.values(errors).map((err) => <p>{err}</p>)}>
                                    <div>
                                      <SecondaryButton
                                        text={disableAddTraveler.includes(travelerIndex) ? "Traveler Added" : "Add Traveler"}
                                        onClick={() => {
                                          setConfirmStatus(true);
                                          setClickedIndex(travelerIndex);
                                        }}
                                        disabled={disableAddTraveler.includes(travelerIndex) || Object.keys(errors).length > 0}
                                        icon={disableAddTraveler.includes(travelerIndex) ? "" : <MdAdd />}
                                      />
                                      <ConfirmModal
                                        status={confirmStatus}
                                        onAbort={() => setConfirmStatus(false)}
                                        onConfirm={() => handleSubmit(clickedIndex, formikRefs.current[clickedIndex]?.values)}
                                        text={"Is the traveler data you provided is correct"}
                                      />
                                    </div>
                                  </CustomTooltip>
                                </div>
                              </>
                            )}
                          </>
                        )
                      }}
                    </Formik>
                  </CardLayoutContainer>
                );
              })
            )}
          </div>
          <div className="flex flex-col w-full gap-3 px-3 lg:w-1/3">
            <PriceSummary pricingInfo={pricingInfo} travelers={travelersData} />
            <h2 className="pt-4 pl-1 text-2xl font-semibold text-text">Trip Summary</h2>
            <FlightInfoCard origin_destination={flightData.AirItinerary.OriginDestinationOptions} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 my-5">
          <SecondaryButton className="w-fit" text="Back" onClick={() => navigate(-1)} icon={<MdArrowBack />} />
          <Button icon={<MdArrowForward />} text="Next Step" onClick={addAllTravelers} />
        </div>
      </div>
    </>
  );
};

export default TravelersDetails;