import React from "react";
import airlineImg from "../../assets/images/airline.png";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import { MdBookmark } from "react-icons/md";

const DashboardCards = ({ index, data }) => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="bg-white flex flex-col rounded-lg p-5 px-7 shadow-md gap-4">
        <div>
          <span className="text-center rounded-full px-3 py-1 font-semibold bg-blue-100 text-primary">
            Featured
          </span>
        </div>
        <div className="flex lg:flex-row flex-col  lg:items-center gap-7">
          <div className="flex flex-col max-lg:order-2 ">
            <h2 className="text-2xl font-semibold">
              {index + 1} {data.Origin} - {data.Destination}
            </h2>
            <p className="text-md text-slate-500">Book your tickets now</p>
          </div>
          <img src={airlineImg} alt="airline-img" className="h-32 flex-1 max-lg:order-1 " />
        </div>
        <div className="flex items-center justify-start pb-2">
          <div>
            <Button
              icon={<MdBookmark />}
              onClick={() => {
                navigate("/dashboard/search-flights");
              }}
              text={"Book now"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
