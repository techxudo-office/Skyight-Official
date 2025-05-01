import React from "react";
import AppRoutes from "./routes/routes";
import SessionManager from "./components/SessionManager/SessionManager";

const Main = () => {
  return (
    <>
      <SessionManager />
      <AppRoutes />
    </>
  );
};

export default Main;
