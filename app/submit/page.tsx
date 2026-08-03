"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Upload,
  Link2,
  Globe,
  ChevronLeft,
  Send,
  Check,
} from "lucide-react";
import { categories } from "@/lib/data";
import { isFirebaseConfigured, saveToolSubmission } from "@/lib/firebase";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    category: "",
    description: "",
    features: "",
    pricing: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!isFirebaseConfigured) {
      setSubmitted(true);
      return;
    }

    setSaving(true);
    try {
      await saveToolSubmission(formData);
      setSubmitted(true);
    } catch {
      setError("We could not save this submission. Please try again later.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Submission Preview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          {isFirebaseConfigured
            ? "Your submission was saved for editorial review. It is not published automatically."
            : "This form is currently a preview. Your information was not sent or saved because the Firebase backend has not been connected yet."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Submit a Tool
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Help our community grow by submitting a trading tool or broker that is
          not yet listed on Brokr. {isFirebaseConfigured
            ? "Submissions are stored for editorial review and are not published automatically."
            : "This is a preview until the submission backend is connected; no information is sent or saved."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tool Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., MetaTrader 5"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Website URL *
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="url"
                name="website"
                required
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Category *
          </label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Briefly describe what this tool does and what makes it unique..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Key Features
          </label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="e.g., Copy Trading, Zero Commission, Mobile App (comma-separated)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Pricing
            </label>
            <input
              type="text"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              placeholder="e.g., Free / $9.99/mo"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Optional - for updates"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            * Required fields. By submitting, you agree to our terms.
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all hover:shadow-lg hover:shadow-primary-500/25"
          >
            <Send className="w-4 h-4" />
            {saving ? "Saving..." : isFirebaseConfigured ? "Submit for Review" : "Preview Submission"}
          </button>
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
      </form>
    </div>
  );
}
