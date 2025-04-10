import React, { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";

export default function PriceSummary({ pricingInfo, travelers }) {
  const [fareBreakdown, setFareBreakdown] = useState(false);
  const passengersPrice = pricingInfo.PTC_FareBreakdowns;
  const totalFare = pricingInfo.ItinTotalFare;
  console.log("flightprice", totalFare);
  const travelersQuantity = Object.entries(travelers).filter(
    ([key, value]) => value > 0
  );
  console.log("travelers", travelers);

  const travelersFares = [
    passengersPrice[0].PassengerFare.TotalFare.pkrTotalFare,
    passengersPrice[1].PassengerFare.TotalFare.pkrTotalFare,
    passengersPrice[2].PassengerFare.TotalFare.pkrTotalFare,
  ];

  console.log(travelersFares);
  return (
    <div className="flex flex-col gap-3 text-text bg-white shadow-lg p-4 py-8 rounded-lg text-sm">
      <h2 className="text-xl font-semibold">Price Summary </h2>
      <div className="flex-col gap-3">
        {travelersQuantity.map(([key, value], i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b border-lightgray py-3">
            <p className="w-1/2 capitalize">
              <span>{key}</span> x{value}
            </p>
            <p className="text-gray">
              {Number(value * travelersFares[i]).toLocaleString()}
            </p>
          </div>
        ))}
        <div className="flex flex-col gap-3 pt-5">
          <p
            onClick={() => setFareBreakdown((prev) => !prev)}
            className="font-semibold text-lg flex justify-between cursor-pointer items-center">
            Fare Break Down{" "}
            <span>
              <FaChevronCircleDown
                className={`text-primary ${fareBreakdown ? "rotate-180" : "rotate-0"
                  } transition-all duration-300 ease-in-out `}
              />
            </span>
          </p>
          <div
            className={` ${fareBreakdown ? "h-auto" : "h-0 overflow-hidden"
              } transition-all duration-300 ease-in-out flex flex-col gap-3 px-3`}>
            {travelersQuantity.map(([key, value], idx) => (
              <div key={idx}>
                <h2 className="text-lg font-semibold capitalize">
                  {key} Break Down
                </h2>
                <div className="flex justify-between items-center border-b border-lightgray py-2">
                  <p>Base Fare:</p>
                  <p className="text-gray">
                    {passengersPrice[idx].PassengerFare.CurrencyCode}
                    {Number(
                      passengersPrice[idx].PassengerFare.BaseFare.pkrBaseFare
                    ).toLocaleString()}
                  </p>
                </div>
                <div className=" border-b border-lightgray py-2">
                  <p>Taxes:</p>
                  <p className="text-gray pt-1 pl-1">
                    {passengersPrice[idx].PassengerFare.Taxes.Tax.map(
                      (tax, i) => (
                        <div className="flex items-center justify-between pb-1">
                          <span className="text-text">{tax.Name} tax:</span>
                          <span>{Number(tax.Amount).toLocaleString()}</span>
                        </div>
                      )
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center  y-3">
                  <p className="text-primary font-semibold text-xl">Total</p>
                  <p className="text-gray font-bold">
                    {totalFare.TotalFare.CurrencyCode}
                    {Number(travelersFares[idx] * value).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
