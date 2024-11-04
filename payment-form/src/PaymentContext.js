// src/PaymentContext.js
import React, { createContext, useState, useContext } from 'react';

// Création du contexte
const PaymentContext = createContext();

// Fournisseur de contexte
export const PaymentProvider = ({ children }) => {
  const [walletType, setWalletType] = useState(null); // Pour stocker le type de portefeuille sélectionné

  // Fonction pour sélectionner un portefeuille
  const selectWallet = (type) => {
    setWalletType(type);
  };

  return (
    <PaymentContext.Provider value={{ walletType, selectWallet }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const usePayment = () => useContext(PaymentContext);
