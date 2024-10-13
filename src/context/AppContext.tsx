import { createContext, ReactNode, useContext } from 'react';

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  testText: string;
};

const AppContext = createContext({} as AppContextProps);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('Context must be used within an AppContextContainer');
  }

  return context;
};

export const AppContextContainer = ({ children }: Props) => {
  const testText = 'Test';

  return (
    <AppContext.Provider
      value={{
        testText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
