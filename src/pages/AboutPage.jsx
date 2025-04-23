import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Coins, Users, Store, Shield, Wallet, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Coins className="h-12 w-12 text-amber-500" />
              <h1 className="text-4xl font-bold text-[#3E2723]">About HOODc</h1>
            </div>
            <p className="text-xl text-gray-600">Empowering Community Commerce</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#3E2723] mb-4">What is HOODc?</h2>
              <p className="text-gray-700 mb-4">
                HOODc is a utility-first, community-driven cryptocurrency token designed to power a new economy centered around small businesses, local entrepreneurs, and cultural preservation within historically underserved communities. The name "HOODc" derives from "Hood Coin," symbolizing financial empowerment from within the neighborhood—by the community, for the community.
              </p>
              <p className="text-gray-700">
                Built on the Ethereum blockchain (or compatible EVM chains), HOODc is an ERC-20 token that facilitates fast, secure, and transparent interactions between consumers and small business owners. It serves as a rewards mechanism, a medium of exchange, and a participation token in a decentralized economic ecosystem.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#3E2723] mb-6">Who is HOODc For?</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Store className="h-8 w-8 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-[#3E2723] mb-2">Small Businesses & Entrepreneurs</h3>
                  <p className="text-gray-600">
                    Local shops, creators, service providers, and culturally rooted businesses looking for alternative ways to grow their customer base and retain loyal supporters.
                  </p>
                  <p className="text-gray-600 mt-4">
                    Merchants can accept HOODc for payments, offer token-based discounts, and gain exposure in a decentralized marketplace.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Users className="h-8 w-8 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-[#3E2723] mb-2">Everyday Consumers</h3>
                  <p className="text-gray-600">
                    Shoppers and supporters who want to earn rewards, access exclusive deals, and support their community businesses while spending consciously.
                  </p>
                  <p className="text-gray-600 mt-4">
                    Consumers are rewarded in HOODc for participating in commerce, reviewing businesses, attending events, and making referrals.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Shield className="h-8 w-8 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-[#3E2723] mb-2">Community Investors & Builders</h3>
                  <p className="text-gray-600">
                    Supporters who believe in the long-term growth of local economies and want to participate in HOODc governance, liquidity pools, or DAO-led projects.
                  </p>
                  <p className="text-gray-600 mt-4">
                    Token holders may have future opportunities to propose initiatives, vote on partnerships, or fund innovation projects.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#3E2723] mb-4">How Does HOODc Work?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#3E2723] mb-4">Loyalty & Cashback Rewards</h3>
                  <ul className="space-y-2">
                    <li>• Consumers earn HOODc with every transaction at participating businesses</li>
                    <li>• Tiered reward structure (Bronze, Silver, Gold) incentivizes frequent support</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#3E2723] mb-4">Merchant Discounts & Incentives</h3>
                  <ul className="space-y-2">
                    <li>• Businesses can offer special deals for customers who pay in HOODc</li>
                    <li>• Dynamic pricing models based on customer wallet activity or token staking</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#3E2723] mb-4">Proof-of-Interaction Bonuses</h3>
                  <ul className="space-y-2">
                    <li>• Users receive HOODc for reviews, attending verified community events, and referrals</li>
                    <li>• Business Registration & Optional KYC</li>
                    <li>• Entrepreneurs can register as verified merchants and customize discount policies</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#3E2723] mb-4">Wallet & Exchange Features</h3>
                  <ul className="space-y-2">
                    <li>• Compatible with MetaMask, WalletConnect, and other major Web3 wallets</li>
                    <li>• Can be traded on DEX platforms like Uniswap</li>
                    <li>• Offers price discovery and market participation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#3E2723] mb-4">Why HOODc Matters</h2>
              <p className="text-gray-700 mb-4">
                In a time where mainstream finance often overlooks the needs of local business ecosystems and marginalized entrepreneurs, HOODc aims to restore agency, wealth circulation, and self-determination to the hands of communities that need it most. It promotes trust, transparency, and digital equity while enabling people to invest in one another.
              </p>
              <p className="text-gray-700">
                HOODc is more than a token—it's a movement to reclaim economic narratives and build regenerative prosperity from the ground up.
              </p>
            </section>

            <section className="bg-[#3E2723] text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Join the Movement</h2>
              <p className="mb-6 text-center">
                Whether you're a vendor, a shopper, a developer, or a dreamer, HOODc welcomes your participation in building a fairer, stronger economy.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="#" className="flex items-center justify-center gap-2 bg-amber-400 text-[#3E2723] px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 transition">
                  <Wallet className="h-5 w-5" />
                  Get Started
                </a>
                <a href="#" className="flex items-center justify-center gap-2 border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#3E2723] transition">
                  <Users className="h-5 w-5" />
                  Join Discord
                </a>
                <a href="#" className="flex items-center justify-center gap-2 border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#3E2723] transition">
                  <ArrowRight className="h-5 w-5" />
                  Learn More
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}