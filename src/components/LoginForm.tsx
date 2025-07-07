import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  
  const { login, error, isAuthenticated, clearError, hasDashboardAccess, user } = useContext(AuthContext);
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
      // Check if user has dashboard access
      if (hasDashboardAccess() || user?.dashboardAccess) {
        navigate('/dashboard');
      } else {
        navigate('/pre-dashboard');
      }
    }
  }, [isAuthenticated, navigate, hasDashboardAccess, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password });
    try {
      await login(email, password);
      console.log('Login successful');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] bg-clip-text text-transparent">
          Login to Your Account
        </span>
      </h2>
      
      {showError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-[#2a7d4f] mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#e8f0e8] focus:outline-none focus:ring-2 focus:ring-[#0a5c36]/50"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-[#0a5c36] border-[#e8f0e8] rounded focus:ring-[#0a5c36]/50"
            />
            <label htmlFor="remember" className="ml-2 text-[#2a7d4f]">
              Remember me
            </label>
          </div>
          <a href="#" className="text-[#0a5c36] hover:underline">
            Forgot password?
          </a>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white py-3 rounded-xl font-medium hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-300 shadow-md"
        >
          Login
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-[#2a7d4f]">
            Don't have an account?{' '}
            <a href="/register" className="text-[#0a5c36] font-medium hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 