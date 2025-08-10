import { useState } from "react";
import { FaLinkedin, FaGithub, FaXTwitter, FaInstagram, FaReddit, FaYoutube } from "react-icons/fa6";

export default function SocialMediaPanel() {
  const [active, setActive] = useState(null);

  const icons = [
    { id: "linkedin", icon: <FaLinkedin />, color: "text-blue-600", label: "LinkedIn", handle: "@relatablepradeep" },
    { id: "github", icon: <FaGithub />, color: "text-gray-800", label: "GitHub", handle: "@relatablepradeep" },
    { id: "x", icon: <FaXTwitter />, color: "text-black", label: "X", handle: "@relatablepradeep" },
    { id: "instagram", icon: <FaInstagram />, color: "text-pink-500", label: "Instagram", handle: "@myInstagramID" },
    { id: "reddit", icon: <FaReddit />, color: "text-orange-500", label: "Reddit", handle: "@relatablepradeep" },
    { id: "youtube", icon: <FaYoutube />, color: "text-red-600", label: "YouTube", handle: "@relatablepradeep" },
  ];

  return (
    <div className="flex flex-col p-6">
      <div className="grid grid-cols-2 gap-4 w-full">
        {icons.map(({ id, icon, color, label, handle }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-4 p-6 w-96 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 ${
              active === id ? "bg-gray-200 scale-105" : "bg-white"
            }`}
          >
            <span className={`text-4xl ${color}`}>{icon}</span>
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
