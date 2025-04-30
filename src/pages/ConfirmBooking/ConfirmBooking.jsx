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
import { MdArrowBack, MdBookmark } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { confirmBooking } from "../../_core/features/bookingSlice";

const FlightDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { userData } = useSelector((state) => state.auth);
  const { isBookingLoading, searchForm } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (location.state) {
      console.log(location.state, "Booking");
      setData(location.state);
    }
  }, [location.state]);

  const pricing = data?.flightData?.AirItineraryPricingInfo;

  const confirmBookingHandler = async () => {
    const { tripType } = searchForm;
    console.log(tripType, "tripType");
    const isRoundTrip = tripType === "Round-Trip";

    const itineraries = data?.flightData.AirItinerary.OriginDestinationOptions;
    const firstItin = itineraries[0];
    const firstSeg = firstItin.FlightSegment[0];

    // Helper: map one FlightSegment + its parent option into payload fields
    const buildSegmentFields = (seg, parent, suffix = "") => ({
      [`flight_duration${suffix}`]: seg.FlightDuration,
      [`origin_location_code${suffix}`]: seg.DepartureAirport.LocationCode,
      [`departure_terminal${suffix}`]: seg.DepartureAirport.Terminal || "",
      [`destination_location_code${suffix}`]: seg.ArrivalAirport.LocationCode,
      [`arrival_terminal${suffix}`]: seg.ArrivalAirport.Terminal || "",
      [`airline_code${suffix}`]: seg.OperatingAirline.Code,
      [`air_equip_type${suffix}`]: seg.Equipment.AirEquipType,
      [`departure_date_time${suffix}`]: seg.DepartureDateTime,
      [`arrival_date_time${suffix}`]: seg.ArrivalDateTime,
      [`departure_date${suffix}`]: seg.DepartureDate,
      [`departure_time${suffix}`]: seg.DepartureTime,
      [`arrival_date${suffix}`]: seg.ArrivalDate,
      [`arrival_time${suffix}`]: seg.ArrivalTime,
      [`flight_number${suffix}`]: seg.FlightNumber,
      [`res_book_design_Code${suffix}`]: seg.ResBookDesigCode,
      [`rph${suffix}`]: seg.RPH,
      [`ref_number${suffix}`]: parent.RefNumber,
      [`direction_id${suffix}`]: parent.DirectionId,
      [`elapsed_time${suffix}`]: parent.ElapsedTime,
      [`free_baggages${suffix}`]: seg.FreeBaggages,
      [`booking_class_avails${suffix}`]: seg.BookingClassAvails.map((item) => ({
        available_PTC: item.AvailablePTC,
        res_book_desig_code: item.ResBookDesigCode,
        res_book_desig_quantity: item.ResBookDesigQuantity,
        rph: item.RPH,
        res_book_desig_cabin_code: item.ResBookDesigCabinCode,
        fare_basis: item.FareBasis,
      })),
    });

    // Helper: assemble the priceInfo block
    const buildPriceInfo = (pricing) => ({
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
      ptc_fare_break_downs: pricing.PTC_FareBreakdowns.map((passenger) => ({
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
      })),
    });

    // Build the common payload
    let payload = {
      // first segment fields (no suffix)
      ...buildSegmentFields(firstSeg, firstItin),
      cabin_class: null,
      trip_type: isRoundTrip ? "Return" : "OneWay",
      travellers: data?.allTravelersData,
      transaction_identifier: "",
      priceInfo: buildPriceInfo(pricing),
    };

    // If round-trip, merge in the second segment fields
    if (isRoundTrip && itineraries.length > 1) {
      const retItin = itineraries[1];
      const retSeg = retItin.FlightSegment[0];
      payload = {
        ...payload,
        ...buildSegmentFields(retSeg, retItin, "_return"),
        cabin_class_return: null,
      };
    }

    // Finally, dispatch exactly as before
    dispatch(confirmBooking({ data: payload, token: userData?.token }))
      .unwrap()
      .then(() => navigate("/dashboard/flight-bookings"))
      .catch(() => {
        /* unchanged error behavior */
      });
  };

  if (!data?.flightData) {
    return <Spinner className={"text-primary"} />;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <FlightDetailCard flights={data?.flightData} />
        <div className="py-2"></div>
        <PriceSummary pricingInfo={pricing} travelers={data?.travelersData} />
        <PassengerDetail travelersData={data?.allTravelersData} />

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
