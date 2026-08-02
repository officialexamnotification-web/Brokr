"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { getTrendingTools, getFeaturedTools } from "@/lib/data";
import ToolCard from "../common/ToolCard";

export default function TrendingTools() {
  const trendingTools = getTrendingTools().slice(0, 4);
  const featuredTools = getFeaturedTools().slice(0, 8);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <Flame className="w-3.5 h-3.5" /> Trending Now
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Most popular this week
            </h2>
          </div>
          <Link
            href="/search?sort=trending"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all"
          >
            View all trending <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {trendingTools.map((tool, i) => (
            <div key={tool.id} className="h-full">
              <ToolCard tool={tool} index={i} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Editor Picks
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured listings
            </h2>
          </div>
          <Link
            href="/search?sort=rating"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all"
          >
            View all featured <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool, i) => (
            <div key={tool.id} className="h-full">
              <ToolCard tool={tool} variant="featured" index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
