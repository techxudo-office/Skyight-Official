import React, { useState, useEffect, useRef } from "react";
import {
  AvailableFlights,
  Button,
  ChangeSearch,
  DateSlider,
  FlightCard,
  Spinner,
} from "../../components/components";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import dayjs from "dayjs";
/* Slick Slider CSS */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FlightResult.css";
import SearchFlights from "../SearchFlights/SearchFlights";
import TravelersDetails from "../TravelersDetails/TravelersDetails";
import { searchFlight } from "../../_core/features/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const FlightResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [flightsData, setFlightsData] = useState([]);
  const [travelersData, setTravelersData] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [ChangeFlight, setChangeFlight] = useState(false);
  const [originalDates, setOriginalDates] = useState([]);
  const [noFlight, setNoFlight] = useState(false);
  const [filteredFlightsData, setFilteredFlightsData] = useState([]);
  const [pricingInfo, setPricingInfo] = useState();
  const [DifferenceInDates, setDifferenceInDates] = useState();
  const [TripDetail, setTripDetail] = useState({});
  const { userData } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (location.state) {

      const flights =
        location.state.flightsData.PricedItineraries.PricedItinerary;
      const travelers = location.state.travelersData;
      const priceInfo = location.state.flightsData.PricedItineraries;
      setPricingInfo(
        location.state.flightsData.PricedItineraries.PricedItinerary.map((flight) => flight.AirItineraryPricingInfo)
      );
      setFlightsData(flights);
      setTravelersData(travelers);
      setTripDetail(location.state.payload);

      if (flights.length > 0) {
        let departureDate =
          flights[0].AirItinerary.OriginDestinationOptions[0].FlightSegment[0]
            .DepartureDate;
        let returnDate =
          flights[0].AirItinerary.OriginDestinationOptions[1]?.FlightSegment[0]
            .DepartureDate;
        if (dayjs(returnDate).diff(dayjs(departureDate), "days") > 0) {
          setDifferenceInDates(
            dayjs(returnDate).diff(dayjs(departureDate), "days")
          );
        }
        generateDateOptions(departureDate, flights);
      }
    }
  }, [location.state]); // Add location.state as a dependency to trigger useEffect on reload

  const searchFlightHandler = async (date, index) => {
    const original = dayjs(originalDates[index]);

    const payload = {
      ...location.state.payload,
      departureDate: original.format("YYYY-MM-DD"),
      returnDate: original.add(DifferenceInDates, "day").format("YYYY-MM-DD"),
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
            pricingData: pricingInfo,
            flightsData: response,
            travelersData: {
              adults: payload.adult,
              childs: payload.child,
              infants: payload.infant,
            },
          },
        });
        setNoFlight(false);
      } else {
        setNoFlight(true);
      }
    } catch (error) {
      setNoFlight(true);
      if (Array.isArray(error)) {
        error.forEach((msg) => toast.error(msg.toUpperCase()));
      } else {
        toast.error(error || "Failed to search flights");
      }
    }
  };

  const generateDateOptions = (departureDate, flights) => {
    const baseDate = dayjs(departureDate, "YYYY-MM-DD");
    const dates = [];
    const originalDates = [];
    for (let i = -3; i <= 3; i++) {
      dates.push(baseDate.add(i, "day").format("ddd, DD MMM"));
      originalDates.push(baseDate.add(i, "day"));
    }
    setDateOptions(dates);
    setOriginalDates(originalDates);
    // Set the default selected date to be the center date
    setSelectedDate(dates[3]);

    // Filter the flights by the default selected date
    const filteredFlights = flights.filter((flight) => {
      const flightDate = dayjs(
        flight.AirItinerary.OriginDestinationOptions[0].FlightSegment[0]
          .DepartureDate
      ).format("ddd, DD MMM");
      return flightDate === dates[3];
    });

    setFilteredFlightsData(filteredFlights); // Set the initial filtered flights
  };

  const handleDateSelect = (date, index) => {
    setSelectedDate(date);
    searchFlightHandler(date, index);
    // Filter flights based on the selected date
    const filteredFlights = flightsData.filter((flight) => {
      const flightDate = dayjs(
        flight.AirItinerary.OriginDestinationOptions[0].FlightSegment[0]
          .DepartureDate
      ).format("ddd, DD MMM");
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
    setChangeFlight((Prev) => !Prev);
  };

  return (
    <div className="relative flex flex-col w-fit">
      {/* <Toaster /> */}
      {ChangeFlight ? (
        <div className="fixed top-0 flex justify-center items-center p-32 backdrop-blur-sm left-0 w-full h-screen z-[999]">
          <div className="shadow-xl w-[1000px] rounded-md relative">
            <Button
              onClick={() => setChangeFlight(false)}
              text={"Close"}
              className="absolute right-3 top-3"
            />
            <SearchFlights
              OnlySearch={true}
            //  onSearch={()=>setChangeFlight(false)}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {/* flight info  */}
      <ChangeSearch
        tripDetail={TripDetail}
        flights={filteredFlightsData.length}
        onclick={onChangeSearch}
      />
      <AvailableFlights flights={flightsData} />
      {/* Date Slider */}
      <DateSlider
        ref={sliderRef}
        selectedDate={selectedDate}
        handleDateSelect={handleDateSelect}
        dateOptions={dateOptions}
        differenceInDates={DifferenceInDates}
      />
      {/* Filtered Flights Data */}
      {filteredFlightsData.length > 0 ? (
        filteredFlightsData.map((item, index) => (
          <FlightCard
            key={index}
            data={item}
            doc_type={TripDetail.flightRoute}
            pricingInfo={pricingInfo[index]}
            travelers={travelersData}
          />
        ))
      ) : noFlight ? (
        <p className="w-full py-5 text-center capitalize text-text">
          no flight found
        </p>
      ) : (
        <Spinner className={"border-primary"} />
      )}
    </div>
  );
};

export default FlightResults;
