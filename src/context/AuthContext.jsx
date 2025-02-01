import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  const updateAuthToken = (token) => {
    if (token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", user);
      setAuthToken(token);
      setUser(user)
    } else {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user")
      localStorage.removeItem("userData")
      setAuthToken(null);
      setUser(null)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user")
    if (token) {
      setAuthToken(token);
      setUser(user)
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
