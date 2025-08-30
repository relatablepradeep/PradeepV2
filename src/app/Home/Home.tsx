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
    <main className="fixed left-0 w-1/2 h-screen hidden md:block bg-amber-50">
      <div className="flex p-3  ">
        <div className="relative inline-block">
          <Image
            src={Photo}
            width={150}
            height={150}
            alt="author"
            className="rounded-full shadow-lg  lg:h-52 lg:w-52"
          />

          {/* Flag on top of photo */}
          <div className="absolute    z-20">
            <Flag code="IN" className="md:w-12 md:h-8   lg:w-16 lg:h-12 lg:bottom-52 lg:rounded rounded shadow-lg relative md:bottom-37" />
          </div>
        </div>

        <div className="md:text-2xl text-black    relative   md:top-16 md:left-6">

          <h2 className="  ">Pradeep!</h2>
           <div className="md:w-32 md:h-28 overflow-hidden text-sm text-black">
            <Typing />
          </div>
        </div>


        

      




      </div>


        
    </main>
  );
}   