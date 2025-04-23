import React, { useState } from 'react';
import { PlusCircle, Save, Trash2 } from 'lucide-react';
import Header from '../components/Header';

export default function AdminDashboard() {
  const [phases, setPhases] = useState([
    {
      id: '1',
      title: 'Phase 1: Launch',
      description: 'Initial token distribution and exchange listings'
    },
    {
      id: '2',
      title: 'Phase 2: Growth',
      description: 'Community expansion and partnership development'
    },
    {
      id: '3',
      title: 'Phase 3: Ecosystem',
      description: 'Platform development and utility expansion'
    }
  ]);

  const addPhase = () => {
    const newPhase = {
      id: Date.now().toString(),
      title: 'New Phase',
      description: 'Description'
    };
    setPhases([...phases, newPhase]);
  };

  const updatePhase = (id, field, value) => {
    setPhases(phases.map(phase => 
      phase.id === id ? { ...phase, [field]: value } : phase
    ));
  };

  const deletePhase = (id) => {
    setPhases(phases.filter(phase => phase.id !== id));
  };

  const saveRoadmap = () => {
    // Here you would typically save to a backend
    alert('Roadmap saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3E2723]">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={addPhase}
                className="flex items-center gap-2 px-4 py-2 bg-[#3E2723] text-white rounded-lg hover:bg-[#4E342E] transition"
              >
                <PlusCircle className="h-5 w-5" />
                Add Phase
              </button>
              <button
                onClick={saveRoadmap}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {phases.map((phase) => (
              <div key={phase.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-4">
                    <input
                      type="text"
                      value={phase.title}
                      onChange={(e) => updatePhase(phase.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
                    />
                    <textarea
                      value={phase.description}
                      onChange={(e) => updatePhase(phase.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3E2723] focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <button
                    onClick={() => deletePhase(phase.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}