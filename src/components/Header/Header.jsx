import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Dropdown, SecondaryButton, Spinner } from "../components";
import { HiOutlineRefresh } from "react-icons/hi";
import { PiCoinsFill } from "react-icons/pi";
import { PiHandCoinsFill } from "react-icons/pi";
import { getCredits } from "../../utils/api_handler";
import { IoHome } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ sidebarStatus, setSidebarStatusHandler }) => {
  const navigate = useNavigate();
  const { updateAuthToken } = useContext(AuthContext);

  const [dropdownStatus, setDropDownStatus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [credits, setCredits] = useState("");

  const dropdownHandler = () => {
    setDropDownStatus(!dropdownStatus);
  };

  const dropdownOptions = [
    // {
    //   name: "Profile",
    //   icon: <FaUser />,
    //   handler: () => {
    //     navigationHandler("/dashboard/profile");
    //   },
    // },
    // {
    //   name: "Setting",
    //   icon: <IoIosSettings />,
    //   handler: () => {
    //     navigationHandler("/dashboard/setting");
    //   },
    // },
    {
      name: "Home",
      icon: <IoHome />,
      handler: () => {
        navigationHandler("/");
      },
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      handler: () => {
        navigationHandler("/dashboard/notifications");
      },
    },
    {
      name: "Logout",
      icon: <FiLogOut />,
      handler: () => {
        logoutHandler();
      },
    },
  ];

  const options = [
    {
      name: "View Credits",
      icon: <PiCoinsFill />,
      handler: () => {
        setIsActive(!isActive);
      },
    },
    {
      name: "More Credits",
      icon: <PiHandCoinsFill />,
      handler: () => {
        setIsActive(!isActive);
      },
    },
  ];

  const logoutHandler = () => {
    dropdownHandler();
    toast.success("Logout Successfully");
    setTimeout(() => {
      updateAuthToken();
    }, 2000);
  };

  const navigationHandler = (path) => {
    dropdownHandler();
    navigate(path);
  };

  const sidebarHandler = () => {
    setSidebarStatusHandler(!sidebarStatus);
  };

  const getCreditsHandler = async () => {
    let response = await getCredits();
    if (response.status) {
      setCredits(response.data);
    }
  };

  const refreshCredits = () => {
    setCredits("");
    setTimeout(() => {
      getCreditsHandler();
    }, 2000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCreditsHandler();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Toaster />
      <div id="header-container" className="flex justify-between items-center shadow-sm bg-white p-3">
        <HiOutlineMenuAlt1
          className={`text-3xl cursor-pointer hover:text-text ${
            sidebarStatus ? "text-slate-400" : "text-primary"
          }`}
          onClick={sidebarHandler}
        />
        <div className="flex items-center justify-center ">
          <div className="relative">
            <div
              className={`w-full flex items-center justify-center gap-3 cursor-pointer py-[7px] px-6 bg-blue-100 hover:text-black text-primary font-semibold rounded-full transition duration-300 ease-in-out transform focus:outline-none`}
              // onClick={() => {
              //   setIsActive(!isActive);
              // }}
            >
              {credits ? (
                <span
                  onClick={refreshCredits}
                  className="flex items-center gap-2"
                >
                  <HiOutlineRefresh />
                  <span>PKR {credits}</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <HiOutlineRefresh
                    className={`transition-all ${
                      !credits ? "rotate-180" : "rotate-0"
                    }`}
                  />
                  <span>Refreshing...</span>
                </span>
              )}
            </div>
          </div>
          <div className="px-3">
            <FaCircleUser
              onClick={dropdownHandler}
              className="text-slate-300 hover:text-slate-400 transition-all text-4xl cursor-pointer"
            />
            <Dropdown
              status={dropdownStatus}
              changeStatus={setDropDownStatus}
              options={dropdownOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
