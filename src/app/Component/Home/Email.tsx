'use client'

import { useState } from "react"
import axios from "axios";

export default function Email() {

  const [email, setEmail] = useState('');

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  const showNotification = (message: string, type: string) => {
    setNotification({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/email/saveEmail', { email });

      if (response.data.success) {
        showNotification("Thank you! Your email has been saved successfully", "success");
        setEmail('');
      } else if (response.data.message?.includes('already exists')) {
        showNotification("This email is already registered with us", "warning");
      } else {
        showNotification("Thank you for your interest!", "success");
      }
    } catch (error) {
      console.error('Error saving email:', error);
      showNotification("Something went wrong. Please try again later", "error");
    }
  };

  return (
    <>
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 rounded-lg shadow-lg px-6 py-4 max-w-md transform transition-all duration-500 animate-fade-in-down
          ${notification.type === 'success' ? 'bg-green-600' :
            notification.type === 'error' ? 'bg-red-600' :
              'bg-yellow-600'} text-white`}>
          <div className="flex items-center">
            {notification.type === 'success' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {notification.type === 'error' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {notification.type === 'warning' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <p className="font-medium">{notification.message}</p>
          </div>
          <button type='submit'
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className="absolute top-2 right-2 text-white hover:text-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
