import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CrowdsaleInfo, ContributeForm, ContributorInfo } from '../components/Crowdsale';
import { useWallet } from '../context/WalletContext';

export default function TransactionPage() {
  const { address } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!address ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600">Please connect your wallet to view the crowdsale details and participate.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <CrowdsaleInfo />
              <ContributorInfo />
            </div>
            <ContributeForm />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}