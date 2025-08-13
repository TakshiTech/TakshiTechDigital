'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { RevealLinks } from '@/components/Links';
import SocialSidebar from '@/components/SocialSidebar';
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';

const ContactClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{10,15}$/;
    const newErrors = {
      email: !emailRegex.test(email),
      phone: phone.length > 0 && !phoneRegex.test(phone),
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.phone) {
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
      sms: phone,
      service,
      message: "", // Already in payload, keeping it as is
    };

    // Log payload for debugging
    console.log("Frontend Payload:", payload);

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <>
      <Navbar />
      <SocialSidebar />

      {/* Hero Section */}
      <section
        className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/background2.webp')",
            filter: "blur(2px)",
            transform: "scale(1.1)", // prevents edges from showing when blurred
          }}
        ></div>

        {/* Overlay color for readability (optional) */}
        <div className="absolute inset-0 bg-white/50"></div>

        {/* Content */}
        <motion.div
          initial={{ y: "-150%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute text-center w-full"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black">
            CONTACT US
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
            Give us a Try to Help You!
          </p>
        </motion.div>
      </section>

      {/* Contact Form and Info */}
      <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 flex flex-col md:flex-row gap-6 sm:gap-10">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Send us a message</h2>
          <p className="text-gray-500 mb-4 sm:mb-6 text-xs sm:text-sm">
            Fill in the form below and our team will get back to you within 24 hours.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium text-xs sm:text-sm">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-xs sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium text-xs sm:text-sm">Service</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-xs sm:text-sm"
                  placeholder="Service Needed"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium text-xs sm:text-sm">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="\+[0-9]{10,15}"
                  className={`w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-xs sm:text-sm ${errors.phone ? "border-red-500" : ""
                    }`}
                  placeholder="Phone (e.g., +919876543210)"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠ Please enter phone number in international format (e.g., +919876543210).
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium text-xs sm:text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-xs sm:text-sm ${errors.email ? "border-red-500" : ""
                    }`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠ Please enter a valid email address.
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white py-2 sm:py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-500 transition text-sm sm:text-base"
            >
              ✉️ Send Message
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 sm:p-8 h-fit">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Get in touch</h2>
          <p className="text-gray-500 mb-4 sm:mb-6 text-xs sm:text-sm">
            Reach out anytime. We’d love to talk with you.
          </p>
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-green-500 mt-1" />
              <div>
                <div className="font-semibold">Location</div>
                <div>H-187 WorkWings, Lohia Rd, H Block, Sector 63, Noida, Uttar Pradesh 201301</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-green-500 mt-1" />
              <div>
                <div className="font-semibold">Email</div>
                <div>info@takshitechdigital.com</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-green-500 mt-1" />
              <div>
                <div className="font-semibold">Phone</div>
                <div>+91 9871492013<br />+91 8860692013</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full mt-8 sm:mt-12 px-4 sm:px-0">
        <div className="w-full h-64 sm:h-80">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.021350989053!2d77.37776317355244!3d28.629122184238987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceffbbd3cc0c5%3A0xf52287931e1deec!2stakshitechdigital!5e0!3m2!1sen!2sin!4v1747654411570!5m2!1sen!2sin"
            className="w-full h-full rounded-lg border-0"
            loading="lazy"
          />
        </div>
      </div>

      <RevealLinks />
    </>
  );
};

export default ContactClient;