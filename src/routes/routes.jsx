import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { routesData } from "../data/routesData";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { authToken, loading } = useContext(AuthContext);

  if (loading) {
    return null; 
  }

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const AppRoutes = () => {
  return (
   
      <Routes>
        {routesData.map((route, index) => {
          if (route.children) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute element={route.element} />
                  ) : (
                    route.element
                  )
                }
              >
                {route.children.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    index={child.index}
                    path={child.path}
                    element={
                      child.protected ? (
                        <ProtectedRoute element={child.element} />
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
                route.protected ? (
                  <ProtectedRoute element={route.element} />
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
