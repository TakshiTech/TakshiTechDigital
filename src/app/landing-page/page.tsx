"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RippleButton from "@/components/animata/button/ripple_button";
import { useRouter } from "next/navigation";
// import router from "next/router";


export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const toggleItem = (index: number) => {
    setActiveIndex((prev: number | null) => (prev === index ? null : index));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contentData = {
    Adaptability:
      "We stay ahead of trends and technology, quickly adapting our strategies to changes in algorithms, markets, or client goals ensuring your business always remains competitive.",
    "Problem-Solving":
      "Challenges don’t slow us down, they inspire us. We identify the root of every issue and provide smart, results-oriented solutions that keep campaigns on track.",
    "Team Collaboration":
      "Our success is built on collaboration. From internal experts to client input, we ensure consistent communication and teamwork to drive outstanding results.",
  };

  const serviceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const workVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number = 1) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

  // Validate phone number on change
  if (name === "phone") {
    const phoneRegex = /^\+\d{0,15}$/;
    if (value && !phoneRegex.test(value)) {
      setPhoneError("Please enter phone number in international format (e.g., +919876543210)");
    } else {
      setPhoneError("");
    }
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Validate phone number before submission
    const phoneRegex = /^\+\d{10,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setMessage("Please fix the phone number format (e.g., +919876543210)");
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

    // Log the payload to check if service is being sent
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
        setMessage("Form submitted successfully!");
        setFormData({ name: "", phone: "", email: "", service: "" }); // Reset form
        router.push("/");
      } else {
        setMessage(result.error || "Failed to submit form.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };


  return (
    <>
      <section
        className="relative w-full min-h-screen flex items-center justify-center bg-gray-100 px-15 overflow-hidden"
        style={{ backgroundImage: 'url("/images")' }}
      >
        {/* Decorative Cutaway Background Shapes
        <div className="absolute top-0 left-0 w-[120px] h-[120px] bg-white rounded-br-[100px] z-10"></div>
        <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-white rounded-bl-[100px] z-10"></div>
        <div className="absolute bottom-0 left-0 w-[120px] h-[120px] bg-white rounded-tr-[100px] z-10"></div>
        <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-white rounded-tl-[100px] z-10"></div> */}

        <div className="w-full max-w-7xl  flex flex-col lg:flex-row justify-between items-center gap-12 relative z-20 mt-0 sm:mt-[-80px]">
          {/* Left Content */}
          <div className="text-white max-w-xl px-4 lg:px-0">
            {/* Logo */}
            <div className="">
              <Image src="/images/logo.png" alt="Web Digital Bazaar" width={200} height={50} className="object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2 text-black">
              Digital Marketing Services That  <br /> Drive Real Results
            </h1>
            <p className="text-lg text-gray-700 mb-6">Boost Your Brand Visibility, Generate Leads & Grow Your Business with Manifest Strategies</p>

            <a href="/" target="_blank" rel="noopener noreferrer"><RippleButton>Explore More</RippleButton></a>
            {/* Stats */}
            {/* <div className="flex flex-wrap gap-6 mt-5">
              <div className="bg-white/90 rounded-full px-6 py-4 text-center shadow-md">
                <p className="text-2xl font-bold text-black">87+</p>
                <p className="text-sm text-gray-600">Satisfied Clients</p>
              </div>
              <div className="bg-white/90 rounded-full px-6 py-4 text-center shadow-md">
                <p className="text-2xl font-bold text-black">150+</p>
                <p className="text-sm text-gray-600">Project Completed</p>
              </div>
              <div className="bg-white/90 rounded-full px-6 py-4 text-center shadow-md">
                <p className="text-2xl font-bold text-black">56k</p>
                <p className="text-sm text-gray-600">Lines of code</p>
              </div>
            </div> */}
          </div>
          {/* Right Contact Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl px-4 mb-5 mt-50">
            <h2 className="text-3xl font-bold text-green-800 mb-2">Contact Us!</h2>
            <p className="text-sm text-gray-600 mb-6">For Business Enquiries Only</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone (e.g., +919876543210)"
                value={formData.phone}
                onChange={handleChange}
                pattern="\+[0-9]{10,15}"
                className={`px-4 py-2 rounded-full border ${phoneError ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-300`}
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {/* <input
                type="text"
                name="service"
                placeholder="Enter Service"
                value={formData.service}
                onChange={handleChange}
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              /> */}
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="" disabled>Select a Service</option>
                <option value="SEO">Search Engine Optimization</option>
                <option value="SMM">Social Media Marketing</option>
                <option value="PPC Ads - Google & Meta">PPC Ads - Google & Meta</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing(SEO,SMM,PPC ads)">Digital Marketing(SEO,SMM,PPC ads)</option>
                
              </select>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full shadow-md cursor-pointer"
              >
                Submit
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 text-center ${message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Services Section with Animation */}
      <section className="w-full bg-gray-100 py-20 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-black drop-shadow-lg"
            variants={serviceVariants}
            custom={0}
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {["/images/about/4.webp", "/images/about/1.webp", "/images/about/2.webp"].map((src, i) => (
              <motion.div
                key={i}
                className="bg-green-200 rounded-md shadow-md p-4 relative"
                variants={serviceVariants}
                custom={i + 1}
              >
                <div className="flex justify-between items-start">
                  <div className="text-4xl">
                    {i === 0 ? "💻" : i === 1 ? "🎯" : "🎨"}
                  </div>
                  <div className="bg-black text-green-400 px-2 py-1 rounded-sm"><a href="/services" target="_blank" rel="noopener noreferrer">↗</a></div>
                </div>
                <p className="mt-4 font-bold text-black">
                  {i === 0
                    ? "Website Development"
                    : i === 1
                      ? "Digital Marketing"
                      : "Meta & Google Ads"}
                </p>
                <a href="/services" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={src}
                    alt="service"
                    width={300}
                    height={120}
                    className="mt-2 rounded-md w-full h-[120px] object-cover"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How We Work Section with Animation */}
      <section className="w-full bg-gray-100 py-20 px-4">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="text-green-700 font-semibold text-xl mb-12 flex items-center justify-center gap-2"
            variants={workVariants}
            custom={0}
          >
            <span className="text-3xl">⭢</span> How we work
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <motion.div
              className="bg-black text-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
              variants={workVariants}
              custom={1}
            >
              <h3 className="text-green-400 font-bold text-xl mb-2">
                Step 01
              </h3>
              <p className="text-lg mb-2">Determine & Strategize</p>
              <hr className="border-white mb-4" />
              <p className="text-sm">
                We begin by understanding your business goals, target audience, and competition. Then we trade a custom digital marketing strategy to adapt for results.
              </p>
            </motion.div>

            <motion.div
              className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
              variants={workVariants}
              custom={2}
            >
              <h3 className="text-green-400 font-bold text-xl mb-2">
                Step 02
              </h3>
              <p className="text-lg mb-2">Execute & Optimize</p>
              <hr className="border-white mb-4" />
              <p className="text-sm">
                Our team implements campaigns across SEO, social media, ads, and more – continuously optimizing for performance and ROI.
              </p>
            </motion.div>

            <motion.div
              className="bg-black text-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
              variants={workVariants}
              custom={3}
            >
              <h3 className="text-green-400 font-bold text-xl mb-2">
                Step 03
              </h3>
              <p className="text-lg mb-2">Track & Grow</p>
              <hr className="border-white mb-4" />
              <p className="text-sm">
                We monitor results in real-time, provide detailed reports, and refine strategies to ensure consistent growth and long-term success.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>



      {/* What We Do Section (Fixed Experience Accordion) */}
      <section className="w-full bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeLeft}>
            <p className="text-green-700 font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="text-3xl">⭢</span> What we do
            </p>
            <p className="text-black font-semibold mb-6">
              Rank higher on Google, drive organic traffic, and stay ahead of your competitors with powerful SEO strategies.
              <br />
              {/* <span className="text-sm font-normal">➡️100% Free Strategy Session<br />
                ➡️Quick Response Guaranteed<br />
                ➡️Results That Matter<br /></span> */}
            </p>
            <Image src="/images/seo.webp" alt="work preview" width={600} height={400} className="rounded-lg shadow-md object-cover" />
          </motion.div>

          {/* Right Accordion */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeRight}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
            <p className="text-gray-700 mb-8">
              With more than five years of experience in the field of digital marketing, Web Digital Bazaar has produced positive outcomes for customers in a number of industries, including IT, real estate, e-commerce, and healthcare. Our team helps brands develop online by fusing data-driven tactics with creativity. We've taken care of everything from social media and SEO to performance marketing and web development, giving our clients steady returns on investment and long-term success.
            </p>

            <div className="space-y-4">
              {Object.entries(contentData).map(([title, description], i) => (
                <div key={i}>
                  <div
                    className="flex justify-between items-center border-b border-green-500 pb-2 cursor-pointer hover:opacity-90"
                    onClick={() => toggleItem(i)}
                  >
                    <span className="text-gray-800 font-medium">{title}</span>
                    <span className="text-green-600 text-xl font-bold">{activeIndex === i ? "-" : "+"}</span>
                  </div>
                  {activeIndex === i && (
                    <p className="text-sm text-gray-700 mt-2 animate-fade-in">{description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section (no change needed unless styling) */}
      {/* Final Call to Action */}
      <motion.section className="w-full bg-gray-100 py-24 px-4 relative overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={ctaVariants}>
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          <motion.p
            className="text-green-700 font-semibold text-xl mb-4 flex justify-center items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-3xl">⭢</span> Work with us
          </motion.p>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let’s Build Something Great Together.
          </motion.h2>

          <motion.h1
            className="absolute text-[24px] sm:text-[40px] md:text-[60px] text-gray-300 font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] z-0 whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Let’s Work Together
          </motion.h1>

          <motion.div className="mt-16 flex justify-center z-10 relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1 }}>
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300 flex items-center justify-center text-center text-black font-semibold shadow-lg hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              onClick={scrollToTop}
            >
              <span className="leading-tight text-sm md:text-base">
                ↑<br />Let’s work<br />with us
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
