import Link from "next/link";
import { ArrowLeft, ExternalLink, Newspaper } from "lucide-react";
import { notFound } from "next/navigation";
import { getFinancialNews } from "@/lib/api";

export const dynamic = "force-dynamic";

function decodeSlug(slug: string) {
  try {
    return Buffer.from(slug, "base64url").toString("utf8");
  } catch {
    return "";
  }
}

function cleanText(value: string | undefined) {
  return (value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export default async function NewsArticlePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { category?: string };
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category.toLowerCase() : "general";
  const items = await getFinancialNews(category);
  const url = decodeSlug(params.slug);
  const article = items.find((item: any) => item.slug === params.slug || item.url === url);

  if (!article || !article.url) notFound();

  const headline = cleanText(article.headline);
  const summary = cleanText(article.summary);
  const published = Number(article.datetime) > 0 ? new Date(Number(article.datetime) * 1000) : null;

  return (
    <main className="min-h-[70vh] bg-slate-50 py-12 dark:bg-slate-950 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/#news" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
          <ArrowLeft className="h-4 w-4" /> Back to market news
        </Link>
        <article className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="mb-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 font-bold text-primary-700 dark:bg-primary-950/40 dark:text-primary-300">
              <Newspaper className="h-4 w-4" /> {category}
            </span>
            <span>{article.source || "Market news"}</span>
            {published && <span>{published.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>}
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">{headline}</h1>
          <div className="mt-8 border-l-4 border-primary-500 pl-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {summary || "Open the original report for the latest published details."}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-700">
              Read original report <ExternalLink className="h-4 w-4" />
            </a>
            <span className="text-xs text-slate-500 dark:text-slate-400">Source: {article.source || "Market provider"}. Full reporting remains with the original publisher.</span>
          </div>
        </article>
      </div>
    </main>
  );
}
