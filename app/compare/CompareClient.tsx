"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  X,
  GitCompare,
  ExternalLink,
  Check,
  Plus,
} from "lucide-react";
import { tools, Tool } from "@/lib/data";
import Rating from "@/components/common/Rating";
import Badge from "@/components/common/Badge";

function CompareClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTools = Array.from(new Set(searchParams.get("tools")?.split(",").filter((slug) => tools.some((tool) => tool.slug === slug)) || [])).slice(0, 4);

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(initialTools);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toolToSelect, setToolToSelect] = useState<number | null>(null);

  const selectedTools = useMemo(
    () =>
      selectedSlugs
        .map((slug) => tools.find((t) => t.slug === slug))
        .filter(Boolean) as Tool[],
    [selectedSlugs]
  );

  const availableTools = useMemo(() => {
    return tools.filter(
      (t) =>
        !selectedSlugs.includes(t.slug) &&
        (searchQuery === "" ||
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedSlugs, searchQuery]);

  const addTool = (slug: string) => {
    if (selectedSlugs.length >= 4) return;
    const newSlugs = [...selectedSlugs, slug];
    setSelectedSlugs(newSlugs);
    setSearchOpen(false);
    setToolToSelect(null);
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.set("tools", newSlugs.join(","));
    router.replace(`/compare?${params.toString()}`, { scroll: false });
  };

  const removeTool = (slug: string) => {
    const newSlugs = selectedSlugs.filter((s) => s !== slug);
    setSelectedSlugs(newSlugs);
    const params = new URLSearchParams(searchParams.toString());
    if (newSlugs.length > 0) {
      params.set("tools", newSlugs.join(","));
    } else {
      params.delete("tools");
    }
    router.replace(`/compare?${params.toString()}`, { scroll: false });
  };

  const compareRows = [
    { label: "Rating", key: "rating", render: (t: Tool) => <Rating value={t.rating} size="md" /> },
    { label: "Category", key: "category", render: (t: Tool) => <Badge variant="info">{t.category}</Badge> },
    { label: "Pricing", key: "pricing", render: (t: Tool) => t.pricing },
    { label: "Min Deposit", key: "minDeposit", render: (t: Tool) => t.minDeposit },
    { label: "Founded", key: "yearFounded", render: (t: Tool) => t.yearFounded.toString() },
    {
      label: "Regulation",
      key: "regulation",
      render: (t: Tool) => (
        <div className="flex flex-wrap gap-1">
          {t.regulation.map((r) => (
            <span key={r} className="text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {r}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Platforms",
      key: "platforms",
      render: (t: Tool) => (
        <div className="flex flex-wrap gap-1">
          {t.platforms.map((p) => (
            <span key={p} className="text-xs px-1.5 py-0.5 rounded bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-400">
              {p}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Features",
      key: "features",
      render: (t: Tool) => (
        <ul className="space-y-1">
          {t.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-sm">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Listed highlights",
      key: "pros",
      render: (t: Tool) => (
        <ul className="space-y-1">
          {t.pros.map((p) => (
            <li key={p} className="flex items-start gap-1.5 text-sm">
              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Listed considerations",
      key: "cons",
      render: (t: Tool) => (
        <ul className="space-y-1">
          {t.cons.map((c) => (
            <li key={c} className="flex items-start gap-1.5 text-sm">
              <span className="text-red-400 mt-0.5 shrink-0">&bull;</span>
              {c}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Compare Tools
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Side-by-side comparison of trading platforms and tools
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {selectedSlugs.length > 0 ? (
          selectedSlugs.map((slug) => {
            const tool = tools.find((t) => t.slug === slug);
            if (!tool) return null;
            return (
              <div
                key={slug}
                className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800 rounded-xl text-sm"
              >
                <span className="font-semibold text-primary-700 dark:text-primary-400">
                  {tool.logo}
                </span>
                <span className="text-primary-700 dark:text-primary-400">
                  {tool.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeTool(slug)}
                  aria-label={`Remove ${tool.name} from comparison`}
                  className="p-0.5 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 text-primary-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-slate-400 dark:text-slate-500 text-sm italic">
            Add tools to start comparing
          </p>
        )}
        {selectedSlugs.length < 4 && (
          <div className="relative">
            <button
              type="button"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen(!searchOpen);
                setToolToSelect(null);
                setSearchQuery("");
              }}
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 dark:hover:border-primary-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Tool
            </button>

            {searchOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-slide-down">
                <div className="p-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {availableTools.length > 0 ? (
                    availableTools.map((tool) => (
                      <button
                        key={tool.slug}
                        type="button"
                        onClick={() => addTool(tool.slug)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                            {tool.logo}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {tool.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {tool.category}
                          </div>
                        </div>
                        <Rating value={tool.rating} size="sm" showValue={false} />
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-slate-400">
                      No matching tools found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedTools.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-500 dark:text-slate-400 w-40">
                  Feature
                </th>
                {selectedTools.map((tool) => (
                  <th key={tool.slug} className="py-4 px-6 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                          {tool.logo}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {tool.name}
                        </div>
                        <Rating value={tool.rating} size="sm" showValue={false} />
                      </div>
                    </div>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, idx) => (
                <tr
                  key={row.key}
                  className={`border-b border-slate-100 dark:border-slate-800 ${
                    idx % 2 === 0
                      ? "bg-slate-50/50 dark:bg-slate-800/30"
                      : "bg-white dark:bg-slate-900"
                  }`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {row.label}
                  </td>
                  {selectedTools.map((tool) => (
                    <td
                      key={tool.slug}
                      className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300"
                    >
                      {row.render(tool)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <GitCompare className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Select tools to compare
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Use the &quot;Add Tool&quot; button above to select up to 4 trading
            tools or brokers for side-by-side comparison.
          </p>
        </div>
      )}
    </div>
  );
}

export default CompareClient;
