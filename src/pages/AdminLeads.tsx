import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowUpDown, CheckCircle, XCircle, DollarSign, Clock, AlertCircle, Search, Filter, Phone, Mail, Building, FileText, Info, User } from 'lucide-react';
import axios from 'axios';
import formatCurrency from '../utils/formatCurrency';
import config from '../config';

// API URL
const API_URL = config.apiUrl;

interface Lead {
  _id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address?: string;
  businessType: string;
  projectRequirements: string;
  budget: number;
  additionalNotes?: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'rejected';
  commissionRate: number;
  projectValue: number;
  commissionEarned: number;
  createdAt: string;
  updatedAt: string;
  hunter: {
    _id: string;
    name: string;
    email: string;
  };
}

const AdminLeads: React.FC = () => {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Lead update modal
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [projectValue, setProjectValue] = useState<string>('');
  
  // Lead details modal
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

  // Fetch all leads (admin only)
  useEffect(() => {
    const fetchLeads = async () => {
      if (!user || user?.role !== 'admin') {
        navigate('/dashboard');
        return;
      }
      
      try {
        setLoading(true);
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        
        const res = await axios.get(`${API_URL}/leads/all`, config);
        setLeads(res.data.leads);
        setFilteredLeads(res.data.leads);
        
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch leads');
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchLeads();
    }
  }, [user, token, navigate]);

  // Filter leads when search term or status filter changes
  useEffect(() => {
    let result = leads;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(lead => lead.status === statusFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(lead => 
        lead.clientName.toLowerCase().includes(term) ||
        lead.companyName.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.phone.toLowerCase().includes(term) ||
        lead.hunter.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredLeads(result);
  }, [searchTerm, statusFilter, leads]);

  // Update lead status
  const updateLeadStatus = async () => {
    if (!selectedLead || !newStatus) return;
    
    try {
      setLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      const body = {
        status: newStatus,
        projectValue: newStatus === 'completed' ? parseFloat(projectValue) : undefined
      };
      
      const res = await axios.put(`${API_URL}/leads/${selectedLead._id}/status`, body, config);
      
      // Update leads list
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead._id === selectedLead._id ? res.data.lead : lead
        )
      );
      
      setSuccessMessage(`Lead status updated to ${newStatus}`);
      setShowUpdateModal(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update lead status');
    } finally {
      setLoading(false);
    }
  };

  // Open update modal
  const openUpdateModal = (lead: Lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setProjectValue(lead.projectValue ? lead.projectValue.toString() : '');
    setShowUpdateModal(true);
  };
  
  // Open details modal
  const openDetailsModal = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailsModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Get status badge
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

  return (
    <div className="min-h-screen bg-[#f9f8f0]">
      {/* Header */}
      <header className="bg-gradient-to-r from-white via-[#f0f9f0] to-white backdrop-blur-md border-b border-[#e8f0e8]/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0a5c36] to-[#1c8a4e] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] bg-clip-text text-transparent">HuntEarn</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-[#0a5c36] hover:bg-[#e8f0e8] rounded-lg transition-colors"
              >
                Dashboard
              </button>
              <div className="text-right mr-2">
                <p className="text-[#0a5c36] font-medium">Welcome,</p>
                <p className="text-[#2a7d4f] font-bold">{user?.name}</p>
                <p className="text-xs text-[#2a7d4f] opacity-75">{user?.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full bg-[#f0f9f0] hover:bg-[#e8f0e8] text-[#0a5c36]"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-xl flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>{successMessage}</span>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        {!user ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#0a5c36] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-[#0a5c36] font-medium">Loading...</span>
          </div>
        ) : user.role !== 'admin' ? (
          <div className="text-center py-12">
            <p className="text-[#2a7d4f] text-lg">You don't have permission to access this page.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-4 py-2 bg-[#0a5c36] text-white rounded-lg hover:bg-[#084a2b] transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0a5c36]">Lead Management</h2>
            </div>
            
            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8] mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                    Search Leads
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-[#2a7d4f]/50" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                      placeholder="Search by client, company, or hunter..."
                    />
                  </div>
                </div>
                
                {/* Status Filter */}
                <div>
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                    Filter by Status
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="w-5 h-5 text-[#2a7d4f]/50" />
                    </div>
                    <select
                      id="statusFilter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Leads Table */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
              <h3 className="text-xl font-semibold text-[#0a5c36] mb-4">All Leads</h3>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#0a5c36] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#2a7d4f] text-lg">No leads found.</p>
                  {searchTerm || statusFilter !== 'all' ? (
                    <p className="text-[#2a7d4f] mt-2">Try adjusting your filters.</p>
                  ) : null}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#e8f0e8]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Budget
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hunter
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openDetailsModal(lead)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{lead.clientName}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{lead.companyName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center">
                              <Phone className="w-4 h-4 mr-1 text-gray-500" />
                              {lead.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(lead.budget)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(lead.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{lead.hunter.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(lead.createdAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openUpdateModal(lead);
                              }}
                              className="px-3 py-1 bg-[#0a5c36] text-white rounded-lg hover:bg-[#084a2b] transition-colors"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      {/* Update Lead Modal */}
      {showUpdateModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#0a5c36] mb-4">Update Lead Status</h3>
            
            <div className="mb-4">
              <p className="text-sm text-[#2a7d4f] mb-1">Client</p>
              <p className="font-medium">{selectedLead.clientName}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-[#2a7d4f] mb-1">Current Status</p>
              <p className="font-medium">{getStatusBadge(selectedLead.status)}</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="newStatus" className="block text-[#2a7d4f] mb-2">
                New Status
              </label>
              <select
                id="newStatus"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                required
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            {newStatus === 'completed' && (
              <div className="mb-6">
                <label htmlFor="projectValue" className="block text-[#2a7d4f] mb-2">
                  Project Value (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-[#2a7d4f]">₹</span>
                  </div>
                  <input
                    type="number"
                    id="projectValue"
                    value={projectValue}
                    onChange={(e) => setProjectValue(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                    placeholder="0.00"
                    required={newStatus === 'completed'}
                    min="0"
                    step="0.01"
                  />
                </div>
                <p className="text-xs text-[#2a7d4f]/70 mt-1">
                  Hunter commission ({selectedLead.commissionRate * 100}%): {projectValue ? formatCurrency(parseFloat(projectValue) * selectedLead.commissionRate) : '₹0.00'}
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border border-[#e8f0e8] text-[#2a7d4f] rounded-lg hover:bg-[#f0f9f0]"
              >
                Cancel
              </button>
              <button
                onClick={updateLeadStatus}
                disabled={loading || (newStatus === 'completed' && (!projectValue || parseFloat(projectValue) <= 0))}
                className={`px-4 py-2 bg-[#0a5c36] text-white rounded-lg ${
                  loading || (newStatus === 'completed' && (!projectValue || parseFloat(projectValue) <= 0))
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#084a2b]'
                } transition-colors`}
              >
                {loading ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Lead Details Modal */}
      {showDetailsModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">Lead Details</h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  Client Information
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <p className="text-gray-900">{selectedLead.clientName}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-gray-500" />
                      {selectedLead.email}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <p className="text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-gray-500" />
                      {selectedLead.phone}
                    </p>
                  </div>
                  
                  {selectedLead.alternatePhone && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Alternate Phone:</span>
                      <p className="text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-gray-500" />
                        {selectedLead.alternatePhone}
                      </p>
                    </div>
                  )}
                  
                  {selectedLead.address && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Address:</span>
                      <p className="text-gray-900">{selectedLead.address}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Company Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-gray-500" />
                  Company Information
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Company Name:</span>
                    <p className="text-gray-900">{selectedLead.companyName}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Business Type:</span>
                    <p className="text-gray-900">{selectedLead.businessType}</p>
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-gray-500" />
                  Project Details
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Requirements:</span>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedLead.projectRequirements}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Budget:</span>
                    <p className="text-gray-900">{formatCurrency(selectedLead.budget)}</p>
                  </div>
                  
                  {selectedLead.additionalNotes && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Additional Notes:</span>
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedLead.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Status & Financial Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-gray-500" />
                  Status & Financial Information
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Current Status:</span>
                    <div className="mt-1">{getStatusBadge(selectedLead.status)}</div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Commission Rate:</span>
                    <p className="text-gray-900">{selectedLead.commissionRate}%</p>
                  </div>
                  
                  {selectedLead.status === 'completed' && (
                    <>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Project Value:</span>
                        <p className="text-gray-900">{formatCurrency(selectedLead.projectValue)}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-500">Commission Earned:</span>
                        <p className="text-gray-900">{formatCurrency(selectedLead.commissionEarned)}</p>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Hunter:</span>
                    <p className="text-gray-900">{selectedLead.hunter.name} ({selectedLead.hunter.email})</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Created:</span>
                    <p className="text-gray-900">{formatDate(selectedLead.createdAt)}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                    <p className="text-gray-900">{formatDate(selectedLead.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  openUpdateModal(selectedLead);
                }}
                className="px-4 py-2 bg-[#0a5c36] border border-transparent rounded-md text-sm font-medium text-white hover:bg-[#084a2b]"
              >
                Update Status
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads; 