import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import TransactionPage from './pages/TransactionPage.jsx';
import ConsumerDashboard from './pages/ConsumerDashboard.jsx';
import BusinessDashboard from './pages/BusinessDashboard.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { WalletProvider } from './context/WalletContext';
import RoleSelection from './components/RoleSelection';

function App() {
  return (
    <WalletProvider>
      <RoleSelection />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/dashboard" element={<ConsumerDashboard />} />
        <Route path="/business" element={<BusinessDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </WalletProvider>
  );
}

export default App;