import React from "react";
import { MdCancel } from "react-icons/md";

export default function Modal({
    imgsrc,
    Message,
    title,
    onBtnClick,
    btnText,
    active,
    toggle,
    onClose // Handle closing from parent
}) {
    if (!active) return null; // Hide modal when inactive
    

    return (
        <div className="fixed inset-0 flex items-center justify-center max-md:px-5 bg-black backdrop-blur-sm z-[999] bg-opacity-50">
            {/* Close Button */}
            {toggle && (
                <MdCancel
                    className="absolute bg-white rounded-full text-2xl top-10 right-4 md:right-10 text-redColor cursor-pointer"
                    onClick={onClose} // Use prop-based closing
                />
            )}

            <div className="bg-blue-100 py-5 rounded-2xl shadow-xl w-full max-w-md border-2 border-primary">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img src={imgsrc} alt="logo" className="w-20" />
                </div>

                {/* Message */}
                <h2 className="text-xl font-semibold text-center mb-2 bg-primary text-white py-3">{title}!</h2>
                <p className="text-gray-600 text-center mb-3 md:mb-6 p-4 md:p-7 md:px-16 font-semibold">
                    {Message}
                </p>

                {/* Button */}
                <div className="flex justify-center">
                    <button
                        onClick={onBtnClick}
                        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors capitalize"
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    );
}
