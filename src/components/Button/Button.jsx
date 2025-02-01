import React from 'react';

const Button = ({ text, onClick, type = 'button', className = '', styles, disabled,id,textColorHover }) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`group  w-fit py-3 px-6 bg-primary hover:bg-secondary text-white font-semibold rounded-full transition duration-300 ease-in-out transform focus:outline-none ${className} `}
                style={styles}
                id={id}
            >
               <span className={` hover:${textColorHover}`}>{text}</span> 
            </button >
        </>
    );
};

export default Button;
