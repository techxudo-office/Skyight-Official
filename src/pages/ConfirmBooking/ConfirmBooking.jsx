import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, FlightDetailCard, PassengerDetail, SecondaryButton, Spinner } from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { confirmBooking } from "../../utils/api_handler";
import { MdArrowBack, MdBookmark } from "react-icons/md";

const FlightDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flightData, setFlightData] = useState(null);
  const [Loading, setLoading] = useState(null);
  const [travelers, setTravelers] = useState(null);
  const [allTravelersData, setAllTravelersData] = useState([]);

  useEffect(() => {
    if (location.state) {
      console.log('state', location.state);

      setFlightData(location.state.flightData);
      setTravelers(location.state.travelersData);
      setAllTravelersData(location.state.allTravelersData);
    }
  }, [location.state]);

  console.log('all-travellers', allTravelersData);

  const confirmBookingHandler = async () => {
    const tripType = JSON.parse(localStorage.getItem("flightSearchForm")).tripType;
    const isRoundTrip = tripType === "Round-Trip";
    const flights = flightData.AirItinerary.OriginDestinationOptions;
    const pricing = flightData.AirItineraryPricingInfo
    let payLoad = {
      flight_duration: flights[0].FlightSegment[0].FlightDuration,
      origin_location_code: flights[0].FlightSegment[0].DepartureAirport.LocationCode,
      departure_terminal: flights[0].FlightSegment[0].DepartureAirport.Terminal || "",
      destination_location_code: flights[0].FlightSegment[0].ArrivalAirport.LocationCode,
      arrival_terminal: flights[0].FlightSegment[0].ArrivalAirport.Terminal || "",
      airline_code: flights[0].FlightSegment[0].OperatingAirline.Code,
      air_equip_type: flights[0].FlightSegment[0].Equipment.AirEquipType,
      departure_date_time: flights[0].FlightSegment[0].DepartureDateTime,
      arrival_date_time: flights[0].FlightSegment[0].ArrivalDateTime,
      departure_date: flights[0].FlightSegment[0].DepartureDate,
      departure_time: flights[0].FlightSegment[0].DepartureTime,
      arrival_date: flights[0].FlightSegment[0].ArrivalDate,
      arrival_time: flights[0].FlightSegment[0].ArrivalTime,
      flight_number: flights[0].FlightSegment[0].FlightNumber,
      res_book_design_Code: flights[0].FlightSegment[0].ResBookDesigCode,
      rph: flights[0].FlightSegment[0].RPH,
      ref_number: flights[0].RefNumber,
      direction_id: flights[0].DirectionId,
      elapsed_time: flights[0].ElapsedTime,
      free_baggages: flights[0]?.FlightSegment[0].FreeBaggages,
      booking_class_avails: flights[0].FlightSegment[0].BookingClassAvails.map(item => ({
        available_PTC: item.AvailablePTC,
        res_book_desig_code: item.ResBookDesigCode,
        res_book_desig_quantity: item.ResBookDesigQuantity,
        rph: item.RPH,
        res_book_desig_cabin_code: item.ResBookDesigCabinCode,
        fare_basis: item.FareBasis,
      })),
      cabin_class: null,
      trip_type: isRoundTrip ? "Return" : "OneWay",
      travellers: allTravelersData,
      transaction_identifier: '',
      priceInfo: {

        itin_total_fare: {
          base_fare: {
            amount: pricing.ItinTotalFare.BaseFare.Amount,
            currency_code: pricing.ItinTotalFare.BaseFare.CurrencyCode,
            decimal_places: pricing.ItinTotalFare.BaseFare.DecimalPlaces
          },
          total_equiv_fare: {
            amount: pricing.ItinTotalFare.MarkupFare.Amount,
            currency_code: pricing.ItinTotalFare.MarkupFare.CurrencyCode,
            decimal_places: pricing.ItinTotalFare.MarkupFare.DecimalPlaces
          },
          total_fare: {
            amount: pricing.ItinTotalFare.TotalFare.Amount,
            currency_code: pricing.ItinTotalFare.TotalFare.CurrencyCode,
            decimal_places: pricing.ItinTotalFare.TotalFare.DecimalPlaces
          }
        },
        ptc_fare_break_downs: pricing.PTC_FareBreakdowns.map((passenger, index) => ({
          passenger_type_quantity: {
            code: passenger.PassengerTypeQuantity.Code,
            quantity: passenger.PassengerTypeQuantity.Quantity
          },
          fare_basis_code: "",
          passenger_fare: {
            base_fare: {
              amount: passenger.PassengerFare.BaseFare.Amount,
              currency_code: passenger.PassengerFare.BaseFare.CurrencyCode,
              decimal_places: passenger.PassengerFare.BaseFare.DecimalPlaces
            },
            total_fare: {
              amount: passenger.PassengerFare.TotalFare.Amount,
              currency_code: passenger.PassengerFare.TotalFare.CurrencyCode,
              decimal_places: passenger.PassengerFare.TotalFare.DecimalPlaces
            },
            fees: passenger.PassengerFare.Fees,
            taxes: passenger.PassengerFare.Taxes.Tax.map(tax => ({
              name: tax.Name,
              amount: tax.Amount
            }))
          },
          traveler_ref_number: "",
          pricing_source: ""
        }))
      }

    };

    if (flights.length === 2 || isRoundTrip) {
      payLoad = {
        ...payLoad,



        flight_duration_return: flights[1]?.FlightSegment[0].FlightDuration,
        origin_location_code_return: flights[1]?.FlightSegment[0].DepartureAirport.LocationCode,
        departure_terminal_return: flights[1]?.FlightSegment[0].DepartureAirport.Terminal || "",
        destination_location_code_return: flights[1]?.FlightSegment[0].ArrivalAirport.LocationCode,
        arrival_terminal_return: flights[1]?.FlightSegment[0].ArrivalAirport.Terminal || "",
        airline_code_return: flights[1]?.FlightSegment[0].OperatingAirline.Code,
        air_equip_type_return: flights[1]?.FlightSegment[0].Equipment.AirEquipType,
        departure_date_time_return: flights[1]?.FlightSegment[0].DepartureDateTime,
        arrival_date_time_return: flights[1]?.FlightSegment[0].ArrivalDateTime,
        departure_date_return: flights[1]?.FlightSegment[0].DepartureDate,
        departure_time_return: flights[1]?.FlightSegment[0].DepartureTime,
        arrival_date_return: flights[1]?.FlightSegment[0].ArrivalDate,
        arrival_time_return: flights[1]?.FlightSegment[0].ArrivalTime,
        flight_number_return: flights[1]?.FlightSegment[0].FlightNumber,
        res_book_design_Code_return: flights[1]?.FlightSegment[0].ResBookDesigCode,
        rph_return: flights[1]?.FlightSegment[0].RPH,
        ref_number_return: flights[1]?.RefNumber,
        direction_id_return: flights[1]?.DirectionId,
        elapsed_time_return: flights[1]?.ElapsedTime,
        free_baggages_return: flights[1]?.FlightSegment[0].FreeBaggages,
        booking_class_avails_return: flights[1]?.FlightSegment[0].BookingClassAvails.map(item => ({
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

    console.log('confirm-booking', payLoad);
    setLoading(true)
    let response = await confirmBooking(payLoad);
    console.log("ERRors res", response)

    if (response.status) {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/dashboard/flight-bookings");
        setLoading(false)
      }, 2000);
    } else {
      setLoading(false)
      if (typeof response.message == 'string') {
        toast.error(response.message)
      }else{
        response.message.map(message => toast.error(message));
      }
    }
  };

  if (!flightData) {
    return <Spinner className={"text-primary"} />;
  }

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">
        <FlightDetailCard flights={flightData} />
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
            <Button icon={<MdBookmark />}
              text={Loading ? <Spinner /> : "Confirm Booking"}
              onClick={confirmBookingHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
