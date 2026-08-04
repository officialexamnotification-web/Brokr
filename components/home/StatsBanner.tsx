"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Users,
  Star,
  Globe,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { categories, getAvailableCountries, tools } from "@/lib/data";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  return (
    <span className="stat-counter">
      {target}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  const stats: StatItem[] = [
    { label: "Listed Tools", value: tools.length, suffix: "", icon: TrendingUp },
    { label: "Categories", value: categories.length, suffix: "", icon: Zap },
    { label: "Countries Covered", value: getAvailableCountries().length, suffix: "", icon: Globe },
    { label: "Fields in Record", value: Object.keys(tools[0] ?? {}).length, suffix: "", icon: ShieldCheck },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950">
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="orb orb-1 top-[-20%] left-[10%]" style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)" }} />
      <div className="orb orb-2 bottom-[-10%] right-[5%]" style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-indigo-200 text-xs font-semibold tracking-wide uppercase mb-4">
            Directory overview
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
            Numbers that{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              speak
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-indigo-300" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-white mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-indigo-200/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
