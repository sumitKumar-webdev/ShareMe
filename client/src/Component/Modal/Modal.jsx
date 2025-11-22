import { CopyAllRounded } from "@mui/icons-material";
import { useRef } from "react";

export const Modal = ({
  showModal,
  setShowModal,
  code = "0000",
  showToast,
}) => {
  const codeRef = useRef();

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    if (codeRef.current) {
      const range = document.createRange();
      range.selectNodeContents(codeRef.current);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowModal(false);
      }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-2xl relative animate-scaleIn"
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg md:text-2xl font-bold text-center mb-4">
          Your 4-Digit Code
        </h2>

        <p className="text-gray-600 text-sm md:text-base text-center">
          Share this code with the receiver.
        </p>

        <div className="mt-5 flex justify-center items-center gap-3">
          <div
            ref={codeRef}
            className="text-2xl md:text-4xl px-2 py-3 rounded-lg font-bold tracking-widest bg-gray-100 crounded-lg shadow-inner select-text"
          >
            {parseInt(code)}
          </div>

          <button
            onClick={copyCode}
            className="px-2 py-3 rounded-lg bg-gray-100 hover:bg-gray-300 transition active:scale-90 shadow"
          >
            <CopyAllRounded className="" />
          </button>
        </div>
      </div>

      <style>{`
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
