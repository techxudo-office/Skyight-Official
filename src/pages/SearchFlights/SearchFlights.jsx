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

import {
  Select,
  Input,
  Spinner,
  Button,
  CustomDate,
  MultiCity,
} from "../../components/components";

import { iranianCities } from "../../data/iranianCities";

import { FaPlaneDeparture } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FlightsBanner, forBackArrows } from "../../assets/Index";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import { internationalCities } from "../../data/InternationalCities";
import { useDispatch, useSelector } from "react-redux";
import { searchFlight, setSearchForm } from "../../_core/features/bookingSlice";

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
  flightRoute: Yup.string().required("Please select a flight route"),
  departure: Yup.string().required("Please select departure"),
  arrival: Yup.string().required("Please select arrival"),
  departureDate: Yup.date().required("Please select departure date"),
  returnDate: Yup.date().when("tripType", {
    is: (tripType) => tripType !== "One-Way",
    then: (schema) => schema.required("Please select return date"),
    otherwise: (schema) => schema.notRequired(),
  }),
  adult: Yup.string().required("Please select the number of adults"),
  child: Yup.string().required("Please select the number of children"),
  infant: Yup.string().required("Please select the number of infants"),
  cabinClass: Yup.string().required("Please select the cabin class"),
});


const SearchFlights = ({ OnlySearch, onSearch }) => {
  const { isLoadingSearchResults, searchForm } = useSelector((state) => state.booking);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [activeField, setActiveField] = useState({
    departure: false,
    arrival: false,
    departureDate: false,
    returnDate: false,
    cabinClass: false,
    adult: false,
    child: false,
    infant: false,
  });

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

  const initialValues = {
    flightRoute: "",
    tripType: "",
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
      flightRoute: values.flightRoute,
      tripType: values.tripType === "Round-Trip" ? "Return" : "OneWay",
      originCode: values.departure,
      destinationCode: values.arrival,
      departureDate: values.departureDate,
      returnDate: values.returnDate,
      adult: Number(values.adult),
      child: Number(values.child),
      infant: Number(values.infant),
    };

    try {
      const response = await dispatch(
        searchFlight({ payload, token: userData?.token })
      ).unwrap();

      if (
        response?.PricedItineraries?.PricedItinerary &&
        response.PricedItineraries.PricedItinerary.length > 0
      ) {
        navigate("/dashboard/flight-results", {
          state: {
            payload,
            flightsData: response,
            travelersData: {
              adults: payload.adult,
              childs: payload.child,
              infants: payload.infant,
            },
          },
        });
      } else {
        toast.error(response?.message || "No flights found");
      }
    } catch (error) {
      if (Array.isArray(error)) {
        error.forEach((msg) => toast.error(msg.toUpperCase()));
      } else {
        toast.error(error || "Failed to search flights");
      }
    }
  };

  const handleSubmit = (values) => {
    // console.log("handleSubmit");
    localStorage.removeItem("allFormData");
    localStorage.removeItem("disableTravelers");
    localStorage.removeItem("oldTraveller");
    dispatch(setSearchForm(values))
    console.log("submitting");
    searchFlightHandler(values);
  };

  useEffect(() => {
    const selectRef = document.getElementsByClassName("select");
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
          infant: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const isFirstRender = useRef(true);
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center w-full">
        {OnlySearch ? (
          ""
        ) : (
          <img
            src={FlightsBanner}
            alt="profile-img"
            className="w-full h-60 max-md:object-contain"
          />
        )}

        <CardLayoutContainer className={"mb-10"}>
          <CardLayoutHeader
            heading="Search Flight"
            className={"flex items-center justify-between "}
          />

          <Formik
            initialValues={searchForm || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              values,
              setValues,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
            }) => {
              useEffect(() => {
                if (isFirstRender.current) {
                  isFirstRender.current = false; // Mark first render as done
                  return; // Skip effect on initial render
                }

                setValues((prev) => ({
                  ...prev,
                  departure: "",
                  arrival: "",
                }));
              }, [values.flightRoute]);
              console.log(errors);
              return (
                <Form>
                  <CardLayoutBody>
                    <RadioButtons
                      value={values.flightRoute}
                      options={["Domestic", "International"]}
                      selectedOption={(option) =>
                        setFieldValue("flightRoute", option)
                      }
                    />
                    {touched.flightRoute && errors.flightRoute && (
                      <div className="mt-2 text-sm text-red-500 -bottom-6">
                        {errors.flightRoute}
                      </div>
                    )}
                  </CardLayoutBody>
                  <CardLayoutBody>
                    <RadioButtons
                      value={values.tripType}
                      disabledOptionindex={
                        values.flightRoute == "Domestic" ? [1, 2] : []
                      }
                      options={["One-Way", "Round-Trip", "Multi-City"]}
                      selectedOption={(option) =>
                        setFieldValue("tripType", option)
                      }
                    />

                    {errors.tripType && (
                      <div className="mt-2 text-sm text-red-500 -bottom-6">
                        {errors.tripType}
                      </div>
                    )}
                  </CardLayoutBody>
                  {values.tripType !== "Multi-City" ? (
                    <>
                      <CardLayoutBody>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-5 mb-7">
                          <div className="relative flex flex-col mb-5 md:flex-row max-md:items-center ">
                            <Select
                              id="departure"
                              label="Departure From"
                              options={
                                values.flightRoute == "Domestic"
                                  ? iranianCities.filter(
                                    (item) => item.value != values.arrival
                                  )
                                  : internationalCities.filter(
                                    (item) => item.value != values.arrival
                                  )
                              }
                              value={values.departure}
                              placeholder="Select Departure"
                              onChange={(option) => {
                                setFieldValue("departure", option.value);
                                activateField("arrival");
                              }}
                              className={"select w-full"}
                              optionIcons={<FaPlaneDeparture />}
                              selectIcon={<FaPlaneDeparture />}
                            />
                            {touched.departure && errors.departure && (
                              <div className="absolute left-0 mt-2 text-sm text-red-500 -bottom-6">
                                {errors.departure}
                              </div>
                            )}
                            <div className=" rounded-full border-gray border-[1px] w-fit h-fit pt-3 pl-3 p-2 z-10 -mt-3 md:-ml-3 md:mt-2 -mb-11 md:-mr-8  bg-white">
                              <img
                                src={forBackArrows}
                                alt=""
                                className="w-8 p-0 bg-white md:w-6 "
                              />
                            </div>
                          </div>

                          <div className="relative mb-5">
                            <Select
                              className={"select w-full"}
                              isSelected={activeField.arrival}
                              id="arrival"
                              label="Arrival To"
                              options={
                                values.flightRoute == "Domestic"
                                  ? iranianCities.filter(
                                    (item) => item.value != values.departure
                                  )
                                  : internationalCities.filter(
                                    (item) => item.value != values.departure
                                  )
                              }
                              value={values.arrival}
                              placeholder="Select Arrival"
                              onChange={(option) => {
                                setFieldValue("arrival", option.value);
                                activateField("departureDate");
                              }}
                              optionIcons={<FaPlaneArrival />}
                              selectIcon={<FaPlaneArrival size={18} />}
                            />
                            {touched.arrival && errors.arrival && (
                              <div className="absolute left-0 mt-2 text-sm text-red-500">
                                {errors.arrival}
                              </div>
                            )}
                          </div>

                          <div className="relative mb-5 select">
                            <CustomDate
                              onChange={(e) => {
                                setFieldValue("departureDate", e.target.value);
                                if (values.tripType != "One-Way") {
                                  activateField("returnDate");
                                } else {
                                  activateField("adult");
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
                              <div className="absolute left-0 mt-2 text-sm text-red-500">
                                {errors.departureDate}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5 select">
                            <CustomDate
                              onChange={(e) => {
                                setFieldValue("returnDate", e.target.value);
                                activateField("adult");
                              }}
                              value={
                                values.tripType == "One-Way"
                                  ? ""
                                  : values.returnDate
                              }
                              isSelected={activeField.returnDate}
                              name={"returnDate"}
                              label={"Return Date"}
                              disabled={values.tripType == "One-Way"}
                              pastDate={false}
                            />
                            {values.tripType !== "One-Way" &&
                              touched.returnDate &&
                              errors.returnDate && (
                                <div className="absolute left-0 mt-2 text-sm text-red-500">
                                  {errors.returnDate}
                                </div>
                              )}
                          </div>
                          <div className="relative mb-5 select">
                            <Select
                              isSelected={activeField.adult}
                              id="adult"
                              label="Adult"
                              options={adultOptions}
                              value={values.adult}
                              placeholder="Select Adults"
                              onChange={(option) => {
                                setFieldValue("adult", option.value);
                                activateField("child");
                              }}
                              optionIcons={<IoIosMan />}
                              selectIcon={<IoIosMan />}
                            />
                            {touched.adult && errors.adult && (
                              <div className="absolute left-0 mt-2 text-sm text-red-500">
                                {errors.adult}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5 select">
                            <Select
                              isSelected={activeField.child}
                              id="child"
                              label="Child"
                              options={childOptions}
                              value={values.child}
                              placeholder="Select Childrens"
                              onChange={(option) => {
                                setFieldValue("child", option.value);
                                activateField("infant");
                              }}
                              optionIcons={<FaChild />}
                              selectIcon={<FaChild />}
                            />
                            {touched.child && errors.child && (
                              <div className="absolute left-0 mt-2 text-sm text-red-500">
                                {errors.child}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5 select">
                            <Select
                              isSelected={activeField.infant}
                              id="infant"
                              label="Infant"
                              options={infantOptions}
                              value={values.infant}
                              placeholder="Select Infants"
                              onChange={(option) => {
                                setFieldValue("infant", option.value);
                                activateField("cabinClass");
                              }}
                              optionIcons={<MdChildFriendly />}
                              selectIcon={<MdChildFriendly />}
                            />
                            {touched.infant && errors.infant && (
                              <div className="absolute left-0 mt-2 text-sm text-red-500">
                                {errors.infant}
                              </div>
                            )}
                          </div>
                          <div className="relative mb-5 select">
                            <Select
                              isSelected={activeField.cabinClass}
                              id="cabinClass"
                              label="Cabin Class"
                              options={cabinClassOptions}
                              value={values.cabinClass}
                              placeholder="Cabin Class"
                              onChange={(option) => {
                                setFieldValue("cabinClass", option.value);
                                activateField(null);
                              }}
                              optionIcons={<MdChildFriendly />}
                            />
                            {touched.cabinClass && errors.cabinClass && (
                              <div className="absolute left-0 mt-2 text-sm text-red-500">
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
                            disabled={isLoadingSearchResults}
                            loading={isLoadingSearchResults}
                          />
                        </div>
                      </CardLayoutFooter>
                    </>
                  ) : (
                    <MultiCity />
                  )}
                </Form>
              );
            }}
          </Formik>
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default SearchFlights;
