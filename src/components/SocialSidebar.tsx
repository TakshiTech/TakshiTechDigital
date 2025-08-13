import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";

const SocialSidebar: React.FC = () => {
  return (
    <div className="hidden md:flex fixed top-1/2 right-4 transform -translate-y-1/2 z-50 flex-col items-center space-y-4">
      {/* Instagram */}
      <a
        href="https://www.instagram.com/webdigitalbazaar"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black p-3 rounded-full hover:bg-gray-700 transition"
      >
        <FaInstagram className="text-white text-xl hover:text-pink-500" />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/webdigitalbazaar/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black p-3 rounded-full hover:bg-gray-700 transition"
      >
        <FaLinkedinIn className="text-white text-xl hover:text-blue-500" />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/webdigitalbazaar"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black p-3 rounded-full hover:bg-gray-700 transition"
      >
        <FaFacebook className="text-white text-xl hover:text-blue-500" />
      </a>

      {/* Phone */}
      <a
        href="tel:+919871492013"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black p-3 rounded-full hover:bg-gray-700 transition"
      >
        <FaPhoneAlt className="text-white text-xl hover:text-green-500" />
      </a>
    </div>
  );
};

export default SocialSidebar;
