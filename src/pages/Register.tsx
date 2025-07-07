import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#21242b] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">
                Join LeoPay Today
              </span>
            </h1>
            <p className="text-gray-300 mb-8">
              Create your account and start earning 50% commission by connecting businesses with digital services.
            </p>
            <div className="bg-[#282c34]/80 backdrop-blur-md p-6 rounded-3xl border border-gray-700 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3">
                  <img src="/logolion.png" alt="LeoPay Logo" className="w-10 h-10" />
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">LeoPay</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C19345]/10 rounded-full flex items-center justify-center text-[#C19345] font-bold text-sm mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">No Technical Skills Required</h3>
                    <p className="text-sm text-gray-300">You don't need any technical knowledge to start earning</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C19345]/10 rounded-full flex items-center justify-center text-[#C19345] font-bold text-sm mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Zero Investment</h3>
                    <p className="text-sm text-gray-300">Start earning without any upfront costs or investments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C19345]/10 rounded-full flex items-center justify-center text-[#C19345] font-bold text-sm mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Flexible Working Hours</h3>
                    <p className="text-sm text-gray-300">Work whenever you want, from anywhere</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register; 