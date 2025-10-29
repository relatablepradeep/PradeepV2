import { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaInstagram,
  FaReddit,
  FaYoutube
} from "react-icons/fa6";

export default function SocialMediaPanel() {
  const [active, setActive] = useState(null);

  const icons = [
    { id: "linkedin", icon: <FaLinkedin />, color: "text-blue-600", label: "LinkedIn", handle: "@myLinkedInID" },
    { id: "github", icon: <FaGithub />, color: "text-gray-800", label: "GitHub", handle: "@myGitHubID" },
    { id: "x", icon: <FaXTwitter />, color: "text-black", label: "X", handle: "@myXID" },
    { id: "instagram", icon: <FaInstagram />, color: "text-pink-500", label: "Instagram", handle: "@myInstagramID" },
    { id: "reddit", icon: <FaReddit />, color: "text-orange-500", label: "Reddit", handle: "@myRedditID" },
    { id: "youtube", icon: <FaYoutube />, color: "text-red-600", label: "YouTube", handle: "@myYouTubeID" },
  ];

  return (
    <div className="hidden md:flex flex-col     items-center">
      <div
        className="
          grid 
          md:grid-cols-2 
gap-4


          md:w-full
          lg:w-full
          xl:max-w-5xl
          2xl:w-full


          p-3
        
          


          
        
          
        "
      >
        {icons.map(({ id, icon, color, label, handle }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`
              flex items-center 
              p-4
              2xl:w-auto
              rounded-xl shadow-md 
              transition-all duration-300 transform 
              hover:scale-105 
              ${active === id ? "bg-gray-200 scale-105" : "bg-white"}
            `}
          >
            <span className={`text-3xl md:text-4xl ${color}`}>{icon}</span>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{label}</span>
              <span className="text-sm text-gray-500">{handle}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
