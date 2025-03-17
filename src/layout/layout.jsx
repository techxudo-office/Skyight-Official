import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Header, Backbutton, Modal } from "../components/components";
import { logo } from "../assets/Index";

const Layout = () => {
  const [sidebarStatus, setSidebarStatus] = useState(true);
  // const [ModalStatus, setModalStatus] = useState(false);

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
        {/* <Modal
          title={'Session Expired'}
          imgsrc={logo}
          btnText={'signup / login'}
          Message={' Your session has expired. Please sign up or log in again to continue.'}
          active={ModalStatus}
          onClose={() => setModalStatus(false)}
          toggle={true}
        /> */}
        <Sidebar status={sidebarStatus} updateStatus={setSidebarStatus} />
        <div className="flex-1 w-full md:w-4/5">

          <div
            className="flex flex-col justify-between items-center h-[100vh]  bg-slate-100 overflow-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-col items-center justify-center w-full px-4 pt-28">

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
