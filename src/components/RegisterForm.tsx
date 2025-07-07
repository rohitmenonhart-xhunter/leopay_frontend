import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { register, error, isAuthenticated, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        clearError();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/pre-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await register(name, email, password, phone);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] bg-clip-text text-transparent">
          Create Your Account
        </span>
      </h2>
      
      {showError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center">
          {formError || error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-[#2a7d4f] mb-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-[#2a7d4f] mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-[#2a7d4f] mb-2 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-[#2a7d4f] mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
            placeholder="Create a password"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-[#2a7d4f] mb-2 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-[#0a5c36] border-[#e8f0e8] rounded focus:ring-[#0a5c36]/50"
              required
            />
            <label htmlFor="terms" className="ml-2 text-[#2a7d4f]">
              I agree to the{' '}
              <a href="#" className="text-[#0a5c36] hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white py-3 rounded-xl font-medium hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-300 shadow-md"
        >
          Register
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-[#2a7d4f]">
            Already have an account?{' '}
            <a href="/login" className="text-[#0a5c36] font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 