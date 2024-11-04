import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentSelection from './components/PaymentSelection';
import MariviWalletForm from './components/MariviWalletForm';
import SedadWalletForm from './components/SedadWalletForm';
import { PaymentProvider } from './PaymentContext';

function App() {
  return (
    <PaymentProvider>
      <Router>
        <div className="App bg-gray-100 min-h-screen flex items-center justify-center">
          <Routes>
            <Route path="/" element={<PaymentSelection />} />
            <Route path="/marivi" element={<MariviWalletForm />} />
            <Route path="/sedad" element={<SedadWalletForm />} />
          </Routes>
        </div>
      </Router>
    </PaymentProvider>
  );
}

export default App;
