import { toast } from "react-toastify";

export const showToast = (
  message,
  type = "success",
  position = "top-right",
  toastId = null,
  isLoading = false
) => {
  const config = {
    position,
    autoClose: isLoading ? false : 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  if (toastId) {
    toast.update(toastId, {
      render: message,
      type,
      isLoading,
      ...config,
    });
    return toastId;
  }

  if (isLoading) {
    return toast.loading(message, config);
  }

  return toast[type] ? toast[type](message, config) : toast(message, config);
};
