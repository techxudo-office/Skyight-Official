import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar, Header } from "../components/components";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const [sidebarStatus, setSidebarStatus] = useState(true);
  // const [headline, setHeadline] = useState(true);
  const { userData } = useSelector((state) => state.auth);

  const setSidebarStatusHandler = (status) => {
    setSidebarStatus(status);
  };

  if (!userData?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {/* <Headline status={headline} setStatus={setHeadline} text={"dsdsadmdowjewndkn"} /> */}

      <Header
        sidebarStatus={sidebarStatus}
        setSidebarStatusHandler={setSidebarStatusHandler}
      />
      <div className="flex h-screen">
        <Sidebar status={sidebarStatus} updateStatus={setSidebarStatus} />
        <div className="flex-1 w-full md:w-4/5">
          <div
            className="flex flex-col justify-between items-center h-[100vh] bg-slate-100 overflow-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-col items-center justify-center w-full px-4 pt-28">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
