import React, { useState } from 'react'
import { FaChevronCircleDown } from 'react-icons/fa'

export default function PriceSummary({ pricingInfo, travelers }) {
    const [fareBreakdown, setFareBreakdown] = useState(false);
    const passengersPrice = pricingInfo.PTC_FareBreakdowns
    console.log(travelers)
    const totalFare = pricingInfo.ItinTotalFare
    console.log('flightprice', totalFare)
    const travelersFares = {
        adults: travelers.adults * passengersPrice[0].PassengerFare.TotalFare.Amount,
        children: travelers.childs * passengersPrice[1].PassengerFare.TotalFare.Amount,
        infants: travelers.infants * passengersPrice[2].PassengerFare.TotalFare.Amount
    }


    console.log(travelersFares)
    return (
        <div className="flex flex-col gap-3 text-text bg-white shadow-lg p-4 py-8 rounded-lg text-sm">
            <h2 className="text-xl font-semibold">Price Summary </h2>
            <div className="flex-col gap-3">
                {/* {passengersPrice.map((passenger, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-lightgray py-3">
                        <p className="w-1/2 capitalize"><span>{passenger.PassengerTypeQuantity.Code == 'ADL' ? 'adults' : passenger.PassengerTypeQuantity.Code == 'CHD' ? 'children' : 'infants'}</span> x

                            {passenger.PassengerTypeQuantity.Code == 'ADL' ? travelers.adults : passenger.PassengerTypeQuantity.Code == 'CHD' ? travelers.childs : travelers.infants}
                        </p>
                        <p className="text-gray">{passenger.PassengerFare.TotalFare.Amount}</p>
                    </div>
                ))} */}
                <div  className="flex justify-between items-center border-b border-lightgray py-3">
                    <p className="w-1/2 capitalize"><span>adults</span> x{travelers.adults}
                    </p>
                    <p className="text-gray">{travelers.adults * travelersFares.adults}</p>
                </div>
                <div  className="flex justify-between items-center border-b border-lightgray py-3">
                    <p className="w-1/2 capitalize"><span>children</span> x{travelers.childs}
                    </p>
                    <p className="text-gray">{travelers.childs * travelersFares.children}</p>
                </div>
                <div  className="flex justify-between items-center border-b border-lightgray py-3">
                    <p className="w-1/2 capitalize"><span>infants</span> x{travelers.infants}
                    </p>
                    <p className="text-gray">{travelers.infants * travelersFares.infants}</p>
                </div>
                <div className="flex justify-between items-center border-b border-lightgray py-3">
                    <p>price you pay</p>
                    <p className="text-gray">PKR 104,421</p>
                </div>
                <div className="flex flex-col gap-3 pt-5">
                    <p onClick={() => setFareBreakdown((prev) => !prev)} className="font-semibold text-lg flex justify-between cursor-pointer items-center">Fare Break Down <span><FaChevronCircleDown className={`text-primary ${fareBreakdown ? 'rotate-180' : 'rotate-0'} transition-all duration-300 ease-in-out `} /></span></p>
                    <div className={` ${fareBreakdown ? 'h-auto' : 'h-0 overflow-hidden'} transition-all duration-300 ease-in-out flex flex-col gap-3 px-3`}>
                        <h2 className="text-lg font-semibold">Adult Break Down</h2>
                        <div className="flex justify-between items-center border-b border-lightgray py-2">
                            <p>Base Fare:</p>
                            <p className="text-gray">{totalFare.BaseFare.CurrencyCode} {totalFare.BaseFare.Amount}</p>
                        </div>
                        <div className="flex justify-between items-center border-b border-lightgray py-2">
                            <p>Tax:</p>
                            <p className="text-gray">PKR 4,640</p>
                        </div>
                        <div className="flex justify-between items-center border-b border-lightgray py-2">
                            <p>Gross Fare:</p>
                            <p className="text-gray">{totalFare.TotalFare.CurrencyCode} {totalFare.TotalFare.Amount}</p>
                        </div>
                        <div className="flex justify-between items-center border-b border-lightgray py-2">
                            <p>Discount:</p>
                            <p className="text-gray">-PKR 3,619</p>
                        </div>
                        <div className="flex justify-between items-center  y-3">
                            <p className="text-primary font-semibold text-xl">Total</p>
                            <p className="text-gray">{totalFare.TotalFare.CurrencyCode} {totalFare.TotalFare.Amount}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
