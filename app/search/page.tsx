"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search as SearchIcon, X, Filter, SlidersHorizontal, Star, Globe, Smartphone, DollarSign } from "lucide-react";
import { tools, categories, searchTools, getAvailableCountries, searchCalculators } from "@/lib/data";
import { calculatorDefinitions } from "@/lib/calculators";
import ToolCard from "@/components/common/ToolCard";
import Badge from "@/components/common/Badge";
import { usePublishedTools } from "@/components/content/ManagedContent";

type SortOption = "latest" | "trending" | "name" | "rating";
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
  const managedTools = usePublishedTools();
  const catalogTools = useMemo(() => [...tools, ...managedTools], [managedTools]);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") ? Number(searchParams.get("category")) : null;
  const initialCountry = searchParams.get("country") || "";
  const availableCountries = useMemo(() => getAvailableCountries(), []);
  const normalizedInitialCountry = availableCountries.find((country) => country.toLowerCase() === initialCountry.toLowerCase()) ?? "";
  const requestedSort = searchParams.get("sort");
  const initialSort: SortOption = requestedSort === "trending" || requestedSort === "name" || requestedSort === "rating" ? requestedSort : "latest";

  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(initialCategory ? [initialCategory] : []);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedRegulation, setSelectedRegulation] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>(normalizedInitialCountry);
  const [experience, setExperience] = useState<ExperienceLevel>("all");
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const currentCountry = searchParams.get("country") || "";
    const canonicalCountry = availableCountries.find((country) => country.toLowerCase() === currentCountry.toLowerCase()) ?? "";
    setQuery(searchParams.get("q") || "");
    setSelectedCountry(canonicalCountry);
  }, [searchParams, availableCountries]);

  const filteredTools = useMemo(() => {
    let results = searchTools(query, {
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      platform: selectedPlatform || undefined,
      regulation: selectedRegulation || undefined,
    }, catalogTools);

    if (experience !== "all") {
      results = results.filter((t) => t.bestFor?.some((b) => experienceMap[experience].includes(b)));
    }

    if (selectedCountry) {
      results = results.filter((t) => {
        const countryLower = selectedCountry.toLowerCase();
        return t.supportedCountries.some((supportedCountry) => {
          const supportedLower = supportedCountry.toLowerCase();
          return (
            supportedLower.includes(countryLower) ||
            supportedLower === "global" ||
            supportedLower.includes("global") ||
            (countryLower === "india" && supportedLower.includes("india")) ||
            (countryLower === "uk" && (supportedLower.includes("uk") || supportedLower.includes("united kingdom"))) ||
            (countryLower === "usa" && (supportedLower.includes("usa") || supportedLower.includes("united states"))) ||
            (countryLower === "europe" && (supportedLower.includes("europe") || supportedLower.includes("eu") || supportedLower.includes("eea"))) ||
            (countryLower === "eu" && (supportedLower.includes("europe") || supportedLower.includes("eu") || supportedLower.includes("eea")))
          );
        });
      });
    }

    results.sort((a, b) => {
      switch (sortBy) {
        case "latest": return b.id - a.id;
        case "trending": return Number(b.trending) - Number(a.trending);
        case "name": return a.name.localeCompare(b.name);
        case "rating":
          if (a.rating === null && b.rating === null) return a.name.localeCompare(b.name);
          if (a.rating === null) return 1;
          if (b.rating === null) return -1;
          return b.rating - a.rating;
        default: return 0;
      }
    });
    return results;
  }, [query, sortBy, selectedCategories, selectedPlatform, selectedRegulation, experience, selectedCountry, catalogTools]);

  const filteredCalculators = useMemo(() => {
    return searchCalculators(query);
  }, [query]);

  const hasFilters = query || selectedCategories.length > 0 || selectedPlatform || selectedRegulation || experience !== "all" || selectedCountry;
  const clearFilters = () => {
    setQuery("");
    setSelectedCategories([]);
    setSelectedPlatform("");
    setSelectedRegulation("");
    setSelectedCountry("");
    setExperience("all");
    setSortBy("latest");
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
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(c.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, c.id]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(id => id !== c.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{c.name}</span>
                    </label>
                  ))}
                </div>
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
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Country/Region</label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30">
                  <option value="">All Countries</option>
                  {availableCountries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
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
            <span className="text-sm text-slate-500 dark:text-slate-400">{filteredTools.length + filteredCalculators.length} results</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
          
          {/* Active Filter Chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(catId => {
                const cat = categories.find(c => c.id === catId);
                return cat ? (
                  <span key={catId} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                    {cat.name}
                    <button onClick={() => setSelectedCategories(selectedCategories.filter(id => id !== catId))} className="hover:text-primary-900 dark:hover:text-primary-100">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ) : null;
              })}
              {selectedCountry && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                  {selectedCountry}
                  <button onClick={() => setSelectedCountry("")} className="hover:text-primary-900 dark:hover:text-primary-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedPlatform && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                  {selectedPlatform}
                  <button onClick={() => setSelectedPlatform("")} className="hover:text-primary-900 dark:hover:text-primary-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedRegulation && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                  {selectedRegulation}
                  <button onClick={() => setSelectedRegulation("")} className="hover:text-primary-900 dark:hover:text-primary-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {experience !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                  {experience}
                  <button onClick={() => setExperience("all")} className="hover:text-primary-900 dark:hover:text-primary-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="text-sm py-2 pl-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 appearance-none cursor-pointer">
              <option value="latest">Latest Added</option>
              <option value="trending">Trending</option>
              <option value="name">Alphabetical</option>
              <option value="rating">Rating (where available)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="text-sm py-2 pl-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 appearance-none cursor-pointer">
              <option value="">All Countries</option>
              {availableCountries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredTools.length > 0 || filteredCalculators.length > 0 ? (
        <>
          {filteredCalculators.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Calculators</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCalculators.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">{calc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{calc.description}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-primary-600">Open calculator →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredTools.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tools & Platforms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <SearchIcon className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Try adjusting your search terms</p>
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
