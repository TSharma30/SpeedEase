import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import TypingEffect from "./TypingEffect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Right from "./Right";
import "./Navbar.css"

const About = () => {
  
   

    return (
        <div className="min-h-screen flex flex-col bg-white text-black">
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center w-full p-6">
                <div className="flex items-center">
                    <img src="/SpeedEase.png" alt="Logo" className="w-10 h-10 object-contain mr-3" />
                    <span className="text-2xl font-bold">Speed Ease</span>
                </div>
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => window.open("https://github.com/TSharma30", "_blank")}
                        className="text-black mr-4"
                    >
                        <FaGithub size={30} className="text-black" />
                    </button>
                </div>
            </nav>

            {/* Main Content Section */}
            <div className="flex flex-col md:flex-row flex-1">
                {/* Left Column */}
                <div className="md:w-1/2 md:p-6 md:flex md:items-center md:justify-center">
                    <div className="p-6 text-center md:text-left">
                        <h1 className="text-4xl md:text-7xl font-bold mb-6">
                            Leverage the Power of <br className="hidden md:inline" />
                            <span className="text-blue-600">OpenAI GPT-4</span>
                        </h1>
                        <TypingEffect />
                    </div>
                </div>

                {/* Right Column */}
                <div className="md:w-1/2 md:p-6 flex items-center justify-center">
                    <Right />
                </div>
            </div>

            {/* Toast Container for Notifications */}
            <ToastContainer />
        </div>
    );
};

export default About;