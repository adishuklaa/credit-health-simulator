import { 
  CreditCard, 
  Calendar, 
  Search, 
  TrendingUp,
  Activity,
  ShieldCheck,
  Info
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FactorCard from './FactorCard';
import WhatIfSimulator from './WhatIfSimulator';

const mockHistoryData = [
  { month: 'Jan', score: 680 },
  { month: 'Feb', score: 685 },
  { month: 'Mar', score: 682 },
  { month: 'Apr', score: 690 },
  { month: 'May', score: 705 },
  { month: 'Jun', score: 712 },
];

export default function Dashboard() {
  const currentScore = 712;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Credit Health Simulator</h1>
        </div>
        <p className="text-gray-600">Educational tool to understand how financial behaviors impact your credit profile.</p>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3 text-blue-800">
          <Info className="shrink-0 mt-0.5" size={20} />
          <p className="text-sm leading-relaxed">
            <strong>Disclaimer:</strong> This dashboard is for educational purposes only. It does not calculate an actual FICO® or VantageScore®. 
            The simulations provided are estimations based on generic credit models to demonstrate directional impact.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Overview & Simulator */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Simulated Score</h2>
            
            <div className="relative inline-flex items-center justify-center mb-4">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle 
                  cx="96" cy="96" r="88" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle 
                  cx="96" cy="96" r="88" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="transparent"
                  strokeDasharray="552"
                  strokeDashoffset={552 - (552 * (currentScore / 850))}
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-extrabold text-gray-900">{currentScore}</span>
                <span className="text-sm font-medium text-green-600 mt-1">Good</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">Based on your synthetic profile</p>
          </div>

          <WhatIfSimulator currentScore={currentScore} />

        </div>

        {/* Right Column: History & Factors */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Activity size={20} className="text-indigo-600" />
                Score History
              </h2>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <YAxis domain={['dataMin - 20', 'dataMax + 20']} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#4F46E5" 
                    strokeWidth={3}
                    dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Credit Factors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FactorCard 
                title="Payment History"
                value="98%"
                impact="High"
                status="Good"
                icon={Calendar}
                description="Consistent on-time payments are the most important factor in your score. You have 1 missed payment from 14 months ago."
              />
              <FactorCard 
                title="Credit Utilization"
                value="45%"
                impact="High"
                status="Fair"
                icon={CreditCard}
                description="You are using 45% of your available credit limits. Reducing this below 30% can significantly improve your profile."
              />
              <FactorCard 
                title="Credit Age"
                value="4 yrs, 2 mos"
                impact="Medium"
                status="Fair"
                icon={TrendingUp}
                description="Lenders like to see a long history of managing credit. Your oldest account is 6 years old."
              />
              <FactorCard 
                title="Recent Inquiries"
                value="2"
                impact="Low"
                status="Excellent"
                icon={Search}
                description="Applying for too much new credit at once can be risky. Hard inquiries stay on your report for 2 years."
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
