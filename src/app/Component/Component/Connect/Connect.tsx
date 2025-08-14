'use client'

import Animation from "@/app/Animation/Spline"
import { useState } from "react"
import axios from "axios";

export default function Email() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '' // 'success', 'error', or 'warning'
  });

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
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
      {/* Notification Popup */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 rounded-lg shadow-lg px-4 py-3 max-w-xs sm:max-w-md transform transition-all duration-500 animate-fade-in-down
                        ${notification.type === 'success' ? 'bg-green-600' :
                          notification.type === 'error' ? 'bg-red-600' :
                          'bg-yellow-600'} text-white`}>
          <div className="flex items-center">
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <main className="w-full">
        <section className="flex flex-col lg:flex-row w-full bg-[#FFDAB3]">
          {/* Animation */}
          <div className="w-full flex justify-center items-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              <Animation />
            </div>
          </div>

          {/* Email Input */}
          <div className="w-full flex justify-center items-center px-4 pb-8 lg:pb-0">
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-md shadow-md border-2 border-white h-14 sm:h-16 md:h-20 flex items-center px-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-full px-2 text-sm sm:text-base md:text-lg placeholder:text-xs sm:placeholder:text-sm text-black focus:outline-none"
                  placeholder="Want to contact me? Drop your email here"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleEmail();
                  }}
                />
                <button
                  onClick={handleEmail}
                  className="ml-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  <img
                    src="/icons8-arrow-50.png"
                    className="h-6 sm:h-8 md:h-10"
                    alt="Submit"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
