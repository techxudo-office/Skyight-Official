import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Header, Backbutton, CustomTooltip } from "../components/components";

const Layout = () => {
  const [sidebarStatus, setSidebarStatus] = useState(true);

  const setSidebarStatusHandler = (status) => {
    setSidebarStatus(status);
  };

  return (
    <>
      <Header
        sidebarStatus={sidebarStatus}
        setSidebarStatusHandler={setSidebarStatusHandler}
      />
      <div className="flex h-screen">

        <Sidebar status={sidebarStatus} updateStatus={setSidebarStatus} />
        <div className="flex-1 w-full md:w-4/5">

          <div
            className="flex flex-col justify-between items-center h-[100vh]  bg-slate-100 overflow-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="w-full flex justify-center flex-col items-center px-4 pt-28">
             
                <Backbutton />

              <Outlet />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
