import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Bell, Mail, MessageSquare, Settings, Send } from 'lucide-react';
import { useNotificationScheduler } from '../hooks/useNotificationScheduler';
import { requestNotificationPermission, sendEmailNotification, sendSMSNotification } from '../services/notificationService';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  expiryDate: string;
  notificationType: 'email' | 'sms';
  frequency: string;
  userEmail?: string;
  userPhone?: string;
}

const GetNotified = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    expiryDate: '',
    notificationType: 'email' as 'email' | 'sms',
    frequency: '1_week_before',
    userEmail: '',
    userPhone: ''
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();

  // Initialize notification scheduler
  useNotificationScheduler(products);

  useEffect(() => {
    // Request notification permission on component mount
    requestNotificationPermission().then(setNotificationsEnabled);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.expiryDate) {
      toast({
        title: "Error",
        description: "Please fill in product name and expiry date.",
        variant: "destructive",
      });
      return;
    }

    if (formData.notificationType === 'email' && !formData.userEmail) {
      toast({
        title: "Error",
        description: "Please provide an email address for email notifications.",
        variant: "destructive",
      });
      return;
    }

    if (formData.notificationType === 'sms' && !formData.userPhone) {
      toast({
        title: "Error",
        description: "Please provide a phone number for SMS notifications.",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      expiryDate: formData.expiryDate,
      notificationType: formData.notificationType,
      frequency: formData.frequency,
      userEmail: formData.userEmail || undefined,
      userPhone: formData.userPhone || undefined
    };
    
    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      expiryDate: '',
      notificationType: 'email',
      frequency: '1_week_before',
      userEmail: '',
      userPhone: ''
    });
    
    toast({
      title: "Product Added",
      description: `${formData.name} has been added to your tracking list with ${formData.notificationType} notifications.`,
    });
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const testNotification = async (product: Product) => {
    const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);
    
    try {
      if (product.notificationType === 'email' && product.userEmail) {
        await sendEmailNotification({
          productName: product.name,
          expiryDate: product.expiryDate,
          daysLeft: daysUntilExpiry,
          userEmail: product.userEmail
        });
        toast({
          title: "Test Email Sent",
          description: `Test email notification sent to ${product.userEmail}`,
        });
      } else if (product.notificationType === 'sms' && product.userPhone) {
        await sendSMSNotification({
          productName: product.name,
          expiryDate: product.expiryDate,
          daysLeft: daysUntilExpiry,
          userPhone: product.userPhone
        });
        toast({
          title: "Test SMS Sent",
          description: `Test SMS notification sent to ${product.userPhone}`,
        });
      }
    } catch (error) {
      toast({
        title: "Test Failed",
        description: `Failed to send test notification: ${error}`,
        variant: "destructive",
      });
    }
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
          
          {/* Notification Status */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <Bell className={`h-5 w-5 ${notificationsEnabled ? 'text-green-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${notificationsEnabled ? 'text-green-600' : 'text-gray-600'}`}>
                Browser notifications {notificationsEnabled ? 'enabled' : 'disabled'}
              </span>
            </div>
          </div>
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

            {/* Email Input - Show only when email is selected */}
            {formData.notificationType === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            )}

            {/* Phone Input - Show only when SMS is selected */}
            {formData.notificationType === 'sms' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.userPhone}
                  onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+1234567890"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Include country code (e.g., +1 for US)</p>
              </div>
            )}

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
                <option value="same_day">Same Day</option>
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
                            via {product.notificationType === 'email' ? `Email (${product.userEmail})` : `SMS (${product.userPhone})`}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => testNotification(product)}
                          className="text-blue-600 hover:text-blue-800 p-2 flex items-center space-x-1"
                          title="Send test notification"
                        >
                          <Send className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
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

export default GetNotified;
