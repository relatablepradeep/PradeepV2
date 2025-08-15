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
    <div className="space-y-4">
      {[
        {
          title: "Getting Started with Next.js 14",
          date: "Aug 10, 2025",
          excerpt: "Exploring the latest features in Next.js 14 and how they can improve your development workflow..."
        },
        {
          title: "Building Responsive Components",
          date: "Aug 5, 2025",
          excerpt: "Best practices for creating mobile-first components that work across all device sizes..."
        },
        {
          title: "State Management in React",
          date: "Jul 28, 2025",
          excerpt: "A deep dive into various state management solutions and when to use each one..."
        }
      ].map((post, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500">
          <h3 className="font-semibold text-gray-800 mb-1">{post.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{post.date}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
          <button className="mt-2 text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
            Read more →
          </button>
        </div>
      ))}
    </div>
  </div>
);

// const Connect = () => (
//   <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg shadow-sm">
//     <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect</h2>
//     <div className="space-y-6">
//       <p className="text-gray-700 leading-relaxed">
//         I'd love to hear from you! Whether you want to collaborate on a project,
//         discuss opportunities, or just say hello, feel free to reach out.
//       </p>

//       <div className="grid gap-4">
//         {[
//           { platform: "Email", handle: "hello@example.com", color: "bg-red-500" },
//           { platform: "LinkedIn", handle: "/in/yourprofile", color: "bg-blue-600" },
//           { platform: "Twitter", handle: "@yourusername", color: "bg-sky-500" },
//           { platform: "GitHub", handle: "/yourusername", color: "bg-gray-800" }
//         ].map((contact, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow">
//             <div className={`w-3 h-3 rounded-full ${contact.color}`}></div>
//             <div>
//               <h4 className="font-semibold text-gray-800">{contact.platform}</h4>
//               <p className="text-gray-600 text-sm">{contact.handle}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-sm">
//         <h3 className="font-semibold text-gray-800 mb-3">Quick Message</h3>
//         <div className="space-y-3">
//           <input
//             type="text"
//             placeholder="Your name"
//             className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           />
//           <textarea
//             placeholder="Your message"
//             rows="3"
//             className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
//           ></textarea>
//           <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors font-medium">
//             Send Message
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

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
    <div className="block md:hidden bg-white w-full relative bottom-28">
      {/* Tabs navigation */}
      <nav className="bg-white border-b border-gray-200 py-3 px-3">
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
      <main className="p-4">{renderContent()}</main>
    </div>
  );
}
