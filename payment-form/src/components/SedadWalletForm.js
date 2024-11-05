// import React, { useState, useEffect } from 'react';
// import { getWallets, makePayment } from '../apis/walletService';
// import logo from '../assets/ayadi-logo.jpeg';

// const SedadWalletForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     remarks: '',
//     option: '',
//     amount: '',
//   });
//   const [wallets, setWallets] = useState([]); // État pour stocker les wallets
//   const [loading, setLoading] = useState(false);

//   // Récupérer les wallets au chargement du composant
//   useEffect(() => {
//     const fetchWallets = async () => {
//       try {
//         const response = await getWallets();
//         if (response.status === 200 && Array.isArray(response.data)) {
//           setWallets(response.data); // Stocke les wallets si c'est un tableau
//         } else {
//           console.error("Les wallets récupérés ne sont pas un tableau :", response);
//           setWallets([]); // Définit un tableau vide si la réponse est incorrecte
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des wallets :", error);
//         setWallets([]);
//       }
//     };
    
//     fetchWallets();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     // Vérification que les champs requis sont remplis
//     if (!formData.firstName || !formData.lastName || !formData.amount || !formData.option) {
//       alert("Veuillez remplir le nom, prénom, montant, et option.");
//       setLoading(false);
//       return;
//     }
  
//     const paymentData = {
//       montant: parseFloat(formData.amount),           // Utilisation du champ attendu 'montant'
//       nom_payeur: formData.firstName,                 // Utilisation du champ attendu 'nom_payeur'
//       prenom_payeur: formData.lastName,               // Utilisation du champ attendu 'prenom_payeur'
//       telephone_payeur: formData.phone || "",         // Ajoutez un champ de téléphone si disponible
//       code_abonnement: formData.option,               // Utilisation du champ attendu 'code_abonnement'
//       remarque: formData.remarks || "",               // Utilisation du champ attendu 'remarque'
//     };
  
//     console.log("Données envoyées pour le paiement:", paymentData);
  
//     try {
//       const response = await makePayment(paymentData);
//       alert('Merci pour votre don ! Réponse de l\'API: ' + response);
//     } catch (error) {
//       if (error.response) {
//         console.error("Erreur lors de l'exécution du paiement :", error.response.data);
//         alert('Erreur lors du traitement du don: ' + error.response.data.error);
//       } else {
//         console.error("Erreur lors de l'exécution du paiement :", error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        
//         {/* Section gauche - Information Ayadi Mouhsinin */}
//         <div className="w-1/2 bg-blue-900 text-white p-8 flex flex-col items-center text-center">
//           <img src={logo} alt="Ayadi Mouhsinin Logo" className="w-32 h-32 mb-6 rounded-full" />
//           <h2 className="text-2xl font-bold mb-4">Soutenir Ayadi Mouhsinin</h2>
//           <p className="text-lg mb-6">
//             Ayadi Mouhsinin est une association caritative dédiée à soutenir les plus démunis. 
//             Votre don contribue directement à notre mission et apporte un réel changement dans la vie 
//             de nombreuses personnes.
//           </p>
//           <p className="text-xs text-gray-300 mt-8">
//             Merci de soutenir notre cause. Vos dons font une réelle différence !
//           </p>
//           <div className="text-xs text-gray-300 mt-2">
//             <a href="#" className="hover:underline mr-4">Conditions</a>
//             <a href="#" className="hover:underline">Confidentialité</a>
//           </div>
//         </div>

//         {/* Section droite - Formulaire de don Sedad */}
//         <div className="w-1/2 bg-white p-8">
//           <h2 className="text-xl font-semibold mb-6">Formulaire de Don Sedad</h2>

//           <form onSubmit={handleSubmit}>
//             {/* Champ Nom Payer */}
//             <div className="relative mb-6">
//               <input
//                 type="text"
//                 value={formData.firstName}
//                 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder=" "
//               />
//               <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
//                 Nom Payer
//               </label>
//             </div>

//             {/* Champ Prenom Payer */}
//             <div className="relative mb-6">
//               <input
//                 type="text"
//                 value={formData.lastName}
//                 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder=" "
//               />
//               <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
//                 Prenom Payer
//               </label>
//             </div>

//             {/* Champ Remarque */}
//             <div className="relative mb-6">
//               <textarea
//                 value={formData.remarks}
//                 onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 rows="3"
//                 placeholder=" "
//               ></textarea>
//               <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
//                 Remarque
//               </label>
//             </div>

//             {/* Menu déroulant pour les wallets */}
//             <div className="relative mb-6">
//               <select
//                 value={formData.option}
//                 onChange={(e) => setFormData({ ...formData, option: e.target.value })}
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               >
//                 <option value="">Choisissez une option</option>
//                 {Array.isArray(wallets) && wallets.map((wallet, index) => (
//                   <option key={index} value={wallet.code_abonnement}>
//                     {wallet.moyen_paiement} - {wallet.phone}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Champ Montant */}
//             <div className="relative mb-6 flex items-center">
//               <span className="px-3 py-4 bg-gray-200 border border-gray-300 rounded-l-lg">MRU</span>
//               <input
//                 type="number"
//                 value={formData.amount}
//                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                 className="w-full p-4 border-t border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-r-lg"
//                 placeholder="0"
//               />
//               <span className="px-3 py-4 bg-gray-200 border border-gray-300 rounded-r-lg">.00</span>
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

// export default SedadWalletForm;



import React, { useState, useEffect } from 'react';
import { getWallets, makePayment } from '../apis/walletService';
import logo from '../assets/ayadi-logo.jpeg';

const SedadWalletForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    remarks: '',
    option: '',
    amount: '',
  });
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentCode, setPaymentCode] = useState(null); // État pour stocker le code de paiement

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await getWallets();
        if (response.status === 200 && Array.isArray(response.data)) {
          setWallets(response.data);
        } else {
          console.error("Les wallets récupérés ne sont pas un tableau :", response);
          setWallets([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des wallets :", error);
        setWallets([]);
      }
    };
    
    fetchWallets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentCode(null); // Réinitialise le code de paiement

    const paymentData = {
      montant: parseFloat(formData.amount),
      nom_payeur: formData.firstName,
      prenom_payeur: formData.lastName,
      telephone_payeur: formData.phone || "",
      code_abonnement: formData.option,
      remarque: formData.remarks || "",
    };

    try {
      const response = await makePayment(paymentData);
      if (response.status === 200 && response.data && response.data.code_paiement) {
        setPaymentCode(response.data.code_paiement); // Enregistre le code de paiement
        alert('Merci pour votre don !');
      } else {
        alert('Paiement réussi, mais aucun code de paiement reçu.');
      }
    } catch (error) {
      if (error.response) {
        console.error("Erreur lors de l'exécution du paiement :", error.response.data);
        alert('Erreur lors du traitement du don: ' + error.response.data.error);
      } else {
        console.error("Erreur lors de l'exécution du paiement :", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (paymentCode) {
      navigator.clipboard.writeText(paymentCode);
      alert('Code de paiement copié dans le presse-papiers');
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

        {/* Section droite - Formulaire de don Sedad */}
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-xl font-semibold mb-6">Formulaire de Don Sedad</h2>

          <form onSubmit={handleSubmit}>
            {/* Champ Nom Payer */}
            <div className="relative mb-6">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder=" "
              />
              <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
                Nom Payer
              </label>
            </div>

            {/* Champ Prenom Payer */}
            <div className="relative mb-6">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder=" "
              />
              <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
                Prenom Payer
              </label>
            </div>

            {/* Champ Remarque */}
            <div className="relative mb-6">
              <textarea
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder=" "
              ></textarea>
              <label className="absolute top-0 left-3 text-gray-500 transform -translate-y-1/2 bg-white px-1 text-sm">
                Remarque
              </label>
            </div>

            {/* Menu déroulant pour les wallets */}
            <div className="relative mb-6">
              <select
                value={formData.option}
                onChange={(e) => setFormData({ ...formData, option: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Choisissez une option</option>
                {Array.isArray(wallets) && wallets.map((wallet, index) => (
                  <option key={index} value={wallet.code_abonnement}>
                    {wallet.moyen_paiement} - {wallet.phone}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Montant */}
            <div className="relative mb-6 flex items-center">
              <span className="px-3 py-4 bg-gray-200 border border-gray-300 rounded-l-lg">MRU</span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full p-4 border-t border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-r-lg"
                placeholder="0"
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

          {/* Affichage du code de paiement avec option de copie */}
          {paymentCode && (
            <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
              <p className="mb-4">Votre code de paiement : <strong>{paymentCode}</strong></p>
              <button
                onClick={copyToClipboard}
                className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-1000 transition duration-300"
              >
                Copier le code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SedadWalletForm;
