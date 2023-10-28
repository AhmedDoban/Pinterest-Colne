import { toast } from "react-toastify";

const Toast_Handelar = (Type, Message) => {
  Type === "error"
    ? toast.error(Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("theme"),
      })
    : toast.success(Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("theme"),
      });
};
export default Toast_Handelar;
