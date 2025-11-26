import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const InputField = ({
  label = "",
  value,
  onChange,
  placeholder = "",
  onKeyDown = () => {},
  icon = null,
  onClick = () => {},
  type = "text",
  fullWidth = true,
  variant = "outlined",
  size = "medium",
  maxLength,
  pattern,
  ariaLabel,
  max,
}) => {
  return (
    <div>
      <label className="block mb-1 font-medium text-xs md:text-base text-gray-700">
        {label}
      </label>

      {/* Remove number input arrows */}
      <style jsx>{`
        input::-webkit-inner-spin-button,
        input::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <TextField
        value={value}
        onChange={(e) => {
          let v = e.target.value;

          // TEXT VALIDATIONS
          if (type === "text") {
            if (maxLength) v = v.slice(0, maxLength);
            v = v.replace(/^\s+/, ""); // remove leading spaces
          }

          // NUMBER VALIDATIONS
          if (type === "number") {
            if (maxLength && v.length > maxLength) return;
            if (v !== "" && !isNaN(Number(v))) v = Number(v);
          }

          if (max !== undefined && Number(v) > max) {
            v = max;
          }

          onChange(v);
        }}
        placeholder={placeholder}
        type={type}
        onKeyDown={onKeyDown}
        fullWidth={fullWidth}
        size={size}
        variant={variant}
        InputProps={{
          endAdornment: icon ? (
            <InputAdornment position="end">
              <IconButton
              aria-label={ariaLabel || "actionButton"}
                onClick={onClick}
                edge="end"
                sx={{
                  padding: 0,
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                {icon}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            transition: "all 0.2s ease-in-out",
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
          },
        }}
      />
    </div>
  );
};

export default InputField;
