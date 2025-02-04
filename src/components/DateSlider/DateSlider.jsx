import React from 'react'

export default function DateSlider({className,ref,selectedDate,handleDateSelect,dateOptions}) {
  return (
    <div ref={ref} className={`${className} date-slider flex justify-between bg-white rounded-md p-3 mb-4`}>
    {dateOptions.map((date, index) => (
      <div key={index} className="px-2">
        <button
          onClick={() => handleDateSelect(date, index)}
          className={`py-2 px-4 rounded-lg text-center ${selectedDate === date
            ? "bg-primary text-white"
            : "bg-gray-200 text-text"
            }`}
        >
          {date}
        </button>
      </div>
    ))}
  </div>
  )
}
