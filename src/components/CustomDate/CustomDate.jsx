import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
    pastDate
}) => {
    const handleDateChange = (newValue) => {
        if (onChange) {
            // Create a synthetic event to mimic `e.target.value`
            const event = {
                target: {
                    name: name,
                    value: newValue ? dayjs(newValue).format('YYYY-MM-DD') : "",
                },
            };
            onChange(event); // Pass the synthetic event to parent
        }
    };

    const [open, setOpen] = useState(false); // Track the open state of the calendar

    // Effect to synchronize isSelected prop with internal state
    useEffect(() => {
        if (!disabled) {
            setOpen(true); // Open the date picker if isSelected is true
        }
    }, [isSelected]);

    const handleInputClick = () => {
        if (!disabled) {
            setOpen(true);  // Open the calendar when the input field is clicked
        }
    };

    const handleClose = () => {
        setOpen(false); // Close the calendar
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                id={id}
                className="w-full"
                disabled={disabled}
                label={label}
                autoFocus={open}
                value={value ?  dayjs(value) : null} // Convert value to dayjs
                onChange={handleDateChange} // Corrected onChange
                minDate={!pastDate? dayjs():null} // Prevent past dates
                // open={open} // Controlled by the state and isSelected prop
                // onClose={handleClose} // Close the calendar when done
                // onInputClick={handleInputClick} // Open calendar on input click
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
        </LocalizationProvider>
    );
};

export default CustomDate;
