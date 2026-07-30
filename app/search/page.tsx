"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search as SearchIcon, X, Filter, SlidersHorizontal, Star, Globe, Smartphone, DollarSign } from "lucide-react";
import { tools, categories, searchTools } from "@/lib/data";
import ToolCard from "@/components/common/ToolCard";
import Badge from "@/components/common/Badge";

type SortOption = "rating" | "trending" | "reviews" | "name";
type ExperienceLevel = "all" | "beginner" | "intermediate" | "advanced";

const platforms = ["Web", "iOS", "Android", "Desktop", "API"];
const regulations = ["FCA", "CySEC", "ASIC", "SEC", "FINRA", "FinCEN", "ESMA"];

const experienceMap: Record<ExperienceLevel, string[]> = {
  all: [],
  beginner: ["Beginners", "Casual Investors", "Mobile-First Users", "Crypto Beginners", "Long-term Investors"],
  intermediate: ["Active Crypto Traders", "Social Traders", "Forex & CFD Traders", "Altcoin Investors"],
  advanced: ["Professional Traders", "Algorithmic Traders", "Global Investors", "Technical Analysts", "Strategy Developers"],
};

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedRegulation, setSelectedRegulation] = useState<string>("");
  const [experience, setExperience] = useState<ExperienceLevel>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTools = useMemo(() => {
    let results = searchTools(query, {
      category: selectedCategory || undefined,
      minRating: minRating || undefined,
      platform: selectedPlatform || undefined,
      regulation: selectedRegulation || undefined,
    });

    if (experience !== "all") {
      results = results.filter((t) => t.bestFor?.some((b) => experienceMap[experience].includes(b)));
    }

    results.sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating;
        case "trending": return Number(b.trending) - Number(a.trending);
        case "reviews": return b.reviews - a.reviews;
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    return results;
  }, [query, sortBy, selectedCategory, minRating, selectedPlatform, selectedRegulation, experience]);

  const hasFilters = query || selectedCategory || minRating > 0 || selectedPlatform || selectedRegulation || experience !== "all";
  const clearFilters = () => {
    setQuery("");
    setSelectedCategory(null);
    setMinRating(0);
    setSelectedPlatform("");
    setSelectedRegulation("");
    setExperience("all");
    setSortBy("rating");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-6">Search &amp; Compare Tools</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, feature, or keyword..." className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all text-base" />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-primary-500" />}
          </button>
        </div>

        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass-card rounded-2xl p-5 mb-4 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Category</label>
                <select value={selectedCategory || ""} onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30">
                  <option value="">All Categories</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Min Rating: {minRating}+</label>
                <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-full accent-primary-500" />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0</span><span>5</span></div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Platform</label>
                <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30">
                  <option value="">All Platforms</option>
                  {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Regulation</label>
                <select value={selectedRegulation} onChange={(e) => setSelectedRegulation(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30">
                  <option value="">All Regulations</option>
                  {regulations.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Experience Level</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value as ExperienceLevel)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30">
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={clearFilters} className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-colors">Clear All Filters</button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">{filteredTools.length} results</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="text-sm py-2 pl-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 appearance-none cursor-pointer">
              <option value="rating">Highest Rated</option>
              <option value="trending">Trending</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <SearchIcon className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tools found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Try adjusting your filters</p>
          <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
