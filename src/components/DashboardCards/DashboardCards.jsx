import React from "react";
import airlineImg from "../../assets/images/airline.png";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

const DashboardCards = ({ index, data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white flex flex-col rounded-2xl p-5 px-7 shadow-md w-[450px]">
        <div>
          <span className="text-center rounded-full px-3 py-1 font-semibold bg-blue-100 text-primary">
            Featured
          </span>
        </div>
        <div className="flex justify-center items-center gap-7">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">
              {index + 1} {data.Origin} - {data.Destination}
            </h2>
            <p className="text-md text-slate-500">Book your tickets now</p>
          </div>
          <img src={airlineImg} alt="airline-img" className="h-28" />
        </div>
        <div className="flex items-center justify-start pb-2">
          <div>
            <Button
              onClick={() => {
                navigate("/dashboard/search-flights");
              }}
              text={"Book now"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCards;
