"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

// Fade-in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Careers: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setErrorMessage('Please upload your CV.');
      return;
    }

    setUploading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('cv', cvFile);

    try {
      // 1. Upload CV
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { cvUrl } = response.data;

      // 2. Prepare data to send to Brevo
      const contactData = {
        email,
        firstName: name,
        lastName: '', // optional — add if you split name
        sms: phone.startsWith('+') ? phone : '', // Only send valid international format
        service: 'Sales Associate Application',
        message: `${message}\n\nCV URL: ${cvUrl}`,
      };

      // 3. Send data to Brevo
      const brevoRes = await axios.post('/api/submit-contact', contactData);
      console.log('Brevo response:', brevoRes.data);

      setUploading(false);
      alert('Your application has been submitted!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setCvFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('There was a problem submitting your application. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/background1.webp')",
            filter: "blur(2px)",
            transform: "scale(1.1)",
          }}
        ></div>
        <div className="absolute inset-0 bg-white/50"></div>

        <motion.div
          initial={{ y: '-150%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute text-center w-full"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-black">
            CAREERS
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
            Join WDB Digital Marketing Agency
          </p>
        </motion.div>
      </section>

      {/* Sales Associate Form Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-100 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h3
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
          >
            Become a Sales Associate
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-700 mb-10"
          >
            Passionate about sales and marketing? Join our growing team and help businesses thrive through powerful digital solution.
          </motion.p>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Upload CV</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  required
                  placeholder="Upload your CV"
                  title="Upload your CV"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a short message or cover letter"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                rows={4}
              ></textarea>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-center">
                <p>{errorMessage}</p>
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                disabled={uploading}
                className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
              >
                {uploading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </motion.section>

      {/* Rest of your sections (Section 2 to 6) remain unchanged */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Experienced Professionals',
              description: 'Know more about competencies, values, and attributes that WDB in India relates with',
              img: 'https://assets.kpmg.com/is/image/kpmgcloud/experienced-professionals-1:cq5dam-web-1976-878?wid=1488&hei=662',
            },
            {
              title: 'Students',
              description: 'Know how you can best fit with WDB in India',
              img: 'https://assets.kpmg.com/is/image/kpmgcloud/students:cq5dam-web-1976-878?wid=1488&hei=662',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white shadow rounded overflow-hidden flex flex-col h-full"
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover"
                variants={fadeIn}
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-6 flex-grow">
                  {item.description}
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/blog/experienced-professionals"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-6 py-3 transition w-fit"
                >
                  Read more
                  <span className="ml-2 text-xl">→</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="https://kpmg.com/adobe/dynamicmedia/deliver/dm-aid--192358d2-d97a-47bf-8828-7224b8e485c5/tax-intelligence-solution-gst-data-analytics.jpg?preferwebp=true&quality=82"
            alt="Career Development"
            className="w-full h-auto rounded"
            variants={fadeIn}
          />
          <motion.div variants={fadeInUp}>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Career Development
            </h3>
            <p className="text-gray-700 text-lg mb-8 max-w-xl">
              Learn more about how we nurture our people and how they foster our growth and vision
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/blog/career-development"
              className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-base font-semibold px-8 py-4 transition w-fit"
            >
              Read more
              <span className="ml-2 text-xl">→</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 4 */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div variants={fadeInUp}>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Our People
            </h3>
            <p className="text-gray-700 text-lg mb-8 max-w-xl">
              Our people form our core and spirit and are every bit valuable to us
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/blog/our-people"
              className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-base font-semibold px-8 py-4 transition w-fit"
            >
              Read more
              <span className="ml-2 text-xl">→</span>
            </motion.a>
          </motion.div>
          <motion.img
            src="https://kpmg.com/adobe/dynamicmedia/deliver/dm-aid--d100dd0c-d294-4e67-8674-d0265dd420e3/make-the-difference-office-discussion.jpg?preferwebp=true&quality=82"
            alt="Our People"
            className="w-full h-auto rounded"
            variants={fadeIn}
          />
        </div>
      </motion.section>

      {/* Section 5 */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="https://kpmg.com/adobe/dynamicmedia/deliver/dm-aid--dcec543c-b82c-4b1f-9ade-a9308587c04e/new-labor-codes.jpg?preferwebp=true&quality=82"
            alt="Life at WDB in India"
            className="w-full h-auto rounded"
            variants={fadeIn}
          />
          <motion.div variants={fadeInUp}>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Life at WDB in India
            </h3>
            <p className="text-gray-700 text-lg mb-8 max-w-xl">
              Making a meaningful and positive difference to our clients, people, and the communities we serve
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/blog/life-at-wdb-in-india"
              className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-base font-semibold px-8 py-4 transition w-fit"
            >
              Read more
              <span className="ml-2 text-xl">→</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 6 */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white py-12"
      >
        <motion.div variants={fadeInUp} className="max-w-5xl mx-auto px-4 text-gray-700 text-lg space-y-6">
          <p>
            Please be informed that WDB does not charge any money/fees/security deposit from its job seekers during the selection process nor has it authorised any individual/entity to charge such fees/money on its behalf. It has come to our knowledge that certain fraudulent individuals/placement agencies, falsely claiming to be the empaneled vendors/employees of WDB are enticing and misleading job aspirants with employment offers for a fee/security deposit. These fraudulent individuals/agencies use the name/logo of WDB in an unauthorised manner and demand money by way of fees, charges etc. from aspiring candidates for procuring employment with WDB.
          </p>
          <p>
            We request you to be watchful and not respond to any individuals/entities who demand a fees/charges during the selection process with WDB, as we do not charge any money/fees from anyone seeking a job with us. In case of any suspicion, you are encouraged to report the incident directly to us.
          </p>
        </motion.div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default Careers;