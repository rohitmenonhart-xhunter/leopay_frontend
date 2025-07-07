import React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#21242b] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">
                Welcome Back!
              </span>
            </h1>
            <p className="text-gray-300 mb-8">
              Login to your LeoPay account to continue your journey as a successful earner.
            </p>
            <div className="bg-[#282c34]/80 backdrop-blur-md p-6 rounded-3xl border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3">
                  <img src="/logolion.png" alt="LeoPay Logo" className="w-10 h-10" />
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">LeoPay</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#C19345]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Find potential clients
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#C19345]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Submit their details
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#C19345]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Earn 50% commission
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login; 