import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaCalendar, FaChevronCircleUp, FaUser } from "react-icons/fa";
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
  CustomDate,
} from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { MdCalendarMonth, MdCalendarToday, MdCalendarViewMonth, MdCalendarViewWeek, MdChildCare, MdChildFriendly, MdOutlineCalendarMonth, MdPerson } from "react-icons/md";

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
  const [toogleForm, setToogleForm] = useState(0);
  const [fareBreakdown, setFareBreakdown] = useState(false);
  // const [Value, setValue] = useState(null);


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
    country: "",
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
      passenger_type: result[travelerIndex],
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
    console.log('alltravelersdata', allTravelersData)
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
      console.log('data', location.state.data)
      console.log('travelersdata', location.state.travelers)
    }
  }, [location.state]);

  if (!flightData || !travelersData) {
    return <Spinner className={"text-primary"} />;
  }

  const result = [];

  Object.entries(travelersData).forEach(([key, value]) => {
    for (let i = 0; i < parseInt(value, 10); i++) {
      if (key === "adults") {
        result.push("ADL");
      } else if (key === "childs") {
        result.push("CHD");
      } else if (key === "infants") {
        result.push("INF");
      }
    }
  });

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">
        <CardLayoutContainer className={'mb-5'}>
          <div className="flex justify-between px-6 items-end py-9 text-text">
            <div>
              <p className="text-text text-lg font-bold uppercase flex gap-2 pb-3"><span>LHE</span>-<span>ISB</span></p>
              <div className="flex gap-4 flex-wrap items-center ">
                <div className="flex gap-1 text-base text-text font-semibold items-start">
                  <MdCalendarMonth className="text-xl" />
                  <span>Feb 12</span>
                </div>
                <div className="flex gap-1 text-base text-text font-semibold items-start">
                  <MdPerson className="text-xl" />
                  <span> {travelersData.adults} Adults</span>
                </div>
                <div className="flex gap-1 text-base text-text font-semibold items-start">
                  <MdChildCare className="text-xl" />
                  <span> {travelersData.childs} Children</span>
                </div>
                <div className="flex gap-1 text-base text-text font-semibold items-start">
                  <MdChildFriendly className="text-xl" />
                  <span> {travelersData.infants} Infants</span>
                </div>
              </div>
            </div>
            <div className=''>
              <p className="text-base text-primary font-semibold pb-2">Booking Confirmation</p>
              <p className="text-2xl font-semibold">W3UI4CWFKEX</p>
            </div>

          </div>


          {/* Forms */}
        </CardLayoutContainer>
        <div className="flex w-full">
          <div className="flex flex-wrap w-2/3">

            {
              result.map((travelertype, index) => {
                return (
                  <CardLayoutContainer key={index} className={"mb-5"}>
                    <CardLayoutHeader>
                      <h2 className="text-text capitalize text-2xl font-semibold">Travelers Detail Domestic</h2>
                    </CardLayoutHeader>
                    <CardLayoutHeader
                      className={
                        "flex items-center justify-between text-sm cursor-pointer"
                      }
                    >
                      <div
                        onClick={() => toogleFormHandler(index)}
                        className="w-full flex items-end justify-between"
                      >
                        <div>

                          <h2 className="text-xl font-semibold text-primary capitalize">
                            {`Traveller ${index + 1}. ${travelertype == 'ADL' ? 'adult' : travelertype == 'CHD' ? 'child' : 'infants'}`}
                          </h2>
                        </div>

                        <span className="text-2xl transition-all hover:scale-110 text-primary hover:text-secondary cursor-pointer">
                          {toogleForm !== index ? (
                            <FaChevronCircleDown />
                          ) : (
                            <FaChevronCircleUp />
                          )}
                        </span>
                      </div>
                    </CardLayoutHeader>
                    {toogleForm === index &&
                      <Formik
                        initialValues={initialValues}
                        // validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(index, values)}
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
                              <div className="flex ">


                                <CardLayoutBody
                                  className={
                                    `w-1/2 }`
                                  }
                                  removeBorder={true}
                                >
                                  <div className="flex flex-col gap-3 md:gap-5 mb-7">
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
                                        type={"email"}
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
                                      <CustomDate
                                       id={"date_of_birth"}
                                       label={"Date Of Birth"}
                                       name={'date of birth'}
                                       pastDate={true}
                                       value={values.date_of_birth}
                                      //  placeholder={"Select Date Of Birth"}
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
                                      {/* <Input
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
                                      /> */}
                                      <CustomDate
                                      id={"passport_expiry_date"}
                                      name={"passport_expiry_date"}
                                      label={"Passport Exp Date"}
                                      value={values.passport_expiry_date}
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
                                <div className="px-4 w-1/2 filledfields">
                                  <div className=" mt-5 rounded-xl p-7 bg-bluebg shadow-lg border-primary border-[1px] h-fit">
                                    <h1 className="text-text font-semibold text-2xl pb-3">Travelers Detail</h1>
                                    <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-text ">title <span>{values.title}</span></p>
                                    <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-text ">First name <span>{values.first_name}</span></p>
                                    <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-text ">last name <span>{values.last_name}</span></p>
                                    <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-text ">date of birth <span>{values.date_of_birth}</span></p>
                                    <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-text ">gender <span>{values.gender}</span></p>
                                    <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-text ">nationality <span>{values.country}</span></p>
                                    <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold  text-text">Passport no. <span>{values.passport_number}</span></p>
                                  </div>
                                </div>

                              </div>

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
                      </Formik>}
                  </CardLayoutContainer>
                )
              })
            }
          </div>
          <div className="px-3 w-1/3 ">
            <div className="flex flex-col gap-3 text-text bg-white p-4 py-8 rounded-lg text-sm">
              <h2 className="text-xl font-semibold">Price Summary</h2>
              <div className="flex-col gap-3">
                <div className="flex justify-between items-center border-b border-lightgray py-3">
                  <p className="w-1/2">Pakistan International Airlines (adult) x 1</p>
                  <p className="text-gray">PKR 104,421</p>
                </div>
                <div className="flex justify-between items-center border-b border-lightgray py-3">
                  <p>price you pay</p>
                  <p className="text-gray">PKR 104,421</p>
                </div>
                <div className="flex flex-col gap-3 pt-5">
                  <p onClick={() => setFareBreakdown((prev) => !prev)} className="font-semibold text-lg flex justify-between cursor-pointer items-center">Fare Break Down <span><FaChevronCircleDown className={`text-primary ${fareBreakdown ? 'rotate-180' : 'rotate-0'} transition-all duration-300 ease-in-out `} /></span></p>
                  <div className={` ${fareBreakdown ? 'h-auto' : 'h-0 overflow-hidden'} transition-all duration-300 ease-in-out flex flex-col gap-3 px-3`}>
                    <h2 className="text-lg font-semibold">Adult Break Down</h2>
                    <div className="flex justify-between items-center border-b border-lightgray py-2">
                      <p>Base Fare:</p>
                      <p className="text-gray">PKR 103,400</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-lightgray py-2">
                      <p>Tax:</p>
                      <p className="text-gray">PKR 4,640</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-lightgray py-2">
                      <p>Gross Fare:</p>
                      <p className="text-gray">PKR 108,040</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-lightgray py-2">
                      <p>Discount:</p>
                      <p className="text-gray">-PKR 3,619</p>
                    </div>
                    <div className="flex justify-between items-center  y-3">
                      <p className="text-primary font-semibold text-xl">Total</p>
                      <p className="text-gray">PKR 104,421</p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* Final Button to console all travelers data */}
        <div className="flex items-center justify-end gap-3 my-5">
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
