import React from 'react'

export default function Tag({ value }) {
    return (
        <p className={`text-xs text-center  md:text-sm w-40 md:w-44 mx-auto  border-[1px]  tracking-tight px-2 py-1  rounded-lg ${value == 'pending' ? 'text-yellowColor border-yellowColor bg-yellowbg' : value == 'requested-cancellation' || value == 'inactive' ? 'text-redColor border-redColor bg-redbg' : 'text-greenColor bg-greenbg border-greenColor'} font-semibold  capitalize`}>
            {value}
        </p>
    )
}
