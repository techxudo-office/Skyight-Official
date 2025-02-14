import React, { useEffect, useRef, useState } from "react";
import plane from "../../assets/images/plane.webp";
// icons
import { FaPlaneArrival } from "react-icons/fa";
import { MdCancel, MdChildFriendly } from "react-icons/md";
import { FaChild } from "react-icons/fa6";
import { IoIosMan } from "react-icons/io";

import {
    CardLayoutContainer,
    CardLayoutHeader,
    CardLayoutBody,
    CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import { Select, Input, Spinner, Button, CustomDate } from "../../components/components";

import { iranianCities } from "../../data/iranianCities";
import { searchFlight } from "../../utils/api_handler";

import { FaPlaneDeparture } from "react-icons/fa6";
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



const validationSchema = Yup.object().shape({

    tripType: Yup.string().required("Please select a trip type"),
    flights: [
        {
            departure: Yup.string().required("Please select departure"),
            arrival: Yup.string().required("Please select arrival"),
            departureDate: Yup.date().required("Please select departure date"),

        },
        {
            departure: Yup.string().required("Please select departure"),
            arrival: Yup.string().required("Please select arrival"),
            departureDate: Yup.date().required("Please select departure date"),

        }
    ],
    // returnDate: Yup.date().required("Please select return date"),
    adult: Yup.string().required("Please select the number of adults"),
    child: Yup.string().required("Please select the number of children"),
    infant: Yup.string().required("Please select the number of infants"),
    // cabinClass: Yup.string().required("Please select the cabin class"),
});



const MultiCity = ({ OnlySearch, onSearch }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(false);
    const [noOfFlights, setNoOfFlights] = useState(2);
    const [initialValues, setInitialValues] = useState({
        flights: [
            {
                departure: "",
                arrival: "",
                departureDate: "",
            },
            {
                departure: "",
                arrival: "",
                departureDate: "",
            }
        ],
        cabinClass: "",
        adult: adultOptions[0].value,
        child: childOptions[0].value,
        infant: infantOptions[0].value,
    }
    );
    // const [activeField, setActiveField] = useState({
    //     departure: false,
    //     arrival: false,
    //     departureDate: false,
    //     returnDate: false,
    //     cabinClass: false,
    //     adult: false,
    //     child: false,
    //     infant: false,
    // })
    // const activateField = (fieldName) => {
    //     setActiveField((prev) => {
    //         const newState = Object.keys(prev).reduce((acc, key) => {
    //             acc[key] = false; // Set all fields to false
    //             return acc;
    //         }, {});
    //         newState[fieldName] = true; // Set only the desired field to true
    //         return newState;
    //     });
    // };

    const loadFormData = () => {
        const storedValues = localStorage.getItem("flightSearchForm");
        return storedValues ? JSON.parse(storedValues) : null;
    };
    // console.log(activeField)




    const searchFlightHandler = async (values) => {
        const payload = {
            tripType: "MultiCity",
            flights: [
                {
                    departureDate: values.departureDate,
                    originCode: values.departure,
                    destinationCode: values.arrival,
                },
                {
                    departureDate: values.departureDate,
                    originCode: values.departure,
                    destinationCode: values.arrival,
                }
            ],

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
        console.log('Submitted values', values)
        // localStorage.setItem("flightSearchForm", JSON.stringify(values));
        // setFormData(values)
        // console.log("Form Values: ", values);

        // searchFlightHandler(values)

    };

    useEffect(() => {
        const selectRef = document.getElementsByClassName('select')
        const handleClickOutside = (event) => {
            // if (selectRef.current && !selectRef.current.contains(event.target)) {
            //     setActiveField({
            //         departure: false,
            //         arrival: false,
            //         departureDate: false,
            //         returnDate: false,
            //         cabinClass: false,
            //         adult: false,
            //         child: false,
            //         infant: false
            //     })
            // }
        };


        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const handleAddFlight = (setValues) => {
        setValues((prev) => ({
            ...prev,
            flights: [
                ...prev.flights,
                {
                    departure: "",
                    arrival: "",
                    departureDate: "",
                }
            ]
        }))

        setNoOfFlights((prev) => prev + 1)


    }
    const handleDeleteFlight = (setValues, idx) => {
        setValues((prev) => ({
            ...prev,
            flights: prev.flights.filter((item, i) => i != idx)
        }))
        setNoOfFlights((prev) => prev - 1)

    }
    return (
        <>
            <Toaster />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
            >

                {({ values, setValues, errors, touched, setFieldValue, isSubmitting }) => {
                    
                    return (
                        <Form>
                            <CardLayoutBody>
                                {Array.from({ length: noOfFlights }, (_, i) => (
                                    <>
                                        <p className="mb-4 font-semibold text-text text-base">Flight {i + 1}</p>
                                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 `}>

                                            <div className="relative mb-5 flex md:flex-row flex-col max-md:items-center ">
                                                <Select
                                                    id="departure"
                                                    label="Departure From"
                                                    name="departure"
                                                    options={iranianCities
                                                        .filter((item) => item.value != values.flights[i].arrival || null)
                                                    }
                                                    value={values.flights[i].departure}
                                                    placeholder="Select Departure"
                                                    onChange={(option) => {
                                                        setFieldValue(`flights.${i}.departure`, option.value);
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
                                                    id="arrival"
                                                    label="Arrival To"
                                                    name="arrival"
                                                    options={iranianCities
                                                        .filter((item) => item.value != values.flights[i].departure || null)
                                                    }
                                                    value={values.flights[i].arrival}
                                                    placeholder="Select Arrival"
                                                    onChange={(option) => {
                                                        setFieldValue(`flights.${i}.arrival`, option.value);
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
                                            <div className="relative mb-5 select flex gap-2 items-center">
                                                <CustomDate
                                                    onChange={(e) => {
                                                        setFieldValue(`flights.${i}.departureDate`, e.target.value)

                                                    }}
                                                    pastDate={false}
                                                    value={values.flights[i].departureDate}
                                                    name={"departureDate"}
                                                    label={"Departure Date"}
                                                    disabled={false}

                                                />

                                                {touched.departureDate && errors.departureDate && (
                                                    <div className="text-red-500 text-sm mt-2 absolute left-0">
                                                        {errors.departureDate}
                                                    </div>
                                                )}
                                                {
                                                    i > 1 &&
                                                    <div onClick={() => handleDeleteFlight(setValues, i)}>
                                                        <MdCancel className="text-gray hover:text-text text-xl" />
                                                    </div>
                                                }
                                            </div>


                                        </div>

                                    </>
                                ))
                                }
                                <p className="text-primary text-sm underline mb-10 cursor-pointer hover:text-secondary w-fit" onClick={() => handleAddFlight(setValues)}>+Add another flight</p>
                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-7`}>
                                    <div className="relative mb-5 select">
                                        <Select
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
                                            id="cabinClass"
                                            label="Cabin Class"
                                            name="cabinClass"
                                            options={cabinClassOptions}
                                            value={values.cabinClass}
                                            placeholder="Cabin Class"
                                            onChange={(option) => {
                                                setFieldValue("cabinClass", option.value)
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
                                        onClick={() => handleSubmit(values)}
                                        text={loading ? <Spinner /> : "Search Flight"}
                                        type="submit"
                                        disabled={loading}
                                    />
                                </div>
                            </CardLayoutFooter>
                        </Form>
                    )
                }}
            </Formik>

        </>
    );
};

export default MultiCity;
