import React from 'react';

const statusClasses = {
  pending: 'text-yellowColor border-yellowColor bg-yellowbg',
  'requested-cancellation': 'text-redColor border-redColor bg-redbg',
  inactive: 'text-redColor border-redColor bg-redbg',
};

export default function Tag({ value }) {
  const defaultClass = 'text-greenColor bg-greenbg border-greenColor';

  return (
    <p
      className={`text-xs text-center md:text-sm w-40 md:w-44 mx-auto border-[1px] tracking-tight px-2 py-1 rounded-lg 
        ${statusClasses[value] || defaultClass} font-semibold capitalize`}
    >
      {value}
    </p>
  );
}
