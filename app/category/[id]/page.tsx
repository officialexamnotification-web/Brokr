import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, TrendingUp } from "lucide-react";
import { getCategoryById, getToolsByCategory, categories } from "@/lib/data";
import ToolCard from "@/components/common/ToolCard";

export function generateStaticParams() {
  return categories.map((cat) => ({ id: String(cat.id) }));
}

export default function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryId = parseInt(params.id);
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const categoryTools = getToolsByCategory(categoryId);

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
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          {category.description}
        </p>
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
    </div>
  );
}
