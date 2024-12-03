import React, { useState, useEffect } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";

import { useNavigate, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../data/sidebarData";

const Sidebar = ({ status, updateStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navigationHandler = (path) => {
    navigate(path);
  };

  const menuItemHandler = (index, link) => {
    if (activeMenu !== index) {
      if (link.sublinks && link.sublinks.length > 0) {
        navigationHandler(link.sublinks[0].path);
      } else if (link.path) {
        navigationHandler(link.path);
      }
    }
    setActiveMenu((prevIndex) => (prevIndex === index ? null : index));
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
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        updateStatus(false);
      } else {
        updateStatus(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateStatus]);

  return (
    <div
      className={`transition-all bg-white ${
        status ? "w-64 shadow-md" : "w-0 overflow-hidden"
      } flex flex-col justify-between`}
    >
      <div>
        <div className="p-5 flex items-center">
          <h3
            onClick={() => navigationHandler("/dashboard")}
            className="text-2xl font-semibold flex items-center gap-3 text-text cursor-pointer"
          >
            <GiCommercialAirplane />
            Skyight
          </h3>
        </div>

        <div className="p-5 px-3">
          <ul className="w-full flex flex-col">
            {sidebarLinks.map((link, linkIndex) => (
              <div key={linkIndex} className="flex flex-col w-full">
                <li
                  onClick={() => menuItemHandler(linkIndex, link)}
                  className={`mb-2 w-full flex items-center justify-between gap-2 p-2 cursor-pointer transition-all hover:bg-slate-100 ${
                    activeMenu === linkIndex && !activeSubmenu
                      ? "text-primary bg-slate-100"
                      : "text-slate-500"
                  } rounded-full px-3 text-md font-semibold`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-sm">{link.title}</span>
                  </span>
                  {link.sublinks && (
                    <IoIosArrowForward
                      className={`text-sm transition-transform ${
                        activeMenu === linkIndex ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  )}
                </li>

                {activeMenu === linkIndex &&
                  link.sublinks &&
                  link.sublinks.map((sublink, sublinkIndex) => (
                    <li
                      key={sublinkIndex}
                      onClick={() => navigationHandler(sublink.path)}
                      className={`mb-3 py-1 w-full flex items-center gap-2 px-5 cursor-pointer transition-all ${
                        activeMenu === linkIndex &&
                        activeSubmenu === sublinkIndex
                          ? "text-primary"
                          : "text-slate-400"
                      } hover:text-primary rounded-full text-sm font-semibold`}
                    >
                      <span className="text-sm">{sublink.icon}</span>
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
