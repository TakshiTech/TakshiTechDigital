'use client';

import React, { useEffect, useState } from "react";

const ScrollContactForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
  }>({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const [errors, setErrors] = useState<{
    service: boolean;
    phone: boolean;
  }>({
    service: false,
    phone: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const scrollPercent = (scrollY + windowHeight) / fullHeight;

      if (scrollPercent > 0.7 && !hasTriggered) {
        setShowPopup(true);
        setHasTriggered(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  const closePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Close button clicked, setting showPopup to false");
    setShowPopup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });

    // Validate phone number on change
    if (name === "phone") {
      const phoneRegex = /^\+\d{0,15}$/;
      if (value && !phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: true,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          phone: false,
        }));
      }
    }
  };

  const handleSubmit = async () => {
    const phoneRegex = /^\+\d{10,15}$/;
    const newErrors: { service: boolean; phone: boolean } = {
      service: !formData.service,
      phone: formData.phone.length > 0 && !phoneRegex.test(formData.phone),
    };
    setErrors(newErrors);

    if (newErrors.service || newErrors.phone) {
      return;
    }

    // Split the name into firstName and lastName
    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const payload = {
      email: formData.email,
      firstName,
      lastName,
      sms: formData.phone,
      service: formData.service,
    };

    // Log the payload for debugging
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
        alert("Form submitted successfully!");
        setShowPopup(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
        });
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
  };

  if (!showPopup) {
    console.log("Popup is hidden (showPopup is false)");
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[90vw] sm:max-w-md md:max-w-3xl p-4 sm:p-6 relative font-sans max-h-[90vh] overflow-y-auto">
        <button
          className="fixed top-4 right-4 text-2xl sm:text-3xl font-bold text-black z-[1010] bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={closePopup}
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-neutral-800 text-white rounded-xl flex items-center justify-center text-center p-4 sm:p-6 w-full max-w-xs mx-auto md:max-w-none">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
              DON'T BE SHY, <br /> GIVE US A TRY!
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">CONTACT US!</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              For Business Enquiries Only! (For jobs, please visit{" "}
              <a href="/careers" className="text-blue-600 underline">
                Careers page
              </a>)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
              />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
              />
              <div>
                <input
                  name="phone"
                  placeholder="Phone (e.g., +919876543210)"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="\+[0-9]{10,15}"
                  className={`border p-2 sm:p-3 rounded w-full text-sm sm:text-base ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠ Please enter phone number in international format (e.g., +919876543210).
                  </p>
                )}
              </div>
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`border p-2 sm:p-3 rounded w-full text-sm sm:text-base ${
                    errors.service ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Choose Service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">⚠ Choose an option.</p>}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#47C0C5] text-white px-6 py-2 mt-2 rounded-full w-full hover:bg-[#85fbfff7] transition hover:text-black text-sm sm:text-base"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollContactForm;