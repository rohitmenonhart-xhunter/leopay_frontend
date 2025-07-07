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
    <div className="w-full max-w-md p-8 bg-[#282c34] rounded-3xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">
          Login to Your Account
        </span>
      </h2>
      
      {showError && (
        <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-xl text-center border border-red-800">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#21242b] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#C19345]/50"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#21242b] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#C19345]/50"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-[#C19345] bg-[#21242b] border-gray-700 rounded focus:ring-[#C19345]/50"
            />
            <label htmlFor="remember" className="ml-2 text-gray-300">
              Remember me
            </label>
          </div>
          <a href="#" className="text-[#C19345] hover:underline">
            Forgot password?
          </a>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#C19345] to-[#dbb36b] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-md"
        >
          Login
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <a href="/register" className="text-[#C19345] font-medium hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 