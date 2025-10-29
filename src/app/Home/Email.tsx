'use client'

import Animation from "@/app/Animation/models/spline"
import { useState } from "react"
import axios from "axios";
import {  ArrowUpRight } from 'lucide-react';

type NotificationType = "success" | "error" | "warning";

interface Notification {
  show: boolean;
  message: string;
  type: NotificationType | "";
}

export default function Email() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: '',
    type: ''
  });

  const showNotification = (message: string, type: NotificationType) => {
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
        <div
          className={`fixed top-5 right-5 z-50 rounded-lg shadow-lg px-6 py-4 max-w-md transform transition-all duration-500 animate-fade-in-down
            ${notification.type === 'success'
              ? 'bg-green-600'
              : notification.type === 'error'
              ? 'bg-red-600'
              : 'bg-yellow-600'} text-white`}
        >
          <div className="flex items-center">
            {notification.type === 'success' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
            {notification.type === 'error' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            {notification.type === 'warning' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            )}
            <p className="font-medium">{notification.message}</p>
          </div>

          {/* Close button */}
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            aria-label="Close notification"
            className="absolute top-2 right-2 text-white hover:text-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Only visible on md and larger */}
      <main className="hidden md:block fixed inset-0 overflow-hidden">
        <section className="w-1/2 h-full flex justify-self-end">
          <div className="w-full h-full bg-[#FFDAB3] overflow-hidden">
            <div className="lg:relative lg:top-6">
              <Animation />
            </div>

           <div className="relative px-2 lg:bottom-30  md:bottom-26 ">
  <div
    className="border-white shadow-md border-2 bg-white rounded-md
       lg:h-28 md:h-23    w-full max-w-full"
  >
    <div className="flex items-center h-full relative ">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-full md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl
        text-black   border-white rounded-md
        placeholder:text-center placeholder:text-xs md:placeholder:text-base lg:placeholder:text-lg
        focus:outline-none focus:ring-0 focus:border-white"
        placeholder="Want to contact me? Drop your email here"
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleEmail();
        }}
      />
      <button
        onClick={handleEmail}
        aria-label="Submit email"
        className="absolute right-6 top-1/2 -translate-y-1/2
         border-white focus:border-gray-900 
         bg-white rounded-md flex items-center justify-center
         hover:bg-gray-100 transition-colors p-1"
      >
        <div className="flex items-center justify-center h-full w-full">
          <ArrowUpRight
            size={20}
            className="h-6  lg:h-12 xl:h-14 text-gray-400 transition-all duration-500 ease-out transform hover:text-blue-500 hover:scale-110"
          />
        </div>
      </button>
    </div>
  </div>
</div>

          </div>
        </section>
      </main>
    </>
  )
}