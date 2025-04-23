import React from 'react';
import { Coins } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3E2723] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coins className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold">HoodCoin</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Connecting neighborhoods through blockchain technology.
            </p>
            <a 
              href="https://cnn.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-amber-400 hover:text-amber-300 transition"
            >
              White Paper
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Join Discord</li>
              <li>Local Events</li>
              <li>Partner Shops</li>
              <li>Rewards Program</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Shop Directory</li>
              <li>Documentation</li>
              <li>Support Center</li>
              <li>Token Economics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Stay updated with local events and opportunities.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 rounded-lg px-4 py-2 text-sm flex-1"
              />
              <button className="bg-amber-400 text-[#3E2723] px-4 py-2 rounded-lg text-sm font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          © 2025 HoodCoin. Building stronger neighborhoods through Web3.
        </div>
      </div>
    </footer>
  );
}