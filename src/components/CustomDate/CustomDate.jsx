import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomDate = ({
    id,
    label,
    name,
    value,
    onChange,
    disabled,
    isSelected,
    pastDate = true,
    futureDate = true,
    isTimePicker // Toggle between DatePicker and DateTimePicker
}) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(isSelected)
        return () => {
            setIsOpen(false)
        }
        setIsOpen(isSelected || false)
    }, [isSelected])

    console.log(isOpen, "isopen")
    const handleDateChange = (newValue) => {
        if (onChange) {
            const event = {
                target: {
                    name: name,
                    value: newValue ? dayjs(newValue).format(isTimePicker ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD') : "",
                },
            };
            onChange(event);
            setIsOpen(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {isTimePicker ? (
                <DateTimePicker
                    id={id}
                    autoFocus={isSelected}
                    className="w-full"
                    disabled={disabled}
                    label={label}
                    value={value ? dayjs(value) : null}
                    onChange={handleDateChange}
                    minDate={!pastDate ? dayjs() : null}
                    maxDate={!futureDate ? dayjs() : null}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            padding: "6px 12px",
                            backgroundColor: "#fff",
                            color: '#49454f',
                            width: "100%",
                            borderRadius: "8px",
                            "& fieldset": { borderColor: "#6B7280" },
                            "&:hover fieldset": { borderColor: "#6B7280" },
                            "&.Mui-focused fieldset": { borderColor: "#3B82F7" },
                        },
                        "& .MuiInputLabel-root": { color: "#6B7280", fontSize: "16px" },
                    }}
                />
            ) : (
                <DatePicker
                    id={id}
                    className="w-full"
                    disabled={disabled}
                    // open={isOpen}
                    // onOpen={() => setIsOpen(true)}  // Open on click
                    // onClose={() => setIsOpen(false)}
                    label={label}
                    value={value ? dayjs(value) : null}
                    onChange={handleDateChange}
                    minDate={(pastDate || pastDate == null) ? null : dayjs()}
                    maxDate={(futureDate || futureDate == null) ? null : dayjs()}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            padding: "6px 12px",
                            backgroundColor: "#fff",
                            color: '#49454f',
                            width: "100%",
                            borderRadius: "8px",
                            "& fieldset": { borderColor: "#6B7280" },
                            "&:hover fieldset": { borderColor: "#6B7280" },
                            "&.Mui-focused fieldset": { borderColor: "#3B82F7" },
                        },
                        "& .MuiInputLabel-root": { color: "#6B7280", fontSize: "16px" },
                    }}
                />
            )}
        </LocalizationProvider>
    );
};

export default CustomDate;
