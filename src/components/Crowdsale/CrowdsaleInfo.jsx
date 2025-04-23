import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Coins, Target, Users } from 'lucide-react';

export default function CrowdsaleInfo() {
  const [price, setPrice] = useState('0');
  const [tokensSold, setTokensSold] = useState('0');

  useEffect(() => {
    const fetchContractInfo = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(
            import.meta.env.VITE_CONTRACT_ADDRESS,
            [
              'function price() view returns (uint256)',
              'function tokensSold() view returns (uint256)'
            ],
            provider
          );

          const [priceValue, soldValue] = await Promise.all([
            contract.price(),
            contract.tokensSold()
          ]);

          setPrice(ethers.utils.formatEther(priceValue));
          setTokensSold(ethers.utils.formatEther(soldValue));
        } catch (error) {
          console.error('Error fetching contract info:', error);
        }
      }
    };

    fetchContractInfo();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-[#3E2723] mb-8 flex items-center gap-2">
        <Coins className="h-6 w-6 text-amber-500" />
        Crowdsale Status
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-amber-50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-amber-800">Token Price</h3>
          </div>
          <p className="text-2xl font-bold text-amber-900">
            {price} ETH per HOOD
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-amber-800">Tokens Sold</h3>
          </div>
          <p className="text-2xl font-bold text-amber-900">
            {tokensSold} HOOD
          </p>
        </div>
      </div>
    </div>
  );
}