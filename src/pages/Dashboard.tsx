import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, DollarSign, FileText, Settings, Users, Calendar, CheckCircle, XCircle, Plus } from 'lucide-react';
import axios from 'axios';
import LeadSubmissionForm from '../components/LeadSubmissionForm';
import LeadsTable, { Lead } from '../components/LeadsTable';
import HunterStats from '../components/HunterStats';
import formatCurrency from '../utils/formatCurrency';
import config from '../config';

// API URL
const API_URL = config.apiUrl;

interface CandidateUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  quizPassed: boolean;
  meetingScheduled: boolean;
  dashboardAccess: boolean;
}

interface HunterStats {
  totalLeads: number;
  convertedLeads: number;
  totalEarnings: number;
}

const Dashboard: React.FC = () => {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Admin state
  const [pendingCandidates, setPendingCandidates] = useState<CandidateUser[]>([]);
  const [meetingDate, setMeetingDate] = useState<string>('');
  const [meetingTime, setMeetingTime] = useState<string>('');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  
  // Hunter state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<HunterStats>({
    totalLeads: 0,
    convertedLeads: 0,
    totalEarnings: 0
  });
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);
  
  // Shared state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch pending candidates (for admin only)
  useEffect(() => {
    const fetchPendingCandidates = async () => {
      if (user?.role === 'admin') {
        try {
          setLoading(true);
          
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          };
          
          // Call the real API endpoint
          const res = await axios.get(`${API_URL}/auth/admin/candidates`, config);
          setPendingCandidates(res.data.candidates);
          
          setError(null);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to fetch candidates');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchPendingCandidates();
  }, [user, token]);

  // Fetch hunter leads and stats
  useEffect(() => {
    const fetchHunterData = async () => {
      if (user?.role === 'user') {
        try {
          setLoading(true);
          
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          };
          
          // Fetch leads
          const leadsRes = await axios.get(`${API_URL}/leads`, config);
          setLeads(leadsRes.data.leads);
          
          // Fetch stats
          const statsRes = await axios.get(`${API_URL}/leads/stats`, config);
          setStats(statsRes.data.stats);
          
          setError(null);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to fetch hunter data');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchHunterData();
  }, [user, token]);

  // Schedule meeting with candidate
  const scheduleMeeting = async () => {
    if (!selectedCandidate || !meetingDate || !meetingTime) return;
    
    try {
      setLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      // Call the real API endpoint
      await axios.put(
        `${API_URL}/auth/admin/schedule/${selectedCandidate}`, 
        { meetingDate, meetingTime }, 
        config
      );
      
      // Update local state
      const updatedCandidates = pendingCandidates.map(candidate => {
        if (candidate._id === selectedCandidate) {
          return {
            ...candidate,
            meetingScheduled: true
          };
        }
        return candidate;
      });
      
      setPendingCandidates(updatedCandidates);
      setShowScheduleModal(false);
      setSuccessMessage(`Meeting scheduled with candidate for ${meetingDate} at ${meetingTime}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      // Reset form
      setMeetingDate('');
      setMeetingTime('');
      setSelectedCandidate(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  // Approve candidate after interview
  const approveCandidate = async (candidateId: string) => {
    try {
      setLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      // Call the real API endpoint
      await axios.put(`${API_URL}/auth/admin/approve/${candidateId}`, {}, config);
      
      // Update local state
      const updatedCandidates = pendingCandidates.filter(
        candidate => candidate._id !== candidateId
      );
      
      setPendingCandidates(updatedCandidates);
      setSuccessMessage('Candidate approved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to approve candidate');
    } finally {
      setLoading(false);
    }
  };

  // Handle lead submission success
  const handleLeadSubmissionSuccess = async () => {
    setShowLeadForm(false);
    setSuccessMessage('Lead submitted successfully!');
    
    // Refetch leads and stats
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      // Fetch leads
      const leadsRes = await axios.get(`${API_URL}/leads`, config);
      setLeads(leadsRes.data.leads);
      
      // Fetch stats
      const statsRes = await axios.get(`${API_URL}/leads/stats`, config);
      setStats(statsRes.data.stats);
    } catch (err) {
      console.error('Failed to refresh data after lead submission');
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Format currency if needed in this component
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
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
        
        {/* Admin Panel */}
        {user?.role === 'admin' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-[#0a5c36] mr-2" />
                <h2 className="text-2xl font-bold text-[#0a5c36]">Candidate Management</h2>
              </div>
              <button
                onClick={() => navigate('/admin/leads')}
                className="flex items-center px-4 py-2 bg-[#0a5c36] text-white rounded-lg hover:bg-[#084a2b] transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Manage Leads
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
              <h3 className="text-xl font-semibold text-[#0a5c36] mb-4">Pending Candidates</h3>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#0a5c36] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : pendingCandidates.length === 0 ? (
                <p className="text-[#2a7d4f] text-center py-8">No pending candidates at this time.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#e8f0e8]">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#0a5c36] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#e8f0e8]">
                      {pendingCandidates.map((candidate) => (
                        <tr key={candidate._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2a7d4f]">{candidate.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a7d4f]">{candidate.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a7d4f]">{candidate.phone || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {candidate.meetingScheduled ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Meeting Scheduled
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Quiz Passed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a7d4f]">
                            {candidate.meetingScheduled ? (
                              <button
                                onClick={() => approveCandidate(candidate._id)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-[#0a5c36] hover:bg-[#084a2b] focus:outline-none focus:border-[#084a2b] focus:shadow-outline-green active:bg-[#084a2b] transition ease-in-out duration-150"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve Access
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedCandidate(candidate._id);
                                  setShowScheduleModal(true);
                                }}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-[#0a5c36] hover:bg-[#084a2b] focus:outline-none focus:border-[#084a2b] focus:shadow-outline-green active:bg-[#084a2b] transition ease-in-out duration-150"
                              >
                                <Calendar className="w-4 h-4 mr-1" />
                                Schedule Meeting
                              </button>
                            )}
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
        
        {/* Hunter Dashboard */}
        {user?.role === 'user' && (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#0a5c36]">Hunter Dashboard</h2>
                <button
                  onClick={() => setShowLeadForm(!showLeadForm)}
                  className="flex items-center px-4 py-2 bg-[#0a5c36] text-white rounded-lg hover:bg-[#084a2b] transition-colors"
                >
                  {showLeadForm ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Submit New Lead
                    </>
                  )}
                </button>
              </div>
              
              {/* Lead Submission Form */}
              {showLeadForm ? (
                <LeadSubmissionForm onSuccess={handleLeadSubmissionSuccess} />
              ) : (
                <>
                  {/* Hunter Stats */}
                  <HunterStats
                    totalLeads={stats.totalLeads}
                    convertedLeads={stats.convertedLeads}
                    totalEarnings={stats.totalEarnings}
                  />
                  
                  {/* Leads Table */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-[#0a5c36] mb-4">Your Leads</h3>
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
                      <LeadsTable leads={leads} loading={loading} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
      
      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#0a5c36] mb-4">Schedule Interview</h3>
            
            <div className="mb-4">
              <label htmlFor="meetingDate" className="block text-[#2a7d4f] mb-2">
                Date
              </label>
              <input
                type="date"
                id="meetingDate"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="meetingTime" className="block text-[#2a7d4f] mb-2">
                Time
              </label>
              <input
                type="time"
                id="meetingTime"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 border border-[#e8f0e8] text-[#2a7d4f] rounded-lg hover:bg-[#f0f9f0]"
              >
                Cancel
              </button>
              <button
                onClick={scheduleMeeting}
                disabled={!meetingDate || !meetingTime || loading}
                className={`px-4 py-2 bg-[#0a5c36] text-white rounded-lg ${
                  !meetingDate || !meetingTime || loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#084a2b]'
                } transition-colors`}
              >
                {loading ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 