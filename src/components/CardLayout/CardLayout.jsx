import React from 'react';

export const CardLayoutHeader = ({ children, heading, removeBorder, className }) => {
    return (
        <div className={`px-5 ${removeBorder ? 'py-2' : 'border-b py-5'} border-slate-200 ${className}`}>
            {
                heading &&
                <h2 className='text-3xl font-semibold text-text'>{heading}</h2>
            }
            {children}
        </div>
    );
};

export const CardLayoutBody = ({ children, removeBorder, className }) => {
    return (
        <div className={`p-5 ${removeBorder ? '' : 'border-b'} border-slate-200 ${className}`}>
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

export const CardLayoutContainer = ({ children, removeBg, className }) => {
    return (
        <div className={`w-full rounded-3xl ${removeBg ? 'bg-none' : 'bg-white shadow-sm'} ${className}`}>
            {children}
        </div>
    );
};
