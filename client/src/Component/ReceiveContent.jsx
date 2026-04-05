import React, { useRef } from "react";
import InputField from "./InputField/InputField";
import {
  ArrowRightAlt,
  Check,
  DownloadRounded,
  DownloadForOfflineRounded,
  LockOpenRounded,
} from "@mui/icons-material";
import TextAreaInput from "./TextArea.jsx/TextAreaInput";
import api from "@/utils/apiService";
import { FileCopy } from "@mui/icons-material";
import InfoBox from "./InfoBox.jsx/InfoBox";
import { getIcon } from "@/utils/GetIcons";
import { showToast } from "@/utils/toast";

const ReceiveContent = () => {
  const [shareCode, setShareCode] = React.useState("");
  const [fetchedContent, setFetchedContent] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const textRef = useRef();

  const handleFetch = async () => {
    if (!shareCode) return;
    try {
      const response = await api.post(`/api/get/${shareCode}`);
      setFetchedContent(response.data.data);
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || "Unable to fetch content", "error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFetch();
    }
  };

  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const handleDownloadAll = () => {
    const a = document.createElement("a");
    a.href = `${process.env.NEXT_PUBLIC_BACKEND_API}api/download-all/${shareCode}`;
    a.setAttribute("download", "shareMe-files.zip");
    a.click();
  };

  return (
    <div className="flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-[linear-gradient(180deg,_#ccd0c4_0%,_#c1c5b9_100%)] px-3 py-3 shadow-[0_18px_35px_rgba(69,40,41,0.08)] md:px-6 md:py-4">
      <div className="mb-3 flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0 py-1">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f2ea] text-[#452829] shadow-sm">
              <LockOpenRounded sx={{ fontSize: "1.05rem" }} />
            </div>
            <h2 className="text-2xl font-extrabold tracking-wide text-[#452829] md:text-3xl">
              Receive
            </h2>
          </div>
          <p className="mt-1 text-xs tracking-wide text-gray-700 md:text-sm">
            Enter a share code to view text and download files.
          </p>
        </div>

        <InfoBox
          className="mt-1"
          infoTitle="How it works"
          infoList={[
            "Paste text or add files and click Get Share Code to create one.",
            "Enter the 4-digit code shared by your friend.",
            "The code will be valid for 30 minutes.",
            "Files auto-delete after 24 hours.",
          ]}
        />
      </div>

      <form className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#452829]/8 bg-[linear-gradient(180deg,_#fffdfa_0%,_#ffffff_100%)] p-4 shadow-md md:p-5">
        <div className="grid shrink-0 gap-3">
          <InputField
            label="Enter Your Share Code"
            value={shareCode}
            onChange={(v) => setShareCode(v)}
            placeholder="Enter share code"
            icon={<ArrowRightAlt className="w-7 h-7 text-gray/70 mr-2" />}
            size="small"
            onClick={handleFetch}
            onKeyDown={handleKeyDown}
            maxLength={4}
            pattern="^[0-9]{4}$"
            type="number"
            ariaLabel="Submit"
          />

          <div className="relative">
            <TextAreaInput
              name="text"
              label="Shared Text Content"
              id="sharedText"
              value={fetchedContent?.text || ""}
              placeholder="Shared text will appear here..."
              readOnly
              ref={textRef}
               style={{ rows: 4, maxHeight: 140 }}
            />

            {fetchedContent?.text && (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(fetchedContent.text);
                  if (textRef.current) {
                    textRef.current?.select();
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }
                }}
                className="absolute right-2 top-7 flex cursor-pointer items-center gap-1 rounded-full border border-gray-300 bg-gray-100 px-2.5 py-1 text-xs text-gray-700 transition hover:bg-gray-200 md:right-4 md:top-8"
              >
                {copied ? (
                  <>
                    <Check className="text-gray-600 w-4! h-4!" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <FileCopy className="text-gray-600 w-4! h-4!" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-hidden">
          {!fetchedContent?.files || fetchedContent.files.length === 0 ? (
            <div className="flex h-full min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-[linear-gradient(180deg,_#f7f7f4_0%,_#efefea_100%)] py-6 text-gray-600">
              <DownloadForOfflineRounded
                sx={{ fontSize: "2rem", color: "#7e7a72", marginBottom: "0.4rem" }}
              />
              <span>Shared files will appear here...</span>
            </div>
          ) : (
            <div className="flex h-full min-h-0 flex-col">
              <h3 className="mb-2 font-semibold text-gray-700">Shared Files</h3>

              <div className="thin-themed-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                {fetchedContent.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-[linear-gradient(180deg,_#f6f6f3_0%,_#ecece7_100%)] p-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {getIcon(file.mimetype ?? "")}
                      <span className="truncate text-sm text-gray-700">
                        {file.originalName}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownload(file.url, file.originalName)
                      }
                      title="Download"
                      className="cursor-pointer px-1 py-1 text-sm text-[#452829] transition hover:text-[#3a2223]"
                    >
                      <DownloadRounded />
                    </button>
                  </div>
                ))}
              </div>

              {fetchedContent.files.length > 1 && (
                <button
                  type="button"
                  title="Download All"
                  onClick={handleDownloadAll}
                  className="mt-3 w-full cursor-pointer rounded-3xl bg-[linear-gradient(135deg,_#452829_0%,_#6b4d4e_100%)] py-2.5 font-semibold text-white shadow-[0_10px_18px_rgba(69,40,41,0.18)] transition hover:opacity-95"
                >
                  Download All
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReceiveContent;
