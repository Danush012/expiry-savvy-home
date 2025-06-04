
import React, { useState } from 'react';
import { Plus, Trash2, Bell, Mail, MessageSquare } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  expiryDate: string;
  notificationType: 'email' | 'sms';
  frequency: string;
}

const GetNotified = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    expiryDate: '',
    notificationType: 'email' as 'email' | 'sms',
    frequency: '1_week_before'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.expiryDate) {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name,
        expiryDate: formData.expiryDate,
        notificationType: formData.notificationType,
        frequency: formData.frequency
      };
      setProducts([...products, newProduct]);
      setFormData({
        name: '',
        expiryDate: '',
        notificationType: 'email',
        frequency: '1_week_before'
      });
    }
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getStatusColor = (days: number) => {
    if (days < 0) return 'text-red-600 bg-red-50';
    if (days <= 3) return 'text-orange-600 bg-orange-50';
    if (days <= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Bell className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Notified</h1>
          <p className="text-xl text-gray-600">Track your household products and never let them expire again</p>
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Milk, Bread, Medicine"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="notificationType"
                    value="email"
                    checked={formData.notificationType === 'email'}
                    onChange={(e) => setFormData({...formData, notificationType: e.target.value as 'email' | 'sms'})}
                    className="mr-3"
                  />
                  <Mail className="h-6 w-6 text-blue-600 mr-2" />
                  <span>Email</span>
                </label>
                
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="notificationType"
                    value="sms"
                    checked={formData.notificationType === 'sms'}
                    onChange={(e) => setFormData({...formData, notificationType: e.target.value as 'email' | 'sms'})}
                    className="mr-3"
                  />
                  <MessageSquare className="h-6 w-6 text-green-600 mr-2" />
                  <span>SMS</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="1_month_before">1 Month Before</option>
                <option value="1_week_before">1 Week Before</option>
                <option value="5_days_before">5 Days Before</option>
                <option value="2_days_before">2 Days Before</option>
                <option value="1_day_before">1 Day Before</option>
                <option value="5_minutes_before">5 Minutes Before</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </form>
        </div>

        {/* Products List */}
        {products.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Tracked Products</h2>
            
            <div className="space-y-4">
              {products.map((product) => {
                const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);
                const statusColor = getStatusColor(daysUntilExpiry);
                
                return (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-600">Expires: {new Date(product.expiryDate).toLocaleDateString()}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                            {daysUntilExpiry < 0 
                              ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                              : daysUntilExpiry === 0 
                              ? 'Expires today'
                              : `${daysUntilExpiry} days left`
                            }
                          </span>
                          <span className="text-sm text-gray-500">
                            via {product.notificationType === 'email' ? 'Email' : 'SMS'}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetNotified;
