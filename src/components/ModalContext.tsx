import React, { createContext, useContext, useState } from 'react';

type ModalContextType = {
  resetRow: (() => void) | null;
  setResetRow: (fn: (() => void) | null) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [resetRow, setResetRow] = useState<(() => void) | null>(null);

  return (
    <ModalContext.Provider value={{ resetRow, setResetRow }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error('useModalContext must be used within ModalProvider');
  }

  return ctx;
};
