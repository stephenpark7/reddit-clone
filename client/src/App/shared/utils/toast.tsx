import { ToastOptions, toast as toastLib } from 'react-toastify';

export const toast = (message: any, options: ToastOptions<{}> = {}) => {
  const defaultOptions: ToastOptions<{}> = {
    // position: "top-center",
    autoClose: 1500,
    pauseOnHover: false,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  toastLib.success(message, mergedOptions);
};
