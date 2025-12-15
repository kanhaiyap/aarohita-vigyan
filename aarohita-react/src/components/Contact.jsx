import React from "react";

export default function Contact() {
  const EMAIL_TO = "pkanhaiya372@gmail.com"; // your email
  const WHATSAPP_NUMBER = "919731615178"; // country code + number

  // 📧 Handle Email Submission
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const { email, services, message } = data;

    const subject = `New enquiry: ${services}`;
    const body = [
      `Service: ${services}`,
      "",
      "Message:",
      message,
      "",
      `Sender Email: ${email}`,
    ].join("\n");

    const mailto = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open user's email client
    window.location.href = mailto;
    alert("Opening your email app to send the message. Thank you!");
    form.reset();
  };

  // 💬 Handle WhatsApp Contact
  const openWhatsApp = (e) => {
    e.preventDefault();
    const form = document.querySelector("#contact-form");

    // Google Ads Conversion Tracking
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { 'send_to': 'AW-871791902/xyZ8CLy54NAbEJ762Z8D' });
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const { email, services, message } = data;

    const text = [
      `Hi Aarohita Vigyan,`,
      `I'm interested in: ${services}`,
      "",
      message,
      "",
      `My email: ${email}`,
    ].join("\n");

    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;
    window.open(wa, "_blank", "noopener");
  };

  return (
    <section id="contact" className="relative z-[2] py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Let’s Build the Future Together
          </h2>
          <p className="text-lg text-slate-600">
            Ready to transform your business with AI? Get in touch with our team!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Send us a message
            </h3>

            <form id="contact-form" className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-slate-700 font-medium block"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="services"
                  className="text-slate-700 font-medium block"
                >
                  Service
                </label>
                <select
                  id="services"
                  name="services"
                  defaultValue=""
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
                >
                  <option value="" disabled hidden>
                    Select Service
                  </option>
                  <option>Web & App Development</option>
                  <option>AI/ML Solutions</option>
                  <option>IoT Automation</option>
                  <option>CRM & POS Systems</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-slate-700 font-medium block"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-3 shadow transition text-base md:text-lg"
                >
                  ✉️ Send via Email
                </button>

                <button
                  onClick={openWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-semibold rounded-xl px-4 py-3 shadow transition text-base md:text-lg"
                >
                  💬 Chat on WhatsApp
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 shadow-md ring-1 ring-white/40">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Email Us
                  </h3>
                  <p className="text-slate-700">
                    <a
                      className="underline underline-offset-4 hover:text-blue-700"
                      href="mailto:pkanhaiya372@gmail.com"
                    >
                      pkanhaiya372@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Call Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4 shadow-md ring-1 ring-white/40">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Call Us
                  </h3>
                  <p className="text-slate-700">+91 9731615178</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 shadow-md ring-1 ring-white/40">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Visit Us
                  </h3>
                  <p className="text-slate-700">Based in Garhwa &amp; Bhilai — serving clients across India</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Why Choose Us?
              </h3>
              <div className="space-y-3 text-slate-700">
                {[
                  "5+ years of AI/IoT expertise",
                  "Affordable, scalable solutions",
                  "End-to-end project support",
                  "100% client satisfaction",
                ].map((t) => (
                  <div className="flex items-center" key={t}>
                    <span className="text-emerald-600 mr-3 text-lg">✓</span>
                    <span className="text-base">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
