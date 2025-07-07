import React from 'react';
import { ArrowUpDown, Clock, CheckCircle, AlertCircle, XCircle, DollarSign, Loader2 } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency';

export interface Lead {
  _id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  businessType: string;
  projectRequirements: string;
  budget: number;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'rejected';
  commissionRate: number;
  projectValue: number;
  commissionEarned: number;
  createdAt: string;
  updatedAt: string;
}

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, loading }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <ArrowUpDown className="w-3 h-3 mr-1" />
            Contacted
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <ArrowUpDown className="w-3 h-3 mr-1" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unknown
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-[#0a5c36] animate-spin" />
        <span className="ml-2 text-[#0a5c36] font-medium">Loading leads...</span>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#2a7d4f] text-lg">You haven't submitted any leads yet.</p>
        <p className="text-[#2a7d4f] mt-2">
          Click "Submit New Lead" to add your first client lead.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#e8f0e8]">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">
              Business
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">
              Budget
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">
              Earnings
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#e8f0e8]">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-[#f0f9f0]">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-[#2a7d4f]">{lead.clientName}</div>
                  <div className="text-xs text-[#2a7d4f]/70">{lead.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-[#2a7d4f]">{lead.companyName}</div>
                  <div className="text-xs text-[#2a7d4f]/70">{lead.businessType}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#2a7d4f]">{formatCurrency(lead.budget)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(lead.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.status === 'completed' ? (
                  <div className="text-sm font-medium text-green-600 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {formatCurrency(lead.commissionEarned)}
                  </div>
                ) : (
                  <div className="text-sm text-[#2a7d4f]/70">
                    {lead.status === 'rejected' ? 'N/A' : 'Pending'}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a7d4f]">
                {formatDate(lead.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable; 