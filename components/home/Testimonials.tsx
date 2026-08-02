"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Regulation information",
    description: "Review the regulatory labels listed for each tool and confirm the relevant legal entity and licence with the regulator.",
  },
  {
    icon: CheckCircle,
    title: "Structured comparisons",
    description: "Compare fees, platforms, features, and availability in a consistent directory format.",
  },
  {
    icon: Zap,
    title: "Source-aware listings",
    description: "Each listing points users to the provider website; pricing and availability can change and should be checked before use.",
  },
  {
    icon: Globe,
    title: "Country context",
    description: "Browse indicative availability by region while checking local restrictions and provider eligibility yourself.",
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Directory{" "}
            <span className="gradient-text">platform</span> verification
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            We organize public information so you can compare tools more easily. Brokr does not verify, endorse, or recommend financial products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden hover-lift"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
