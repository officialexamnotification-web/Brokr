"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Zap,
  TrendingDown,
  ArrowRight,
  DollarSign,
  Shield,
  ExternalLink,
  ChevronRight,
  CheckCircle,
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
    .sort((a, b) => {
      // Industry-standard 5-axis framework for broker comparison
      const calculateScore = (tool: Tool) => {
        // Axis 1: Regulation & Trust (Tier-based scoring)
        const tier1Regulators = ['FCA', 'SEC', 'FINRA', 'CFTC', 'NFA', 'BaFin', 'ASIC', 'FINMA', 'MAS', 'JFSA', 'CIRO', 'SEBI', 'AMF', 'Consob', 'CNMV', 'AFM'];
        const tier2Regulators = ['FSCA', 'DFSA', 'FSC', 'FMA', 'CySEC', 'MFSA'];
        let regulationScore = 0;
        tool.regulation.forEach(reg => {
          if (tier1Regulators.some(t => reg.toUpperCase().includes(t))) {
            regulationScore += 30; // Tier-1 = high trust
          } else if (tier2Regulators.some(t => reg.toUpperCase().includes(t))) {
            regulationScore += 15; // Tier-2 = medium trust
          } else {
            regulationScore += 5; // Other/offshore = low trust
          }
        });

        // Axis 2: Total Cost (min deposit as proxy for cost structure)
        const price = parseInt(tool.minDeposit.replace(/[^0-9]/g, "")) || Infinity;
        const costScore = price === Infinity ? 0 : 10000 / price;

        // Axis 3: Platforms & Execution
        const platformsScore = tool.platforms.length * 8;
        const mobileScore = tool.mobileApp ? 25 : 0;
        const demoScore = tool.demoAccount ? 10 : 0;

        // Axis 4: Asset Coverage (features as proxy for available instruments)
        const featuresScore = tool.features.length * 5;

        // Axis 5: Support & Operations (deposit methods as proxy)
        const supportScore = tool.depositMethods.length * 3;

        return regulationScore + costScore + platformsScore + mobileScore + demoScore + featuresScore + supportScore;
      };
      return calculateScore(b) - calculateScore(a);
    })
    .slice(0, 4);

  const cheaperOnes = alternatives.filter((a) => {
    const curPrice = parseInt(currentTool.minDeposit.replace(/[^0-9]/g, "")) || 0;
    const altPrice = parseInt(a.minDeposit.replace(/[^0-9]/g, "")) || 0;
    return altPrice < curPrice && altPrice > 0;
  });

  const tier1Regulators = ['FCA', 'SEC', 'FINRA', 'CFTC', 'NFA', 'BaFin', 'ASIC', 'FINMA', 'MAS', 'JFSA', 'CIRO'];
  const betterRegulated = alternatives.filter((a) => {
    const curTier1 = currentTool.regulation.filter(r => tier1Regulators.some(t => r.toUpperCase().includes(t))).length;
    const altTier1 = a.regulation.filter(r => tier1Regulators.some(t => r.toUpperCase().includes(t))).length;
    return altTier1 > curTier1;
  });

  const morePlatforms = alternatives.filter((a) => a.platforms.length > currentTool.platforms.length);
  const moreFeatures = alternatives.filter((a) => a.features.length > currentTool.features.length);

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
                    {betterRegulated.length > 0 && `${betterRegulated.length} better regulated, `}
                    {cheaperOnes.length > 0 && `${cheaperOnes.length} lower minimum, `}
                    {morePlatforms.length > 0 && `${morePlatforms.length} more platforms`}
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
                  Compared on regulation, costs, platforms, and asset coverage:
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
                        {betterRegulated.includes(alt) && (
                          <Badge variant="success" size="sm">Tier-1 Regulated</Badge>
                        )}
                        {cheaperOnes.includes(alt) && (
                          <Badge variant="warning" size="sm">Lower Min Deposit</Badge>
                        )}
                        {morePlatforms.includes(alt) && (
                          <Badge variant="info" size="sm">More Platforms</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-slate-400">{alt.pricing}</span>
                        {alt.mobileApp && (
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Mobile App
                          </span>
                        )}
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
