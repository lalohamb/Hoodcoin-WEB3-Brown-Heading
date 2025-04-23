import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export default function ContributeForm() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { address, signer } = useWallet();

  const handleContribute = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!address || !signer) {
        throw new Error("Please connect your wallet first");
      }

      if (!amount || Number(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const contract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        [
          'function buyTokens(uint256) payable',
        ],
        signer
      );

      const tokens = ethers.utils.parseEther(amount);
      const tx = await contract.buyTokens(tokens, { 
        value: tokens,
        gasLimit: 500000 // Explicitly set gas limit
      });
      
      await tx.wait();
      setAmount("");
      
      // Refresh the page to update balances
      window.location.reload();
    } catch (err) {
      console.error("Transaction error:", err);
      // Handle user rejection specifically
      if (err.code === 4001) {
        setError("Transaction was rejected. Please confirm the transaction in MetaMask.");
      } else if (err.message.includes("insufficient funds")) {
        setError("Insufficient funds in your wallet to complete this transaction.");
      } else {
        setError(err.message || "Failed to process transaction");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8" role="form" aria-label="Buy HOOD Tokens">
      <h2 className="text-2xl font-bold text-[#3E2723] mb-8">Buy HOOD Tokens</h2>
      
      <form onSubmit={handleContribute} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Amount (ETH)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
            placeholder="Enter ETH amount"
            min="0.01"
            step="0.01"
            disabled={isLoading || !address}
            aria-label="Enter amount in ETH"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 rounded-lg p-4 flex items-center gap-2" role="alert">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !address}
          className="w-full bg-[#3E2723] text-white py-4 rounded-xl hover:bg-[#4E342E] transition font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          aria-busy={isLoading}
        >
          {isLoading ? "Processing..." : "Buy HOOD Tokens"}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}