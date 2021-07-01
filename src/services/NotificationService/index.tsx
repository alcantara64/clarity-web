import { toast } from "react-toastify";

class NotificationService {
  static show(
    message = "",
    type = toast.TYPE.DEFAULT,
    position = toast.POSITION.TOP_CENTER,
    autoClose: number = 5000
  ) {
    let defaultOptions = {
      position: position,
      autoClose: autoClose,
    };

    switch (type) {
      case "dark":
        toast.dark(message, defaultOptions);
        break;
      case "error":
        toast.error(message, defaultOptions);
        break;
      case "info":
        toast.info(message, defaultOptions);
        break;
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "warning":
        toast.warn(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
    }
  }
}

export default NotificationService;
