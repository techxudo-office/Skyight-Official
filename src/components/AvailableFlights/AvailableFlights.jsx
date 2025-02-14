import React from 'react'
import { CardLayoutContainer } from '../CardLayout/CardLayout'

export default function AvailableFlights({ flights }) {
    console.log(flights)

    return (
        <CardLayoutContainer className={'mb-4'}>
            <div className='flex justify-center gap-3 items-center py-4'>
                {
                    flights.map((flight) => {
                        return (
                            <div className='w-44 flex font-semibold text-sm rounded-lg flex-col items-center bg-bluebg border-primary text-text border pb-1 hover:shadow-lg transition-all duration-300  '>
                                <img className='w-20  border-b-2 border-primary rounded-t-lg' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/SereneAir.svg/1200px-SereneAir.svg.png" alt="" />
                                <div className='p-2 flex flex-col items-center'>
                                    <span>{flight.ProviderType}</span>
                                    <span className='text-primary'>{(flight.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount).toLocaleString()}
                                    </span>

                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </CardLayoutContainer>
    )
}
