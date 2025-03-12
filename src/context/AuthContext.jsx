import React, { createContext, useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { jwtDecode } from "jwt-decode"; // Install using: npm install jwt-decode
import Modal from "../components/Modal/Modal"; // Import your modal component
import { useNavigate } from "react-router-dom";
>>>>>>> Saad/Features

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
<<<<<<< HEAD
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
=======
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate(); // React Router navigation

  let logoutTimer; // Store the timeout reference

  // Update auth token and store it in localStorage
  const updateAuthToken = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000; // Convert expiry to milliseconds

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(decoded)); // Store user details
      setAuthToken(token);
      setUser(decoded);

      // Auto logout when token expires
      const logoutTime = expiryTime - Date.now();
      if (logoutTime > 0) {
        // Show warning modal 1 min before expiry
        setTimeout(() => {
          setShowModal(true);
        }, logoutTime - 60000);

        // Logout when token expires
        logoutTimer = setTimeout(() => {
          handleLogout();
        }, logoutTime);
      }
    } else {
      handleLogout();
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    setShowModal(false);
    navigate("/login"); // Redirect to login page
  };

  // Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000;

      if (Date.now() >= expiryTime) {
        handleLogout(); // Expired -> logout immediately
      } else {
        updateAuthToken(token);
      }
    }
    setLoading(false);

    return () => {
      clearTimeout(logoutTimer); // Cleanup on unmount
    };
>>>>>>> Saad/Features
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, loading }}>
      {children}
<<<<<<< HEAD
=======

      {/* Logout Warning Modal */}
      {showModal && (
        <Modal
          title="Session Expiring"
          Message="Your session is about to expire. You will be logged out soon."
          onBtnClick={handleLogout} // Pass logout function
          btnText="Logout Now"
          active={showModal}
          toggle={true}
          onClose={() => setShowModal(false)} // Close modal on cancel
        />
      )}
>>>>>>> Saad/Features
    </AuthContext.Provider>
  );
};

export default AuthProvider;
