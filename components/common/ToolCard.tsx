"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Award, Shield, ArrowUpRight } from "lucide-react";
import { Tool } from "@/lib/data";
import Rating from "./Rating";
import Badge from "./Badge";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact" | "featured";
  index?: number;
}

export default function ToolCard({ tool, variant = "default", index = 0 }: ToolCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/tool/${tool.slug}`}
        className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover-lift"
      >
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/15 to-purple-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{tool.logo}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">{tool.name}</h3>
          <Rating value={tool.rating} size="sm" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Link
          href={`/tool/${tool.slug}`}
          className="group flex h-full min-h-[315px] flex-col glass-card rounded-2xl p-5 overflow-hidden relative hover-lift"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-500/8 to-purple-500/8 rounded-bl-[60px] -translate-y-4 translate-x-4 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/8 to-transparent rounded-tr-[40px]" />

          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ring-1 ring-primary-100/50 dark:ring-primary-900/50">
                <span className="text-base font-bold text-primary-600 dark:text-primary-400">{tool.logo}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
                    {tool.name}
                  </h3>
                  {tool.featured && <Award className="w-4 h-4 text-amber-400 shrink-0" />}
                </div>
                <Badge variant="info" size="sm">{tool.category}</Badge>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
              {tool.description}
            </p>

            <div className="mt-auto flex items-center gap-2 mb-4 flex-wrap">
              {tool.features.slice(0, 3).map((f) => (
                <span key={f} className="px-2 py-0.5 text-xs rounded-md bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-medium">
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
              <Rating value={tool.rating} size="sm" />
              <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Shield className="w-3 h-3" /> {tool.regulation[0]}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/tool/${tool.slug}`}
        className="group flex h-full min-h-[315px] flex-col glass-card rounded-2xl p-5 overflow-hidden relative hover-lift"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ring-1 ring-primary-100/50 dark:ring-primary-900/50">
            <span className="text-base font-bold text-primary-600 dark:text-primary-400">{tool.logo}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
                {tool.name}
              </h3>
              {tool.trending && <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0 animate-pulse" />}
            </div>
            <Badge variant="info" size="sm">{tool.category}</Badge>
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        <div className="mt-auto flex items-center gap-2 mb-4 flex-wrap">
          {tool.features.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 text-xs rounded-md bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-medium">
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <Rating value={tool.rating} size="sm" />
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Shield className="w-3 h-3" /> {tool.regulation[0]}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
