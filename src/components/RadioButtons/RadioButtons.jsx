import React from 'react';

export default function RadioButtons({
  options,
  value,
  name,
  onChange,
  disabledOptions = []
}) {

  return (
    <div className="flex space-x-4">
      {options.map((option, idx) => {
        const isDisabled = disabledOptions.includes(idx);
        const isSelected = value === option;

        return (
          <label
            key={option}
            className={`flex items-center space-x-2 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-[1px] flex items-center justify-center transition-all ${isDisabled
                ? "border-background"
                : isSelected
                  ? "border-primary"
                  : "border-text"
                }`}
            >
              {isSelected && !isDisabled && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
            <span
              className={`text-sm ${isDisabled
                ? "text-background"
                : isSelected
                  ? "text-primary font-medium"
                  : "text-text"
                }`}
            >
              {option}
            </span>
            <input
              disabled={isDisabled}
              type="radio"
              name={name}
              value={option}
              checked={isSelected}
              onChange={() => !isDisabled && onChange(option)}
              className="hidden"
            />
          </label>
        );
      })}
    </div>
  );
}