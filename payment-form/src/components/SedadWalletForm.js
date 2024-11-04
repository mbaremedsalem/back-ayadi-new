import React, { useState } from 'react';
import { sedadPayment } from '../api';
import logo from '../assets/ayadi-logo.jpeg'; // Assurez-vous d'avoir le logo dans src/assets

const SedadWalletForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    remarks: '',
    option: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sedadPayment(formData);
      alert('Merci pour votre don !');
    } catch (error) {
      alert('Erreur lors du traitement du don.');
    } finally {
      setLoading(false);
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

            {/* Menu déroulant */}
            <div className="relative mb-6">
              <select
                value={formData.option}
                onChange={(e) => setFormData({ ...formData, option: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Choisissez une option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
        </div>
      </div>
    </div>
  );
};

export default SedadWalletForm;
