import React, { useEffect, useRef, useState } from "react";
import plane from "../../assets/images/plane.webp";
// icons
import { FaPlaneArrival } from "react-icons/fa";
import { MdChildFriendly, MdSearch } from "react-icons/md";
import { FaChild } from "react-icons/fa6";
import { IoIosMan } from "react-icons/io";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import { Select, Input, Spinner, Button, CustomDate, MultiCity } from "../../components/components";

import { iranianCities } from "../../data/iranianCities";
import { searchFlight } from "../../utils/api_handler";

import { FaPlaneDeparture } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FlightsBanner, forBackArrows } from "../../assets/Index";
import RadioButtons from "../../components/RadioButtons/RadioButtons";


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



const SearchFlights = ({ OnlySearch, onSearch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(false);
  const [flightRoute, setFlightRoute] = useState("Domestic");
  const [Triptype, setTriptype] = useState("One-Way");
  const [activeField, setActiveField] = useState({
    departure: false,
    arrival: false,
    departureDate: false,
    returnDate: false,
    cabinClass: false,
    adult: false,
    child: false,
    infant: false,
  })
  const activateField = (fieldName) => {
    setActiveField((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false; // Set all fields to false
        return acc;
      }, {});
      newState[fieldName] = true; // Set only the desired field to true
      return newState;
    });
  };

  const loadFormData = () => {
    const storedValues = localStorage.getItem("flightSearchForm");
    return storedValues ? JSON.parse(storedValues) : null;
  };
  // console.log(activeField)
  const initialValues = loadFormData() || {
    tripType: "OneWay", // Default value
    flightRoute:flightRoute,
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
      flightRoute:flightRoute,
      tripType: "OneWay",
      originCode: values.departure,
      destinationCode: values.arrival,
      adult: values.adult,
      child: values.child,
      infant: values.infant,
    };
    console.log('values', values)
    setLoading(true);
    const response = await searchFlight(payload);
    setLoading(false);
    if (response) {
      if (response.status) {
        if (response.data.PricedItineraries.PricedItinerary.length > 0) {
          navigate("/dashboard/flight-results", {
            state: {
              payload: payload,
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
    // console.log("handleSubmit");
    localStorage.removeItem("allFormData")
    localStorage.removeItem("disableTravelers")
    localStorage.setItem("flightSearchForm", JSON.stringify(values));
    setFormData(values)
    // console.log("Form Values: ", values);

    searchFlightHandler(values)

  };

  useEffect(() => {
    const selectRef = document.getElementsByClassName('select')
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveField({
          departure: false,
          arrival: false,
          departureDate: false,
          returnDate: false,
          cabinClass: false,
          adult: false,
          child: false,
          infant: false
        })
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);
console.log("flightroute",flightRoute)
  return (
    <>
      <Toaster />
      <div className="flex flex-col w-full items-center justify-center">
        {OnlySearch ? '' :
          <img src={FlightsBanner} alt="profile-img" className="h-60 w-full max-md:object-contain" />
        }

        <CardLayoutContainer className={'mb-10'}>
          <CardLayoutHeader
            heading="Search Flight"
            className={"flex items-center justify-between "}
          />
            <CardLayoutBody>
            <RadioButtons options={["Domestic", "International"]} selectedOption={(option) => setFlightRoute(option)} />
          </CardLayoutBody>
          <CardLayoutBody>
            <RadioButtons options={["One-Way", "Round-Trip", "Multi-City"]} selectedOption={(option) => setTriptype(option)} />
          </CardLayoutBody>
        

          {Triptype != 'Multi-City' ?
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >

              {({ values, setValues, errors, touched, setFieldValue, isSubmitting }) => (
                <Form>
                  <CardLayoutBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-7">
                      <div className="relative mb-5 flex md:flex-row flex-col max-md:items-center ">
                        <Select
                          id="departure"
                          label="Departure From"
                          name="departure"
                          options={iranianCities.filter((item) => item.value != values.arrival)}
                          value={values.departure}
                          placeholder="Select Departure"
                          onChange={(option) => {
                            setFieldValue("departure", option.value);
                            activateField('arrival')
                          }}
                          className={'select w-full'}
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
                          className={'select w-full'}
                          isSelected={activeField.arrival}
                          id="arrival"
                          label="Arrival To"
                          name="arrival"
                          options={iranianCities.filter((item) => item.value != values.departure)}
                          value={values.arrival}
                          placeholder="Select Arrival"
                          onChange={(option) => {
                            setFieldValue("arrival", option.value);
                            activateField('departureDate')
                          }
                          }
                          optionIcons={<FaPlaneArrival />}
                          selectIcon={<FaPlaneArrival size={18} />
                          }
                        />
                        {touched.arrival && errors.arrival && (
                          <div className="text-red-500 text-sm mt-2 absolute left-0">
                            {errors.arrival}
                          </div>
                        )}
                      </div>

                      <div className="relative mb-5 select">
                        <CustomDate
                          onChange={(e) => {
                            setFieldValue("departureDate", e.target.value)
                            if (Triptype != "One-Way") {
                              activateField('returnDate')
                            } else {
                              activateField('adult')
                            }
                          }}
                          pastDate={false}
                          value={values.departureDate}
                          isSelected={activeField.departureDate}
                          name={"departureDate"}
                          label={"Departure Date"}
                          disabled={false}

                        />

                        {touched.departureDate && errors.departureDate && (
                          <div className="text-red-500 text-sm mt-2 absolute left-0">
                            {errors.departureDate}
                          </div>
                        )}
                      </div>
                      <div className="relative mb-5 select">
                        <CustomDate
                          onChange={(e) => {
                            setFieldValue("returnDate", e.target.value)
                            activateField('adult')
                          }}
                          value={values.returnDate}
                          isSelected={activeField.returnDate}
                          name={"returnDate"}
                          label={"Return Date"}
                          disabled={Triptype == "One-Way"}
                          pastDate={false}

                        />
                        {Triptype !== "One-Way" && touched.returnDate && errors.returnDate && (
                          <div className="text-red-500 text-sm mt-2 absolute left-0">
                            {errors.returnDate}
                          </div>
                        )}
                      </div>
                      <div className="relative mb-5 select">
                        <Select
                          isSelected={activeField.adult}
                          id="adult"
                          label="Adult"
                          name="adult"
                          options={adultOptions}
                          value={values.adult}
                          placeholder="Select Adults"
                          onChange={(option) => {
                            setFieldValue("adult", option.value)
                            activateField('child')
                          }}
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
                      <div className="relative mb-5 select">
                        <Select
                          isSelected={activeField.child}
                          id="child"
                          label="Child"
                          name="child"
                          options={childOptions}
                          value={values.child}
                          placeholder="Select Childrens"
                          onChange={(option) => {
                            setFieldValue("child", option.value)
                            activateField('infant')
                          }}
                          optionIcons={<FaChild />}
                          selectIcon={<FaChild />}
                        />
                        {touched.child && errors.child && (
                          <div className="text-red-500 text-sm mt-2 absolute left-0">
                            {errors.child}
                          </div>
                        )}
                      </div>
                      <div className="relative mb-5 select">
                        <Select
                          isSelected={activeField.infant}
                          id="infant"
                          label="Infant"
                          name="infant"
                          options={infantOptions}
                          value={values.infant}
                          placeholder="Select Infants"
                          onChange={(option) => {
                            setFieldValue("infant", option.value)
                            activateField('cabinClass')
                          }}
                          optionIcons={<MdChildFriendly />}
                          selectIcon={<MdChildFriendly />}
                        />
                        {touched.infant && errors.infant && (
                          <div className="text-red-500 text-sm mt-2 absolute left-0">
                            {errors.infant}
                          </div>
                        )}
                      </div>
                      <div className="relative mb-5  select">
                        <Select
                          isSelected={activeField.cabinClass}
                          id="cabinClass"
                          label="Cabin Class"
                          name="cabinClass"
                          options={cabinClassOptions}
                          value={values.cabinClass}
                          placeholder="Cabin Class"
                          onChange={(option) => {
                            setFieldValue("cabinClass", option.value)
                            activateField(null)
                          }}
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
                    <div onClick={onSearch}>
                      <Button
                        icon={<MdSearch />}
                        text={"Search Flight"}
                        type="submit"
                        disabled={loading}
                        loading={loading}
                      />
                    </div>
                  </CardLayoutFooter>
                </Form>
              )}
            </Formik> :
            <MultiCity />}
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default SearchFlights;
