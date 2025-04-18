import React, { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { routesData } from "../data/routesData";
import toast from "react-hot-toast";

const AppRoutes = () => {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth_token");

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!auth) {
      // if (!isInitialRender.current) {
        toast.success("Logged out successfully");
        navigate("/login", { replace: true });
      // } else {
      //   isInitialRender.current = false;
      // }
    }
  }, [auth]);

  return (
    <Routes>
      {routesData.map((route, index) => {
        if (route.children) {
          return (
            <Route key={index} path={route.path} element={route.element}>
              {route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  index={child.index}
                  path={child.path}
                  element={
                    child.protected && !userData?.token ? (
                      <Navigate to="/login" replace />
                    ) : (
                      child.element
                    )
                  }
                />
              ))}
            </Route>
          );
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected && !userData?.token ? (
                <Navigate to="/login" replace />
              ) : (
                route.element
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
