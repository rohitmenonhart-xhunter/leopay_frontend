import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import config from '../config';

// API URL
const API_URL = config.apiUrl;

interface LeadSubmissionFormProps {
  onSuccess: () => void;
}

const LeadSubmissionForm: React.FC<LeadSubmissionFormProps> = ({ onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    businessType: '',
    projectRequirements: '',
    budget: '',
    additionalNotes: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.clientName || !formData.email || !formData.phone || !formData.businessType || !formData.projectRequirements || !formData.budget) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Phone validation
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }
    
    // Budget validation
    const budget = parseFloat(formData.budget.replace(/[^0-9.]/g, ''));
    if (isNaN(budget) || budget <= 0) {
      setError('Please enter a valid budget amount');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      // Format data for API
      const leadData = {
        ...formData,
        budget: parseFloat(formData.budget.replace(/[^0-9.]/g, ''))
      };
      
      // Submit lead to API
      await axios.post(`${API_URL}/leads`, leadData, config);
      
      // Show success message
      setSuccess(true);
      
      // Clear form
      setFormData({
        clientName: '',
        companyName: '',
        email: '',
        phone: '',
        alternatePhone: '',
        address: '',
        businessType: '',
        projectRequirements: '',
        budget: '',
        additionalNotes: '',
      });
      
      // Notify parent component
      setTimeout(() => {
        onSuccess();
      }, 1500);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const businessTypes = [
    'E-commerce',
    'Healthcare',
    'Education',
    'Finance',
    'Real Estate',
    'Technology',
    'Manufacturing',
    'Retail',
    'Food & Beverage',
    'Entertainment',
    'Travel',
    'Consulting',
    'Marketing',
    'Other'
  ];
  
  if (success) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#0a5c36] mb-2">Lead Submitted Successfully!</h3>
          <p className="text-[#2a7d4f] text-center mb-6">
            Your lead has been submitted and will be reviewed by our team.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e8f0e8]">
      <h3 className="text-xl font-semibold text-[#0a5c36] mb-6">Submit New Lead</h3>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Client Information */}
          <div>
            <h4 className="font-medium text-[#0a5c36] mb-4">Client Information</h4>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="alternatePhone" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Alternate Phone
                </label>
                <input
                  type="tel"
                  id="alternatePhone"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                />
              </div>
            </div>
          </div>
          
          {/* Project Information */}
          <div>
            <h4 className="font-medium text-[#0a5c36] mb-4">Project Information</h4>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                  required
                >
                  <option value="">Select Business Type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="projectRequirements" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Project Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="projectRequirements"
                  name="projectRequirements"
                  value={formData.projectRequirements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50 resize-none"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Estimated Budget <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-[#2a7d4f]">₹</span>
                  </div>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-[#2a7d4f] mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-[#e8f0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50 resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center px-6 py-2 bg-[#0a5c36] text-white rounded-lg ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#084a2b]'
            } transition-colors`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Lead'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadSubmissionForm; 