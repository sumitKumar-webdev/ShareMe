"use client";
import React, { useState } from "react";
const InfoBox = ({
  buttonContent = "?",
  infoTitle = "",
  infoList = [],
  className = "",
  boxClass = "",
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={`w-full md:px-4 py-4.5 relative ${className}`}>
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="absolute top-1 right-2 w-7 h-7 flex items-center justify-center 
               bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 
               transition font-bold border border-gray-300"
      >
        {buttonContent}
      </button>

      {showInfo && (
        <div
          className={`absolute top-10 right-4 md:w-92 bg-white text-gray-700 text-sm 
                    p-4 rounded-lg shadow-xl border border-gray-200 animate-fade-in z-50 ${boxClass}`}
        >
          {infoTitle && (
            <h3 className="font-semibold mb-2 text-gray-900">{infoTitle}</h3>
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
            className="mt-3 w-full py-1 rounded bg-gray-800 text-white text-xs hover:bg-black transition"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
