import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, Menu, X } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export default function Header() {
  const { connectWallet, disconnectWallet, isWalletConnected, address, error } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      // Error is already handled in WalletContext
      console.error('Failed to connect wallet:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#3E2723] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Coins className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold">HoodCoin</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-amber-400 transition"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6">
              <Link to="/" className="hover:text-amber-400 transition">Home</Link>
              <Link to="/about" className="hover:text-amber-400 transition">About</Link>
              <a href="#tokenomics" className="hover:text-amber-400 transition">Tokenomics</a>
            </nav>
            {isWalletConnected ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-amber-400">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="bg-amber-400 text-[#3E2723] px-4 py-2 rounded-lg hover:bg-amber-500 transition font-semibold"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="bg-amber-400 text-[#3E2723] px-4 py-2 rounded-lg hover:bg-amber-500 transition font-semibold"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="hover:text-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="hover:text-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <a 
                href="#tokenomics" 
                className="hover:text-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Tokenomics
              </a>
              {isWalletConnected ? (
                <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                  <span className="text-sm text-amber-400">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setIsMenuOpen(false);
                    }}
                    className="bg-amber-400 text-[#3E2723] px-4 py-2 rounded-lg hover:bg-amber-500 transition font-semibold"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleConnect();
                    setIsMenuOpen(false);
                  }}
                  className="bg-amber-400 text-[#3E2723] px-4 py-2 rounded-lg hover:bg-amber-500 transition font-semibold mt-4"
                >
                  Connect Wallet
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
      {error && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50 max-w-md animate-fade-in">
          {error}
        </div>
      )}
    </header>
  );
}