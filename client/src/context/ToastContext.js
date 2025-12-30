import React, { createContext, useContext } from 'react';

const ToastContext = createContext({
  success: (msg) => console.log('SUCCESS:', msg),
  error: (msg) => console.error('ERROR:', msg),
});

export const ToastProvider = ({ children }) => {
  const success = (message) => console.log('SUCCESS:', message);
  const error = (message) => console.error('ERROR:', message);

  return <ToastContext.Provider value={{ success, error }}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);

