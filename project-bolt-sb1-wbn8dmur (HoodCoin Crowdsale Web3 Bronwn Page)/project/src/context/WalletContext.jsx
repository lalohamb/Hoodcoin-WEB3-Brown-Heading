import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const WalletContext = createContext(undefined);

const HARDHAT_CHAIN_ID = '0x7A69'; // 31337 in hex
const HARDHAT_NETWORK_PARAMS = {
  chainId: HARDHAT_CHAIN_ID,
  chainName: 'Hardhat Local',
  rpcUrls: ['http://127.0.0.1:8545'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
};

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethersProvider);
        
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setSigner(ethersProvider.getSigner());
          }
        } catch (error) {
          console.error('Error checking connection:', error);
          setError('Failed to check wallet connection');
        }
      }
    };

    initProvider();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      if (provider) {
        setSigner(provider.getSigner());
      }
      if (userRole === 'consumer') {
        navigate('/dashboard');
      }
    } else {
      setAddress(null);
      setSigner(null);
      setUserRole(null);
      localStorage.removeItem('userRole');
      navigate('/');
    }
  };

  const switchToHardhatNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: HARDHAT_CHAIN_ID }],
      });
    } catch (switchError) {
      // Handle user rejection of network switch
      if (switchError.code === 4001) {
        throw new Error('Network switch was rejected. Please accept the network change request.');
      }
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [HARDHAT_NETWORK_PARAMS],
          });
        } catch (addError) {
          if (addError.code === 4001) {
            throw new Error('Network addition was rejected. Please accept adding the Hardhat network.');
          }
          throw new Error('Failed to add Hardhat network to MetaMask');
        }
      } else {
        throw switchError;
      }
    }
  };

  const connectWallet = async () => {
    setError(null);

    if (!window.ethereum) {
      setError('Please install MetaMask to use this feature!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      await switchToHardhatNetwork();
      
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);
      setAddress(accounts[0]);
      setSigner(ethersProvider.getSigner());
      
      if (userRole === 'consumer') {
        navigate('/dashboard');
      } else {
        navigate('/transaction');
      }
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // Handle user rejection specifically
      if (error.code === 4001) {
        setError('Connection rejected. Please accept the connection request in MetaMask.');
      } else {
        setError(error.message || 'Failed to connect wallet');
      }
      throw error;
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setSigner(null);
    setError(null);
    setUserRole(null);
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <WalletContext.Provider value={{
      isWalletConnected: !!address,
      address,
      provider,
      signer,
      error,
      userRole,
      setUserRole,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}