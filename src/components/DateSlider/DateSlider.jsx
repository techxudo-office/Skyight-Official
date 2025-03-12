import React, { forwardRef } from "react";
import dayjs from "dayjs";
import { TbArrowsExchange2 } from "react-icons/tb";

const DateSlider = forwardRef(
  (
    {
      className,
      selectedDate,
      handleDateSelect,
      dateOptions,
      differenceInDates,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${className} date-slider flex justify-between bg-white rounded-md p-3 mb-4`}>
        {dateOptions.map((date, index) => (
          <div key={index} className="px-2">
            <button
              onClick={() => handleDateSelect(date, index)}
              className={`py-2 px-4 flex gap-1 flex-col items-center rounded-lg text-center w-32 ${
                selectedDate === date
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-text"
              }`}>
              <p>{date}</p>
              {differenceInDates > 0 && (
                <>
                  <TbArrowsExchange2
                    className={`text-xl ${
                      selectedDate === date
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-text"
                    }`}
                  />
                  <p>
                    {dayjs(date, "ddd, DD MMM", "en")
                      .add(differenceInDates, "day")
                      .format(`ddd, DD MMM`)}
                  </p>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    );
  }
);

export default DateSlider;
