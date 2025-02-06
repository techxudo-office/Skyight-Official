import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { FaUser, FaUserCircle } from "react-icons/fa";
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
import { logo } from "../../assets/Index";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotificationsNone, MdLogout, MdPerson, MdPersonPinCircle, MdOutlinePersonPinCircle, MdPersonPin } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";


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
      {/* <div id="header-container" className="flex  justify-between items-center fixed shadow-md z-[999] bg-white w-full p-3 py-4">
        <button className="text-gray-700 hover:text-gray-900 transition" onClick={sidebarHandler}>
          <GiHamburgerMenu size={20} /> 
        </button>
        <div className="flex items-center text-text text-xl ">
          <img src={logo} className="w-20" alt="" />
          Skyight
        </div>

        <div className="flex items-center justify-center ">
          <div className="relative">
            <div
              className={`w-full flex items-center justify-center gap-3 cursor-pointer py-4 border-primary border-[1px] px-6 bg-blue-100 hover:text-text  text-primary font-semibold rounded-xl transition duration-300 ease-in-out transform focus:outline-none`}
            onClick={() => {
              setIsActive(!isActive);
            }}
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
                    className={`transition-all ${!credits ? "rotate-180" : "rotate-0"
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
              className="text-slate-300 hover:text-slate-400 transition-all text-5xl cursor-pointer"
            />
            <Dropdown
              status={dropdownStatus}
              changeStatus={setDropDownStatus}
              options={dropdownOptions}
            />
          </div>
        </div>
      </div> */}

      <nav className="w-full fixed z-[999] bg-white shadow-md border-b-[1px] border-grayBg ">
        <div className="mx-auto px-2">
          <div className="flex items-center justify-between p-2 sm:p-4"> {/* Adjust padding for mobile and desktop */}
            <div className="flex ">
            {/* Left Section: Hamburger Menu */}
            <button className="text-gray-700 hover:text-gray-900 transition" onClick={sidebarHandler}>
              <GiHamburgerMenu size={22} /> {/* Consistent size for mobile and desktop */}
            </button>

            {/* Center Section: Logo */}
            <div className="flex items-center">
              <img src={logo} className="w-16 translate-x-3" alt="" />
              <span className="text-text font-semibold text-xl">Skyight</span>
            </div>
            </div>

            {/* Right Section: Icons & User */}
            <div className="flex items-center gap-2 sm:gap-3">
                <TfiEmail className="text-text text-xl cursor-pointer"  />
                <MdNotificationsNone className="text-text text-xl cursor-pointer" 
                onClick={()=>navigationHandler("/dashboard/notifications")}
                 /> {/* Consistent size for all icons */}
                <SlSettings className="text-text text-xl cursor-pointer"  /> {/* Consistent size for all icons */}
                <div className="relative">
                <div
                  className={`w-full flex items-center justify-center gap-3 cursor-pointer py-3 border-primary border-[1px] px-6 bg-blue-100 hover:text-text hover:border-text  text-primary font-semibold rounded-xl transition duration-300 ease-in-out transform focus:outline-none`}
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
                        className={`transition-all ${!credits ? "rotate-180" : "rotate-0"
                          }`}
                      />
                      <span>Refreshing...</span>
                    </span>
                  )}
                </div>
              </div>


              {/* User Logout Button */}
              {/* <button className="p-2 text-primary  hover:bg-slate-100 rounded-full transition"
                onClick={logoutHandler}
              >
                <MdLogout size={22} /> 
              </button> */}
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

            </div>
           
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header




// Hamburger Menu Icon
// const MenuIcon = ({ onClick }) => (
//   <button className="text-gray-700 hover:text-gray-900 transition" onClick={onClick}>
//     <GiHamburgerMenu size={20} /> {/* Consistent size for mobile and desktop */}
//   </button>
// );

// // Logo Component
// const Logo = ({ src, companyName }) => (
//   <div className="flex items-center gap-2">
//     <img src={src} alt="Logo" className="h-6 sm:h-8 rounded-lg" /> {/* Adjust logo size for mobile and desktop */}
//     <p className="hidden lg:block text-sm font-semibold text-gray-800 truncate">
//       {companyName}
//     </p>
//   </div>
// );

// // Icon Button (for Notifications, Settings, etc.)
// const IconButton = ({ icon: Icon, onClick, className }) => (
//   <button
//     className={`flex items-center border-1 mx-1 justify-center p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition ${className}`}
//     onClick={onClick}
//   >
//     <Icon size={18} /> {/* Consistent size for all icons */}
//   </button>
// );

// // User Logout Button (Without Dropdown)
// const UserLogoutButton = () => (
//   <button className="p-1.5 text-[#0FB07B] w-8 h-8 border-1 flex items-center hover:bg-gray-100 rounded-full transition">
//     <MdLogout size={18} /> {/* Consistent size for logout icon */}
//   </button>
// );

// const Navbar = ({ logoSrc, companyName }) => {
//   return (
   
//   );
// };

// export default Navbar;

