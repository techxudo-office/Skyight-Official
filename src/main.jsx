import React from "react";
import AppRoutes from "./routes/routes";
import AuthProvider from "./context/AuthContext";
import SessionManager from "./components/SessionManager/SessionManager";

const Main = () => {
  return (
    // <AuthProvider>
    <>
      <SessionManager />
      <AppRoutes />
    </>
    // </AuthProvider>
  );
};

export default Main;
