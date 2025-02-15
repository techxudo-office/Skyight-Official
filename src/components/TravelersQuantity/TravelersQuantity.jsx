import React, { useEffect, useState } from 'react'
import { CardLayoutContainer } from '../CardLayout/CardLayout'
import { IoIosAirplane } from 'react-icons/io'
import { IoTimer } from 'react-icons/io5'
import { MdCalendarMonth, MdChildCare, MdChildFriendly, MdPerson } from 'react-icons/md'

export default function TravelersQuantity({ flightSegments, travelers }) {
    const [travelersQuantity, setTravelersQuantity] = useState([])
    console.log('travelers', travelers)
    useEffect(() => {
        if ((Object.entries(travelers)).length)
            setTravelersQuantity(Object.entries(travelers)
                .filter(([key, value]) => value > 0)
                .map(([key, value]) => {
                    if (key == 'adults') {
                        return {
                            icon: <MdPerson />,
                            name: 'Adult',
                            value: value
                        }
                    } else if (key == 'childs') {
                        return {
                            icon: <MdChildCare />,
                            name: 'Child',
                            value: value
                        }
                    } else {
                        return {
                            icon: < MdChildFriendly />,
                            name: 'Infant',
                            value: value
                        }
                    }
                }))
    }, [travelers])
    const [flightHrs, flightMins] = flightSegments[0].FlightDuration.split(":")
    return (
        <CardLayoutContainer className={'mb-5'}>
            <div className="flex md:flex-row flex-col justify-between px-6 gap-3 md:items-end py-9 text-text">
                <div className='flex flex-col gap-2'>
                    <p className="text-text text-xl items-center font-bold uppercase flex gap-2 pb-3">
                        <span>{flightSegments[0].DepartureAirport.LocationCode}</span>
                        <div className="flex gap-3 items-center text-primary">
                            <span className="h-0.5 w-6 bg-primary"></span>
                            <IoIosAirplane className="text-2xl" />
                            <span className="h-0.5 w-6 bg-primary"></span>
                        </div>
                        <span>{flightSegments[0].ArrivalAirport.LocationCode}</span>

                    </p>
                    <div className="flex gap-2 md:gap-4  flex-wrap items-center ">
                        <div className="flex gap-1 text-sm md:text-base text-text font-semibold items-start">
                            <MdCalendarMonth className="text-base md:text-xl" />
                            <span>Feb 12</span>
                        </div>
                        {travelersQuantity.map((traveler, i) => (
                            <div key={i} className="flex gap-1  text-xl text-text font-semibold items-start">
                                {traveler.icon}

                                <span className="text-base "> {traveler.value} {traveler.name}{traveler.value > 1 && (traveler.name == 'Child' ? 'ren' : 's')}</span>


                            </div>
                        ))}
                    </div>
                    <div className="text-sm flex gap-2 font-semibold  h-fit pt-1  rounded-lg  text">
                        {/* <IoTimer className="mb-[3px] text-base" /> */}
                        <span className=''>Duration:</span>
                        <span className='lowercase'>{flightHrs.replace('0', '')} hrs {flightMins} mins</span>

                    </div>
                </div>
                <div className=''>
                    <p className="text-base text-primary font-semibold pb-2">Free Baggages</p>
                    {flightSegments[0].FreeBaggages.map((passenger, idx) => (
                        <div key={idx} className=" font-semibold flex gap-2">
                            <p>{passenger.PassengerType.replace(/ADL/g, 'Adult')
                                .replace(/CHD/g, 'Child')
                                .replace(/INF/g, 'Infant')}</p>
                            <p>{passenger.Quantity}{passenger.Unit}</p>
                        </div>

                    ))}
                </div>

            </div>


        </CardLayoutContainer>
    )
}
