import dayjs from 'dayjs';
import React from 'react'
import { TbArrowsExchange2 } from 'react-icons/tb';
import Slider from 'react-slick'

export default function DateSlider({ className, ref, selectedDate, handleDateSelect, dateOptions, differenceInDates }) {
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
          dots: false
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          dots: false

        },
      },
    ],
  };
  const dateString = "Thu,28 Feb"; // Input date

  // Convert string into a Day.js date
  const parsedDate = dayjs(dateString, "ddd,DD MMM");

  // Add 1 day
  const newDate = parsedDate.add(1, "day");

  // Format the output
  const formattedDate = newDate.format("ddd,DD MMM");

  console.log("formateddat", differenceInDates); // Example: "Thu,29 Feb"

  dateOptions.map((date) => {
    console.log("date1", date)

    console.log("date2", dayjs(date).add(2, "date").format('ddd,DD MMM'))
  })
  return (
    <div ref={ref} className={`${className} date-slider flex justify-between bg-white rounded-md p-3 mb-4`}>
      {dateOptions.map((date, index) => (
        <div key={index} className="px-2">
          <button
            onClick={() => handleDateSelect(date, index)}
            className={`py-2 px-4 flex gap-1 flex-col items-center rounded-lg text-center w-32 ${selectedDate === date
              ? "bg-primary text-white"
              : "bg-gray-200 text-text"
              }`}
          >
            <p>{date}</p>
            {(differenceInDates >0) &&
              <>
                <TbArrowsExchange2 className={`text-xl ${selectedDate === date
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-text"
                  }`} />


                <p>
                  {

                    dayjs(date).add(differenceInDates, "day").format('ddd,DD MMM')}
                </p>
              </>
            }


          </button>
        </div>
      ))}
    </div>

  )
}
