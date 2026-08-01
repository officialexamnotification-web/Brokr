"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, DollarSign, ArrowRight, CheckCircle } from "lucide-react";
import { Tool, tools } from "@/lib/data";

interface BetterAlternativeBannerProps {
  currentTool: Tool;
}

export default function BetterAlternativeBanner({ currentTool }: BetterAlternativeBannerProps) {
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
    });

  const cheaperOnes = alternatives.filter((a) => {
    const curPrice = parseInt(currentTool.minDeposit.replace(/[^0-9]/g, "")) || Infinity;
    const altPrice = parseInt(a.minDeposit.replace(/[^0-9]/g, "")) || Infinity;
    return altPrice < curPrice;
  });

  const bestAlternative = alternatives[0];
  const hasBetter = cheaperOnes.length > 0;

  if (dismissed || !hasBetter || !bestAlternative) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/30 p-4 mb-6"
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 p-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 text-slate-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                Better Alternative Available
              </span>
              {cheaperOnes.length > 0 && (
                <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                  {cheaperOnes.length} cheaper
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Compared on regulation tier, costs, platforms, and asset coverage,{" "}
              <span className="font-semibold text-primary-600 dark:text-primary-400">{bestAlternative.name}</span>{" "}
              ranks higher across key criteria.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/tool/${bestAlternative.slug}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
              >
                View {bestAlternative.name} <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{bestAlternative.pricing}</span>
                {bestAlternative.mobileApp && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Mobile App
                  </span>
                )}
                {bestAlternative.features.length > currentTool.features.length && (
                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    +{bestAlternative.features.length - currentTool.features.length} features
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
