import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface FactorCardProps {
  title: string;
  value: string;
  impact: 'High' | 'Medium' | 'Low';
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  icon: LucideIcon;
  description: string;
}

export default function FactorCard({ title, value, impact, status, icon: Icon, description }: FactorCardProps) {
  const statusColors = {
    Excellent: 'text-green-600 bg-green-50 border-green-200',
    Good: 'text-blue-600 bg-blue-50 border-blue-200',
    Fair: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    Poor: 'text-red-600 bg-red-50 border-red-200'
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Icon size={20} />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <span className={clsx("px-2.5 py-1 text-xs font-medium rounded-full border", statusColors[status])}>
          {status}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500 mt-1">{impact} Impact</div>
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
