// import React, { useState } from 'react';
// import { mariviPayment } from '../api';

// const MariviWalletForm = () => {
//   const [formData, setFormData] = useState({
//     currencyCode: '929',
//     description: '',
//     amount: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await mariviPayment(formData);
//       alert('Merci pour votre don !');
//     } catch (error) {
//       alert('Erreur lors du traitement du don.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
//         {/* Section gauche - Récapitulatif */}
//         <div className="w-1/2 bg-blue-900 text-white p-8">
//           <button className="text-sm font-semibold mb-6 hover:underline">⬅ Retour</button>
//           <h2 className="text-2xl font-bold mb-4">Soutenir Ayadi Mouhsinin</h2>
//           <p className="text-4xl font-bold mb-8">Don de 129 MRU</p>
          
//           <div className="mb-4">
//             <div className="flex justify-between mb-2">
//               <span>Projet : Fournir des repas</span>
//               <span>65 MRU</span>
//             </div>
//             <p className="text-sm text-gray-300">Quantité : 1</p>
//           </div>

//           <div className="mb-6">
//             <div className="flex justify-between mb-2">
//               <span>Projet : Fournir des vêtements</span>
//               <span>64 MRU</span>
//             </div>
//             <p className="text-sm text-gray-300">Quantité : 2 - 32 MRU chaque</p>
//           </div>

//           <div className="text-xs text-gray-300 mt-8">
//             <p>Merci de soutenir notre cause. Vos dons font une réelle différence !</p>
//             <div className="flex space-x-2 mt-2">
//               <a href="#" className="hover:underline">Conditions</a>
//               <a href="#" className="hover:underline">Confidentialité</a>
//             </div>
//           </div>
//         </div>

//         {/* Section droite - Formulaire de don */}
//         <div className="w-1/2 bg-white p-8">
//           <h2 className="text-xl font-semibold mb-6">Formulaire de Don Ayadi Mouhsinin</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="relative mb-6">
//               <input
//                 type="text"
//                 value={formData.currencyCode}
//                 readOnly
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               />
//               <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
//                 Code Devise
//               </label>
//             </div>

//             <div className="relative mb-6">
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 rows="3"
//               ></textarea>
//               <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
//                 Description (ex: projet spécifique)
//               </label>
//             </div>

//             <div className="relative mb-6 flex items-center">
//               <span className="px-3 py-2 bg-gray-200 border border-gray-300 rounded-l-lg">MRU</span>
//               <input
//                 type="number"
//                 value={formData.amount}
//                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                 className="w-full p-4 border-t border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-r-lg"
//                 placeholder="Montant"
//               />
//               <span className="px-3 py-2 bg-gray-200 border border-gray-300 rounded-r-lg">.00</span>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-1000 transition duration-300 ease-in-out"
//               disabled={loading}
//             >
//               {loading ? 'En cours...' : 'Faire un don'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MariviWalletForm;


import React, { useState } from 'react';
import { paymentMarivi } from '../apis/walletService';
import logo from '../assets/ayadi-logo.jpeg';

const MariviWalletForm = () => {
  const [formData, setFormData] = useState({
    currencyCode: '929',
    description: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [transactionCode, setTransactionCode] = useState(null); // État pour stocker le code de transaction

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTransactionCode(null); // Réinitialise le code de transaction

    // Préparation des données pour l'API Marivi
    const paymentData = {
      currency_code: formData.currencyCode,  // Utilise le code devise défini dans formData
      description: formData.description,
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await paymentMarivi(paymentData);
      setTransactionCode(response); // Enregistre la réponse si c'est un code de transaction
      alert('Merci pour votre don !');
    } catch (error) {
      alert('Erreur lors du traitement du don.');
      console.error("Erreur lors de l'exécution du paiement avec Marivi :", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (transactionCode) {
      navigator.clipboard.writeText(transactionCode);
      alert('Code de transaction copié dans le presse-papiers');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        
        {/* Section gauche - Information Ayadi Mouhsinin */}
        <div className="w-1/2 bg-blue-900 text-white p-8 flex flex-col items-center text-center">
          <img src={logo} alt="Ayadi Mouhsinin Logo" className="w-32 h-32 mb-6 rounded-full" />
          <h2 className="text-2xl font-bold mb-4">Soutenir Ayadi Mouhsinin</h2>
          <p className="text-lg mb-6">
            Ayadi Mouhsinin est une association caritative dédiée à soutenir les plus démunis. 
            Votre don contribue directement à notre mission et apporte un réel changement dans la vie 
            de nombreuses personnes.
          </p>
          <p className="text-xs text-gray-300 mt-8">
            Merci de soutenir notre cause. Vos dons font une réelle différence !
          </p>
          <div className="text-xs text-gray-300 mt-2">
            <a href="#" className="hover:underline mr-4">Conditions</a>
            <a href="#" className="hover:underline">Confidentialité</a>
          </div>
        </div>

        {/* Section droite - Formulaire de don Marivi */}
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-xl font-semibold mb-6">Formulaire de Don Marivi</h2>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <input
                type="text"
                value={formData.currencyCode}
                readOnly
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
                Code Devise
              </label>
            </div>

            <div className="relative mb-6">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="Message (optionnel)"
              ></textarea>
              <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
                Message (optionnel)
              </label>
            </div>

            <div className="relative mb-6 flex items-center">
              <span className="px-3 py-4 bg-gray-200 border border-gray-300 rounded-l-lg">MRU</span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full p-4 border-t border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-r-lg"
                placeholder="Entrez le montant de votre don"
              />
              <span className="px-3 py-4 bg-gray-200 border border-gray-300 rounded-r-lg">.00</span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-1000 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'En cours...' : 'Faire un don'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MariviWalletForm;
