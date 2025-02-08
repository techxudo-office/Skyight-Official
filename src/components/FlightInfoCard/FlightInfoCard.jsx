import dayjs from "dayjs";
import React from "react";
import { IoIosAirplane } from "react-icons/io";

export default function FlightInfoCard({ className, flights }) {
    return (
        <>
            {
                flights.length>0&&flights.map((flight,i) => {
                    return (
                        <div key={i} className={`${className} w-full mx-auto flex flex-col gap-5 p-5 bg-white shadow-lg rounded-lg text-text `}>
                            <div>
                                <div className="text-white bg-primary px-3 py-1 rounded-md text-sm font-semibold w-fit">
                                    FLIGHT {i+1}
                                </div>
                                <div className="flex justify-between mt-4 text-gray-500 text-sm">
                                    <div className="text-center">
                                        <p className="font-semibold">DEPARTURE</p>
                                        <p className="text-gray-700">{dayjs(flight.DepartureDate).format('MMM-DD-YYYY')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">ARRIVAL</p>
                                        <p className="text-gray-700">{dayjs(flight.ArrivalDate).format('MMM-DD-YYYY')}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-4 mt-3 border-b border-lightgray">
                                    <div className="text-start">
                                        <p className="text-xl font-bold">{flight.DepartureAirport.LocationCode}</p>
                                        <p className="text-gray-600">{flight.DepartureAirport.Terminal}</p>
                                        <p className="text-gray-700 font-semibold">{flight.DepartureTime}</p>
                                    </div>
                                    <div className="flex gap-3 items-center text-primary">
                                        <span className="h-0.5 w-8 bg-primary"></span>
                                        <IoIosAirplane className="text-2xl" />
                                        <span className="h-0.5 w-8 bg-primary"></span>
                                    </div>
                                    <div className="text-end ">
                                    <p className="text-xl font-bold">{flight.ArrivalAirport.LocationCode}</p>
                                        <p className="text-gray-600">{flight.ArrivalAirport.Terminal}</p>
                                        <p className="text-gray-700 font-semibold">{flight.ArrivalTime}</p>
                                    </div>
                                </div>
                            </div>

                        </div>)
                })
            }
        </>
    );
}
