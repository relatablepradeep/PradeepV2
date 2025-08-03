'use client';

import Image from 'next/image';
import Photo from '../../../public/photo.png';
import Flag from 'react-world-flags';
import Typing from '@/app/Animation/Typing/Typing';
import { Mail, MapPin, Code } from 'lucide-react';
import { useState } from 'react';

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
    <main className="fixed top-0 left-0 w-1/2 h-screen">
      <section className="w-full h-full bg-amber-50 flex justify-center items-center">
        <div>
          {/* Bottom-right notification */}
          {copied && (
            <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50">
              Email copied!
            </div>
          )}

          <span className="text-black flex justify-center items-center lg:relative lg:bottom-60">
            <div className="flex justify-end">
              <Flag code="IN" className="lg:w-20 z-10 relative right-36 bottom-8" />

              <Image
                src={Photo}
                width={250}
                height={250}
                alt="Picture of the author"
                className="rounded-full z-5 relative right-56 top-16"
              />
            </div>

            <div className="flex relative right-48 top-24 text-6xl font-bold">
              Pradeep!
            </div>

            <button className="mr-42 absolute mt-80">
              <Typing />
            </button>
          </span>

          <div className="absolute   left-12 space-y-4 ">

            <div className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Freelancer</span>
            </div>

            <div className="flex items-center text-gray-700 space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Uttarakhand</span>
            </div>

           
            <div className="flex items-center space-x-2">
              <Mail
                className="w-4 h-4 text-blue-600 cursor-pointer hover:scale-110 transition"
                title="Open email app"
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
        </div>
      </section>
    </main>
  );
}
