import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const updateAuthToken = (token) => {
    if (token) {
      localStorage.setItem("auth_token", token);
      setAuthToken(token);
    } else {
      localStorage.removeItem("auth_token");
      setAuthToken(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) setAuthToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
