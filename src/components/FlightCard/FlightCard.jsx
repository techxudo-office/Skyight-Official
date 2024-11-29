import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Button, SecondaryButton } from "../../components/components";
import { useNavigate } from "react-router-dom";

import { FaPlane } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";

const FlightCard = () => {
  const navigate = useNavigate();

  return (
    <>
      <CardLayoutContainer className={'mb-5'}>
        <CardLayoutHeader className={"flex items-center justify-between"}>
          <div className="w-full flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-text">Flight name</h2>
              <h2 className="text-sm font-semibold text-slate-400">9999</h2>
              <h2 className="text-sm font-semibold text-slate-400">
                2024-11-29
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
                <h2 className="text-sm font-semibold text-slate-400">02:00</h2>
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-md font-semibold text-text">THR</h2>
                  <h2 className="text-md font-semibold text-text">01:00</h2>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="w-28 bg-primary rounded-full h-[2px]"></div>
                  <FaPlane className="text-primary" />
                  <div className="w-28 bg-primary rounded-full h-[2px]"></div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-md font-semibold text-text">TBZ</h2>
                  <h2 className="text-md font-semibold text-text">03:00</h2>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-semibold text-text">
                  Non Stop (Fix)
                </h2>
              </div>
            </div>
            <div>
              <SecondaryButton text={"AIRBLUEAPI (Fix)"} />
            </div>
          </div>
        </CardLayoutHeader>
        <CardLayoutBody>
          <div className="flex flex-col">
            <div className="flex py-3 border-b border-slate-200 items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-600 flex  items-center justify-center gap-1">
                <span>
                  <FaUser />
                </span>
                <span>Type:ADL</span>
              </h2>
              <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                <span>
                  <FaSuitcase />
                </span>
                <span>Baggage 333 KG</span>
              </h2>
              <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                <span>
                  <FaMoneyBillAlt />
                </span>
                <span>20,000</span>
              </h2>
            </div>
            <div className="flex py-3 border-b border-slate-200 items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-600 flex  items-center justify-center gap-1">
                <span>
                  <FaUser />
                </span>
                <span>Type:ADL</span>
              </h2>
              <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                <span>
                  <FaSuitcase />
                </span>
                <span>Baggage 333 KG</span>
              </h2>
              <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                <span>
                  <FaMoneyBillAlt />
                </span>
                <span>20,000</span>
              </h2>
            </div>
            <div className="flex py-3 pb-0 items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-600 flex  items-center justify-center gap-1">
                <span>
                  <FaUser />
                </span>
                <span>Type:ADL</span>
              </h2>
              <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                <span>
                  <FaSuitcase />
                </span>
                <span>Baggage 333 KG</span>
              </h2>
              <h2 className="text-sm font-semibold text-slate-500 flex  items-center justify-center gap-1">
                <span>
                  <FaMoneyBillAlt />
                </span>
                <span>20,000</span>
              </h2>
            </div>
          </div>
        </CardLayoutBody>
        <CardLayoutFooter>
          <div>
            <Button text={"View Details"} />
          </div>
        </CardLayoutFooter>
      </CardLayoutContainer>
    </>
  );
};

export default FlightCard;
