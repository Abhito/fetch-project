import { createContext, useContext, useState, ReactNode } from 'react';

const ErrorContext = createContext<{
  error: string;
  open: boolean;
  setErrorMessage: (error: string) => void;
  clearError: () => void;
}>({} as any);

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const setErrorMessage = (newError: string) => {
    setError(newError);
    setOpen(true);
  };

  const clearError = () => {
    setOpen(false);
    setTimeout(() => setError(''), 10);
  };

  return (
    <ErrorContext.Provider value={{ error, open, setErrorMessage, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};
