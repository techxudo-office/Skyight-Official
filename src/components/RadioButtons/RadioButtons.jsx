import React, { useState } from 'react'

export default function RadioButtons({options,selectedOption}) {
    const [selected, setSelected] = useState(options[0]);
  return (
    <div className="flex space-x-4">
    {options.map((option) => (
      <label
        key={option}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <div
          className={`w-4 h-4 rounded-full border-[1px] border-gray  flex items-center justify-center transition-all ${
            selected === option
              ? "border-primary"
              : "border-gray-400"
          }`}
        >
          {selected === option && (
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          )}
        </div>
        <span
          className={`text-sm ${
            selected === option ? "text-text font-medium" : "text-gray"
          }`}
        >
          {option}
        </span>
        <input
          type="radio"
          name="trip"
          value={option}
          checked={selected === option}
          onChange={() => setSelected(option) & selectedOption(option)}
          className="hidden"
        />
      </label>
    ))}
  </div>
  )
}
