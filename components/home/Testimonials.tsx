"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Brokr helped me find the perfect trading platform. The side-by-side comparison made it so easy to evaluate all the options. Saved me hours of research!",
    author: "Alex Chen",
    role: "Day Trader, 5+ years",
    rating: 5,
  },
  {
    quote: "I was overwhelmed by the number of crypto exchanges out there. Brokr's reviews and ratings helped me narrow it down to the ones that actually matched my needs.",
    author: "Sarah Martinez",
    role: "Crypto Investor",
    rating: 5,
  },
  {
    quote: "The detailed pros and cons for each broker are incredibly accurate. I have been using their recommendations for 2 years and never been disappointed.",
    author: "James Wilson",
    role: "Forex Trader",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Loved by{" "}
            <span className="gradient-text-warm">traders</span> worldwide
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            See what our community says about using Brokr to find their perfect
            trading tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 dark:text-slate-800" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"}`}
                  />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.author}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
