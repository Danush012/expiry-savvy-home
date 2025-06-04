
import { Bell, Calendar, Mail, MessageSquare, Shield, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Tracking",
      description: "Add products with expiry dates and let our system track them automatically"
    },
    {
      icon: Bell,
      title: "Custom Notifications",
      description: "Get alerts via email or SMS based on your preferred frequency"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your tracker anywhere with our responsive design"
    },
    {
      icon: Shield,
      title: "Protect Wildlife",
      description: "Prevent animals from consuming expired products that could harm them"
    },
    {
      icon: Mail,
      title: "Email Alerts",
      description: "Receive timely email notifications before products expire"
    },
    {
      icon: MessageSquare,
      title: "SMS Notifications",
      description: "Get instant SMS alerts on your mobile device"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How ExpiryTracker Helps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive tracking system ensures you never waste food again
            while protecting our environment and animal friends.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <feature.icon className="h-12 w-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
