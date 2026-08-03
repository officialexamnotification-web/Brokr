"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight, GitCompare, X } from "lucide-react";
import { Tool, tools } from "@/lib/data";
import { getRelevantTools } from "@/lib/tool-relevance";

interface QuickCompareSidebarProps {
  currentTool: Tool;
}

/** Neutral related-tools panel. It orders listings for relevance without declaring a winner. */
export default function QuickCompareSidebar({ currentTool }: QuickCompareSidebarProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const relatedTools = getRelevantTools(currentTool, tools, 4);

  useEffect(() => {
    if (dismissed) return;
    const timer = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(timer);
  }, [dismissed]);

  if (dismissed || relatedTools.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
        >
          {!expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="w-full text-left glass-card rounded-2xl p-4 shadow-2xl shadow-slate-500/10 dark:shadow-black/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shrink-0">
                  <GitCompare className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">More tools in this category</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Browse related listings by matching fields.</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </button>
          ) : (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="glass-card rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Related listings</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setExpanded(false)} aria-label="Collapse related listings" className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">-</button>
                    <button type="button" onClick={() => { setDismissed(true); setVisible(false); }} aria-label="Close related listings" className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4" /></button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Compare the public fields yourself; Brokr does not select a winner.</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {relatedTools.map((tool) => (
                  <Link key={tool.slug} href={`/tool/${tool.slug}`} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 group">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{tool.logo}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{tool.name}</div>
                      <div className="text-xs text-slate-400 truncate">{tool.pricing}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500" />
                  </Link>
                ))}
              </div>
              <div className="p-3 border-t border-slate-200/50 dark:border-slate-700/50">
                <Link href={`/compare?tools=${[currentTool.slug, ...relatedTools.slice(0, 3).map((tool) => tool.slug)].join(",")}`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600">
                  Compare side by side <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
