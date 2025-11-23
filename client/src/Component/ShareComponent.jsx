import React from "react";
import { useCallback, useState } from "react";
import api from "@/utils/apiService";
import { showToast } from "@/utils/toast";
import TextAreaInput from "./TextArea.jsx/TextAreaInput";
import { UploadBox } from "@/Component/UploadBox/uploadBox";
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

    try {
      setLoading(true);

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
        showToast("Uploaded successfully", "success");
        setGeneratedCode(response.data.key);
        setFormData({});
        setShowModal(true);
      }
    } catch (error) {
      showToast("Error in uploading", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden md:w-1/2 bg-[#DEDED1] px-3 md:px-8 py-4 h-auto">
      <h1 className="text-2xl md:text-4xl font-extrabold text-[#452829] tracking-wide">
        ShareMe
      </h1>
      <div>
        <p className="text-gray-700 text-xs md:text-sm tracking-wide">
          Share text & files instantly. Secure and easy.
        </p>
      </div>

      <div className="relative py-4 mt-4 md:mt-0 text-center flex items-center justify-center">
        <span className="relative px-4 py-1 text-xl md:text-2xl font-semibold text-[#452829] tracking-wide rounded-lg">
          Share Content
        </span>
        {generatedCode && (
          <span className="md:text-xl px-2 py-1 absolute -right-2 md:right-10 border rounded-lg font-bold tracking-widest bg-gray-100 shadow-inner select-text">
            {parseInt(generatedCode)}
          </span>
        )}
      </div>

      <form
        className="bg-white w-full p-4 md:p-6 rounded-lg shadow-md space-y-3"
        onSubmit={handleSubmit}
      >
        <TextAreaInput
          name="text"
          label="Enter Text to Share"
          placeholder="Write something..."
          formData={formData}
          handleChange={handleChange}
          onKeyDown={(e) => {
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 20,
            backgroundColor: "#452829",
            color: "white",
            fontSize: { xs: "12px", md: "16px" },
            textTransform: "none",
            mt: 1.2,
            ":hover": {
              backgroundColor: "#452829",
            },
            "&.Mui-disabled": {
              backgroundColor: "#452829aa",
              color: "#ffffffcc",
            },
          }}
          fullWidth
          disabled={
            !formData.text && (!formData.files || formData.files.length === 0)
          }
          className="cursor-pointer"
        >
          {loading ? (
            <>
              <CircularProgress
                size="1.2rem"
                color="white"
                sx={{ mr: 1, fontWeight: "bold" }}
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
