import { FaChevronCircleDown, FaChevronDown, FaEye, FaUser } from "react-icons/fa";
import Flag from "react-world-flags";
import { CardLayoutContainer } from "../CardLayout/CardLayout";
import { MdChildCare, MdChildFriendly } from "react-icons/md";
import React, { useState } from "react";
import countries from "i18n-iso-countries";
import { ModalWrapper } from "../components";

const PassengerDetail = ({ travelersData }) => {
  const [dropdown, setDropdown] = useState([]);
  const handleDropdown = (index) => {
    if (dropdown.includes(index)) {
      setDropdown((prev) => prev.filter((item) => item != index));
    } else {
      setDropdown((prev) => [...prev, index]);
    }
  };

  const getCountryCode = (alpha3) => {
    return countries.alpha3ToAlpha2(alpha3) || "PK";
  };
  return (
    <CardLayoutContainer className={"my-4 p-5"}>

      <h2 className="mb-3 text-xl font-semibold text-text">
        Passenger Details
      </h2>

      <div className="">
        {travelersData &&
          travelersData.map((passenger, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => handleDropdown(index)}
                className="grid grid-cols-3 p-4 px-6 mb-2 text-base border rounded-lg h-28 bg-bluebg border-gray py-9">
                <div className="flex items-center gap-3">
                  <Flag
                    code={getCountryCode(passenger.country)}
                    className="w-6 h-4 "
                  />
                  <p className="font-semibold leading-5 text-text">
                    {passenger.first_name} {passenger.last_name}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1 text-text">
                  {passenger.passenger_type == "ADT" ? (
                    <FaUser className="text-sm" />
                  ) : passenger.passenger_type == "CHD" ? (
                    <MdChildCare className="text-lg" />
                  ) : (
                    <MdChildFriendly className="text-lg" />
                  )}
                  <p className="font-semibold">
                    {passenger.passenger_type == "ADT"
                      ? "Adult"
                      : passenger.passenger_type == "CHD"
                        ? "Child"
                        : "Infant"}
                  </p>
                </div>
                <button
                  className={` flex self-center justify-self-end transition-all duration-300 h-fit bg-primary w-fit text-white text-xl p-1 rounded-full`}>
                  <FaEye onClick={() => handleDropdown(index)} />
                </button>
              </div>
              <ModalWrapper
                isOpen={dropdown.includes(index)}
                onRequestClose={() => setDropdown((prev) => prev.filter((item) => item !== index))}
              >

                <div className=" mt-5 rounded-xl  p-7 bg-secondary shadow-lg border-gray border-[1px]">
                  <h1 className="pb-3 mb-2 text-2xl font-semibold text-white border-b">
                    {passenger.first_name}'s Details
                  </h1>
                  <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-5">
                    {
                      Object.entries(passenger).map(([key, value]) => {
                        if (typeof value === "object") {
                          return (
                            <p className="flex gap-3 py-2 text-white border-lightgray">
                              <span className="font-semibold capitalize">{key.replaceAll("_", " ")}:</span>
                              <span className="border-b border-dashed">
                                {(Object.values(value).join(" "))}
                              </span>
                            </p>
                          )
                        } else {
                          return (
                            <p className="flex gap-3 py-2 text-white border-lightgray">
                              <span className="font-semibold capitalize">{key.replaceAll("_", " ")}:</span>
                              <span className="border-b border-dashed">{value}</span>
                            </p>
                          )
                        }
                      })
                    }
                  </div>

                </div>

              </ModalWrapper>

            </React.Fragment>
          ))}
      </div>
    </CardLayoutContainer>
  );
};

export default PassengerDetail;
