


export const mariviPayment = async (data) => {
    try {
      const response = await fetch('/api/marivi/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Erreur lors du paiement Marivi:", error);
      throw error;
    }
  };
  
  export const sedadPayment = async (data) => {
    try {
      const response = await fetch('/api/sedad/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Erreur lors du paiement Sedad:", error);
      throw error;
    }
  };
  