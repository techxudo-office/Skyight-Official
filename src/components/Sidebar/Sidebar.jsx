import React, { useState, useEffect, useRef } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";

import { useNavigate, useLocation } from "react-router-dom";
import {
  CardLayoutContainer,
  CardLayoutHeader,
} from "../CardLayout/CardLayout";
import { MdEdit } from "react-icons/md";
import { useSidebarLinks } from "../../data/sidebarData";

const Sidebar = ({ status, updateStatus }) => {
  const sidebarLinks = useSidebarLinks();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileView, setMobileView] = useState(false);

  const navigationHandler = (path) => {
    navigate(path);
  };
  useEffect(() => {
    if (!status) {
      setActiveMenu(null);
    }
    if (activeMenu != null || status) {
      updateStatus(true);
    }
  }, [activeMenu, status]);

  const menuItemHandler = (index, link) => {
    if (link.sublinks && link.sublinks.length > 0) {
      // navigationHandler(link.sublinks[0].path);
      setActiveMenu((prevIndex) => (prevIndex === index ? null : index));
    } else if (link.path) {
      navigationHandler(link.path);
    }
  };

  useEffect(() => {
    let matchedMenu = null;
    let matchedSubmenu = null;

    sidebarLinks.forEach((link, index) => {
      if (link.path === location.pathname) {
        matchedMenu = index;
      } else if (link.sublinks) {
        const sublinkIndex = link.sublinks.findIndex(
          (sublink) => sublink.path === location.pathname
        );
        if (sublinkIndex !== -1) {
          matchedMenu = index;
          matchedSubmenu = sublinkIndex;
        }
      }
    });

    setActiveMenu(matchedMenu);
    setActiveSubmenu(matchedSubmenu);
    if (mobileView) {
      updateStatus(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        updateStatus(false);
        setMobileView(true);
      } else {
        updateStatus(true);
        setMobileView(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateStatus]);

  // useEffect(() => {
  //   if (mobileView) {
  //     const handleClickOutside = (e) => {
  //       if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
  //         updateStatus(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }
  // }, [sidebarRef, mobileView]);

  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjUuYcnZ-xqlGZiDZvuUy_iLx3Nj6LSaZSzQ&s"
  );

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div
      id="sidebar-container"
      ref={sidebarRef}
      className={`transition-all z-10  bg-white   shadow-md ${!mobileView
        ? status
          ? "w-1/5 pt-20 "
          : "w-28  items-center pt-20"
        : status
          ? "w-60 shadow-md fixed left-0 h-screen"
          : "w-0 p-0"
        } flex flex-col justify-between  transition-all duration-300 overflow-auto overflow-x-hidden`}
    >
      <div>
        {/* <div className={`py-3 items-center  flex ${status ? 'px-5' : 'justify-center'} `}>
          <h3
            onClick={() => navigationHandler("/")}
            className="flex items-center gap-3 text-2xl font-semibold cursor-pointer text-text"
          >
            <GiCommercialAirplane />
            {status ? 'Skyight' : ''}
          </h3>
        </div> */}
        <CardLayoutContainer className="w-full shadow-none">
          <CardLayoutHeader
            className="flex flex-col flex-wrap items-center justify-start py-3 gap-x-5"
            removeBorder={true}
          >
            {" "}
            <div
              className={`relative ${!mobileView ? (status ? "w-24 h-24" : "w-16 h-16") : "w-20 h-20"
                } overflow-hidden rounded-full cursor-pointer group`}
            >
              <img
                src={profileImage}
                alt="profile-img"
                className="object-cover w-full h-full rounded-full"
              />
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                onClick={() => fileInputRef.current.click()}
              >
                <MdEdit className="text-xl text-white" />
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
            <div>
              <h3
                className={`font-semibold text-text ${!mobileView ? (status ? "text-lg" : "text-sm") : ""
                  }`}
              >
                @techxudo
              </h3>
            </div>
          </CardLayoutHeader>
        </CardLayoutContainer>
        <div className="px-3">
          <ul className="flex flex-col items-center ">
            {sidebarLinks.map((link, linkIndex) => (
              <div
                key={linkIndex}
                className={`flex flex-col    ${status ? "w-full" : "items-center"
                  }`}
              >
                <li
                  onClick={() => menuItemHandler(linkIndex, link)}
                  className={`mb-2 flex items-center  gap-4 ${status ? "px-4" : ""
                    }  py-4 cursor-pointer transition-all hover:text-primary hover:bg-background text-text rounded-full   text-base `}
                >
                  {link.sublinks && status && (
                    <IoIosArrowForward
                      className={`text-xl transition-transform duration-300 ${activeMenu === linkIndex ? "-rotate-90" : "rotate-90"
                        }`}
                    />
                  )}
                  <span
                    className={`flex ${status ? "flex-row" : "flex-col"
                      } font-semibold  items-center gap-3`}
                  >
                    {link.title == "Dashboard" && status ? (
                      <span className="text-2xl">{link.icon}</span>
                    ) : (
                      ""
                    )}
                    <span className={`${status ? "hidden" : "text-3xl"}`}>
                      {link.icon}
                    </span>
                    <span className={`${status ? "text-base" : "text-sm"}`}>
                      {link.title}
                    </span>
                  </span>
                </li>

                {link.sublinks &&
                  link.sublinks.map((sublink, sublinkIndex) => (
                    <li
                      key={sublinkIndex}
                      onClick={() => navigationHandler(sublink.path)}
                      className={`  w-full flex items-center gap-4 ${status ? "px-3" : ""
                        } cursor-pointer transition-all  ${activeMenu === linkIndex && link.sublinks
                          ? "h-auto py-4 "
                          : "h-0 overflow-hidden "
                        } text-text rounded-full text-base  transition-all duration-300 hover:text-primary`}
                    >
                      <span className="text-3xl">{sublink.icon}</span>
                      {sublink.title}
                    </li>
                  ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
