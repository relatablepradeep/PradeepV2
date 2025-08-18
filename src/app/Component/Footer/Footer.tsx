'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Linkedin, MessageCircle, Twitter, Instagram ,Github} from 'lucide-react';

function Footer() {
    const [showSocialDropdown, setShowSocialDropdown] = useState(false);

    const handleClick = () => {
        const email = 'relatablepradeep@gmail.com';
        const subject = encodeURIComponent('Hello from your site!');
        const body = encodeURIComponent('Hi there,\n\nI would like to get in touch with you.');

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: <Linkedin size={20} />,
            url: 'https://linkedin.com/in/relatablepradeep',
            color: 'hover:text-blue-600'
        },
        {
            name: 'Discord',
            icon: <MessageCircle size={20} />,
            url: 'https://discord.com/users/your-discord',
            color: 'hover:text-indigo-600'
        },
        {
            name: 'X (Twitter)',
            icon: <Twitter size={20} />,
            url: 'www.linkedin.com/in/relatablepradeep',
            color: 'hover:text-gray-900'
        },
        {
            name: 'Instagram',
            icon: <Instagram size={20} />,
            url: 'https://instagram.com/your-profile',
            color: 'hover:text-pink-600'
        },
        {
            name:'Github',
            icon: <Github size={20} />,
            url:'https://github.com/relatablepradeep',
            color: 'hover:text-pink-600'
        }
    ];

    return (
        <footer className="bg-gray-100 border-gray-100  shadow-xl p-8 w-full ">
            <div className="flex flex-col items-center text-center max-w-7xl mx-auto px-4 text-black">
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold whitespace-nowrap">
                    Got a killer idea?
                </h1>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 whitespace-nowrap">
                    Let&apos;s bring it to life!
                </h1>

                <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-5 mt-6">
                    
                    {/* Wanna Chat Button with Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowSocialDropdown(!showSocialDropdown)}
                            className="relative overflow-hidden font-medium text-sm sm:text-base md:text-lg border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-500"
                        >
                            <span className="relative inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 ease-in-out group">
                                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-black group-hover:w-full ease"></span>
                                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-black group-hover:w-full ease"></span>
                                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                                    Wanna Chat?
                                </span>
                            </span>
                        </button>

                        {/* Full Screen Social Media Overlay */}
                        {showSocialDropdown && (
                            <div 
                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                onClick={() => setShowSocialDropdown(false)}
                            >
                                <div 
                                    className="bg-white border-2 border-black rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h3 className="text-2xl font-semibold text-center mb-8">Let&apos;s Connect!</h3>
                                    <div className="flex justify-center items-center gap-8 sm:gap-12">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 ${social.color} group`}
                                                onClick={() => setShowSocialDropdown(false)}
                                            >
                                                <div className="transform group-hover:scale-125 transition-transform duration-300">
                                                    <div className="w-12 h-12 flex items-center justify-center">
                                                        {React.cloneElement(social.icon, { size: 32 })}
                                                    </div>
                                                </div>
                                                <span className="font-medium text-base">{social.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Send Email Button */}
                    <button onClick={handleClick} className="relative overflow-hidden font-medium text-sm sm:text-base md:text-lg border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-500">
                        <Link href="/" className="relative inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 ease-in-out group">
                            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-black group-hover:w-full ease"></span>
                            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-black group-hover:w-full ease"></span>
                            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                                Send an email
                            </span>
                        </Link>
                    </button>
                </div>

                <div className="mt-6 text-lg sm:text-xl md:text-2xl hover:text-blue-500">
                    <Link href="https://x.com/dakkupradeep" target="_blank" rel="noopener noreferrer">
                        Follow me on X
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
