import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomTooltip } from "../components";
import { MdArrowBackIos } from "react-icons/md";
const Backbutton = ({ className, status }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  const isDashboardHome = location.pathname === "/dashboard";

  if (isDashboardHome || !status) {
    return null;
  }

  return (
    <div className={`mb-4 flex w-fit ${className}`}>
      <CustomTooltip content={"go Back"}>
        <div className="">
          <button
            onClick={goBack}
            className="text-xl pl-2 pr-1 py-1 rounded-l-full bg-background hover:bg-blue-300  text-primary border-[1px] border-primary"
          >
            <MdArrowBackIos />
          </button>
        </div>
      </CustomTooltip>
    </div>
  );
};

export default Backbutton;
