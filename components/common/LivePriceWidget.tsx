"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingDown, ShoppingCart, Award, Clock, Check } from "lucide-react";
import { Tool, tools } from "@/lib/data";
import Rating from "./Rating";
import Badge from "./Badge";

interface LivePriceWidgetProps {
  currentTool: Tool;
}

export default function LivePriceWidget({ currentTool }: LivePriceWidgetProps) {
  const sameCategory = tools
    .filter((t) => t.categoryId === currentTool.categoryId && t.slug !== currentTool.slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (sameCategory.length === 0) return null;

  const curMinDeposit = parseInt(currentTool.minDeposit.replace(/[^0-9]/g, "")) || Infinity;

  return (
    <div className="glass-card rounded-2xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <TrendingDown className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Live Price Comparison
        </h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {sameCategory.map((tool, idx) => {
          const altDeposit = parseInt(tool.minDeposit.replace(/[^0-9]/g, "")) || 0;
          const isCheaper = altDeposit < curMinDeposit;
          const isHigherRated = tool.rating > currentTool.rating;

          return (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-white/50 dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
            >
              {(isCheaper || isHigherRated) && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge variant={isHigherRated ? "warning" : "success"} size="sm">
                    {isHigherRated ? "Top Rated" : "Best Value"}
                  </Badge>
                </div>
              )}

              <Link href={`/tool/${tool.slug}`} className="block">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500/10 to-purple-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{tool.logo}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors truncate">
                    {tool.name}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Rating value={tool.rating} size="sm" showValue={false} />
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">{tool.rating}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Min Deposit</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {tool.minDeposit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Pricing</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate ml-2">
                      {tool.pricing}
                    </span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">View details</span>
                  {isCheaper && (
                    <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold flex items-center gap-0.5">
                      <TrendingDown className="w-3 h-3" />
                      Save more
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Pricing updated in real-time</span>
          <Award className="w-3.5 h-3.5 ml-1" />
          <span>Best price guarantee</span>
        </div>
        <Link
          href={`/compare?tools=${[currentTool.slug, ...sameCategory.map((t) => t.slug).slice(0, 3)].join(",")}`}
          className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-1"
        >
          Full comparison <ShoppingCart className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
