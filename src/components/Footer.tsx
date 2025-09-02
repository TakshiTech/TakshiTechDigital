"use client";

import React, { useMemo, useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// -----------------------------------------------------------------------------
// Modern footer with glassmorphism, animated accents, inline validation + toasts
// Tailwind-only UI + Framer Motion micro-interactions
// -----------------------------------------------------------------------------

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/; // 10 digits (we prefix +91 on send)

const FooterModern: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; all?: string }>({});

  const canSubmit = useMemo(
    () => name.trim() && emailRegex.test(email.trim()) && phoneRegex.test(phone) && service.trim(),
    [name, email, phone, service]
  );

  const handleSubmit = async () => {
    setStatus(null);

    // Validate
    const currentErrors: typeof errors = {};
    if (!name.trim() || !email.trim() || !phone.trim() || !service.trim()) {
      currentErrors.all = "Name, email, phone & service are required.";
    }
    if (!emailRegex.test(email.trim())) currentErrors.email = "Enter a valid email address.";
    if (!phoneRegex.test(phone)) currentErrors.phone = "Enter a 10‑digit number.";
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length) return;

    // Split name
    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ");

    const payload = {
      email: email.trim(),
      firstName,
      lastName,
      phone: `+91${phone}`,
      sms: "",
      service,
      message: "",
    };

    try {
      setSubmitting(true);
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatus({ ok: true, message: "Thanks! We\u2019ll get back to you soon." });
        setName("");
        setEmail("");
        setPhone("");
        setService("");
      } else {
        setStatus({ ok: false, message: result.error || "Failed to submit form." });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ ok: false, message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* soft animated blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(60% 60% at 100% 0%, rgba(99,102,241,.28) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(20,184,166,.22) 0%, transparent 60%)",
        }}
      />

      {/* grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="relative mx-auto max-w-screen-xl px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left: contact + logo */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] backdrop-blur supports-[backdrop-filter]:bg-white/5"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight">Let\'s Work Together</h2>
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

            <div className="rounded-xl bg-slate-900/40 p-5 shadow-inner">
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
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] backdrop-blur supports-[backdrop-filter]:bg-white/5"
          >
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
                    className={`w-full rounded-r-lg border bg-slate-900/60 p-3 text-white outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400/30 ${
                      errors.phone ? "border-red-500 focus:ring-red-400/30" : "border-white/10 focus:border-indigo-400"
                    }`}
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    aria-label="Phone number"
                    aria-invalid={!!errors.phone}
                  />
                </div>
                {errors.phone && (
                  <p className="-mt-2 text-xs text-red-400">⚠ {errors.phone}</p>
                )}

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full rounded-lg border bg-slate-900/60 p-3 text-white outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400/30 ${
                      errors.email ? "border-red-500 focus:ring-red-400/30" : "border-white/10 focus:border-indigo-400"
                    }`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">⚠ {errors.email}</p>
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

                {errors.all && (
                  <p className="text-xs text-red-400">⚠ {errors.all}</p>
                )}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !canSubmit}
              whileTap={{ scale: 0.98 }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-400 p-3 font-medium text-slate-900 transition hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <AnimatePresence initial={false}>
                {submitting ? (
                  <motion.span
                    key="spinner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900"
                  />
                ) : null}
              </AnimatePresence>
              {submitting ? "Submitting..." : "Submit"}
            </motion.button>

            {/* Inline toast */}
            <AnimatePresence>
              {status && (
                <motion.div
                  key="toast"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                    status.ok
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                      : "border-red-400/30 bg-red-400/10 text-red-200"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {/* LINKS AREA – modern pill style across all columns */}
<div className="mt-14">
  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
    {/* COL 1: COMPANY */}
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Company</h3>
      <div className="mt-4 grid gap-2">
        {[
          { label: "Why Us?", href: "/why-choose-a-digital-marketing-agency" },
          { label: "Blog", href: "/blog" },
          { label: "Careers", href: "/careers" },
        ].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>

    {/* COL 2: USE CASES */}
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Use Cases</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { label: "Healthcare", slug: "healthcare" },
          { label: "Education", slug: "education" },
          { label: "Real Estate", slug: "real-estate" },
          { label: "Retailers", slug: "retailers" },
          { label: "Interior Designers", slug: "interior-designers" },
          { label: "B2B", slug: "b2b" },
        ].map((u) => (
          <Link
            key={u.slug}
            href={`/use-cases/${u.slug}`}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white text-center"
          >
            {u.label}
          </Link>
        ))}
      </div>
    </div>

    {/* COL 3: SITE NAV */}
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Site</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "/contact" },
        ].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white text-center"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>

    {/* COL 4: LEGAL */}
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Legal</h3>
      <div className="mt-4 grid gap-2">
        {[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms & Conditions", href: "/terms" },
          { label: "Refund Policy", href: "/terms#cancellation-refund" },
        ].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Social */}
{/* Social */}
<div className="mt-12 text-center">
  <div className="flex justify-center gap-4">
    {[
      // {
      //   href: "https://www.linkedin.com/company/webdigitalbazaar/",
      //   icon: <FaLinkedin className="h-5 w-5" />,
      //   label: "LinkedIn",
      // },
      {
        href: "https://www.youtube.com/@TakshiTechDigital",
        icon: <FaYoutube className="h-5 w-5" />,
        label: "YouTube", // <-- was "Facebook"
      },
      {
        href: "https://www.facebook.com/profile.php?id=61579852981225",
        icon: <FaFacebook className="h-5 w-5" />,
        label: "Facebook",
      },
      {
        href: "https://www.instagram.com/takshitechdigital/",
        icon: <FaInstagram className="h-5 w-5" />,
        label: "Instagram",
      },
      {
        href: "https://x.com/TakshiTech",
        icon: <FaTwitter className="h-5 w-5" />,
        label: "Twitter",
      },
    ].map((s) => (
      <a
        key={s.href}                 // <-- unique, stable key
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

  <p className="mt-3 text-xs text-gray-400">© 2025 Takshi Tech Digital | All Rights Reserved</p>
</div>

</div>

{/* ContactPoint JSON-LD for SEO */}

      {/* ContactPoint JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Takshi Tech Digital",
            url: "https://takshitechdigital.com",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91 8851099103",
                contactType: "customer support",
                areaServed: "IN",
                availableLanguage: ["en", "hi"],
              },
            ],
          }),
        }}
      />
    </footer>
  );
};

export default FooterModern;
