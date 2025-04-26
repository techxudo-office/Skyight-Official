import React from "react";
import { motion } from "framer-motion";

export const CardLayoutHeader = ({
  children,
  heading,
  removeBorder,
  className,
}) => {
  return (
    <div
      className={`px-5 ${removeBorder ? "py-2" : "border-b py-5"
        } border-slate-200 ${className || "text-text"}`}
    >
      {heading && (
        <h2 className="text-3xl font-semibold">{heading}</h2>
      )}
      {children}
    </div>
  );
};

export const CardLayoutBody = ({ children, removeBorder, className, padding }) => {
  return (
    <div
      className={`${padding ? padding : "p-5"} ${removeBorder ? "" : "border-b"
        } border-slate-200 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardLayoutFooter = ({ children, className }) => {
  return (
    <div className={`p-3 flex items-center justify-end ${className}`}>
      {children}
    </div>
  );
};

export const CardLayoutContainer = ({
  children,
  removeBg,
  className,
  isVisible,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      //   animate={{ opacity: isVisible ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
      }}
    >
      <div
        className={`w-full rounded-lg ${removeBg ? "bg-none" : " shadow-sm"
          } ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
};
