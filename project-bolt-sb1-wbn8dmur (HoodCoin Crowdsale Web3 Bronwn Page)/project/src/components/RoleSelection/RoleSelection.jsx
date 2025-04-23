import React from 'react';
import { Store, Users } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useNavigate } from 'react-router-dom';

export default function RoleSelection() {
  const { address, setUserRole, userRole } = useWallet();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
    // Navigate based on role
    if (role === 'consumer') {
      navigate('/dashboard');
    } else if (role === 'business') {
      navigate('/business');
    } else {
      navigate('/transaction');
    }
  };

  if (!address || userRole) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold text-[#3E2723] mb-6">Welcome to HoodCoin!</h2>
        <p className="text-gray-600 mb-8">Please select your role to customize your experience.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleRoleSelect('consumer')}
            className="bg-white border-2 border-[#3E2723] rounded-xl p-6 hover:bg-[#3E2723] hover:text-white transition group"
          >
            <Users className="h-12 w-12 mb-4 group-hover:text-amber-400" />
            <h3 className="text-xl font-bold mb-2">Consumer</h3>
            <p className="text-sm opacity-80">Earn rewards, get discounts, and support local businesses</p>
          </button>

          <button
            onClick={() => handleRoleSelect('business')}
            className="bg-white border-2 border-[#3E2723] rounded-xl p-6 hover:bg-[#3E2723] hover:text-white transition group"
          >
            <Store className="h-12 w-12 mb-4 group-hover:text-amber-400" />
            <h3 className="text-xl font-bold mb-2">Business Owner</h3>
            <p className="text-sm opacity-80">Manage your business, create rewards, and engage with customers</p>
          </button>
        </div>
      </div>
    </div>
  );
}