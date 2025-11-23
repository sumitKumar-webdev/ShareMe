import React, { useRef } from "react";
import InputField from "./InputField/InputField";
import {
  ArrowRightAlt,
  Check,
  Download,
  DownloadRounded,
  DownloadSharp,
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
      showToast(error.response.data.message, "error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFetch();
    }
  };
  const handleDownload = (url, fileName) => {
    const a = document.createElement("a");
    a.href = `${url.replace("/upload/", "/upload/fl_attachment/")}`;
    a.setAttribute("download", fileName);
    a.click();
  };

  const handleDownloadAll = async () => {
    if (!fetchedContent?.files) return;

    for (const file of fetchedContent.files) {
      const originalName = file.originalName;
      const cleanName = encodeURIComponent(originalName.split(".")[0]);

      const downloadUrl = file.url.replace(
        "/upload/",
        `/upload/fl_attachment:${cleanName}/`
      );

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.setAttribute("download", originalName);

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      await new Promise((res) => setTimeout(res, 200));
    }
  };
  return (
    <div className="w-full max-w-full overflow-x-hidden md:w-1/2 bg-[#C5C7BC] px-3 md:px-8 py-4 h-auto">
      <InfoBox
        infoTitle="How it works"
        infoList={[
          "Paste text or add Files and click *Get Share Code* to get Code.",
          "Enter a 4-digit code shared by your friend.",
          "The code will be valid for 30 minutes.",
          "Files auto-delete after 24 hours.",
        ]}
      />

      <div className="md:h-7" />
      <div className="relative py-4 text-center">
        <span className="relative px-4 py-1 text-xl md:text-2xl font-semibold text-[#452829] tracking-wide rounded-lg">
          Receive Content
        </span>
      </div>

      <form
        action=""
        className="bg-white w-full p-4 md:p-6 rounded-lg shadow-md space-y-3 overflow-x-hidden"
      >
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
          pattren="^[0-9]{4}$"
          type="number"
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
              className="absolute top-6 md:top-8 right-2 md:right-4
 px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-xs flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <div className="flex justify-center items-center gap-1">
                  <Check className="text-gray-600 w-4! h-4! group-hover:text-black transition" />
                  <span className="text-gray-700 text-xs group-hover:text-black transition">
                    Copied
                  </span>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-1">
                  <FileCopy className="text-gray-600 w-4! h-4! group-hover:text-black transition" />
                  <span className="text-gray-700 text-xs group-hover:text-black transition">
                    Copy
                  </span>
                </div>
              )}
            </button>
          )}
        </div>

        <div className="mt-4">
          {!fetchedContent?.files || fetchedContent.files.length === 0 ? (
            <div className="w-full min-h-55 bg-gray-100 text-gray-500 flex justify-center items-center py-6 rounded-lg border border-dashed border-gray-300">
              Shared files will appear here...
            </div>
          ) : (
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Shared Files</h3>

              <div className="space-y-3">
                {fetchedContent.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(file.mimetype ?? "")}
                      <span className="text-gray-700 text-sm">
                        {file.originalName}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownload(file.url, file.originalName)
                      }
                      title="Download"
                      className="px-1 py-1 text-sm text-[#452829] hover:text-[#3a2223] transition cursor-pointer"
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
                  className="mt-4 w-full py-2 bg-[#452829] text-white rounded-3xl font-semibold hover:bg-[#3a2223] transition cursor-pointer"
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
