import React from "react";
import { useCallback, useState } from "react";
import api from "@/utils/apiService";
import { showToast } from "@/utils/toast";
import TextAreaInput from "./TextArea.jsx/TextAreaInput";
import { UploadBox } from "@/Component/UploadBox/uploadBox";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { Button, CircularProgress } from "@mui/material";
import { Modal } from "./Modal/Modal";

const ShareComponent = () => {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    let loadingToastId = null;
    let slowUploadTimer = null;

    try {
      setLoading(true);
      loadingToastId = showToast(
        "Uploading...",
        "default",
        "top-center",
        null,
        true
      );

      slowUploadTimer = setTimeout(() => {
        showToast(
          "Sharing is taking a bit longer because this is on the free tier. Please wait a few seconds.",
          "info",
          "top-center"
        );
      }, 5000);

      const fd = new FormData();
      if (formData.text) fd.append("text", formData.text);

      if (formData.files && formData.files.length > 0) {
        formData.files.forEach((file) => {
          fd.append("files", file);
        });
      }

      const response = await api.post("/api/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        showToast(
          "Uploaded successfully",
          "success",
          "top-center",
          loadingToastId,
          false
        );
        setGeneratedCode(response.data.key);
        setFormData({});
        setShowModal(true);
      }
    } catch (error) {
      showToast(
        "Error in uploading",
        "error",
        "top-center",
        loadingToastId,
        false
      );
    } finally {
      if (slowUploadTimer) {
        clearTimeout(slowUploadTimer);
      }

      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-[linear-gradient(180deg,_#e7e6da_0%,_#d9d9cc_100%)] px-3 py-3 shadow-[0_18px_35px_rgba(69,40,41,0.08)] md:px-6 md:py-4">
      <header aria-labelledby="share-title" className="mb-3 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 py-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f2ea] text-[#452829] shadow-sm">
                <SendRoundedIcon sx={{ fontSize: "1.05rem" }} />
              </div>
              <h2
                id="share-title"
                className="text-2xl font-extrabold tracking-wide text-[#452829] md:text-3xl"
              >
                Share
              </h2>
            </div>
            <p className="mt-1 text-xs tracking-wide text-gray-700 md:text-sm">
              Enter text or upload files to generate a 4-digit share code.
            </p>
          </div>

          {generatedCode && (
            <div className="rounded-xl border border-[#452829]/10 bg-white/75 px-3 py-2 text-center shadow-inner">
              <p className="flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6e5852]">
                <KeyRoundedIcon sx={{ fontSize: "0.8rem" }} />
                Code
              </p>
              <p className="text-lg font-bold tracking-[0.28em] text-[#452829] md:text-xl">
                {String(parseInt(generatedCode, 10)).padStart(4, "0")}
              </p>
            </div>
          )}
        </div>
      </header>

      <form
        className="flex min-h-0 flex-1 flex-col rounded-xl border border-[#452829]/8 bg-[linear-gradient(180deg,_#fffdfa_0%,_#ffffff_100%)] p-4 shadow-md md:p-5"
        onSubmit={handleSubmit}
      >
        <div className="grid min-h-0 flex-1 gap-3">
          <TextAreaInput
            name="text"
            label="Enter Text to Share"
            placeholder="Write something..."
            formData={formData}
            handleChange={handleChange}
            style={{ rows: 4 }}
            onkeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <UploadBox
            name="files"
            label="Upload Files"
            limit={5}
            formData={formData}
            handleChange={handleChange}
            disableRemove={loading}
            removeDisabledMessage="Please wait for sharing to finish before changing the selected files."
            onkeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 20,
            background: "linear-gradient(135deg, #452829 0%, #6b4d4e 100%)",
            color: "white",
            fontSize: { xs: "12px", md: "15px" },
            fontWeight: 700,
            textTransform: "none",
            mt: 2,
            minHeight: 44,
            boxShadow: "0 10px 18px rgba(69,40,41,0.18)",
            ":hover": {
              background: "linear-gradient(135deg, #3b2223 0%, #5d4344 100%)",
            },
            "&.Mui-disabled": {
              backgroundColor: "#452829aa",
              color: "#ffffffcc",
            },
          }}
          fullWidth
          disabled={
            loading ||
            (!formData.text && (!formData.files || formData.files.length === 0))
          }
          className="cursor-pointer"
        >
          {loading ? (
            <>
              <CircularProgress
                size="1.1rem"
                sx={{ mr: 1, color: "white", fontWeight: "bold" }}
              />
              <span>Please wait...</span>
            </>
          ) : (
            "Get Share Code"
          )}
        </Button>
      </form>

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          code={generatedCode}
          showToast={showToast}
        />
      )}
    </div>
  );
};

export default ShareComponent;
