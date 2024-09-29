import React from "react";
import useEscapeKey from "../../hooks/use-escape-key";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    // {
    //   id: crypto.randomUUID(),
    //   message: "Oh no!",
    //   variant: "error",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   message: "Logges in",
    //   variant: "success",
    // },
  ]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);
  useEscapeKey('Escape', handleEscape);
  // useEscapeKey('Space', handleEscape);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      { id: crypto.randomUUID(), message: message, variant: variant },
    ];
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
