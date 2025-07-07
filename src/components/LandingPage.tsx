import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ShinyText from './ShinyText';
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
  MapPin,
  Compass,
  Eye
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const features = [
    {
      icon: Eye,
      title: "Spot Opportunities",
      description: "Develop a keen eye for businesses that need digital services in your territory"
    },
    {
      icon: DollarSign,
      title: "Claim Your Bounty",
      description: "Earn 50% commission on every business you bring to Leo's kingdom"
    },
    {
      icon: Shield,
      title: "Leo Handles The Rest",
      description: "Once you track down a lead, Leo's pride takes over the technical work"
    },
    {
      icon: Compass,
      title: "Hunt On Your Terms",
      description: "Perfect for explorers who want to set their own path and hunting schedule"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Scout the Jungle",
      description: "Identify businesses in need of websites or digital services in your territory",
      icon: Target
    },
    {
      number: "02",
      title: "Mark Your Prey",
      description: "Approach them about Leo's services and submit their details through our platform",
      icon: MessageCircle
    },
    {
      number: "03",
      title: "Leo's Pride Takes Over",
      description: "Our team follows up, provides quotes, and manages the entire project",
      icon: UserCheck
    },
    {
      number: "04",
      title: "Feast on Rewards",
      description: "Once the client pays for the completed project, you receive your 50% bounty",
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
      role: "Student Hunter",
      content: "I've earned ₹45,000 in just 3 months by tracking down local businesses. Perfect hunting grounds while studying!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Weekend Hunter",
      content: "I don't need to know the technical jungle. I just spot the prey and Leo's pride handles everything else.",
      rating: 5
    },
    {
      name: "Meera Patel",
      role: "Territory Guardian",
      content: "This kingdom gave me financial independence. I patrol my territory from home and earn more than I expected.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#21242b] text-white">
      {/* Header */}
      <header className="bg-[#21242b]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/logolion.png" alt="LeoPay Logo" className="w-10 h-10" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">LeoPay</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-[#C19345] transition-colors font-medium">How It Works</a>
              <a href="#who-to-hunt" className="text-gray-300 hover:text-[#C19345] transition-colors font-medium">Who to Hunt</a>
              <a href="#earnings" className="text-gray-300 hover:text-[#C19345] transition-colors font-medium">Earnings</a>
              <a href="#testimonials" className="text-gray-300 hover:text-[#C19345] transition-colors font-medium">Success Stories</a>
            </nav>
            <div className="flex space-x-4">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="px-6 py-2 bg-gradient-to-r from-[#C19345] to-[#dbb36b] text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 shadow-md font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-gray-300 hover:text-[#C19345] transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-6 py-2 bg-gradient-to-r from-[#C19345] to-[#dbb36b] text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 shadow-md font-medium"
                  >
                    Start Earning
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/lionherovideo.mp4" type="video/mp4" />
            {/* Fallback to image if video fails to load */}
            <img 
              src="/herolion.jpg" 
              alt="Majestic Lion" 
              className="w-full h-full object-cover object-center"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#21242b]/70 via-transparent to-[#21242b]/70"></div>
        </div>
        
        {/* Animated Gold Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#C19345]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#dbb36b]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-[#e6d5a5]/15 rounded-full blur-2xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-[#C19345]/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
        
        {/* Gold Border Accents */}
        <div className="absolute top-8 left-8 right-8 bottom-8 border-[1px] border-[#C19345]/20 rounded-3xl pointer-events-none"></div>
        
        {/* Main Title - Bottom left aligned with prominent "You Hunt" */}
        <div className="absolute bottom-20 left-8 md:left-16 lg:left-24 z-20">
          <h1 className="font-bold leading-tight drop-shadow-xl">
            <span className="block mb-2 text-7xl md:text-9xl">
              <ShinyText 
                text="You Hunt." 
                className="bg-gradient-to-r from-[#e6d5a5] to-[#f0e3c0] bg-clip-text text-transparent" 
                speed={3} 
              />
            </span> 
            <span className="block text-5xl md:text-7xl">
              <ShinyText 
                text="Leo Pays." 
                className="bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent" 
                speed={3} 
              />
            </span>
          </h1>
        </div>
        
        {/* Bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#282c34] to-transparent"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#282c34]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">
                Why Join Leo's Kingdom?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The jungle is vast, but the rewards for skilled hunters are even greater
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#21242b] p-8 rounded-2xl shadow-lg border border-gray-800 hover:shadow-xl transition-all duration-300 hover:border-[#C19345]/30"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#C19345]/10 to-[#dbb36b]/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#e6d5a5]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#21242b] to-[#282c34]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-3 px-4 py-1.5 bg-[#C19345]/10 rounded-full">
              <span className="text-[#e6d5a5] text-sm font-medium">The Hunt Guide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How The Hunt Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four simple steps to become a successful Hunter in Leo's kingdom
            </p>
          </div>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
            {/* Step 1 - Large Tile */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#21242b]/95 to-[#282c34]/95 backdrop-blur-sm p-8 rounded-3xl border border-[#C19345]/20 hover:border-[#C19345]/40 transition-all shadow-lg hover:shadow-2xl group relative overflow-hidden">
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-[#C19345] to-[#dbb36b] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg z-10">
                01
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-[#C19345]/5 to-transparent rounded-full blur-2xl transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative pt-14 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-[#C19345]/10 to-[#dbb36b]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-[#e6d5a5]" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-[#e6d5a5] transition-colors">Scout the Jungle</h3>
                <p className="text-xl text-gray-400 group-hover:text-gray-300 transition-colors">
                  Identify businesses in need of websites or digital services in your territory. Look for outdated sites, missing online presence, or businesses ready to expand.
                </p>
                <div className="mt-auto pt-6">
                  <span className="text-[#C19345] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn scouting tips <ArrowRight className="w-4 h-4 group-hover:animate-pulse" />
                  </span>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gradient-to-br from-[#21242b]/95 to-[#282c34]/95 backdrop-blur-sm p-6 rounded-3xl border border-[#C19345]/20 hover:border-[#C19345]/40 transition-all shadow-lg hover:shadow-2xl group relative overflow-hidden">
              <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-br from-[#C19345] to-[#dbb36b] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                02
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C19345]/5 to-transparent rounded-full blur-2xl transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative pt-10 h-full flex flex-col">
                <div className="w-14 h-14 bg-gradient-to-br from-[#C19345]/10 to-[#dbb36b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-[#e6d5a5]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#e6d5a5] transition-colors">Convince Your Prey</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Persuade businesses about Leo's services and their benefits before submitting their details through our platform
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-gradient-to-br from-[#21242b]/95 to-[#282c34]/95 backdrop-blur-sm p-6 rounded-3xl border border-[#C19345]/20 hover:border-[#C19345]/40 transition-all shadow-lg hover:shadow-2xl group relative overflow-hidden">
              <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-br from-[#C19345] to-[#dbb36b] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                03
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C19345]/5 to-transparent rounded-full blur-2xl transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative pt-10 h-full flex flex-col">
                <div className="w-14 h-14 bg-gradient-to-br from-[#C19345]/10 to-[#dbb36b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-7 h-7 text-[#e6d5a5]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#e6d5a5] transition-colors">Leo's Pride Takes Over</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Our team follows up, provides quotes, and manages the entire project
                </p>
              </div>
            </div>
            
            {/* Step 4 - Wider Tile */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#21242b]/95 to-[#282c34]/95 backdrop-blur-sm p-6 rounded-3xl border border-[#C19345]/20 hover:border-[#C19345]/40 transition-all shadow-lg hover:shadow-2xl group relative overflow-hidden">
              <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-br from-[#C19345] to-[#dbb36b] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                04
              </div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-[#C19345]/5 to-transparent rounded-full blur-2xl transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative pt-10 flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#C19345]/10 to-[#dbb36b]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-[#e6d5a5]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#e6d5a5] transition-colors">Feast on Rewards</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Once the client pays for the completed project, you receive your 50% bounty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-br from-[#C19345] to-[#dbb36b] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e6d5a5]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-3 px-4 py-1.5 bg-white/20 rounded-full">
                <span className="text-white text-sm font-medium">Join The Hunt Today</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Join <span className="text-[#fff8e6]">Leo's Pride?</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-xl">
                Join our community of successful Hunters and start tracking down businesses that need digital services. The jungle is vast, and the rewards are waiting.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register"
                  className="bg-white text-[#C19345] px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <span>Begin Your Hunt</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                >
                  <span>Return to the Pride</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">The Hunter's Advantage</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#fff8e6] mr-3 flex-shrink-0" />
                  <span className="text-white">No hunting skills or technical knowledge required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#fff8e6] mr-3 flex-shrink-0" />
                  <span className="text-white">Hunt from anywhere, anytime in your territory</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#fff8e6] mr-3 flex-shrink-0" />
                  <span className="text-white">Earn 50% of the bounty on every successful hunt</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#fff8e6] mr-3 flex-shrink-0" />
                  <span className="text-white">Rewards delivered directly to your account</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#fff8e6] mr-3 flex-shrink-0" />
                  <span className="text-white">Full hunting training and support provided</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#282c34] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                  <img src="/logolion.png" alt="LeoPay Logo" className="w-10 h-10" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#C19345] to-[#dbb36b] bg-clip-text text-transparent">LeoPay</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting businesses with digital services while helping hunters earn their rightful bounty.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-[#C19345]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#C19345]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#C19345]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">The Kingdom</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">About Leo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Join the Pride</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Hunter Stories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Territory Map</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Hunter Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Hunting Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Training Grounds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Tracking Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Hunter Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Jungle Law</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Terms of the Hunt</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Privacy Grounds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#C19345]">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} LeoPay - The King of the Digital Jungle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 