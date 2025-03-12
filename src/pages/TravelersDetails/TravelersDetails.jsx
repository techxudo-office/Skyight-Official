import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronCircleUp, FaUser } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaChevronCircleDown } from "react-icons/fa";
import { countries } from "../../data/countriesData";
import { iranianCities } from "../../data/iranianCities";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";
import { Formik, Form } from "formik";
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
} from "../../components/components";
import {
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdCancel,
  MdCheck,
} from "react-icons/md";
import { travelerDetailScehma } from "../../validations";
import { getTravelers } from "../../_core/features/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

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

  const [value, setValue] = useState();
  const [allTravelersData, setAllTravelersData] = useState(
    JSON.parse(localStorage.getItem("allFormData")) || []
  );

  const formikRefs = useRef([]);
  const [flightData, setFlightData] = useState(null);
  const [travelersData, setTravelersData] = useState(null);
  const [pricingInfo, setPricingInfo] = useState();
  const [toogleForm, setToogleForm] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [oldTraveller, setOldTraveller] = useState(
    JSON.parse(localStorage.getItem("oldTraveller")) || []
  );
  const [isFormValid, setIsFormValid] = useState([]);
  const [PassengersInfo, setPassengersInfo] = useState([]);
  const [DocType, setDocType] = useState();
  const [errorsValue, setErrorsValue] = useState([]);
  const [Passengers, setPassengers] = useState([{ value: "", label: "" }]);
  const [disableAddTraveler, setDisableAddTraveler] = useState(
    JSON.parse(localStorage.getItem("disableTravelers")) || []
  );
  const [successPopup, setSuccessPopup] = useState({
    status: false,
    message: "",
    icon: "",
  });
  const { userData } = useSelector((state) => state.auth);
  const { travelers, isLoadingTravelers } = useSelector(
    (state) => state.booking
  );

  console.log("disabledtraveler", disableAddTraveler);

  const travelersDetailsInputs = [
    {
      type: "select",
      id: "title",
      label: "Title",
      name: "title",
      options: titleOptions,
      placeholder: "Select Title",
      optionIcons: <FaPlaneDeparture />,
    },
    {
      type: "text",
      id: "first_name",
      label: "First Name",
      name: "first_name",
      placeholder: "Enter First Name",
    },
    {
      type: "text",
      id: "last_name",
      label: "Last Name",
      name: "last_name",
      placeholder: "Enter Last Name",
    },
    {
      type: "email",
      id: "email",
      label: "Email",
      name: "email",
      placeholder: "Enter Email",
    },
    {
      type: "number",
      id: "telephone",
      label: "Phone Number",
      name: "telephone",
      placeholder: "Enter Phone Number",
    },
    {
      type: "number",
      id: "mobile",
      label: "Mobile Number",
      name: "mobile",
      placeholder: "Enter Mobile Number",
    },
    {
      type: "select",
      id: "country",
      label: "Country",
      name: "country",
      options: countries,
      disabled: DocType == "Domestic" ? true : false,
      placeholder: "Select Country",
      optionIcons: <FaPlaneDeparture />,
    },
    {
      type: "Input",
      id: "passenger_type",
      className: "hidden",
      label: "passenger_type",
      name: "passenger_type",
      disabled: true,
      value: (idx) => {
        return result[idx];
      },
    },
    {
      type: "select",
      id: "city",
      label: "City",
      name: "city",
      options: iranianCities,
      placeholder: "Select City",
      optionIcons: <FaPlaneDeparture />,
    },
    {
      type: "date",
      id: "date_of_birth",
      label: "Date of Birth",
      name: "date_of_birth",
      futureDate: false,
      pastDate: true,
    },
    {
      type: "select",
      id: "gender",
      label: "Gender",
      name: "gender",
      options: genderOptions,
      placeholder: "Select Gender",
      optionIcons: <FaUser />,
    },
    {
      type: "text",
      id: "passport_number",
      label: "Passport Number",
      name: "passport_number",
      placeholder: "Enter Passport Number",
    },
    {
      type: "date",
      id: "passport_expiry_date",
      label: "Passport Exp Date",
      name: "passport_expiry_date",
      pastDate: false,
      futureDate: true,
    },
  ];
  const toogleFormHandler = (index) => {
    if (index === toogleForm) {
      setToogleForm(null);
    } else {
      setToogleForm(index);
    }
  };

  const initialValues = {
    title: titleOptions[0].value,
    previousPassenger: "",
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    mobile: "",
    country: DocType == "Domestic" ? "IRN" : "",
    city: "",
    date_of_birth: "",
    passenger_type: "",
    gender: genderOptions[0].value,
    passport_number: "",
    passport_expiry_date: "",
  };

  const handleSubmit = (travelerIndex, values) => {
    console.log("formvalues_", values);
    console.log("formvalues", travelerIndex);
    let doc_type;
    let nationality;

    if (DocType == "Domestic") {
      doc_type = "N";
      nationality = "IRN";
    } else {
      doc_type = "P";
      nationality = null;
    }

    setConfirmStatus(false);
    if (typeof values.mobile === "object") {
      var mobileNo = values.mobile;
      var telephoneNo = values.telephone;
    }
    const payload = {
      city: values.city,
      country: nationality || values.country,
      date_of_birth: values.date_of_birth,
      email: values.email,
      first_name: values.first_name,
      gender: values.gender,
      last_name: values.last_name,
      mobile: mobileNo || {
        area_code: String(values.mobile).slice(0, 2),
        country_code: String(values.mobile).slice(0, 3),
        number: String(values.mobile).slice(0, 7),
      },
      passenger_type: values.passenger_type,
      passport_expiry_date: values.passport_expiry_date,
      passport_number: values.passport_number,
      doc_type: doc_type,
      telephone: telephoneNo || {
        area_code: String(values.mobile).slice(0, 2),
        country_code: String(values.mobile).slice(0, 3),
        number: String(values.mobile).slice(0, 7),
      },
      title: values.title,
    };
    console.log("payload", payload);
    setDisableAddTraveler((prev) => [...prev, travelerIndex]);
    setAllTravelersData((prevData) => {
      const updatedData = [...prevData];
      updatedData[travelerIndex] = payload;
      return updatedData;
    });
    setSuccessPopup({
      status: true,
      message: "Traveler Added",
      icon: <MdCheck className="text-sm text-greenColor" />,
    });
  };
  useEffect(() => {
    if (successPopup.status) {
      setTimeout(() => {
        setSuccessPopup((prev) => ({ ...prev, status: false }));
      }, 2000);
    }
  }, [successPopup.status]);
  console.log("alltravelersdata", allTravelersData);
  const addAllTravelers = () => {
    localStorage.setItem(
      "disableTravelers",
      JSON.stringify(disableAddTraveler)
    );
    localStorage.setItem("allFormData", JSON.stringify(allTravelersData));
    localStorage.setItem("oldTraveller", JSON.stringify(oldTraveller));

    const totalTraveler = Object.values(travelersData).reduce(
      (a, b) => Number(a) + Number(b),
      0
    );
    // console.log('totaltravelers', totalTraveler)
    if (
      allTravelersData.length == totalTraveler &&
      !allTravelersData.includes(null) &&
      !allTravelersData.includes(undefined) &&
      !allTravelersData.includes(false)
    ) {
      // console.log('navigate')
      navigate("/dashboard/confirm-booking", {
        state: { flightData, travelersData, allTravelersData },
      });
    }
    setSuccessPopup({
      message: "Please fill all the travellers first",
      status: true,
    });
    console.log(allTravelersData);
  };

  useEffect(() => {
    if (location.state) {
      setFlightData(location.state.data);
      setTravelersData(location.state.travelers);
      setPricingInfo(location.state.pricingInfo);
      setDocType(location.state.doc_type);
    }
  }, [location.state]);
  if (!flightData || !travelersData) {
    return <Spinner className={"text-primary"} />;
  }

  const result = [];

  Object.entries(travelersData).forEach(([key, value]) => {
    for (let i = 0; i < parseInt(value, 10); i++) {
      if (key === "adults") {
        result.push("ADT");
      } else if (key === "childs") {
        result.push("CHD");
      } else if (key === "infants") {
        result.push("INF");
      }
    }
  });

  console.log("valid", isFormValid);

  const gettingTravellers = (type) => {
    dispatch(
      getTravelers({ passengerType: type, token: userData?.token })
    ).then(() => {
      const passengerOptions = travelers.map((item) => ({
        value: item.email,
        label: item.email,
      }));
      setPassengers(passengerOptions);
      setPassengersInfo(travelers);
    });
  };

  const handlePassengerForm = (setValues, passenger, travelerIndex) => {
    setOldTraveller((prev) => [...prev, travelerIndex]);
    const formValues = PassengersInfo.filter(
      (item, i) => item.email == passenger
    );
    console.log("formvalues", formValues);
    const phone = parseInt(
      formValues[0].phone_number.replace(/[\s-]/g, ""),
      10
    );

    console.log("phone_", phone);
    setValues((prev) => ({
      ...prev,
      previousPassenger: `${formValues[0].given_name} ${formValues[0].surname} `,
      // passenger_type: formValues[0].passenger_type_code,
      first_name: formValues[0].given_name,
      last_name: formValues[0].surname,
      email: formValues[0].email,
      telephone: phone,
      mobile: phone,
      country: formValues[0].nationality,
      city: formValues[0].address.split(",")[0],
      date_of_birth: formValues[0].birth_date,
      // gender: formValues[0].gender,
      passport_number: formValues[0].doc_id,
      passport_expiry_date: formValues[0].expire_date,
    }));
  };
  return (
    <>
      <PopupMessage
        icon={successPopup.icon}
        onClose={() => setSuccessPopup((prev) => ({ ...prev, status: false }))}
        active={successPopup.status}
        message={successPopup.message}
      />
      <div className="flex flex-col w-full">
        <TravelersQuantity
          flightSegments={
            location.state.data.AirItinerary.OriginDestinationOptions
          }
          travelers={travelersData}
        />

        <div className="flex flex-col w-full lg:flex-row">
          <div className="flex flex-wrap w-full lg:w-2/3">
            {result.map((travelertype, index) => {
              return (
                <CardLayoutContainer key={index} className={"mb-5"}>
                  <CardLayoutHeader>
                    <h2 className="text-2xl font-semibold capitalize text-text">
                      Travelers Detail {DocType}
                    </h2>
                  </CardLayoutHeader>
                  <CardLayoutHeader
                    className={
                      "flex items-center justify-between text-sm cursor-pointer"
                    }>
                    <div
                      onClick={() => toogleFormHandler(index)}
                      className="flex items-end justify-between w-full">
                      <div>
                        <h2 className="text-xl font-semibold capitalize text-primary">
                          {`Traveller ${index + 1}. ${
                            travelertype == "ADT"
                              ? "adult"
                              : travelertype == "CHD"
                              ? "child"
                              : "infants"
                          }`}
                        </h2>
                      </div>

                      <span className="text-2xl transition-all cursor-pointer hover:scale-110 text-primary hover:text-secondary">
                        {toogleForm !== index ? (
                          <FaChevronCircleDown />
                        ) : (
                          <FaChevronCircleUp />
                        )}
                      </span>
                    </div>
                  </CardLayoutHeader>

                  <Formik
                    innerRef={(el) => (formikRefs.current[index] = el)}
                    initialValues={{
                      title: titleOptions[0].value,
                      previousPassenger: "",
                      first_name: "",
                      last_name: "",
                      email: "",
                      telephone: "",
                      mobile: "",
                      country: DocType == "Domestic" ? "IRN" : "",
                      city: "",
                      date_of_birth: "",
                      passenger_type: travelertype,
                      gender: genderOptions[0].value,
                      passport_number: "",
                      passport_expiry_date: "",
                    }}
                    validationSchema={travelerDetailScehma}
                    onSubmit={() => {
                      const formikInstance = formikRefs.current[clickedIndex]; // Get the correct Formik instance
                      if (formikInstance) {
                        const values = formikInstance.values; // Get values of the correct traveler
                        handleSubmit(clickedIndex, values); // Pass correct index & values
                      }
                    }}
                    enableReinitialize
                    validateOnChange={true}
                    validate={(values) => {
                      try {
                        travelerDetailScehma.validateSync(values, {
                          abortEarly: false,
                        });
                        setIsFormValid((prev) => [...prev, index]);
                        // If no errors, form is valid
                      } catch (error) {
                        setIsFormValid((prev) =>
                          prev.filter((item) => item != index)
                        ); // If errors exist, form is invalid
                      }
                    }}>
                    {({
                      values,
                      setValues,
                      errors,
                      touched,
                      setFieldValue,
                      handleSubmit,
                    }) => {
                      useEffect(() => {
                        const storedValues = JSON.parse(
                          localStorage.getItem("allFormData")
                        );
                        if (allTravelersData[index]) {
                          setValues(allTravelersData[index]);
                          if (oldTraveller[index])
                            setFieldValue(
                              "previousPassenger",
                              allTravelersData[index].first_name
                            );
                        }
                      }, []);
                      return (
                        <>
                          <div className="flex flex-col max-w-full gap-6 py-10 mx-3 md:w-80 lg:mx-auto">
                            <div className="flex items-center gap-2 ">
                              <Select
                                onClick={() => gettingTravellers(travelertype)}
                                id={"passengers"}
                                disabled={disableAddTraveler.includes(index)}
                                label={"Passengers"}
                                onChange={(option) => {
                                  setFieldValue(
                                    "previousPassenger",
                                    values.previousPassenger
                                  );
                                  handlePassengerForm(
                                    setValues,
                                    option.value,
                                    index
                                  );
                                }}
                                value={
                                  formikRefs.current[index]?.first_name ||
                                  values.previousPassenger
                                }
                                options={Passengers}
                              />
                              {oldTraveller.includes(index) && (
                                <MdCancel
                                  className="text-2xl cursor-pointer text-primary"
                                  onClick={() => {
                                    setOldTraveller((prev) =>
                                      prev.filter((item) => item != index)
                                    );
                                    formikRefs.current[index]?.resetForm();
                                    setDisableAddTraveler((prev) =>
                                      prev.filter((item) => item !== index)
                                    );
                                  }}
                                />
                              )}
                            </div>
                            {!oldTraveller.includes(index) && (
                              <>
                                <div className="flex items-center w-full gap-3 text-primary">
                                  <span className="h-0.5 w-2/5 bg-primary"></span>
                                  <p className="w-1/5 text-2xl text-center">
                                    OR
                                  </p>
                                  <span className="h-0.5 w-2/5 bg-primary"></span>
                                </div>
                                <h1
                                  onClick={() => toogleFormHandler(index)}
                                  className="text-xl font-semibold text-center capitalize cursor-pointer text-text hover:underline hover:text-primary">
                                  Add a new traveler
                                </h1>
                              </>
                            )}
                          </div>
                          {console.log("errors", index, errors)}

                          {(toogleForm === index ||
                            oldTraveller.includes(index)) && (
                            <>
                              <Form>
                                <div className="flex flex-col items-center md:flex-row ">
                                  <CardLayoutBody
                                    className={`w-full md:w-1/2 }`}
                                    removeBorder={true}>
                                    <div className="flex flex-col gap-5 ">
                                      {/* Title */}
                                      {travelersDetailsInputs.map((input) => (
                                        <div
                                          key={input.id}
                                          className="relative mb-5">
                                          {input.type === "select" ? (
                                            <Select
                                              id={input.id}
                                              name={input.name}
                                              label={input.label}
                                              options={input.options}
                                              disabled={
                                                disableAddTraveler.includes(
                                                  index
                                                ) || input.disabled
                                              }
                                              placeholder={input.placeholder}
                                              value={
                                                input.id === "country"
                                                  ? DocType === "Domestic"
                                                    ? "IRN"
                                                    : values[input.name]
                                                  : values[input.name]
                                              }
                                              optionIcons={input.optionIcons}
                                              onChange={(option) =>
                                                setFieldValue(
                                                  input.name,
                                                  option.value
                                                )
                                              }
                                            />
                                          ) : input.type === "date" ? (
                                            <CustomDate
                                              id={input.id}
                                              name={input.name}
                                              pastDate={input.pastDate}
                                              futureDate={input.futureDate}
                                              label={input.label}
                                              disabled={disableAddTraveler.includes(
                                                index
                                              )}
                                              value={values[input.name]}
                                              onChange={(e) =>
                                                setFieldValue(
                                                  input.name,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          ) : input.type === "number" ? (
                                            <Input
                                              id={input.id}
                                              className={input.className}
                                              name={input.name}
                                              label={input.label}
                                              type={input.type}
                                              placeholder={input.placeholder}
                                              disabled={
                                                input.disabled != null
                                                  ? input.disabled
                                                  : disableAddTraveler.includes(
                                                      index
                                                    )
                                              }
                                              value={
                                                input.name === "mobile" ||
                                                input.name == "telephone"
                                                  ? typeof values[
                                                      input.name
                                                    ] === "object"
                                                    ? Number(
                                                        [
                                                          values[input.name]
                                                            .country_code,
                                                          values[input.name]
                                                            .area_code,
                                                          values[input.name]
                                                            .number,
                                                        ]
                                                          .filter(Boolean) // Empty values hata dega
                                                          .join("")
                                                      )
                                                    : typeof values[
                                                        input.name
                                                      ] === "string"
                                                    ? Number(
                                                        String(
                                                          values[input.name]
                                                        ).replace(/\D/g, "")
                                                      )
                                                    : parseInt(
                                                        String(
                                                          values[input.name]
                                                        ).replace(/\D/g, ""),
                                                        10
                                                      )
                                                  : values[input.name]
                                              }
                                              onChange={(e) => {
                                                const newValue =
                                                  e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                  ); // Remove non-numeric characters
                                                setValues((prev) => ({
                                                  ...prev,
                                                  [input.name]: newValue
                                                    ? Number(newValue)
                                                    : "", // Convert back to number
                                                }));
                                              }}
                                            />
                                          ) : (
                                            // (
                                            //   <PhoneNumberInput
                                            //     id={input.id}
                                            //     className={input.className}
                                            //     name={input.name}
                                            //     label={input.label}
                                            //     placeholder={input.placeholder}
                                            //     disabled={input.disabled != null ? input.disabled : disableAddTraveler.includes(index)}
                                            //     value={values[input.name]}
                                            //     onChange={(e) => {
                                            //       setValues((prev) => ({
                                            //         ...prev,
                                            //         [input.name]: e.target.value, // Store structured phone data
                                            //       }));
                                            //     }}
                                            //   />

                                            // )
                                            <Input
                                              id={input.id}
                                              className={input.className}
                                              name={input.name}
                                              label={input.label}
                                              type={input.type}
                                              placeholder={input.placeholder}
                                              disabled={
                                                input.disabled != null
                                                  ? input.disabled
                                                  : disableAddTraveler.includes(
                                                      index
                                                    )
                                              }
                                              value={values[input.name]}
                                              onChange={(e) => {
                                                setFieldValue(
                                                  input.name,
                                                  e.target.value
                                                );
                                              }}
                                            />
                                          )}
                                          {touched[input.name] &&
                                            errors[input.name] && (
                                              <div className="absolute left-0 mt-2 text-sm text-red-500">
                                                {errors[input.name]}
                                              </div>
                                            )}
                                        </div>
                                      ))}
                                    </div>
                                  </CardLayoutBody>
                                  <div className="w-full px-4 md:w-1/2 filledfields">
                                    <div className="flex items-center justify-end gap-6">
                                      {disableAddTraveler.includes(index) && (
                                        <button
                                          // onClick={() => handleEditData(setValues, values, index)}
                                          onClick={() => {
                                            const newValues =
                                              formikRefs.current[index]
                                                ?.values || {}; // Ensure it's not undefined
                                            console.log(
                                              "Setting values:",
                                              newValues
                                            );

                                            setAllTravelersData((prev) =>
                                              prev.map((item) => {
                                                if (item) {
                                                  return item.email ==
                                                    values.email
                                                    ? false
                                                    : item;
                                                }
                                              })
                                            );
                                            setDisableAddTraveler((prev) =>
                                              prev.map((item, i) =>
                                                item == index ? false : item
                                              )
                                            );
                                            setValues(newValues);
                                            // handleEditData(setValues, newValues)
                                          }}
                                          className={`${
                                            disableAddTraveler.includes(index)
                                              ? "cursor-pointer"
                                              : "cursor-not-allowed"
                                          } text-primary hover:text-secondary underline `}>
                                          Edit Data
                                        </button>
                                      )}
                                      <div>
                                        <button
                                          onClick={() => {
                                            // handleClearData((values) => {
                                            //   setValues(values, false);
                                            //   setTouched({}); // `false` means no validation trigger
                                            // });
                                            setOldTraveller((prev) =>
                                              prev.filter(
                                                (item) => item != index
                                              )
                                            );
                                            formikRefs.current[
                                              index
                                            ]?.resetForm();
                                            // setValues((prev)=>({...prev,previousPassenger:""}))

                                            setAllTravelersData((prev) =>
                                              prev.map((item) => {
                                                if (item) {
                                                  return item.email ==
                                                    values.email
                                                    ? null
                                                    : item;
                                                }
                                              })
                                            );
                                            setDisableAddTraveler((prev) =>
                                              prev.map((item, i) =>
                                                item == index ? null : item
                                              )
                                            );
                                          }}
                                          className="underline cursor-pointer text-primary hover:text-secondary ">
                                          Clear Data
                                        </button>
                                      </div>
                                    </div>

                                    <div className=" mt-5 rounded-xl p-7 bg-bluebg shadow-lg border-primary border-[1px] h-fit">
                                      <h1 className="pb-3 text-2xl font-semibold text-text">
                                        Travelers Detail
                                      </h1>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        title <span>{values.title}</span>
                                      </p>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        First name{" "}
                                        <span>{values.first_name}</span>
                                      </p>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        last name{" "}
                                        <span>{values.last_name}</span>
                                      </p>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        date of birth{" "}
                                        <span>{values.date_of_birth}</span>
                                      </p>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        gender <span>{values.gender}</span>
                                      </p>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        nationality{" "}
                                        <span>{values.country}</span>
                                      </p>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        Passport no.{" "}
                                        <span>{values.passport_number}</span>
                                      </p>
                                      <p className="flex justify-between py-4 font-semibold capitalize border-b border-lightgray text-text">
                                        Passport Expiry{" "}
                                        <span>
                                          {values.passport_expiry_date}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                              <div className="flex items-center justify-end p-3">
                                <CustomTooltip
                                  content={
                                    errorsValue.length === 0 ? (
                                      <p>Add</p>
                                    ) : (
                                      errorsValue
                                    )
                                  }>
                                  <div
                                    onMouseEnter={() =>
                                      setErrorsValue(
                                        Object.values(errors).map((err) => (
                                          <p>{err}</p>
                                        ))
                                      )
                                    }>
                                    <SecondaryButton
                                      text={
                                        disableAddTraveler.includes(index)
                                          ? "Traveler Added"
                                          : "Add Traveler"
                                      }
                                      onClick={() => {
                                        setClickedIndex(index);
                                        setConfirmStatus(true);
                                      }}
                                      disabled={
                                        disableAddTraveler.includes(index) ||
                                        !isFormValid.includes(index)
                                      }
                                      icon={
                                        disableAddTraveler.includes(index) ? (
                                          ""
                                        ) : (
                                          <MdAdd />
                                        )
                                      }
                                    />
                                    <ConfirmModal
                                      status={confirmStatus}
                                      onAbort={() => setConfirmStatus(false)}
                                      onConfirm={handleSubmit}
                                      text={
                                        "Is the traveler data you provided is correct"
                                      }
                                    />
                                  </div>
                                </CustomTooltip>
                              </div>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Formik>
                </CardLayoutContainer>
              );
            })}
          </div>

          <div className="flex flex-col w-full gap-3 px-3 lg:w-1/3 ">
            <PriceSummary
              pricingInfo={pricingInfo}
              travelers={travelersData}
              totalTravelers={result}
            />
            <h2 className="pt-4 pl-1 text-2xl font-semibold text-text">
              Trip Summary
            </h2>

            <FlightInfoCard
              origin_destination={
                location.state.data.AirItinerary.OriginDestinationOptions
              }
            />
          </div>
        </div>

        {/* Final Button to console all travelers data */}
        <div className="flex items-center justify-end gap-3 my-5">
          <div>
            <SecondaryButton
              text="Back"
              onClick={() => {
                localStorage.removeItem("allFormData");
                localStorage.removeItem("disableTravelers");
                navigate(-1);
              }}
              icon={<MdArrowBack />}
            />
          </div>
          <div>
            <Button
              icon={<MdArrowForward />}
              text="Next Step"
              onClick={addAllTravelers}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelersDetails;
