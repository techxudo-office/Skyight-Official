import React, { useState, useEffect, useRef } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";

import { useNavigate, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../data/sidebarData";

const Sidebar = ({ status, updateStatus }) => {
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
    if (!status ) {
      setActiveMenu(null)
    }
    if ((activeMenu != null || status)) {
      
        updateStatus(true)

      
    }

  }, [activeMenu, status])

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

  return (
    <div
      id="sidebar-container"
      ref={sidebarRef}
      className={`transition-all z-10  bg-white   shadow-md ${!mobileView ? (status ? "w-1/5 pt-20 " : "w-28  items-center pt-20") : (status ? 'w-60 shadow-md fixed left-0 h-screen' : 'w-0 p-0')} flex flex-col justify-between  transition-all duration-300 overflow-auto overflow-x-hidden`}
    >
      <div>
        {/* <div className={`py-3 items-center  flex ${status ? 'px-5' : 'justify-center'} `}>
          <h3
            onClick={() => navigationHandler("/")}
            className="text-2xl font-semibold flex items-center gap-3 text-text cursor-pointer"
          >
            <GiCommercialAirplane />
            {status ? 'Skyight' : ''}
          </h3>
        </div> */}

        <div className="p-3">
          <ul className=" flex flex-col items-center">
            {sidebarLinks.map((link, linkIndex) => (
              <div key={linkIndex} className={`flex flex-col    ${status ? 'w-full' : 'items-center'}`}>
                <li
                  onClick={() => menuItemHandler(linkIndex, link)}
                  className={`mb-2 flex items-center  gap-4 ${status ? 'px-4' : ''}  py-4 cursor-pointer transition-all hover:text-primary hover:bg-background text-text rounded-full   text-base `}
                >
                  {link.sublinks && status && (
                    <IoIosArrowForward
                      className={`text-xl transition-transform duration-300 ${activeMenu === linkIndex ? "-rotate-90" : "rotate-90"
                        }`}
                    />
                  )}
                  <span className={`flex ${status ? 'flex-row' : 'flex-col'} font-semibold  items-center gap-3`}>
                    {link.title == 'Dashboard' && status ? <span className="text-2xl">{link.icon}</span> : ''}
                    <span className={`${status ? 'hidden' : 'text-3xl'}`}>{link.icon}</span>
                    <span className={`${status ? 'text-base' : 'text-sm'}`}>{link.title}</span>
                  </span>

                </li>

                {
                  link.sublinks &&
                  link.sublinks.map((sublink, sublinkIndex) => (
                    <li
                      key={sublinkIndex}
                      onClick={() => navigationHandler(sublink.path)}
                      className={`  w-full flex items-center gap-4 ${status ? 'px-3' : ''} cursor-pointer transition-all  ${activeMenu === linkIndex &&
                        link.sublinks ? 'h-auto py-4 ' : 'h-0 overflow-hidden '} text-text rounded-full text-base  transition-all duration-300 hover:text-primary`}
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
