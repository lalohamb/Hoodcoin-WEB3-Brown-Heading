import React from 'react';
import { Coins, ArrowRight, Store, Heart, Coffee } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import { useWallet } from '../context/WalletContext';

const FEATURED_SHOPS = [
  {
    name: "Joe's Coffee",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    type: "Café"
  },
  {
    name: "Fresh Market",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800",
    type: "Grocery"
  },
  {
    name: "Book Corner",
    image: "https://images.unsplash.com/photo-1526721940322-10fb6e3ae94a?auto=format&fit=crop&q=80&w=800",
    type: "Bookstore"
  },
  {
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&q=80&w=800",
    type: "Florist"
  }
];

export default function LandingPage() {
  const { connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449049607083-e29383d58423?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full mb-6">
                Community-First Token
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#3E2723] mb-6">
                Empowering Local Communities with Web3
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                HoodCoin connects neighborhood businesses with digital innovation. Support local shops, earn rewards, and be part of a thriving community.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={connectWallet}
                  className="bg-[#3E2723] text-white px-8 py-3 rounded-full hover:bg-[#4E342E] transition flex items-center gap-2 shadow-lg"
                >
                  Join the Community <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1524567248408-cbfd37e65e2d?auto=format&fit=crop&q=80&w=800"
                  alt="Local coffee shop"
                  className="rounded-2xl shadow-2xl w-full h-48 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800"
                  alt="Community market"
                  className="rounded-2xl shadow-2xl w-full h-48 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Community Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3E2723] mb-16">
            Supporting Local Commerce
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition">
              <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Store className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#3E2723] mb-4">Local Shops</h3>
                <p className="text-gray-700">Empower neighborhood businesses with digital payments and customer rewards.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition">
              <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <Heart className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#3E2723] mb-4">Community</h3>
                <p className="text-gray-700">Build stronger neighborhoods through shared economic growth and cooperation.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Coffee className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#3E2723] mb-4">Local Culture</h3>
                <p className="text-gray-700">Preserve and promote the unique character of your neighborhood.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shops */}
      <section className="py-20 bg-[#EFEBE9]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3E2723] mb-16">
            Featured Local Partners
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {FEATURED_SHOPS.map((shop) => (
              <div key={shop.name} className="group relative rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="text-xl font-bold">{shop.name}</h3>
                  <p className="text-sm text-gray-200">{shop.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}