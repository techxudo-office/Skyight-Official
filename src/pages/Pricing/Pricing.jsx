import React from "react";
import { Navbar, Container, Footer } from "../../components/components";

import { PiArrowBendDownRightThin } from "react-icons/pi";
import { CgCalendarDates } from "react-icons/cg";

import { FaTruck, FaStar, FaUserFriends } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import { IoBagHandleSharp } from "react-icons/io5";
import { RiBox3Fill } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export const priceData = [
  {
    smBtn: "starter",
    title: "The very basics to start automating operations",
    price: "£49/mo",
    priceInfo: "Check price in EU €",
    demoBtn: "Book a demo",
    serviceTitle: "What is included:",
    services: [
      { icon: <FaTruck />, label: "Optimised carrier selection" },
      { icon: <FaStar />, label: "Buyer satisfaction email" },
      { icon: <SlEnergy />, label: "2 basic integrations" },
      { icon: <FaUserFriends />, label: "Access for 2 users" },
    ],
  },
  {
    smBtn: "starter",
    title: "The very basics to start automating operations",
    price: "£49/mo",
    priceInfo: "Check price in EU €",
    demoBtn: "Book a demo",
    serviceTitle: "What is included:",
    services: [
      { icon: <FaBangladeshiTakaSign />, label: "Bundles" },
      { icon: <RiBox3Fill />, label: "Custom unboxing" },
      { icon: <SlEnergy />, label: "2 basic integrations" },
      { icon: <FaUserFriends />, label: "Access for 2 users" },
    ],
  },
  {
    smBtn: "starter",
    title: "The very basics to start automating operations",
    price: "£49/mo",
    priceInfo: "Check price in EU €",
    demoBtn: "Book a demo",
    serviceTitle: "What is included:",
    services: [
      { icon: <BsStars />, label: "Omnichannel experience" },
      { icon: <BiSolidReport />, label: "Smart reports" },
      { icon: <SlEnergy />, label: "2 basic integrations" },
      { icon: <FaUserFriends />, label: "Access for 2 users" },
    ],
  },
];

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#EEF9FE] py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full  md:w-[1250px] m-auto ">
          <div className="flex flex-col gap-3 pt-16 px-4">
            <h1 className="text-[1.5rem] md:text-[2rem] text-balance  sm:text-10/12 md:w-7/12 font-bold leading-tight">
              <span className="text-blue-600">Grow your business</span> with our
              CX tools and affordable fulfilment
            </h1>
            <div>
              <button className="px-4 py-[5px] bg-blue-600 text-white  hover:bg-white hover:text-blue-600 rounded-lg flex justify-center gap-2 items-center ">
                <span className="text-2xl font-semibold">
                  <CgCalendarDates />
                </span>
                Calculate your fulfilment prices
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-4xl top-[-12px]">
                <PiArrowBendDownRightThin />
              </span>
              <p className="bottom-0 ">
                BtoC and BtoB logistics to scale your brand{" "}
              </p>
            </div>
          </div>
          <div className="col-span-2  overflow-x-scroll md:overflow-auto">
            <div className="flex gap-4 px-4 pt-10  md:overflow-x-auto flex-nowrap">
              {priceData.map((e, i) => {
                return (
                  <div
                    className={` ${
                      i == 1 && "bg-[#67D381]"
                    } rounded-[24px] md:w-auto w-[250px] flex-none md:flex-auto`}
                    key={i}
                  >
                    <p
                      className={`text-white  text-center py-1 ${
                        i === 1 ? "visible " : "invisible"
                      }`}
                    >
                      most popular
                    </p>
                    <div
                      className={`flex flex-col pb-10 gap-3 bg-white  rounded-[24px] px-3 pt-4 border relative ${
                        i === 1 && "border-[#67D381]"
                      }`}
                    >
                      <div className="flex flex-col gap-3 items-center">
                        <div>
                          <button className="px-5 py-1 text-blue-800 border border-blue-600 rounded-[16px] ">
                            {e.smBtn}
                          </button>
                        </div>
                        <p className="text-black/60 leading-5 text-center text-balance">
                          {e.title}
                        </p>
                        <h1 className="text-black/90 text-3xl font-bold">
                          {e.price}
                        </h1>
                        <p className="text-sm text-black/60 cursor-pointer">
                          {e.priceInfo}
                        </p>
                      </div>
                      <div>
                        <button
                          className={`w-full py-3 rounded-lg
                            ${
                              i === 1
                                ? "bg-blue-600 text-white  hover:bg-blue-700"
                                : "text-blue-600  border-blue-600 border hover:bg-blue-600 hover:text-white"
                            }`}
                        >
                          {e.demoBtn}
                        </button>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-black/60 text-sm">
                          {e.serviceTitle}
                        </h4>
                        {e.services.map((val, index) => {
                          return (
                            <div
                              className="flex gap-2 items-center"
                              key={index}
                            >
                              <span className="text-blue-600">{val.icon}</span>
                              <p>{val.label}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
