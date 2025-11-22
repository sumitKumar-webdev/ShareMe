"use client";
import React, { useState } from "react";
import { showToast } from "@/utils/toast";

import {
  CloudUpload,
  Cancel,
  PictureAsPdf,
  Image,
  VideoFile,
  MusicVideo,
  FileCopy,
} from "@mui/icons-material";
import { getIcon } from "@/utils/GetIcons";

export const UploadBox = ({
  name,
  label,
  i,
  limit = 5,
  formData = {},
  handleChange,
  onkeyDown,
  style = {},
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const files = formData[name] || [];
  const handleUpload = (newFiles) => {
    const combined = [...files, ...newFiles];
    const uniqueFiles = Array.from(
      new Map(combined.map((f) => [f.name, f])).values()
    );
    if (uniqueFiles.length > limit) {
      showToast(`Only ${limit} files allowed`, "warning");
      return uniqueFiles.slice(0, limit);
    }
    return uniqueFiles;
  };

  return (
    <div key={i} className="col-span-1 sm:col-span-2">
      <label className="block mb-1 font-medium text-xs md:text-base text-gray-700">{label}</label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const newFiles = handleUpload(e.dataTransfer.files);
          if (newFiles) handleChange(name, newFiles);
        }}
        className={`
          border-2 h-30 md:h-55 border-dashed rounded-lg p-6 flex justify-center items-center cursor-pointer 
          transition-all
          ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-gray-400 hover:border-blue-500 hover:text-blue-500  hover:bg-blue-50"
          }
          ${style.className || ""}
        `}
      >
        <input
          type="file"
          accept="*"
          id={`file-upload-${name}`}
          className="hidden"
          multiple
          disabled={files.length >= limit}
          onChange={(e) => {
            const newFiles = handleUpload(Array.from(e.target.files));
            if (newFiles) handleChange(name, newFiles);
          }}
          onKeyDown={onkeyDown}
        />

        <label
          htmlFor={`file-upload-${name}`}
          className={`
      flex flex-col items-center text-center transition-all
    `}
        >
          {!isDragOver ? (
            <div className="flex flex-col items-center cursor-pointer">
              <CloudUpload sx={{fontSize:{md:"3rem"}}} />
              <span className="mt-2 font-medium text-xs md:text-base">
                Upload up to {limit} files or drag and drop
              </span>
              <span className="text-[0.7rem] md:text-xs">
                PDF, DOCX, PNG, JPG (max 10MB each)
              </span>
            </div>
          ) : (
            <span className="mt-2 text-blue-600 font-semibold text-lg">
              Release your files here
            </span>
          )}
        </label>
      </div>

      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((file, index) => (
            <li
              key={index}
              className="text-sm flex items-center justify-between bg-gray-100 px-3 py-1 rounded"
            >
              <div className="flex justify-center items-center">
                <span className="mr-2">{getIcon(file.type)}</span>
                <span className="block w-70 truncate">{file.name}</span>
              </div>

              <Cancel
                onClick={() =>
                  handleChange(
                    name,
                    files.filter((_, i) => i !== index)
                  )
                }
                className="cursor-pointer text-red-500"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
