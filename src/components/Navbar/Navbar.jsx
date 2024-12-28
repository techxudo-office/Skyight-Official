import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "../components";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Navbar = ({ hideLinks }) => {
  const navigate = useNavigate();
  const { authToken, updateAuthToken } = useContext(AuthContext);

  const [dropdownStatus, setDropDownStatus] = useState(false);

  const dropdownHandler = () => {
    setDropDownStatus(!dropdownStatus);
  };

  const logoutHandler = () => {
    dropdownHandler();
    toast.success("Logout Successfully");
    updateAuthToken();
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
      <Toaster />
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between ps-3 pe-6">
          <Link to="/">
            <div className="flex items-center gap-3 ">
              <img
                src="http://localhost:2000/static/media/navbaricon.d3d3994ce25dc3b2a2a3.png"
                alt="logo"
                className="h-14"
              />
              <span className="text-2xl font-bold text-primary ms-[-20px]">
                SKYIGHT
              </span>
            </div>
          </Link>

          <ul
            style={{ display: hideLinks && "none" }}
            className="flex justify-end flex-grow space-x-8 items-center"
          >
            {navLinksData &&
              navLinksData.map((link, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigationHandler(link.path);
                    }}
                    className="text-slate-400 text-md hover:text-lg transition-all hover:text-primary font-semibold cursor-pointer hover:underline"
                  >
                    {link.name}
                  </li>
                );
              })}

            <li>
              <div className="px-3">
                <div
                  onClick={dropdownHandler}
                  className="flex items-center justify-center rounded-full px-3 py-2 gap-2 border-2 border-primary hover:border-secondary text-primary hover:text-secondary transition-all text-4xl cursor-pointer"
                >
                  <img
                    src="http://localhost:2000/static/media/nav.377a0bb50be2f2a372fc.png"
                    alt="plane"
                    className={`h-8 transition-all ${
                      dropdownStatus && "rotate-180"
                    }`}
                  />
                  <CgMenuRightAlt />
                </div>
                <Dropdown
                  status={dropdownStatus}
                  changeStatus={setDropDownStatus}
                  options={authToken ? protectedOptions : unProtectedOptions}
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
