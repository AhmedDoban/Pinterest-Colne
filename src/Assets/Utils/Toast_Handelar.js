import { toast } from "react-toastify";

const Toast_Handelar = (Type, Message) => {
  const Seting = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: localStorage.getItem("theme"),
  };

  Type === "error"
    ? toast.error(Message, Seting)
    : Type === "success"
    ? toast.success(Message, Seting)
    : toast.info(Message, Seting);
};
export default Toast_Handelar;
