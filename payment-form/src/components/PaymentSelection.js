import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../PaymentContext';
import logo from '../assets/ayadi-logo.jpeg'; // Logo de l'association
import mariviWalletImage from '../assets/masrivimain.jpg'; // Image pour le portefeuille Marivi
import sedadWalletImage from '../assets/sedad-removebg-preview.png'; // Image pour le portefeuille Sedad

const PaymentSelection = () => {
  const navigate = useNavigate();
  const { selectWallet } = usePayment();

  const handleSelection = (wallet) => {
    selectWallet(wallet);
    navigate(`/${wallet}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full p-8 text-center">
        
        {/* Logo de l'association */}
        <img src={logo} alt="Ayadi Mouhsinin Logo" className="w-32 h-32 mx-auto rounded-full mb-6" />

        {/* Titre de l'association */}
        <h1 className="text-3xl font-semibold mb-4">Bienvenue chez Ayadi Mouhsinin</h1>
        <p className="text-gray-700 mb-6">
          Merci de soutenir notre cause. Choisissez votre méthode de paiement pour contribuer directement à notre mission d'aider les plus démunis.
        </p>

        {/* Images des portefeuilles */}
        <div className="flex justify-center space-x-4">
          <img
            src={mariviWalletImage}
            alt="Marivi Wallet"
            onClick={() => handleSelection('marivi')}
            className="w-32 h-32 cursor-pointer rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          />
          <img
            src={sedadWalletImage}
            alt="Sedad Wallet"
            onClick={() => handleSelection('sedad')}
            className="w-32 h-32 cursor-pointer rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          />
        </div>

        {/* Message de remerciement */}
        <p className="text-xs text-gray-500 mt-8">
          Vos dons font une réelle différence dans la vie de ceux qui en ont besoin. Merci pour votre générosité !
        </p>
      </div>
    </div>
  );
};

export default PaymentSelection;
