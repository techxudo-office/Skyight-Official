import { FaChevronCircleDown, FaChevronDown, FaEye, FaUser } from "react-icons/fa";
import Flag from "react-world-flags";
import { CardLayoutContainer } from "../CardLayout/CardLayout";
import { MdChildCare, MdChildFriendly } from "react-icons/md";
import React, { useState } from "react";
import countries from "i18n-iso-countries";
import { ModalWrapper } from "../components";

const PassengerDetail = ({ travelersData }) => {
  const [dropdown, setDropdown] = useState([]);
  const [modalObject, setModalObject] = useState({
    isOpen: false,
    onRequestClose: "",
    contentLabel: ""
  });
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
    <CardLayoutContainer className={" my-4 p-5"}>

      <h2 className="text-xl text-text font-semibold mb-3">
        Passenger Details
      </h2>

      <div className="">
        {travelersData &&
          travelersData.map((passenger, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => handleDropdown(index)}
                className="grid grid-cols-3 mb-2 text-base h-28 bg-bluebg  p-4 px-6 rounded-lg border border-gray py-9">
                <div className="flex items-center gap-3">
                  <Flag
                    code={getCountryCode(passenger.country)}
                    className="w-6 h-4 "
                  />
                  <p className="font-semibold text-text leading-5">
                    {passenger.first_name} {passenger.last_name}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1 text-text">
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
                  <h1 className="text-white font-semibold text-2xl border-b pb-3 mb-2">
                    {passenger.first_name}'s Details
                  </h1>
                  <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-5">
                    {
                      Object.entries(passenger).map(([key, value]) => {
                        if (typeof value === "object") {
                          return (
                            <p className=" py-2 flex gap-3  border-lightgray   text-white ">
                              <span className="capitalize font-semibold">{key.replaceAll("_", " ")}:</span>
                              <span className="border-b border-dashed">
                                {(Object.values(value).join(" "))}
                              </span>
                            </p>
                          )
                        } else {
                          return (
                            <p className=" py-2 flex gap-3  border-lightgray   text-white ">
                              <span className="capitalize font-semibold">{key.replaceAll("_", " ")}:</span>
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
