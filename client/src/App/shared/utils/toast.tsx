import { ToastOptions, toast as toastLib } from 'react-toastify';

export const toast = (message: any, options: ToastOptions<{}> = {}) => {
  const defaultOptions: ToastOptions<{}> = {
    // position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  toastLib.success(message, mergedOptions);
};
