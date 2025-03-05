import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { routesData } from "../data/routesData";

const AppRoutes = () => {
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData, "userData"); // Debugging

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
                    child.protected && !userData ? (
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
              route.protected && !userData ? (
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
