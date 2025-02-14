import React from 'react'
import Slider from 'react-slick'

export default function DateSlider({className,ref,selectedDate,handleDateSelect,dateOptions}) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
          
          {
            breakpoint: 768, // Tablets
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplaySpeed: 2500, // Adjust speed for smaller screens
              dots:false
            },
          },
          {
            breakpoint: 480, // Mobile devices
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplaySpeed: 3000,
              dots:false
    
            },
          },
        ],
      };
  return (
    <div ref={ref} className={`${className} date-slider flex justify-between bg-white rounded-md p-3 mb-4`}>
    {dateOptions.map((date, index) => (
      <div key={index} className="px-2">
        <button
          onClick={() => handleDateSelect(date, index)}
          className={`py-2 px-4 rounded-lg text-center w-32 ${selectedDate === date
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
