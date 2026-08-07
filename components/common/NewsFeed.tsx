"use client";

import { useState, useEffect } from "react";
import { Newspaper, Clock, ExternalLink } from "lucide-react";

interface NewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
  slug?: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const res = await fetch(`/api/news?category=${category}`);
        const data = await res.json();
        
        // Strip HTML tags from summaries using regex
        const stripHtml = (html: string) => {
          return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
        };
        
        const cleanedData = Array.isArray(data) 
          ? data.map((item: NewsItem) => ({
              ...item,
              summary: stripHtml(item.summary || '')
            }))
          : [];
        
        // Filter for trading-related news - more relaxed filter
        const tradingKeywords = ['trading', 'forex', 'crypto', 'broker', 'market', 'stock', 'exchange', 'currency', 'investment', 'fund', 'price', 'rate', 'bank', 'fed', 'economy', 'financial'];
        const filteredNews = cleanedData
          .filter((item: NewsItem) => {
              const headline = item.headline?.toLowerCase() || '';
              const summary = item.summary?.toLowerCase() || '';
              const source = item.source?.toLowerCase() || '';
              const text = `${headline} ${summary} ${source}`;
              return tradingKeywords.some(keyword => text.includes(keyword));
            });
        
        // If no results with filter, show all news
        const newsToShow = filteredNews.length > 0 ? filteredNews : cleanedData;
        setNews(newsToShow.slice(0, 6));
      } catch (error) {
        console.error("News fetch error:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [category]);

  const categories = [
    { id: "general", label: "General" },
    { id: "economy", label: "Economy" },
    { id: "technology", label: "Technology" },
    { id: "forex", label: "Forex" },
    { id: "crypto", label: "Crypto" },
    { id: "energy", label: "Energy" },
    { id: "gold", label: "Gold" },
    { id: "merger", label: "M&A" },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Market Updates
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Latest <span className="gradient-text">News</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Stay updated with the latest financial market news and developments
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat.id
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto" aria-busy="true" aria-label="Loading market news">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[260px] rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 animate-pulse"
              />
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            No news available at the moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto items-stretch">
            {news.map((item) => (
              <div
                key={`${item.id}-${item.url}`}
                className="group relative h-full min-h-[260px] p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 dark:from-indigo-500/20 dark:to-indigo-600/10 border border-slate-200/60 dark:border-slate-800/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-full items-start gap-4">
                  <div className="flex-shrink-0">
                    <Newspaper className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex h-full flex-1 min-w-0 flex-col">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.headline}
                    </h3>
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                      {item.summary}
                    </p>
                    <div className="mt-auto pt-4">
                      {item.slug && (
                        <a href={`/news/${item.slug}?category=${encodeURIComponent(category)}`} className="mb-4 inline-flex items-center text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline">
                          Read more<span className="sr-only">: {item.headline}</span>
                        </a>
                      )}
                      <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium">{item.source}</span>
                        {item.related && (
                          <span className="text-slate-400">•</span>
                        )}
                        {item.related && (
                          <span className="text-primary-600 dark:text-primary-400 font-medium">
                            {item.related}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(item.datetime * 1000).toLocaleDateString()}</span>
                      </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={item.url}
                    aria-label={`Open original article: ${item.headline}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
