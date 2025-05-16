import React from 'react'
import { CardLayoutContainer } from '../CardLayout/CardLayout'
import { skyightLogo } from '../../assets/Index'

export default function AvailableFlights({ flights }) {

    return (
        <CardLayoutContainer className={'mb-4'}>
            <div className='py-4 max-w-[1000px] overflow-x-scroll '>
                <div className='flex justify-start items-center px-4  '>


                    {
                        flights.map((flight, index) => {
                            return (
                                <div key={index} className={`min-w-44 flex font-semibold text-sm  flex-col items-center bg-bluebg border-primary text-text ${index == 0 && 'border-l'} border-t border-b border-r py-2 hover:shadow-lg transition-all duration-300  `}>
                                    <img className='w-24  border-primary rounded-t-lg'
                                        // src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/SereneAir.svg/1200px-SereneAir.svg.png"
                                        src={skyightLogo}
                                        alt="" />
                                    <div className=' flex flex-col items-center text-xs pt-1'>
                                        {/* <span>{flight.ProviderType}</span> */}
                                        <span className='text-primary'>{(flight.AirItineraryPricingInfo.ItinTotalFare.TotalFare.pkrTotalFare).toLocaleString()}
                                        </span>

                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>


        </CardLayoutContainer>
    )
}
