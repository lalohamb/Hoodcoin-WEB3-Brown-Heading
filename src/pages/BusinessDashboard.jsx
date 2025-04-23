import React, { useState } from 'react';
import { Store, Upload, Shield, BarChart as ChartBar, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWallet } from '../context/WalletContext';

const INITIAL_FORM_STATE = {
  businessName: '',
  description: '',
  email: '',
  location: '',
  discountPercentage: 5,
  minimumTokens: 100
};

export default function BusinessDashboard() {
  const { address, userRole } = useWallet();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [kycStatus, setKycStatus] = useState('not_verified'); // not_verified, pending, verified
  const [error, setError] = useState('');

  if (!address || userRole !== 'business') {
    return null;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here we would call the smart contract
      setCurrentStep(2);
    } catch (err) {
      setError('Failed to save business profile');
    }
  };

  const handleDiscountSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here we would call the smart contract
      setCurrentStep(3);
    } catch (err) {
      setError('Failed to set discount policy');
    }
  };

  const initiateKYC = async () => {
    try {
      setKycStatus('pending');
      // Here we would integrate with a KYC provider
    } catch (err) {
      setError('Failed to initiate KYC process');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-[#3E2723] text-white' : 'bg-gray-200'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-1 ${
                    currentStep > step ? 'bg-[#3E2723]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-2 text-sm text-gray-600">
            <span>Business Profile</span>
            <span>Configure Discounts</span>
            <span>Verify KYC</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Step 1: Business Profile */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Store className="h-8 w-8 text-[#3E2723]" />
              <h2 className="text-2xl font-bold text-[#3E2723]">Business Profile</h2>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Business Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3E2723] text-white py-4 rounded-xl hover:bg-[#4E342E] transition font-bold"
              >
                Save Profile & Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Discount Configuration */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Store className="h-8 w-8 text-[#3E2723]" />
              <h2 className="text-2xl font-bold text-[#3E2723]">Configure Discounts</h2>
            </div>

            <form onSubmit={handleDiscountSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Discount Percentage
                </label>
                <input
                  type="range"
                  name="discountPercentage"
                  min="0"
                  max="30"
                  value={formData.discountPercentage}
                  onChange={handleFormChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-2 font-medium text-[#3E2723]">
                  {formData.discountPercentage}%
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Minimum Token Requirement
                </label>
                <input
                  type="number"
                  name="minimumTokens"
                  value={formData.minimumTokens}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
                  min="0"
                />
              </div>

              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="font-medium text-amber-800 mb-2">Preview</h3>
                <p className="text-amber-700">
                  Customers holding at least {formData.minimumTokens} HOOD tokens will receive a {formData.discountPercentage}% discount on their purchases.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3E2723] text-white py-4 rounded-xl hover:bg-[#4E342E] transition font-bold"
              >
                Save Discount Policy & Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 3: KYC Verification */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="h-8 w-8 text-[#3E2723]" />
              <h2 className="text-2xl font-bold text-[#3E2723]">KYC Verification</h2>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${
                kycStatus === 'verified'
                  ? 'bg-green-50'
                  : kycStatus === 'pending'
                  ? 'bg-amber-50'
                  : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className={`h-6 w-6 ${
                    kycStatus === 'verified'
                      ? 'text-green-600'
                      : kycStatus === 'pending'
                      ? 'text-amber-600'
                      : 'text-gray-600'
                  }`} />
                  <h3 className="font-medium">
                    {kycStatus === 'verified'
                      ? 'Verification Complete'
                      : kycStatus === 'pending'
                      ? 'Verification Pending'
                      : 'Not Verified'
                    }
                  </h3>
                </div>
                <p className={`text-sm ${
                  kycStatus === 'verified'
                    ? 'text-green-700'
                    : kycStatus === 'pending'
                    ? 'text-amber-700'
                    : 'text-gray-700'
                }`}>
                  {kycStatus === 'verified'
                    ? 'Your business is now verified. You can access all features.'
                    : kycStatus === 'pending'
                    ? 'Please complete the verification process through your email.'
                    : 'Verify your business to unlock analytics and advanced features.'
                  }
                </p>
              </div>

              {kycStatus === 'not_verified' && (
                <button
                  onClick={initiateKYC}
                  className="w-full bg-[#3E2723] text-white py-4 rounded-xl hover:bg-[#4E342E] transition font-bold"
                >
                  Start Verification
                </button>
              )}

              {kycStatus === 'verified' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-[#3E2723] flex items-center gap-2">
                    <ChartBar className="h-5 w-5" />
                    Analytics Dashboard
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-600">Total HOOD Earned</p>
                      <p className="text-2xl font-bold text-[#3E2723]">1,234 HOOD</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-600">Active Customers</p>
                      <p className="text-2xl font-bold text-[#3E2723]">156</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}