'use client';


import Aboutus from "../AboutMe/Aboutus";
import Connect from '../Connect/Connect'

import { useState } from "react";

const AboutMe = () => (
  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
    <div className="space-y-4 text-gray-700">
      <p className="leading-relaxed">
        Hello! I'm a passionate developer with a love for creating beautiful and functional web experiences.
        My journey in technology started several years ago, and I've been continuously learning and growing ever since.
      </p>
      <p className="leading-relaxed">
        I specialize in modern web technologies like React, Next.js, and Node.js. When I'm not coding,
        you can find me exploring new design trends, reading tech blogs, or working on personal projects.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-3 rounded-md shadow-sm">
          <h4 className="font-semibold text-sm text-gray-600">Experience</h4>
          <p className="text-lg font-bold text-indigo-600">3+ Years</p>
        </div>
        <div className="bg-white p-3 rounded-md shadow-sm">
          <h4 className="font-semibold text-sm text-gray-600">Projects</h4>
          <p className="text-lg font-bold text-indigo-600">20+ Done</p>
        </div>
      </div>
    </div>
  </div>
);

const Blog = () => (
  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog</h2>
   
  </div>
);



export default function Nav() {
  const [activeTab, setActiveTab] = useState("About Me");
  const tabs = ["About Me", "Blog", "Connect"];

  const renderContent = () => {
    switch (activeTab) {
      case "About Me":
        return <Aboutus />;
      case "Blog":
        return <Blog />;
      case "Connect":
        return <Connect />;
      default:
        return <Aboutus />;
    }
  };

  return (
    <div className="block md:hidden bg-white w-full relative ">
      {/* Tabs navigation */}
      <nav className=" py-3 px-3">
        <div className="flex justify-center">
          <div className="flex space-x-14 relative">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[140%] h-1 bg-indigo-600 rounded-full transition-all duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="">{renderContent()}</main>
    </div>
  );
}
