import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ContributorInfo } from '../components/Crowdsale';
import { MapPin, Star, Clock } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const FEATURED_MERCHANTS = [
  {
    id: 1,
    name: "Joe's Coffee",
    category: "Café",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    acceptsHOOD: true,
    rewards: ["2x points on weekends", "Free coffee after 10 visits"],
    distance: "0.3 mi"
  },
  {
    id: 2,
    name: "Fresh Market",
    category: "Grocery",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800",
    acceptsHOOD: true,
    rewards: ["5% back in HOOD", "Member-only deals"],
    distance: "0.5 mi"
  },
  {
    id: 3,
    name: "Book Corner",
    category: "Bookstore",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1526721940322-10fb6e3ae94a?auto=format&fit=crop&q=80&w=800",
    acceptsHOOD: true,
    rewards: ["Buy 5 get 1 free", "Author event priority access"],
    distance: "0.7 mi"
  }
];

const RECENT_TRANSACTIONS = [
  {
    id: 1,
    merchant: "Joe's Coffee",
    amount: "5.00",
    points: 10,
    date: "2025-03-15T10:30:00"
  },
  {
    id: 2,
    merchant: "Fresh Market",
    amount: "42.50",
    points: 85,
    date: "2025-03-14T15:45:00"
  },
  {
    id: 3,
    merchant: "Book Corner",
    amount: "24.99",
    points: 50,
    date: "2025-03-13T14:20:00"
  }
];

export default function ConsumerDashboard() {
  const { address, userRole } = useWallet();
  const [activeTab, setActiveTab] = React.useState('nearby');

  if (!address || userRole !== 'consumer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info & Rewards */}
          <div className="lg:col-span-1">
            <ContributorInfo />
          </div>

          {/* Right Column - Merchants & Transactions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('nearby')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'nearby'
                      ? 'bg-[#3E2723] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Nearby Merchants
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'transactions'
                      ? 'bg-[#3E2723] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Recent Transactions
                </button>
              </div>
            </div>

            {activeTab === 'nearby' && (
              <div className="grid md:grid-cols-2 gap-6">
                {FEATURED_MERCHANTS.map((merchant) => (
                  <div key={merchant.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="h-48 relative">
                      <img
                        src={merchant.image}
                        alt={merchant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        Accepts HOOD
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#3E2723]">{merchant.name}</h3>
                          <p className="text-gray-600">{merchant.category}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 text-amber-400 fill-current" />
                          <span className="font-medium">{merchant.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{merchant.distance}</span>
                      </div>
                      <div className="space-y-2">
                        {merchant.rewards.map((reward, index) => (
                          <div key={index} className="bg-amber-50 text-amber-800 px-3 py-2 rounded-lg text-sm">
                            {reward}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-[#3E2723] mb-6">Transaction History</h3>
                <div className="space-y-4">
                  {RECENT_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#3E2723] text-white p-3 rounded-lg">
                          <Clock className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium text-[#3E2723]">{tx.merchant}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(tx.date).toLocaleDateString()} at{' '}
                            {new Date(tx.date).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#3E2723]">{tx.amount} HOOD</p>
                        <p className="text-sm text-green-600">+{tx.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}