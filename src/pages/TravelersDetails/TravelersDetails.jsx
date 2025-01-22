import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaChevronCircleUp, FaUser } from "react-icons/fa";
import { iranianCities } from "../../data/iranianCities";
import { countries } from "../../data/countriesData";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaChevronCircleDown } from "react-icons/fa";

import PhoneInput from "react-phone-number-input";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
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
  { label: "Mr", value: "MR" },
  { label: "Mrs", value: "MS" },
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
  first_name: Yup.string().required("Please enter first name"),
  last_name: Yup.string().required("Please enter last name"),
  email: Yup.string().required("Please enter email"),
  telephone: Yup.string().required("Please enter phone number"),
  mobile: Yup.string().required("Please enter mobile number"),
  country: Yup.string().required("Please select country"),
  city: Yup.string().required("Please select city"),
  date_of_birth: Yup.string().required("Please select date of birth"),
  passenger_type: Yup.string().required("Please select passenger type"),
  gender: Yup.string().required("Please select gender"),
  passport_number: Yup.string().required("Please enter valid passport number"),
  passport_expiry_date: Yup.string().required(
    "Please select exp data of passport"
  ),
});

const TravelersDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState();

  const [flightData, setFlightData] = useState(null);
  const [travelersData, setTravelersData] = useState(null);
  const [toogleForm, setToogleForm] = useState(null);

  const toogleFormHandler = (index) => {
    if (index === toogleForm) {
      setToogleForm(null);
    } else {
      setToogleForm(index);
    }
  };

  const initialValues = {
    title: titleOptions[0].value,
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    mobile: "",
    country: countries[0].value,
    city: "",
    date_of_birth: "",
    passenger_type: passengerOptions[0].value,
    gender: genderOptions[0].value,
    passport_number: "",
    passport_expiry_date: "",
  };

  const [allTravelersData, setAllTravelersData] = useState([]);

  const handleSubmit = (travelerIndex, values) => {
    const payload = {
      city: values.city,
      country: values.country,
      date_of_birth: values.date_of_birth,
      email: values.email,
      first_name: values.first_name,
      gender: values.gender,
      last_name: values.last_name,
      mobile: {
        area_code: "912",
        country_code: "98",
        number: "2569355",
      },
      passenger_type: values.passenger_type,
      passport_expiry_date: values.passport_expiry_date,
      passport_number: values.passport_number,
      telephone: {
        area_code: "21",
        country_code: "98",
        number: "12345678",
      },
      title: values.title,
    };
    console.log(payload);
    setAllTravelersData((prevData) => [...prevData, payload]);
  };

  const addAllTravelers = () => {
    console.log(allTravelersData);
    navigate("/dashboard/confirm-booking", {
      state: { flightData, travelersData, allTravelersData },
    });
  };

  useEffect(() => {
    if (location.state) {
      setFlightData(location.state.data);
      setTravelersData(location.state.travelers);
    }
  }, [location.state]);

  if (!flightData || !travelersData) {
    return <Spinner className={"text-primary"} />;
  }

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">
        {/* Header section with counts */}
        <CardLayoutContainer className={"mb-5"}>
          <CardLayoutHeader
            heading={"Travelers Details"}
            className={"flex items-center flex-wrap gap-5 justify-between"}
          />
          <CardLayoutBody removeBorder={true}>
            <div className="flex flex-wrap gap-5 justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Adults
                </h2>
                <h2 className="text-4xl text-text font-semibold">
                  {travelersData.adults}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Childs
                </h2>
                <h2 className="text-4xl text-text font-semibold">
                  {travelersData.childs}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Infants
                </h2>
                <h2 className="text-4xl text-text font-semibold">
                  {travelersData.infants}
                </h2>
              </div>
            </div>
          </CardLayoutBody>
        </CardLayoutContainer>

        {/* Forms */}
        <div className="flex flex-wrap">
          {/* Adults */}
          <h2 className="text-2xl font-semibold text-text p-3">
            Adults Details
          </h2>
          {Array.from({ length: travelersData.adults }, (_, index) => {
            const travelerIndex = index; // For each adult
            return (
              <CardLayoutContainer key={travelerIndex} className={"mb-5"}>
                <CardLayoutHeader
                  className={
                    "flex items-center justify-between text-sm cursor-pointer"
                  }
                >
                  <div
                    onClick={() => toogleFormHandler(travelerIndex)}
                    className="w-full flex items-center justify-between"
                  >
                    <h2 className="text-2xl font-semibold text-primary">
                      {`${index + 1}. Adult`}
                    </h2>
                    <span className="text-2xl transition-all hover:scale-110 text-primary hover:text-secondary cursor-pointer">
                      {toogleForm !== travelerIndex ? (
                        <FaChevronCircleDown />
                      ) : (
                        <FaChevronCircleUp />
                      )}
                    </span>
                  </div>
                </CardLayoutHeader>
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(travelerIndex, values)}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleSubmit,
                  }) => (
                    <>
                      <Form>
                        <CardLayoutBody
                          className={
                            toogleForm === travelerIndex ? "visible" : "hidden"
                          }
                          removeBorder={true}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                            {/* Title */}
                            <div className="relative mb-5">
                              <Select
                                id="title"
                                label="Title"
                                name="title"
                                options={titleOptions}
                                value={values.title}
                                placeholder="Select Title"
                                onChange={(option) =>
                                  setFieldValue("title", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.title && errors.title && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.title}
                                </div>
                              )}
                            </div>

                            {/* First Name */}
                            <div className="relative mb-5">
                              <Input
                                id={"first_name"}
                                name={"first_name"}
                                label={"First Name"}
                                type={"text"}
                                value={values.first_name}
                                placeholder={"Enter First Name"}
                                onChange={(e) => {
                                  setFieldValue("first_name", e.target.value);
                                }}
                              />
                              {touched.first_name && errors.first_name && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.first_name}
                                </div>
                              )}
                            </div>

                            {/* Last Name */}
                            <div className="relative mb-5">
                              <Input
                                id={"last_name"}
                                name={"last_name"}
                                label={"Last Name"}
                                type={"text"}
                                value={values.last_name}
                                placeholder={"Enter Last Name"}
                                onChange={(e) =>
                                  setFieldValue("last_name", e.target.value)
                                }
                              />
                              {touched.last_name && errors.last_name && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.last_name}
                                </div>
                              )}
                            </div>

                            {/* Email */}
                            <div className="relative mb-5">
                              <Input
                                id={"email"}
                                name={"email"}
                                label={"Email"}
                                type={"text"}
                                value={values.email}
                                placeholder={"Enter Email"}
                                onChange={(e) =>
                                  setFieldValue("email", e.target.value)
                                }
                              />
                              {touched.email && errors.email && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.email}
                                </div>
                              )}
                            </div>

                            {/* Phone Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"telephone"}
                                name={"telephone"}
                                label={"Phone Number"}
                                type={"number"}
                                value={values.telephone}
                                placeholder={"Enter Phone Number"}
                                onChange={(e) =>
                                  setFieldValue("telephone", e.target.value)
                                }
                              />
                              {touched.telephone && errors.telephone && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.telephone}
                                </div>
                              )}
                            </div>

                            {/* Mobile Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"mobile"}
                                name={"mobile"}
                                label={"Mobile Number"}
                                type={"number"}
                                value={values.mobile}
                                placeholder={"Enter Mobile Number"}
                                onChange={(e) =>
                                  setFieldValue("mobile", e.target.value)
                                }
                              />
                              {touched.mobile && errors.mobile && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.mobile}
                                </div>
                              )}
                            </div>

                            {/* Country */}
                            <div className="relative mb-5">
                              <Select
                                id="country"
                                label="Country"
                                name="country"
                                options={countries}
                                value={values.country}
                                placeholder="Select Country"
                                onChange={(option) =>
                                  setFieldValue("country", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.country && errors.country && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.country}
                                </div>
                              )}
                            </div>

                            {/* City */}
                            <div className="relative mb-5">
                              <Select
                                id="city"
                                label="City"
                                name="city"
                                options={iranianCities}
                                value={values.city}
                                placeholder="Select City"
                                onChange={(option) =>
                                  setFieldValue("city", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.city && errors.city && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.city}
                                </div>
                              )}
                            </div>

                            {/* Date Of Birth */}
                            <div className="relative mb-5">
                              <Input
                                id={"date_of_birth"}
                                name={"date_of_birth"}
                                label={"Date Of Birth"}
                                type={"date"}
                                value={values.date_of_birth}
                                placeholder={"Select Date Of Birth"}
                                onChange={(e) =>
                                  setFieldValue("date_of_birth", e.target.value)
                                }
                              />
                              {touched.date_of_birth &&
                                errors.date_of_birth && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.date_of_birth}
                                  </div>
                                )}
                            </div>

                            {/* Passenger Type */}
                            <div className="relative mb-5">
                              <Select
                                id="passenger_type"
                                label="Passenger Type"
                                name="passenger_type"
                                options={passengerOptions}
                                value={values.passenger_type}
                                placeholder="Select Passenger Type"
                                onChange={(option) =>
                                  setFieldValue("passenger_type", option.value)
                                }
                                optionIcons={<FaUser />}
                              />
                              {touched.passenger_type &&
                                errors.passenger_type && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passenger_type}
                                  </div>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="relative mb-5">
                              <Select
                                id="gender"
                                label="Gender"
                                name="gender"
                                options={genderOptions}
                                value={values.gender}
                                placeholder="Select Gender"
                                onChange={(option) =>
                                  setFieldValue("gender", option.value)
                                }
                                optionIcons={<FaUser />}
                              />
                              {touched.gender && errors.gender && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.gender}
                                </div>
                              )}
                            </div>

                            {/* Passport Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"passport_number"}
                                name={"passport_number"}
                                label={"Passport Number"}
                                type={"text"}
                                value={values.passport_number}
                                placeholder={"Enter Passport Number"}
                                onChange={(e) => {
                                  setFieldValue(
                                    "passport_number",
                                    e.target.value
                                  );
                                }}
                              />
                              {touched.passport_number &&
                                errors.passport_number && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passport_number}
                                  </div>
                                )}
                            </div>

                            {/* Passport Exp Date */}
                            <div className="relative mb-5">
                              <Input
                                id={"passport_expiry_date"}
                                name={"passport_expiry_date"}
                                label={"Passport Exp Date"}
                                type={"date"}
                                value={values.passport_expiry_date}
                                placeholder={"Select Passport Exp Date"}
                                onChange={(e) =>
                                  setFieldValue(
                                    "passport_expiry_date",
                                    e.target.value
                                  )
                                }
                              />
                              {touched.passport_expiry_date &&
                                errors.passport_expiry_date && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passport_expiry_date}
                                  </div>
                                )}
                            </div>
                          </div>
                        </CardLayoutBody>
                      </Form>
                      <div className="flex items-center justify-end p-3">
                        <div>
                          <SecondaryButton
                            text="Add Traveler"
                            onClick={handleSubmit}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </Formik>
              </CardLayoutContainer>
            );
          })}
          {/* Childs */}
          <h2 className="text-2xl font-semibold text-text p-3">
            Childs Details
          </h2>
          {Array.from({ length: travelersData.childs }, (_, index) => {
            const travelerIndex = index; // For each child
            return (
              <CardLayoutContainer key={travelerIndex} className={"mb-5"}>
                <CardLayoutHeader
                  className={
                    "flex items-center justify-between text-sm cursor-pointer"
                  }
                >
                  <div
                    onClick={() => toogleFormHandler(travelerIndex)}
                    className="w-full flex items-center justify-between"
                  >
                    <h2 className="text-2xl font-semibold text-primary">
                      {`${index + 1}. Child`}
                    </h2>
                    <span className="text-2xl transition-all hover:scale-110 text-primary hover:text-secondary cursor-pointer">
                      {toogleForm !== travelerIndex ? (
                        <FaChevronCircleDown />
                      ) : (
                        <FaChevronCircleUp />
                      )}
                    </span>
                  </div>
                </CardLayoutHeader>
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(travelerIndex, values)}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleSubmit,
                  }) => (
                    <>
                      <Form>
                        <CardLayoutBody
                          className={
                            toogleForm === travelerIndex ? "visible" : "hidden"
                          }
                          removeBorder={true}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                            {/* Title */}
                            <div className="relative mb-5">
                              <Select
                                id="title"
                                label="Title"
                                name="title"
                                options={titleOptions}
                                value={values.title}
                                placeholder="Select Title"
                                onChange={(option) =>
                                  setFieldValue("title", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.title && errors.title && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.title}
                                </div>
                              )}
                            </div>

                            {/* First Name */}
                            <div className="relative mb-5">
                              <Input
                                id={"first_name"}
                                name={"first_name"}
                                label={"First Name"}
                                type={"text"}
                                value={values.first_name}
                                placeholder={"Enter First Name"}
                                onChange={(e) => {
                                  setFieldValue("first_name", e.target.value);
                                }}
                              />
                              {touched.first_name && errors.first_name && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.first_name}
                                </div>
                              )}
                            </div>

                            {/* Last Name */}
                            <div className="relative mb-5">
                              <Input
                                id={"last_name"}
                                name={"last_name"}
                                label={"Last Name"}
                                type={"text"}
                                value={values.last_name}
                                placeholder={"Enter Last Name"}
                                onChange={(e) =>
                                  setFieldValue("last_name", e.target.value)
                                }
                              />
                              {touched.last_name && errors.last_name && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.last_name}
                                </div>
                              )}
                            </div>

                            {/* Email */}
                            <div className="relative mb-5">
                              <Input
                                id={"email"}
                                name={"email"}
                                label={"Email"}
                                type={"text"}
                                value={values.email}
                                placeholder={"Enter Email"}
                                onChange={(e) =>
                                  setFieldValue("email", e.target.value)
                                }
                              />
                              {touched.email && errors.email && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.email}
                                </div>
                              )}
                            </div>

                            {/* Phone Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"telephone"}
                                name={"telephone"}
                                label={"Phone Number"}
                                type={"number"}
                                value={values.telephone}
                                placeholder={"Enter Phone Number"}
                                onChange={(e) =>
                                  setFieldValue("telephone", e.target.value)
                                }
                              />
                              {touched.telephone && errors.telephone && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.telephone}
                                </div>
                              )}
                            </div>

                            {/* Mobile Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"mobile"}
                                name={"mobile"}
                                label={"Mobile Number"}
                                type={"number"}
                                value={values.mobile}
                                placeholder={"Enter Mobile Number"}
                                onChange={(e) =>
                                  setFieldValue("mobile", e.target.value)
                                }
                              />
                              {touched.mobile && errors.mobile && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.mobile}
                                </div>
                              )}
                            </div>

                            {/* Country */}
                            <div className="relative mb-5">
                              <Select
                                id="country"
                                label="Country"
                                name="country"
                                options={countries}
                                value={values.country}
                                placeholder="Select Country"
                                onChange={(option) =>
                                  setFieldValue("country", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.country && errors.country && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.country}
                                </div>
                              )}
                            </div>

                            {/* City */}
                            <div className="relative mb-5">
                              <Select
                                id="city"
                                label="City"
                                name="city"
                                options={iranianCities}
                                value={values.city}
                                placeholder="Select City"
                                onChange={(option) =>
                                  setFieldValue("city", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.city && errors.city && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.city}
                                </div>
                              )}
                            </div>

                            {/* Date Of Birth */}
                            <div className="relative mb-5">
                              <Input
                                id={"date_of_birth"}
                                name={"date_of_birth"}
                                label={"Date Of Birth"}
                                type={"date"}
                                value={values.date_of_birth}
                                placeholder={"Select Date Of Birth"}
                                onChange={(e) =>
                                  setFieldValue("date_of_birth", e.target.value)
                                }
                              />
                              {touched.date_of_birth &&
                                errors.date_of_birth && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.date_of_birth}
                                  </div>
                                )}
                            </div>

                            {/* Passenger Type */}
                            <div className="relative mb-5">
                              <Select
                                id="passenger_type"
                                label="Passenger Type"
                                name="passenger_type"
                                options={passengerOptions}
                                value={values.passenger_type}
                                placeholder="Select Passenger Type"
                                onChange={(option) =>
                                  setFieldValue("passenger_type", option.value)
                                }
                                optionIcons={<FaUser />}
                              />
                              {touched.passenger_type &&
                                errors.passenger_type && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passenger_type}
                                  </div>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="relative mb-5">
                              <Select
                                id="gender"
                                label="Gender"
                                name="gender"
                                options={genderOptions}
                                value={values.gender}
                                placeholder="Select Gender"
                                onChange={(option) =>
                                  setFieldValue("gender", option.value)
                                }
                                optionIcons={<FaUser />}
                              />
                              {touched.gender && errors.gender && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.gender}
                                </div>
                              )}
                            </div>

                            {/* Passport Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"passport_number"}
                                name={"passport_number"}
                                label={"Passport Number"}
                                type={"text"}
                                value={values.passport_number}
                                placeholder={"Enter Passport Number"}
                                onChange={(e) => {
                                  setFieldValue(
                                    "passport_number",
                                    e.target.value
                                  );
                                }}
                              />
                              {touched.passport_number &&
                                errors.passport_number && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passport_number}
                                  </div>
                                )}
                            </div>

                            {/* Passport Exp Date */}
                            <div className="relative mb-5">
                              <Input
                                id={"passport_expiry_date"}
                                name={"passport_expiry_date"}
                                label={"Passport Exp Date"}
                                type={"date"}
                                value={values.passport_expiry_date}
                                placeholder={"Select Passport Exp Date"}
                                onChange={(e) =>
                                  setFieldValue(
                                    "passport_expiry_date",
                                    e.target.value
                                  )
                                }
                              />
                              {touched.passport_expiry_date &&
                                errors.passport_expiry_date && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passport_expiry_date}
                                  </div>
                                )}
                            </div>
                          </div>
                        </CardLayoutBody>
                      </Form>
                      <div className="flex items-center justify-end p-3">
                        <div>
                          <SecondaryButton
                            text="Add Traveler"
                            onClick={handleSubmit}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </Formik>
              </CardLayoutContainer>
            );
          })}
          {/* Infants */}
          <h2 className="text-2xl font-semibold text-text p-3">
            Infants Details
          </h2>
          {Array.from({ length: travelersData.infants }, (_, index) => {
            const travelerIndex = index; // For each infant
            return (
              <CardLayoutContainer key={travelerIndex} className={"mb-5"}>
                <CardLayoutHeader
                  className={
                    "flex items-center justify-between text-sm cursor-pointer"
                  }
                >
                  <div
                    onClick={() => toogleFormHandler(travelerIndex)}
                    className="w-full flex items-center justify-between"
                  >
                    <h2 className="text-2xl font-semibold text-primary">
                      {`${index + 1}. Infant`}
                    </h2>
                    <span className="text-2xl transition-all hover:scale-110 text-primary hover:text-secondary cursor-pointer">
                      {toogleForm !== travelerIndex ? (
                        <FaChevronCircleDown />
                      ) : (
                        <FaChevronCircleUp />
                      )}
                    </span>
                  </div>
                </CardLayoutHeader>
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(travelerIndex, values)}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleSubmit,
                  }) => (
                    <>
                      <Form>
                        <CardLayoutBody
                          className={
                            toogleForm === travelerIndex ? "visible" : "hidden"
                          }
                          removeBorder={true}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                            {/* Title */}
                            <div className="relative mb-5">
                              <Select
                                id="title"
                                label="Title"
                                name="title"
                                options={titleOptions}
                                value={values.title}
                                placeholder="Select Title"
                                onChange={(option) =>
                                  setFieldValue("title", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.title && errors.title && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.title}
                                </div>
                              )}
                            </div>

                            {/* First Name */}
                            <div className="relative mb-5">
                              <Input
                                id={"first_name"}
                                name={"first_name"}
                                label={"First Name"}
                                type={"text"}
                                value={values.first_name}
                                placeholder={"Enter First Name"}
                                onChange={(e) => {
                                  setFieldValue("first_name", e.target.value);
                                }}
                              />
                              {touched.first_name && errors.first_name && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.first_name}
                                </div>
                              )}
                            </div>

                            {/* Last Name */}
                            <div className="relative mb-5">
                              <Input
                                id={"last_name"}
                                name={"last_name"}
                                label={"Last Name"}
                                type={"text"}
                                value={values.last_name}
                                placeholder={"Enter Last Name"}
                                onChange={(e) =>
                                  setFieldValue("last_name", e.target.value)
                                }
                              />
                              {touched.last_name && errors.last_name && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.last_name}
                                </div>
                              )}
                            </div>

                            {/* Email */}
                            <div className="relative mb-5">
                              <Input
                                id={"email"}
                                name={"email"}
                                label={"Email"}
                                type={"text"}
                                value={values.email}
                                placeholder={"Enter Email"}
                                onChange={(e) =>
                                  setFieldValue("email", e.target.value)
                                }
                              />
                              {touched.email && errors.email && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.email}
                                </div>
                              )}
                            </div>

                            {/* Phone Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"telephone"}
                                name={"telephone"}
                                label={"Phone Number"}
                                type={"number"}
                                value={values.telephone}
                                placeholder={"Enter Phone Number"}
                                onChange={(e) =>
                                  setFieldValue("telephone", e.target.value)
                                }
                              />
                              {touched.telephone && errors.telephone && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.telephone}
                                </div>
                              )}
                            </div>

                            {/* Mobile Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"mobile"}
                                name={"mobile"}
                                label={"Mobile Number"}
                                type={"number"}
                                value={values.mobile}
                                placeholder={"Enter Mobile Number"}
                                onChange={(e) =>
                                  setFieldValue("mobile", e.target.value)
                                }
                              />
                              {touched.mobile && errors.mobile && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.mobile}
                                </div>
                              )}
                            </div>

                            {/* Country */}
                            <div className="relative mb-5">
                              <Select
                                id="country"
                                label="Country"
                                name="country"
                                options={countries}
                                value={values.country}
                                placeholder="Select Country"
                                onChange={(option) =>
                                  setFieldValue("country", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.country && errors.country && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.country}
                                </div>
                              )}
                            </div>

                            {/* City */}
                            <div className="relative mb-5">
                              <Select
                                id="city"
                                label="City"
                                name="city"
                                options={iranianCities}
                                value={values.city}
                                placeholder="Select City"
                                onChange={(option) =>
                                  setFieldValue("city", option.value)
                                }
                                optionIcons={<FaPlaneDeparture />}
                              />
                              {touched.city && errors.city && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.city}
                                </div>
                              )}
                            </div>

                            {/* Date Of Birth */}
                            <div className="relative mb-5">
                              <Input
                                id={"date_of_birth"}
                                name={"date_of_birth"}
                                label={"Date Of Birth"}
                                type={"date"}
                                value={values.date_of_birth}
                                placeholder={"Select Date Of Birth"}
                                onChange={(e) =>
                                  setFieldValue("date_of_birth", e.target.value)
                                }
                              />
                              {touched.date_of_birth &&
                                errors.date_of_birth && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.date_of_birth}
                                  </div>
                                )}
                            </div>

                            {/* Passenger Type */}
                            <div className="relative mb-5">
                              <Select
                                id="passenger_type"
                                label="Passenger Type"
                                name="passenger_type"
                                options={passengerOptions}
                                value={values.passenger_type}
                                placeholder="Select Passenger Type"
                                onChange={(option) =>
                                  setFieldValue("passenger_type", option.value)
                                }
                                optionIcons={<FaUser />}
                              />
                              {touched.passenger_type &&
                                errors.passenger_type && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passenger_type}
                                  </div>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="relative mb-5">
                              <Select
                                id="gender"
                                label="Gender"
                                name="gender"
                                options={genderOptions}
                                value={values.gender}
                                placeholder="Select Gender"
                                onChange={(option) =>
                                  setFieldValue("gender", option.value)
                                }
                                optionIcons={<FaUser />}
                              />
                              {touched.gender && errors.gender && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.gender}
                                </div>
                              )}
                            </div>

                            {/* Passport Number */}
                            <div className="relative mb-5">
                              <Input
                                id={"passport_number"}
                                name={"passport_number"}
                                label={"Passport Number"}
                                type={"text"}
                                value={values.passport_number}
                                placeholder={"Enter Passport Number"}
                                onChange={(e) => {
                                  setFieldValue(
                                    "passport_number",
                                    e.target.value
                                  );
                                }}
                              />
                              {touched.passport_number &&
                                errors.passport_number && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passport_number}
                                  </div>
                                )}
                            </div>

                            {/* Passport Exp Date */}
                            <div className="relative mb-5">
                              <Input
                                id={"passport_expiry_date"}
                                name={"passport_expiry_date"}
                                label={"Passport Exp Date"}
                                type={"date"}
                                value={values.passport_expiry_date}
                                placeholder={"Select Passport Exp Date"}
                                onChange={(e) =>
                                  setFieldValue(
                                    "passport_expiry_date",
                                    e.target.value
                                  )
                                }
                              />
                              {touched.passport_expiry_date &&
                                errors.passport_expiry_date && (
                                  <div className="text-red-500 text-sm mt-2 absolute left-0">
                                    {errors.passport_expiry_date}
                                  </div>
                                )}
                            </div>
                          </div>
                        </CardLayoutBody>
                      </Form>
                      <div className="flex items-center justify-end p-3">
                        <div>
                          <SecondaryButton
                            text="Add Traveler"
                            onClick={handleSubmit}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </Formik>
              </CardLayoutContainer>
            );
          })}
        </div>

        {/* Final Button to console all travelers data */}
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
            <Button text="Add Travelers Data" onClick={addAllTravelers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelersDetails;
