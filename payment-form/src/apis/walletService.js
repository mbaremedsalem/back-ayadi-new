import axios from 'axios';

// URL de base de l'API
const API_BASE_URL = 'http://127.0.0.1:8000/ayadi';

// Headers d'autorisation si nécessaire
const headers = {
  'Authorization': 'Api-Key zNHv7vXH.d3gUeL8nAUBF63PMy8XNU5vSGEvzgeOH',
};

// Fonction pour obtenir les wallets
export const getWallets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-wallets/`, { headers });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des wallets :", error);
    throw error;
  }
};

// Fonction pour effectuer un paiement avec Sedad Wallet
export const makePayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/demand_payment/`, paymentData, { headers });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'exécution du paiement :", error);
    throw error;
  }
};

// Fonction pour effectuer un paiement avec Marivi Wallet
export const paymentMarivi = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_transaction/`, paymentData, {
      headers,
      responseType: 'text', // Spécifier que nous attendons une réponse en texte
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'exécution du paiement avec Marivi :", error);
    throw error;
  }
};
