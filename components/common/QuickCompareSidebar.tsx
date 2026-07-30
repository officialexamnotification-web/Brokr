"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Zap,
  TrendingDown,
  Star,
  ArrowRight,
  DollarSign,
  Shield,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Tool, tools } from "@/lib/data";
import Rating from "./Rating";
import Badge from "./Badge";

interface QuickCompareSidebarProps {
  currentTool: Tool;
}

export default function QuickCompareSidebar({ currentTool }: QuickCompareSidebarProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const alternatives = tools
    .filter((t) => t.categoryId === currentTool.categoryId && t.slug !== currentTool.slug)
    .slice(0, 4);

  const betterRated = alternatives.filter((a) => a.rating > currentTool.rating);
  const cheaperOnes = alternatives.filter((a) => {
    const curPrice = parseInt(currentTool.minDeposit.replace(/[^0-9]/g, "")) || 0;
    const altPrice = parseInt(a.minDeposit.replace(/[^0-9]/g, "")) || 0;
    return altPrice < curPrice && altPrice > 0;
  });

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      if (scrollY > winHeight * 0.4 && scrollY < docHeight - winHeight * 0.3) {
        setVisible(true);
      }
    }, 3000);

    const handleScroll = () => {
      if (dismissed) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      if (scrollY > winHeight * 0.5 && scrollY < docHeight - winHeight * 0.3) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed]);

  if (dismissed || alternatives.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
        >
          {!expanded ? (
            <motion.div
              className="glass-card rounded-2xl p-4 shadow-2xl shadow-slate-500/10 dark:shadow-black/30 cursor-pointer"
              onClick={() => setExpanded(true)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center animate-pulse-glow shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Better alternatives found!
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {betterRated.length} higher rated &bull; {cheaperOnes.length} cheaper options
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="glass-card rounded-2xl shadow-2xl shadow-slate-500/10 dark:shadow-black/30 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Smart Comparison
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setExpanded(false)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  While viewing {currentTool.name}, here are some alternatives you should consider:
                </p>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/tool/${alt.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500/10 to-purple-500/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{alt.logo}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                          {alt.name}
                        </span>
                        {alt.rating > currentTool.rating && (
                          <Badge variant="success" size="sm">Higher Rated</Badge>
                        )}
                        {cheaperOnes.includes(alt) && (
                          <Badge variant="warning" size="sm">Cheaper</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <Rating value={alt.rating} size="sm" showValue={false} />
                        <span className="text-xs text-slate-400">{alt.pricing}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>

              <div className="p-3 border-t border-slate-200/50 dark:border-slate-700/50">
                <Link
                  href={`/compare?tools=${[currentTool.slug, ...alternatives.map((a) => a.slug).slice(0, 3)].join(",")}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
                >
                  Compare All Side-by-Side <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => {
                      setDismissed(true);
                      setVisible(false);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-500 transition-colors"
                  >
                    Don&apos;t show again
                  </button>
                  <button
                    onClick={() => {
                      setVisible(false);
                      setExpanded(false);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-500 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
