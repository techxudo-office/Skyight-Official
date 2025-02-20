import React, { useEffect, useState } from 'react'
import { CardLayoutContainer } from '../CardLayout/CardLayout'
import { IoIosAirplane, IoMdClock } from 'react-icons/io'
import { IoTimer } from 'react-icons/io5'
import { MdCalendarMonth, MdChildCare, MdChildFriendly, MdLuggage, MdPerson } from 'react-icons/md'
import { BsBag } from 'react-icons/bs'

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
                <div className='flex flex-col gap-2 items-start'>
                    <p className="text-text text-xl items-center font-bold uppercase flex gap-2 pb-3">
                        <span>{flightSegments[0].DepartureAirport.LocationCode}</span>
                        <div className="flex gap-3 items-center text-primary">
                            <span className="h-0.5 w-6 bg-primary"></span>
                            <IoIosAirplane className="text-2xl" />
                            <span className="h-0.5 w-6 bg-primary"></span>
                        </div>
                        <span>{flightSegments[0].ArrivalAirport.LocationCode}</span>
                        <div className="flex gap-1 text-sm md:text-base ml-3  text-text font-semibold items-center">
                            <MdCalendarMonth className="text-base md:text-lg " />
                            <span>Feb 12</span>
                        </div>
                    </p>
                    <div className="text-sm flex gap-2 font-semibold  h-fit pt-1  rounded-lg  text">
                        {/* <IoTimer className="mb-[3px] text-base" /> */}
                        <span className='flex items-center   gap-1'><IoMdClock className='text-base' />Duration:</span>
                        <span className='lowercase  text-primary'>{flightHrs.replace('0', '')} hrs {flightMins!='00'&&<span>{flightMins} mins</span>} </span>

                    </div>
                    <div className="flex gap-2 md:gap-4  flex-wrap  ">

                        {travelersQuantity.map((traveler, i) => (
                            <div key={i} className="flex flex-col gap-2  text-xl text-text font-semibold items-start">
                                <div className='flex items-center gap-1'>
                                    {traveler.icon}
                                    <span className="text-base mt-1 "> {traveler.value} {traveler.name}{traveler.value > 1 && (traveler.name == 'Child' ? 'ren' : 's')}</span>
                                </div>


                                <p className='flex items-center gap-1 text-base'>
                                    <MdLuggage className='text-xl mb-1' />
                                    {flightSegments[0].FreeBaggages[i].Quantity}
                                    {flightSegments[0].FreeBaggages[i].Unit}
                                </p>



                            </div>
                        ))}

                    </div>

                </div>
                {/* <div className=''>
                    <p className="text-base text-primary font-semibold pb-2">Free Baggages</p>
                    {travelersQuantity.map((passenger, idx) => (
                        <div key={idx} className=" font-semibold flex gap-2">
                            <p>{passenger.name}</p>
                            <p>
                                {flightSegments[0].FreeBaggages[idx].Quantity}
                                {flightSegments[0].FreeBaggages[idx].Unit}
                            </p>
                        </div>

                    ))}
                </div> */}

            </div>


        </CardLayoutContainer>
    )
}
