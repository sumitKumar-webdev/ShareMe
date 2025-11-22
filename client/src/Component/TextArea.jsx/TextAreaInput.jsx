import React from "react";

const TextAreaInput = ({
  name,
  label,
  placeholder = "",
  i,
  formData,
  handleChange,
  value,
  onkeyDown,
  readOnly = false,
  style = {},
  id,
  ref,
}) => {
  return (
    <div key={i} className="col-span-1 sm:col-span-2">
      <label className="block mb-1 font-medium text-xs md:text-base text-gray-700">{label}</label>
      <textarea
        id={id}
        ref={ref}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value || formData?.[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        // onBlur={handleBlur(field)}
        rows={style.rows || 5}
        onKeyDown={onkeyDown}
        className="lg:min-h-[100px] min-h-[50px] border border-gray-300 rounded-lg p-2 w-full hover:border-black focus:border-blue-600 outline-none"
      />
    </div>
  );
};

export default TextAreaInput;
