"use client";
import { useEffect, useState, useRef } from "react";
import { Mail, Github, Linkedin, Twitter, X } from "lucide-react";

// ✅ Define the type for socials
type SocialLink = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  hoverColor: string;
  url: string;
  description: string;
  username: string;
};

// ✅ Strongly typed socials array
const socialLinks: SocialLink[] = [
  { 
    name: "Email",
    icon: Mail,
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    url: "mailto:your.email@example.com",
    description: "Get in touch via email for collaborations, opportunities, or just to say hello!",
    username: "your.email@example.com"
  },
  { 
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    url: "https://linkedin.com/in/yourprofile",
    description: "Connect with me professionally and explore my career journey and achievements.",
    username: "@yourprofile"
  },
  { 
    name: "GitHub",
    icon: Github,
    color: "bg-gray-800",
    hoverColor: "hover:bg-gray-900",
    url: "https://github.com/yourusername",
    description: "Check out my open source projects, contributions, and coding adventures.",
    username: "@yourusername"
  },
  { 
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500",
    hoverColor: "hover:bg-sky-600",
    url: "https://twitter.com/yourusername",
    description: "Follow me for tech insights, project updates, and random thoughts.",
    username: "@yourusername"
  },
];

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  const [expandedSocial, setExpandedSocial] = useState<(SocialLink & { index: number }) | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Touch/Mouse event handlers
  const handleStart = (clientY: number) => {
    if (expandedSocial) return;
    setIsDragging(true);
    setStartY(clientY);
    setStartOffset(offset);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging || expandedSocial) return;
    const deltaY = clientY - startY;
    const newOffset = startOffset + deltaY * 1.2;
    setOffset(newOffset);
  };

  const handleEnd = () => setIsDragging(false);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientY);
  };
  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientY);
  const handleMouseUp = () => handleEnd();

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientY);
  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  };
  const handleTouchEnd = () => handleEnd();

  // Add global mouse events when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, startY, startOffset]);

  const handleSocialClick = (social: SocialLink, socialIndex: number) => {
    if (isDragging || isAnimating) return;
    setIsAnimating(true);
    setExpandedSocial({ ...social, index: socialIndex });
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeExpanded = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setExpandedSocial(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleDirectLink = (url: string) => {
    window.open(url, "_blank");
    closeExpanded();
  };

  if (!isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Social Connect</h2>
            <p className="text-gray-600 text-lg">
              View on mobile to explore the interactive social links carousel
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Typed getVisibleSocials
  const getVisibleSocials = (): (SocialLink & { key: number; originalIndex: number })[] => {
    const result: (SocialLink & { key: number; originalIndex: number })[] = [];
    for (let i = 0; i < 4; i++) {
      const socialIndex =
        (socialLinks.length - 1 - Math.floor(offset / 140) - i + socialLinks.length * 1000) %
        socialLinks.length;
      result.push({
        ...socialLinks[socialIndex],
        key: Math.floor(offset / 140) + i,
        originalIndex: socialIndex,
      });
    }
    return result;
  };

  const visibleSocials = getVisibleSocials();
  const smoothOffset = offset % 140;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center perspective-1200"
      >
        <div
          className={`relative w-80 h-[400px] overflow-hidden select-none touch-none 
            ${expandedSocial ? "cursor-default" : isDragging ? "carousel-grabbing" : "carousel-grab"}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {visibleSocials.map((social, i) => {
            const baseY = i * 140 + smoothOffset;
            const translateY = baseY;

            const normalizedPos = ((i * 140 + smoothOffset) / 140) % 3;
            let translateZ;
            if (normalizedPos < 1) {
              translateZ = -150 + normalizedPos * 300;
            } else if (normalizedPos < 2) {
              translateZ = 150 - (normalizedPos - 1) * 300;
            } else {
              translateZ = -150;
            }

            const distanceFromCenter = Math.abs(translateY - 140);
            const scale = Math.max(0.7, 1 - distanceFromCenter / 400);
            const opacity = Math.max(0.4, 1 - distanceFromCenter / 300);

            if (translateY < -120 || translateY > 520) return null;

            const IconComponent = social.icon;

            return (
              <div
                key={social.key}
                className={`absolute left-1/2 -translate-x-1/2 w-20 h-20 
                  ${social.color} ${social.hoverColor} text-white rounded-full shadow-2xl 
                  cursor-pointer transition-all duration-300 hover:shadow-3xl 
                  hover:scale-110 active:scale-95 flex items-center justify-center group drop-shadow-custom`}
                style={{
                  transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.floor(20 - translateY / 140),
                  transition: isDragging ? "none" : "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={() => handleSocialClick(social, social.originalIndex)}
              >
                <IconComponent
                  size={32}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal */}
      {expandedSocial && (
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 transition-all duration-300 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
          onClick={closeExpanded}
        >
          <div
            className={`bg-white rounded-3xl p-8 mx-4 max-w-sm w-full shadow-3xl transform transition-all duration-300 ${
              isAnimating
                ? "scale-90 opacity-0 translate-y-8"
                : "scale-100 opacity-100 translate-y-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeExpanded}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110"
            >
              <X size={18} className="text-gray-600" />
            </button>

            {/* Social content */}
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div
                  className={`w-20 h-20 ${expandedSocial.color} rounded-full flex items-center justify-center mx-auto shadow-xl`}
                >
                  {(() => {
                    const IconComponent = expandedSocial.icon;
                    return <IconComponent size={40} className="text-white" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {expandedSocial.name}
                  </h2>
                  <p className="text-gray-500 font-mono text-sm">
                    {expandedSocial.username}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {expandedSocial.description}
              </p>

              <div className="flex flex-col space-y-3 pt-2">
                <button
                  onClick={() => handleDirectLink(expandedSocial.url)}
                  className={`flex items-center justify-center space-x-3 px-6 py-3 ${expandedSocial.color} ${expandedSocial.hoverColor} text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                >
                  {(() => {
                    const IconComponent = expandedSocial.icon;
                    return <IconComponent size={20} />;
                  })()}
                  <span>Connect on {expandedSocial.name}</span>
                </button>

                <button
                  onClick={closeExpanded}
                  className="px-6 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
