import { useState } from 'react';
import { Sliders, ArrowRight } from 'lucide-react';

export default function WhatIfSimulator({ currentScore }: { currentScore: number }) {
  const [utilization, setUtilization] = useState(45);
  const [onTimePayments, setOnTimePayments] = useState(98);
  
  // Very simplistic mock calculation for educational purposes
  const calculateSimulatedScore = () => {
    let newScore = currentScore;
    
    // Utilization effect
    if (utilization < 10) newScore += 30;
    else if (utilization < 30) newScore += 15;
    else if (utilization > 50) newScore -= 20;
    else if (utilization > 80) newScore -= 50;

    // Payment history effect
    if (onTimePayments === 100) newScore += 20;
    else if (onTimePayments < 95) newScore -= 40;
    else if (onTimePayments < 90) newScore -= 80;
    
    return Math.min(850, Math.max(300, newScore));
  };

  const simulatedScore = calculateSimulatedScore();
  const scoreDiff = simulatedScore - currentScore;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="text-indigo-600" size={24} />
        <h2 className="text-xl font-bold text-gray-900">What-If Simulator</h2>
      </div>
      
      <p className="text-sm text-gray-500 mb-6">
        Adjust the sliders below to see how changes in your credit behavior might affect your overall credit health. This is an educational simulation, not an actual credit score calculation.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Credit Utilization</label>
            <span className="text-sm font-bold text-indigo-600">{utilization}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={utilization}
            onChange={(e) => setUtilization(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-xs text-gray-500 mt-1">Aim for under 30% for best results.</p>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">On-Time Payment %</label>
            <span className="text-sm font-bold text-indigo-600">{onTimePayments}%</span>
          </div>
          <input 
            type="range" 
            min="80" 
            max="100" 
            value={onTimePayments}
            onChange={(e) => setOnTimePayments(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-xs text-gray-500 mt-1">Even one missed payment can have a large impact.</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Simulated Score</p>
          <div className="text-3xl font-bold text-gray-900">{simulatedScore}</div>
        </div>
        
        <div className="flex items-center text-gray-400">
          <ArrowRight size={24} />
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Potential Change</p>
          <div className={`text-xl font-bold ${scoreDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {scoreDiff > 0 ? '+' : ''}{scoreDiff}
          </div>
        </div>
      </div>
    </div>
  );
}
