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
  FlightInfoCard,
  PriceSummary,
  Dropdown,
  ConfirmModal,
} from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { MdCalendarMonth, MdCalendarToday, MdCalendarViewMonth, MdCalendarViewWeek, MdCancel, MdChildCare, MdChildFriendly, MdOutlineCalendarMonth, MdPerson } from "react-icons/md";
import { IoIosAirplane, IoMdTimer } from "react-icons/io";
import { IoTimer } from "react-icons/io5";


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
  mobile: Yup.string()
    .matches(/^(\+92|0)?[0-9]{10,11}$/, "Invalid phone number")
    .required("Phone number is required"),
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
  const [flightSegments, setFlightSegments] = useState([]);
  const [pricingInfo, setPricingInfo] = useState();
  const [toogleForm, setToogleForm] = useState(0);
  const [passenger, setPassenger] = useState(0);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [disableAddTraveler, setDisableAddTraveler] = useState(null);
  const [travelersQuantity, setTravelersQuantity] = useState(0);
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
    previousPassenger: '',
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
    setConfirmStatus(false)
    const payload = {
      city: values.city,
      country: values.country,
      date_of_birth: values.date_of_birth,
      email: values.email,
      first_name: values.first_name,
      gender: values.gender,
      last_name: values.last_name,
      mobile: {
        area_code: String(values.mobile).slice(0, 3),
        country_code: String(values.mobile).slice(3, 5),
        number: String(values.mobile).slice(5, 12),
      },
      passenger_type: result[travelerIndex],
      passport_expiry_date: values.passport_expiry_date,
      passport_number: values.passport_number,
      telephone: {
        area_code: String(values.telephone).slice(0, 3),
        country_code: String(values.telephone).slice(3, 5),
        number: String(values.telephone).slice(5, 12),
      },
      title: values.title,
    };
    console.log(payload);
    setDisableAddTraveler(travelerIndex)
    setAllTravelersData((prevData) => [...prevData, payload]);
  };
  console.log('alltravelersdata', allTravelersData)

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
      setPricingInfo(location.state.pricingInfo);
      setFlightSegments(location.state.data.AirItinerary.OriginDestinationOptions[0].FlightSegment)
      console.log('data', location.state)
      console.log('travelersdata', location.state.travelers)
      setTravelersQuantity(Object.entries(location.state.travelers)
        .filter(([key, value]) => value > 0)
        .map(([key, value]) => {
          if (key == 'adults') {
            return {
              icon: <MdPerson />,
              name: 'Adult',
              value: value
            }
          } else if (key == 'childs') {
            return {
              icon: <MdChildCare />,
              name: 'Child',
              value: value
            }
          } else {
            return {
              icon: < MdChildFriendly />,
              name: 'Infant',
              value: value
            }
          }
        }))
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
  const [flightHrs, flightMins] = flightSegments[0].FlightDuration.split(":")
  const passengersList = [
    { value: 'Ahsan', label: 'Ahsan' },
    { value: 'Talha', label: 'Talha' },
    { value: 'Bakhtawar', label: 'Bakhtawar' },
    { value: 'Abdullah', label: 'Abdullah' },
    { value: 'Hashamuddin', label: 'Hashamuddin' },
    { value: 'Umer Khalid', label: 'Umer Khalid' }
  ]
const handleClearData=(setValues,travelerIndex)=>{
  setValues({
    title: titleOptions[0].value,
    previousPassenger: '',
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
  })
  setAllTravelersData((prev)=>prev.filter((item,i)=>i!=travelerIndex))
}
  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">
        <CardLayoutContainer className={'mb-5'}>
          <div className="flex justify-between px-6 items-end py-9 text-text">
            <div>
              <p className="text-text text-xl items-center font-bold uppercase flex gap-2 pb-3">
                <span>{flightSegments[0].DepartureAirport.LocationCode}</span>
                <div className="flex gap-3 items-center text-primary">
                  <span className="h-0.5 w-6 bg-primary"></span>
                  <IoIosAirplane className="text-2xl" />
                  <span className="h-0.5 w-6 bg-primary"></span>
                </div>
                <span>{flightSegments[0].ArrivalAirport.LocationCode}</span>
                <div className="text-sm flex items-end gap-1 ml-4 h-fit pt-1 lowercase rounded-lg  text-primary">
                  <IoTimer className="mb-[3px] text-base" />{flightHrs.replace('0', '')} hrs {flightMins} mins
                </div>
              </p>
              <div className="flex gap-4 flex-wrap items-center ">
                <div className="flex gap-1 text-base text-text font-semibold items-start">
                  <MdCalendarMonth className="text-xl" />
                  <span>Feb 12</span>
                </div>
                {travelersQuantity.map((traveler, i) => (
                  <div key={i} className="flex gap-1 text-xl text-text font-semibold items-start">
                    {traveler.icon}

                    <span className="text-base"> {traveler.value} {traveler.name}{traveler.value > 1 && (traveler.name == 'Child' ? 'ren' : 's')}</span>


                  </div>
                ))}
                {/* 
                <div className="flex gap-1 text-base text-text font-semibold items-start">
                  <MdChildCare className="text-xl" />
                  <span> {travelersData.childs} Children</span>
                </div>
                <div className="flex gap-1 text-base text-text font-semibold items-start">
                  <MdChildFriendly className="text-xl" />
                  <span> {travelersData.infants} Infants</span>
                </div> */}
              </div>
            </div>
            <div className=''>
              <p className="text-base text-primary font-semibold pb-2">Free Baggages</p>
              {flightSegments[0].FreeBaggages.map((passenger, idx) => (
                <div key={idx} className=" font-semibold flex gap-2">
                  <p>{passenger.PassengerType}</p>
                  <p>{passenger.Quantity}{passenger.Unit}</p>
                </div>

              ))}
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




                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={(values) => handleSubmit(index, values)}
                      enableReinitialize

                    >
                      {({
                        values,
                        setValues,
                        errors,
                        touched,
                        setFieldValue,
                        handleSubmit,
                      }) => (

                        <>
                          <div className="w-80 mx-auto  py-10 flex flex-col gap-6">
                            <div className=" flex items-center gap-2">
                              <Select
                                id={'passengers'}
                                label={'Passengers'}
                                onChange={(option) => setFieldValue("previousPassenger", option.value)}
                                value={values.previousPassenger}
                                options={passengersList}
                              />
                              {values.previousPassenger &&
                                <MdCancel className="text-primary text-2xl cursor-pointer" onClick={() => setFieldValue("previousPassenger", '')} />

                              }
                            </div>


                            <div className="flex gap-3 w-full items-center text-primary">
                              <span className="h-0.5 w-2/5 bg-primary"></span>
                              <p className="text-2xl w-1/5 text-center" >OR</p>
                              <span className="h-0.5 w-2/5 bg-primary"></span>
                            </div>
                            <h1 onClick={() => toogleFormHandler(index)} className="capitalize text-text text-center font-semibold text-xl">Add a new traveler</h1>
                          </div>
                          {toogleForm === index &&
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
                                  <p onClick={()=>handleClearData(setValues,index)} className="text-primary cursor-pointer hover:text-secondary underline text-end w-full">
                                    Clear Data</p>
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
                                    text={disableAddTraveler==index?"Traveller Added":"Add Traveler"}
                                    onClick={()=>setConfirmStatus(true)}
                                    disabled={disableAddTraveler==index}
                                  />
                                  <ConfirmModal status={confirmStatus} onAbort={()=>setConfirmStatus(false)} onConfirm={handleSubmit} text={"Is the traveler data you provided is correct"}/>
                                </div>
                              </div>
                            </>}
                        </>
                      )}
                    </Formik>
                  </CardLayoutContainer>
                )
              })
            }
          </div>
          <div className="px-3 w-1/3 flex flex-col gap-3 ">
            <PriceSummary pricingInfo={pricingInfo} travelers={travelersData} totalTravelers={result} />
            <h2 className="text-2xl font-semibold text-text pl-1 pt-4">Trip Summary</h2>

            <FlightInfoCard flights={flightSegments} />
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
