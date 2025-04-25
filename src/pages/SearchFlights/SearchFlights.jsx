import React, { useEffect, useRef, useState } from "react";
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
import { Button, CustomDate, Spinner } from "../../components/components";
import { FaPlaneDeparture } from "react-icons/fa6";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FlightsBanner, forBackArrows } from "../../assets/Index";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import {
  emptyBookingStates,
  getBookingRoutes,
  searchFlight,
  setSearchForm,
} from "../../_core/features/bookingSlice";
import { searchFlightValidationSchema } from "../../schema/validationSchema";
import {
  adultOptions,
  cabinClassOptions,
  childOptions,
  infantOptions,
  initialState,
} from "../../utils/bookingOptions";
import { FormSelect } from "./FormSelect/FormSelect";
import CityCodes from "../../AirlinesData/CityCodes";
import dayjs from "dayjs";

const SearchFlights = ({ OnlySearch, onSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const { userData } = useSelector((state) => state.auth);
  const { isLoadingSearchResults, searchForm, bookingRoutes, isLoadingRoutes } =
    useSelector((state) => state.booking);
  const [activeField, setActiveField] = useState(initialState);

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
    flightRoute: "Domestic",
    tripType: "One-Way",
    departure: dayjs().format("YYYY-MM-DD"),
    arrival: "",
    departureDate: "",
    returnDate: "",
    cabinClass: cabinClassOptions[0].value,
    adult: adultOptions[0].value,
    child: childOptions[0].value,
    infant: infantOptions[0].value,
  };

  const selectFields = [
    {
      id: "adult",
      label: "Adult",
      options: adultOptions,
      icon: <IoIosMan />,
      next: "child",
    },
    {
      id: "child",
      label: "Child",
      options: childOptions,
      icon: <FaChild />,
      next: "infant",
    },
    {
      id: "infant",
      label: "Infant",
      options: infantOptions,
      icon: <MdChildFriendly />,
      next: "cabinClass",
    },
    {
      id: "cabinClass",
      label: "Cabin Class",
      options: cabinClassOptions,
      icon: <MdChildFriendly />,
    },
  ];

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
      let price = response?.PricedItineraries?.PricedItinerary || [];
      if (price && price.length > 0) {
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
    dispatch(emptyBookingStates());
    dispatch(setSearchForm(values));
    searchFlightHandler(values);
  };

  useEffect(() => {
    const selectRef = document.getElementsByClassName("select");
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActiveField(initialState);
      }
    };

    console.log(bookingRoutes, "bookingRoutes");

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (userData?.token) {
      dispatch(getBookingRoutes(userData.token));
    }
  }, []);
  console.log(bookingRoutes, "bookingRoutes");
  if (isLoadingRoutes) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner className={"text-primary"} />
      </div>
    );
  }
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
            validationSchema={searchFlightValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setValues, errors, touched, setFieldValue }) => {
              useEffect(() => {
                if (isFirstRender.current) {
                  isFirstRender.current = false;
                  return;
                }
                setValues((prev) => ({
                  ...prev,
                  departure: "",
                  arrival: "",
                  tripType: "One-Way",
                }));
              }, [values.flightRoute]);
              return (
                <Form>
                  <CardLayoutBody>
                    <RadioButtons
                      name="flightRoute"
                      value={values.flightRoute}
                      options={["Domestic", "International"]}
                      onChange={(option) =>
                        setFieldValue("flightRoute", option)
                      }
                    />
                    <p className="text-text text-sm pt-3 italic">Note: Select 'Domestic' if traveling with your national ID; otherwise, choose 'International'</p>
                    {touched.flightRoute && errors.flightRoute && (
                      <div className="mt-2 text-sm text-red-500">
                        {errors.flightRoute}

                      </div>
                    )}
                  </CardLayoutBody>

                  <CardLayoutBody>
                    <RadioButtons
                      name="tripType"
                      value={values.tripType}
                      options={["One-Way", "Round-Trip"]}
                      disabledOptionindex={
                        values.flightRoute === "Domestic" ? [1] : []
                      }
                      onChange={(option) => setFieldValue("tripType", option)}
                    />
                    {errors.tripType && (
                      <div className="mt-2 text-sm text-red-500">
                        {errors.tripType}
                      </div>
                    )}
                  </CardLayoutBody>
                  <CardLayoutBody>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-5 mb-7">
                      <div className="relative flex flex-col mb-5 md:flex-row max-md:items-center">
                        <FormSelect
                          id="departure"
                          label="Select Departure"
                          options={bookingRoutes?.map((route) => ({
                            value: route.Origin,
                            label: route.Origin,
                          }))}
                          value={values.departure}
                          onChange={(option) => {
                            setFieldValue("departure", option.value);
                            setFieldValue("arrival", "");
                            activateField("arrival");
                          }}
                          touched={touched.departure}
                          error={errors.departure}
                          icons={<FaPlaneDeparture />}
                        />
                        <div className="rounded-full border-gray border-[1px] w-fit h-fit pt-3 pl-3 p-2 z-10 -mt-3 md:-ml-3 md:mt-2 -mb-11 md:-mr-8 bg-white">
                          <img
                            src={forBackArrows}
                            alt=""
                            className="w-8 p-0 bg-white md:w-6"
                          />
                        </div>
                      </div>
                      <FormSelect
                        id="arrival"
                        label="Select Arrival"
                        className={"select w-full"}
                        isSelected={activeField.arrival}
                        isLoading={isLoadingRoutes}
                        disabled={!values.departure}
                        options={bookingRoutes
                          ?.filter((route) => route.Origin === values.departure)
                          .map((route) => ({
                            value: route.Destination,
                            label: route.Destination,
                          }))}
                        value={values.arrival}
                        placeholder="Select Arrival"
                        onChange={(option) => {
                          setFieldValue("arrival", option.value);
                          activateField("departureDate");
                        }}
                        optionIcons={<FaPlaneArrival />}
                        selectIcon={<FaPlaneArrival size={18} />}
                      />
                      <div className="relative mb-5 select">
                        <CustomDate
                          onChange={(e) => {
                            setFieldValue("departureDate", e.target.value);
                            activateField(
                              values.tripType !== "One-Way"
                                ? "returnDate"
                                : "adult"
                            );
                          }}
                          value={values.departureDate}
                          isSelected={activeField.departureDate}
                          name="departureDate"
                          label="Departure Date"
                          pastDate={false}
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
                            values.tripType === "One-Way"
                              ? ""
                              : values.returnDate
                          }
                          isSelected={activeField.returnDate}
                          name="returnDate"
                          label="Return Date"
                          disabled={values.tripType === "One-Way"}
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
                      {selectFields.map(
                        ({ id, label, options, icon, next }) => (
                          <FormSelect
                            key={id}
                            id={id}
                            label={label}
                            options={options}
                            value={values[id]}
                            onChange={(option) => {
                              setFieldValue(id, option.value);
                              if (next) activateField(next);
                            }}
                            touched={touched[id]}
                            error={errors[id]}
                            isSelected={activeField[id]}
                            icons={icon}
                          />
                        )
                      )}
                    </div>
                  </CardLayoutBody>
                  <CardLayoutFooter>
                    <div onClick={onSearch}>
                      <Button
                        icon={<MdSearch />}
                        text="Search Flight"
                        type="submit"
                        disabled={isLoadingSearchResults}
                        loading={isLoadingSearchResults}
                      />
                    </div>
                  </CardLayoutFooter>
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
