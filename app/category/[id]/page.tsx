import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, TrendingUp, ArrowRight, Sparkles, Filter, Globe } from "lucide-react";
import type { Metadata } from "next";
import { getCategoryById, getCategoryBySlug, getToolsByCategory, categories, getAvailableCountries } from "@/lib/data";
import ToolCard from "@/components/common/ToolCard";
import { ManagedToolGrid } from "@/components/content/ManagedContent";

export function generateStaticParams() {
  return [
    ...categories.map((cat) => ({ id: String(cat.id) })),
    ...categories.map((cat) => ({ id: cat.slug })),
  ];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const categoryId = Number.parseInt(params.id, 10);
  const category = Number.isNaN(categoryId)
    ? getCategoryBySlug(params.id)
    : getCategoryById(categoryId);

  if (!category) {
    return {
      title: "Category Not Found | Tradivex",
      description: "The category you are looking for could not be found.",
    };
  }

  return {
    title: `${category.name} Trading Tools & Platforms | Tradivex`,
    description: `Compare ${category.name.toLowerCase()} trading tools using documented listing fields. ${category.description}.`,
    alternates: { canonical: `/category/${category.slug}` },
    keywords: `${category.name}, ${category.name} trading tools, ${category.name} platforms, ${category.name} brokers, trading comparison`,
    openGraph: {
      title: `${category.name} Trading Tools | Tradivex`,
      description: category.description,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Trading Tools | Tradivex`,
      description: category.description,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const parsedCategoryId = Number.parseInt(params.id, 10);
  const category = Number.isNaN(parsedCategoryId)
    ? getCategoryBySlug(params.id)
    : getCategoryById(parsedCategoryId);

  if (!category) {
    notFound();
  }

  if (!Number.isNaN(parsedCategoryId)) {
    redirect(`/category/${category.slug}`);
  }

  const categoryTools = getToolsByCategory(category.id);
  const availableCountries = getAvailableCountries(); // Already limited to 4 countries

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center border border-primary-100 dark:border-primary-900">
            <TrendingUp className="w-7 h-7 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
              {category.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {categoryTools.length} tools listed
            </p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-6">
          {category.description}
        </p>

        {/* Filter Options */}
        <div className="space-y-4">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/search?category=${category.id}&sort=trending`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-sm font-semibold hover:bg-orange-100 dark:hover:bg-orange-950/60 transition-colors"
            >
              <TrendingUp className="w-4 h-4" /> Trending
            </Link>
            <Link
              href={`/search?category=${category.id}&sort=name`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-950/60 transition-colors"
            >
              <Sparkles className="w-4 h-4" /> A-Z
            </Link>
            <Link
              href={`/search?category=${category.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Filter className="w-4 h-4" /> Advanced Filters
            </Link>
          </div>

          {/* Country Filters */}
          {availableCountries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium self-center mr-2">
                <Globe className="w-3 h-3 inline mr-1" /> Filter by country:
              </span>
              {availableCountries.map((country) => (
                <Link
                  key={country}
                  href={`/search?category=${category.id}&country=${encodeURIComponent(country.toLowerCase())}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {country}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No tools found in this category yet.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            Submit a new tool
          </Link>
        </div>
      )}
      <ManagedToolGrid categoryId={category.id} />
    </div>
  );
}
