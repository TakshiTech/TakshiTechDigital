
'use client';

import React, { useState, ChangeEvent } from "react";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [errors, setErrors] = useState({
    email: false,
  });

  const handleSubmit = async () => {
    // Validate required fields
    if (!name || !email || !phone || !service) {
      alert("Name, email, phone, and service are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      email: !emailRegex.test(email),
    };
    setErrors(newErrors);

    // Basic phone number validation (only numbers after +91, min 10 digits)
    const phoneNumber = `+91${phone}`;
    const phoneRegex = /^\+91[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (newErrors.email) {
      return;
    }

    // Split name into firstName and lastName
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const payload = {
      email,
      firstName,
      lastName,
      phone: `+91${phone}`, // Full phone number with +91
      sms: "", // Not present in this form, so send empty
      service, // Selected service from dropdown
      message: "", // Removed message field, sending empty
    };

    // Log payload for debugging
    console.log("Frontend Payload:", payload);

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Thank you for your message! We will get back to you soon.");
        setName("");
        setEmail("");
        setPhone("");
        setService("");
      } else {
        alert("Error: " + (result.error || "Failed to submit form"));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert("An error occurred while submitting the form: " + errorMessage);
    }
  };

  return (
    <footer className="bg-slate-950 text-white py-12 sm:py-16 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Left Section */}
        <div className="flex flex-col space-y-6 p-4 sm:p-6 border-2 border-gray-300 rounded-lg">
          <div className="space-y-4 relative p-4 rounded-lg">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{
                backgroundImage: 'url("#")',
                filter: "blur(1px)",
              }}
            ></div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Let's Work Together</h2>
            <p className="text-sm sm:text-lg">
              <a href="mailto:info@takshitechdigital.com">info@takshitechdigital.com</a>
            </p>
            <p className="text-sm sm:text-lg">+91 8851099103</p>
          </div>
          <div className="w-full h-32 sm:h-40 bg-white rounded-lg overflow-hidden">
            <img
              src="/images/animated-logo.gif"
              alt="Animated Gif"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Section with Contact Form */}
        <div className="flex flex-col justify-between h-full p-4 sm:p-6 border-2 border-gray-300 rounded-lg">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Get In Touch</h2>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 text-white rounded-lg text-sm sm:text-base"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="+91"
                  disabled
                  className="w-16 p-3 bg-gray-700 text-white rounded-l-lg text-sm sm:text-base cursor-not-allowed"
                />
                <input
                  type="tel"
                  placeholder="1234567890"
                  className="w-full p-3 bg-gray-800 text-white rounded-r-lg text-sm sm:text-base"
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
                    setPhone(value);
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full p-3 bg-gray-800 text-white rounded-lg text-sm sm:text-base ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: false }));
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠ Please enter a valid email address.
                  </p>
                )}
              </div>
              <select
                value={service}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setService(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-lg text-sm sm:text-base"
              >
                <option value="" disabled>Select a Service</option>
                <option value="SEO">Search Engine Optimization (SEO)</option>
                <option value="PPC">Pay-Per-Click (PPC) Advertising</option>
                <option value="SMM">Social Media Marketing</option>
                <option value="ContentMarketing">Content Marketing</option>
                <option value="WebDevelopment">Web Development</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-3 bg-[#47C0C5] text-white rounded-lg hover:bg-[#84e7eae6] cursor-pointer text-sm sm:text-base mt-6"
          >
            Submit
          </button>
        </div>
      </div>
      {/* Social Media Icons and Links */}
      <div className="mt-8 sm:mt-12 text-center">
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a href="https://www.linkedin.com/company/webdigitalbazaar/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} className="text-white hover:text-blue-500" />
          </a>
          <a href="https://www.facebook.com/webdigitalbazaar" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} className="text-white hover:text-blue-600" />
          </a>
          <a href="https://www.instagram.com/webdigitalbazaar" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} className="text-white hover:text-pink-500" />
          </a>
          <a href="https://www.twitter.com/webdigitalbazaar" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} className="text-white hover:text-blue-400" />
          </a>
        </div>
        {/* Navigation Links */}
        <div className="mt-4 sm:mt-6 flex justify-center space-x-3 sm:space-x-4">
          <Link href="/privacy" className="text-gray-400 hover:text-white transition text-xs sm:text-base">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-white transition text-xs sm:text-base">
            Terms & Conditions
          </Link>
          <Link href="/terms#cancellation-refund" className="text-gray-400 hover:text-white transition text-xs sm:text-base">
            Refund Policy
          </Link>
          <Link href="/why-choose-a-digital-marketing-agency" className="text-gray-400 hover:text-white transition text-xs sm:text-base">
            Why Us?
          </Link>
          <Link href="/careers" className="text-gray-400 hover:text-white transition text-xs sm:text-base">
            Carrers
          </Link>
        </div>
        {/* <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
          GST No: 09GUZPS6143H1ZL
        </p> */}
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
          © 2025 Takshi Tech Digital | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;