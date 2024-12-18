import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaChevronCircleUp, FaUser } from "react-icons/fa";

import { iranianCities } from "../../data/iranianCities";
import { countries } from "../../data/countriesData";

import { FaPlaneDeparture } from "react-icons/fa6";

import { FaChevronCircleDown } from "react-icons/fa";

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

const TravelersDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flightData, setFlightData] = useState(null);
  const [travelersData, setTravelersData] = useState(null);
  const [loading, setLoading] = useState(false);

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
    console.log("Form Values: ", values);
  };

  useEffect(() => {
    if (location.state) {
      setFlightData(location.state.data);
      setTravelersData(location.state.travelers);
    }
  }, [location.state]);

  if (!flightData) {
    return <Spinner className={"text-primary"} />;
  }

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">
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

        <div className="flex flex-wrap">
          {/* Adults */}
          <h2 className="text-2xl font-semibold text-text p-3">Adults Details</h2>
          {Array.from({ length: travelersData.adults }, (_, index) => {
            return (
              <CardLayoutContainer key={index} className={"mb-5"}>
                <CardLayoutHeader
                  className={
                    "flex items-center justify-between text-sm cursor-pointer"
                  }
                >
                  <div
                    onClick={() => {
                      toogleFormHandler(index);
                    }}
                    className="w-full flex items-center justify-between"
                  >
                    <h2 className="text-2xl font-semibold text-primary">
                      {`${index + 1}. Adult`}
                    </h2>
                    <span className="text-2xl transition-all hover:scale-110 text-primary hover:text-secondary cursor-pointer">
                      {toogleForm !== index ? (
                        <FaChevronCircleDown />
                      ) : (
                        <FaChevronCircleUp />
                      )}
                    </span>
                  </div>
                </CardLayoutHeader>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <Form>
                      <CardLayoutBody
                        className={toogleForm === index ? "visible" : "hidden"}
                        removeBorder={true}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
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
                            {touched.country && errors.country && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.country}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"firstName"}
                              name={"firstName"}
                              label={"First Name"}
                              type={"text"}
                              value={values.firstName}
                              placeholder={"Enter First Name"}
                              onChange={(e) => {
                                setFieldValue("firstName", e.target.value);
                              }}
                            />
                            {touched.firstName && errors.firstName && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"lastName"}
                              name={"lastName"}
                              label={"Last Name"}
                              type={"text"}
                              value={values.lastName}
                              placeholder={"Enter Last Name"}
                              onChange={(e) =>
                                setFieldValue("lastName", e.target.value)
                              }
                            />
                            {touched.lastName && errors.lastName && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"phoneNumber"}
                              name={"phoneNumber"}
                              label={"Phone Number"}
                              type={"number"}
                              value={values.phoneNumber}
                              placeholder={"Enter Phone Number"}
                              onChange={(e) =>
                                setFieldValue("phoneNumber", e.target.value)
                              }
                            />
                            {touched.phoneNumber && errors.phoneNumber && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.phoneNumber}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"mobileNumber"}
                              name={"mobileNumber"}
                              label={"Mobile Number"}
                              type={"number"}
                              value={values.mobileNumber}
                              placeholder={"Enter Mobile Number"}
                              onChange={(e) =>
                                setFieldValue("mobileNumber", e.target.value)
                              }
                            />
                            {touched.mobileNumber && errors.mobileNumber && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.mobileNumber}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"dateOfBirth"}
                              name={"dateOfBirth"}
                              label={"Date Of Birth"}
                              type={"date"}
                              value={values.dateOfBirth}
                              placeholder={"Select Date Of Birth"}
                              onChange={(e) =>
                                setFieldValue("dateOfBirth", e.target.value)
                              }
                            />
                            {touched.dateOfBirth && errors.dateOfBirth && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.dateOfBirth}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Select
                              id="passengerType"
                              label="Passenger Type"
                              name="passengerType"
                              options={passengerOptions}
                              value={values.passengerType}
                              placeholder="Select Passenger Type"
                              onChange={(option) =>
                                setFieldValue("passengerType", option.value)
                              }
                              optionIcons={<FaUser />}
                            />
                            {touched.passengerType && errors.passengerType && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.passengerType}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"passportNumber"}
                              name={"passportNumber"}
                              label={"Passport Number"}
                              type={"text"}
                              value={values.passportNumber}
                              placeholder={"Enter Passport Number"}
                              onChange={(e) => {
                                setFieldValue("passportNumber", e.target.value);
                              }}
                            />
                            {touched.passportNumber &&
                              errors.passportNumber && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.passportNumber}
                                </div>
                              )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"passportExpDate"}
                              name={"passportExpDate"}
                              label={"Passport Exp Date"}
                              type={"date"}
                              value={values.passportExpDate}
                              placeholder={"Select Passport Exp Date"}
                              onChange={(e) =>
                                setFieldValue("passportExpDate", e.target.value)
                              }
                            />
                            {touched.passportExpDate &&
                              errors.passportExpDate && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.passportExpDate}
                                </div>
                              )}
                          </div>
                        </div>
                      </CardLayoutBody>
                    </Form>
                  )}
                </Formik>
              </CardLayoutContainer>
            );
          })}

          {/* Childs */}
          <h2 className="text-2xl font-semibold text-text p-3">Childs Details</h2>
          {Array.from({ length: travelersData.childs }, (_, index) => {
            return (
              <CardLayoutContainer key={index} className={"mb-5"}>
                <CardLayoutHeader
                  className={
                    "flex items-center justify-between text-sm cursor-pointer"
                  }
                >
                  <div
                    onClick={() => {
                      toogleFormHandler(index);
                    }}
                    className="w-full flex items-center justify-between"
                  >
                    <h2 className="text-2xl font-semibold text-primary">
                      {`${index + 1}. Child`}
                    </h2>
                    <span className="text-2xl transition-all hover:scale-110 text-primary hover:text-secondary cursor-pointer">
                      {toogleForm !== index ? (
                        <FaChevronCircleDown />
                      ) : (
                        <FaChevronCircleUp />
                      )}
                    </span>
                  </div>
                </CardLayoutHeader>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <Form>
                      <CardLayoutBody
                        className={toogleForm === index ? "visible" : "hidden"}
                        removeBorder={true}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
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
                            {touched.country && errors.country && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.country}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"firstName"}
                              name={"firstName"}
                              label={"First Name"}
                              type={"text"}
                              value={values.firstName}
                              placeholder={"Enter First Name"}
                              onChange={(e) => {
                                setFieldValue("firstName", e.target.value);
                              }}
                            />
                            {touched.firstName && errors.firstName && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"lastName"}
                              name={"lastName"}
                              label={"Last Name"}
                              type={"text"}
                              value={values.lastName}
                              placeholder={"Enter Last Name"}
                              onChange={(e) =>
                                setFieldValue("lastName", e.target.value)
                              }
                            />
                            {touched.lastName && errors.lastName && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"phoneNumber"}
                              name={"phoneNumber"}
                              label={"Phone Number"}
                              type={"number"}
                              value={values.phoneNumber}
                              placeholder={"Enter Phone Number"}
                              onChange={(e) =>
                                setFieldValue("phoneNumber", e.target.value)
                              }
                            />
                            {touched.phoneNumber && errors.phoneNumber && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.phoneNumber}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"mobileNumber"}
                              name={"mobileNumber"}
                              label={"Mobile Number"}
                              type={"number"}
                              value={values.mobileNumber}
                              placeholder={"Enter Mobile Number"}
                              onChange={(e) =>
                                setFieldValue("mobileNumber", e.target.value)
                              }
                            />
                            {touched.mobileNumber && errors.mobileNumber && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.mobileNumber}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"dateOfBirth"}
                              name={"dateOfBirth"}
                              label={"Date Of Birth"}
                              type={"date"}
                              value={values.dateOfBirth}
                              placeholder={"Select Date Of Birth"}
                              onChange={(e) =>
                                setFieldValue("dateOfBirth", e.target.value)
                              }
                            />
                            {touched.dateOfBirth && errors.dateOfBirth && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.dateOfBirth}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Select
                              id="passengerType"
                              label="Passenger Type"
                              name="passengerType"
                              options={passengerOptions}
                              value={values.passengerType}
                              placeholder="Select Passenger Type"
                              onChange={(option) =>
                                setFieldValue("passengerType", option.value)
                              }
                              optionIcons={<FaUser />}
                            />
                            {touched.passengerType && errors.passengerType && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.passengerType}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"passportNumber"}
                              name={"passportNumber"}
                              label={"Passport Number"}
                              type={"text"}
                              value={values.passportNumber}
                              placeholder={"Enter Passport Number"}
                              onChange={(e) => {
                                setFieldValue("passportNumber", e.target.value);
                              }}
                            />
                            {touched.passportNumber &&
                              errors.passportNumber && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.passportNumber}
                                </div>
                              )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"passportExpDate"}
                              name={"passportExpDate"}
                              label={"Passport Exp Date"}
                              type={"date"}
                              value={values.passportExpDate}
                              placeholder={"Select Passport Exp Date"}
                              onChange={(e) =>
                                setFieldValue("passportExpDate", e.target.value)
                              }
                            />
                            {touched.passportExpDate &&
                              errors.passportExpDate && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.passportExpDate}
                                </div>
                              )}
                          </div>
                        </div>
                      </CardLayoutBody>
                    </Form>
                  )}
                </Formik>
              </CardLayoutContainer>
            );
          })}

          {/* Infants */}
          <h2 className="text-2xl font-semibold text-text p-3">Infants Details</h2>
          {Array.from({ length: travelersData.infants }, (_, index) => {
            return (
              <CardLayoutContainer key={index} className={"mb-5"}>
                <CardLayoutHeader
                  className={
                    "flex items-center justify-between text-sm cursor-pointer"
                  }
                >
                  <div
                    onClick={() => {
                      toogleFormHandler(index);
                    }}
                    className="w-full flex items-center justify-between"
                  >
                    <h2 className="text-2xl font-semibold text-primary">
                      {`${index + 1}. Infant`}
                    </h2>
                    <span className="text-2xl transition-all hover:scale-110 text-primary hover:text-secondary cursor-pointer">
                      {toogleForm !== index ? (
                        <FaChevronCircleDown />
                      ) : (
                        <FaChevronCircleUp />
                      )}
                    </span>
                  </div>
                </CardLayoutHeader>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <Form>
                      <CardLayoutBody
                        className={toogleForm === index ? "visible" : "hidden"}
                        removeBorder={true}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
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
                            {touched.country && errors.country && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.country}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"firstName"}
                              name={"firstName"}
                              label={"First Name"}
                              type={"text"}
                              value={values.firstName}
                              placeholder={"Enter First Name"}
                              onChange={(e) => {
                                setFieldValue("firstName", e.target.value);
                              }}
                            />
                            {touched.firstName && errors.firstName && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"lastName"}
                              name={"lastName"}
                              label={"Last Name"}
                              type={"text"}
                              value={values.lastName}
                              placeholder={"Enter Last Name"}
                              onChange={(e) =>
                                setFieldValue("lastName", e.target.value)
                              }
                            />
                            {touched.lastName && errors.lastName && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"phoneNumber"}
                              name={"phoneNumber"}
                              label={"Phone Number"}
                              type={"number"}
                              value={values.phoneNumber}
                              placeholder={"Enter Phone Number"}
                              onChange={(e) =>
                                setFieldValue("phoneNumber", e.target.value)
                              }
                            />
                            {touched.phoneNumber && errors.phoneNumber && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.phoneNumber}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"mobileNumber"}
                              name={"mobileNumber"}
                              label={"Mobile Number"}
                              type={"number"}
                              value={values.mobileNumber}
                              placeholder={"Enter Mobile Number"}
                              onChange={(e) =>
                                setFieldValue("mobileNumber", e.target.value)
                              }
                            />
                            {touched.mobileNumber && errors.mobileNumber && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.mobileNumber}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"dateOfBirth"}
                              name={"dateOfBirth"}
                              label={"Date Of Birth"}
                              type={"date"}
                              value={values.dateOfBirth}
                              placeholder={"Select Date Of Birth"}
                              onChange={(e) =>
                                setFieldValue("dateOfBirth", e.target.value)
                              }
                            />
                            {touched.dateOfBirth && errors.dateOfBirth && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.dateOfBirth}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5">
                            <Select
                              id="passengerType"
                              label="Passenger Type"
                              name="passengerType"
                              options={passengerOptions}
                              value={values.passengerType}
                              placeholder="Select Passenger Type"
                              onChange={(option) =>
                                setFieldValue("passengerType", option.value)
                              }
                              optionIcons={<FaUser />}
                            />
                            {touched.passengerType && errors.passengerType && (
                              <div className="text-red-500 text-sm mt-2 absolute left-0">
                                {errors.passengerType}
                              </div>
                            )}
                          </div>
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
                          <div className="relative mb-5">
                            <Input
                              id={"passportNumber"}
                              name={"passportNumber"}
                              label={"Passport Number"}
                              type={"text"}
                              value={values.passportNumber}
                              placeholder={"Enter Passport Number"}
                              onChange={(e) => {
                                setFieldValue("passportNumber", e.target.value);
                              }}
                            />
                            {touched.passportNumber &&
                              errors.passportNumber && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.passportNumber}
                                </div>
                              )}
                          </div>
                          <div className="relative mb-5">
                            <Input
                              id={"passportExpDate"}
                              name={"passportExpDate"}
                              label={"Passport Exp Date"}
                              type={"date"}
                              value={values.passportExpDate}
                              placeholder={"Select Passport Exp Date"}
                              onChange={(e) =>
                                setFieldValue("passportExpDate", e.target.value)
                              }
                            />
                            {touched.passportExpDate &&
                              errors.passportExpDate && (
                                <div className="text-red-500 text-sm mt-2 absolute left-0">
                                  {errors.passportExpDate}
                                </div>
                              )}
                          </div>
                        </div>
                      </CardLayoutBody>
                    </Form>
                  )}
                </Formik>
              </CardLayoutContainer>
            );
          })}
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
              text="Add Travelers Data"
              onClick={() => {
                navigate("/dashboard/confirm-booking", {
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

export default TravelersDetails;
