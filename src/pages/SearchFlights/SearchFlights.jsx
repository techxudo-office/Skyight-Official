import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
import { MdChildFriendly, MdSearch, MdOutlineClass } from "react-icons/md";
import { IoIosMan } from "react-icons/io";
import { Formik, Form } from "formik";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { City, Country } from "country-state-city";


// Optimized imports
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Button, CustomDate, Spinner } from "../../components/components";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import {
  emptyBookingStates,
  getBookingRoutes,
  searchFlight,
  setSearchForm,
} from "../../_core/features/bookingSlice";
import { searchFlightValidationSchema } from "../../schema/validationSchema";
import { FormSelect } from "./FormSelect/FormSelect";
import { FlightsBanner, forBackArrows } from "../../assets/Index";
import CityCodes from "../../AirlinesData/CityCodes";
import airports from 'airports';
import airportCodes from 'airport-codes';

// Constants
const TRIP_TYPES = ["One-Way", "Round-Trip"];
// const FLIGHT_ROUTES = ["Domestic", "International"];
const INITIAL_VALUES = {
  // flightRoute: FLIGHT_ROUTES[0],
  tripType: TRIP_TYPES[0],
  departure: "",
  arrival: "",
  departureDate: "",
  returnDate: "",
  cabinClass: "Economy",
  adult: 1,
  child: 0,
  infant: 0,
};

const SELECT_FIELDS = [
  {
    id: "adult",
    label: "Adult",
    options: Array.from({ length: 9 }, (_, i) => ({ value: i + 1, label: i + 1 })),
    icon: <IoIosMan />,
    next: "child",
  },
  {
    id: "child",
    label: "Child",
    options: Array.from({ length: 9 }, (_, i) => ({ value: i, label: i })),
    icon: <FaChild />,
    next: "infant",
  },
  {
    id: "infant",
    label: "Infant",
    options: Array.from({ length: 9 }, (_, i) => ({ value: i, label: i })),
    icon: <MdChildFriendly />,
    next: "cabinClass",
  },
  {
    id: "cabinClass",
    label: "Cabin Class",
    options: ["Economy", "Premium Economy", "Business", "First Class"].map(c => ({ value: c, label: c })),
    icon: <MdOutlineClass />,
  },
];

const SearchFlights = ({ OnlySearch, onSearch }) => {
  const [countryName, setCountryName] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { isLoadingSearchResults, searchForm, bookingRoutes, isLoadingRoutes } = useSelector((state) => state.booking);

  const [activeField, setActiveField] = useState({});
  const containerRef = useRef(null);

  // Memoized handler for field activation
  const activateField = ((fieldName) => {
    setActiveField(prev => ({ ...Object.fromEntries(Object.keys(prev).map(k => [k, false])), [fieldName]: true }));
  })

  // Optimized flight search handler
  const searchFlightHandler = useCallback(async (values) => {
    try {
      const payload = {
        // flightRoute: values.flightRoute,
        tripType: values.tripType === "Round-Trip" ? "Return" : "OneWay",
        originCode: values.departure,
        destinationCode: values.arrival,
        departureDate: dayjs(values.departureDate).format("YYYY-MM-DD"),
        returnDate: values.returnDate ? dayjs(values.returnDate).format("YYYY-MM-DD") : "",
        adult: Number(values.adult),
        child: Number(values.child),
        infant: Number(values.infant),
      };

      const response = await dispatch(
        searchFlight({ payload, token: userData?.token })
      ).unwrap();

      if (!response?.PricedItineraries?.PricedItinerary?.length) {
        throw new Error("No flights found");
      }

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
    } catch (error) {
      toast.error(error.message || "No flights found");
    }
  }, [dispatch, userData, navigate]);

  // Form submission handler
  const handleSubmit = useCallback((values) => {
    dispatch(emptyBookingStates());
    dispatch(setSearchForm(values));
    searchFlightHandler(values);
  }, [dispatch, searchFlightHandler]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveField({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch booking routes
  useEffect(() => {
    if (userData?.token) {
      dispatch(getBookingRoutes(userData.token));
    }
  }, [dispatch, userData]);

  if (isLoadingRoutes) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner className="text-primary" />
      </div>
    );
  }
  const getCountryByIata = (code) => {
    // Convert to uppercase to match IATA format
    const upperCode = code.toUpperCase().trim();

    // Find airport in the dataset
    const airport = airportCodes.findWhere({ iata: upperCode });

    if (!airport) {
      throw new Error(`No airport found for IATA code: ${code}`);
    }

    setCountryName(airport.get('country')) // Note: Typo in package ("country" is misspelled as "country")

  }


  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        {!OnlySearch && (
          <img
            src={FlightsBanner}
            alt="Flight banner"
            className="w-full h-60 max-md:object-contain"
            loading="lazy"
          />
        )}

        <CardLayoutContainer className="mb-10 bg-white" ref={containerRef}>
          <CardLayoutHeader heading="Search Flight" />

          <Formik
            initialValues={searchForm || INITIAL_VALUES}
            validationSchema={searchFlightValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                {/* <CardLayoutBody>
                  <RadioButtons
                    name="flightRoute"
                    value={values.flightRoute}
                    options={FLIGHT_ROUTES}
                    onChange={(val) => {
                      if (val === "Domestic") {
                        setFieldValue("tripType", "One-Way");
                      }
                      setFieldValue("returnDate", "");
                      setFieldValue("flightRoute", val)
                    }}
                  />
                  <p className="pt-3 text-sm italic text-text">
                    Note: Select 'Domestic' if traveling with your national ID
                  </p>
                </CardLayoutBody> */}

                <CardLayoutBody>
                  <RadioButtons
                    name="tripType"
                    value={values.tripType}
                    options={TRIP_TYPES}
                    onChange={(val) => {
                      setFieldValue("returnDate", "");
                      setFieldValue("tripType", val)
                    }}
                  />
                </CardLayoutBody>

                <CardLayoutBody>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-5 mb-7">
                    {/* Departure/Arrival Section */}
                    <div className="relative flex flex-col mb-5 md:flex-row max-md:items-center">
                      <FormSelect
                        touched={touched.departure}
                        error={errors.departure}
                        id="departure"
                        label="Select Departure"
                        options={bookingRoutes?.map(({ Origin }) => ({
                          value: Origin,
                          label: Origin,
                        }))}
                        value={values.departure}
                        onChange={(option) => {
                          setFieldValue("departure", option.value);
                          setFieldValue("arrival", "");
                          activateField("arrival");
                          getCountryByIata(option.value)

                        }}
                        icon={<FaPlaneDeparture />}
                      />
                      <div className="rounded-full border-gray border-[1px] w-fit h-fit pt-3 pl-3 p-2 z-10 -mt-3 md:-ml-3 md:mt-2 -mb-11 md:-mr-8 bg-white">
                        <img src={forBackArrows} alt="" className="w-8 p-0 bg-white md:w-6" />
                      </div>
                    </div>

                    <FormSelect
                      touched={touched.arrival}
                      error={errors.arrival}
                      id="arrival"
                      label="Select Arrival"
                      disabled={!values.departure}
                      isSelected={activeField.arrival}
                      options={bookingRoutes
                        ?.filter(({ Origin }) => Origin === values.departure)
                        .map(({ Destination }) => ({ value: Destination, label: Destination }))}
                      value={values.arrival}
                      onChange={(option) => {
                        setFieldValue("arrival", option.value);
                        activateField("departureDate");
                      }}
                      icon={<FaPlaneArrival />}
                    />

                    {/* Date Pickers */}
                    <CustomDate
                      touched={touched.departureDate}
                      error={errors.departureDate}
                      name="departureDate"
                      label="Departure Date"
                      value={values.departureDate}
                      isSelected={activeField.departureDate}
                      pastDate={false}
                      onChange={(e) => {
                        setFieldValue("departureDate", e.target.value);
                        activateField(values.tripType !== "One-Way" ? "returnDate" : "adult");
                      }}
                      minDate={dayjs().format("YYYY-MM-DD")}

                    />

                    <CustomDate
                      touched={touched.returnDate}
                      error={errors.returnDate}
                      name="returnDate"
                      label="Return Date"
                      value={values.returnDate}
                      isSelected={activeField.returnDate}
                      pastDate={false}
                      onChange={(e) => setFieldValue("returnDate", e.target.value)}
                      disabled={values.tripType === "One-Way" || values.departureDate === ""}
                      minDate={values.departureDate || dayjs().format("YYYY-MM-DD")}
                    />

                    {/* Passenger/Cabin Selectors */}
                    {SELECT_FIELDS.map((field) => (
                      <FormSelect
                        touched={touched[field.id]}
                        error={errors[field.id]}
                        key={field.id}
                        icons={field.icon}
                        {...field}
                        value={values[field.id]}
                        onChange={(option) => {
                          setFieldValue(field.id, option.value);
                          if (field.next) activateField(field.next);
                        }}
                        isSelected={activeField[field.id]}
                      />
                    ))}
                  </div>
                </CardLayoutBody>

                <CardLayoutFooter>
                  <Button
                    icon={<MdSearch />}
                    text="Search Flight"
                    type="submit"
                    disabled={isLoadingSearchResults}
                    loading={isLoadingSearchResults}
                    className="w-full md:w-auto"
                  />
                </CardLayoutFooter>
              </Form>
            )}
          </Formik>
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default React.memo(SearchFlights);