import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Button, CustomTooltip } from "../components";
import { IoArrowBack } from "react-icons/io5";
const Backbutton = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation to get the current location/path

  // Function to navigate to the previous page
  const goBack = () => {
    navigate(-1); // -1 means going back to the previous page
  };

  // Hide the button on the dashboard home page
  const isDashboardHome = location.pathname === "/dashboard";

  if (isDashboardHome) {
    return null; // Don't render the button if we're on the dashboard home page
  }

  return (
    <div className="mb-4 w-full flex justify-end pr-6">
      <CustomTooltip content={"go Back"}>
        <div className="">
          <button
            onClick={goBack}
            className="text-xl px-4 py-1 rounded-lg bg-bluebg hover:bg-blue-300  text-primary border-[1px] border-primary">
            <IoArrowBack />
          </button>
        </div>
      </CustomTooltip>
    </div>
  );
};

export default Backbutton;
