"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, ArrowRight, Mail, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

const newsletterBackendReady = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY
);

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!newsletterBackendReady) {
      setSubmitted(true);
      return;
    }
    setSaving(true);
    try {
      const { saveNewsletterSubscription } = await import("@/lib/firebase");
      await saveNewsletterSubscription(email);
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("NEWSLETTER SUBSCRIPTION ERROR:", err);
      setError("We could not save your subscription. Please try again later.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 lg:p-20"
        >
          <div className="absolute inset-0 grid-pattern pointer-events-none" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cyan-500/15 to-blue-500/15 blur-3xl" />

          <div className="relative max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-8"
            >
              <Bell className="w-10 h-10 text-indigo-300" />
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              Never miss an update
            </h2>
            <p className="text-lg text-indigo-200/80 mb-10 leading-relaxed max-w-lg mx-auto">
              Get occasional directory updates and new comparison guides. {newsletterBackendReady
                ? "Your email will be stored for subscription management."
                : "Newsletter delivery is not connected yet, so no email address is stored."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
              <div className="flex-1 relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-transparent transition-all text-base"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="btn-primary px-8 py-4 text-base flex items-center justify-center gap-2 group"
              >
                {saving ? "Saving..." : newsletterBackendReady ? "Subscribe" : "Preview signup"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {submitted && (
              <p className="text-sm text-amber-200 mb-6" role="status">
                {newsletterBackendReady
                  ? "Subscription saved."
                  : "Preview only: no subscription was created because the newsletter backend is not connected."}
              </p>
            )}
            {error && <p className="text-sm text-red-200 mb-6" role="alert">{error}</p>}

            <div className="flex items-center justify-center gap-6 text-indigo-200/60 text-sm">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> No spam
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Weekly digest
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Unsubscribe anytime
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
