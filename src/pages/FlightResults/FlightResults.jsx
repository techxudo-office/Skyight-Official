



import React, { useState, useEffect, useRef } from "react";
import { AvailableFlights, Button, ChangeSearch, DateSlider, FlightCard, Spinner } from "../../components/components";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import toast, { Toaster } from "react-hot-toast";

import dayjs from "dayjs";
/* Slick Slider CSS */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FlightResult.css";
import SearchFlights from "../SearchFlights/SearchFlights";
import { searchFlight } from "../../utils/api_handler";
import TravelersDetails from "../TravelersDetails/TravelersDetails";

const FlightResults = () => {
  const location = useLocation();
  const sliderRef = useRef(null);
  const [flightsData, setFlightsData] = useState([]);
  const [travelersData, setTravelersData] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [ChangeFlight, setChangeFlight] = useState(false);
  const [originalDates, setOriginalDates] = useState([]);
  const [noFlight, setNoFlight] = useState(false);
  const [filteredFlightsData, setFilteredFlightsData] = useState([]);
  const [pricingInfo, setPricingInfo] = useState()
  const [TripDetail, setTripDetail] = useState({})

  const navigate = useNavigate()
  useEffect(() => {
    if (location.state) {
      console.log("state", location.state)
      console.log("payload", location.state.payload)

      const flights = location.state.flightsData.PricedItineraries.PricedItinerary;
      const travelers = location.state.travelersData;
      const priceInfo = location.state.flightsData.PricedItineraries
      setPricingInfo(location.state.flightsData.PricedItineraries.PricedItinerary[0].AirItineraryPricingInfo)
      setFlightsData(flights);
      setTravelersData(travelers);
      setTripDetail(location.state.payload)

      if (flights.length > 0) {
        const departureDate = flights[0].AirItinerary.OriginDestinationOptions[0].FlightSegment[0].DepartureDate;
        generateDateOptions(departureDate, flights);
      }
    }
  }, [location.state]); // Add location.state as a dependency to trigger useEffect on reload

  const searchFlightHandler = async (date, index) => {
    // console.log("olddate", dateOptions)
    const original = dayjs(originalDates[index])



    const payload = {
      ...location.state.payload,
      departureDate: original.format("YYYY-MM-DD"),
    };
    const response = await searchFlight(payload);
    if (response) {
      if (response.status) {
        if (response.data.PricedItineraries.PricedItinerary.length > 0) {
          navigate("/dashboard/flight-results", {
            state: {
              payload: payload,
              pricingData: pricingInfo,
              flightsData: response.data,
              travelersData: {
                adults: payload.adult,
                childs: payload.child,
                infants: payload.infant,
              },

            },
          });
          setNoFlight(false)
        }
      } else {
        if (Array.isArray(response.message)) {
          response.message.map((error) => {
            setNoFlight(true)
            return toast.error(error.toUpperCase());
          });
        } else {
          toast.error(response.message);
        }
      }
    }
  };

  const generateDateOptions = (departureDate, flights) => {
    const baseDate = dayjs(departureDate, "YYYY-MM-DD");
    const dates = [];
    const originalDates = [];
    for (let i = -3; i <= 3; i++) {
      dates.push(baseDate.add(i, "day").format("ddd, DD MMM"));
      originalDates.push(baseDate.add(i, "day"))
    }
    setDateOptions(dates);
    setOriginalDates(originalDates)
    // Set the default selected date to be the center date
    setSelectedDate(dates[3]);

    // Filter the flights by the default selected date
    const filteredFlights = flights.filter((flight) => {
      const flightDate = dayjs(flight.AirItinerary.OriginDestinationOptions[0].FlightSegment[0].DepartureDate).format("ddd, DD MMM");
      return flightDate === dates[3];
    });

    setFilteredFlightsData(filteredFlights); // Set the initial filtered flights
  };

  const handleDateSelect = (date, index) => {
    setSelectedDate(date);
    searchFlightHandler(date, index)
    // Filter flights based on the selected date
    const filteredFlights = flightsData.filter((flight) => {
      const flightDate = dayjs(flight.AirItinerary.OriginDestinationOptions[0].FlightSegment[0].DepartureDate).format("ddd, DD MMM");
      return flightDate === date;
    });

    setFilteredFlightsData(filteredFlights);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
    afterChange: (current) => {
      handleDateSelect(dateOptions[current]);
    },
  };
  const onChangeSearch = () => {
    setChangeFlight((Prev) => !Prev)
  }

  return (
    <div className="flex relative flex-col w-fit">
      {/* <Toaster /> */}
      {ChangeFlight ?
        <div className="fixed top-0 flex justify-center items-center p-32 backdrop-blur-sm left-0 w-full h-screen z-[999] ">
          <div className="shadow-xl w-[1000px] rounded-md relative">
            <Button onClick={() => setChangeFlight(false)} text={"Close"} className="absolute right-3 top-3" />
            <SearchFlights OnlySearch={true}
            //  onSearch={()=>setChangeFlight(false)} 
            />
          </div>
        </div>
        : ''}

      {/* flight info  */}
      <ChangeSearch tripDetail={TripDetail} flights={filteredFlightsData.length} onclick={onChangeSearch} />
      <AvailableFlights flights={flightsData} />
      {/* Date Slider */}
      <DateSlider ref={sliderRef} selectedDate={selectedDate} handleDateSelect={handleDateSelect}
        dateOptions={dateOptions} />
      {/* Filtered Flights Data */}
      {filteredFlightsData.length > 0 ? (
        filteredFlightsData.map((item, index) => (
          <FlightCard key={index} data={item} doc_type={TripDetail.flightRoute} pricingInfo={pricingInfo} travelers={travelersData} />


        ))
      ) : noFlight ? <p className="capitalize py-5 text-text w-full text-center">no flight found</p> :
        <Spinner className={'border-primary'} />}
    </div>
  );
};

export default FlightResults;
