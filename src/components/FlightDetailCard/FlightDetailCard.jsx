import { useState } from "react";
import { FaPlaneDeparture, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import { CardLayoutContainer } from "../CardLayout/CardLayout";
import { GoDotFill } from "react-icons/go";

const FlightDetailCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <CardLayoutContainer className={'p-5 flightdetailpdf'}>

            <h2 className="text-xl font-semibold mb-3 text-text">Flight Details</h2>

            {/* Flight Summary */}
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                <div className="flex  gap-3">
                    <FaPlaneDeparture className="text-primary text-lg mt-1" />
                    <div>
                        <p className="font-semibold text-gray-700 text-text">Flight 1</p>
                        <p className="text-sm text-gray-500 text-gray">Monday, January 06 2025</p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-base text-gray-600 text-text font-semibold">Airblue</p>
                    <p className="text-sm font-semibold text-gray">PA-200</p>
                </div>
                <div className="flex gap-9 items-center">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-text leading-5">13:30</p>
                        <p className="text-xs font-semibold text-gray">KHI</p>
                    </div>

                    <div className="text-center flex flex-col items-center">
                        <p className="text-lg text-primary font-semibold">2 hrs 10 mins</p>
                        <div className="flex items-center gap-2">
                            <span className="h-0.5 w-8 bg-primary"></span>
                            <IoIosAirplane className="text-2xl text-primary" />
                            <span className="h-0.5 w-8 bg-primary"></span>
                        </div>

                    </div>

                    <div className="text-center">
                        <p className="text-lg text-text font-semibold leading-5">15:40</p>
                        <p className="text-sm text-gray font-semibold">ISB</p>
                    </div>
                </div>


                {/* Dropdown Arrow */}
                <button onClick={() => setIsOpen(!isOpen)} className={`text-gray-500 ${isOpen?'rotate-180':''} transition-all duration-300 bg-primary text-white rounded-full p-[5px]`}>
                     <FaChevronUp size={18} />
                </button>
            </div>

            {/* Dropdown Content */}
            
                <div className={`${isOpen?'h-auto py-6':'h-0 overflow-hidden'}  mt-4  rounded-lg px-6 bg-gray-50 text-text transition-all duration-500`}>
                    <p className="font-semibold mb-4 bg-greenbg p-3 ">Monday, January 06 2025</p>

                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <p className="font-semibold">13:30</p>
                            <div className="flex flex-col items-center  justify-center">
                                <GoDotFill className="text-primary text-lg translate-y-2" />
                                <div className="w-1 h-20 rounded-full  bg-primary mx-auto">
                                </div>
                                <GoDotFill className="text-primary text-lg -translate-y-2 " />

                            </div>
                            <p className="font-semibold">15:40</p>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-700">
                                Karachi <span className="text-gray-500">/ Jinnah International Airport</span>
                            </p>
                            <p className="text-sm text-gray-500">2 HRS 10 MINS</p>

                            <p className="font-semibold text-gray-700 mt-4">
                                Islamabad <span className="text-gray-500">/ Islamabad International Airport</span>
                            </p>
                        </div>

                        <div className="ml-auto text-right">
                            <p className="text-base font-semibold">Airblue</p>
                            <p className="text-sm font-semibold text-gray">PA-200</p>
                        </div>
                    </div>
                </div>
            

        </CardLayoutContainer>

    );
};

export default FlightDetailCard;
