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
      <div className="flex   2xl:p-14   xl:p-12   lg:p-8 relative 2xl:bottom-8 xl:bottom-6 lg:bottom-4 md:p-8 ">
        <div className="relative inline-block   ">
          <Image
            src={Photo}
           
            alt="author"
            className="rounded-full shadow-lg  lg:h-36 lg:w-36  xl:h-42 xl:w-42   2xl:w-42 2xl:h-42   md:w-36 md:h-36  "
          />

          {/* Flag on top of photo */}
          <div className="absolute    z-20">
            <Flag code="IN" className="md:w-12 md:h-8   lg:w-16 lg:h-12 lg:bottom-52   xl:h-16 xl:w-16   2xl:w-16 2xl:h-24 xl:bottom-44  2xl:bottom-48  xl:rounded 2xl:rounded  lg:rounded rounded shadow-lg relative md:bottom-35" />
          </div>
        </div>

        <div className="md:text-2xl  text-black   lg:text-2xl lg:top-12 2xl:text-5xl xl:text-5xl   2xl:top-12 xl:top-12  2xl:left-12 xl:left-14   relative   md:top-12 md:left-8">

          <h2 className="  ">Pradeep!</h2>
          <div className="md:w-32 md:h-28 lg:text-2xl overflow-hidden md:text-sm  text-black">
            <Typing />
          </div>
        </div>









      </div>



      <div className="flex relative  xl:bottom-14 2xl:bottom-18 lg:bottom-4 md:bottom-2 ">

        <div  className="md:ml-10 lg:ml-2 md:text-lg  md:space-y-2 md:pt-4     lg:pl-10 lg:text-xl xl:text-2xl lg:space-y-3 lg:pt-3   2xl:pl-16 2xl:text-xl  2xl:space-y-4  2xl:mb-7 2xl:ml-0 xl:ml-5   ">




          
          <div className="font-semibold text-gray-800 flex items-center space-x-2 ">
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








      </div>



        <div className="relative xl:bottom-10 2xl:bottom-22  md:top-9 lg:top-4">

                  <Social/>


        </div>




       
        



    </main>
  );
}   