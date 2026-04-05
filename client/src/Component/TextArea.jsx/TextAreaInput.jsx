import React from "react";

const TextAreaInput = React.forwardRef(function TextAreaInput(
  {
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
  },
  forwardedRef
) {
  const innerRef = React.useRef(null);
  const textValue = value ?? formData?.[name] ?? "";
  const maxHeight = style.maxHeight ?? 220;

  React.useImperativeHandle(forwardedRef, () => innerRef.current);

  React.useLayoutEffect(() => {
    const textarea = innerRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [textValue, maxHeight]);

  return (
    <div key={i} className="col-span-1 sm:col-span-2">
      <label className="mb-1 block text-xs font-medium text-gray-700 md:text-base">
        {label}
      </label>
      <textarea
        id={id}
        ref={innerRef}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        value={textValue}
        onChange={(e) => handleChange?.(name, e.target.value)}
        rows={style.rows || 5}
        onKeyDown={onkeyDown}
        className="thin-themed-scrollbar min-h-[50px] w-full rounded-lg border border-gray-300 p-2 outline-none transition hover:border-black focus:border-blue-600 md:min-h-[96px] resize-none"
      />
    </div>
  );
});

export default TextAreaInput;
