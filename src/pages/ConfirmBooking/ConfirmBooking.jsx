import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaPlane } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
} from "../../components/CardLayout/CardLayout";

import { Button, FlightDetailCard, PassengerDetail, SecondaryButton, Spinner } from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { confirmBooking } from "../../utils/api_handler";
import { IoIosAirplane } from "react-icons/io";
import { MdArrowBack, MdBookmark } from "react-icons/md";

const FlightDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flightData, setFlightData] = useState(null);
  const [travelers, setTravelers] = useState(null);
  const [allTravelersData, setAllTravelersData] = useState([]);

  const flightSegment =
    flightData &&
    flightData.AirItinerary.OriginDestinationOptions[0].FlightSegment[0];
  const referenceNumber =
    flightData && flightData.AirItinerary.OriginDestinationOptions[0].RefNumber;
  const directionId =
    flightData &&
    flightData.AirItinerary.OriginDestinationOptions[0].DirectionId;
  const elapsedTime =
    flightData &&
    flightData.AirItinerary.OriginDestinationOptions[0].ElapsedTime;
  const cabinClass =
    flightData &&
    flightData.AirItinerary.OriginDestinationOptions[0].CabinClass;
  const AirItineraryPricingInfo =
    flightData && flightData.AirItineraryPricingInfo;

  const confirmBookingHandler = async () => {
    const payLoad = {
      origin_location_code: flightSegment.DepartureAirport.LocationCode,
      destination_location_code: flightSegment.ArrivalAirport.LocationCode,
      // "origin_location_terminal": flightSegment.DepartureAirport.Terminal,
      // "destination_location_terminal": flightSegment.ArrivalAirport.Terminal,
      airline_code: flightSegment.OperatingAirline.Code,
      air_equip_type: flightSegment.Equipment.AirEquipType,
      departure_date_time: flightSegment.DepartureDateTime,
      arrival_date_time: flightSegment.ArrivalDateTime,
      departure_date: flightSegment.DepartureDate,
      departure_time: flightSegment.DepartureTime,
      arrival_date: flightSegment.ArrivalDate,
      arrival_time: flightSegment.DepartureTime,
      // "flight_duration": flightSegment.FlightDuration,
      flight_number: flightSegment.FlightNumber,
      res_book_design_Code: flightSegment.ResBookDesigCode,
      rph: flightSegment.RPH,
      ref_number: referenceNumber,
      direction_id: directionId,
      elapsed_time: elapsedTime,
      // "cabin_class": cabinClass,
      // "transaction_identifier": "TXN123456", // fix
      transaction_identifier: "", // fix
      travellers: allTravelersData,
      booking_class_avails: flightSegment.BookingClassAvails.map(
        (item, index) => {
          return {
            res_book_desig_code: item.ResBookDesigCode,
            res_book_desig_quantity: item.ResBookDesigQuantity,
            rph: item.RPH,
            // "available_ptc": item.AvailablePTC,
            res_book_desig_cabin_code: item.ResBookDesigCabinCode,
            fare_basis: item.FareBasis,
          };
        }
      ),
      priceInfo: {
        itin_total_fare: {
          base_fare: {
            amount: AirItineraryPricingInfo.ItinTotalFare.BaseFare.Amount,
            currency_code:
              AirItineraryPricingInfo.ItinTotalFare.BaseFare.CurrencyCode,
            decimal_places:
              AirItineraryPricingInfo.ItinTotalFare.BaseFare.DecimalPlaces,
          },
          total_fare: {
            amount: AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount,
            currency_code:
              AirItineraryPricingInfo.ItinTotalFare.TotalFare.CurrencyCode,
            decimal_places:
              AirItineraryPricingInfo.ItinTotalFare.TotalFare.DecimalPlaces,
          },
          // "markup_fare": {
          //     "amount": AirItineraryPricingInfo.ItinTotalFare.MarkupFare.Amount,
          //     "currency_code": AirItineraryPricingInfo.ItinTotalFare.MarkupFare.CurrencyCode,
          //     "decimal_places": AirItineraryPricingInfo.ItinTotalFare.MarkupFare.DecimalPlaces
          // }
          total_equiv_fare: {
            amount: AirItineraryPricingInfo.ItinTotalFare.MarkupFare.Amount,
            currency_code:
              AirItineraryPricingInfo.ItinTotalFare.MarkupFare.CurrencyCode,
            decimal_places:
              AirItineraryPricingInfo.ItinTotalFare.MarkupFare.DecimalPlaces,
          },
        },
        ptc_fare_break_downs: AirItineraryPricingInfo.PTC_FareBreakdowns.map(
          (item, index) => {
            return {
              passenger_type_quantity: {
                code: item.PassengerTypeQuantity.Code,
                quantity: item.PassengerTypeQuantity.Quantity,
              },
              // "fare_basis_code": "SOMEFARE", //fix
              fare_basis_code: "", //fix
              passenger_fare: {
                base_fare: {
                  amount: item.PassengerFare.BaseFare.Amount,
                  currency_code: item.PassengerFare.BaseFare.CurrencyCode,
                  decimal_places: item.PassengerFare.BaseFare.DecimalPlaces,
                },
                total_fare: {
                  amount: item.PassengerFare.TotalFare.Amount,
                  currency_code: item.PassengerFare.TotalFare.CurrencyCode,
                  decimal_places: item.PassengerFare.TotalFare.DecimalPlaces,
                },
                // "markup_fare": {
                //     "amount": item.PassengerFare.MarkupFare.Amount,
                //     "currency_code": item.PassengerFare.MarkupFare.CurrencyCode,
                //     "decimal_places": item.PassengerFare.MarkupFare.DecimalPlaces
                // },
                fees: item.PassengerFare.Fees,
                taxes: item.PassengerFare.Taxes.Tax.map((tax, key) => {
                  return {
                    name: tax.Name,
                    amount: tax.Amount,
                  };
                }),
              },
              traveler_ref_number: flightSegment.RPH, //fix
              // "pricing_source": "SYSTEM" //fix
              pricing_source: "", //fix
            };
          }
        ),
      },
    };
    let response = await confirmBooking(payLoad);
    if (response.status) {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/dashboard/flight-bookings");
      }, 2000);
    }
  };

  useEffect(() => { 
    if (location.state) {
      console.log(location.state);

      setFlightData(location.state.flightData);
      setTravelers(location.state.travelersData);
      setAllTravelersData(location.state.allTravelersData);
    }
  }, [location.state]);

  if (!flightData) {
    return <Spinner className={"text-primary"} />;
  }

  const {
    AirItinerary: { OriginDestinationOptions },
    AirItineraryPricingInfo: { ItinTotalFare, PTC_FareBreakdowns },
    Currency,
  } = flightData;
  console.log('travelersdetail', location.state)

  // const renderPassengerDetails = () => {
  //   return (
  //     <>
  //       {PTC_FareBreakdowns.map((passenger, index) => (
  //         <div
  //           key={index}
  //           className="flex flex-wrap gap-3 py-3 border-b border-slate-200 items-center justify-between"
  //         >
  //           <h2 className="text-sm font-semibold text-slate-600 flex items-center justify-center gap-1">
  //             <span className="text-primary">
  //               <FaUser />
  //             </span>
  //             <span>
  //               {passenger.PassengerTypeQuantity.Quantity}{" "}
  //               {passenger.PassengerTypeQuantity.Code}
  //             </span>
  //           </h2>
  //           <h2 className="text-sm font-semibold text-slate-500 flex items-center justify-center gap-1">
  //             <span className="text-primary">
  //               <FaMoneyBillAlt />
  //             </span>
  //             <span>Base Fare: {passenger.PassengerFare.BaseFare.Amount}</span>
  //           </h2>
  //           <h2 className="text-sm font-semibold text-slate-500 flex items-center justify-center gap-1">
  //             <span className="text-primary">
  //               <FaMoneyBillAlt />
  //             </span>
  //             <span>
  //               Taxes:{" "}
  //               {passenger.PassengerFare.Taxes.Tax.reduce(
  //                 (total, tax) => total + tax.Amount,
  //                 0
  //               )}
  //             </span>
  //           </h2>
  //         </div>
  //       ))}
  //     </>
  //   );
  // };

  return (
    <>
      <Toaster />
      <div className="w-full flex flex-col">

       { <FlightDetailCard flights={flightData} />}
        <PassengerDetail travelersData={allTravelersData}/>
        {/* <CardLayoutContainer className={"mb-5"}>
         
          <CardLayoutBody>
            <div className="flex flex-wrap gap-5 justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Departure Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Date: {flightSegment.DepartureDate}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Time: {flightSegment.DepartureTime}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Arrival Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Date: {flightSegment.ArrivalDate}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Time: {flightSegment.ArrivalTime}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Flight Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Flight Number:
                  {flightSegment.FlightNumber}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Flight Duration:
                  {flightSegment.FlightDuration}
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Airline Information
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Airline Code: {flightSegment.OperatingAirline.Code}
                </h2>
                <h2 className="text-sm font-semibold text-text">
                  Equipment: {flightSegment.Equipment.AirEquipType}
                </h2>
              </div>
            </div>
          </CardLayoutBody>
        </CardLayoutContainer> */}


        {/* <CardLayoutContainer className={"flex  flex-col mb-5"}>
          <CardLayoutHeader heading={"Pricing Details"} />
          <CardLayoutBody removeBorder={true}>
            <div className="w-full flex flex-col">
              {renderPassengerDetails()}
            </div>
          </CardLayoutBody>
        </CardLayoutContainer> */}

        {/* <CardLayoutContainer className={"flex  flex-col mb-5"}>
          <CardLayoutHeader heading={"Baggage"} />
          <CardLayoutBody removeBorder={true}>
            <div className="flex flex-col">
              {flightSegment.FreeBaggages &&
                flightSegment.FreeBaggages.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-wrap gap-3 py-3 border-b border-slate-200 items-center justify-between"
                    >
                      <h2 className="text-sm font-semibold text-slate-600 flex  items-center justify-center gap-1">
                        <span className="text-primary">
                          <FaUser />
                        </span>
                        <span>Type:{item.PassengerType}</span>
                      </h2>
                      <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                        <span className="text-primary">
                          <FaSuitcase />
                        </span>
                        <span>
                          Baggage {item.Quantity} {item.Unit}
                        </span>
                      </h2>
                    </div>
                  );
                })}
            </div>
          </CardLayoutBody>
        </CardLayoutContainer> */}

        <div className="flex items-center justify-end gap-3 my-4">
          <div>
            <SecondaryButton
            icon={<MdArrowBack/>}
              text="Back"
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </div>
          <div>
            <Button icon={<MdBookmark/>} text="Confirm Booking" onClick={confirmBookingHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
