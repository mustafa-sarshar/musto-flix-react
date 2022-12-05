import { toast } from "react-toastify";

const notifier = ((
  position = "top-right",
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined,
  theme = "dark"
) => {
  const toastDefaultOption = {
    position: position,
    autoClose: autoClose,
    hideProgressBar: hideProgressBar,
    closeOnClick: closeOnClick,
    pauseOnHover: pauseOnHover,
    draggable: draggable,
    progress: progress,
    theme: theme,
    onOpen: null,
    onClose: null,
  };
  const notifyError = (message, toastOptions = toastDefaultOption) => {
    const toastOpt = { ...toastDefaultOption, ...toastOptions };
    return toast.error(message, toastOpt);
  };
  const notifyWarn = (message, toastOptions = { ...toastDefaultOption }) => {
    const toastOpt = { ...toastDefaultOption, ...toastOptions };
    toast.warn(message, toastOpt);
  };
  const notifySuccess = (message, toastOptions = toastDefaultOption) => {
    const toastOpt = { ...toastDefaultOption, ...toastOptions };
    toast.success(message, toastOpt);
  };
  const notifyInfo = (message, toastOptions = toastDefaultOption) => {
    const toastOpt = { ...toastDefaultOption, ...toastOptions };
    toast.info(message, toastOpt);
  };

  return {
    notifyError,
    notifyWarn,
    notifySuccess,
    notifyInfo,
  };
})();

export default notifier;
