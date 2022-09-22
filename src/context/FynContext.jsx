import React from 'react';

export const FynContext = React.createContext({});

export default function FynContextProvider({ children }) {
  const [provider, setProvider] = React.useState();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [currentSessionInfo, setCurrentSessionInfo] = React.useState({});
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [hatchModalOpen, setHatchModalOpen] = React.useState(false);
  const [loggedin, setLoggedIn] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [buddyInfo, setBuddyInfo] = React.useState({});
  const [buddyModalOpen, setBuddyModalOpen] = React.useState(false);

  return (
    <FynContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentSessionInfo,
        setCurrentSessionInfo,
        walletConnected,
        setWalletConnected,
        currentAccount,
        setCurrentAccount,
        loggedin,
        setLoggedIn,
        notFound,
        setNotFound,
        hatchModalOpen,
        setHatchModalOpen,
        buddyInfo,
        setBuddyInfo,
        buddyModalOpen,
        setBuddyModalOpen,
        provider,
        setProvider
      }}
    >
      {children}
    </FynContext.Provider>
  );
}
