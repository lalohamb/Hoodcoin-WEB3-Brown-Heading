import React from 'react';
import { Clock, Users, Shield } from 'lucide-react';

export default function Stats() {
  return (
    <section className="bg-[#5D4037] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white/10 rounded-2xl p-6">
            <Clock className="h-12 w-12 mx-auto mb-4 text-amber-400" />
            <h3 className="text-2xl font-bold mb-2">48 Hours</h3>
            <p>Until Community Sale Ends</p>
          </div>
          <div className="text-center bg-white/10 rounded-2xl p-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-amber-400" />
            <h3 className="text-2xl font-bold mb-2">50+ Shops</h3>
            <p>Local Businesses Onboard</p>
          </div>
          <div className="text-center bg-white/10 rounded-2xl p-6">
            <Shield className="h-12 w-12 mx-auto mb-4 text-amber-400" />
            <h3 className="text-2xl font-bold mb-2">$250K+</h3>
            <p>Community Rewards Distributed</p>
          </div>
        </div>
      </div>
    </section>
  );
}