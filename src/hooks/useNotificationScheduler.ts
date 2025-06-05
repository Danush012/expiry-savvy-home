
import { useEffect, useCallback } from 'react';
import { sendEmailNotification, sendSMSNotification, NotificationData } from '../services/notificationService';

interface Product {
  id: number;
  name: string;
  expiryDate: string;
  notificationType: 'email' | 'sms';
  frequency: string;
  userEmail?: string;
  userPhone?: string;
}

export const useNotificationScheduler = (products: Product[]) => {
  const checkExpiryAndNotify = useCallback(async () => {
    console.log('Checking products for notifications...');
    
    for (const product of products) {
      const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);
      const shouldNotify = shouldSendNotification(daysUntilExpiry, product.frequency);
      
      if (shouldNotify) {
        console.log(`Sending ${product.notificationType} notification for ${product.name}`);
        
        const notificationData: NotificationData = {
          productName: product.name,
          expiryDate: product.expiryDate,
          daysLeft: daysUntilExpiry,
          userEmail: product.userEmail,
          userPhone: product.userPhone
        };

        try {
          if (product.notificationType === 'email' && product.userEmail) {
            await sendEmailNotification(notificationData);
            console.log(`Email sent successfully to ${product.userEmail}`);
          } else if (product.notificationType === 'sms' && product.userPhone) {
            await sendSMSNotification(notificationData);
            console.log(`SMS sent successfully to ${product.userPhone}`);
          }
        } catch (error) {
          console.error(`Failed to send ${product.notificationType} notification:`, error);
        }
      }
    }
  }, [products]);

  // Check notifications every hour in production (3600000ms)
  // For testing, you can change this to 60000 (1 minute)
  useEffect(() => {
    if (products.length === 0) return;
    
    // Initial check
    checkExpiryAndNotify();
    
    // Set up interval to check every hour
    const interval = setInterval(checkExpiryAndNotify, 3600000);
    
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
    case 'same_day':
      return daysLeft === 0;
    default:
      return false;
  }
};
