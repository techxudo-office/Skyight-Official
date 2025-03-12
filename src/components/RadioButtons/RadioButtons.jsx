import React, { useEffect, useMemo, useState } from 'react'

export default function RadioButtons({ options, selectedOption, disabledOptionindex ,value}) {
  const [selected, setSelected] = useState();
  
  return (
    <div className="flex space-x-4">
      {options.map((option, idx) => (
        <label
          key={option}
          className={`flex items-center space-x-2 ${disabledOptionindex?.includes(idx)?'cursor-not-allowed':'cursor-pointer'}`}
        >
          <div
            className={`w-4 h-4 rounded-full border-[1px] border-gray  flex items-center justify-center transition-all ${!disabledOptionindex?.includes(idx) 
                ?((selected === option||value==option)   ? "border-primary":"border-text")
                : "border-background"
              }`}
          >
            {(((selected === option||value==option) ||value==option)  & !disabledOptionindex?.includes(idx) )? 
              <div className="w-2 h-2 bg-primary rounded-full"></div>:''
            }
          </div>
          <span
            className={`text-sm ${!disabledOptionindex?.includes(idx)  ? (((selected === option||value==option) ||value==option) ? "text-primary font-medium" : "text-text"):'text-background'
              }`}
          >
            {option}
          </span>
          <input
            disabled={disabledOptionindex?.includes(idx)}
            type="radio"
            name="trip"
            value={option||value}
            checked={(selected === option||value==option) }
            onChange={() => setSelected(option) & selectedOption(option)}
            className="hidden"
          />
        </label>
      ))}
    </div>
  )
}
