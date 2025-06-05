
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'your_service_id'; // You'll get this from EmailJS
const EMAILJS_TEMPLATE_ID = 'your_template_id'; // You'll get this from EmailJS
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // You'll get this from EmailJS

// Twilio configuration (using Twilio's REST API)
const TWILIO_ACCOUNT_SID = 'your_account_sid'; // You'll get this from Twilio
const TWILIO_AUTH_TOKEN = 'your_auth_token'; // You'll get this from Twilio
const TWILIO_PHONE_NUMBER = 'your_twilio_phone'; // Your Twilio phone number

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
    console.log('Sending email notification for:', data.productName);
    
    const templateParams = {
      product_name: data.productName,
      expiry_date: data.expiryDate,
      days_left: data.daysLeft,
      user_email: data.userEmail || 'user@example.com',
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
    return false;
  }
};

export const sendSMSNotification = async (data: NotificationData): Promise<boolean> => {
  try {
    console.log('Sending SMS notification for:', data.productName);
    
    const message = `Food Alert: Your ${data.productName} expires in ${data.daysLeft} days (${data.expiryDate}). Use it soon to prevent waste!`;
    
    // Using Twilio's REST API
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`
      },
      body: new URLSearchParams({
        From: TWILIO_PHONE_NUMBER,
        To: data.userPhone || '+1234567890', // Default phone for demo
        Body: message
      })
    });

    if (response.ok) {
      console.log('SMS sent successfully');
      return true;
    } else {
      console.error('Failed to send SMS:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Failed to send SMS:', error);
    return false;
  }
};

// Demo function for immediate testing
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
  alert(`Demo ${type.toUpperCase()} Notification:\n\n${message}`);
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};
