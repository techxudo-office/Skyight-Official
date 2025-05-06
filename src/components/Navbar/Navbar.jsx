import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "../components";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";
import toast from "react-hot-toast";

import logo from "../../assets/logo/logo.png";
import planeIcon from "../../assets/icons/plane.png";
import { useSelector } from "react-redux";

const Navbar = ({ hideLinks }) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  const [dropdownStatus, setDropDownStatus] = useState(false);

  const dropdownHandler = () => {
    setDropDownStatus(!dropdownStatus);
  };

  const logoutHandler = () => {
    dropdownHandler();
    toast.success("Logout Successfully");
  };

  const protectedOptions = [
    {
      name: "Dashboard",
      icon: <RiDashboardFill />,
      handler: () => {
        navigationHandler("/dashboard");
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

  const unProtectedOptions = [
    {
      name: "Login",
      icon: <FiLogIn />,
      handler: () => {
        navigationHandler("/login");
      },
    },
    {
      name: "Register",
      icon: <FaUser />,
      handler: () => {
        navigationHandler("/registration");
      },
    },
  ];

  const navLinksData = [
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Pricing",
      path: "/pricing",
    },
  ];

  const navigationHandler = (path) => {
    navigate(path);
  };

  return (
    <>

      <nav className="py-4 bg-white shadow-md">
        <div className="container flex items-center justify-between mx-auto ps-3 pe-6">
          <Link to="/">
            <div className="flex items-center gap-3 ">
              <img src={logo} alt="logo" className="h-8" />
              <span className="text-2xl font-bold text-primary ms-[-20px]">
                SKYIGHT
              </span>
            </div>
          </Link>

          <ul
            style={{ display: hideLinks && "none" }}
            className="flex items-center justify-end flex-grow space-x-8"
          >
            {navLinksData &&
              navLinksData.map((link, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigationHandler(link.path);
                    }}
                    className="font-semibold transition-all cursor-pointer text-slate-400 text-md hover:text-lg hover:text-primary hover:underline"
                  >
                    {link.name}
                  </li>
                );
              })}

            <li>
              <div className="px-3">
                <div
                  onClick={dropdownHandler}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-4xl transition-all border-2 rounded-full cursor-pointer border-primary hover:border-secondary text-primary hover:text-secondary"
                >
                  <img
                    src={planeIcon}
                    alt="plane"
                    className={`h-8 transition-all ${dropdownStatus && "rotate-180"
                      }`}
                  />
                  <CgMenuRightAlt />
                </div>
                <Dropdown
                  status={dropdownStatus}
                  changeStatus={setDropDownStatus}
                  options={userData?.token ? protectedOptions : unProtectedOptions}
                  right={"-100"}
                />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
