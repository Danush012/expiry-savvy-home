
import { useEffect, useCallback } from 'react';
import { sendEmailNotification, sendSMSNotification, sendDemoNotification, NotificationData } from '../services/notificationService';

interface Product {
  id: number;
  name: string;
  expiryDate: string;
  notificationType: 'email' | 'sms';
  frequency: string;
}

export const useNotificationScheduler = (products: Product[]) => {
  const checkExpiryAndNotify = useCallback(async () => {
    console.log('Checking products for notifications...');
    
    products.forEach(async (product) => {
      const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);
      const shouldNotify = shouldSendNotification(daysUntilExpiry, product.frequency);
      
      if (shouldNotify) {
        console.log(`Sending notification for ${product.name}`);
        
        const notificationData: NotificationData = {
          productName: product.name,
          expiryDate: product.expiryDate,
          daysLeft: daysUntilExpiry,
          userEmail: 'user@example.com', // Replace with actual user email
          userPhone: '+1234567890' // Replace with actual user phone
        };

        // For demo purposes, use demo notifications
        // In production, use the actual email/SMS services
        sendDemoNotification(notificationData, product.notificationType);
        
        // Uncomment these for production:
        // if (product.notificationType === 'email') {
        //   await sendEmailNotification(notificationData);
        // } else {
        //   await sendSMSNotification(notificationData);
        // }
      }
    });
  }, [products]);

  // Check notifications every minute (for demo purposes)
  useEffect(() => {
    if (products.length === 0) return;
    
    // Initial check
    checkExpiryAndNotify();
    
    // Set up interval to check every minute
    const interval = setInterval(checkExpiryAndNotify, 60000);
    
    return () => clearInterval(interval);
  }, [checkExpiryAndNotify]);

  return { checkExpiryAndNotify };
};

const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const shouldSendNotification = (daysLeft: number, frequency: string): boolean => {
  switch (frequency) {
    case '1_month_before':
      return daysLeft === 30;
    case '1_week_before':
      return daysLeft === 7;
    case '5_days_before':
      return daysLeft === 5;
    case '2_days_before':
      return daysLeft === 2;
    case '1_day_before':
      return daysLeft === 1;
    case '5_minutes_before':
      return daysLeft === 0; // For demo, treat as same day
    default:
      return false;
  }
};
