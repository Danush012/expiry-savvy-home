
import { Target, Zap, Shield, Users, CheckCircle, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To reduce household food waste and protect our environment by providing smart expiry tracking solutions."
    },
    {
      icon: Zap,
      title: "How It Works",
      description: "Simply add your products with expiry dates, choose notification preferences, and receive timely alerts."
    },
    {
      icon: Shield,
      title: "Environmental Impact",
      description: "Prevent food waste, reduce pollution, and protect animals from consuming expired products."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of users making a difference in their communities and the environment."
    }
  ];

  const trackableProducts = [
    "Dairy Products (Milk, Cheese, Yogurt)",
    "Fresh Produce (Fruits, Vegetables)",
    "Meat & Poultry",
    "Seafood & Fish",
    "Baked Goods (Bread, Pastries)",
    "Canned & Packaged Foods",
    "Frozen Items",
    "Beverages & Juices",
    "Condiments & Sauces",
    "Baby Food & Formula",
    "Pet Food",
    "Medicines & Supplements"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Heart className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About ExpiryTracker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to create a world where food waste is minimized, 
              animals are protected, and our environment thrives.
            </p>
          </div>

          {/* Mission Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <feature.icon className="h-12 w-12 text-green-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* How ExpiryTracker Works */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How ExpiryTracker Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Add Products</h3>
                <p className="text-gray-600">
                  Enter your household products along with their expiry dates into our easy-to-use system.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Set Preferences</h3>
                <p className="text-gray-600">
                  Choose how you want to be notified (email/SMS) and when (frequency of alerts).
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Notified</h3>
                <p className="text-gray-600">
                  Receive timely alerts before products expire, helping you use them in time.
                </p>
              </div>
            </div>
          </div>

          {/* Trackable Products */}
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What Products Can You Track?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trackableProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-white">{product}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-blue-100 text-lg">
                And many more! If it has an expiry date, we can track it.
              </p>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Environmental Impact
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Problem</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Expired food thrown on roads attracts and harms street animals
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Rotting food emits methane and other harmful gases
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Food waste contributes to air and soil pollution
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Wastage leads to increased production demands
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Solution</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Timely notifications prevent food from expiring unused
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Reduces the amount of expired food disposed improperly
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Protects street animals from consuming harmful expired food
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Minimizes greenhouse gas emissions from food waste
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
