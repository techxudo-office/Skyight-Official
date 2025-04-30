import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

export default function Headline({ status, setStatus, text }) {
    return (
        <div className={`py-2 px-3 bg-primary z-[999] ${status ? "mt-0" : "-mt-10"
            } sticky top-0 text-white flex justify-between items-center font-semibold text-base w-full transition-transform duration-300`}>
            {/* Marquee Container */}
            <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap w-fit">
                    {text}
                </div>
            </div>

            <MdOutlineCancel
                onClick={() => setStatus(false)}
                className='text-red-600 rounded-full text-xl flex-shrink-0 ml-2 hover:scale-110 transition-transform'
            />

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 15s linear infinite;
                    display: inline-block;
                }
            `}</style>
        </div>
    )
}