import React from 'react';

const Button = ({ text, onClick, type = 'button', className = '', styles, disabled,id }) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`w-full py-3 px-6 bg-primary hover:bg-secondary text-white font-semibold rounded-full transition duration-300 ease-in-out transform focus:outline-none ${className}`}
                style={styles}
                id={id}
            >
                {text}
            </button >
        </>
    );
};

export default Button;
