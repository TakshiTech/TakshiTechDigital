'use client';

import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: '' });

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = async () => {
    // Required fields
    if (!name.trim() || !email.trim() || !phone.trim() || !service.trim()) {
      alert('Name, email, phone, and service are required.');
      return;
    }

    // Email + phone
    const emailOk = validateEmail(email);
    setErrors({ email: emailOk ? '' : 'Please enter a valid email address.' });
    const phoneRegex = /^[0-9]{10}$/; // 10 digits only (we add +91 on send)
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!emailOk) return;

    // Split name
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ');

    const payload = {
      email: email.trim(),
      firstName,
      lastName,
      phone: `+91${phone}`,
      sms: '',
      service,
      message: '',
    };

    try {
      setSubmitting(true);
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setName('');
        setEmail('');
        setPhone('');
        setService('');
      } else {
        alert('Error: ' + (result.error || 'Failed to submit form'));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert('An error occurred while submitting the form: ' + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* soft gradient accent that won’t clash with next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(60% 60% at 100% 0%, rgba(99,102,241,.35) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(20,184,166,.25) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-screen-xl px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left: contact + logo card */}
          <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/5">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight">Let&apos;s Work Together</h2>
              <p className="text-base text-gray-300">
                <a
                  href="mailto:info@takshitechdigital.com"
                  className="underline decoration-transparent underline-offset-4 transition hover:decoration-white"
                >
                  info@takshitechdigital.com
                </a>
              </p>
              <p className="text-base text-gray-300">+91 8851099103</p>
            </div>

            {/* Logo card – dark bg / light bg jo tumhe chahiye */} 
<div className="rounded-xl shadow-lg flex justify-start p-5">
  <div className="relative aspect-[3/1] w-full max-w-sm">
    <Image
      src="/images/animated-logo.gif"
      alt="Takshi Tech Digital"
      fill
      className="object-contain"
      priority
    />
  </div>
</div>

          </div>

          {/* Right: form */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/5">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Get In Touch</h2>

              <div className="mt-5 space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-white/10 bg-slate-900/60 p-3 text-white outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Your Name"
                />

                <div className="flex">
                  <input
                    type="text"
                    value="+91"
                    disabled
                    className="w-16 cursor-not-allowed rounded-l-lg border border-white/10 bg-slate-800 p-3 text-center text-white"
                    aria-label="Country code +91"
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="1234567890"
                    className="w-full rounded-r-lg border border-l-0 border-white/10 bg-slate-900/60 p-3 text-white outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhone(e.target.value.replace(/\\D/g, '').slice(0, 10))
                    }
                    aria-label="Phone number"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full rounded-lg border bg-slate-900/60 p-3 text-white outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-400/30' : 'border-white/10'
                    }`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ email: '' });
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-400">
                      ⚠ {errors.email}
                    </p>
                  )}
                </div>

                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/60 p-3 text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                  aria-label="Select a Service"
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
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
              disabled={submitting}
              className="mt-6 w-full rounded-lg bg-teal-400 p-3 font-medium text-slate-900 transition hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Social + links */}
        <div className="mt-8 text-center">
          <div className="flex justify-center gap-4">
            {[
              {
                href: 'https://www.linkedin.com/company/webdigitalbazaar/',
                icon: <FaLinkedin className="h-5 w-5" />,
                label: 'LinkedIn',
              },
              {
                href: 'https://www.facebook.com/webdigitalbazaar',
                icon: <FaFacebook className="h-5 w-5" />,
                label: 'Facebook',
              },
              {
                href: 'https://www.instagram.com/webdigitalbazaar',
                icon: <FaInstagram className="h-5 w-5" />,
                label: 'Instagram',
              },
              {
                href: 'https://www.twitter.com/webdigitalbazaar',
                icon: <FaTwitter className="h-5 w-5" />,
                label: 'Twitter',
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-white transition hover:border-white/30 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-300">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/terms#cancellation-refund" className="hover:text-white">
              Refund Policy
            </Link>
            <Link href="/why-choose-a-digital-marketing-agency" className="hover:text-white">
              Why Us?
            </Link>
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
          </nav>

          <p className="mt-3 text-xs text-gray-400">
            © 2025 Takshi Tech Digital | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
