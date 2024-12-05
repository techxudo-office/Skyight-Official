import React, { useState } from "react";
import plane from "../../assets/images/plane.webp";

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

const validationSchema = Yup.object().shape({
  departure: Yup.string().required("Please select departure"),
  arrival: Yup.string().required("Please select arrival"),
  departureDate: Yup.date().required("Please select departure date"),
  adult: Yup.string().required("Please select the number of adults"),
  child: Yup.string().required("Please select the number of children"),
  infant: Yup.string().required("Please select the number of infants"),
});

const SearchFlights = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
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
            state: { flightsData: response.data },
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
    console.log("Form Values: ", values);
    searchFlightHandler(values);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col w-full items-center justify-center">
        <CardLayoutContainer className="w-full mb-5">
          <CardLayoutHeader
            className="flex items-center justify-start flex-wrap gap-5 py-3"
            removeBorder={true}
          >
            <img src={plane} alt="profile-img" className="h-60 w-full" />
          </CardLayoutHeader>
        </CardLayoutContainer>

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
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <CardLayoutBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                    <div className="relative mb-5">
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
                        optionIcons={<FaPlaneDeparture />}
                      />
                      {touched.departure && errors.departure && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.departure}
                        </div>
                      )}
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
                        optionIcons={<FaPlaneDeparture />}
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
                        optionIcons={<FaUser />}
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
                        optionIcons={<FaUser />}
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
                        optionIcons={<FaUser />}
                      />
                      {touched.infant && errors.infant && (
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
