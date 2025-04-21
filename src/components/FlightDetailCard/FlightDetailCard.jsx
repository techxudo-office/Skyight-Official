import { useEffect, useMemo, useState } from "react";
import { FaPlaneDeparture, FaChevronUp } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import { CardLayoutContainer } from "../CardLayout/CardLayout";
import { GoDotFill } from "react-icons/go";
import dayjs from "dayjs";

const FlightDetailCard = ({ flights }) => {
    const [isOpen, setIsOpen] = useState([]);
    const [flightSegments, setFlightSegments] = useState([]);

    useMemo(() => {
        if (flights?.AirItinerary?.OriginDestinationOptions) {
            // Flatten all flight segments from multiple OriginDestinationOptions
            const allSegments = flights.AirItinerary.OriginDestinationOptions.flatMap(option => option.FlightSegment);
            setFlightSegments(allSegments);
        }
    }, [flights]);
    const handleDropdown = (index) => {
        if (isOpen.includes(index)) {
            setIsOpen((prev) => prev.filter((item) => item != index))
        } else {
            setIsOpen((prev) => [...prev, index])

        }
    }
    return (
        <CardLayoutContainer className={'p-5 flightdetailpdf'}>
            <h2 className="text-xl font-semibold mb-3 text-text">Flight Details</h2>
            {flightSegments.map((flight, index) => (
                <div onClick={() => handleDropdown(index)} key={index} className={`mb-4 ${flightSegments.length - 1 == index ? '' : 'border-b'} border-lightgray`}>
                    <div className="p-4 rounded-lg flex items-center justify-between">
                        <div className="flex gap-3">
                            <FaPlaneDeparture className="text-primary text-lg mt-1" />
                            <div>
                                <p className="font-semibold text-gray-700 text-text">Flight {index + 1}</p>
                                <p className="text-sm text-gray-500 text-gray">
                                    {dayjs(flight.DepartureDate).format('dddd, MMMM-DD-YYYY')}
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-base text-gray-600 text-text font-semibold">{flights.ProviderType}</p>
                            <p className="text-sm font-semibold text-gray">
                                {flight.OperatingAirline.Code}-{flight.FlightNumber}
                            </p>
                        </div>

                        <div className="flex gap-9 items-center">
                            <div className="text-center">
                                <p className="text-lg font-semibold text-text leading-5">{flight.DepartureTime}</p>
                                <p className="text-xs font-semibold text-gray">
                                    {flight.DepartureAirport.LocationCode}
                                </p>
                            </div>

                            <div className="text-center flex flex-col items-center">
                                <p className="text-lg text-primary font-semibold">
                                    {flight.FlightDuration.split(":")[0]}hrs : {flight.FlightDuration.split(":")[1]}mins
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="h-0.5 w-8 bg-primary"></span>
                                    <IoIosAirplane className="text-2xl text-primary" />
                                    <span className="h-0.5 w-8 bg-primary"></span>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-lg text-text font-semibold leading-5">{flight.ArrivalTime}</p>
                                <p className="text-xs text-gray font-semibold">{flight.ArrivalAirport.LocationCode}</p>
                            </div>
                        </div>

                        <button onClick={() => handleDropdown(index)}
                            className={`text-gray-500 ${isOpen.includes(index) ? '' : 'rotate-180'} transition-all duration-300 bg-primary text-white rounded-full p-[5px]`}>
                            <FaChevronUp size={18} />
                        </button>
                    </div>

                    <div className={`${isOpen.includes(index) ? 'h-auto py-6' : 'h-0 overflow-hidden'} mt-4 rounded-lg px-6 bg-gray-50 text-text transition-all duration-500`}>
                        <p className="font-semibold mb-4 bg-greenbg p-3">
                            {dayjs(flight.DepartureDate).format('dddd, MMMM-DD-YYYY')}
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="font-semibold">{flight.DepartureTime}</p>
                                <div className="flex flex-col items-center justify-center">
                                    <GoDotFill className="text-primary text-lg translate-y-2" />
                                    <div className="w-1 h-20 rounded-full bg-primary mx-auto"></div>
                                    <GoDotFill className="text-primary text-lg -translate-y-2" />
                                </div>
                                <p className="font-semibold">{flight.ArrivalTime}</p>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-700">
                                    {flight.DepartureAirport.Terminal} <span className="text-gray-500">/ {flight.DepartureAirport.Terminal} International Airport</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    {flight.FlightDuration.split(":")[0]}hrs : {flight.FlightDuration.split(":")[1]}mins
                                </p>
                                <p className="font-semibold text-gray-700 mt-4">
                                    {flight.ArrivalAirport.Terminal} <span className="text-gray-500">/ {flight.ArrivalAirport.Terminal} International Airport</span>
                                </p>
                            </div>

                            <div className="ml-auto text-right">
                                <p className="text-base font-semibold">{flights.ProviderType}</p>
                                <p className="text-sm font-semibold text-gray">{flight.OperatingAirline.Code}-{flight.FlightNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </CardLayoutContainer>
    );
};

export default FlightDetailCard;
