import React from 'react';
import { DollarSign, Users, TrendingUp } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency';

interface HunterStatsProps {
  totalLeads: number;
  convertedLeads: number;
  totalEarnings: number;
}

const HunterStats: React.FC<HunterStatsProps> = ({
  totalLeads,
  convertedLeads,
  totalEarnings
}) => {
  // Calculate conversion rate
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  
  // Set targets
  const leadsTarget = 10;
  const conversionTarget = 30; // 30%
  const earningsTarget = 350000; // ₹350,000
  
  // Calculate progress percentages (capped at 100%)
  const leadsProgress = Math.min((totalLeads / leadsTarget) * 100, 100);
  const conversionProgress = Math.min((conversionRate / conversionTarget) * 100, 100);
  const earningsProgress = Math.min((totalEarnings / earningsTarget) * 100, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Leads Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0a5c36]">Total Leads</h3>
          <div className="w-10 h-10 bg-[#f0f9f0] rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-[#0a5c36]" />
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-[#0a5c36]">{totalLeads}</div>
            <div className="text-sm text-[#2a7d4f]/70">Target: {leadsTarget}</div>
          </div>
        </div>
        
        <div className="w-full bg-[#f0f9f0] rounded-full h-2.5 mb-1">
          <div 
            className="bg-[#0a5c36] h-2.5 rounded-full" 
            style={{ width: `${leadsProgress}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-[#2a7d4f]/70">
          {leadsProgress.toFixed(0)}% to target
        </div>
      </div>
      
      {/* Conversion Rate Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0a5c36]">Conversion Rate</h3>
          <div className="w-10 h-10 bg-[#f0f9f0] rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#0a5c36]" />
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-[#0a5c36]">{conversionRate.toFixed(1)}%</div>
            <div className="text-sm text-[#2a7d4f]/70">Target: {conversionTarget}%</div>
          </div>
        </div>
        
        <div className="w-full bg-[#f0f9f0] rounded-full h-2.5 mb-1">
          <div 
            className="bg-[#0a5c36] h-2.5 rounded-full" 
            style={{ width: `${conversionProgress}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-[#2a7d4f]/70">
          {conversionProgress.toFixed(0)}% to target
        </div>
      </div>
      
      {/* Total Earnings Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0a5c36]">Total Earnings</h3>
          <div className="w-10 h-10 bg-[#f0f9f0] rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#0a5c36]" />
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-[#0a5c36]">{formatCurrency(totalEarnings, 0)}</div>
            <div className="text-sm text-[#2a7d4f]/70">Target: {formatCurrency(earningsTarget, 0)}</div>
          </div>
        </div>
        
        <div className="w-full bg-[#f0f9f0] rounded-full h-2.5 mb-1">
          <div 
            className="bg-[#0a5c36] h-2.5 rounded-full" 
            style={{ width: `${earningsProgress}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-[#2a7d4f]/70">
          {earningsProgress.toFixed(0)}% to target
        </div>
      </div>
    </div>
  );
};

export default HunterStats; 