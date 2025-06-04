
import { ArrowRight, Shield, Bell, Recycle } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Wasting
              <span className="text-green-600"> Food</span>,
              <br />
              Start Saving
              <span className="text-blue-600"> Lives</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Track your household products' expiry dates and get timely notifications. 
              Prevent food waste, protect animals, and reduce environmental pollution 
              with our smart tracking system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/get-notified" 
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Start Tracking</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/about" 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Shield className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Protect Animals</h3>
                  <p className="text-gray-600 text-sm">Prevent expired food from harming street animals</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <Recycle className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Reduce Pollution</h3>
                  <p className="text-gray-600 text-sm">Stop harmful gases from rotting food</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-8">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Bell className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Smart Alerts</h3>
                  <p className="text-gray-600 text-sm">Get notified before products expire</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <p className="text-sm opacity-90">Food waste reduction potential</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
