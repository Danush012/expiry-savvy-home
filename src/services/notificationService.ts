
import emailjs from '@emailjs/browser';

// REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
const EMAILJS_SERVICE_ID = 'service_your_id'; // Replace with your EmailJS service ID from step 3
const EMAILJS_TEMPLATE_ID = 'template_your_id'; // Replace with your EmailJS template ID from step 4  
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // Replace with your EmailJS public key from step 5

export interface NotificationData {
  productName: string;
  expiryDate: string;
  daysLeft: number;
  userEmail?: string;
  userPhone?: string;
}

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendEmailNotification = async (data: NotificationData): Promise<boolean> => {
  try {
    console.log('Sending email notification to:', data.userEmail);
    
    const templateParams = {
      to_email: data.userEmail,
      to_name: 'User',
      product_name: data.productName,
      expiry_date: data.expiryDate,
      days_left: data.daysLeft,
      message: `Your ${data.productName} will expire in ${data.daysLeft} days on ${data.expiryDate}. Please use it soon!`
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email notification');
  }
};

export const sendSMSNotification = async (data: NotificationData): Promise<boolean> => {
  try {
    console.log('Sending SMS notification to:', data.userPhone);
    
    const message = `Food Alert: Your ${data.productName} expires in ${data.daysLeft} days (${data.expiryDate}). Use it soon to prevent waste!`;
    
    // Using a serverless function approach for SMS
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.userPhone,
        message: message
      })
    });

    if (response.ok) {
      console.log('SMS sent successfully');
      return true;
    } else {
      const errorText = await response.text();
      console.error('Failed to send SMS:', errorText);
      throw new Error('Failed to send SMS notification');
    }
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw new Error('Failed to send SMS notification');
  }
};

// Demo function that shows what notifications would look like
export const sendDemoNotification = (data: NotificationData, type: 'email' | 'sms'): void => {
  const message = `${type.toUpperCase()} NOTIFICATION: Your ${data.productName} expires in ${data.daysLeft} days (${data.expiryDate}). Use it soon!`;
  
  // Show browser notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Food Expiry Alert', {
      body: message,
      icon: '/favicon.ico'
    });
  }
  
  // Log to console for demo
  console.log(`📱 ${type.toUpperCase()} SENT:`, message);
  
  // Show alert for immediate feedback
  alert(`Demo ${type.toUpperCase()} Notification:\n\nTo: ${type === 'email' ? data.userEmail : data.userPhone}\n\n${message}`);
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};
