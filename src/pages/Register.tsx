import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f8f0] via-[#e8f0e8]/50 to-[#d9f0d9]/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] bg-clip-text text-transparent">
                Join HuntEarn Today
              </span>
            </h1>
            <p className="text-[#2a7d4f] mb-8">
              Create your account and start earning 50% commission by connecting businesses with digital services.
            </p>
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0a5c36] to-[#1c8a4e] rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                  H
                </div>
                <div className="text-xl font-bold text-[#0a5c36]">HuntEarn</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#0a5c36]/10 rounded-full flex items-center justify-center text-[#0a5c36] font-bold text-sm mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a5c36] mb-1">No Technical Skills Required</h3>
                    <p className="text-sm text-[#2a7d4f]">You don't need any technical knowledge to start earning</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#0a5c36]/10 rounded-full flex items-center justify-center text-[#0a5c36] font-bold text-sm mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a5c36] mb-1">Zero Investment</h3>
                    <p className="text-sm text-[#2a7d4f]">Start earning without any upfront costs or investments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#0a5c36]/10 rounded-full flex items-center justify-center text-[#0a5c36] font-bold text-sm mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a5c36] mb-1">Flexible Working Hours</h3>
                    <p className="text-sm text-[#2a7d4f]">Work whenever you want, from anywhere</p>
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