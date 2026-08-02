"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Bitcoin,
  BarChart3,
  LineChart,
  GanttChart,
  Wallet,
  Wrench,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { categories, getToolsByCategory } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Bitcoin, BarChart3, LineChart,
  GanttChart, Wallet, Wrench, GraduationCap,
};

const categoryColors = [
  "from-indigo-500/10 to-indigo-600/5 dark:from-indigo-500/20 dark:to-indigo-600/10",
  "from-amber-500/10 to-amber-600/5 dark:from-amber-500/20 dark:to-amber-600/10",
  "from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/20 dark:to-emerald-600/10",
  "from-rose-500/10 to-rose-600/5 dark:from-rose-500/20 dark:to-rose-600/10",
  "from-cyan-500/10 to-cyan-600/5 dark:from-cyan-500/20 dark:to-cyan-600/10",
  "from-violet-500/10 to-violet-600/5 dark:from-violet-500/20 dark:to-violet-600/10",
  "from-orange-500/10 to-orange-600/5 dark:from-orange-500/20 dark:to-orange-600/10",
  "from-teal-500/10 to-teal-600/5 dark:from-teal-500/20 dark:to-teal-600/10",
];

const iconColors = [
  "text-indigo-600 dark:text-indigo-400",
  "text-amber-600 dark:text-amber-400",
  "text-emerald-600 dark:text-emerald-400",
  "text-rose-600 dark:text-rose-400",
  "text-cyan-600 dark:text-cyan-400",
  "text-violet-600 dark:text-violet-400",
  "text-orange-600 dark:text-orange-400",
  "text-teal-600 dark:text-teal-400",
];

const bgColors = [
  "bg-indigo-50 dark:bg-indigo-950/40",
  "bg-amber-50 dark:bg-amber-950/40",
  "bg-emerald-50 dark:bg-emerald-950/40",
  "bg-rose-50 dark:bg-rose-950/40",
  "bg-cyan-50 dark:bg-cyan-950/40",
  "bg-violet-50 dark:bg-violet-950/40",
  "bg-orange-50 dark:bg-orange-950/40",
  "bg-teal-50 dark:bg-teal-950/40",
];

export default function Categories() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Explore Categories
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Everything you need,{" "}
            <span className="gradient-text">organized</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Browse through 8 carefully curated categories, each packed with
            verified tools and honest reviews.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {categories.map((category, i) => {
            const IconComponent = iconMap[category.icon] || TrendingUp;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/category/${category.id}`}
                  className={`group relative block p-5 lg:p-7 rounded-3xl bg-gradient-to-br ${categoryColors[i]} border border-slate-200/60 dark:border-slate-800/60 hover-lift overflow-hidden card-3d`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/40 to-transparent dark:from-white/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${bgColors[i]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 lg:w-7 lg:h-7 ${iconColors[i]}`} />
                  </div>

                  <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-slate-800/60 px-2.5 py-1 rounded-full">
                      {getToolsByCategory(category.id).length}+ tools
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
