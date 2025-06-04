
import { TrendingUp, Users, Leaf, AlertTriangle } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: AlertTriangle,
      number: "1.3B",
      label: "Tons of food wasted globally per year",
      color: "text-red-600"
    },
    {
      icon: Leaf,
      number: "8-10%",
      label: "Of global greenhouse gases from food waste",
      color: "text-green-600"
    },
    {
      icon: Users,
      number: "828M",
      label: "People facing hunger worldwide",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      number: "$1T",
      label: "Economic losses from food waste annually",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Problem We're Solving
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Food waste is one of the world's biggest environmental challenges. 
            Together, we can make a significant impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
