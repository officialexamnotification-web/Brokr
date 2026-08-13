"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories } from "@/lib/data";

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const allCategories = ["All", ...categories.map(c => c.name)];
  
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {allCategories.map((category) => {
        const isActive = currentCategory === category;
        const href = category === "All" ? "/blog" : `/blog?category=${encodeURIComponent(category)}`;
        
        return (
          <Link
            key={category}
            href={href}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive 
                ? "bg-primary-600 text-white" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30"
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}