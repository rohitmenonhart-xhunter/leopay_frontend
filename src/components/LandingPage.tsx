import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Search, 
  Users, 
  Zap, 
  DollarSign, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Star,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Sparkles,
  UserCheck,
  Code,
  Briefcase,
  Award,
  Handshake,
  Phone,
  MessageCircle,
  FileText,
  HelpCircle,
  MapPin
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Find Clients Everywhere",
      description: "Identify businesses that need websites, apps, or digital marketing services in your network"
    },
    {
      icon: DollarSign,
      title: "Earn 50% Commission",
      description: "Get paid handsomely for every successful client you bring to the platform"
    },
    {
      icon: Shield,
      title: "We Handle Everything",
      description: "Once you submit a lead, our team takes over - quotes, development, and delivery"
    },
    {
      icon: Clock,
      title: "Work Your Schedule",
      description: "Perfect for students, homemakers, and anyone looking for flexible income"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Find Potential Clients",
      description: "Look for businesses, startups, or individuals who need websites or digital services",
      icon: Target
    },
    {
      number: "02",
      title: "Convince & Submit",
      description: "Talk to them about our services and submit their details through our platform",
      icon: MessageCircle
    },
    {
      number: "03",
      title: "We Take Over",
      description: "Our admin team follows up, provides quotes, and manages the entire project",
      icon: UserCheck
    },
    {
      number: "04",
      title: "Get Paid 50%",
      description: "Once the client pays for the completed project, you receive your 50% commission",
      icon: Award
    }
  ];

  const huntingTips = [
    {
      title: "Local Businesses",
      description: "Small shops, restaurants, clinics that need an online presence",
      icon: Globe
    },
    {
      title: "Startups & Entrepreneurs",
      description: "New businesses looking to establish their digital footprint",
      icon: TrendingUp
    },
    {
      title: "Existing Businesses",
      description: "Companies wanting to upgrade their outdated websites",
      icon: Code
    },
    {
      title: "Service Providers",
      description: "Freelancers, consultants who need professional websites",
      icon: Briefcase
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "College Student",
      content: "I've earned ₹45,000 in just 3 months by referring local businesses. Perfect side income while studying!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Part-time Hunter",
      content: "The best part is I don't need technical skills. I just find clients and the team handles everything else.",
      rating: 5
    },
    {
      name: "Meera Patel",
      role: "Homemaker",
      content: "This platform gave me financial independence. I work from home and earn more than I expected.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9f8f0]">
      {/* Header */}
      <header className="bg-gradient-to-r from-white via-[#f0f9f0] to-white backdrop-blur-md border-b border-[#e8f0e8]/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0a5c36] to-[#1c8a4e] rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] bg-clip-text text-transparent">HuntEarn</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-colors font-medium">How It Works</a>
              <a href="#who-to-hunt" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-colors font-medium">Who to Hunt</a>
              <a href="#earnings" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-colors font-medium">Earnings</a>
              <a href="#testimonials" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-colors font-medium">Success Stories</a>
            </nav>
            <div className="flex space-x-4">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="px-6 py-2 bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white rounded-xl hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-[#2a7d4f] hover:text-[#0a5c36] transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-6 py-2 bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white rounded-xl hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                  >
                    Start Hunting
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f9f8f0] via-[#e8f0e8]/50 to-[#d9f0d9]/30"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#8fc98f]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#d9f0d9]/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#ffda85]/20 rounded-full blur-lg animate-pulse delay-700"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4 px-6 py-2 bg-[#0a5c36]/10 rounded-full">
              <span className="text-[#0a5c36] font-medium">50% Commission on Every Deal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] bg-clip-text text-transparent">Earn Money</span> By Finding
              <span className="bg-gradient-to-r from-[#1c8a4e] to-[#3ca66e] bg-clip-text text-transparent"> Clients</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#2a7d4f] mb-10 max-w-4xl mx-auto leading-relaxed">
              Perfect for students, homemakers, and part-timers. Find businesses that need websites or digital services, 
              submit them to our platform, and earn <strong>50% commission</strong> on every successful deal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="px-8 py-4 bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white text-lg font-semibold rounded-xl hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                <span>{isAuthenticated ? "Go to Dashboard" : "Become a Hunter"}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="px-8 py-4 border-2 border-[#8fc98f] text-[#2a7d4f] text-lg font-semibold rounded-xl hover:bg-[#8fc98f]/10 transition-all duration-200">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the landing page content */}
      {/* ... existing sections ... */}
      
      {/* CTA Section with Login/Register buttons */}
      <section id="cta" className="py-20 bg-gradient-to-br from-[#0a5c36] to-[#1c8a4e] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffb347]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-3 px-4 py-1.5 bg-white/20 rounded-full">
                <span className="text-white text-sm font-medium">Start Today</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Become a <span className="text-[#ffcc33]">Hunter?</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-xl">
                Join our community of successful hunters and start earning significant commissions with zero investment. It takes less than 2 minutes to sign up!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register"
                  className="bg-white text-[#0a5c36] px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <span>Sign Up Now</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                >
                  <span>Already have an account? Login</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">Quick Registration</h3>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/register'); }}>
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#ffb347] hover:bg-[#ffcc33] text-[#0a5c36] font-medium px-4 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start Hunting Now
                  </button>
                </div>
              </form>
              
              <p className="text-white/80 text-sm mt-4 text-center">
                By signing up, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f9f8f0] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#e8f0e8]">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0a5c36] to-[#1c8a4e] rounded-xl flex items-center justify-center text-white font-bold text-xl mr-2">
                  H
                </div>
                <span className="text-2xl font-bold text-[#0a5c36]">HuntEarn</span>
              </div>
              <p className="text-[#2a7d4f] mb-6 max-w-md">
                The easiest way to earn money by connecting businesses with digital service providers. No technical skills required.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-[#0a5c36]/10 hover:bg-[#0a5c36] text-[#0a5c36] hover:text-white rounded-full flex items-center justify-center transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M22 5.16c-.94.42-1.95.7-3.02.82-1.2-.88-2.91-1.08-4.32-.54-1.4.54-2.36 1.86-2.36 3.36v.5c-3.68-.2-7.1-2-9.36-4.86-.38.66-.6 1.42-.6 2.24 0 1.54.8 2.9 2 3.68-.74-.02-1.44-.24-2.04-.56v.06c0 2.16 1.48 3.96 3.46 4.38-.36.1-.74.14-1.14.14-.28 0-.54-.02-.8-.08.54 1.76 2.12 3.04 4 3.08-1.46 1.18-3.32 1.88-5.34 1.88-.34 0-.68-.02-1.02-.06 1.9 1.24 4.14 1.96 6.54 1.96 7.84 0 12.14-6.68 12.14-12.48 0-.18 0-.38-.02-.56.84-.6 1.56-1.36 2.14-2.22-.76.34-1.58.58-2.46.68.88-.54 1.56-1.4 1.88-2.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#0a5c36]/10 hover:bg-[#0a5c36] text-[#0a5c36] hover:text-white rounded-full flex items-center justify-center transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.5 17.5h-3v-9h3v9zM7 7.25A1.75 1.75 0 1 1 8.75 5.5 1.75 1.75 0 0 1 7 7.25zm11 10.25h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 12 12.35a.66.66 0 0 0 0 .14v5.01H9V8.5h3v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66v5.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#0a5c36]/10 hover:bg-[#0a5c36] text-[#0a5c36] hover:text-white rounded-full flex items-center justify-center transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-[#0a5c36] mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Home</a></li>
                <li><a href="#features" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Features</a></li>
                <li><a href="#how-it-works" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">How It Works</a></li>
                <li><a href="#testimonials" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Testimonials</a></li>
                <li><a href="#faq" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-[#0a5c36] mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Blog</a></li>
                <li><a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Hunter Guide</a></li>
                <li><a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Success Stories</a></li>
                <li><a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Support Center</a></li>
                <li><a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] transition-all duration-300">Webinars</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-[#0a5c36] mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-[#0a5c36] mr-2" />
                  <span className="text-[#2a7d4f]">+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-[#0a5c36] mr-2" />
                  <span className="text-[#2a7d4f]">support@huntern.com</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#0a5c36] mr-2 mt-1" />
                  <span className="text-[#2a7d4f]">123 Tech Park, Bangalore, Karnataka, India - 560001</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#2a7d4f] text-sm mb-4 md:mb-0">
              © 2023 HuntEarn. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] text-sm transition-all duration-300">Privacy Policy</a>
              <a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] text-sm transition-all duration-300">Terms of Service</a>
              <a href="#" className="text-[#2a7d4f] hover:text-[#0a5c36] text-sm transition-all duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 