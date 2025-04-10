import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Install using: npm install jwt-decode
import Modal from "../components/Modal/Modal"; // Import your modal component
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // React Router navigation
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state

  let logoutTimer; // Store the timeout reference

  // Update auth token and store it in localStorage
  const updateAuthToken = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000; // Convert expiry to milliseconds

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(decoded)); // Store user details
      setAuthToken(token);

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
    setAuthToken(null);
    setShowModal(false);
    dispatch({ type: "user/logout" });
    localStorage.removeItem("auth_token");
    toast.error("Session expired");
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
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, loading }}>
      {children}

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
    </AuthContext.Provider>
  );
};

export default AuthProvider;
