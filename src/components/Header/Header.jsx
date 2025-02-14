import React, { useContext, useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CreditsDropdown, CustomTooltip, Dropdown, SecondaryButton, Spinner } from "../components";
import { HiOutlineRefresh } from "react-icons/hi";
import { PiCoinsFill } from "react-icons/pi";
import { PiHandCoinsFill } from "react-icons/pi";
import { getCredits } from "../../utils/api_handler";
import { IoHome } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { logo, skyightLogo } from "../../assets/Index";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotificationsNone, MdLogout, MdPerson, MdPersonPinCircle, MdOutlinePersonPinCircle, MdPersonPin, MdArrowDropDown } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";


const Header = ({ sidebarStatus, setSidebarStatusHandler }) => {

  const navigate = useNavigate();
  const { updateAuthToken } = useContext(AuthContext);

  const [dropdownStatus, setDropDownStatus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [CreditsDropdownOpen, setCreditsDropdownOpen] = useState(false);
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

  const getCreditsHandler = useCallback(async () => {
    if (!credits) {
      let response = await getCredits();
      if (response?.status) {
        setCredits(response.data);
      }
    }
  }, [credits]);

  const refreshCredits = () => {
    setCredits("");
    setTimeout(() => {
      getCreditsHandler();
    }, 2000);
  };

  useEffect(() => {
    getCreditsHandler(); // Component mount hone pe ek bar call hoga
  }, [getCreditsHandler]);

  return (
    <>
      <Toaster />


      <nav className="w-full fixed z-[999] bg-white shadow-md border-b-[1px] border-grayBg ">
        <div className="mx-auto px-2">
          <div className="flex items-center justify-between p-2 sm:p-4"> {/* Adjust padding for mobile and desktop */}
            <div className="flex items-end gap-3">
              {/* Left Section: Hamburger Menu */}
              <CustomTooltip content={'Open / close'}>
                <button className="text-gray-700 hover:text-gray-900 transition" onClick={sidebarHandler}>
                  <GiHamburgerMenu size={22} /> {/* Consistent size for mobile and desktop */}
                </button>
              </CustomTooltip>


              {/* Center Section: Logo */}
              <div className="flex items-center ">
                <img src={skyightLogo} className="w-24 translate-x-3" alt="" />
              </div>
            </div>

            {/* Right Section: Icons & User */}
            <div className="flex items-center gap-2 sm:gap-3">
              <CustomTooltip content={'Email'}>
                <div>
                  <TfiEmail className="text-text text-xl cursor-pointer" />

                </div>
              </CustomTooltip>
              <CustomTooltip content={'Notifications'}>
                <div>
                  <MdNotificationsNone className="text-text text-xl cursor-pointer"
                    onClick={() => navigationHandler("/dashboard/notifications")}
                  /> {/* Consistent size for all icons */}
                </div>

              </CustomTooltip>
              <CustomTooltip content={'Settings'}>
                <div>
                  <SlSettings className="text-text text-xl cursor-pointer" /> {/* Consistent size for all icons */}

                </div>
              </CustomTooltip>
              <div className="relative">
                <CustomTooltip content={'credits'}>
                  <button
                    className={`w-full text-base relative flex items-center justify-center gap-2 cursor-pointer py-2 border-primary border-[1px] px-4 bg-blue-100 hover:text-secondary  text-primary font-semibold rounded-xl transition duration-300 ease-in-out transform focus:outline-none`}
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
                        <span>PKR {credits?.toLocaleString("en-US")}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <HiOutlineRefresh
                          className={`transition-all ${!credits ? "rotate-180" : "rotate-0"
                            }`}
                        />
                        <span>Refreshing...</span>
                      </span>
                    )}
                    
                    <MdArrowDropDown className={`text-xl ${CreditsDropdownOpen?'rotate-180':''} transition-all duration-300`} onClick={() => setCreditsDropdownOpen((prev) => !prev)}/>
                    <div className="absolute top-14 right-0">
                      {CreditsDropdownOpen&&<CreditsDropdown onClose={()=>setCreditsDropdownOpen(false)} />}

                    </div>

                  </button>

                </CustomTooltip>


              </div>

              <CustomTooltip content={'profile'}>
                <div className="px-3">
                  <FaUserCircle
                    onClick={dropdownHandler}
                    className="text-primary hover:text-secondary transition-all text-4xl cursor-pointer"
                  />
                  <Dropdown
                    status={dropdownStatus}
                    changeStatus={setDropDownStatus}
                    options={dropdownOptions}
                  />
                </div>
              </CustomTooltip>


            </div>

          </div>


        </div>
      </nav>
    </>
  );
};
export default Header