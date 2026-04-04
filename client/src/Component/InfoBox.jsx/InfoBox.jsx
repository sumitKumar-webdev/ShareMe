"use client";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const InfoBox = ({
  buttonContent = "?",
  infoTitle = "",
  infoList = [],
  className = "",
  boxClass = "",
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-[#fffdf9] text-[#5c4a45] shadow-md transition hover:bg-white"
      >
        {buttonContent === "?" ? (
          <InfoOutlinedIcon sx={{ fontSize: "1rem" }} />
        ) : (
          buttonContent
        )}
      </button>

      {showInfo && (
        <div
          className={`absolute right-0 top-full z-50 mt-2 rounded-xl border border-gray-200 bg-[#fffdfa] p-4 text-sm text-gray-700 shadow-xl animate-fade-in md:w-92 ${boxClass}`}
        >
          {infoTitle && (
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <InfoOutlinedIcon sx={{ fontSize: "1rem", color: "#6b4d4e" }} />
              {infoTitle}
            </h3>
          )}
          {Array.isArray(infoList) ? (
            <ul className="list-disc list-inside space-y-2">
              {infoList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{infoList}</p>
          )}

          <button
            onClick={() => setShowInfo(false)}
            className="mt-3 w-full rounded-full bg-[#452829] py-1.5 text-xs text-white transition hover:bg-[#3a2223]"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
