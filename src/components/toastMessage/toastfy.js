import { toast } from "react-toastify";

export default function ToastMessage(message, type, configs = {position: "top-right"}) {
  const toastConfig = {
    position: configs.position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  };

  if (type === "success") return toast.success(message, toastConfig);
  if (type === "error") return toast.error(message, toastConfig);
  if (type === "info") return toast.info(message, toastConfig);
}
