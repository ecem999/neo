"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.error || t("errorMsg"));
      }
    } catch (err: any) {
      setError(t("errorMsg"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="flex flex-col space-y-8 mt-4">
          <div>
            <span className="text-[#0e5b9f] text-xs font-bold tracking-widest uppercase mb-4 block">
              {t("title")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
              {t("heading")}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col space-y-6 pt-4">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className="text-gray-800 font-medium">info@digitalneobrand.com</span>
            </div>



            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <span className="text-gray-800 font-medium">(+90) 530 471 90 67</span>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Link href="https://www.linkedin.com/company/neobranddigital/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition">
              <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
            <Link href="https://www.instagram.com/neobranddigital/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition">
              <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="p-4 rounded-xl bg-green-50 text-green-700 border border-green-200 mb-6">
                {t("successMsg")}
              </div>
            )}
            
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 mb-6">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t("formName")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("formNamePlaceholder")}
                className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0e5b9f]/20 focus:border-[#0e5b9f] transition-all text-gray-800 placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t("formEmail")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("formEmailPlaceholder")}
                className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0e5b9f]/20 focus:border-[#0e5b9f] transition-all text-gray-800 placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t("formMessage")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("formMessagePlaceholder")}
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0e5b9f]/20 focus:border-[#0e5b9f] transition-all text-gray-800 placeholder:text-gray-400 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0e5b9f] hover:bg-[#0b4880] text-white font-medium py-4 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? t("submittingBtn") : t("submitBtn")}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
