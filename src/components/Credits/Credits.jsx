import React, { useState } from 'react';
import { TfiReload } from "react-icons/tfi";
import { FaCaretDown } from "react-icons/fa";
import { BsCreditCard2Back } from "react-icons/bs";
import { AiFillWallet } from "react-icons/ai";

import { RiExchangeDollarLine } from "react-icons/ri";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaCreditCard } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

// Wallet data (moved to the top for better organization)
const walletData = [
    {
        icon: <BsCreditCard2Back />,
        primaryText: "PKR 63,5554.",
        secondaryText: "Available Limit",
    },
    {
        icon: <AiFillWallet />,
        primaryText: "PKR -89,000.5",
        secondaryText: "Total Payable Amount",
    },
    {
        icon: <FaCreditCard />,
        primaryText: "PKR 1",
        secondaryText: "Permanent Credit Limit",
    },
    {
        icon: <RiExchangeDollarLine />,
        primaryText: "PKR 0",
        secondaryText: "Temporary Credit Limit",
    },
    {
        icon: <GiCommercialAirplane />,
        primaryText: "PKR 0",
        secondaryText: "Temporary Credit Limit",
    },
];

// Reusable ListItem component
const ListItem = ({ Icon, primaryText, secondaryText }) => (
    <div className='flex flex-row items-center border-b-1 border-gray-200 gap-3 my-1 px-2 py-1 mx-2'>
        <div className='flex items-center justify-center'>
            {Icon && <Icon size={20} />}
        </div>
        <div className='flex flex-col items-start px-1'>
            <p className='text-[13px] font-bold'>{primaryText}</p>
            <p className='text-[10px] leading-none'>{secondaryText}</p>
        </div>
    </div>
);

// Main WalletButton component
const Credits = ({ credits,onClick }) => {
    const [walletDown, setWalletDown] = useState(false);

    const toggleDown = () => {
        setWalletDown(!walletDown);
    };

    return (
        <div onClick={onClick}>
            <button
                className='relative p-2 mx-2 border-1 w-[180px] h-[45px]   border-[#0FB07B] rounded-sm'
            >
                <div className='flex  font-bold text-[#0FB07B] items-center gap-3 '>
                    <TfiReload size={15} />
                    <p className='text-sm'>{credits}</p>
                    <FaCaretDown
                        onClick={toggleDown}
                        className={`transition-transform duration-300 ${walletDown ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            {walletDown && (
                <div className='absolute right-20 mt-2 w-[280px] rounded-2xl bg-[#F7F7F7] border-gray-400 shadow-lg'>
                    <div className='flex flex-col items-center justify-center gap-2 my-2'>
                        <div className='flex flex-col items-center text-gray-700 relative'>
                            <p className='font-bold'>{credits}</p>
                            <p className='text-[10px]'>Net Available Limit</p>

                            <div className='my-4'>
                                <button className='w-[55px] text-[#0FB07B] bg-gray-100 border h-[30px] rounded-lg text-sm'>Active</button>
                            </div>
                        </div>
                        <div className='w-[250px] bg-white rounded-2xl max-h-[250px] overflow-y-scroll scrollbar-hidden'>
                            <div className='flex flex-col text-gray-700'>
                                {/* Dynamically render list items */}
                                {walletData.map((item, index) => (
                                    <div className='flex flex-row items-center border-b-1 border-gray-200 gap-3 my-1 px-2 py-1 mx-2'>
                                        <div className='flex items-center justify-center'>
                                            {item.icon}
                                        </div>
                                        <div className='flex flex-col items-start px-1'>
                                            <p className='text-[13px] font-bold'>{item.primaryText}</p>
                                            <p className='text-[10px] leading-none'>{item.secondaryText}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Credits;