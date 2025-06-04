
import { useState } from "react";
import { Bell, Calendar, Mail, MessageSquare, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const GetNotified = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    expiryDate: "",
    notificationType: "email",
    frequency: "1-week"
  });

  const frequencies = [
    { value: "1-month", label: "1 Month Before" },
    { value: "1-week", label: "1 Week Before" },
    { value: "5-days", label: "5 Days Before" },
    { value: "2-days", label: "2 Days Before" },
    { value: "1-day", label: "1 Day Before" },
    { value: "5-mins", label: "5 Minutes Before" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.productName || !formData.expiryDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);
    setFormData({
      productName: "",
      expiryDate: "",
      notificationType: "email",
      frequency: "1-week"
    });

    toast({
      title: "Product Added!",
      description: `${newProduct.productName} has been added to your tracking list.`
    });
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product Removed",
      description: "Product has been removed from your tracking list."
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Bell className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get Notified
            </h1>
            <p className="text-xl text-gray-600">
              Track your products and receive timely notifications before they expire
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Product Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Plus className="h-6 w-6 text-green-600 mr-2" />
                Add New Product
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Milk, Bread, Yogurt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notification Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value="email"
                        checked={formData.notificationType === "email"}
                        onChange={(e) => setFormData({...formData, notificationType: e.target.value})}
                        className="mr-3"
                      />
                      <Mail className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value="sms"
                        checked={formData.notificationType === "sms"}
                        onChange={(e) => setFormData({...formData, notificationType: e.target.value})}
                        className="mr-3"
                      />
                      <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
                      <span>SMS</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notification Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {frequencies.map(freq => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
                >
                  Add Product
                </button>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                Your Products ({products.length})
              </h2>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No products added yet</p>
                  <p className="text-sm text-gray-400">Add your first product to start tracking</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {products.map((product) => {
                    const daysLeft = getDaysUntilExpiry(product.expiryDate);
                    const isExpiringSoon = daysLeft <= 7;
                    const isExpired = daysLeft < 0;

                    return (
                      <div
                        key={product.id}
                        className={`p-4 rounded-lg border-2 ${
                          isExpired 
                            ? 'border-red-300 bg-red-50' 
                            : isExpiringSoon 
                            ? 'border-yellow-300 bg-yellow-50' 
                            : 'border-green-300 bg-green-50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{product.productName}</h3>
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Expires: {formatDate(product.expiryDate)}</p>
                          <p>
                            {isExpired 
                              ? `Expired ${Math.abs(daysLeft)} days ago` 
                              : `${daysLeft} days remaining`
                            }
                          </p>
                          <p>Notifications: {product.notificationType.toUpperCase()}</p>
                          <p>Frequency: {frequencies.find(f => f.value === product.frequency)?.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetNotified;
