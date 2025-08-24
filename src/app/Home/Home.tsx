'use client';

import Image from 'next/image';
import Photo from '../../../public/photo.png';
import Flag from 'react-world-flags';
import Typing from '@/app/Animation/Typing/Typing';
import { Mail, MapPin, Code } from 'lucide-react';
import { useState } from 'react';
import Social from '../Component/Social/Social';

export default function MyHome() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText('okiepradeep@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailAppRedirect = () => {
    window.location.href = 'mailto:okiepradeep@gmail.com';
  };

  return (
    
    <main className="fixed top-0 left-0 md:w-1/2 w-full h-screen hidden md:block">
      <section className="w-full h-full bg-amber-50 flex justify-center items-center">
        <div>
          {/* Notification */}
          {copied && (
            <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50">
              Email copied!
            </div>
          )}

          {/* Image + Flag + Name */}
          <span
            className="
              text-black flex justify-center items-center 
              lg:relative lg:bottom-52 
              // md:relative md:bottom-32
            "
          >
            <div className="flex ">
              <Flag
                code="IN"
                className="
                  z-10 
                  lg:w-12 lg:right-32
                  md:w-16 md:right-24
                  relative 
                "
              />
              <Image
                src={Photo}
                width={150}
                height={150}
                alt="Picture of the author"
                className="
                  rounded-full z-5 
                  lg:right-45 lg:top-16
                  md:right-36 md:top-12
                  relative
                "
              />
            </div>

            <div
              className="
                flex font-bold 
                lg:right-36 lg:top-16 lg:text-5xl
                md:right-28 md:top-16 md:text-5xl
                relative
              "
            >
              Pradeep!
            </div>

            <button
              aria-label="Typing animation button"
              className="
                absolute
                lg:mt-60
                md:mt-64
              "
            >
              <Typing />
            </button>
          </span>
        </div>

        {/* Info Section */}
        <div
          className="
            absolute 
            lg:left-14 lg:space-y-4 lg:mt-8 lg:text-xl
            md:left-10 md:space-y-3 md:mt-14 md:text-lg
          "
        >
          <div className="font-semibold text-gray-800 flex items-center space-x-2">
            <Code className="w-4 h-4" aria-label="Role" />
            <span>Freelancer</span>
          </div>

          <div className="flex items-center text-gray-700 space-x-2">
            <MapPin className="w-4 h-4" aria-label="Location" />
            <span>Uttarakhand</span>
          </div>

          <div className="flex items-center space-x-2">
            <Mail
              className="w-4 h-4 text-blue-600 cursor-pointer hover:scale-110 transition"
              aria-label="Open email app"
              onClick={handleEmailAppRedirect}
            />
            <span
              onClick={handleEmailClick}
              className="text-blue-600 cursor-pointer hover:underline"
              title="Click to copy email"
            >
              okiepradeep@gmail.com
            </span>
          </div>
        </div>

        {/* Social */}
        <div className="fixed lg:bottom-1">
          <Social />
        </div>
      </section>
    </main>
  );
}
