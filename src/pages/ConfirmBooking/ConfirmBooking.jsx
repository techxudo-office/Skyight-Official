import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  FlightDetailCard,
  PassengerDetail,
  PriceSummary,
  SecondaryButton,
  Spinner,
} from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { MdArrowBack, MdBookmark } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { confirmBooking } from "../../_core/features/bookingSlice";

const FlightDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [flightData, setFlightData] = useState(null);
  const [travelers, setTravelers] = useState(null);
  const [allTravelersData, setAllTravelersData] = useState([]);
  const { userData } = useSelector((state) => state.auth);
  const { isBookingLoading, searchForm } = useSelector((state) => state.booking);

  useEffect(() => {
    if (location.state) {

      setFlightData(location.state.flightData);
      setTravelers(location.state.travelersData);
      setAllTravelersData(location.state.allTravelersData);
    }
  }, [location.state]);

  const pricing = flightData?.AirItineraryPricingInfo;

  const confirmBookingHandler = async () => {
    const tripType = searchForm.tripType;
    const isRoundTrip = tripType === "Round-Trip";
    const flights = flightData.AirItinerary.OriginDestinationOptions;
    let flightPayload = flights[0].FlightSegment[0]
    let payLoad = {
      flight_duration: flightPayload.FlightDuration,
      origin_location_code:
        flightPayload.DepartureAirport.LocationCode,
      departure_terminal:
        flightPayload.DepartureAirport.Terminal || "",
      destination_location_code:
        flightPayload.ArrivalAirport.LocationCode,
      arrival_terminal:
        flightPayload.ArrivalAirport.Terminal || "",
      airline_code: flightPayload.OperatingAirline.Code,
      air_equip_type: flightPayload.Equipment.AirEquipType,
      departure_date_time: flightPayload.DepartureDateTime,
      arrival_date_time: flightPayload.ArrivalDateTime,
      departure_date: flightPayload.DepartureDate,
      departure_time: flightPayload.DepartureTime,
      arrival_date: flightPayload.ArrivalDate,
      arrival_time: flightPayload.ArrivalTime,
      flight_number: flightPayload.FlightNumber,
      res_book_design_Code: flightPayload.ResBookDesigCode,
      rph: flightPayload.RPH,
      ref_number: flights[0].RefNumber,
      direction_id: flights[0].DirectionId,
      elapsed_time: flights[0].ElapsedTime,
      free_baggages: flights[0]?.FlightSegment[0].FreeBaggages,
      booking_class_avails: flightPayload.BookingClassAvails.map(
        (item) => ({
          available_PTC: item.AvailablePTC,
          res_book_desig_code: item.ResBookDesigCode,
          res_book_desig_quantity: item.ResBookDesigQuantity,
          rph: item.RPH,
          res_book_desig_cabin_code: item.ResBookDesigCabinCode,
          fare_basis: item.FareBasis,
        })
      ),
      cabin_class: null,
      trip_type: isRoundTrip ? "Return" : "OneWay",
      travellers: allTravelersData,
      transaction_identifier: "",
      priceInfo: {
        itin_total_fare: {
          base_fare: {
            amount: pricing.ItinTotalFare.BaseFare.Amount,
            currency_code: pricing.ItinTotalFare.BaseFare.CurrencyCode,
            decimal_places: pricing.ItinTotalFare.BaseFare.DecimalPlaces,
          },
          total_equiv_fare: {
            amount: pricing.ItinTotalFare.MarkupFare.Amount,
            currency_code: pricing.ItinTotalFare.MarkupFare.CurrencyCode,
            decimal_places: pricing.ItinTotalFare.MarkupFare.DecimalPlaces,
          },
          total_fare: {
            amount: pricing.ItinTotalFare.TotalFare.Amount,
            currency_code: pricing.ItinTotalFare.TotalFare.CurrencyCode,
            decimal_places: pricing.ItinTotalFare.TotalFare.DecimalPlaces,
          },
        },
        ptc_fare_break_downs: pricing.PTC_FareBreakdowns.map(
          (passenger, index) => ({
            passenger_type_quantity: {
              code: passenger.PassengerTypeQuantity.Code,
              quantity: passenger.PassengerTypeQuantity.Quantity,
            },
            fare_basis_code: "",
            passenger_fare: {
              base_fare: {
                amount: passenger.PassengerFare.BaseFare.Amount,
                currency_code: passenger.PassengerFare.BaseFare.CurrencyCode,
                decimal_places: passenger.PassengerFare.BaseFare.DecimalPlaces,
              },
              total_fare: {
                amount: passenger.PassengerFare.TotalFare.Amount,
                currency_code: passenger.PassengerFare.TotalFare.CurrencyCode,
                decimal_places: passenger.PassengerFare.TotalFare.DecimalPlaces,
              },
              fees: passenger.PassengerFare.Fees,
              taxes: passenger.PassengerFare.Taxes.Tax.map((tax) => ({
                name: tax.Name,
                amount: tax.Amount,
              })),
            },
            traveler_ref_number: "",
            pricing_source: "",
          })
        ),
      },
    };

    if (flights.length === 2 || isRoundTrip) {
      let flightPayload = flights[1].FlightSegment[0];
      payLoad = {
        ...payLoad,
        flight_duration_return: flightPayload.FlightDuration,
        origin_location_code_return:
          flightPayload.DepartureAirport.LocationCode,
        departure_terminal_return:
          flightPayload.DepartureAirport.Terminal || "",
        destination_location_code_return:
          flightPayload.ArrivalAirport.LocationCode,
        arrival_terminal_return:
          flightPayload.ArrivalAirport.Terminal || "",
        airline_code_return: flightPayload.OperatingAirline.Code,
        air_equip_type_return:
          flightPayload.Equipment.AirEquipType,
        departure_date_time_return:
          flightPayload.DepartureDateTime,
        arrival_date_time_return: flightPayload.ArrivalDateTime,
        departure_date_return: flightPayload.DepartureDate,
        departure_time_return: flightPayload.DepartureTime,
        arrival_date_return: flightPayload.ArrivalDate,
        arrival_time_return: flightPayload.ArrivalTime,
        flight_number_return: flightPayload.FlightNumber,
        res_book_design_Code_return:
          flightPayload.ResBookDesigCode,
        rph_return: flightPayload.RPH,
        ref_number_return: flights[1]?.RefNumber,
        direction_id_return: flights[1]?.DirectionId,
        elapsed_time_return: flights[1]?.ElapsedTime,
        free_baggages_return: flightPayload.FreeBaggages,
        booking_class_avails_return:
          flightPayload.BookingClassAvails.map((item) => ({
            available_PTC: item.AvailablePTC,
            res_book_desig_code: item.ResBookDesigCode,
            res_book_desig_quantity: item.ResBookDesigQuantity,
            rph: item.RPH,
            res_book_desig_cabin_code: item.ResBookDesigCabinCode,
            fare_basis: item.FareBasis,
          })),
        cabin_class_return: null,
      };
    }

    dispatch(confirmBooking({ data: payLoad, token: userData?.token }))
      .unwrap()
      .then(() => {
        navigate("/dashboard/flight-bookings");
      })
      .catch((error) => {
      });
  };

  if (!flightData) {
    return <Spinner className={"text-primary"} />;
  }

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">
        <FlightDetailCard flights={flightData} />
        <div className="py-2"></div>
        <PriceSummary pricingInfo={pricing} travelers={travelers} />
        <PassengerDetail travelersData={allTravelersData} />

        <div className="flex items-center justify-end gap-3 my-4">
          <div>
            <SecondaryButton
              icon={<MdArrowBack />}
              text="Back"
              onClick={() => navigate(-1)}
            />
          </div>
          <div>
            <Button
              icon={<MdBookmark />}
              text={"Confirm Booking"}
              loading={isBookingLoading}
              onClick={confirmBookingHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
