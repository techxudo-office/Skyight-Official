import React, { useState } from "react";
import plane from "../../assets/images/plane.webp";
// icons
import { FaPlaneArrival } from "react-icons/fa";
import { MdChildFriendly } from "react-icons/md";
import { FaChild } from "react-icons/fa6";
import { IoIosMan } from "react-icons/io";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import { Select, Input, Spinner, Button } from "../../components/components";

import { iranianCities } from "../../data/iranianCities";
import { searchFlight } from "../../utils/api_handler";

import { FaPlaneDeparture } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { forBackArrows } from "../../assets/Index";


const adultOptions = [
  { value: "1", label: "1 Adult" },
  { value: "2", label: "2 Adult" },
  { value: "3", label: "3 Adult" },
  { value: "4", label: "4 Adult" },
  { value: "5", label: "5 Adult" },
];

const childOptions = [
  { value: "0", label: "0 Child" },
  { value: "1", label: "1 Child" },
  { value: "2", label: "2 Child" },
];

const infantOptions = [
  { value: "0", label: "0 Infant" },
  { value: "1", label: "1 Infant" },
  { value: "2", label: "2 Infant" },
];
const cabinClassOptions = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
  { value: "First Class", label: "First Class" },
  { value: "Premium Economy", label: "Premium Economy" },
];

const tripTypeOptions = [
  { value: "OneWay", label: "One Way" },
  { value: "RoundTrip", label: "Round Trip" },
  { value: "MultiCity", label: "Multi-City" },
];

const validationSchema = Yup.object().shape({
  tripType: Yup.string().required("Please select a trip type"),
  departure: Yup.string().required("Please select departure"),
  arrival: Yup.string().required("Please select arrival"),
  departureDate: Yup.date().required("Please select departure date"),
  // returnDate: Yup.date().required("Please select return date"),
  adult: Yup.string().required("Please select the number of adults"),
  child: Yup.string().required("Please select the number of children"),
  infant: Yup.string().required("Please select the number of infants"),
  // cabinClass: Yup.string().required("Please select the cabin class"),
});



const SearchFlights = ({OnlySearch}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(false);

  const initialValues = {
    tripType: "OneWay", // Default value
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
    cabinClass: "",
    adult: adultOptions[0].value,
    child: childOptions[0].value,
    infant: infantOptions[0].value,
  };

  const searchFlightHandler = async (values) => {
    const payload = {
      departureDate: values.departureDate,
      tripType: "OneWay",
      originCode: values.departure,
      destinationCode: values.arrival,
      adult: values.adult,
      child: values.child,
      infant: values.infant,
    };

    setLoading(true);
    const response = await searchFlight(payload);
    setLoading(false);
    if (response) {
      if (response.status) {
        if (response.data.PricedItineraries.PricedItinerary.length > 0) {
          navigate("/dashboard/flight-results", {
            state: {
              payload:payload,
              flightsData: response.data,
              travelersData: {
                adults: payload.adult,
                childs: payload.child,
                infants: payload.infant,
              },
              
            },
          });
        }
      } else {
        if (Array.isArray(response.message)) {
          response.message.map((error) => {
            return toast.error(error.toUpperCase());
          });
        } else {
          toast.error(response.message);
        }
      }
    }
  };

  const handleSubmit = (values) => {
    console.log("handleSubmit");
    setFormData(values)
    console.log("Form Values: ", values);
    sendData()

  };
  const sendData = () => {
    searchFlightHandler(formData);
  }

  const handleOnTripchange = (values) => {
    values=[]

  }
  return (
    <>
      <Toaster />
      <div className="flex flex-col w-full items-center justify-center">
       {OnlySearch?'': <CardLayoutContainer className="w-full mb-5">
          <CardLayoutHeader
            className="flex items-center justify-start flex-wrap gap-5 py-3"
            removeBorder={true}
          >
            <img src={plane} alt="profile-img" className="h-60 w-full" />
          </CardLayoutHeader>
        </CardLayoutContainer>}

        <CardLayoutContainer>
          <CardLayoutHeader
            heading="Search Flight"
            className={"flex items-center justify-between"}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >

            {({ values,setValues, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <CardLayoutBody>
                  <div className="flex gap-7 mb-9">
                    {tripTypeOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer text-gray"
                      >
                        <input
                          label={option.value}
                          type="radio"
                          name="tripType"
                          value={option.value}
                          checked={values.tripType === option.value}
                          onChange={() =>
                            setFieldValue("tripType", option.value) 
                          }
                        />
                        {option.value}
                      </label>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-7">
                    <div className="relative mb-5 flex md:flex-row flex-col max-md:items-center ">
                      <Select
                        id="departure"
                        label="Departure From"
                        name="departure"
                        options={iranianCities}
                        value={values.departure}
                        placeholder="Select Departure"
                        onChange={(option) =>
                          setFieldValue("departure", option.value)
                        }
                        className={''}
                        optionIcons={<FaPlaneDeparture />}
                        selectIcon={<FaPlaneDeparture />}
                      />
                      {touched.departure && errors.departure && (
                        <div className="text-red-500 text-sm mt-2 absolute -bottom-6 left-0">
                          {errors.departure}
                        </div>
                      )}
                      <div className=" rounded-full border-gray border-[1px] w-fit h-fit pt-3 pl-3 p-2 z-10 -mt-3 md:-ml-3 md:mt-2 -mb-11 md:-mr-8  bg-white" >
                        <img src={forBackArrows} alt="" className="p-0 w-8 md:w-6 bg-white " />

                      </div>
                    </div>


                    <div className="relative mb-5">
                      <Select
                        id="arrival"
                        label="Arrival To"
                        name="arrival"
                        options={iranianCities}
                        value={values.arrival}
                        placeholder="Select Arrival"
                        onChange={(option) =>
                          setFieldValue("arrival", option.value)
                        }
                        optionIcons={<FaPlaneArrival />}
                        selectIcon={<FaPlaneArrival size={18} />}
                      />
                      {touched.arrival && errors.arrival && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.arrival}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-5">
                      <Input
                        id={"departureDate"}
                        name={"departureDate"}
                        label={"Departure Date"}
                        type={"date"}
                        value={values.departureDate}
                        placeholder={"Select Departure Date"}
                        onChange={(e) =>
                          setFieldValue("departureDate", e.target.value)
                        }
                      />
                      {touched.departureDate && errors.departureDate && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.departureDate}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        disabled={values.tripType == "OneWay"}
                        // disabled={true}
                        id={"returnDate"}
                        name={"returnDate"}
                        label={"Return Date"}
                        type={"date"}
                        value={values.returnDate}
                        placeholder={"Select Return Date"}
                        onChange={(e) => {
                          if (values.tripType !== "OneWay") {
                            setFieldValue("returnDate", e.target.value);
                          }
                        }}
                      />
                      {values.tripType !== "OneWay" && touched.returnDate && errors.returnDate && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.returnDate}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Select
                        id="adult"
                        label="Adult"
                        name="adult"
                        options={adultOptions}
                        value={values.adult}
                        placeholder="Select Adults"
                        onChange={(option) =>
                          setFieldValue("adult", option.value)
                        }
                        optionIcons={<IoIosMan />

                        }
                        selectIcon={<IoIosMan />}
                      />
                      {touched.adult && errors.adult && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.adult}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Select
                        id="child"
                        label="Child"
                        name="child"
                        options={childOptions}
                        value={values.child}
                        placeholder="Select Childrens"
                        onChange={(option) =>
                          setFieldValue("child", option.value)
                        }
                        optionIcons={<FaChild />}
                        selectIcon={<FaChild />}
                      />
                      {touched.child && errors.child && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.child}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Select
                        id="infant"
                        label="Infant"
                        name="infant"
                        options={infantOptions}
                        value={values.infant}
                        placeholder="Select Infants"
                        onChange={(option) =>
                          setFieldValue("infant", option.value)
                        }
                        optionIcons={<MdChildFriendly />}
                        selectIcon={<MdChildFriendly />}
                      />
                      {touched.infant && errors.infant && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.infant}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Select
                        id="cabinClass"
                        label="Cabin Class"
                        name="cabinClass"
                        options={cabinClassOptions}
                        value={values.cabinClass}
                        placeholder="Cabin Class"
                        onChange={(option) =>
                          setFieldValue("cabinClass", option.value)
                        }
                        optionIcons={<MdChildFriendly />}
                      />
                      {touched.cabinClass && errors.cabinClass && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.infant}
                        </div>
                      )}
                    </div>
                  </div>
                </CardLayoutBody>
                <CardLayoutFooter>
                  <div>
                    <Button
                      text={loading ? <Spinner /> : "Search Flight"}
                      type="submit"
                      disabled={loading}
                    />
                  </div>
                </CardLayoutFooter>
              </Form>
            )}
          </Formik>
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default SearchFlights;
